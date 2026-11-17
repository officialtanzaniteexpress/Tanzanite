import crypto from 'crypto';
import {
  ChatbotFaqEntry,
  ChatbotKnowledgeDocument,
  ChatbotKnowledgeEvent,
  ChatbotKnowledgeSourceType,
  ChatbotSyncSummary,
  Coupon,
  LanguageCode,
  MarketplaceSettings,
  Order,
  Product,
  ShippingZone,
  SupplierProfile,
  UserAccount,
} from '../types/marketplace.ts';
import {
  deleteChatbotKnowledgeDoc,
  generateId,
  getStore,
  StoreSnapshot,
  upsertChatbotKnowledgeDoc,
  upsertChatbotSyncEvent,
} from './store.ts';

function computeChecksum(payload: unknown): string {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(payload), 'utf-8')
    .digest('hex')
    .slice(0, 24);
}

function makeDocId(sourceType: ChatbotKnowledgeSourceType, entityId: string): string {
  const safeEntity = entityId.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${sourceType}__${safeEntity}`;
}

function formatTzsFromUsd(usd: number, tzsRate: number): string {
  return Math.round(usd * tzsRate).toLocaleString('en-US');
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);
}

function buildProductDoc(
  product: Product,
  settings: MarketplaceSettings
): Omit<ChatbotKnowledgeDocument, 'checksum' | 'syncStatus' | 'updatedAt'> {
  const tzsRate = Number(settings.currencyRates?.TZS) || 2650;
  const priceTzs = formatTzsFromUsd(product.sellingPriceUsd, tzsRate);
  const shipTzs = formatTzsFromUsd(product.shippingFeeUsd || 0, tzsRate);
  const variantsText = (product.variants || [])
    .map((v) => `${v.size}/${v.color} (stock: ${v.stock})`)
    .join(', ');
  const variantsTextSw = (product.variants || [])
    .map((v) => `${v.size}/${v.color} (zilizopo: ${v.stock})`)
    .join(', ');

  const titleEn = `${product.title} (${product.brand})`;
  const titleSw = `${product.title} (${product.brand})`;
  const contentEn = [
    `Product ID: ${product.id}. Category: ${product.gender} / ${product.category}.`,
    `Price: $${product.sellingPriceUsd} USD (~TZS ${priceTzs}).`,
    `Stock available: ${product.totalStock} units. Variants: ${variantsText || 'Standard'}.`,
    `Supplier: ${product.supplierName} (${product.shippingOriginCountry}).`,
    `Delivery ETA: ${product.estimatedDaysMin}-${product.estimatedDaysMax} days. Shipping fee from $${product.shippingFeeUsd} USD (~TZS ${shipTzs}).`,
    `Return policy: ${product.returnPolicySummary}.`,
    `Description: ${product.description}`,
  ].join(' ');

  const contentSw = [
    `Namba ya Bidhaa: ${product.id}. Kundi: ${product.gender} / ${product.category}.`,
    `Bei: $${product.sellingPriceUsd} USD (takriban TZS ${priceTzs}).`,
    `Idadi iliyopo dukani: ${product.totalStock}. Ukubwa na rangi: ${variantsTextSw || 'Kawaida'}.`,
    `Muuzaji: ${product.supplierName} (${product.shippingOriginCountry}).`,
    `Muda wa kufika: siku ${product.estimatedDaysMin}-${product.estimatedDaysMax}. Gharama ya usafiri kuanzia $${product.shippingFeeUsd} USD (takriban TZS ${shipTzs}).`,
    `Sera ya kurudisha: ${product.returnPolicySummary}.`,
    `Maelezo: ${product.description}`,
  ].join(' ');

  const keywords = Array.from(
    new Set([
      ...tokenize(product.title),
      ...tokenize(product.brand),
      ...tokenize(product.category),
      product.gender.toLowerCase(),
      ...tokenize(product.supplierName),
      ...tokenize(product.description).slice(0, 12),
      ...(product.variants || []).flatMap((v) => [...tokenize(v.size), ...tokenize(v.color)]),
    ])
  );

  return {
    id: makeDocId('product', product.id),
    sourceType: 'product',
    entityId: product.id,
    titleEn,
    titleSw,
    contentEn,
    contentSw,
    keywords,
    visibility: 'public',
  };
}

function buildCategoryDoc(
  category: string,
  products: Product[]
): Omit<ChatbotKnowledgeDocument, 'checksum' | 'syncStatus' | 'updatedAt'> {
  const catProducts = products.filter(
    (p) =>
      p.category.toLowerCase() === category.toLowerCase() &&
      (p.status === 'APPROVED' || p.status === 'PUBLISHED')
  );
  const sampleTitles = catProducts.slice(0, 6).map((p) => `${p.title} ($${p.sellingPriceUsd})`);
  return {
    id: makeDocId('category', category.toLowerCase().replace(/\s+/g, '_')),
    sourceType: 'category',
    entityId: category,
    titleEn: `Category: ${category} (${catProducts.length} live items)`,
    titleSw: `Kundi la Bidhaa: ${category} (bidhaa ${catProducts.length} zipo)`,
    contentEn: `Category "${category}" has ${catProducts.length} published items currently in stock or available: ${sampleTitles.join('; ') || 'Browse catalog for latest arrivals'}.`,
    contentSw: `Kundi la "${category}" lina bidhaa ${catProducts.length} zinazopatikana sasa: ${sampleTitles.join('; ') || 'Tembelea orodha ya bidhaa kuona mipya'}.`,
    keywords: Array.from(new Set([...tokenize(category), 'category', 'kundi', ...sampleTitles.flatMap(tokenize)])),
    visibility: 'public',
  };
}

function buildSupplierDoc(
  sup: SupplierProfile
): Omit<ChatbotKnowledgeDocument, 'checksum' | 'syncStatus' | 'updatedAt'> {
  return {
    id: makeDocId('supplier', sup.id),
    sourceType: 'supplier',
    entityId: sup.id,
    titleEn: `Verified Supplier: ${sup.businessName} (${sup.country})`,
    titleSw: `Muuzaji Aliyethibitishwa: ${sup.businessName} (${sup.country})`,
    contentEn: `Approved marketplace supplier "${sup.businessName}" specializing in ${sup.category}, shipping from ${sup.shippingOrigin}. ${sup.description}`,
    contentSw: `Muuzaji aliyeidhinishwa "${sup.businessName}" anayehusika na ${sup.category}, akituma mizigo kutoka ${sup.shippingOrigin}. ${sup.description}`,
    keywords: Array.from(new Set([...tokenize(sup.businessName), ...tokenize(sup.category), ...tokenize(sup.country), 'supplier', 'muuzaji'])),
    visibility: 'public',
  };
}

function buildCouponDoc(
  coupon: Coupon,
  settings: MarketplaceSettings
): Omit<ChatbotKnowledgeDocument, 'checksum' | 'syncStatus' | 'updatedAt'> {
  const tzsRate = Number(settings.currencyRates?.TZS) || 2650;
  const discountLabelEn =
    coupon.type === 'percentage' ? `${coupon.value}% off` : `$${coupon.value} USD off`;
  const discountLabelSw =
    coupon.type === 'percentage' ? `punguzo la ${coupon.value}%` : `punguzo la $${coupon.value} USD`;
  return {
    id: makeDocId('coupon', coupon.id),
    sourceType: 'coupon',
    entityId: coupon.id,
    titleEn: `Promo Code ${coupon.code}: ${discountLabelEn}`,
    titleSw: `Kodi ya Punguzo ${coupon.code}: ${discountLabelSw}`,
    contentEn: `Coupon code "${coupon.code}" gives ${discountLabelEn} on orders of at least $${coupon.minOrderUsd} USD (~TZS ${formatTzsFromUsd(coupon.minOrderUsd, tzsRate)}). Currently ${coupon.active ? 'ACTIVE' : 'INACTIVE'}.${coupon.expiresAt ? ` Expires: ${coupon.expiresAt}.` : ''}`,
    contentSw: `Kodi ya punguzo "${coupon.code}" inatoa ${discountLabelSw} kwa oda ya kuanzia $${coupon.minOrderUsd} USD (takriban TZS ${formatTzsFromUsd(coupon.minOrderUsd, tzsRate)}). Hali ya sasa: ${coupon.active ? 'INATUMIKA' : 'IMEZIMWA'}.${coupon.expiresAt ? ` Mwisho wa ofa: ${coupon.expiresAt}.` : ''}`,
    keywords: [coupon.code.toLowerCase(), 'coupon', 'promo', 'discount', 'punguzo', 'kodi', 'code'],
    visibility: 'public',
  };
}

function buildShippingDoc(
  zone: ShippingZone,
  settings: MarketplaceSettings
): Omit<ChatbotKnowledgeDocument, 'checksum' | 'syncStatus' | 'updatedAt'> {
  const tzsRate = Number(settings.currencyRates?.TZS) || 2650;
  const feeTzs = formatTzsFromUsd(zone.baseFeeUsd, tzsRate);
  return {
    id: makeDocId('shipping', zone.id),
    sourceType: 'shipping',
    entityId: zone.id,
    titleEn: `Shipping Zone: ${zone.name}`,
    titleSw: `Eneo la Usafirishaji: ${zone.name}`,
    contentEn: `Zone "${zone.name}" delivers to: ${zone.countries.join(', ')}. Base shipping fee: $${zone.baseFeeUsd} USD (~TZS ${feeTzs}). Estimated delivery: ${zone.estimatedDaysMin}-${zone.estimatedDaysMax} days. ${zone.customsNote || ''}`,
    contentSw: `Eneo la "${zone.name}" linasafirisha kwenda: ${zone.countries.join(', ')}. Gharama ya awali ya usafirishaji: $${zone.baseFeeUsd} USD (takriban TZS ${feeTzs}). Muda wa kufika: siku ${zone.estimatedDaysMin}-${zone.estimatedDaysMax}. ${zone.customsNote || ''}`,
    keywords: Array.from(
      new Set([
        'shipping',
        'delivery',
        'usafirishaji',
        'gharama',
        'fee',
        ...zone.countries.flatMap(tokenize),
        ...tokenize(zone.name),
      ])
    ),
    visibility: 'public',
  };
}

function buildPaymentDoc(
  settings: MarketplaceSettings
): Omit<ChatbotKnowledgeDocument, 'checksum' | 'syncStatus' | 'updatedAt'> {
  const mpesaPhone = settings.mpesaPhone || settings.manualPaymentPhone;
  const mpesaHolder =
    settings.mpesaAccountHolder || settings.officialRecipientName || settings.manualPaymentAccountName;
  const nmbAcc = settings.nmbAccountNumber || settings.manualPaymentBankAccount;
  const nmbHolder =
    settings.nmbAccountName || settings.officialRecipientName || settings.manualPaymentAccountName;

  return {
    id: makeDocId('payment', 'channels'),
    sourceType: 'payment',
    entityId: 'channels',
    titleEn: 'Official Payment Methods (M-Pesa & NMB Bank)',
    titleSw: 'Njia Rasmi za Malipo (M-Pesa na NMB Bank)',
    contentEn: [
      `M-Pesa (${settings.mpesaEnabled ? 'ACTIVE' : 'DISABLED'}): Send exact amount to ${mpesaPhone} (Recipient: ${mpesaHolder}).`,
      `NMB Bank (${settings.nmbEnabled ? 'ACTIVE' : 'DISABLED'}): Account ${nmbAcc}, Name: ${nmbHolder}, Branch: ${settings.nmbBranch || settings.manualPaymentBankName}.`,
      'Rule: After paying, submit your Transaction ID and optional receipt screenshot in the app. Submitting a reference sets status to Awaiting Payment Verification — payment is ONLY confirmed after Admin verifies funds.',
    ].join(' '),
    contentSw: [
      `M-Pesa (${settings.mpesaEnabled ? 'INAPATIKANA' : 'IMEZIMWA'}): Tuma kiasi kamili kwenda ${mpesaPhone} (Jina: ${mpesaHolder}).`,
      `Benki ya NMB (${settings.nmbEnabled ? 'INAPATIKANA' : 'IMEZIMWA'}): Akaunti ${nmbAcc}, Jina: ${nmbHolder}, Tawi: ${settings.nmbBranch || settings.manualPaymentBankName}.`,
      'Sheria: Baada ya kulipa, wasilisha Namba ya Muamala (Transaction ID) na picha ya risiti (si lazima) kwenye mfumo. Kuwasilisha namba huweka oda kwenye hali ya Inasubiri Uhakiki wa Malipo — malipo yanathibitishwa TU baada ya Admin kuhakiki fedha.',
    ].join(' '),
    keywords: ['mpesa', 'm-pesa', 'nmb', 'bank', 'benki', 'payment', 'malipo', 'lipa', 'verify', 'uhakiki'],
    visibility: 'public',
  };
}

function buildSettingsDoc(
  settings: MarketplaceSettings
): Omit<ChatbotKnowledgeDocument, 'checksum' | 'syncStatus' | 'updatedAt'> {
  const rates = settings.currencyRates || { USD: 1, TZS: 2650, GBP: 0.79, EUR: 0.92, KES: 129 };
  return {
    id: makeDocId('setting', 'storefront_config'),
    sourceType: 'setting',
    entityId: 'storefront_config',
    titleEn: `${settings.brandName} Storefront Settings & Currencies`,
    titleSw: `Mipangilio ya Duka na Sarafu za ${settings.brandName}`,
    contentEn: `Brand: ${settings.brandName}. Headline: "${settings.heroTitle}". Promo: "${settings.promoBannerTitle || ''} — ${settings.promoBannerSubtitle || ''}". Announcement: "${settings.announcementText}". Supported currencies & rates per 1 USD: TZS ${rates.TZS}, KES ${rates.KES}, GBP ${rates.GBP}, EUR ${rates.EUR}. Guest checkout allowed: ${settings.allowGuestCheckout ? 'Yes' : 'No'}.`,
    contentSw: `Jina la Duka: ${settings.brandName}. Kichwa: "${settings.heroTitleSw || settings.heroTitle}". Ofa: "${settings.promoBannerTitleSw || settings.promoBannerTitle || ''} — ${settings.promoBannerSubtitleSw || settings.promoBannerSubtitle || ''}". Tangazo: "${settings.announcementTextSw || settings.announcementText}". Sarafu zinazotumika kwa $1 USD: TZS ${rates.TZS}, KES ${rates.KES}, GBP ${rates.GBP}, EUR ${rates.EUR}. Ununuzi bila kuingia (Guest checkout): ${settings.allowGuestCheckout ? 'Ndiyo' : 'Hapana'}.`,
    keywords: ['currency', 'sarafu', 'rate', 'tzs', 'usd', 'gbp', 'eur', 'kes', 'guest', 'whatsapp', 'instagram', 'tiktok'],
    visibility: 'public',
  };
}

function buildFaqDoc(
  faq: ChatbotFaqEntry
): Omit<ChatbotKnowledgeDocument, 'checksum' | 'syncStatus' | 'updatedAt'> {
  return {
    id: makeDocId('faq', faq.id),
    sourceType: 'faq',
    entityId: faq.id,
    titleEn: `FAQ: ${faq.questionEn}`,
    titleSw: `Swali: ${faq.questionSw}`,
    contentEn: `Q: ${faq.questionEn} A: ${faq.answerEn}`,
    contentSw: `Swali: ${faq.questionSw} Jibu: ${faq.answerSw}`,
    keywords: Array.from(
      new Set([
        ...faq.tags.map((t) => t.toLowerCase()),
        ...tokenize(faq.questionEn),
        ...tokenize(faq.questionSw),
        faq.category,
      ])
    ),
    visibility: 'public',
  };
}

function buildStaticPoliciesAndNavigation(): Omit<
  ChatbotKnowledgeDocument,
  'checksum' | 'syncStatus' | 'updatedAt'
>[] {
  return [
    {
      id: makeDocId('policy', 'marketplace_policies'),
      sourceType: 'policy',
      entityId: 'marketplace_policies',
      titleEn: 'Return, Privacy, Terms & Supplier Policies',
      titleSw: 'Sera za Marejesho, Faragha, Masharti na Wauzaji',
      contentEn:
        'Returns: 14-day return window for unworn items with original tags via Customer Dashboard > Returns & Refunds. Supplier Registration: 100% Free to apply with no monthly fees; Admin reviews KYC before supplier store activation. Privacy: Customers may export data or request erasure under Profile > Privacy & Data. Manual payment verification protects buyers and sellers.',
      contentSw:
        'Marejesho: Siku 14 za kuomba kurejesha bidhaa ambazo hazijavaliwa na zina lebo zake kupitia Dashibodi ya Mteja > Marejesho. Usajili wa Muuzaji: Bure kabisa bila ada ya mwezi; Admin hukagua taarifa kabla ya kuidhinisha duka. Faragha: Wateja wanaweza kupakua taarifa zao au kuomba kufutwa kwa taarifa binafsi.',
      keywords: ['return', 'refund', 'privacy', 'terms', 'policy', 'supplier', 'free', 'sera', 'marejesho', 'faragha', 'bure'],
      visibility: 'public',
    },
    {
      id: makeDocId('navigation', 'site_map'),
      sourceType: 'navigation',
      entityId: 'site_map',
      titleEn: 'Website Navigation & Support Channels',
      titleSw: 'Mwongozo wa Kurasa za Tovuti na Mawasiliano',
      contentEn:
        'Pages available: Storefront (browse/filter Men, Women, Unisex, categories, search), Track Order (enter Order ID + email), Support / FAQ (open tickets), Cart & Checkout Drawer, Customer Dashboard (Orders, Returns, Payments, Wishlist, Addresses, Support Tickets, Profile), Supplier Portal, Admin Console. Official WhatsApp Concierge: +255 795 023 200 (https://wa.me/255795023200).',
      contentSw:
        'Kurasa zilizopo: Duka Kuu (chagua Wanaume, Wanawake, Wote, makundi, tafuta bidhaa), Fuatilia Oda (weka namba ya oda na barua pepe), Msaada / Maswali, Kikapu na Malipo (Checkout), Dashibodi ya Mteja (Oda, Marejesho, Malipo, Vipendwa, Anwani, Tiketi za Msaada, Wasifu), Dashibodi ya Muuzaji, na Dashibodi ya Admin. WhatsApp Rasmi: +255 795 023 200.',
      keywords: ['page', 'menu', 'track', 'checkout', 'cart', 'dashboard', 'whatsapp', 'support', 'ukurasa', 'menyu', 'kikapu', 'msaada'],
      visibility: 'public',
    },
  ];
}

function buildKnowledgeDocForEntity(
  store: StoreSnapshot,
  sourceType: ChatbotKnowledgeSourceType,
  entityId: string
): Omit<ChatbotKnowledgeDocument, 'checksum' | 'syncStatus' | 'updatedAt'> | null {
  if (sourceType === 'product') {
    const product = store.products[entityId];
    if (!product || (product.status !== 'APPROVED' && product.status !== 'PUBLISHED')) {
      return null;
    }
    return buildProductDoc(product, store.settings);
  }
  if (sourceType === 'supplier') {
    const sup = store.suppliers[entityId];
    if (!sup || sup.status !== 'APPROVED') return null;
    return buildSupplierDoc(sup);
  }
  if (sourceType === 'coupon') {
    const coupon = store.coupons[entityId];
    if (!coupon || !coupon.active) return null;
    return buildCouponDoc(coupon, store.settings);
  }
  if (sourceType === 'shipping') {
    const zone = store.shippingZones[entityId];
    if (!zone) return null;
    return buildShippingDoc(zone, store.settings);
  }
  if (sourceType === 'payment') {
    return buildPaymentDoc(store.settings);
  }
  if (sourceType === 'setting') {
    return buildSettingsDoc(store.settings);
  }
  if (sourceType === 'faq') {
    const faq = store.chatbotFaqs[entityId];
    if (!faq || !faq.active) return null;
    return buildFaqDoc(faq);
  }
  if (sourceType === 'category') {
    return buildCategoryDoc(entityId, Object.values(store.products));
  }
  if (sourceType === 'policy' || sourceType === 'navigation') {
    return (
      buildStaticPoliciesAndNavigation().find(
        (d) => d.sourceType === sourceType && d.entityId === entityId
      ) || null
    );
  }
  return null;
}

export async function triggerChatbotKnowledgeSync(params: {
  sourceType: ChatbotKnowledgeSourceType;
  entityId: string;
  action?: 'UPSERT' | 'DELETE';
  actorEmail?: string;
  forceError?: string;
}): Promise<ChatbotKnowledgeEvent> {
  const now = new Date().toISOString();
  const docId = makeDocId(params.sourceType, params.entityId);
  const store = await getStore();
  const eventKey = `${params.sourceType}:${params.entityId}`;

  // Reuse prior pending/failed event attempts counter if any
  const existingEvent = Object.values(store.chatbotSyncEvents)
    .filter((e) => e.eventKey === eventKey && e.status === 'FAILED')
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];

  const eventId = existingEvent ? existingEvent.id : generateId('cbsync');
  const prevAttempts = existingEvent ? existingEvent.attempts : 0;

  try {
    if (params.forceError) {
      throw new Error(params.forceError);
    }

    const docDraft =
      params.action === 'DELETE'
        ? null
        : buildKnowledgeDocForEntity(store, params.sourceType, params.entityId);

    if (!docDraft) {
      if (store.chatbotKnowledge[docId]) {
        await deleteChatbotKnowledgeDoc(docId);
      }
      // Also refresh category doc if product changed/deleted
      const event: ChatbotKnowledgeEvent = {
        id: eventId,
        eventKey,
        sourceType: params.sourceType,
        entityId: params.entityId,
        action: 'DELETE',
        status: 'SYNCED',
        attempts: prevAttempts + 1,
        actorEmail: params.actorEmail || 'system',
        createdAt: existingEvent?.createdAt || now,
        updatedAt: now,
        syncedAt: now,
      };
      await upsertChatbotSyncEvent(event);
      return event;
    }

    const checksum = computeChecksum({
      titleEn: docDraft.titleEn,
      titleSw: docDraft.titleSw,
      contentEn: docDraft.contentEn,
      contentSw: docDraft.contentSw,
      keywords: docDraft.keywords,
    });

    const existingDoc = store.chatbotKnowledge[docId];
    if (existingDoc && existingDoc.checksum === checksum && existingDoc.syncStatus === 'SYNCED') {
      const event: ChatbotKnowledgeEvent = {
        id: eventId,
        eventKey,
        sourceType: params.sourceType,
        entityId: params.entityId,
        action: 'UPSERT',
        status: 'SYNCED',
        attempts: prevAttempts + 1,
        actorEmail: params.actorEmail || 'system',
        createdAt: existingEvent?.createdAt || now,
        updatedAt: now,
        syncedAt: now,
      };
      await upsertChatbotSyncEvent(event);
      return event;
    }

    const nextDoc: ChatbotKnowledgeDocument = {
      ...docDraft,
      checksum,
      syncStatus: 'SYNCED',
      updatedAt: now,
    };
    await upsertChatbotKnowledgeDoc(nextDoc);

    const event: ChatbotKnowledgeEvent = {
      id: eventId,
      eventKey,
      sourceType: params.sourceType,
      entityId: params.entityId,
      action: 'UPSERT',
      status: 'SYNCED',
      attempts: prevAttempts + 1,
      actorEmail: params.actorEmail || 'system',
      createdAt: existingEvent?.createdAt || now,
      updatedAt: now,
      syncedAt: now,
    };
    await upsertChatbotSyncEvent(event);
    return event;
  } catch (err: any) {
    const errMsg = String(err?.message || 'Knowledge sync failed').slice(0, 220);
    const existingDoc = store.chatbotKnowledge[docId];
    if (existingDoc) {
      await upsertChatbotKnowledgeDoc({
        ...existingDoc,
        syncStatus: 'FAILED',
        updatedAt: now,
      });
    }
    const failedEvent: ChatbotKnowledgeEvent = {
      id: eventId,
      eventKey,
      sourceType: params.sourceType,
      entityId: params.entityId,
      action: params.action || 'UPSERT',
      status: 'FAILED',
      attempts: prevAttempts + 1,
      lastError: errMsg,
      actorEmail: params.actorEmail || 'system',
      createdAt: existingEvent?.createdAt || now,
      updatedAt: now,
    };
    await upsertChatbotSyncEvent(failedEvent);
    return failedEvent;
  }
}

export async function reindexAllChatbotKnowledge(actorEmail = 'system'): Promise<{
  indexedCount: number;
  removedCount: number;
  failedCount: number;
  summary: ChatbotSyncSummary;
}> {
  const store = await getStore();
  const now = new Date().toISOString();
  const desiredDocs: Omit<ChatbotKnowledgeDocument, 'checksum' | 'syncStatus' | 'updatedAt'>[] = [];

  for (const product of Object.values(store.products)) {
    if (product.status === 'APPROVED' || product.status === 'PUBLISHED') {
      desiredDocs.push(buildProductDoc(product, store.settings));
    }
  }

  const allProducts = Object.values(store.products);
  const categories = Array.from(new Set(allProducts.map((p) => p.category).filter(Boolean)));
  for (const cat of categories) {
    desiredDocs.push(buildCategoryDoc(cat, allProducts));
  }

  for (const sup of Object.values(store.suppliers)) {
    if (sup.status === 'APPROVED') {
      desiredDocs.push(buildSupplierDoc(sup));
    }
  }

  for (const coupon of Object.values(store.coupons)) {
    if (coupon.active) {
      desiredDocs.push(buildCouponDoc(coupon, store.settings));
    }
  }

  for (const zone of Object.values(store.shippingZones)) {
    desiredDocs.push(buildShippingDoc(zone, store.settings));
  }

  desiredDocs.push(buildPaymentDoc(store.settings));
  desiredDocs.push(buildSettingsDoc(store.settings));
  desiredDocs.push(...buildStaticPoliciesAndNavigation());

  for (const faq of Object.values(store.chatbotFaqs)) {
    if (faq.active) {
      desiredDocs.push(buildFaqDoc(faq));
    }
  }

  const desiredIds = new Set(desiredDocs.map((d) => d.id));
  let removedCount = 0;
  for (const existingId of Object.keys(store.chatbotKnowledge)) {
    if (!desiredIds.has(existingId)) {
      await deleteChatbotKnowledgeDoc(existingId);
      removedCount += 1;
    }
  }

  let indexedCount = 0;
  let failedCount = 0;
  for (const draft of desiredDocs) {
    const checksum = computeChecksum({
      titleEn: draft.titleEn,
      titleSw: draft.titleSw,
      contentEn: draft.contentEn,
      contentSw: draft.contentSw,
      keywords: draft.keywords,
    });
    const existing = store.chatbotKnowledge[draft.id];
    if (!existing || existing.checksum !== checksum || existing.syncStatus !== 'SYNCED') {
      try {
        await upsertChatbotKnowledgeDoc({
          ...draft,
          checksum,
          syncStatus: 'SYNCED',
          updatedAt: now,
        });
        indexedCount += 1;
      } catch {
        failedCount += 1;
      }
    } else {
      indexedCount += 1;
    }
  }

  await upsertChatbotSyncEvent({
    id: generateId('cbsync'),
    eventKey: 'system:full_reindex',
    sourceType: 'setting',
    entityId: 'full_reindex',
    action: 'REINDEX',
    status: failedCount > 0 ? 'FAILED' : 'SYNCED',
    attempts: 1,
    actorEmail,
    createdAt: now,
    updatedAt: now,
    syncedAt: now,
  });

  const latestStore = await getStore();
  return {
    indexedCount,
    removedCount,
    failedCount,
    summary: getChatbotKnowledgeSummary(latestStore),
  };
}

export async function initializeChatbotKnowledgeIfEmpty(): Promise<void> {
  const store = await getStore();
  if (Object.keys(store.chatbotKnowledge).length === 0) {
    await reindexAllChatbotKnowledge('startup');
  }
}

export async function retryFailedChatbotSyncs(actorEmail = 'system'): Promise<{
  attempted: number;
  recovered: number;
  stillFailed: number;
  summary: ChatbotSyncSummary;
}> {
  const store = await getStore();
  const failedEvents = Object.values(store.chatbotSyncEvents).filter(
    (e) => e.status === 'FAILED' || e.status === 'PENDING'
  );
  let recovered = 0;
  let stillFailed = 0;

  for (const ev of failedEvents) {
    const res = await triggerChatbotKnowledgeSync({
      sourceType: ev.sourceType,
      entityId: ev.entityId,
      action: ev.action === 'DELETE' ? 'DELETE' : 'UPSERT',
      actorEmail,
    });
    if (res.status === 'SYNCED') recovered += 1;
    else stillFailed += 1;
  }

  const latestStore = await getStore();
  return {
    attempted: failedEvents.length,
    recovered,
    stillFailed,
    summary: getChatbotKnowledgeSummary(latestStore),
  };
}

export function getChatbotKnowledgeSummary(store: StoreSnapshot): ChatbotSyncSummary {
  const docs = Object.values(store.chatbotKnowledge || {});
  const events = Object.values(store.chatbotSyncEvents || {}).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );
  const faqs = Object.values(store.chatbotFaqs || {});
  const sourceBreakdown: Record<string, number> = {};
  let syncedCount = 0;
  let failedCount = 0;
  let pendingCount = 0;
  let lastSyncAt: string | null = null;

  for (const d of docs) {
    sourceBreakdown[d.sourceType] = (sourceBreakdown[d.sourceType] || 0) + 1;
    if (d.syncStatus === 'SYNCED') syncedCount += 1;
    else if (d.syncStatus === 'FAILED') failedCount += 1;
    else pendingCount += 1;
    if (!lastSyncAt || d.updatedAt > lastSyncAt) {
      lastSyncAt = d.updatedAt;
    }
  }

  for (const ev of events) {
    if (ev.syncedAt && (!lastSyncAt || ev.syncedAt > lastSyncAt)) {
      lastSyncAt = ev.syncedAt;
    }
  }

  return {
    lastSyncAt,
    totalDocuments: docs.length,
    syncedCount,
    failedCount,
    pendingCount,
    sourceBreakdown,
    recentEvents: events.slice(0, 40),
    faqsCount: faqs.length,
    activeFaqsCount: faqs.filter((f) => f.active).length,
  };
}

function canUserAccessOrder(
  store: StoreSnapshot,
  order: Order,
  authUser?: UserAccount | null
): boolean {
  if (!authUser) return false;
  if (authUser.role === 'super_admin' || authUser.role === 'staff') return true;
  if (order.customerId === authUser.uid) return true;
  if (authUser.role === 'supplier') {
    return order.suborderIds.some((sid) => {
      const sub = store.suborders[sid];
      return sub && sub.supplierOwnerUid === authUser.uid;
    });
  }
  return false;
}

export interface ChatbotRagContextResult {
  groundedContext: string;
  matchedDocIds: string[];
  privacyBlockedOrderIds: string[];
  scopeRole: 'guest' | 'customer' | 'supplier' | 'admin';
  groundedOfflineReplyEn: string;
  groundedOfflineReplySw: string;
}

export function buildChatbotRagContext(
  store: StoreSnapshot,
  params: {
    question: string;
    history?: { role: 'user' | 'assistant'; text: string }[];
    authUser?: UserAccount | null;
    language: LanguageCode;
  }
): ChatbotRagContextResult {
  const authUser = params.authUser || null;
  const scopeRole: ChatbotRagContextResult['scopeRole'] = !authUser
    ? 'guest'
    : authUser.role === 'super_admin' || authUser.role === 'staff'
      ? 'admin'
      : authUser.role === 'supplier'
        ? 'supplier'
        : 'customer';

  const combinedInput = [
    params.question,
    ...(params.history || []).slice(-4).map((h) => h.text),
  ].join(' ');
  const queryTokens = new Set(tokenize(combinedInput));
  const tzsRate = Number(store.settings.currencyRates?.TZS) || 2650;

  // 1. Live Product Catalog (authoritative real-time price & stock)
  const publishedProducts = Object.values(store.products).filter(
    (p) => p.status === 'APPROVED' || p.status === 'PUBLISHED'
  );
  const scoredProducts = publishedProducts
    .map((p) => {
      const haystack = `${p.title} ${p.brand} ${p.category} ${p.gender} ${p.description} ${p.supplierName}`.toLowerCase();
      let score = 0;
      for (const tok of queryTokens) {
        if (haystack.includes(tok)) score += 3;
      }
      if (p.featured) score += 1;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score);

  const topProducts = scoredProducts.slice(0, 12).map((item) => {
    const p = item.product;
    const priceTzs = formatTzsFromUsd(p.sellingPriceUsd, tzsRate);
    const variants = (p.variants || []).map((v) => `${v.size}/${v.color}:${v.stock}`).join(', ');
    return `- [${p.id}] ${p.title} (${p.brand}, ${p.gender}/${p.category}) | Price: $${p.sellingPriceUsd} USD / ~TZS ${priceTzs} | Stock: ${p.totalStock} | Variants: ${variants || 'Standard'} | Delivery: ${p.estimatedDaysMin}-${p.estimatedDaysMax}d (Ship fee: $${p.shippingFeeUsd} USD) | Supplier: ${p.supplierName}`;
  });

  // 2. Live Coupons & Shipping Zones
  const activeCoupons = Object.values(store.coupons).filter((c) => c.active);
  const couponsSummary =
    activeCoupons.length > 0
      ? activeCoupons
          .map(
            (c) =>
              `- ${c.code}: ${c.type === 'percentage' ? `${c.value}% off` : `$${c.value} USD off`} (min order $${c.minOrderUsd} USD / ~TZS ${formatTzsFromUsd(c.minOrderUsd, tzsRate)})`
          )
          .join('\n')
      : '- No active promotional coupons right now.';

  const zonesSummary = Object.values(store.shippingZones)
    .map(
      (z) =>
        `- ${z.name}: countries=[${z.countries.join(', ')}], baseFee=$${z.baseFeeUsd} USD (~TZS ${formatTzsFromUsd(z.baseFeeUsd, tzsRate)}), ETA=${z.estimatedDaysMin}-${z.estimatedDaysMax} days`
    )
    .join('\n');

  // 3. Payment Settings
  const paymentSummary = [
    `- M-Pesa (${store.settings.mpesaEnabled ? 'ENABLED' : 'DISABLED'}): Pay to ${store.settings.mpesaPhone || store.settings.manualPaymentPhone} (Name: ${store.settings.mpesaAccountHolder || store.settings.officialRecipientName}).`,
    `- NMB Bank (${store.settings.nmbEnabled ? 'ENABLED' : 'DISABLED'}): Account ${store.settings.nmbAccountNumber || store.settings.manualPaymentBankAccount}, Name: ${store.settings.nmbAccountName || store.settings.officialRecipientName}, Branch: ${store.settings.nmbBranch || store.settings.manualPaymentBankName}.`,
    '- Payment Verification Policy: Customer submits Transaction ID & optional receipt; order stays in Awaiting Payment Verification until Admin confirms incoming funds.',
  ].join('\n');

  // 4. Active FAQs & Indexed Knowledge Retrieval
  const activeFaqs = Object.values(store.chatbotFaqs || {}).filter((f) => f.active);
  const indexedDocs = Object.values(store.chatbotKnowledge || {}).filter(
    (d) => d.visibility === 'public' && d.sourceType !== 'product'
  );
  const matchedDocs = indexedDocs
    .map((doc) => {
      let score = 0;
      for (const kw of doc.keywords) {
        if (queryTokens.has(kw) || combinedInput.toLowerCase().includes(kw)) score += 3;
      }
      const text = `${doc.titleEn} ${doc.titleSw} ${doc.contentEn} ${doc.contentSw}`.toLowerCase();
      for (const tok of queryTokens) {
        if (text.includes(tok)) score += 1;
      }
      return { doc, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  const faqText = activeFaqs
    .map((f) =>
      params.language === 'sw'
        ? `- Swali: ${f.questionSw} | Jibu: ${f.answerSw}`
        : `- Q: ${f.questionEn} | A: ${f.answerEn}`
    )
    .join('\n');

  // 5. Privacy & Role-Scoped Order / Account Context
  const mentionedOrderIds = Array.from(new Set(combinedInput.match(/\bord_[a-zA-Z0-9_-]+/g) || []));
  const mentionedSubIds = Array.from(new Set(combinedInput.match(/\bsub_[a-zA-Z0-9_-]+/g) || []));

  const privacyBlockedOrderIds: string[] = [];
  const authorizedOrderLines: string[] = [];

  for (const ordId of mentionedOrderIds) {
    const order = store.orders[ordId];
    if (!order) {
      if (!authUser) {
        privacyBlockedOrderIds.push(ordId);
      } else {
        authorizedOrderLines.push(`- Order ${ordId}: Not found for your account.`);
      }
      continue;
    }
    if (!canUserAccessOrder(store, order, authUser)) {
      privacyBlockedOrderIds.push(ordId);
      continue;
    }
    const subStatuses = order.suborderIds
      .map((sid) => {
        const s = store.suborders[sid];
        return s ? `${sid}:${s.status}${s.trackingNumber ? ` (Tracking: ${s.trackingNumber})` : ''}` : null;
      })
      .filter(Boolean)
      .join('; ');
    const latestSub = order.latestSubmissionId ? store.paymentSubmissions[order.latestSubmissionId] : null;
    authorizedOrderLines.push(
      `- Order ${order.id}: Overall="${order.overallStatus}", Payment="${order.paymentStatus}", Total=${order.currency} ${order.totalDisplay.toLocaleString()} ($${order.totalUsd} USD), Destination=${order.shippingAddress.city}, ${order.shippingAddress.country}${latestSub ? `, Latest Payment Ref=${latestSub.transactionId} (${latestSub.status})` : ''}${subStatuses ? `, Suborders=[${subStatuses}]` : ''}.`
    );
  }

  for (const subId of mentionedSubIds) {
    const sub = store.suborders[subId];
    if (!sub) {
      privacyBlockedOrderIds.push(subId);
      continue;
    }
    const canSee =
      authUser &&
      (authUser.role === 'super_admin' ||
        authUser.role === 'staff' ||
        sub.customerId === authUser.uid ||
        (authUser.role === 'supplier' && sub.supplierOwnerUid === authUser.uid));
    if (!canSee) {
      privacyBlockedOrderIds.push(subId);
      continue;
    }
    authorizedOrderLines.push(
      `- Suborder ${sub.id} (Order ${sub.orderId}): Status="${sub.status}", Payment="${sub.paymentStatus}", Supplier=${sub.supplierName}, Tracking=${sub.trackingNumber || 'Pending'}.`
    );
  }

  let userScopeBlock = 'USER ROLE SCOPE: Public visitor / guest (ONLY public catalog, shipping, coupons, payment instructions, policies, and FAQs allowed. Never reveal private user or order records).';
  if (authUser && scopeRole === 'customer') {
    const myOrders = Object.values(store.orders)
      .filter((o) => o.customerId === authUser.uid)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5);
    const mySummary =
      myOrders.length > 0
        ? myOrders
            .map(
              (o) =>
                `  * ${o.id}: ${o.overallStatus} (Payment: ${o.paymentStatus}, Total: ${o.currency} ${o.totalDisplay.toLocaleString()})`
            )
            .join('\n')
        : '  * No orders placed yet.';
    userScopeBlock = `USER ROLE SCOPE: Signed-in Customer (${authUser.displayName}, uid=${authUser.uid}). Can inspect ONLY their own orders below:\n${mySummary}`;
  } else if (authUser && scopeRole === 'supplier') {
    const mySupplier = Object.values(store.suppliers).find((s) => s.ownerUid === authUser.uid);
    const myProductsCount = mySupplier
      ? Object.values(store.products).filter((p) => p.supplierId === mySupplier.id).length
      : 0;
    const myPendingSuborders = Object.values(store.suborders).filter(
      (s) =>
        s.supplierOwnerUid === authUser.uid &&
        (s.status === 'Awaiting Supplier Confirmation' || s.status === 'Processing')
    ).length;
    userScopeBlock = `USER ROLE SCOPE: Signed-in Supplier (${mySupplier?.businessName || authUser.displayName}, Status: ${mySupplier?.status || 'NOT_APPLIED'}). Own products: ${myProductsCount}. Active suborders needing fulfillment: ${myPendingSuborders}.`;
  } else if (authUser && scopeRole === 'admin') {
    const pendingPayments = Object.values(store.paymentSubmissions).filter(
      (s) => s.status === 'PENDING_VERIFICATION'
    ).length;
    const pendingSuppliers = Object.values(store.suppliers).filter(
      (s) => s.status === 'PENDING_REVIEW'
    ).length;
    const pendingProducts = Object.values(store.products).filter(
      (p) => p.status === 'PENDING_APPROVAL'
    ).length;
    userScopeBlock = `USER ROLE SCOPE: Signed-in Admin (${authUser.role}, ${authUser.email}). Live Queue: ${pendingPayments} pending payment submission(s), ${pendingSuppliers} pending supplier application(s), ${pendingProducts} pending product approval(s).`;
  }

  const privacyBlockText =
    privacyBlockedOrderIds.length > 0
      ? `SECURITY & PRIVACY BLOCK (MANDATORY): The user asked about protected order/suborder ID(s): [${privacyBlockedOrderIds.join(', ')}] which either belong to another customer or require owner sign-in. You MUST politely refuse to disclose any details, amounts, statuses, or confirmation of those ID(s), and instruct them to sign in as the order owner or use Track Order with their Order ID + checkout email.`
      : '';

  const groundedContext = [
    `STOREFRONT BRAND: ${store.settings.brandName} | Active Announcement: ${params.language === 'sw' ? store.settings.announcementTextSw || store.settings.announcementText : store.settings.announcementText}`,
    `LIVE EXCHANGE RATE: 1 USD = ${tzsRate} TZS | KES ${store.settings.currencyRates?.KES || 129} | GBP ${store.settings.currencyRates?.GBP || 0.79} | EUR ${store.settings.currencyRates?.EUR || 0.92}`,
    userScopeBlock,
    privacyBlockText,
    authorizedOrderLines.length > 0 ? `VERIFIED OWN ORDER DETAILS:\n${authorizedOrderLines.join('\n')}` : '',
    `LIVE CATALOG PRODUCTS (${publishedProducts.length} published total, top relevant/featured):\n${topProducts.join('\n')}`,
    `ACTIVE PROMO COUPONS:\n${couponsSummary}`,
    `SHIPPING ZONES & FEES:\n${zonesSummary}`,
    `OFFICIAL PAYMENT CHANNELS:\n${paymentSummary}`,
    `OFFICIAL FAQ KNOWLEDGE:\n${faqText}`,
    matchedDocs.length > 0
      ? `INDEXED KNOWLEDGE SNIPPETS:\n${matchedDocs
          .map((m) => `- ${params.language === 'sw' ? m.doc.titleSw : m.doc.titleEn}: ${params.language === 'sw' ? m.doc.contentSw : m.doc.contentEn}`)
          .join('\n')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  // Build concise deterministic offline fallback in both EN and SW so grounded answers work seamlessly
  let groundedOfflineReplyEn = '';
  let groundedOfflineReplySw = '';

  if (privacyBlockedOrderIds.length > 0) {
    groundedOfflineReplyEn = `For privacy and security, I cannot access or share details for order ${privacyBlockedOrderIds.join(', ')}. Please sign in with the account used to place the order or use the Track Order page with your Order ID and checkout email.`;
    groundedOfflineReplySw = `Kwa sababu za faragha na usalama, siwezi kuonyesha taarifa za oda ${privacyBlockedOrderIds.join(', ')}. Tafadhali ingia kwenye akaunti iliyotumika kuweka oda hiyo au tumia ukurasa wa Fuatilia Oda kwa kuingiza namba ya oda na barua pepe yako.`;
  } else if (authorizedOrderLines.length > 0) {
    groundedOfflineReplyEn = `Here is the live status from your account:\n${authorizedOrderLines.join('\n')}`;
    groundedOfflineReplySw = `Hii hapa ni hali halisi ya oda yako:\n${authorizedOrderLines.join('\n')}`;
  } else {
    const bestDoc = matchedDocs[0]?.doc;
    const topMatchProd = scoredProducts[0] && scoredProducts[0].score > 1 ? scoredProducts[0].product : null;
    if (topMatchProd) {
      const p = topMatchProd;
      groundedOfflineReplyEn = `${p.title} (${p.brand}) is available at $${p.sellingPriceUsd} USD (~TZS ${formatTzsFromUsd(p.sellingPriceUsd, tzsRate)}) with ${p.totalStock} in stock. Delivery takes ${p.estimatedDaysMin}-${p.estimatedDaysMax} days.`;
      groundedOfflineReplySw = `${p.title} (${p.brand}) inapatikana kwa $${p.sellingPriceUsd} USD (takriban TZS ${formatTzsFromUsd(p.sellingPriceUsd, tzsRate)}) na zipo ${p.totalStock} dukani. Usafirishaji huchukua siku ${p.estimatedDaysMin}-${p.estimatedDaysMax}.`;
    } else if (bestDoc) {
      groundedOfflineReplyEn = bestDoc.contentEn;
      groundedOfflineReplySw = bestDoc.contentSw;
    } else {
      groundedOfflineReplyEn = `Welcome to ${store.settings.brandName}! We have ${publishedProducts.length} live products, M-Pesa & NMB payment options, and local & international delivery. How can I assist you today?`;
      groundedOfflineReplySw = `Karibu ${store.settings.brandName}! Tuna bidhaa ${publishedProducts.length} zinazopatikana, malipo ya M-Pesa na NMB Bank, na usafirishaji wa ndani na kimataifa. Nikusaidieje leo?`;
    }
  }

  return {
    groundedContext,
    matchedDocIds: matchedDocs.map((m) => m.doc.id),
    privacyBlockedOrderIds,
    scopeRole,
    groundedOfflineReplyEn,
    groundedOfflineReplySw,
  };
}
