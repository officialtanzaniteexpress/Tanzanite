import {
  LanguageCode,
  NotificationType,
  OrderStatus,
  PaymentStatus,
  PaymentSubmissionStatus,
  ProductStatus,
  RefundRequest,
  SupplierPayout,
  SupplierStatus,
  SupportTicket,
  UserRole,
} from '../types/marketplace';

export function getBcp47Locale(lang: LanguageCode): string {
  return lang === 'sw' ? 'sw-TZ' : 'en-US';
}

export function formatLocalizedNumber(
  value: number,
  lang: LanguageCode = 'en',
  options?: Intl.NumberFormatOptions
): string {
  if (!Number.isFinite(value)) return '0';
  try {
    return value.toLocaleString(getBcp47Locale(lang), options);
  } catch {
    return value.toLocaleString('en-US', options);
  }
}

export function formatLocalizedDate(
  iso: string | number | Date | undefined | null,
  lang: LanguageCode = 'en',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): string {
  if (!iso) return '—';
  const date = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(date.getTime())) return String(iso);
  try {
    return new Intl.DateTimeFormat(getBcp47Locale(lang), options).format(date);
  } catch {
    return date.toLocaleDateString('en-US');
  }
}

export function formatLocalizedDateTime(
  iso: string | number | Date | undefined | null,
  lang: LanguageCode = 'en'
): string {
  return formatLocalizedDate(iso, lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const ORDER_STATUS_MAP: Record<OrderStatus, { en: string; sw: string }> = {
  'Pending Payment': { en: 'Pending Payment', sw: 'Inasubiri Malipo' },
  'Awaiting Payment Verification': {
    en: 'Awaiting Payment Verification',
    sw: 'Inasubiri Uhakiki wa Malipo',
  },
  'Payment Confirmed': { en: 'Payment Confirmed', sw: 'Malipo Yamethibitishwa' },
  'Awaiting Supplier Confirmation': {
    en: 'Awaiting Supplier Confirmation',
    sw: 'Inasubiri Uthibitisho wa Msambazaji',
  },
  'Supplier Confirmed': { en: 'Supplier Confirmed', sw: 'Imethibitishwa na Msambazaji' },
  Processing: { en: 'Processing', sw: 'Inashughulikiwa' },
  'Ready for Shipping': { en: 'Ready for Shipping', sw: 'Tayari Kusafirishwa' },
  Shipped: { en: 'Shipped', sw: 'Imesafirishwa' },
  'In Transit': { en: 'In Transit', sw: 'Njiani' },
  Delivered: { en: 'Delivered', sw: 'Imefika' },
  Completed: { en: 'Completed', sw: 'Imekamilika' },
  'Cancellation Requested': {
    en: 'Cancellation Requested',
    sw: 'Ombi la Kufuta Limetumwa',
  },
  Cancelled: { en: 'Cancelled', sw: 'Imefutwa' },
  'Refund Requested': { en: 'Refund Requested', sw: 'Ombi la Kurejeshewa Pesa' },
  'Partially Refunded': { en: 'Partially Refunded', sw: 'Imerejeshwa Kiasi' },
  Refunded: { en: 'Refunded', sw: 'Pesa Imerejeshwa' },
};

const PAYMENT_STATUS_MAP: Record<PaymentStatus, { en: string; sw: string }> = {
  PENDING: { en: 'Pending Payment', sw: 'Inasubiri Malipo' },
  AWAITING_VERIFICATION: {
    en: 'Awaiting Verification',
    sw: 'Inasubiri Uhakiki',
  },
  CONFIRMED: { en: 'Verified & Confirmed', sw: 'Imethibitishwa' },
  FAILED: { en: 'Failed', sw: 'Imeshindikana' },
  REFUNDED: { en: 'Refunded', sw: 'Imerejeshwa' },
  PARTIALLY_REFUNDED: { en: 'Partially Refunded', sw: 'Imerejeshwa Kiasi' },
};

const SUBMISSION_STATUS_MAP: Record<PaymentSubmissionStatus, { en: string; sw: string }> = {
  PENDING_VERIFICATION: { en: 'Pending Verification', sw: 'Inasubiri Uhakiki' },
  INFO_REQUESTED: { en: 'Info Requested', sw: 'Taarifa Zaidi Zinahitajika' },
  VERIFIED: { en: 'Verified', sw: 'Imethibitishwa' },
  REJECTED: { en: 'Rejected', sw: 'Imekataliwa' },
};

const PRODUCT_STATUS_MAP: Record<ProductStatus, { en: string; sw: string }> = {
  DRAFT: { en: 'Draft', sw: 'Rasimu' },
  PENDING_APPROVAL: { en: 'Pending Approval', sw: 'Inasubiri Idhini' },
  APPROVED: { en: 'Approved (Held)', sw: 'Imeidhinishwa (Inasubiri Kuchapishwa)' },
  PUBLISHED: { en: 'Published Live', sw: 'Ipo Sokoni' },
  REJECTED: { en: 'Rejected', sw: 'Imekataliwa' },
  CHANGES_REQUESTED: { en: 'Changes Requested', sw: 'Inahitaji Marekebisho' },
  ARCHIVED: { en: 'Archived', sw: 'Imehifadhiwa Kwenye Kumbukumbu' },
};

const SUPPLIER_STATUS_MAP: Record<SupplierStatus, { en: string; sw: string }> = {
  REGISTERED: { en: 'Registered', sw: 'Amesajiliwa' },
  PENDING_REVIEW: { en: 'Pending Review', sw: 'Inasubiri Ukaguzi' },
  APPROVED: { en: 'Approved', sw: 'Ameidhinishwa' },
  REJECTED: { en: 'Rejected', sw: 'Amekataliwa' },
  SUSPENDED: { en: 'Suspended', sw: 'Amesimamishwa' },
};

const REFUND_STATUS_MAP: Record<RefundRequest['status'], { en: string; sw: string }> = {
  SUBMITTED: { en: 'Submitted', sw: 'Imetumwa' },
  EVIDENCE_REQUESTED: { en: 'Evidence Requested', sw: 'Ushahidi Unahitajika' },
  SUPPLIER_RESPONDED: { en: 'Supplier Responded', sw: 'Msambazaji Amejibu' },
  APPROVED: { en: 'Approved', sw: 'Imeidhinishwa' },
  REJECTED: { en: 'Rejected', sw: 'Imekataliwa' },
  REFUNDED: { en: 'Refunded', sw: 'Pesa Imerejeshwa' },
};

const TICKET_STATUS_MAP: Record<SupportTicket['status'], { en: string; sw: string }> = {
  OPEN: { en: 'Open', sw: 'Wazi' },
  IN_PROGRESS: { en: 'In Progress', sw: 'Inashughulikiwa' },
  RESOLVED: { en: 'Resolved', sw: 'Imetatuliwa' },
  CLOSED: { en: 'Closed', sw: 'Imefungwa' },
};

const TICKET_CATEGORY_MAP: Record<SupportTicket['category'], { en: string; sw: string }> = {
  order: { en: 'Order', sw: 'Oda' },
  payment: { en: 'Payment', sw: 'Malipo' },
  supplier: { en: 'Supplier', sw: 'Msambazaji' },
  general: { en: 'General', sw: 'Jumla' },
};

const TICKET_PRIORITY_MAP: Record<SupportTicket['priority'], { en: string; sw: string }> = {
  low: { en: 'Low', sw: 'Chini' },
  medium: { en: 'Medium', sw: 'Wastani' },
  high: { en: 'High', sw: 'Juu' },
  urgent: { en: 'Urgent', sw: 'Dharura' },
};

const NOTIFICATION_TYPE_MAP: Record<NotificationType, { en: string; sw: string }> = {
  order: { en: 'Order', sw: 'Oda' },
  payment: { en: 'Payment', sw: 'Malipo' },
  fulfillment: { en: 'Fulfillment', sw: 'Usafirishaji' },
  return: { en: 'Return & Refund', sw: 'Kurudisha & Marejesho' },
  supplier: { en: 'Supplier', sw: 'Msambazaji' },
  product: { en: 'Product', sw: 'Bidhaa' },
  security: { en: 'Security', sw: 'Usalama' },
  system: { en: 'System', sw: 'Mfumo' },
};

const PAYOUT_STATUS_MAP: Record<SupplierPayout['status'], { en: string; sw: string }> = {
  REQUESTED: { en: 'Requested', sw: 'Imeombwa' },
  UNDER_REVIEW: { en: 'Under Review', sw: 'Inakaguliwa' },
  APPROVED: { en: 'Approved', sw: 'Imeidhinishwa' },
  PAID: { en: 'Paid', sw: 'Imelipwa' },
  REJECTED: { en: 'Rejected', sw: 'Imekataliwa' },
};

const ROLE_MAP: Record<UserRole, { en: string; sw: string }> = {
  super_admin: { en: 'Super Admin', sw: 'Msimamizi Mkuu' },
  staff: { en: 'Admin Staff', sw: 'Mhudumu wa Utawala' },
  supplier: { en: 'Supplier', sw: 'Msambazaji' },
  customer: { en: 'Customer', sw: 'Mteja' },
  delivery_partner: { en: 'Delivery Partner', sw: 'Mshirika wa Usafirishaji' },
};

const GENDER_MAP: Record<string, { en: string; sw: string }> = {
  MEN: { en: 'Men', sw: 'Wanaume' },
  WOMEN: { en: 'Women', sw: 'Wanawake' },
  UNISEX: { en: 'Unisex', sw: 'Jinsia Zote' },
};

const CATEGORY_MAP: Record<string, { en: string; sw: string }> = {
  Shirts: { en: 'Shirts', sw: 'Mashati' },
  Dresses: { en: 'Dresses', sw: 'Magauni' },
  Trousers: { en: 'Trousers', sw: 'Suruali' },
  Jackets: { en: 'Jackets', sw: 'Makoti' },
  Suits: { en: 'Suits', sw: 'Suti' },
  Denim: { en: 'Denim', sw: 'Jeans' },
  Skirts: { en: 'Skirts', sw: 'Sketi' },
  Tops: { en: 'Tops', sw: 'Blauzi na Topu' },
  Footwear: { en: 'Footwear', sw: 'Viatu' },
  Handbags: { en: 'Handbags', sw: 'Mikoba' },
  Accessories: { en: 'Accessories', sw: 'Vifaa na Pambo' },
  Kaftans: { en: 'Kaftans', sw: 'Kaftani' },
  Outerwear: { en: 'Outerwear', sw: 'Makoti na Sweta' },
  Traditional: { en: 'Traditional Wear', sw: 'Mavazi ya Asili' },
  Uncategorized: { en: 'Uncategorized', sw: 'Bila Aina' },
};

const COUNTRY_MAP: Record<string, { en: string; sw: string }> = {
  Tanzania: { en: 'Tanzania', sw: 'Tanzania' },
  Kenya: { en: 'Kenya', sw: 'Kenya' },
  Uganda: { en: 'Uganda', sw: 'Uganda' },
  Rwanda: { en: 'Rwanda', sw: 'Rwanda' },
  'United Kingdom': { en: 'United Kingdom', sw: 'Uingereza' },
  UK: { en: 'United Kingdom', sw: 'Uingereza' },
  'United States': { en: 'United States', sw: 'Marekani' },
  USA: { en: 'United States', sw: 'Marekani' },
  Italy: { en: 'Italy', sw: 'Italia' },
  France: { en: 'France', sw: 'Ufaransa' },
  Turkey: { en: 'Turkey', sw: 'Uturuki' },
  UAE: { en: 'UAE', sw: 'Falme za Kiarabu' },
  China: { en: 'China', sw: 'Uchina' },
  India: { en: 'India', sw: 'India' },
  'South Africa': { en: 'South Africa', sw: 'Afrika Kusini' },
  Nigeria: { en: 'Nigeria', sw: 'Nigeria' },
  International: { en: 'International', sw: 'Kimataifa' },
};

export function translateOrderStatus(status: string, lang: LanguageCode): string {
  return ORDER_STATUS_MAP[status as OrderStatus]?.[lang] || status;
}

export function translatePaymentStatus(status: string, lang: LanguageCode): string {
  return PAYMENT_STATUS_MAP[status as PaymentStatus]?.[lang] || status;
}

export function translateSubmissionStatus(status: string, lang: LanguageCode): string {
  return SUBMISSION_STATUS_MAP[status as PaymentSubmissionStatus]?.[lang] || status;
}

export function translateProductStatus(status: string, lang: LanguageCode): string {
  return PRODUCT_STATUS_MAP[status as ProductStatus]?.[lang] || status;
}

export function translateSupplierStatus(status: string, lang: LanguageCode): string {
  return SUPPLIER_STATUS_MAP[status as SupplierStatus]?.[lang] || status;
}

export function translateRefundStatus(status: string, lang: LanguageCode): string {
  return REFUND_STATUS_MAP[status as RefundRequest['status']]?.[lang] || status;
}

export function translateTicketStatus(status: string, lang: LanguageCode): string {
  return TICKET_STATUS_MAP[status as SupportTicket['status']]?.[lang] || status;
}

export function translateTicketCategory(cat: string, lang: LanguageCode): string {
  return TICKET_CATEGORY_MAP[cat as SupportTicket['category']]?.[lang] || cat;
}

export function translateTicketPriority(priority: string, lang: LanguageCode): string {
  return TICKET_PRIORITY_MAP[priority as SupportTicket['priority']]?.[lang] || priority;
}

export function translateNotificationType(type: string, lang: LanguageCode): string {
  return NOTIFICATION_TYPE_MAP[type as NotificationType]?.[lang] || type;
}

export function translatePayoutStatus(status: string, lang: LanguageCode): string {
  return PAYOUT_STATUS_MAP[status as SupplierPayout['status']]?.[lang] || status;
}

export function translateUserRole(role: string, lang: LanguageCode): string {
  return ROLE_MAP[role as UserRole]?.[lang] || role;
}

export function translateUserStatus(status: string, lang: LanguageCode): string {
  if (status === 'active') return lang === 'sw' ? 'Hai' : 'Active';
  if (status === 'suspended') return lang === 'sw' ? 'Imesimamishwa' : 'Suspended';
  return status;
}

export function translateGender(gender: string, lang: LanguageCode): string {
  return GENDER_MAP[gender]?.[lang] || gender;
}

export function translateCategory(category: string, lang: LanguageCode): string {
  return CATEGORY_MAP[category]?.[lang] || category;
}

export function translateCountry(country: string, lang: LanguageCode): string {
  return COUNTRY_MAP[country]?.[lang] || country;
}

export function translatePaymentMethod(methodId: string, lang: LanguageCode): string {
  if (methodId === 'manual_mobile') {
    return lang === 'sw' ? 'M-Pesa (Tanzania)' : 'M-Pesa (Tanzania)';
  }
  if (methodId === 'manual_nmb' || methodId === 'manual_bank') {
    return lang === 'sw' ? 'Benki ya NMB (NMB Bank Transfer)' : 'NMB Bank Transfer';
  }
  return methodId;
}

export function translatePlanName(plan: string, lang: LanguageCode): string {
  if (plan === 'free_standard' || plan === 'commission_standard') {
    return lang === 'sw' ? 'Mpango wa Bure (TZS 0)' : 'Free Standard (TZS 0)';
  }
  if (plan === 'growth_featured') {
    return lang === 'sw' ? 'Ukuaji Maalum' : 'Growth Featured';
  }
  if (plan === 'enterprise') {
    return lang === 'sw' ? 'Biashara Kubwa' : 'Enterprise';
  }
  return plan;
}

export function translateSettlementStatus(status: string | undefined, lang: LanguageCode): string {
  if (status === 'SENT_TO_SUPPLIER') {
    return lang === 'sw' ? 'Malipo Yametumwa kwa Msambazaji' : 'Admin Settlement Sent';
  }
  if (status === 'PENDING_ADMIN_TRANSFER') {
    return lang === 'sw' ? 'Inasubiri Malipo Kutoka Admin' : 'Pending Admin Transfer';
  }
  return status || '—';
}
