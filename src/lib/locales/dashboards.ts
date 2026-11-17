import { BilingualPair } from './public-storefront';

export const DASHBOARD_TRANSLATION_PAIRS: Record<string, BilingualPair> = {
  // Customer Dashboard
  'customer.welcome': { en: 'Welcome, {{name}}', sw: 'Karibu, {{name}}' },
  'customer.memberBadge': { en: 'Verified Shopper', sw: 'Mteja Aliyethibitishwa' },
  'customer.totalOrdersKpi': { en: 'Total Orders', sw: 'Jumla ya Oda' },
  'customer.pendingVerifyKpi': { en: 'Pending Payment Verify', sw: 'Zinasubiri Uhakiki' },
  'customer.inTransitKpi': { en: 'In Fulfillment / Transit', sw: 'Zinashughulikiwa / Njiani' },
  'customer.wishlistKpi': { en: 'Saved Pieces', sw: 'Bidhaa Zilizohifadhiwa' },
  'customer.filterAll': { en: 'All', sw: 'Zote' },
  'customer.filterPendingPay': { en: 'Pending Payment', sw: 'Inasubiri Malipo' },
  'customer.filterAwaitingVerify': { en: 'Awaiting Verification', sw: 'Inasubiri Uhakiki' },
  'customer.filterActive': { en: 'Processing & Shipped', sw: 'Inashughulikiwa & Njiani' },
  'customer.filterDelivered': { en: 'Delivered / Completed', sw: 'Zimefika / Zimekamilika' },
  'customer.filterCancelled': { en: 'Cancelled / Refunded', sw: 'Zimefutwa / Zimefidiwa' },
  'customer.orderCardPlaced': { en: 'Placed on {{date}}', sw: 'Imewekwa {{date}}' },
  'customer.orderSubordersCount': {
    en: '{{count}} supplier shipment(s)',
    sw: 'Mizigo ya wasambazaji {{count}}',
  },
  'customer.requestCancelBtn': { en: 'Cancel / Request Cancellation', sw: 'Futa / Omba Kufuta Oda' },
  'customer.cancelPrompt': {
    en: 'Optional reason for cancelling this order:',
    sw: 'Sababu ya kufuta oda hii (hiari):',
  },
  'customer.confirmDeliveryNotePlaceholder': {
    en: 'Optional note (e.g., Received in good condition)',
    sw: 'Maelezo ya ziada (mf. Mzigo umefika salama)',
  },
  'customer.deliveryConfirmSuccess': {
    en: 'Delivery receipt confirmed! You may now post verified reviews.',
    sw: 'Upokeaji wa mzigo umethibitishwa! Sasa unaweza kuandika maoni.',
  },
  'customer.paymentRejectionNotice': {
    en: 'Previous payment proof was rejected: {{reason}}',
    sw: 'Uthibitisho wa awali wa malipo ulikataliwa: {{reason}}',
  },
  'customer.paymentInfoNotice': {
    en: 'Admin requested clarification: {{reason}}',
    sw: 'Admin ameomba taarifa zaidi: {{reason}}',
  },
  'customer.returnsEmpty': {
    en: 'No return or refund claims submitted yet.',
    sw: 'Bado hujaomba kurudisha bidhaa au kurejeshewa pesa.',
  },
  'customer.openReturnModalTitle': {
    en: 'Submit Return / Refund Claim',
    sw: 'Wasilisha Ombi la Kurudisha / Kurejeshewa Pesa',
  },
  'customer.selectSuborderLabel': { en: 'Supplier Shipment', sw: 'Mzigo wa Msambazaji' },
  'customer.returnReasonLabel': { en: 'Detailed Reason', sw: 'Sababu Kamili' },
  'customer.returnAmountLabel': {
    en: 'Requested Refund Amount (USD)',
    sw: 'Kiasi Unachoomba Kurejeshewa (USD)',
  },
  'customer.evidenceUrlsLabel': {
    en: 'Photo Evidence URLs (Optional, comma-separated)',
    sw: 'Viungo vya Picha za Ushahidi (Hiari, tenganisha kwa koma)',
  },
  'customer.submitReturnBtn': { en: 'Submit Claim', sw: 'Tuma Ombi la Marejesho' },
  'customer.paymentsEmpty': {
    en: 'No payment transactions recorded yet.',
    sw: 'Hakuna historia ya malipo bado.',
  },
  'customer.txIdCol': { en: 'Transaction ID', sw: 'Namba ya Muamala' },
  'customer.methodCol': { en: 'Method', sw: 'Njia' },
  'customer.amountCol': { en: 'Amount', sw: 'Kiasi' },
  'customer.wishlistEmpty': {
    en: 'Your wishlist is empty. Tap the heart icon on any piece to save it here.',
    sw: 'Hujatunza bidhaa yoyote bado. Bonyeza alama ya moyo kwenye bidhaa ili kuihifadhi hapa.',
  },
  'customer.moveToBag': { en: 'Add to Bag', sw: 'Weka Kikapuni' },
  'customer.addressesEmpty': {
    en: 'No saved delivery addresses yet. Add one below for faster checkout.',
    sw: 'Hujatunza anuani yoyote bado. Ongeza hapa chini kurahisisha malipo.',
  },
  'customer.addAddressTitle': { en: 'Add New Delivery Address', sw: 'Ongeza Anuani Mpya ya Usafirishaji' },
  'customer.addressLabelPlaceholder': { en: 'Label (e.g., Home, Office)', sw: 'Jina la Anuani (mf. Nyumbani, Ofisini)' },
  'customer.saveAddressBtn': { en: 'Save Address', sw: 'Hifadhi Anuani' },
  'customer.defaultBadge': { en: 'Default', sw: 'Kuu' },
  'customer.profileSectionTitle': { en: 'Personal Details & Avatar', sw: 'Taarifa Binafsi & Picha ya Wasifu' },
  'customer.uploadAvatarBtn': { en: 'Upload Avatar Photo', sw: 'Pakia Picha ya Wasifu' },
  'customer.removeAvatarBtn': { en: 'Remove Photo', sw: 'Ondoa Picha' },
  'customer.preferredLanguageLabel': { en: 'Preferred Language', sw: 'Lugha Unayopendelea' },
  'customer.preferredCurrencyLabel': { en: 'Preferred Currency', sw: 'Sarafu Unayopendelea' },
  'customer.preferredCountryLabel': { en: 'Delivery Country', sw: 'Nchi ya Usafirishaji' },
  'customer.saveProfileBtn': { en: 'Save Profile Changes', sw: 'Hifadhi Mabadiliko ya Wasifu' },
  'customer.personalizationOptIn': {
    en: 'Enable tailored style recommendations based on my browsing',
    sw: 'Ruhusu mapendekezo ya mitindo kulingana na ninavyotazama',
  },
  'customer.analyticsConsentOptIn': {
    en: 'Allow anonymized shopping analytics to improve catalog quality',
    sw: 'Ruhusu takwimu zisizo na utambulisho kuboresha ubora wa soko',
  },
  'customer.changePasswordBoxTitle': { en: 'Change Account Password', sw: 'Badilisha Nenosiri la Akaunti' },
  'customer.historyEmpty': {
    en: 'No recent security or account activity logged yet.',
    sw: 'Hakuna kumbukumbu za matukio ya akaunti hivi karibuni.',
  },
  'customer.exportJsonBtn': { en: 'Download My Data (JSON)', sw: 'Pakua Taarifa Zangu (JSON)' },
  'customer.erasureWarning': {
    en: 'Account privacy erasure permanently anonymizes your name, email, phone, and saved addresses while preserving legal financial records.',
    sw: 'Ombi la kufuta taarifa za faragha linaficha jina, barua pepe, simu, na anuani zako daima huku kumbukumbu za kisheria za malipo zikibaki.',
  },
  'customer.erasureReasonPlaceholder': {
    en: 'Reason for privacy erasure request (optional)',
    sw: 'Sababu ya kuomba kufutwa taarifa (hiari)',
  },
  'customer.confirmErasureBtn': {
    en: 'Confirm Privacy Erasure Request',
    sw: 'Thibitisha Ombi la Kufuta Taarifa',
  },
  'customer.restoringSession': { en: 'Restoring session...', sw: 'Inarejesha kipindi...' },
  'customer.failedLoadRecords': {
    en: 'Failed to load account records',
    sw: 'Imeshindikana kupakia taarifa za akaunti',
  },
  'customer.returnClaimSubmitted': {
    en: 'Return/refund claim submitted.',
    sw: 'Ombi la kurudisha au kurejeshewa pesa limetumwa.',
  },
  'customer.returnClaimFailed': {
    en: 'Could not submit refund request',
    sw: 'Imeshindikana kutuma ombi la marejesho',
  },
  'customer.addressSaved': {
    en: 'Delivery address saved.',
    sw: 'Anuani ya usafirishaji imehifadhiwa.',
  },
  'customer.addressSaveFailed': {
    en: 'Failed to save address',
    sw: 'Imeshindikana kuhifadhi anuani',
  },
  'customer.profileUpdated': {
    en: 'Profile, language, regional & privacy preferences updated.',
    sw: 'Wasifu, lugha, sarafu na mipangilio ya faragha imehifadhiwa.',
  },
  'customer.newPasswordMismatch': {
    en: 'New password and confirmation do not match.',
    sw: 'Nenosiri jipya na uthibitisho havifanani.',
  },
  'customer.passwordChangeFailed': {
    en: 'Unable to change password.',
    sw: 'Imeshindikana kubadilisha nenosiri.',
  },
  'customer.receiptLoadFailed': {
    en: 'Unable to load receipt',
    sw: 'Imeshindikana kufungua risiti',
  },
  'customer.deliveryAlreadyConfirmed': {
    en: 'Delivery receipt was already confirmed.',
    sw: 'Upokeaji wa mzigo ulishathibitishwa tayari.',
  },
  'customer.deliveryThankYou': {
    en: 'Thank you! Package delivery confirmed.',
    sw: 'Asante! Upokeaji wa mzigo umethibitishwa.',
  },
  'customer.deliveryConfirmFailed': {
    en: 'Unable to confirm package delivery.',
    sw: 'Imeshindikana kuthibitisha upokeaji wa mzigo.',
  },
  'customer.reorderPartial': {
    en: 'Added {{added}} available item(s) to bag ({{skipped}} currently unavailable).',
    sw: 'Bidhaa {{added}} zimewekwa kikapuni ({{skipped}} hazipatikani kwa sasa).',
  },
  'customer.reorderSuccess': {
    en: 'Added {{added}} item(s) to your bag.',
    sw: 'Bidhaa {{added}} zimeongezwa kikapuni.',
  },
  'customer.reorderNoneInStock': {
    en: 'None of the items in this order are currently in stock.',
    sw: 'Hakuna bidhaa kutoka oda hii iliyopo stoo kwa sasa.',
  },
  'customer.exportSuccess': {
    en: 'Downloaded account data export ({{format}}).',
    sw: 'Nakala ya taarifa za akaunti imepakuliwa ({{format}}).',
  },
  'customer.exportFailed': {
    en: 'Unable to export account data',
    sw: 'Imeshindikana kupakua taarifa za akaunti',
  },
  'customer.erasureSubmitted': {
    en: 'Privacy erasure request submitted and logged for Super Admin review.',
    sw: 'Ombi la kufuta taarifa za faragha limepokelewa kwa ukaguzi wa Super Admin.',
  },
  'customer.erasureFailed': {
    en: 'Unable to submit erasure request',
    sw: 'Imeshindikana kutuma ombi la kufuta taarifa',
  },
  'customer.verifyEmailPrompt': {
    en: 'Please verify your email address ({{email}}) to secure your TANZANITE EXPRESS account.',
    sw: 'Tafadhali thibitisha barua pepe yako ({{email}}) ili kulinda akaunti yako ya TANZANITE EXPRESS.',
  },
  'customer.filterConfirmed': { en: 'Confirmed', sw: 'Imethibitishwa' },
  'customer.filterProcessing': { en: 'Processing', sw: 'Inashughulikiwa' },
  'customer.filterShipped': { en: 'Shipped', sw: 'Imesafirishwa' },
  'customer.filterCompleted': { en: 'Completed', sw: 'Imekamilika' },
  'customer.filterCancelled': { en: 'Cancelled', sw: 'Imefutwa' },
  'customer.filterRefunded': { en: 'Refunded', sw: 'Imerejeshwa' },
  'customer.noMatchingOrders': {
    en: 'No orders match the selected filter or search.',
    sw: 'Hakuna oda zinazolingana na kichujio au utafutaji huu.',
  },
  'customer.attachedReceipt': {
    en: 'Attached Receipt: {{name}}',
    sw: 'Risiti Iliyoambatanishwa: {{name}}',
  },
  'customer.trackingCarrierLabel': {
    en: 'Tracking ({{carrier}}):',
    sw: 'Ufuatiliaji ({{carrier}}):',
  },
  'customer.trackPackageLink': { en: 'Track Package', sw: 'Fuatilia Mzigo' },
  'customer.ordersPagination': {
    en: 'Page {{page}} of {{total}} ({{count}} orders)',
    sw: 'Ukurasa {{page}} kati ya {{total}} (oda {{count}})',
  },
  'customer.exactOrderTotal': { en: 'Exact Order Total', sw: 'Kiasi Halisi cha Oda' },
  'customer.paymentTransactionsTitle': { en: 'Payment Transactions', sw: 'Miamala ya Malipo' },
  'customer.providerCol': { en: 'Provider', sw: 'Mtoa Huduma' },
  'customer.savedWishlistCount': {
    en: 'Saved Wishlist ({{count}})',
    sw: 'Bidhaa Zilizohifadhiwa ({{count}})',
  },
  'customer.viewProductBtn': { en: 'View', sw: 'Tazama' },
  'customer.savedAddressesHeading': {
    en: 'Saved Delivery Addresses',
    sw: 'Anuani Zilizohifadhiwa',
  },
  'customer.labelPlaceholder': {
    en: 'Label (Home / Office)',
    sw: 'Jina la Anuani (Nyumbani / Ofisini)',
  },
  'customer.addAddressBtn': {
    en: 'Add Delivery Address',
    sw: 'Ongeza Anuani ya Usafirishaji',
  },
  'customer.myTicketsHeading': { en: 'My Support Tickets', sw: 'Tiketi Zangu za Msaada' },
  'customer.ticketsEmptyHint': {
    en: 'No support tickets submitted. Visit Support in the navigation bar to open a ticket.',
    sw: 'Hujatuma tiketi yoyote ya msaada bado. Fungua ukurasa wa Msaada kwenye menyu ili kuwasiliana nasi.',
  },
  'customer.profilePhotoHeading': { en: 'Profile Photo', sw: 'Picha ya Wasifu' },
  'customer.photoHint': {
    en: 'JPG, PNG, or WEBP (max 5 MB)',
    sw: 'JPG, PNG, au WEBP (isizidi MB 5)',
  },
  'customer.uploadingPhoto': { en: 'Uploading...', sw: 'Inapakia...' },
  'customer.replacePhotoBtn': { en: 'Replace Photo', sw: 'Badilisha Picha' },
  'customer.uploadPhotoBtn': { en: 'Upload Photo', sw: 'Pakia Picha' },
  'customer.photoUpdatedToast': {
    en: 'Profile photo updated.',
    sw: 'Picha ya wasifu imebadilishwa.',
  },
  'customer.photoUploadFailed': {
    en: 'Failed to upload profile photo',
    sw: 'Imeshindikana kupakia picha ya wasifu',
  },
  'customer.photoRemovedToast': {
    en: 'Profile photo removed.',
    sw: 'Picha ya wasifu imeondolewa.',
  },
  'customer.photoRemoveFailed': {
    en: 'Failed to remove profile photo',
    sw: 'Imeshindikana kuondoa picha ya wasifu',
  },
  'customer.profilePrefsHeading': {
    en: 'Profile, Language, Currency & Privacy Preferences',
    sw: 'Wasifu, Lugha, Sarafu & Faragha',
  },
  'customer.savePreferencesBtn': { en: 'Save Preferences', sw: 'Hifadhi Mapendeleo' },
  'customer.personalizationDesc': {
    en: 'Enable personalized fashion recommendations (Recommended for You, Recently Viewed, Similar Styles). Turning this off clears your saved recommendation preference profile.',
    sw: 'Wezesha mapendekezo ya mitindo kulingana na unavyopenda (Zilizopendekezwa Kwako, Ulizotazama, Zinazofanana). Kuzima kutafuta wasifu wako wa mapendekezo.',
  },
  'customer.analyticsDesc': {
    en: 'Allow anonymous marketplace browsing & search telemetry to improve category discovery and product availability.',
    sw: 'Ruhusu takwimu zisizo na utambulisho za kuvinjari ili kuboresha upatikanaji wa bidhaa.',
  },
  'customer.currentPwPlaceholder': { en: 'Current password', sw: 'Nenosiri la sasa' },
  'customer.newPwPlaceholder': {
    en: 'New password (min 8 chars)',
    sw: 'Nenosiri jipya (angalau herufi 8)',
  },
  'customer.confirmPwPlaceholder': {
    en: 'Confirm new password',
    sw: 'Thibitisha nenosiri jipya',
  },
  'customer.googlePwManaged': {
    en: 'Your account is signed in with Google ({{email}}). Password management is handled by your Google account security settings.',
    sw: 'Akaunti yako imeingia kwa Google ({{email}}). Nenosiri linasimamiwa kupitia mipangilio ya usalama ya Google.',
  },
  'customer.exportCsvBtn': { en: 'Export CSV', sw: 'Pakua CSV' },
  'customer.memberSinceLabel': { en: 'Member Since', sw: 'Mwanachama Tangu' },
  'customer.lastLoginLabel': { en: 'Last Login', sw: 'Kuingia kwa Mwisho' },
  'customer.activeSessionLabel': { en: 'Active session', sw: 'Kipindi hai' },
  'customer.recordedLoginsLabel': { en: 'Recorded Logins', sw: 'Mara za Kuingia' },
  'customer.loadingHistory': {
    en: 'Loading security & activity history...',
    sw: 'Inapakia historia ya usalama na shughuli...',
  },
  'customer.privacyErasureHeading': {
    en: 'Privacy & Personal Data Erasure',
    sw: 'Faragha & Kufuta Taarifa Binafsi',
  },
  'customer.privacyErasureSub': {
    en: 'Request personal data anonymization. Required financial & order ledger totals remain preserved for accounting compliance.',
    sw: 'Omba kufichwa kwa taarifa binafsi. Kumbukumbu muhimu za fedha na oda zinabaki kwa taratibu za kisheria.',
  },
  'customer.erasureRequestedBadge': {
    en: 'Erasure Requested ({{date}})',
    sw: 'Ombi Limetumwa ({{date}})',
  },
  'customer.erasureModalSub': {
    en: 'Submitting this request flags your account for PII anonymization by the Super Admin while preserving immutable financial order & tax records.',
    sw: 'Kutuma ombi hili kutaweka akaunti yako kwenye foleni ya kuficha taarifa binafsi na Super Admin huku kumbukumbu za malipo na kodi zikibaki.',
  },
  'customer.erasurePlaceholder': {
    en: 'Reason for privacy erasure request (min 5 characters)...',
    sw: 'Sababu ya kuomba kufutwa taarifa (angalau herufi 5)...',
  },
  'customer.submitErasureBtn': {
    en: 'Submit Erasure Request',
    sw: 'Tuma Ombi la Kufuta Taarifa',
  },
  'customer.returnModalHeading': {
    en: 'Request Return or Refund',
    sw: 'Omba Kurudisha Bidhaa au Marejesho',
  },
  'customer.suborderPrefix': { en: 'Suborder', sw: 'Mzigo' },
  'customer.returnReasonPlaceholder': {
    en: 'Describe the sizing issue, defect, or delivery problem...',
    sw: 'Eleza tatizo la saizi, kasoro, au usafirishaji...',
  },
  'customer.evidencePlaceholder': {
    en: 'Evidence photo URL (optional)',
    sw: 'Kiungo cha picha ya ushahidi (hiari)',
  },
  'customer.orderDetailsHeading': {
    en: 'Order Details & Status Timeline',
    sw: 'Maelezo ya Oda & Mfuatano wa Hatua',
  },
  'customer.deliverySnapshotTitle': {
    en: 'Delivery Address Snapshot',
    sw: 'Anuani ya Usafirishaji',
  },
  'customer.financialSummaryTitle': {
    en: 'Financial Summary',
    sw: 'Muhtasari wa Malipo',
  },
  'customer.fulfillmentTimeline': {
    en: 'Fulfillment Timeline',
    sw: 'Historia ya Usafirishaji',
  },
  'customer.supplierNotePrefix': {
    en: 'Supplier Note: {{note}}',
    sw: 'Maelezo ya Msambazaji: {{note}}',
  },
  'customer.resolutionNotePrefix': {
    en: 'Resolution Note: {{note}}',
    sw: 'Uamuzi wa Mwisho: {{note}}',
  },
  'customer.txIdMinError': {
    en: 'Enter your Transaction / Reference ID (min 4 characters).',
    sw: 'Weka Namba ya Muamala / Reference ID (angalau herufi 4).',
  },
  'customer.validAmountError': {
    en: 'Enter a valid amount sent.',
    sw: 'Weka kiasi sahihi ulichotuma.',
  },
  'customer.senderNameError': {
    en: 'Enter the sender full name.',
    sw: 'Weka jina kamili la aliyetuma pesa.',
  },
  'customer.invalidReceiptToast': {
    en: 'Invalid receipt image',
    sw: 'Picha ya risiti si sahihi',
  },
  'customer.updateFailed': {
    en: 'Update failed',
    sw: 'Imeshindikana kuhifadhi mabadiliko',
  },
  'customer.pwMinError': {
    en: 'New password must be at least 8 characters.',
    sw: 'Nenosiri jipya lazima liwe na angalau herufi 8.',
  },
  'customer.resending': { en: 'Sending...', sw: 'Inatuma...' },
  'customer.resendVerifBtn': {
    en: 'Resend Verification Email',
    sw: 'Tuma Tena Barua ya Uthibitisho',
  },
  'customer.paymentRejectedTag': { en: 'Payment Rejected:', sw: 'Malipo Yamekataliwa:' },
  'customer.adminInfoRequestTag': { en: 'Admin Info Request:', sw: 'Ombi la Taarifa Kutoka Admin:' },
  'customer.returnClaimsHeading': {
    en: 'Return & Refund Claims',
    sw: 'Madai ya Kurudisha Bidhaa & Marejesho',
  },
  'customer.reasonPrefix': { en: 'Reason: {{reason}}', sw: 'Sababu: {{reason}}' },
  'customer.referenceCol': { en: 'Reference', sw: 'Namba ya Muamala' },
  'customer.statusCol': { en: 'Status', sw: 'Hali' },
  'customer.savedAddresses': { en: 'Saved Delivery Addresses', sw: 'Anuani Zilizohifadhiwa' },
  'customer.streetLandmarkPlaceholder': {
    en: 'Street & Landmark',
    sw: 'Mtaa & Alama Maarufu',
  },
  'customer.avatarAlt': { en: 'Profile avatar', sw: 'Picha ya wasifu' },
  'customer.updating': { en: 'Updating...', sw: 'Inasasisha...' },
  'customer.submittingErasure': { en: 'Submitting...', sw: 'Inatuma...' },
  'customer.summarySubtotal': { en: 'Subtotal: {{amount}}', sw: 'Jumla Ndogo: {{amount}}' },
  'customer.summaryShipping': { en: 'Shipping: {{amount}}', sw: 'Usafirishaji: {{amount}}' },
  'customer.summaryDiscount': { en: 'Discount: -{{amount}}', sw: 'Punguzo: -{{amount}}' },
  'customer.summaryTotal': { en: 'Total:', sw: 'Jumla Kuu:' },
  'customer.openBtn': { en: 'Open', sw: 'Fungua' },
  'customer.ordersPaginationShort': {
    en: 'Page {{page}} of {{total}} ({{count}} orders)',
    sw: 'Ukurasa {{page}} kati ya {{total}} (oda {{count}})',
  },

  // Supplier Dashboard
  'supplier.freeOnboardingTitle': {
    en: 'Independent Supplier Onboarding (100% Free)',
    sw: 'Usajili wa Msambazaji Huru (Bure Kabisa 100%)',
  },
  'supplier.restoringSession': {
    en: 'Restoring supplier session...',
    sw: 'Inarejesha kipindi cha msambazaji...',
  },
  'supplier.workspaceLoadFailed': {
    en: 'Unable to load supplier workspace',
    sw: 'Imeshindikana kupakia eneo la msambazaji',
  },
  'supplier.loadingWorkspace': {
    en: 'Loading supplier workspace...',
    sw: 'Inapakia taarifa za duka la msambazaji...',
  },
  'supplier.aiReportToast': {
    en: 'AI performance report generated.',
    sw: 'Ripoti ya utendaji wa AI imetengenezwa.',
  },
  'supplier.calcReportToast': {
    en: 'Computed analytics summary generated.',
    sw: 'Muhtasari wa takwimu za duka umetengenezwa.',
  },
  'supplier.reportFailed': {
    en: 'Unable to generate report',
    sw: 'Imeshindikana kutengeneza ripoti',
  },
  'supplier.appSubmittedToast': {
    en: 'Supplier application submitted for review.',
    sw: 'Maombi ya msambazaji yametumwa kwa ukaguzi.',
  },
  'supplier.regFailed': {
    en: 'Registration failed',
    sw: 'Usajili umeshindikana',
  },
  'supplier.businessNameLabel': { en: 'Business / Atelier / Brand Name', sw: 'Jina la Biashara / Duka / Chapa' },
  'supplier.ownerNameLabel': { en: 'Owner Full Name', sw: 'Jina Kamili la Mmiliki' },
  'supplier.businessEmailPlaceholder': { en: 'Business Email', sw: 'Barua Pepe ya Biashara' },
  'supplier.phoneWhatsappPlaceholder': { en: 'Phone / WhatsApp (+255...)', sw: 'Simu / WhatsApp (+255...)' },
  'supplier.countryPlaceholder': {
    en: 'Country (e.g., Tanzania, UK, China)',
    sw: 'Nchi (mf. Tanzania, Uingereza, Uchina)',
  },
  'supplier.shippingOriginPlaceholder': {
    en: 'Shipping Origin City, Country',
    sw: 'Mji & Nchi Unakosafirishia',
  },
  'supplier.businessAddressLabel': { en: 'Warehouse / Studio Address', sw: 'Anuani ya Duka / Bohari' },
  'supplier.primaryCategoryLabel': {
    en: 'Primary Category (e.g., Menswear, Dresses, Footwear)',
    sw: 'Aina Kuu ya Bidhaa (mf. Mashati, Magauni, Viatu)',
  },
  'supplier.registrationNumberLabel': {
    en: 'TIN / Business Registration No. (Optional)',
    sw: 'Namba ya Usajili wa Biashara / TIN (Hiari)',
  },
  'supplier.payoutMethodLabel': {
    en: 'Preferred Payout Method (Mobile Money / Bank / Wire)',
    sw: 'Njia ya Kupokea Malipo (M-Pesa / Benki)',
  },
  'supplier.payoutAccountLabel': {
    en: 'Payout Phone / Bank Account (Last digits or masked)',
    sw: 'Namba ya Simu au Akaunti ya Benki ya Malipo',
  },
  'supplier.verificationDocLabel': {
    en: 'Verification Document Reference / License Note',
    sw: 'Maelezo ya Kitambulisho au Leseni ya Biashara',
  },
  'supplier.storeDescPlaceholder': {
    en: 'Describe your fashion lines, sourcing capacity, and fulfillment turnaround...',
    sw: 'Eleza aina ya mavazi unayouza, uwezo wa stoo, na muda wa kusafirisha...',
  },
  'supplier.kpiGrossSales': { en: 'Gross Sales', sw: 'Jumla ya Mauzo' },
  'supplier.kpiTotalProducts': { en: 'Catalog Listings', sw: 'Jumla ya Bidhaa' },
  'supplier.kpiLiveProducts': { en: 'Published Products', sw: 'Bidhaa Zilizopo Sokoni' },
  'supplier.kpiPendingOrders': { en: 'Active Suborders', sw: 'Oda Zinazoendelea' },
  'supplier.kpiPendingEarnings': { en: 'Pending Earnings', sw: 'Mapato Yanayosubiri' },
  'supplier.kpiAvailableBalance': { en: 'Available for Payout', sw: 'Salio Linaloweza Kutolewa' },
  'supplier.kpiNetEarnings': { en: 'Net Confirmed Earnings', sw: 'Mapato Halisi Yaliyothibitishwa' },
  'supplier.kpiPaidOut': { en: 'Total Paid Out', sw: 'Jumla Iliyolipwa Tayari' },
  'supplier.analyticsHeading': {
    en: 'Store Performance & Analytics',
    sw: 'Utendaji wa Duka & Takwimu',
  },
  'supplier.generating': { en: 'Generating...', sw: 'Inatengeneza...' },
  'supplier.applyRangeBtn': { en: 'Apply Range', sw: 'Tumia Kipindi' },
  'supplier.loadingAnalytics': {
    en: 'Loading store analytics...',
    sw: 'Inapakia takwimu za duka...',
  },
  'supplier.viewsRangeLabel': { en: 'Views ({{range}})', sw: 'Watazamaji ({{range}})' },
  'supplier.ordersKpi': { en: 'Orders', sw: 'Oda' },
  'supplier.slaOnTime': { en: 'SLA On-Time', sw: 'Uwasilishaji Kwa Wakati' },
  'supplier.avgRating': { en: 'Avg Rating', sw: 'Wastani wa Ukadiriaji' },
  'supplier.noReviewsYetShort': { en: 'No reviews', sw: 'Hakuna maoni' },
  'supplier.bestSellingHeading': { en: 'Best-Selling Products', sw: 'Bidhaa Zinazouzwa Zaidi' },
  'supplier.noUnitSales': {
    en: 'No unit sales recorded in this range yet.',
    sw: 'Hakuna mauzo yaliyorekodiwa katika kipindi hiki bado.',
  },
  'supplier.soldRevenueLine': {
    en: '{{count}} sold · {{amount}}',
    sw: 'Zimeuzwa {{count}} · {{amount}}',
  },
  'supplier.mostViewedHeading': {
    en: 'Most-Viewed & Conversion',
    sw: 'Zilizotazamwa Zaidi & Ununuzi',
  },
  'supplier.noViewsRecorded': {
    en: 'No product views recorded in this range yet.',
    sw: 'Hakuna mitazamo ya bidhaa iliyorekodiwa katika kipindi hiki.',
  },
  'supplier.viewsConvLine': {
    en: '{{views}} views · {{pct}}% conv',
    sw: 'Mitazamo {{views}} · {{pct}}% ununuzi',
  },
  'supplier.restockAlertsHeading': {
    en: 'Restock Alerts (≤ 5 units)',
    sw: 'Tahadhari ya Stoo Ndogo (≤ 5)',
  },
  'supplier.unitsLeftLine': { en: '{{count}} left', sw: 'Zimebaki {{count}}' },
  'supplier.lowConversionHeading': {
    en: 'Low-Conversion Attention',
    sw: 'Bidhaa Zenye Ununuzi Mdogo',
  },
  'supplier.lowConversionLine': {
    en: '{{title}}: {{views}} views, {{pct}}% conversion',
    sw: '{{title}}: mitazamo {{views}}, {{pct}}% ununuzi',
  },
  'supplier.insightsHeading': {
    en: 'Catalog & Fulfillment Insights',
    sw: 'Ushauri wa Katalogi & Usafirishaji',
  },
  'supplier.generatedReportsCount': {
    en: 'Generated Reports ({{count}})',
    sw: 'Ripoti Zilizotengenezwa ({{count}})',
  },
  'supplier.geminiStatusLabel': { en: 'Gemini Status:', sw: 'Hali ya Gemini:' },
  'supplier.geminiConnected': { en: 'Connected', sw: 'Imeunganishwa' },
  'supplier.geminiFallback': {
    en: 'Calculated Fallback (Set GEMINI_API_KEY)',
    sw: 'Takwimu za Mfumo (Weka GEMINI_API_KEY)',
  },
  'supplier.geminiModelTag': { en: 'Gemini AI ({{model}})', sw: 'Gemini AI ({{model}})' },
  'supplier.calcAnalyticsTag': { en: 'Calculated Analytics', sw: 'Takwimu za Mfumo' },
  'supplier.actionableRecs': {
    en: 'Actionable Recommendations',
    sw: 'Mapendekezo ya Hatua za Kuchukua',
  },
  'supplier.productsSubmissionTitle': {
    en: '{{heading}} & Product Submission',
    sw: '{{heading}} & Kuongeza Bidhaa',
  },
  'supplier.manualMethodDesc': {
    en: 'Upload multiple real product photos (JPG/PNG/WEBP), set sizes/colors, supplier cost & shipping details.',
    sw: 'Pakia picha halisi za bidhaa (JPG/PNG/WEBP), weka saizi/rangi, bei ya msambazaji na usafirishaji.',
  },
  'supplier.csvMethodDesc': {
    en: 'Import catalog spreadsheets with image URLs or batch-uploaded local photos matched by SKU or filename.',
    sw: 'Pakia orodha ya bidhaa kupitia faili la CSV ukitumia viungo vya picha au picha zilizopakiwa kwa SKU.',
  },
  'supplier.editProductTitle': { en: 'Edit Product ({{id}})', sw: 'Hariri Bidhaa ({{id}})' },
  'supplier.imagesRequirementHint': {
    en: 'Minimum 1 image required for submission (up to 8 photos). First image is the Primary Cover shown on customer cards.',
    sw: 'Angalau picha 1 inahitajika (hadi picha 8). Picha ya kwanza itakuwa Picha Kuu kwenye kadi za wateja.',
  },
  'supplier.selectPhotosCta': {
    en: 'Click to select or upload JPG, PNG, or WEBP product photos',
    sw: 'Bonyeza kuchagua au kupakia picha za bidhaa (JPG, PNG, au WEBP)',
  },
  'supplier.selectPhotosHint': {
    en: 'Images are compressed automatically and saved securely to Cloudflare R2 storage.',
    sw: 'Picha zinaboreshwa kiotomatiki na kuhifadhiwa kwa usalama kwenye hifadhi ya Cloudflare R2.',
  },
  'supplier.moveLeftAria': { en: 'Move left', sw: 'Sogeza kushoto' },
  'supplier.moveRightAria': { en: 'Move right', sw: 'Sogeza kulia' },
  'supplier.coverShortBtn': { en: 'Cover', sw: 'Picha Kuu' },
  'supplier.removeImageAria': { en: 'Remove image', sw: 'Ondoa picha' },
  'supplier.maxImagesToast': {
    en: 'Maximum of 8 product images allowed per listing.',
    sw: 'Idadi ya juu ni picha 8 kwa kila bidhaa.',
  },
  'supplier.imageOrderSavedToast': { en: 'Image order saved.', sw: 'Mpangilio wa picha umehifadhiwa.' },
  'supplier.waitUploadsToast': {
    en: 'Please wait for all image uploads to complete.',
    sw: 'Tafadhali subiri upakiaji wa picha zote ukamilike.',
  },
  'supplier.needOneImageToast': {
    en: 'Please upload at least one product image before submitting for Admin approval.',
    sw: 'Tafadhali pakia angalau picha moja kabla ya kutuma kwa idhini ya Admin.',
  },
  'supplier.needTitleDescToast': {
    en: 'Enter a product name and description (minimum 10 characters).',
    sw: 'Weka jina la bidhaa na maelezo (angalau herufi 10).',
  },
  'supplier.needValidPriceToast': {
    en: 'Enter a valid positive Supplier Price (USD).',
    sw: 'Weka Bei halali ya Msambazaji (USD).',
  },
  'supplier.draftUpdatedToast': { en: 'Product draft updated.', sw: 'Rasimu ya bidhaa imesasishwa.' },
  'supplier.submittedApprovalToast': {
    en: 'Product updated & submitted for Admin approval.',
    sw: 'Bidhaa imesasishwa na kutumwa kwa idhini ya Admin.',
  },
  'supplier.savedDraftToast': { en: 'Product saved as Draft.', sw: 'Bidhaa imehifadhiwa kama Rasimu.' },
  'supplier.submittedNewToast': {
    en: 'Product submitted for Admin price markup & approval.',
    sw: 'Bidhaa imetumwa kwa Admin kupanga bei ya kuuza na kuidhinisha.',
  },
  'supplier.saveFailedToast': { en: 'Product save failed', sw: 'Imeshindikana kuhifadhi bidhaa' },
  'supplier.productTitleLabel': { en: 'Product Name *', sw: 'Jina la Bidhaa *' },
  'supplier.productTitlePlaceholder': {
    en: 'e.g., Kariakoo Linen Resort Shirt',
    sw: 'mf. Shati la Kitani la Kariakoo',
  },
  'supplier.productBrandLabel': { en: 'Brand (Optional)', sw: 'Chapa / Brand (Hiari)' },
  'supplier.productGenderLabel': { en: 'Gender / Department *', sw: 'Jinsia / Idara *' },
  'supplier.productCategoryLabel': { en: 'Product Category *', sw: 'Aina ya Bidhaa *' },
  'supplier.productMaterialLabel': { en: 'Material (Optional)', sw: 'Kitambaa / Nyenzo (Hiari)' },
  'supplier.materialPlaceholder': {
    en: 'e.g., 100% Organic Cotton / Silk',
    sw: 'mf. Pamba Halisi 100% / Hariri',
  },
  'supplier.weightKgLabel': { en: 'Weight in kg (Optional)', sw: 'Uzito kwa kg (Hiari)' },
  'supplier.availableQtyLabel': {
    en: 'Available Quantity (Total) *',
    sw: 'Idadi Iliyopo Stoo (Jumla) *',
  },
  'supplier.productDescLabel': { en: 'Product Description *', sw: 'Maelezo ya Bidhaa *' },
  'supplier.descPlaceholder': {
    en: 'Describe tailoring details, fabric weight, fit, and care instructions (min 10 characters)...',
    sw: 'Eleza ushonaji, ubora wa kitambaa, saizi, na namna ya kutunza (angalau herufi 10)...',
  },
  'supplier.sizesCommaLabel': {
    en: 'Product Sizes (comma-separated)',
    sw: 'Saizi za Bidhaa (tenganisha kwa koma)',
  },
  'supplier.sizesPlaceholder': {
    en: 'S, M, L, XL or EU 40, EU 41',
    sw: 'S, M, L, XL au EU 40, EU 41',
  },
  'supplier.colorsCommaLabel': {
    en: 'Available Colors (comma-separated)',
    sw: 'Rangi Zilizopo (tenganisha kwa koma)',
  },
  'supplier.colorsPlaceholder': {
    en: 'Black, Ivory, Olive',
    sw: 'Nyeusi, Nyeupe, Kijani',
  },
  'supplier.baseSkuLabel': { en: 'Base SKU', sw: 'SKU Kuu' },
  'supplier.generateVariantsBtn': { en: 'Generate Variants', sw: 'Tengeneza Saizi & Rangi' },
  'supplier.variantsHeading': {
    en: 'Variant SKUs & Per-Variant Stock ({{count}})',
    sw: 'SKU & Stoo kwa Kila Saizi/Rangi ({{count}})',
  },
  'supplier.addVariantBtn': { en: '+ Add row', sw: '+ Ongeza mstari' },
  'supplier.skuPlaceholder': { en: 'SKU', sw: 'SKU' },
  'supplier.sizePlaceholder': { en: 'Size', sw: 'Saizi' },
  'supplier.colorPlaceholder': { en: 'Color', sw: 'Rangi' },
  'supplier.stockPlaceholder': { en: 'Stock', sw: 'Stoo' },
  'supplier.removeVariantAria': { en: 'Remove variant', sw: 'Ondoa mstari' },
  'supplier.originCountryLabel': {
    en: 'Shipping Origin Country *',
    sw: 'Nchi Inakotoka Bidhaa *',
  },
  'supplier.productShippingFeeLabel': {
    en: 'Base Shipping Fee (USD) *',
    sw: 'Gharama ya Usafirishaji (USD) *',
  },
  'supplier.productDaysMinLabel': { en: 'Min Delivery Days', sw: 'Siku za Chini Kufika' },
  'supplier.productDaysMaxLabel': { en: 'Max Delivery Days', sw: 'Siku za Juu Kufika' },
  'supplier.destinationsLabel': { en: 'Shipping Destinations', sw: 'Inakofikishwa' },
  'supplier.shippingNotesLabel': {
    en: 'Shipping Notes (Optional)',
    sw: 'Maelezo ya Usafirishaji (Hiari)',
  },
  'supplier.shippingNotesPlaceholder': {
    en: 'e.g., Same-day boda courier within Dar es Salaam; DHL internationally.',
    sw: 'mf. Usafiri wa haraka siku hiyohiyo ndani ya Dar es Salaam; DHL nje ya nchi.',
  },
  'supplier.productReturnSummaryLabel': {
    en: 'Return Policy Summary *',
    sw: 'Muhtasari wa Masharti ya Kurudisha *',
  },
  'supplier.submittingProduct': { en: 'Submitting...', sw: 'Inatuma...' },
  'supplier.csvInstructionsHtml': {
    en: 'Provide imageUrls (pipe | separated URLs or filenames), OR upload local JPG/PNG/WEBP files named after your SKU (e.g., MIK-LIN-01_1.jpg).',
    sw: 'Weka imageUrls (viungo au majina ya picha yaliyotenganishwa kwa |), AU pakia picha za JPG/PNG/WEBP zenye jina la SKU (mf. MIK-LIN-01_1.jpg).',
  },
  'supplier.csvBatchHint': {
    en: 'Optional if CSV rows contain HTTPS image URLs. Required when referencing filenames or SKU-named files.',
    sw: 'Hiari ikiwa safu za CSV tayari zina viungo halali vya HTTPS. Lazima unapotumia majina ya faili za picha.',
  },
  'supplier.selectBatchPhotosBtn': { en: 'Select Batch Photos', sw: 'Chagua Picha Nyingi' },
  'supplier.csvDataLabel': { en: 'CSV Data', sw: 'Data ya CSV' },
  'supplier.loadSampleRowsBtn': { en: 'Load Sample Rows', sw: 'Weka Mfano wa CSV' },
  'supplier.uploadCsvFileBtn': { en: 'Upload .csv File', sw: 'Pakia Faili la .csv' },
  'supplier.csvTextareaPlaceholder': {
    en: "Paste CSV text or click 'Load Sample Rows' / upload a .csv file...",
    sw: "Bandika maandishi ya CSV au bonyeza 'Weka Mfano wa CSV' / pakia faili la .csv...",
  },
  'supplier.validatingCsv': { en: 'Validating...', sw: 'Inakagua...' },
  'supplier.importPreviewSummary': {
    en: 'Import Preview: {{valid}} valid ·',
    sw: 'Uhakiki wa CSV: {{valid}} sahihi ·',
  },
  'supplier.errorsCount': { en: '{{count}} error(s)', sw: 'makosa {{count}}' },
  'supplier.fixErrorsHint': {
    en: 'Fix missing images or invalid fields before confirming import.',
    sw: 'Rekebisha picha zinazokosekana au taarifa zisizo sahihi kabla ya kupakia.',
  },
  'supplier.rowNumber': { en: 'Row #{{num}}', sw: 'Mstari #{{num}}' },
  'supplier.noImageLabel': { en: 'No image', sw: 'Hakuna picha' },
  'supplier.missingTitle': { en: '(Missing title)', sw: '(Bila jina)' },
  'supplier.readyBadge': { en: 'Ready', sw: 'Tayari' },
  'supplier.colRow': { en: 'Row', sw: 'Mstari' },
  'supplier.colImages': { en: 'Images', sw: 'Picha' },
  'supplier.colSkuTitle': { en: 'SKU & Title', sw: 'SKU & Jina' },
  'supplier.colSupplierPrice': { en: 'Supplier Price', sw: 'Bei ya Msambazaji' },
  'supplier.stockInline': { en: 'Stock {{count}}', sw: 'Stoo {{count}}' },
  'supplier.noProductsInStatus': {
    en: 'No products in this status category yet.',
    sw: 'Hakuna bidhaa katika kundi hili kwa sasa.',
  },
  'supplier.photosAndStock': {
    en: '{{photos}} photo(s) · {{stock}} in stock',
    sw: 'picha {{photos}} · stoo {{stock}}',
  },
  'supplier.pendingAdminPrice': {
    en: 'Pending Admin Price',
    sw: 'Inasubiri Bei ya Admin',
  },
  'supplier.rejectionReasonTag': { en: 'Rejection Reason:', sw: 'Sababu ya Kukataliwa:' },
  'supplier.adminChangeReqTag': { en: 'Admin Change Request:', sw: 'Marekebisho Aliyoomba Admin:' },
  'supplier.filterAll': { en: 'All', sw: 'Zote' },
  'supplier.filterAwaitingAction': { en: 'Awaiting Action', sw: 'Inasubiri Hatua Yako' },
  'supplier.filterProcessing': { en: 'Processing', sw: 'Inashughulikiwa' },
  'supplier.filterShipped': { en: 'Shipped', sw: 'Imesafirishwa' },
  'supplier.filterCompleted': { en: 'Completed', sw: 'Imekamilika' },
  'supplier.filterCancelledRefunded': {
    en: 'Cancelled / Refunded',
    sw: 'Imefutwa / Imerejeshwa',
  },
  'supplier.unreadAlertsBtn': {
    en: '{{count}} Unread Alerts',
    sw: 'Taarifa Mpya {{count}}',
  },
  'supplier.historicalRecordNote': {
    en: 'Completed, cancelled, and refunded suborders remain permanently visible here for your historical records.',
    sw: 'Oda zilizokamilika, kufutwa, au kurejeshwa zinabaki kuonekana hapa kwa kumbukumbu zako za kudumu.',
  },
  'supplier.searchSubordersPlaceholder': {
    en: 'Search ID, buyer, SKU, tracking...',
    sw: 'Tafuta namba, mteja, SKU, ufuatiliaji...',
  },
  'supplier.noMatchingSuborders': {
    en: 'No suborders match your current filter or search.',
    sw: 'Hakuna oda zinazolingana na kichujio au utafutaji huu.',
  },
  'supplier.exceptionReleaseTag': {
    en: 'Admin Documented Exception Release:',
    sw: 'Ruhusa Maalum ya Admin:',
  },
  'supplier.exceptionReleaseDefault': {
    en: 'Released for fulfillment by Super Admin.',
    sw: 'Imeruhusiwa kusafirishwa na Super Admin.',
  },
  'supplier.hideTimeline': { en: 'Hide Timeline', sw: 'Ficha Historia' },
  'supplier.statusHistoryCount': {
    en: 'Status History ({{count}})',
    sw: 'Historia ya Hatua ({{count}})',
  },
  'supplier.carrierPlaceholder': {
    en: 'Carrier (e.g., DHL / Azam Courier)',
    sw: 'Kampuni ya Usafirishaji (mf. DHL / Boda)',
  },
  'supplier.trackingPlaceholder': {
    en: 'Tracking Number / Waybill',
    sw: 'Namba ya Ufuatiliaji / Waybill',
  },
  'supplier.trackingUrlPlaceholder': {
    en: 'Tracking URL (optional)',
    sw: 'Kiungo cha Ufuatiliaji (hiari)',
  },
  'supplier.markStepBtn': {
    en: 'Mark {{status}}',
    sw: 'Weka: {{status}}',
  },
  'supplier.subordersPagination': {
    en: 'Page {{page}} of {{total}} ({{count}} suborders)',
    sw: 'Ukurasa {{page}} kati ya {{total}} (oda {{count}})',
  },
  'supplier.earningsHeading': {
    en: 'Earnings & Payout Requests',
    sw: 'Mapato & Maombi ya Malipo',
  },
  'supplier.pendingInTransitLabel': {
    en: 'Pending (In Transit)',
    sw: 'Yanayosubiri (Njiani)',
  },
  'supplier.amountUsdPlaceholder': { en: 'Amount in USD', sw: 'Kiasi kwa USD' },
  'supplier.requestPayoutTitle': { en: 'Request Earnings Payout', sw: 'Omba Kutumiwa Mapato' },
  'supplier.requestPayoutBtn': { en: 'Request Payout', sw: 'Omba Malipo' },
  'supplier.payoutHistoryTitle': { en: 'Payout History', sw: 'Historia ya Malipo Uliyotumiwa' },
  'supplier.noPayoutsYet': {
    en: 'No payouts requested yet.',
    sw: 'Bado hujaomba kutumiwa malipo.',
  },
  'supplier.claimsHeading': {
    en: 'Customer Claims on Your Store',
    sw: 'Madai ya Wateja Kwenye Duka Lako',
  },
  'supplier.noClaimsYet': { en: 'No active refund claims.', sw: 'Hakuna madai ya marejesho kwa sasa.' },
  'supplier.claimPrefix': { en: 'Claim {{id}}', sw: 'Dai {{id}}' },
  'supplier.respondClaimBtn': { en: 'Acknowledge Claim', sw: 'Thibitisha Kupokea Dai' },
  'supplier.claimAckNote': {
    en: 'Supplier reviewed claim and awaits admin resolution.',
    sw: 'Msambazaji amekagua dai na anasubiri uamuzi wa Admin.',
  },
  'supplier.adaptersHeading': {
    en: 'External Dropshipping & Sourcing Adapters',
    sw: 'Viunganishi vya Nje vya Bidhaa (Dropshipping)',
  },
  'supplier.adaptersNotice': {
    en: 'External API adapters remain clearly marked as awaiting credentials until live keys are configured in the server environment.',
    sw: 'Viunganishi vya nje vinabaki kusubiri funguo za API hadi vitakapowekwa kwenye mipangilio ya seva.',
  },
  'supplier.requiredEnvVars': {
    en: 'Required Env Vars: {{vars}}',
    sw: 'Vigezo Vinavyohitajika: {{vars}}',
  },
  'supplier.profileBusinessName': { en: 'Business Name:', sw: 'Jina la Biashara:' },
  'supplier.profileCountryOrigin': { en: 'Country & Origin:', sw: 'Nchi & Asili ya Usafirishaji:' },
  'supplier.profileCommissionRate': { en: 'Commission Rate:', sw: 'Asilimia ya Kamisheni:' },
  'supplier.globalDefault': { en: 'Global Default', sw: 'Kiwango cha Kawaida' },
  'supplier.profilePreferredPayout': { en: 'Preferred Payout:', sw: 'Njia ya Kupokea Malipo:' },
  'supplier.profileDesc': { en: 'Description:', sw: 'Maelezo ya Duka:' },
  'supplier.csvUploadEmptyToast': {
    en: 'Upload a CSV file or paste CSV rows first.',
    sw: 'Pakia faili la CSV au bandika data za CSV kwanza.',
  },
  'supplier.csvWaitImagesToast': {
    en: 'Wait for local image uploads to complete before previewing.',
    sw: 'Subiri upakiaji wa picha ukamilike kabla ya kuhakiki.',
  },
  'supplier.csvPreviewFailed': {
    en: 'CSV validation preview failed',
    sw: 'Ukaguzi wa CSV umeshindikana',
  },
  'supplier.csvImportedToast': {
    en: 'Imported {{count}} product(s) for Admin approval.',
    sw: 'Bidhaa {{count}} zimepakiwa kwa idhini ya Admin.',
  },
  'supplier.csvImportBlocked': {
    en: 'CSV import blocked due to missing images or validation errors',
    sw: 'Upakiaji wa CSV umezuiwa kwa sababu ya picha zinazokosekana au makosa',
  },
  'supplier.resubmittedToast': {
    en: 'Product resubmitted for Admin approval.',
    sw: 'Bidhaa imetumwa tena kwa idhini ya Admin.',
  },
  'supplier.resubmitFailed': {
    en: 'Unable to resubmit product',
    sw: 'Imeshindikana kutuma tena bidhaa',
  },
  'supplier.deletedProductToast': {
    en: 'Product and unreferenced images removed.',
    sw: 'Bidhaa na picha zake zimeondolewa.',
  },
  'supplier.deleteProductFailed': {
    en: 'Unable to delete product',
    sw: 'Imeshindikana kufuta bidhaa',
  },
  'supplier.suborderUpdatedToast': {
    en: 'Suborder updated to {{status}}.',
    sw: 'Hali ya oda imebadilishwa kuwa {{status}}.',
  },
  'supplier.fulfillmentFailed': {
    en: 'Fulfillment update failed',
    sw: 'Imeshindikana kusasisha hatua ya usafirishaji',
  },
  'supplier.payoutSubmittedToast': {
    en: 'Payout request submitted for Admin review.',
    sw: 'Ombi la malipo limetumwa kwa ukaguzi wa Admin.',
  },
  'supplier.payoutFailed': {
    en: 'Payout request failed',
    sw: 'Imeshindikana kutuma ombi la malipo',
  },

  // Admin & Super Admin Console
  'admin.verifyingSession': {
    en: 'Verifying admin session...',
    sw: 'Inahakiki kipindi cha msimamizi...',
  },
  'admin.profileLoadErrorTitle': {
    en: 'Unable to Load Admin Profile',
    sw: 'Imeshindikana Kupakia Wasifu wa Admin',
  },
  'admin.profileLoadErrorDesc': {
    en: 'Signed in as {{email}}, but the server could not verify your profile ({{error}}).',
    sw: 'Umeingia kama {{email}}, lakini seva haikuweza kuhakiki wasifu wako ({{error}}).',
  },
  'admin.retryVerification': { en: 'Retry Verification', sw: 'Jaribu Tena Uhakiki' },
  'admin.emailVerificationRequiredTitle': {
    en: 'Admin Email Verification Required',
    sw: 'Uthibitisho wa Barua Pepe ya Admin Unahitajika',
  },
  'admin.restrictedConsoleTitle': {
    en: 'Restricted Admin Console',
    sw: 'Kituo cha Utawala (Ruhusa Maalum)',
  },
  'admin.signInInstructions': {
    en: 'Sign in with your authorized Super Admin or Staff credentials to access marketplace controls.',
    sw: 'Ingia kwa akaunti yako iliyoidhinishwa ya Super Admin au Staff kufungua kituo cha utawala.',
  },
  'admin.unverifiedEmailDesc': {
    en: 'You are signed in as {{email}}, but your Firebase email address is not marked verified yet (emailVerified: false). Super Admin privileges are withheld until email verification is confirmed.',
    sw: 'Umeingia kama {{email}}, lakini barua pepe yako haijathibitishwa bado (emailVerified: false). Ruhusa za Super Admin zimezuiliwa hadi uthibitishe barua pepe.',
  },
  'admin.recheckSession': { en: 'Re-check Session', sw: 'Kagua Tena Kipindi' },
  'admin.insufficientPermissionsDesc': {
    en: 'Signed in as {{email}} with role {{role}}. Insufficient permissions — Super Admin or authorized Staff credentials are required.',
    sw: 'Umeingia kama {{email}} ukiwa na jukumu la {{role}}. Huna ruhusa — akaunti ya Super Admin au Mhudumu aliyeidhinishwa inahitajika.',
  },
  'admin.switchAccountBtn': {
    en: 'Sign Out & Switch Account',
    sw: 'Toka & Badilisha Akaunti',
  },
  'admin.staffPaymentVerifierRole': {
    en: 'Staff · Payment Verifier',
    sw: 'Mhudumu · Mhakiki wa Malipo',
  },
  'admin.selectAdminSectionAria': {
    en: 'Select Admin Section',
    sw: 'Chagua Sehemu ya Admin',
  },
  'admin.consolePrefix': { en: 'Admin Console', sw: 'Kituo cha Admin' },
  'admin.loadingIntelligence': {
    en: 'Loading marketplace intelligence...',
    sw: 'Inapakia takwimu na taarifa za soko...',
  },
  'admin.range24h': { en: 'Daily', sw: 'Kwa Siku' },
  'admin.range7d': { en: 'Weekly', sw: 'Kwa Wiki' },
  'admin.range30d': { en: 'Monthly', sw: 'Kwa Mwezi' },
  'admin.rangeAll': { en: 'All Time', sw: 'Muda Wote' },
  'admin.rangeCustom': { en: 'Custom', sw: 'Tarehe Maalum' },
  'admin.kpiGrossRevenue': { en: 'Gross Sales', sw: 'Jumla ya Mauzo' },
  'admin.kpiMarkupProfit': { en: 'Marketplace Profit / Markup', sw: 'Faida & Kamisheni ya Soko' },
  'admin.kpiVerifiedPayments': { en: 'Verified Payments', sw: 'Malipo Yaliyothibitishwa' },
  'admin.kpiSupplierPayouts': { en: 'Supplier Payouts', sw: 'Malipo kwa Wasambazaji' },
  'admin.kpiOrdersCount': { en: 'Total Orders', sw: 'Jumla ya Oda' },
  'admin.kpiPendingOrders': { en: 'Pending Orders', sw: 'Oda Zinazosubiri' },
  'admin.kpiRegisteredUsers': { en: 'Registered Users', sw: 'Watumiaji Waliosajiliwa' },
  'admin.kpiActiveSuppliers': { en: 'Approved Suppliers', sw: 'Wasambazaji Hai' },
  'admin.kpiPendingProducts': { en: 'Pending Products', sw: 'Bidhaa Zinazosubiri Idhini' },
  'admin.kpiOpenRefunds': { en: 'Open Refunds', sw: 'Madai ya Marejesho' },
  'admin.kpiUnreadAlerts': { en: 'Unread Admin Alerts', sw: 'Taarifa Mpya za Admin' },
  'admin.kpiRepeatRate': { en: 'Repeat Purchase Rate', sw: 'Wateja Wanaorudia' },
  'admin.kpiCartAbandonment': { en: 'Cart Abandonment', sw: 'Vikapu Vilivyoachwa' },
  'admin.kpiProductViews': { en: 'Product Views', sw: 'Mitazamo ya Bidhaa' },
  'admin.kpiConversionRate': { en: 'Overall Conversion', sw: 'Kiwango cha Ununuzi' },
  'admin.operationalAlerts': { en: 'Operational Alerts', sw: 'Tahadhari za Uendeshaji' },
  'admin.slaExceededAlert': {
    en: '{{count}} suborder(s) exceeded supplier confirmation SLA deadline.',
    sw: 'Oda {{count}} zimepitisha muda wa uthibitisho wa msambazaji (SLA).',
  },
  'admin.lowStockAlert': {
    en: '{{count}} product(s) have low stock (≤ 5 units total): {{names}}',
    sw: 'Bidhaa {{count}} zina stoo ndogo (≤ 5): {{names}}',
  },
  'admin.activeChannelsTitle': {
    en: 'Active Manual Payment Channels',
    sw: 'Njia Hai za Malipo ya Mwongozo',
  },
  'admin.channelActive': { en: 'ACTIVE', sw: 'HAI' },
  'admin.channelDisabled': { en: 'DISABLED', sw: 'IMEZIMWA' },
  'admin.biMainTitle': {
    en: 'Marketplace Analytics & Executive AI Reports',
    sw: 'Takwimu za Soko & Ripoti Kuu za AI',
  },
  'admin.exportCsv': { en: 'Export CSV', sw: 'Pakua CSV' },
  'admin.computingMetrics': {
    en: 'Computing marketplace metrics...',
    sw: 'Inakokotoa takwimu za soko...',
  },
  'admin.confirmedRevenueRange': {
    en: 'Confirmed Revenue ({{range}})',
    sw: 'Mapato Yaliyothibitishwa ({{range}})',
  },
  'admin.confirmedTotalOrders': {
    en: 'Confirmed / Total Orders',
    sw: 'Oda Zilizothibitishwa / Jumla',
  },
  'admin.pendingVerifiedPayments': {
    en: 'Pending / Verified Payments',
    sw: 'Malipo Yanayosubiri / Yaliyohakikiwa',
  },
  'admin.bestSuppliers': { en: 'Best Suppliers', sw: 'Wasambazaji Bora' },
  'admin.noSubordersWindow': {
    en: 'No supplier suborders recorded in this window.',
    sw: 'Hakuna oda za wasambazaji katika kipindi hiki.',
  },
  'admin.popularCategories': { en: 'Popular Categories', sw: 'Aina Zinazopendwa Zaidi' },
  'admin.noCategoryTelemetry': {
    en: 'No category telemetry in this window.',
    sw: 'Hakuna takwimu za aina katika kipindi hiki.',
  },
  'admin.bestSellingProducts': { en: 'Best-Selling Products', sw: 'Bidhaa Zinazouzwa Zaidi' },
  'admin.noCompletedSales': {
    en: 'No completed sales recorded in this window.',
    sw: 'Hakuna mauzo yaliyokamilika katika kipindi hiki.',
  },
  'admin.mostViewedProducts': { en: 'Most-Viewed Products', sw: 'Bidhaa Zilizotazamwa Zaidi' },
  'admin.noViewsWindow': {
    en: 'No product views recorded in this window.',
    sw: 'Hakuna mitazamo katika kipindi hiki.',
  },
  'admin.availabilityRisks': {
    en: 'Availability & Low Stock Risks',
    sw: 'Hatari za Upatikanaji & Stoo Ndogo',
  },
  'admin.dailySalesTrend': { en: 'Daily Sales Trend', sw: 'Mwenendo wa Mauzo ya Kila Siku' },
  'admin.calculatedInsights': {
    en: 'Calculated Platform Insights',
    sw: 'Uchambuzi wa Mfumo',
  },
  'admin.generatedAiReportsCount': {
    en: 'Generated AI Reports ({{count}})',
    sw: 'Ripoti za AI Zilizotengenezwa ({{count}})',
  },
  'admin.geminiReady': { en: 'Configured & Ready', sw: 'Imeunganishwa & Tayari' },
  'admin.geminiNotConfigured': {
    en: 'Not configured — showing honest calculated reports',
    sw: 'Haijaunganishwa — inaonyesha ripoti halisi za mahesabu ya mfumo',
  },
  'admin.clickGenerateHint': {
    en: 'Click "{{btn}}" above to generate an executive summary for the selected date range.',
    sw: 'Bonyeza "{{btn}}" hapo juu kutengeneza muhtasari mkuu wa kipindi ulichochagua.',
  },
  'admin.highlights': { en: 'Highlights', sw: 'Mambo Muhimu' },
  'admin.risksAndAlerts': { en: 'Risks & Alerts', sw: 'Tahadhari & Vihatarishi' },
  'admin.paymentSubFilterAll': { en: 'All Submissions', sw: 'Miamala Yote' },
  'admin.paymentSubFilterPending': { en: 'Pending Verification', sw: 'Inasubiri Uhakiki' },
  'admin.paymentSubFilterInfo': { en: 'Info Requested', sw: 'Taarifa Zimeombwa' },
  'admin.paymentSubFilterVerified': { en: 'Verified', sw: 'Imethibitishwa' },
  'admin.paymentSubFilterRejected': { en: 'Rejected', sw: 'Imekataliwa' },
  'admin.flaggedWarningsKpi': { en: 'Flagged Warnings', sw: 'Tahadhari za Ukaguzi' },
  'admin.verifIntro': {
    en: 'Cross-check customer M-Pesa SMS and NMB Bank statements before approving or releasing supplier fulfillment.',
    sw: 'Linganisha ujumbe wa M-Pesa wa mteja au taarifa ya Benki ya NMB kabla ya kuthibitisha malipo au kuruhusu usafirishaji.',
  },
  'admin.verifSearchPlaceholder': {
    en: 'Order ID, email, sender, or Transaction ID...',
    sw: 'Namba ya Oda, barua pepe, mtumaji, au Muamala...',
  },
  'admin.allMethodsOption': { en: 'All Methods', sw: 'Njia Zote' },
  'admin.searchingSubmissions': {
    en: 'Searching payment submissions...',
    sw: 'Inatafuta uthibitisho wa malipo...',
  },
  'admin.noMatchingSubmissions': {
    en: 'No payment submissions match the selected filters.',
    sw: 'Hakuna miamala inayolingana na vichujio hivi.',
  },
  'admin.expectedAmount': { en: 'Expected:', sw: 'Inayotakiwa:' },
  'admin.sentAmount': { en: 'Sent:', sw: 'Iliyotumwa:' },
  'admin.senderNamePhone': { en: 'Sender Name & Phone', sw: 'Jina & Simu ya Aliyetuma' },
  'admin.txDateSubmittedAt': {
    en: 'Transaction Date & Submitted At',
    sw: 'Tarehe ya Muamala & Muda wa Kutuma',
  },
  'admin.noReceiptAttached': {
    en: 'No receipt image attached',
    sw: 'Hakuna picha ya risiti iliyoambatanishwa',
  },
  'admin.reviewedByLine': {
    en: 'Reviewed by {{email}} on {{date}}',
    sw: 'Imekaguliwa na {{email}} tarehe {{date}}',
  },
  'admin.internalVerifNotePlaceholder': {
    en: 'Optional internal verification note (e.g., Matched M-Pesa SMS)',
    sw: 'Maelezo ya ndani ya uhakiki (hiari, mf. Imelingana na SMS ya M-Pesa)',
  },
  'admin.approvePaymentConfirmTitle': {
    en: 'Approve Payment {{txId}}?',
    sw: 'Thibitisha Malipo {{txId}}?',
  },
  'admin.approvePaymentConfirmMsg': {
    en: 'Confirm you verified {{amount}} received via {{method}} for order {{orderId}}?',
    sw: 'Je, umethibitisha kupokea {{amount}} kupitia {{method}} kwa ajili ya oda {{orderId}}?',
  },
  'admin.paymentAuditHeading': {
    en: 'Payment Verification Audit Trail ({{count}})',
    sw: 'Kumbukumbu ya Uhakiki wa Malipo ({{count}})',
  },
  'admin.noPaymentAuditEvents': {
    en: 'No payment verification audit events recorded yet.',
    sw: 'Bado hakuna kumbukumbu za uhakiki wa malipo.',
  },
  'admin.suppliersHeading': {
    en: 'Supplier Applications & Accounts ({{count}})',
    sw: 'Maombi & Akaunti za Wasambazaji ({{count}})',
  },
  'admin.supplierApproveBtn': { en: 'Approve & Verify', sw: 'Idhinisha & Thibitisha' },
  'admin.supplierRejectBtn': { en: 'Reject', sw: 'Kataa' },
  'admin.supplierSuspendBtn': { en: 'Suspend', sw: 'Simamisha' },
  'admin.setRateBtn': { en: 'Set Rate %', sw: 'Weka %' },
  'admin.suspendSupplierTitle': {
    en: 'Suspend {{name}}?',
    sw: 'Simamisha {{name}}?',
  },
  'admin.suspendSupplierMsg': {
    en: 'Suspended suppliers cannot publish new items or receive new orders. Financial audit history is preserved.',
    sw: 'Msambazaji aliyesimamishwa hawezi kuchapisha bidhaa mpya au kupokea oda mpya. Kumbukumbu za kifedha zinahifadhiwa.',
  },
  'admin.searchProductsPlaceholder': {
    en: 'Search title, supplier, category...',
    sw: 'Tafuta bidhaa, msambazaji, aina...',
  },
  'admin.allStatuses': { en: 'All Statuses', sw: 'Hali Zote' },
  'admin.markupModalTitle': {
    en: 'Product Pricing, Gallery & Moderation',
    sw: 'Bei ya Kuuza, Picha & Idhini ya Bidhaa',
  },
  'admin.markupReasonPlaceholder': {
    en: 'e.g., Please upload clearer front/back garment photos or clarify fabric composition.',
    sw: 'mf. Tafadhali pakia picha angavu za mbele/nyuma au eleza aina ya kitambaa.',
  },
  'admin.exceptionReleaseBtn': {
    en: 'Release by Documented Exception',
    sw: 'Ruhusu Kwa Dharura Yenye Sababu',
  },
  'admin.exceptionModalTitle': {
    en: 'Documented Exception Release',
    sw: 'Ruhusa ya Usafirishaji Kwa Dharura',
  },
  'admin.exceptionReasonLabel': {
    en: 'Mandatory Documented Reason (min 8 chars)',
    sw: 'Sababu ya Lazima (angalau herufi 8)',
  },
  'admin.confirmExceptionBtn': {
    en: 'Confirm Exception Release',
    sw: 'Thibitisha Ruhusa ya Dharura',
  },
  'admin.commissionRulesTitle': {
    en: 'Commission Rules Engine',
    sw: 'Kanuni za Kamisheni ya Soko',
  },
  'admin.payoutRequestsHeading': {
    en: 'Supplier Payout Requests ({{count}})',
    sw: 'Maombi ya Malipo ya Wasambazaji ({{count}})',
  },
  'admin.markPaidBtn': { en: 'Mark Paid', sw: 'Weka Imelipwa' },
  'admin.refundsDisputesHeading': {
    en: 'Refund Requests & Dispute Resolution',
    sw: 'Maombi ya Marejesho & Utatuzi wa Migogoro',
  },
  'admin.approveRefundBtn': { en: 'Approve & Refund', sw: 'Idhinisha & Rejesha Pesa' },
  'admin.createCouponTitle': { en: 'Discount Coupons', sw: 'Kuponi za Punguzo' },
  'admin.createCouponBtn': { en: 'Create Coupon', sw: 'Tengeneza Kuponi' },
  'admin.broadcastTitle': { en: 'Broadcast Announcements', sw: 'Tuma Tangazo Kwa Watumiaji' },
  'admin.audienceLabel': { en: 'Target Audience', sw: 'Walengwa' },
  'admin.sendBroadcastBtn': { en: 'Send Announcement', sw: 'Tuma Tangazo' },
  'admin.ticketQueueHeading': {
    en: 'Support Ticket Queue ({{count}})',
    sw: 'Foleni ya Tiketi za Msaada ({{count}})',
  },
  'admin.ticketReplyPlaceholder': { en: 'Staff reply...', sw: 'Jibu la mhudumu...' },
  'admin.replyResolveBtn': { en: 'Reply & Resolve', sw: 'Jibu & Tatua' },
  'admin.usersManagementHeading': {
    en: 'Accounts & Staff Role Management ({{count}})',
    sw: 'Usimamizi wa Akaunti & Wahudumu ({{count}})',
  },
  'admin.staffPermissionsTitle': { en: 'Permissions', sw: 'Ruhusa' },
  'admin.canVerifyPayments': { en: 'Can Verify Payments', sw: 'Anaweza Kuhakiki Malipo' },
  'admin.fullAccess': { en: 'Full Access', sw: 'Ruhusa Zote' },
  'admin.suspendUserBtn': { en: 'Suspend', sw: 'Simamisha' },
  'admin.reactivateUserBtn': { en: 'Reactivate', sw: 'Washa Tena' },
  'admin.settingsBilingualHeroEn': { en: 'Hero Headline (English)', sw: 'Kichwa Kikuu (Kiingereza)' },
  'admin.settingsBilingualHeroSw': { en: 'Hero Headline (Kiswahili)', sw: 'Kichwa Kikuu (Kiswahili)' },
  'admin.settingsBilingualAnnouncementEn': { en: 'Top Announcement (English)', sw: 'Tangazo la Juu (Kiingereza)' },
  'admin.settingsBilingualAnnouncementSw': { en: 'Top Announcement (Kiswahili)', sw: 'Tangazo la Juu (Kiswahili)' },
  'admin.settingsMpesaInstructionsSw': { en: 'M-Pesa Instructions (Kiswahili)', sw: 'Maelekezo ya M-Pesa (Kiswahili)' },
  'admin.settingsNmbInstructionsSw': { en: 'NMB Instructions (Kiswahili)', sw: 'Maelekezo ya NMB (Kiswahili)' },
  'admin.settingsUploadBannerBtn': { en: 'Upload / Replace (R2)', sw: 'Pakia / Badilisha (R2)' },
  'admin.saveSettingsBtn': { en: 'Save Marketplace Configuration', sw: 'Hifadhi Mipangilio ya Soko' },
  'admin.governanceTab': { en: 'System Health & Backups', sw: 'Afya ya Mfumo & Nakala Akiba' },
  'admin.syncNowBtn': { en: 'Reconcile Firestore Sync', sw: 'Sawazisha Firestore Sasa' },
  'admin.createBackupBtn': { en: 'Create Backup Now', sw: 'Tengeneza Nakala Akiba Sasa' },
  'admin.retentionSaveBtn': { en: 'Save Retention Policy', sw: 'Hifadhi Sera ya Utunzaji Data' },
  'admin.exportStoreBtn': { en: 'Export Compliance Snapshot', sw: 'Pakua Kumbukumbu ya Mfumo' },
  'admin.confirmActionBtn': { en: 'Confirm Action', sw: 'Thibitisha Hatua' },
  'admin.chatbotTab': { en: 'Chatbot & AI Knowledge', sw: 'Chatbot & Maarifa ya AI' },
  'admin.superAdminRoleLabel': { en: 'Super Admin', sw: 'Msimamizi Mkuu (Super Admin)' },
  'admin.staffRoleLabel': { en: 'Staff', sw: 'Mhudumu' },
  'admin.csvExportedToast': {
    en: 'Exported {{type}} CSV report.',
    sw: 'Ripoti ya CSV ya {{type}} imepakuliwa.',
  },
  'admin.csvExportFailed': { en: 'CSV export failed', sw: 'Imeshindikana kupakua CSV' },
  'admin.loadConsoleError': {
    en: 'Unable to load admin console',
    sw: 'Imeshindikana kupakia kituo cha admin',
  },
  'admin.loadGovernanceError': {
    en: 'Unable to load governance & audit records',
    sw: 'Imeshindikana kupakia kumbukumbu za ukaguzi',
  },
  'admin.syncReconciledToast': {
    en: 'Firestore sync reconciled ({{flushed}} queued operation(s) flushed).',
    sw: 'Usawazishaji wa Firestore umekamilika (miamala {{flushed}} imetumwa).',
  },
  'admin.syncStatusToast': {
    en: 'Sync status: {{status}}. Pending queue: {{remaining}}.',
    sw: 'Hali ya usawazishaji: {{status}}. Foleni iliyobaki: {{remaining}}.',
  },
  'admin.syncFailedToast': {
    en: 'Sync reconciliation failed',
    sw: 'Usawazishaji umeshindikana',
  },
  'admin.aiReportGenerated': {
    en: 'AI executive BI report generated.',
    sw: 'Ripoti kuu ya biashara ya AI imetengenezwa.',
  },
  'admin.calcReportGenerated': {
    en: 'Calculated BI summary generated.',
    sw: 'Muhtasari wa mahesabu ya biashara umetengenezwa.',
  },
  'admin.aiReportFailed': {
    en: 'Unable to generate BI report',
    sw: 'Imeshindikana kutengeneza ripoti ya BI',
  },
  'admin.analyticsExportToast': {
    en: 'Exported Business Intelligence CSV report.',
    sw: 'Ripoti ya CSV ya takwimu za biashara imepakuliwa.',
  },
  'admin.analyticsExportFailed': {
    en: 'Analytics export failed',
    sw: 'Imeshindikana kupakua takwimu',
  },
  'admin.verifFilterFailed': {
    en: 'Unable to filter payment submissions',
    sw: 'Imeshindikana kuchuja miamala ya malipo',
  },
  'admin.receiptLoadFailed': {
    en: 'Unable to load payment receipt',
    sw: 'Imeshindikana kupakia risiti ya malipo',
  },
  'admin.recipientNameField': { en: 'Recipient Name:', sw: 'Jina la Mpokeaji:' },
  'admin.accountHolderField': { en: 'Account Holder:', sw: 'Mmiliki wa Akaunti:' },
  'admin.phoneField': { en: 'Phone:', sw: 'Simu:' },
  'admin.toWord': { en: 'to', sw: 'hadi' },
  'admin.applyRangeBtn': { en: 'Apply Range', sw: 'Tumia Kipindi' },
  'admin.generatingBtn': { en: 'Generating...', sw: 'Inatengeneza...' },
  'admin.ordersSuffix': { en: 'orders', sw: 'oda' },
  'admin.soldSuffix': { en: 'sold', sw: 'zimeuzwa' },
  'admin.viewsSuffix': { en: 'views', sw: 'mitazamo' },
  'admin.convSuffix': { en: 'conv', sw: 'ununuzi' },
  'admin.stockUnit': { en: 'stock', sw: 'stoo' },
  'admin.lowConversionTitle': {
    en: 'Low-Conversion Attention',
    sw: 'Bidhaa Zenye Ununuzi Mdogo',
  },
  'admin.geminiApiLabel': { en: 'Gemini API:', sw: 'Gemini AI:' },
  'admin.calculatedAnalyticsBadge': {
    en: 'Calculated Analytics',
    sw: 'Uchambuzi wa Mahesabu',
  },
  'admin.actionableRecs': {
    en: 'Actionable Recommendations',
    sw: 'Mapendekezo ya Hatua za Kuchukua',
  },
  'admin.orderLabel': { en: 'Order', sw: 'Oda' },
  'admin.submissionLabel': { en: 'Submission', sw: 'Wasilisho' },
  'admin.dateFromAria': { en: 'Date from', sw: 'Kuanzia tarehe' },
  'admin.dateToAria': { en: 'Date to', sw: 'Hadi tarehe' },
  'admin.resetBtn': { en: 'Reset', sw: 'Ondoa Vichujio' },
  'admin.rejectionReasonLabel': { en: 'Rejection Reason:', sw: 'Sababu ya Kukataa:' },
  'admin.requestedInfoLabel': { en: 'Requested Info:', sw: 'Taarifa Zilizoombwa:' },
  'admin.adminNoteLabel': { en: 'Admin Note:', sw: 'Maelezo ya Admin:' },
  'admin.paymentApprovedToast': {
    en: 'Payment verified & approved.',
    sw: 'Malipo yamehakikiwa na kuthibitishwa.',
  },
  'admin.paymentRejectMinError': {
    en: 'Enter a clear rejection reason (minimum 5 characters).',
    sw: 'Weka sababu ya wazi ya kukataa (angalau herufi 5).',
  },
  'admin.paymentRejectedToast': {
    en: 'Payment rejected and customer notified.',
    sw: 'Malipo yamekataliwa na mteja amearifiwa.',
  },
  'admin.paymentInfoMinError': {
    en: 'Enter specific information requested from customer (min 5 chars).',
    sw: 'Andika maelezo mahususi unayohitaji kutoka kwa mteja (angalau herufi 5).',
  },
  'admin.paymentInfoSentToast': {
    en: 'Clarification request sent to customer.',
    sw: 'Ombi la ufafanuzi limetumwa kwa mteja.',
  },
  'admin.actorLabel': { en: 'Actor:', sw: 'Mhusika:' },
  'admin.reasonWord': { en: 'Reason:', sw: 'Sababu:' },
  'admin.ownerLabel': { en: 'Owner:', sw: 'Mmiliki:' },
  'admin.regTinLabel': { en: 'Reg/TIN:', sw: 'Usajili/TIN:' },
  'admin.notProvided': { en: 'Not provided', sw: 'Haijawekwa' },
  'admin.docLabel': { en: 'Doc:', sw: 'Hati:' },
  'admin.verifiedLabel': { en: 'Verified:', sw: 'Imethibitishwa:' },
  'admin.commissionUpdatedToast': {
    en: 'Supplier commission updated.',
    sw: 'Kamisheni ya msambazaji imesasishwa.',
  },
  'admin.productPhotosHeader': { en: 'Product & Photos', sw: 'Bidhaa & Picha' },
  'admin.supplierHeader': { en: 'Supplier', sw: 'Msambazaji' },
  'admin.photosCountLabel': { en: '{{count}} photo(s)', sw: 'Picha {{count}}' },
  'admin.minSellingPriceToast': {
    en: 'Selling price must be >= supplier price (${{price}}).',
    sw: 'Bei ya kuuza lazima iwe kubwa au sawa na bei ya msambazaji (${{price}}).',
  },
  'admin.publishedLiveToast': {
    en: 'Selling price saved & product published live.',
    sw: 'Bei ya kuuza imehifadhiwa na bidhaa imechapishwa sokoni.',
  },
  'admin.unpublishedToast': {
    en: 'Product unpublished (held as Approved).',
    sw: 'Bidhaa imeondolewa sokoni (imeshikiliwa kama Imeidhinishwa).',
  },
  'admin.noOrdersPlaced': { en: 'No orders placed yet.', sw: 'Bado hakuna oda zilizowekwa.' },
  'admin.notSubmittedYet': { en: 'Not submitted yet', sw: 'Bado haijatumwa' },
  'admin.senderLabel': { en: 'Sender:', sw: 'Aliyetuma:' },
  'admin.txRejectPlaceholder': {
    en: 'Rejection reason (if invalid ID)',
    sw: 'Sababu ya kukataa (ikiwa muamala si sahihi)',
  },
  'admin.verifyOrderConfirmTitle': {
    en: 'Verify Payment for {{orderId}}?',
    sw: 'Thibitisha Malipo ya {{orderId}}?',
  },
  'admin.verifyOrderConfirmMsg': {
    en: 'Confirm Transaction ID "{{txId}}" matched incoming funds on {{provider}}?',
    sw: 'Je, umethibitisha Transaction ID "{{txId}}" imelingana na fedha zilizopokelewa kupitia {{provider}}?',
  },
  'admin.paymentConfirmedSupplierToast': {
    en: 'Payment confirmed. You can now transfer cost to supplier.',
    sw: 'Malipo yamethibitishwa. Sasa unaweza kumlipa msambazaji.',
  },
  'admin.txRejectedCustomerToast': {
    en: 'Transaction ID rejected and customer notified.',
    sw: 'Transaction ID imekataliwa na mteja amearifiwa.',
  },
  'admin.customerPaidLabel': { en: 'Customer Paid:', sw: 'Mteja Alilipa:' },
  'admin.paySupplierLabel': { en: 'Pay Supplier:', sw: 'Mlipe Msambazaji:' },
  'admin.exceptionActiveBadge': {
    en: 'Documented Exception Release Active:',
    sw: 'Ruhusa ya Dharura Imewashwa:',
  },
  'admin.enterPayoutRefError': {
    en: 'Enter the payout reference you sent to the supplier.',
    sw: 'Weka kumbukumbu ya malipo uliyomtumia msambazaji.',
  },
  'admin.supplierSettledToast': {
    en: 'Supplier settled & order released for shipping.',
    sw: 'Msambazaji amelipwa na oda imetolewa kwa usafirishaji.',
  },
  'admin.verifyFirstHint': {
    en: 'Verify customer payment first to release to supplier.',
    sw: 'Hakiki malipo ya mteja kwanza kabla ya kutoa oda kwa msambazaji.',
  },
  'admin.adminStatusInterventionNote': {
    en: 'Admin status intervention',
    sw: 'Mabadiliko ya hali na Admin',
  },
  'admin.scopeGlobal': { en: 'Global', sw: 'Soko Zima' },
  'admin.scopeCategory': { en: 'Category', sw: 'Kundi la Bidhaa' },
  'admin.scopePromotional': { en: 'Promotional', sw: 'Ofa Maalum' },
  'admin.ruleTargetPlaceholder': {
    en: 'Target (e.g., Dresses)',
    sw: 'Lengo (mf. Magauni)',
  },
  'admin.ruleLabelPlaceholder': { en: 'Rule Label', sw: 'Jina la Kanuni' },
  'admin.addBtn': { en: 'Add', sw: 'Ongeza' },
  'admin.ruleSavedToast': { en: 'Commission rule saved.', sw: 'Kanuni ya kamisheni imehifadhiwa.' },
  'admin.noPayoutRequests': {
    en: 'No supplier payout requests.',
    sw: 'Hakuna maombi ya malipo ya wasambazaji.',
  },
  'admin.noRefundRequests': { en: 'No refund requests.', sw: 'Hakuna maombi ya marejesho.' },
  'admin.refundApprovedNote': {
    en: 'Approved & settled by Admin.',
    sw: 'Imeidhinishwa na kurejeshwa na Admin.',
  },
  'admin.refundRejectedNote': {
    en: 'Rejected after review.',
    sw: 'Imekataliwa baada ya ukaguzi.',
  },
  'admin.couponCodePlaceholder': { en: 'Code (e.g., SAVE15)', sw: 'Kodi (mf. SAVE15)' },
  'admin.couponPercentageOption': { en: 'Percentage %', sw: 'Asilimia %' },
  'admin.couponFixedOption': { en: 'Fixed USD', sw: 'Kiasi Maalum USD' },
  'admin.valuePlaceholder': { en: 'Value', sw: 'Thamani' },
  'admin.activeDisableBtn': { en: 'Active (Disable)', sw: 'Inafanya kazi (Zima)' },
  'admin.disabledEnableBtn': { en: 'Disabled (Enable)', sw: 'Imezimwa (Washa)' },
  'admin.audienceAll': { en: 'All Users', sw: 'Watumiaji Wote' },
  'admin.audienceSuppliers': { en: 'Suppliers Only', sw: 'Wasambazaji Tu' },
  'admin.audienceCustomers': { en: 'Customers Only', sw: 'Wateja Tu' },
  'admin.announcementTitlePlaceholder': { en: 'Announcement Title', sw: 'Kichwa cha Tangazo' },
  'admin.announcementMsgPlaceholder': {
    en: 'Announcement Message...',
    sw: 'Ujumbe wa tangazo...',
  },
  'admin.announcementSentToast': {
    en: 'Announcement sent to {{count}} user(s).',
    sw: 'Tangazo limetumwa kwa watumiaji {{count}}.',
  },
  'admin.noTicketsLogged': {
    en: 'No support tickets logged.',
    sw: 'Hakuna tiketi za msaada zilizorekodiwa.',
  },
  'admin.defaultTicketReply': {
    en: 'Resolved by marketplace support.',
    sw: 'Imetatuliwa na timu ya msaada ya soko.',
  },
  'admin.roleCol': { en: 'Role', sw: 'Jukumu' },
  'admin.permissionsUpdatedToast': {
    en: 'Staff payment verification permission updated.',
    sw: 'Ruhusa ya mhudumu kuhakiki malipo imesasishwa.',
  },
  'admin.userStatusConfirmMsg': {
    en: 'Account access will be updated immediately.',
    sw: 'Ufikiaji wa akaunti utasasishwa mara moja.',
  },
  'admin.accountSecurityHeading': {
    en: 'Account Security — {{title}}',
    sw: 'Usalama wa Akaunti — {{title}}',
  },
  'admin.pwMinLengthErr': {
    en: 'New password must be at least 8 characters.',
    sw: 'Nenosiri jipya lazima liwe na angalau herufi 8.',
  },
  'admin.pwMismatchErr': {
    en: 'New password and confirmation do not match.',
    sw: 'Nenosiri jipya na uthibitisho havifanani.',
  },
  'admin.pwChangeFailed': {
    en: 'Unable to change password.',
    sw: 'Imeshindikana kubadilisha nenosiri.',
  },
  'admin.pwCurrentPlaceholder': { en: 'Current password', sw: 'Nenosiri la sasa' },
  'admin.pwNewPlaceholder': {
    en: 'New password (min 8 chars)',
    sw: 'Nenosiri jipya (angalau herufi 8)',
  },
  'admin.pwConfirmPlaceholder': { en: 'Confirm new password', sw: 'Thibitisha nenosiri jipya' },
  'admin.updatingBtn': { en: 'Updating...', sw: 'Inasasisha...' },
  'admin.googleAuthSessionNote': {
    en: 'Your admin session is authenticated via Google Sign-In ({{email}}).',
    sw: 'Kipindi chako cha admin kimeingia kupitia Google ({{email}}).',
  },
  'admin.settingsUpdatedToast': {
    en: 'Marketplace settings updated live.',
    sw: 'Mipangilio ya soko imesasishwa moja kwa moja.',
  },
  'admin.managedBySuperAdmin': {
    en: 'Managed strictly by Super Admin — dynamically shown at checkout',
    sw: 'Inasimamiwa na Super Admin pekee — huonekana moja kwa moja wakati wa kulipia',
  },
  'admin.officialRecipientDesc': {
    en: 'Default recipient / account holder displayed for both M-Pesa and NMB Bank Transfer. Super Admin may update when needed.',
    sw: 'Jina chaguo-msingi la mpokeaji kwa M-Pesa na NMB Bank. Super Admin anaweza kubadilisha ikihitajika.',
  },
  'admin.resetDefaultRecipientBtn': {
    en: 'Reset to Default (MAHELA ISSA KISENA)',
    sw: 'Rejesha Chaguo-msingi (MAHELA ISSA KISENA)',
  },
  'admin.officialHolderField': {
    en: 'Official Recipient / Account Holder Name',
    sw: 'Jina Rasmi la Mpokeaji / Mmiliki wa Akaunti',
  },
  'admin.enableMpesaCheckout': {
    en: 'Enable M-Pesa at Checkout',
    sw: 'Wezesha M-Pesa Kwenye Malipo',
  },
  'admin.mpesaPhoneField': {
    en: 'M-Pesa Receiving Phone Number',
    sw: 'Namba ya Simu ya Kupokea M-Pesa',
  },
  'admin.mpesaPhonePlaceholder': {
    en: 'Enter M-Pesa receiving number',
    sw: 'Weka namba ya kupokea M-Pesa',
  },
  'admin.mpesaNameField': { en: 'M-Pesa Recipient Name', sw: 'Jina la Mpokeaji M-Pesa' },
  'admin.mpesaInstructionsEn': {
    en: 'M-Pesa Instructions (English)',
    sw: 'Maelekezo ya M-Pesa (Kiingereza)',
  },
  'admin.enableNmbCheckout': {
    en: 'Enable NMB Bank Transfer at Checkout',
    sw: 'Wezesha Benki ya NMB Kwenye Malipo',
  },
  'admin.nmbAccNameField': { en: 'NMB Account Name', sw: 'Jina la Akaunti ya NMB' },
  'admin.nmbAccNumField': { en: 'NMB Account Number', sw: 'Namba ya Akaunti ya NMB' },
  'admin.nmbAccNumPlaceholder': {
    en: 'Enter NMB account number',
    sw: 'Weka namba ya akaunti ya NMB',
  },
  'admin.nmbBranchField': {
    en: 'NMB Bank Branch / Details',
    sw: 'Tawi la NMB / Maelezo',
  },
  'admin.nmbInstructionsEn': {
    en: 'NMB Instructions (English)',
    sw: 'Maelekezo ya NMB (Kiingereza)',
  },
  'admin.heroSubtitleEn': {
    en: 'Hero Subtitle (English)',
    sw: 'Maelezo Madogo ya Mwanzo (Kiingereza)',
  },
  'admin.heroSubtitleSw': {
    en: 'Hero Subtitle (Kiswahili)',
    sw: 'Maelezo Madogo ya Mwanzo (Kiswahili)',
  },
  'admin.heroCtaEn': {
    en: 'Hero Button Text (English)',
    sw: 'Maandishi ya Kitufe Kikuu (Kiingereza)',
  },
  'admin.heroCtaSw': {
    en: 'Hero Button Text (Kiswahili)',
    sw: 'Maandishi ya Kitufe Kikuu (Kiswahili)',
  },
  'admin.promoTitleEn': {
    en: 'Promo Banner Title (English)',
    sw: 'Kichwa cha Tangazo la Ofa (Kiingereza)',
  },
  'admin.promoTitleSw': {
    en: 'Promo Banner Title (Kiswahili)',
    sw: 'Kichwa cha Tangazo la Ofa (Kiswahili)',
  },
  'admin.promoSubtitleEn': {
    en: 'Promo Banner Subtitle (English)',
    sw: 'Maelezo ya Tangazo la Ofa (Kiingereza)',
  },
  'admin.promoSubtitleSw': {
    en: 'Promo Banner Subtitle (Kiswahili)',
    sw: 'Maelezo ya Tangazo la Ofa (Kiswahili)',
  },
  'admin.globalCommissionField': {
    en: 'Global Commission (%)',
    sw: 'Kamisheni ya Soko (%)',
  },
  'admin.tzsRateField': {
    en: 'TZS per 1 USD Exchange Rate',
    sw: 'Kiwango cha Ubadilishaji (TZS kwa USD 1)',
  },
  'admin.autoReleaseCheck': {
    en: 'Auto-release supplier suborders immediately when Admin approves payment',
    sw: 'Ruhusu oda za wasambazaji kiotomatiki pindi Admin anapothibitisha malipo',
  },
  'admin.requireApprovalCheck': {
    en: 'Require Product Approval',
    sw: 'Hitaji Idhini ya Bidhaa Kabla ya Kuchapisha',
  },
  'admin.allowGuestCheck': {
    en: 'Allow Guest Checkout',
    sw: 'Ruhusu Ununuzi Bila Kujisajili',
  },
  'admin.r2BannersTitle': {
    en: 'Storefront Banners & Category Covers (Cloudflare R2)',
    sw: 'Picha Kuu za Tovuti & Makundi (Cloudflare R2)',
  },
  'admin.r2BannersDesc': {
    en: 'Upload high-resolution JPG, PNG, or WEBP banners directly to Cloudflare R2. Existing visuals remain active until the new image is uploaded and saved.',
    sw: 'Pakia picha bora za JPG, PNG, au WEBP moja kwa moja kwenye Cloudflare R2. Picha za awali zinabaki hadi picha mpya ipakiwe na kuhifadhiwa.',
  },
  'admin.heroBannerSlot': { en: 'Hero Showcase Banner', sw: 'Picha Kuu ya Mwanzo (Hero)' },
  'admin.menCoverSlot': { en: 'Menswear Category Cover', sw: 'Picha ya Kundi la Wanaume' },
  'admin.womenCoverSlot': { en: 'Womenswear Category Cover', sw: 'Picha ya Kundi la Wanawake' },
  'admin.uploadingR2': { en: 'Uploading to R2...', sw: 'Inapakia kwenda R2...' },
  'admin.r2UploadedToast': {
    en: '{{label}} uploaded to Cloudflare R2.',
    sw: '{{label}} imepakiwa kwenda Cloudflare R2.',
  },
  'admin.r2UploadFailedToast': {
    en: 'Failed to upload {{label}}',
    sw: 'Imeshindikana kupakia {{label}}',
  },
  'admin.infraKicker': {
    en: 'Infrastructure & Persistence Reliability',
    sw: 'Miundombinu & Uthabiti wa Hifadhi Data',
  },
  'admin.healthMonitorHeading': {
    en: 'Database Sync & System Health Monitor',
    sw: 'Ufuatiliaji wa Usawazishaji & Afya ya Mfumo',
  },
  'admin.refreshHealthBtn': { en: 'Refresh Health', sw: 'Kagua Afya' },
  'admin.reconcilingBtn': { en: 'Reconciling...', sw: 'Inasawazisha...' },
  'admin.cloudSyncCardTitle': {
    en: 'Cloud Sync & Auth State',
    sw: 'Usawazishaji wa Wingu & Auth',
  },
  'admin.outboxSyncLine': {
    en: 'Outbox Queue: {{pending}} · Synced: {{synced}}',
    sw: 'Foleni: {{pending}} · Zimesawazishwa: {{synced}}',
  },
  'admin.adminSdkReady': { en: 'Ready', sw: 'Tayari' },
  'admin.adminSdkOffline': { en: 'Offline Fallback', sw: 'Hali ya Akiba (Offline)' },
  'admin.localSnapshotTitle': {
    en: 'Local Durable Snapshot',
    sw: 'Hifadhi ya Kudumu ya Ndani',
  },
  'admin.snapshotActive': { en: 'Active & Saved', sw: 'Hai & Imehifadhiwa' },
  'admin.snapshotPending': { en: 'Pending Initial Write', sw: 'Inasubiri Kuhifadhiwa' },
  'admin.mediaStorageCardTitle': {
    en: 'Media & Storage (Cloudflare R2)',
    sw: 'Picha & Hifadhi (Cloudflare R2)',
  },
  'admin.allMediaOk': { en: 'All Registered Media OK', sw: 'Picha Zote Ziko Salama' },
  'admin.missingFilesCount': {
    en: '{{count}} Missing File(s)',
    sw: 'Faili {{count}} Zinakosekana',
  },
  'admin.apiBackupsTitle': { en: 'API Runtime & Backups', sw: 'Uendeshaji wa API & Nakala Akiba' },
  'admin.snapshotsCountLabel': { en: '{{count}} Snapshot(s)', sw: 'Nakala {{count}}' },
  'admin.recentWarningsToggle': {
    en: 'Recent Server Warnings & Errors ({{count}})',
    sw: 'Tahadhari & Hitilafu za Hivi Karibuni ({{count}})',
  },
  'admin.loadingDiagnostics': {
    en: 'Loading infrastructure health diagnostics...',
    sw: 'Inapakia uchunguzi wa afya ya mfumo...',
  },
  'admin.masterAuditKicker': {
    en: 'Master Audit & Governance',
    sw: 'Ukaguzi Mkuu & Utawala',
  },
  'admin.auditLogHeading': {
    en: 'Append-Only Administrative Audit Log ({{count}})',
    sw: 'Kumbukumbu ya Kudumu ya Ukaguzi ({{count}})',
  },
  'admin.auditSearchPlaceholder': {
    en: 'Search actor, action, order, target...',
    sw: 'Tafuta mhusika, tukio, oda, lengo...',
  },
  'admin.allRoles': { en: 'All Roles', sw: 'Majukumu Yote' },
  'admin.allOutcomes': { en: 'All Outcomes', sw: 'Matokeo Yote' },
  'admin.outcomeSuccess': { en: 'Success', sw: 'Imefanikiwa' },
  'admin.outcomeFailure': { en: 'Failure', sw: 'Imeshindwa' },
  'admin.outcomeBlocked': { en: 'Blocked', sw: 'Imezuiwa' },
  'admin.loadingAudit': { en: 'Loading audit trail...', sw: 'Inapakia kumbukumbu za ukaguzi...' },
  'admin.noAuditMatch': {
    en: 'No audit log entries match your filters.',
    sw: 'Hakuna kumbukumbu zinazolingana na vichujio hivi.',
  },
  'admin.notifAuditHeading': {
    en: 'Notification History & Recovery Inspector',
    sw: 'Kumbukumbu ya Taarifa & Ukaguzi wa Zilizofichwa',
  },
  'admin.hiddenByUserOnly': { en: 'Hidden by User Only', sw: 'Zilizofichwa na Mtumiaji Tu' },
  'admin.notifSearchPlaceholder': {
    en: 'Search UID, title, type...',
    sw: 'Tafuta UID, kichwa, aina...',
  },
  'admin.notifAuditDesc': {
    en: 'Users can clear notifications from their personal view without deleting underlying marketplace records. All original notifications and clear timestamps remain auditable here.',
    sw: 'Watumiaji wanaweza kuficha taarifa kwenye kikasha chao bila kufuta kumbukumbu halisi za soko. Taarifa zote zinabaki kwa ukaguzi hapa.',
  },
  'admin.noNotifAuditMatch': {
    en: 'No notification audit records match.',
    sw: 'Hakuna taarifa zinazolingana.',
  },
  'admin.hiddenByUserBadge': { en: 'HIDDEN BY USER', sw: 'IMEFICHWA NA MTUMIAJI' },
  'admin.backupsHeading': {
    en: 'Checksummed Backups & Restore',
    sw: 'Nakala Akiba zenye SHA-256 & Kurejesha',
  },
  'admin.creatingBtn': { en: 'Creating...', sw: 'Inatengeneza...' },
  'admin.backupsDesc': {
    en: 'Each snapshot captures orders, suborders, payments, users, products, and audit logs with a verified SHA-256 checksum. Restoring automatically saves a pre-restore safety snapshot first.',
    sw: 'Kila nakala inahifadhi oda, malipo, watumiaji, bidhaa, na ukaguzi kwa alama ya SHA-256. Kurejesha huhifadhi nakala ya usalama kwanza.',
  },
  'admin.noBackupsYet': {
    en: 'No backup snapshots stored yet.',
    sw: 'Hakuna nakala akiba zilizohifadhiwa bado.',
  },
  'admin.downloadBtn': { en: 'Download', sw: 'Pakua' },
  'admin.restoreBtn': { en: 'Restore', sw: 'Rejesha' },
  'admin.restoreConfirmTitle': {
    en: 'Restore Backup {{id}}?',
    sw: 'Rejesha Nakala Akiba {{id}}?',
  },
  'admin.restoreConfirmMsg': {
    en: 'An automatic pre_restore safety snapshot will be created before restoring state. Audit logs are preserved.',
    sw: 'Nakala ya usalama itatengenezwa kiotomatiki kabla ya kurejesha hali ya awali. Kumbukumbu za ukaguzi zitabaki.',
  },
  'admin.restoreSuccessToast': {
    en: 'Restored marketplace snapshot {{id}}.',
    sw: 'Nakala ya soko {{id}} imerejeshwa.',
  },
  'admin.backupCreatedToast': {
    en: 'Checksummed backup snapshot created.',
    sw: 'Nakala akiba yenye SHA-256 imetengenezwa.',
  },
  'admin.backupCreateFailed': {
    en: 'Failed to create backup',
    sw: 'Imeshindikana kutengeneza nakala akiba',
  },
  'admin.backupDownloadToast': {
    en: 'Downloaded backup snapshot {{id}}.',
    sw: 'Nakala akiba {{id}} imepakuliwa.',
  },
  'admin.backupDownloadFailed': {
    en: 'Failed to download backup',
    sw: 'Imeshindikana kupakua nakala akiba',
  },
  'admin.retentionPolicyTitle': { en: 'Data Retention Policy', sw: 'Sera ya Utunzaji Data' },
  'admin.auditRetentionDays': { en: 'Audit Retention (Days)', sw: 'Utunzaji wa Ukaguzi (Siku)' },
  'admin.notifRetentionDays': {
    en: 'Notifications Retention (Days)',
    sw: 'Utunzaji wa Taarifa (Siku)',
  },
  'admin.backupRetentionDays': {
    en: 'Backup Retention (Days)',
    sw: 'Utunzaji wa Nakala Akiba (Siku)',
  },
  'admin.maxSnapshotsLabel': { en: 'Max Snapshots', sw: 'Idadi ya Juu ya Nakala' },
  'admin.autoBackupToggle': {
    en: 'Enable Scheduled / Pre-Restore Automatic Backups',
    sw: 'Wezesha Nakala Akiba za Kiotomatiki',
  },
  'admin.scrubPiiToggle': {
    en: 'Scrub Buyer PII on Approved Privacy Erasure (Keep Ledger Totals)',
    sw: 'Futa Taarifa Binafsi Kwenye Maombi ya Faragha (Tunza Jumla za Kifedha)',
  },
  'admin.retentionSavedToast': {
    en: 'Data retention policy saved.',
    sw: 'Sera ya utunzaji data imehifadhiwa.',
  },
  'admin.retentionSaveFailed': {
    en: 'Failed to save retention policy',
    sw: 'Imeshindikana kuhifadhi sera ya utunzaji data',
  },
  'admin.erasureRequestsHeading': {
    en: 'User Privacy & Erasure Requests ({{count}})',
    sw: 'Maombi ya Faragha & Kufuta Taarifa ({{count}})',
  },
  'admin.noErasureRequests': {
    en: 'No pending or processed privacy erasure requests.',
    sw: 'Hakuna maombi ya kufuta taarifa za faragha.',
  },
  'admin.anonymizedBadge': {
    en: 'Anonymized ({{date}})',
    sw: 'Imefichwa Faragha ({{date}})',
  },
  'admin.anonymizeConfirmTitle': {
    en: 'Anonymize User PII ({{email}})?',
    sw: 'Futa Taarifa Binafsi za {{email}}?',
  },
  'admin.anonymizeConfirmMsg': {
    en: 'Redacts name, email, phone, and street address from user profile and historical orders while preserving financial ledger amounts and audit history.',
    sw: 'Hufuta jina, barua pepe, simu, na anuani kutoka kwenye wasifu na oda za awali huku kumbukumbu za kifedha na ukaguzi zikibaki.',
  },
  'admin.anonymizedToast': {
    en: 'Anonymized PII for {{uid}}.',
    sw: 'Taarifa binafsi za {{uid}} zimefutwa kwa faragha.',
  },
  'admin.executeAnonymizeBtn': {
    en: 'Execute PII Anonymization',
    sw: 'Tekeleza Kufuta Taarifa Binafsi',
  },
  'admin.exportAuditToast': {
    en: 'Exported audit logs ({{format}}).',
    sw: 'Kumbukumbu za ukaguzi zimepakuliwa ({{format}}).',
  },
  'admin.exportAuditFailed': {
    en: 'Audit export failed',
    sw: 'Imeshindikana kupakua kumbukumbu za ukaguzi',
  },
  'admin.receiptModalTitle': {
    en: 'Payment Receipt Screenshot',
    sw: 'Picha ya Risiti ya Malipo',
  },
  'admin.receiptAlt': { en: 'Customer payment receipt', sw: 'Risiti ya malipo ya mteja' },
  'admin.exceptionModalDesc': {
    en: 'Release suborder {{subId}} to {{supplier}} before customer payment is verified. This creates a permanent audit entry and notifies the supplier.',
    sw: 'Ruhusu oda {{subId}} kwenda kwa {{supplier}} kabla malipo ya mteja hayajathibitishwa. Hatua hii inarekodiwa daima kwenye ukaguzi na kutaarifu msambazaji.',
  },
  'admin.exceptionReasonPlaceholder': {
    en: 'e.g., VIP partner invoice settlement confirmed by Finance Director',
    sw: 'mf. Malipo ya mshirika maalum yamethibitishwa na Mkurugenzi wa Fedha',
  },
  'admin.exceptionMinError': {
    en: 'Documented reason must be at least 8 characters.',
    sw: 'Sababu ya dharura lazima iwe na angalau herufi 8.',
  },
  'admin.exceptionSuccessToast': {
    en: 'Suborder released to supplier under documented exception.',
    sw: 'Oda imetolewa kwa msambazaji kwa ruhusa maalum.',
  },
  'admin.rejectMinError': {
    en: 'Please provide a clear rejection reason (minimum 5 characters).',
    sw: 'Tafadhali weka sababu ya wazi ya kukataa (angalau herufi 5).',
  },
  'admin.changesMinError': {
    en: 'Please describe the requested changes (minimum 5 characters).',
    sw: 'Tafadhali eleza marekebisho yanayohitajika (angalau herufi 5).',
  },
  'admin.sellingPriceFloorErr': {
    en: 'Selling price (${{selling}}) cannot be lower than supplier price (${{wholesale}}).',
    sw: 'Bei ya kuuza (${{selling}}) haiwezi kuwa chini ya bei ya msambazaji (${{wholesale}}).',
  },
  'admin.productUpdatedStatusToast': {
    en: 'Product updated to {{status}}.',
    sw: 'Hali ya bidhaa imebadilishwa kuwa {{status}}.',
  },
  'admin.moderationFailedToast': {
    en: 'Moderation update failed',
    sw: 'Imeshindikana kusasisha idhini ya bidhaa',
  },
  'admin.zoomBtn': { en: 'Zoom', sw: 'Kuza' },
  'admin.zoomedAlt': {
    en: 'Zoomed product inspection',
    sw: 'Ukaguzi wa picha iliyokuzwa',
  },
  'admin.catGenderLabel': { en: 'Category & Gender:', sw: 'Aina & Jinsia:' },
  'admin.brandWord': { en: 'Brand:', sw: 'Chapa:' },
  'admin.materialWord': { en: 'Material:', sw: 'Kitambaa:' },
  'admin.weightWord': { en: 'Weight:', sw: 'Uzito:' },
  'admin.shippingWord': { en: 'Shipping:', sw: 'Usafirishaji:' },
  'admin.variantsWord': { en: 'Variants:', sw: 'Saizi & Rangi:' },
  'admin.pricingMarkupTitle': {
    en: 'Pricing & Markup Controls',
    sw: 'Udhibiti wa Bei & Faida ya Soko',
  },
  'admin.moderationReasonLabel': {
    en: 'Rejection Reason or Requested Changes Message (mandatory if rejecting / requesting changes)',
    sw: 'Sababu ya Kukataa au Maelezo ya Marekebisho (lazima unapoikataa / kuomba marekebisho)',
  },
  'admin.deleteProductConfirmTitle': {
    en: 'Delete "{{title}}" Permanently?',
    sw: 'Futa "{{title}}" Daima?',
  },
  'admin.deleteProductConfirmMsg': {
    en: 'Deletes the listing and cleans up unreferenced uploaded images.',
    sw: 'Hufuta bidhaa na kuondoa picha zake zisizotumika sehemu nyingine.',
  },
  'admin.productDeletedToast': { en: 'Product deleted.', sw: 'Bidhaa imefutwa.' },

  // Admin Chatbot Knowledge & FAQ Center
  'adminChatbot.title': {
    en: 'AI Chatbot Knowledge Sync & Bilingual FAQ Center',
    sw: 'Usawazishaji wa Maarifa ya Chatbot & Maswali ya Mara kwa Mara (FAQ)',
  },
  'adminChatbot.subtitle': {
    en: 'Monitor real-time knowledge indexing across products, pricing, coupons, shipping zones, M-Pesa/NMB channels, suppliers, and bilingual FAQs.',
    sw: 'Fuatilia usawazishaji wa moja kwa moja wa bidhaa, bei, kuponi, usafirishaji, njia za malipo za M-Pesa/NMB, wasambazaji, na maswali ya FAQ.',
  },
  'adminChatbot.reindexBtn': { en: 'Re-index Website Knowledge', sw: 'Sasisha Maarifa Yote ya Tovuti' },
  'adminChatbot.reindexing': { en: 'Re-indexing...', sw: 'Inasasisha...' },
  'adminChatbot.retrySyncBtn': { en: 'Retry Failed Syncs', sw: 'Jaribu Tena Zilizoshindwa' },
  'adminChatbot.retrying': { en: 'Retrying...', sw: 'Inajaribu tena...' },
  'adminChatbot.lastSync': { en: 'Last Knowledge Sync', sw: 'Usawazishaji wa Mwisho' },
  'adminChatbot.indexedDocs': { en: 'Indexed Knowledge Records', sw: 'Kumbukumbu Zilizosawazishwa' },
  'adminChatbot.failedEvents': { en: 'Failed Sync Events', sw: 'Matukio Yaliyoshindwa' },
  'adminChatbot.activeFaqs': { en: 'Active Bilingual FAQs', sw: 'Maswali Hai ya FAQ' },
  'adminChatbot.syncEventsTitle': { en: 'Recent Automatic Sync Events', sw: 'Matukio ya Hivi Karibuni ya Usawazishaji' },
  'adminChatbot.sourceBreakdown': { en: 'Knowledge Sources Covered', sw: 'Vyanzo vya Maarifa Vinavyotumika' },
  'adminChatbot.faqManagerTitle': { en: 'Bilingual FAQ & Store Policies Manager', sw: 'Usimamizi wa FAQ & Sera Kwa Lugha Mbili' },
  'adminChatbot.addFaqBtn': { en: 'Add Bilingual FAQ', sw: 'Ongeza Swali la FAQ' },
  'adminChatbot.updateFaqBtn': { en: 'Update FAQ', sw: 'Sasisha Swali' },
  'adminChatbot.faqCategory': { en: 'FAQ Category', sw: 'Aina ya Swali' },
  'adminChatbot.questionEn': { en: 'Question (English)', sw: 'Swali (Kiingereza)' },
  'adminChatbot.questionSw': { en: 'Question (Kiswahili)', sw: 'Swali (Kiswahili)' },
  'adminChatbot.answerEn': { en: 'Answer (English)', sw: 'Jibu (Kiingereza)' },
  'adminChatbot.answerSw': { en: 'Answer (Kiswahili)', sw: 'Jibu (Kiswahili)' },
  'adminChatbot.tagsLabel': { en: 'Search Keywords (comma-separated)', sw: 'Maneno Muhimu (tenganisha kwa koma)' },
  'adminChatbot.testConsoleTitle': { en: 'Live Chatbot Grounding Tester', sw: 'Jaribio la Moja kwa Moja la Chatbot' },
  'adminChatbot.testPromptPlaceholder': {
    en: 'Test a customer question (e.g., Do you have linen shirts in Dar es Salaam?)',
    sw: 'Jaribu swali la mteja (mf. Mna mashati ya kitani na bei yake kwa TZS ni shilingi ngapi?)',
  },
  'adminChatbot.runTestBtn': { en: 'Test Chatbot Response', sw: 'Jaribu Jibu la Chatbot' },
  'adminChatbot.testingBtn': { en: 'Testing...', sw: 'Inajaribu...' },
  'adminChatbot.activeToggle': { en: 'Active in Chatbot Knowledge', sw: 'Inatumika Kwenye Chatbot' },
  'adminChatbot.noFaqs': {
    en: 'No custom FAQs added yet. Use the form above to add bilingual store Q&A.',
    sw: 'Bado hujaongeza maswali ya FAQ. Tumia fomu hapo juu kuongeza maswali na majibu kwa lugha zote mbili.',
  },
  'adminChatbot.noSyncEvents': {
    en: 'No automatic sync events logged yet.',
    sw: 'Bado hakuna matukio ya usawazishaji yaliyorekodiwa.',
  },
  'adminChatbot.matchedSources': {
    en: 'Matched Sources ({{count}}):',
    sw: 'Vyanzo Vilivyotumika ({{count}}):',
  },
  'adminChatbot.privacyBlocked': {
    en: 'Privacy Guard Blocked Order IDs:',
    sw: 'Namba za Oda Zilizolindwa na Faragha:',
  },
  'adminChatbot.loadingKnowledge': {
    en: 'Loading chatbot knowledge base...',
    sw: 'Inapakia kituo cha maarifa ya chatbot...',
  },
  'adminChatbot.reindexSuccessToast': {
    en: 'Re-indexed {{indexed}} knowledge record(s) ({{removed}} stale removed).',
    sw: 'Kumbukumbu {{indexed}} za maarifa zimesawazishwa (zilizopitwa {{removed}} zimeondolewa).',
  },
  'adminChatbot.retrySyncToast': {
    en: 'Retried {{attempted}} sync event(s): {{recovered}} recovered, {{stillFailed}} remaining.',
    sw: 'Matukio {{attempted}} yamejaribiwa tena: {{recovered}} yamefanikiwa, {{stillFailed}} bado.',
  },
  'adminChatbot.faqSavedToast': {
    en: 'Bilingual FAQ saved & synced to chatbot.',
    sw: 'Swali la FAQ kwa lugha mbili limehifadhiwa na kusawazishwa.',
  },
  'adminChatbot.faqDeletedToast': {
    en: 'FAQ removed from chatbot knowledge.',
    sw: 'Swali la FAQ limeondolewa kwenye maarifa.',
  },
  'adminChatbot.editCancelBtn': { en: 'Cancel Edit', sw: 'Ghairi Kuhariri' },
  'adminChatbot.faqCountHeading': {
    en: 'Saved Bilingual FAQs ({{count}})',
    sw: 'Maswali ya FAQ Yaliyohifadhiwa ({{count}})',
  },
  'adminChatbot.documentsHeading': {
    en: 'Indexed Knowledge Documents ({{count}})',
    sw: 'Hati za Maarifa Zilizosawazishwa ({{count}})',
  },
  'adminChatbot.geminiStatusLabel': { en: 'AI Engine:', sw: 'Injini ya AI:' },
  'adminChatbot.testLangLabel': { en: 'Test Language:', sw: 'Lugha ya Jaribio:' },
  'adminChatbot.escalateFlag': { en: 'Escalation Suggested:', sw: 'Inapendekeza Mhudumu:' },
  'adminChatbot.catShopping': { en: 'Shopping & Catalog', sw: 'Ununuzi & Bidhaa' },
  'adminChatbot.catPayments': { en: 'Payments (M-Pesa / NMB)', sw: 'Malipo (M-Pesa / NMB)' },
  'adminChatbot.catShipping': { en: 'Shipping & Delivery', sw: 'Usafirishaji & Uwasilishaji' },
  'adminChatbot.catOrders': { en: 'Order Tracking', sw: 'Ufuatiliaji wa Oda' },
  'adminChatbot.catSuppliers': { en: 'Suppliers & Onboarding', sw: 'Wasambazaji & Usajili' },
  'adminChatbot.catReturns': { en: 'Returns & Refunds', sw: 'Kurudisha & Marejesho' },
  'adminChatbot.catGeneral': { en: 'General Store Policy', sw: 'Sera ya Jumla ya Duka' },

  // Notifications Extended
  'notifications.markAllDone': {
    en: 'All visible notifications marked as read.',
    sw: 'Taarifa zote zimewekwa kuwa zimesomwa.',
  },
  'notifications.prefsSaved': {
    en: 'Notification preferences saved.',
    sw: 'Mipangilio ya taarifa imehifadhiwa.',
  },
  'notifications.inAppToggle': {
    en: 'Enable in-app real-time alerts',
    sw: 'Wezesha taarifa za papo hapo ndani ya app',
  },
  'notifications.emailToggle': {
    en: 'Enable important email updates',
    sw: 'Wezesha taarifa muhimu kwa barua pepe',
  },
  'notifications.mutedCategories': {
    en: 'Muted Non-Critical Categories',
    sw: 'Aina za Taarifa Zilizozimwa Sauti',
  },
  'notifications.openItem': { en: 'Open Related Item', sw: 'Fungua Kipengele Husika' },

  // Context & Action Toasts
  'toast.addedToCart': { en: 'Added {{title}} to your bag.', sw: '{{title}} imeongezwa kwenye kikapu.' },
  'toast.signedInWelcome': { en: 'Welcome back to TANZANITE EXPRESS.', sw: 'Karibu tena TANZANITE EXPRESS.' },
  'toast.accountCreated': {
    en: 'Account created! Please check your email for verification.',
    sw: 'Akaunti imefunguliwa! Kagua barua pepe yako kuthibitisha.',
  },
  'toast.signedOut': { en: 'You have signed out.', sw: 'Umetoka kwenye akaunti yako.' },
  'toast.resetSent': {
    en: 'Password reset link sent to your email.',
    sw: 'Kiungo cha kuweka upya nenosiri kimetumwa kwa barua pepe.',
  },
  'toast.verificationResent': {
    en: 'Verification email resent. Check your inbox.',
    sw: 'Barua ya uthibitisho imetumwa tena. Kagua kikasha chako.',
  },
  'toast.passwordUpdated': {
    en: 'Password updated successfully.',
    sw: 'Nenosiri limebadilishwa kikamilifu.',
  },
  'toast.wishlistAdded': { en: 'Saved to your wishlist.', sw: 'Imehifadhiwa kwenye orodha ya matamanio.' },
  'toast.wishlistRemoved': { en: 'Removed from wishlist.', sw: 'Imeondolewa kwenye orodha ya matamanio.' },
  'toast.signInRequired': {
    en: 'Please sign in first to continue.',
    sw: 'Tafadhali ingia kwenye akaunti kwanza ili kuendelea.',
  },
  'toast.languageSwitchedEn': { en: 'Language switched to English.', sw: 'Lugha imebadilishwa kuwa Kiingereza.' },
  'toast.languageSwitchedSw': { en: 'Lugha imebadilishwa kuwa Kiswahili.', sw: 'Lugha imebadilishwa kuwa Kiswahili.' },
};
