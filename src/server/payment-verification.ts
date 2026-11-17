import {
  CurrencyCode,
  LanguageCode,
  Order,
  OrderStatus,
  PaymentMethodId,
  PaymentSubmission,
  PaymentSubmissionStatus,
  PaymentTransaction,
  UserAccount,
} from '../types/marketplace.ts';
import { pickBi, resolveUserLanguage } from './i18n.ts';
import { computeOverallOrderStatus } from './marketplace-engine.ts';
import { savePaymentReceiptFile } from './media-storage.ts';
import {
  appendAuditLog,
  appendPaymentAuditLog,
  createNotification,
  generateId,
  getStore,
  saveStore,
  StoreSnapshot,
  upsertOrder,
  upsertPayment,
  upsertPaymentSubmission,
  upsertSuborder,
  withStoreLock,
} from './store.ts';

export function normalizeTransactionRef(txId: string): string {
  return txId.trim().toUpperCase().replace(/\s+/g, '');
}

export function sanitizeSubmissionForClient(sub: PaymentSubmission): PaymentSubmission {
  const { receiptImageDataUrl: _omit, ...rest } = sub;
  return rest;
}

export function getAdminUids(store: StoreSnapshot): string[] {
  return Object.values(store.users)
    .filter(
      (u) =>
        u.status === 'active' &&
        (u.role === 'super_admin' || (u.role === 'staff' && u.permissions?.canVerifyPayments === true))
    )
    .map((u) => u.uid);
}

export function getAllStaffAndAdminUids(store: StoreSnapshot): string[] {
  return Object.values(store.users)
    .filter((u) => u.status === 'active' && (u.role === 'super_admin' || u.role === 'staff'))
    .map((u) => u.uid);
}

function getAmountTolerance(currency: CurrencyCode): number {
  if (currency === 'TZS' || currency === 'KES') return 100;
  return 0.5;
}

export interface SubmitPaymentInput {
  orderId: string;
  paymentMethod?: PaymentMethodId;
  transactionId: string;
  amountSent?: number;
  senderName?: string;
  senderPhone?: string;
  transactionDate?: string;
  receiptImageDataUrl?: string;
  receiptFileName?: string;
  actorUid?: string;
  actorEmail?: string;
  actorRole?: string;
  language?: LanguageCode;
}

export async function submitManualPaymentProof(
  input: SubmitPaymentInput
): Promise<
  | { status: number; error: string; duplicateOfSubmissionId?: string }
  | { order: Order; payment: PaymentTransaction; submission: PaymentSubmission }
> {
  return withStoreLock(async () => {
    const store = await getStore();
    const order = store.orders[input.orderId];
    const reqLang = input.language || resolveUserLanguage(store, input.actorUid, 'sw');
  if (!order) {
    return { status: 404, error: pickBi(reqLang, 'Order not found.', 'Oda haijapatikana.') };
  }
  const custLang = resolveUserLanguage(store, order.customerId, reqLang);
  if (order.paymentStatus === 'CONFIRMED') {
    return {
      status: 400,
      error: pickBi(
        custLang,
        'Payment for this order is already verified and confirmed.',
        'Malipo ya oda hii tayari yamehakikiwa na kuthibitishwa.'
      ),
    };
  }

  const payment = Object.values(store.payments).find((p) => p.orderId === order.id);
  if (!payment) {
    return {
      status: 404,
      error: pickBi(
        custLang,
        'Associated payment record not found.',
        'Kumbukumbu ya malipo ya oda hii haijapatikana.'
      ),
    };
  }

  const chosenMethod: PaymentMethodId =
    input.paymentMethod ||
    (order.paymentProvider === 'manual_nmb' ? 'manual_nmb' : 'manual_mobile');

  if (chosenMethod === 'manual_mobile' && !store.settings.mpesaEnabled) {
    return {
      status: 400,
      error: pickBi(
        custLang,
        'M-Pesa manual payment is currently disabled by administrator.',
        'Malipo ya M-Pesa yamezimwa kwa muda na msimamizi.'
      ),
    };
  }
  if (chosenMethod === 'manual_nmb' && !store.settings.nmbEnabled) {
    return {
      status: 400,
      error: pickBi(
        custLang,
        'NMB Bank transfer is currently disabled by administrator.',
        'Malipo ya NMB Bank yamezimwa kwa muda na msimamizi.'
      ),
    };
  }

  const normalizedTx = normalizeTransactionRef(input.transactionId);
  const existingSubmissions = Object.values(store.paymentSubmissions);

  // 1. Hard block if another verified payment already used this transaction reference
  const verifiedDuplicate = existingSubmissions.find(
    (s) => s.normalizedTransactionId === normalizedTx && s.status === 'VERIFIED'
  );
  if (verifiedDuplicate) {
    const adminUids = getAdminUids(store);
    for (const uid of adminUids) {
      await createNotification({
        recipientUid: uid,
        type: 'security',
        title: `Blocked Duplicate Reference: ${input.transactionId.trim()}`,
        message: `Attempted reuse of already-verified reference ${input.transactionId.trim()} on order ${order.id} (originally verified on ${verifiedDuplicate.orderId}).`,
        targetType: 'payment_submission',
        targetId: verifiedDuplicate.id,
      });
    }
    await appendPaymentAuditLog({
      paymentId: payment.id,
      submissionId: verifiedDuplicate.id,
      orderId: order.id,
      action: 'DUPLICATE_REFERENCE_FLAGGED',
      previousStatus: payment.status,
      newStatus: payment.status,
      actorUid: input.actorUid || order.customerId,
      actorEmail: input.actorEmail || order.customerEmail,
      actorRole: input.actorRole || 'customer',
      reason: `Blocked duplicate reuse of verified Transaction ID ${input.transactionId.trim()} (originally order ${verifiedDuplicate.orderId}).`,
    });
    return {
      status: 409,
      error: pickBi(
        custLang,
        'This transaction reference has already been verified for another order. Please check your SMS/bank receipt or contact support.',
        'Namba hii ya muamala tayari imehakikiwa kwa oda nyingine. Tafadhali kagua SMS au risiti yako ya benki au wasiliana na msaada.'
      ),
      duplicateOfSubmissionId: verifiedDuplicate.id,
    };
  }

  // 2. Flag suspicious duplicate pending/info-requested submission across different orders
  const suspiciousDuplicate = existingSubmissions.find(
    (s) =>
      s.normalizedTransactionId === normalizedTx &&
      s.orderId !== order.id &&
      (s.status === 'PENDING_VERIFICATION' || s.status === 'INFO_REQUESTED')
  );

  const amountSent =
    typeof input.amountSent === 'number' && Number.isFinite(input.amountSent) && input.amountSent > 0
      ? input.amountSent
      : order.totalDisplay;
  const senderName = (
    input.senderName ||
    order.submittedPayerName ||
    order.shippingAddress.fullName ||
    order.customerEmail
  ).trim();
  const txDate = (input.transactionDate || new Date().toISOString().slice(0, 10)).trim();

  const tolerance = getAmountTolerance(order.currency);
  const diff = amountSent - order.totalDisplay;
  const amountMismatchFlag = Math.abs(diff) > tolerance;
  const amountMismatchNote = amountMismatchFlag
    ? diff < 0
      ? `Underpayment suspected: submitted ${order.currency} ${amountSent.toLocaleString()} vs expected ${order.currency} ${order.totalDisplay.toLocaleString()}.`
      : `Amount differs: submitted ${order.currency} ${amountSent.toLocaleString()} vs expected ${order.currency} ${order.totalDisplay.toLocaleString()}.`
    : undefined;

  const isResubmission = Boolean(
    existingSubmissions.some(
      (s) =>
        s.orderId === order.id &&
        (s.status === 'REJECTED' || s.status === 'INFO_REQUESTED' || s.status === 'PENDING_VERIFICATION')
    )
  );

  const now = new Date().toISOString();
  const prevPaymentStatus = payment.status;
  const submissionId = generateId('psub');

  let receiptMeta:
    | {
        storagePath: string;
        objectKey?: string;
        storageProvider: 'cloudflare_r2' | 'firebase_storage' | 'local_media';
        mimeType: 'image/jpeg' | 'image/png' | 'image/webp';
        sizeBytes: number;
      }
    | undefined;
  if (input.receiptImageDataUrl) {
    try {
      receiptMeta = await savePaymentReceiptFile(order.id, submissionId, input.receiptImageDataUrl);
    } catch (err: any) {
      return {
        status: 400,
        error:
          err?.message ||
          pickBi(
            custLang,
            'Unable to process uploaded receipt screenshot.',
            'Imeshindikana kuchakata picha ya risiti iliyopakiwa.'
          ),
      };
    }
  }

  const submission: PaymentSubmission = {
    id: submissionId,
    orderId: order.id,
    paymentId: payment.id,
    customerId: order.customerId,
    customerEmail: order.customerEmail,
    customerName: order.shippingAddress.fullName || senderName,
    paymentMethod: chosenMethod,
    transactionId: input.transactionId.trim(),
    normalizedTransactionId: normalizedTx,
    amountExpectedDisplay: order.totalDisplay,
    amountSentDisplay: amountSent,
    currency: order.currency,
    senderName,
    senderPhone: input.senderPhone?.trim() || undefined,
    transactionDate: txDate,
    hasReceiptImage: Boolean(receiptMeta),
    receiptStoragePath: receiptMeta?.storagePath,
    receiptObjectKey: receiptMeta?.objectKey,
    receiptStorageProvider: receiptMeta?.storageProvider,
    receiptMimeType: receiptMeta?.mimeType,
    receiptSizeBytes: receiptMeta?.sizeBytes,
    receiptFileName: input.receiptFileName,
    status: 'PENDING_VERIFICATION',
    isDuplicateSuspected: Boolean(suspiciousDuplicate),
    duplicateOfSubmissionId: suspiciousDuplicate?.id,
    duplicateFlagNote: suspiciousDuplicate
      ? `Matches pending submission ${suspiciousDuplicate.id} on order ${suspiciousDuplicate.orderId}.`
      : undefined,
    amountMismatchFlag,
    amountMismatchNote,
    createdAt: now,
    updatedAt: now,
  };

  // Mark earlier non-verified pending submissions on this same order as superseded/rejected cleanly if customer resubmitted
  for (const prev of existingSubmissions) {
    if (prev.orderId === order.id && prev.status === 'INFO_REQUESTED') {
      prev.status = 'REJECTED';
      prev.adminNotes = `Superseded by customer resubmission ${submission.id}`;
      prev.updatedAt = now;
      await upsertPaymentSubmission(prev);
    }
  }

  await upsertPaymentSubmission(submission);

  order.paymentProvider = chosenMethod;
  order.submittedTransactionId = submission.transactionId;
  order.submittedPayerName = senderName;
  if (submission.senderPhone) order.submittedPayerPhone = submission.senderPhone;
  order.transactionSubmittedAt = now;
  order.latestSubmissionId = submission.id;
  order.paymentRejectionReason = undefined;
  order.paymentInfoRequestMessage = undefined;
  order.paymentStatus = 'AWAITING_VERIFICATION';
  order.overallStatus = 'Awaiting Payment Verification';
  order.updatedAt = now;

  payment.provider = chosenMethod;
  payment.submittedTransactionId = submission.transactionId;
  payment.status = 'AWAITING_VERIFICATION';
  payment.failureReason = undefined;
  payment.updatedAt = now;

  for (const sid of order.suborderIds) {
    const sub = store.suborders[sid];
    if (!sub) continue;
    sub.paymentStatus = 'AWAITING_VERIFICATION';
    sub.status = 'Awaiting Payment Verification';
    sub.updatedAt = now;
    sub.statusHistory.push({
      status: 'Awaiting Payment Verification',
      timestamp: now,
      actor: order.customerEmail,
      note: `Customer submitted manual payment proof (${chosenMethod === 'manual_mobile' ? 'M-Pesa' : 'NMB Bank'} Ref: ${submission.transactionId}). Pending Admin verification.`,
    });
    await upsertSuborder(sub);
  }

  await upsertPayment(payment);
  await upsertOrder(order);
  await saveStore(store);

  await appendPaymentAuditLog({
    paymentId: payment.id,
    submissionId: submission.id,
    orderId: order.id,
    action: isResubmission ? 'PAYMENT_RESUBMITTED' : 'PAYMENT_SUBMITTED',
    previousStatus: prevPaymentStatus,
    newStatus: 'PENDING_VERIFICATION',
    actorUid: input.actorUid || order.customerId,
    actorEmail: input.actorEmail || order.customerEmail,
    actorRole: input.actorRole || 'customer',
    metadata: {
      paymentMethod: chosenMethod,
      transactionId: submission.transactionId,
      amountSent,
      isDuplicateSuspected: submission.isDuplicateSuspected,
      amountMismatchFlag: submission.amountMismatchFlag,
    },
  });

  // Notify customer
  await createNotification({
    recipientUid: order.customerId,
    type: 'payment',
    priority: 'high',
    dedupeKey: `pay_sub_cust:${submission.id}`,
    title: pickBi(
      custLang,
      `Payment Submitted — Pending Verification (${order.id})`,
      `Malipo Yamewasilishwa — Inasubiri Uhakiki (${order.id})`
    ),
    message: pickBi(
      custLang,
      `Reference ${submission.transactionId} (${order.currency} ${amountSent.toLocaleString()}) has been received. Note: Submitting a reference does not confirm payment until Admin verifies incoming funds.`,
      `Kumbukumbu ${submission.transactionId} (${order.currency} ${amountSent.toLocaleString()}) imepokelewa. Kumbuka: Kuwasilisha namba ya muamala hakuthibitishi malipo hadi Admin atakapohakiki fedha zilizoingia.`
    ),
    targetType: 'order',
    targetId: order.id,
  });

  // Notify admins (special security alert if duplicate suspected)
  const adminUids = getAdminUids(store);
  for (const adminUid of adminUids) {
    if (submission.isDuplicateSuspected) {
      await createNotification({
        recipientUid: adminUid,
        type: 'security',
        title: `Suspicious Duplicate Ref: ${submission.transactionId}`,
        message: `Order ${order.id} submitted duplicate reference ${submission.transactionId} matching ${suspiciousDuplicate?.orderId}. Review immediately in Payment Verification.`,
        targetType: 'payment_submission',
        targetId: submission.id,
      });
    } else {
      await createNotification({
        recipientUid: adminUid,
        type: 'payment',
        title: `Verify Payment: ${submission.transactionId}`,
        message: `Order ${order.id} (${order.currency} ${amountSent.toLocaleString()}) via ${
          chosenMethod === 'manual_mobile' ? 'M-Pesa' : 'NMB Bank'
        }${amountMismatchFlag ? ' [AMOUNT MISMATCH]' : ''} awaits verification.`,
        targetType: 'payment_submission',
        targetId: submission.id,
      });
    }
  }

  return {
    order,
    payment,
    submission: sanitizeSubmissionForClient(submission),
  };
  });
}

export interface VerifySubmissionInput {
  submissionId: string;
  action: 'APPROVE' | 'REJECT' | 'REQUEST_INFO';
  reason?: string;
  adminNotes?: string;
  actor: UserAccount;
  language?: LanguageCode;
}

export async function reviewPaymentSubmission(input: VerifySubmissionInput): Promise<
  | { status: number; error: string }
  | {
      submission: PaymentSubmission;
      order: Order;
      payment: PaymentTransaction;
    }
> {
  return withStoreLock(async () => {
    const store = await getStore();
    const adminLang = input.language || resolveUserLanguage(store, input.actor.uid, 'sw');
    const submission = store.paymentSubmissions[input.submissionId];
  if (!submission) {
    return {
      status: 404,
      error: pickBi(adminLang, 'Payment submission not found.', 'Uthibitisho wa malipo haujapatikana.'),
    };
  }

  const order = store.orders[submission.orderId];
  const payment = store.payments[submission.paymentId];
  if (!order || !payment) {
    return {
      status: 404,
      error: pickBi(adminLang, 'Order or payment record missing.', 'Kumbukumbu ya oda au malipo haipo.'),
    };
  }
  const custLang = resolveUserLanguage(store, order.customerId, 'sw');

  if (submission.status === 'VERIFIED' && input.action === 'APPROVE') {
    return {
      submission: sanitizeSubmissionForClient(submission),
      order,
      payment,
    };
  }

  if (input.action === 'REJECT' && (!input.reason || input.reason.trim().length < 5)) {
    return {
      status: 400,
      error: pickBi(
        adminLang,
        'A clear rejection reason (minimum 5 characters) is mandatory when rejecting a payment.',
        'Sababu wazi ya kukataa (angalau herufi 5) ni lazima unapokataa malipo.'
      ),
    };
  }

  if (input.action === 'REQUEST_INFO' && (!input.reason || input.reason.trim().length < 5)) {
    return {
      status: 400,
      error: pickBi(
        adminLang,
        'Please enter specific instructions/questions for the customer (minimum 5 characters).',
        'Tafadhali weka maelekezo au maswali mahsusi kwa mteja (angalau herufi 5).'
      ),
    };
  }

  const now = new Date().toISOString();
  const prevSubStatus: PaymentSubmissionStatus = submission.status;

  if (input.action === 'APPROVE') {
    submission.status = 'VERIFIED';
    submission.rejectionReason = undefined;
    submission.infoRequestMessage = undefined;
    if (input.adminNotes) submission.adminNotes = input.adminNotes.trim();
    submission.reviewedByUid = input.actor.uid;
    submission.reviewedByEmail = input.actor.email;
    submission.reviewedAt = now;
    submission.updatedAt = now;

    payment.status = 'CONFIRMED';
    payment.webhookVerified = true;
    payment.webhookEvent = `manual_admin:${input.actor.email}`;
    payment.failureReason = undefined;
    payment.updatedAt = now;

    const autoRelease = store.settings.autoReleaseSubordersOnPaymentConfirm ?? true;
    order.paymentStatus = 'CONFIRMED';
    order.adminVerifiedBy = input.actor.email;
    order.adminVerifiedAt = now;
    order.paymentRejectionReason = undefined;
    order.paymentInfoRequestMessage = undefined;

    for (const sid of order.suborderIds) {
      const sub = store.suborders[sid];
      if (!sub) continue;
      sub.paymentStatus = 'CONFIRMED';
      if (autoRelease) {
        sub.fulfillmentReleased = true;
        sub.status = 'Awaiting Supplier Confirmation';
        sub.statusHistory.push(
          {
            status: 'Payment Confirmed',
            timestamp: now,
            actor: `admin:${input.actor.email}`,
            note: `Admin verified payment (${submission.transactionId}).`,
          },
          {
            status: 'Awaiting Supplier Confirmation',
            timestamp: now,
            actor: 'system',
            note: `Suborder released to ${sub.supplierName} for fulfillment.`,
          }
        );
      } else {
        sub.fulfillmentReleased = false;
        sub.status = 'Payment Confirmed';
        sub.statusHistory.push({
          status: 'Payment Confirmed',
          timestamp: now,
          actor: `admin:${input.actor.email}`,
          note: `Admin verified payment (${submission.transactionId}). Awaiting Admin manual release to supplier.`,
        });
      }
      sub.updatedAt = now;
      await upsertSuborder(sub);

      if (autoRelease) {
        const supLang = resolveUserLanguage(store, sub.supplierOwnerUid, 'sw');
        await createNotification({
          recipientUid: sub.supplierOwnerUid,
          type: 'fulfillment',
          title: pickBi(
            supLang,
            `New Paid Order Ready for Fulfillment (${sub.id})`,
            `Oda Mpya Iliyolipiwa Iko Tayari Kutimizwa (${sub.id})`
          ),
          message: pickBi(
            supLang,
            `Payment verified for order ${order.id} (${sub.items.length} item(s)). Ship to ${sub.customerShippingName} (${sub.customerShippingCity}, ${sub.customerShippingCountry}) before ${new Date(sub.responseDeadlineAt).toLocaleString()}.`,
            `Malipo yamehakikiwa kwa oda ${order.id} (bidhaa ${sub.items.length}). Tuma kwenda kwa ${sub.customerShippingName} (${sub.customerShippingCity}, ${sub.customerShippingCountry}) kabla ya ${new Date(sub.responseDeadlineAt).toLocaleString()}.`
          ),
          targetType: 'suborder',
          targetId: sub.id,
        });
      }
    }

    const siblings = order.suborderIds.map((id) => store.suborders[id]).filter(Boolean);
    order.overallStatus = computeOverallOrderStatus(siblings) as OrderStatus;
    order.updatedAt = now;

    await upsertPaymentSubmission(submission);
    await upsertPayment(payment);
    await upsertOrder(order);
    await saveStore(store);

    await appendPaymentAuditLog({
      paymentId: payment.id,
      submissionId: submission.id,
      orderId: order.id,
      action: 'PAYMENT_VERIFIED',
      previousStatus: prevSubStatus,
      newStatus: 'VERIFIED',
      actorUid: input.actor.uid,
      actorEmail: input.actor.email,
      actorRole: input.actor.role,
      reason: input.adminNotes?.trim(),
      metadata: {
        transactionId: submission.transactionId,
        autoReleasedToSuppliers: autoRelease,
      },
    });
    await appendAuditLog({
      actorUid: input.actor.uid,
      actorEmail: input.actor.email,
      actorRole: input.actor.role,
      action: 'PAYMENT_VERIFIED',
      targetType: 'payment_submission',
      targetId: submission.id,
      targetUserId: order.customerId,
      relatedOrderId: order.id,
      previousValue: prevSubStatus,
      newValue: 'VERIFIED',
      outcome: 'SUCCESS',
      technicalRef: submission.transactionId,
      details: `Verified order ${order.id} ref=${submission.transactionId} (${submission.currency} ${submission.amountSentDisplay}).`,
    });

    await createNotification({
      recipientUid: order.customerId,
      type: 'payment',
      priority: 'high',
      dedupeKey: `pay_verified:${order.id}:${submission.id}`,
      title: pickBi(custLang, `Payment Verified (${order.id})`, `Malipo Yamehakikiwa (${order.id})`),
      message: pickBi(
        custLang,
        `Your payment (${submission.transactionId}) has been verified by Admin. Your order is now moving to fulfillment.`,
        `Malipo yako (${submission.transactionId}) yamehakikiwa na Admin. Oda yako sasa inaelekea kwenye maandalizi ya usafirishaji.`
      ),
      targetType: 'order',
      targetId: order.id,
    });

    return {
      submission: sanitizeSubmissionForClient(submission),
      order,
      payment,
    };
  }

  if (input.action === 'REJECT') {
    const rejectionReason = input.reason!.trim();
    submission.status = 'REJECTED';
    submission.rejectionReason = rejectionReason;
    submission.infoRequestMessage = undefined;
    if (input.adminNotes) submission.adminNotes = input.adminNotes.trim();
    submission.reviewedByUid = input.actor.uid;
    submission.reviewedByEmail = input.actor.email;
    submission.reviewedAt = now;
    submission.updatedAt = now;

    order.paymentStatus = 'PENDING';
    order.overallStatus = 'Pending Payment';
    order.paymentRejectionReason = rejectionReason;
    order.paymentInfoRequestMessage = undefined;
    order.updatedAt = now;

    payment.status = 'PENDING';
    payment.failureReason = rejectionReason;
    payment.updatedAt = now;

    for (const sid of order.suborderIds) {
      const sub = store.suborders[sid];
      if (!sub) continue;
      sub.paymentStatus = 'PENDING';
      sub.fulfillmentReleased = false;
      sub.status = 'Pending Payment';
      sub.updatedAt = now;
      sub.statusHistory.push({
        status: 'Pending Payment',
        timestamp: now,
        actor: `admin:${input.actor.email}`,
        note: `Payment rejected: ${rejectionReason}`,
      });
      await upsertSuborder(sub);
    }

    await upsertPaymentSubmission(submission);
    await upsertPayment(payment);
    await upsertOrder(order);
    await saveStore(store);

    await appendPaymentAuditLog({
      paymentId: payment.id,
      submissionId: submission.id,
      orderId: order.id,
      action: 'PAYMENT_REJECTED',
      previousStatus: prevSubStatus,
      newStatus: 'REJECTED',
      actorUid: input.actor.uid,
      actorEmail: input.actor.email,
      actorRole: input.actor.role,
      reason: rejectionReason,
    });
    await appendAuditLog({
      actorUid: input.actor.uid,
      actorEmail: input.actor.email,
      actorRole: input.actor.role,
      action: 'PAYMENT_REJECTED',
      targetType: 'payment_submission',
      targetId: submission.id,
      targetUserId: order.customerId,
      relatedOrderId: order.id,
      previousValue: prevSubStatus,
      newValue: 'REJECTED',
      outcome: 'SUCCESS',
      technicalRef: submission.transactionId,
      details: `Rejected ref=${submission.transactionId} on ${order.id}: ${rejectionReason}`,
    });

    await createNotification({
      recipientUid: order.customerId,
      type: 'payment',
      priority: 'urgent',
      dedupeKey: `pay_rejected:${submission.id}`,
      title: pickBi(
        custLang,
        `Payment Rejected — Action Required (${order.id})`,
        `Malipo Yamekataliwa — Hatua Inahitajika (${order.id})`
      ),
      message: pickBi(
        custLang,
        `Your payment submission (${submission.transactionId}) was rejected: ${rejectionReason}. Please submit a valid transaction reference.`,
        `Uthibitisho wako wa malipo (${submission.transactionId}) umekataliwa: ${rejectionReason}. Tafadhali wasilisha namba sahihi ya muamala.`
      ),
      targetType: 'order',
      targetId: order.id,
    });

    return {
      submission: sanitizeSubmissionForClient(submission),
      order,
      payment,
    };
  }

  // REQUEST_INFO
  const infoMessage = input.reason!.trim();
  submission.status = 'INFO_REQUESTED';
  submission.infoRequestMessage = infoMessage;
  if (input.adminNotes) submission.adminNotes = input.adminNotes.trim();
  submission.reviewedByUid = input.actor.uid;
  submission.reviewedByEmail = input.actor.email;
  submission.reviewedAt = now;
  submission.updatedAt = now;

  order.paymentStatus = 'AWAITING_VERIFICATION';
  order.overallStatus = 'Awaiting Payment Verification';
  order.paymentInfoRequestMessage = infoMessage;
  order.updatedAt = now;

  await upsertPaymentSubmission(submission);
  await upsertOrder(order);
  await saveStore(store);

  await appendPaymentAuditLog({
    paymentId: payment.id,
    submissionId: submission.id,
    orderId: order.id,
    action: 'PAYMENT_INFO_REQUESTED',
    previousStatus: prevSubStatus,
    newStatus: 'INFO_REQUESTED',
    actorUid: input.actor.uid,
    actorEmail: input.actor.email,
    actorRole: input.actor.role,
    reason: infoMessage,
  });
  await appendAuditLog({
    actorUid: input.actor.uid,
    actorEmail: input.actor.email,
    actorRole: input.actor.role,
    action: 'PAYMENT_INFO_REQUESTED',
    targetType: 'payment_submission',
    targetId: submission.id,
    targetUserId: order.customerId,
    relatedOrderId: order.id,
    previousValue: prevSubStatus,
    newValue: 'INFO_REQUESTED',
    outcome: 'SUCCESS',
    technicalRef: submission.transactionId,
    details: `Requested more info for ${order.id}: ${infoMessage}`,
  });

  await createNotification({
    recipientUid: order.customerId,
    type: 'payment',
    priority: 'urgent',
    dedupeKey: `pay_info:${submission.id}`,
    title: pickBi(
      custLang,
      `Payment Clarification Requested (${order.id})`,
      `Ufafanuzi wa Malipo Unahitajika (${order.id})`
    ),
    message: pickBi(
      custLang,
      `Admin requested additional details for payment ${submission.transactionId}: ${infoMessage}`,
      `Admin ameomba maelezo ya ziada kwa malipo ${submission.transactionId}: ${infoMessage}`
    ),
    targetType: 'order',
    targetId: order.id,
  });

  return {
    submission: sanitizeSubmissionForClient(submission),
    order,
    payment,
  };
  });
}
