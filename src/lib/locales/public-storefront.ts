export interface BilingualPair {
  en: string;
  sw: string;
}

export const PUBLIC_STOREFRONT_PAIRS: Record<string, BilingualPair> = {
  // Common / Shared
  'common.loading': { en: 'Loading...', sw: 'Inapakia...' },
  'common.saving': { en: 'Saving...', sw: 'Inahifadhi...' },
  'common.save': { en: 'Save', sw: 'Hifadhi' },
  'common.cancel': { en: 'Cancel', sw: 'Ghairi' },
  'common.close': { en: 'Close', sw: 'Funga' },
  'common.delete': { en: 'Delete', sw: 'Futa' },
  'common.remove': { en: 'Remove', sw: 'Ondoa' },
  'common.edit': { en: 'Edit', sw: 'Hariri' },
  'common.update': { en: 'Update', sw: 'Sasisha' },
  'common.submit': { en: 'Submit', sw: 'Tuma' },
  'common.search': { en: 'Search', sw: 'Tafuta' },
  'common.filter': { en: 'Filter', sw: 'Chuja' },
  'common.all': { en: 'All', sw: 'Zote' },
  'common.yes': { en: 'Yes', sw: 'Ndiyo' },
  'common.no': { en: 'No', sw: 'Hapana' },
  'common.optional': { en: 'Optional', sw: 'Hiari' },
  'common.required': { en: 'Required', sw: 'Lazima' },
  'common.pageOf': { en: 'Page {{page}} of {{total}}', sw: 'Ukurasa {{page}} kati ya {{total}}' },
  'common.previous': { en: 'Previous', sw: 'Iliyopita' },
  'common.next': { en: 'Next', sw: 'Inayofuata' },
  'common.copy': { en: 'Copy', sw: 'Nakili' },
  'common.copied': { en: 'Copied!', sw: 'Imenakiliwa!' },
  'common.unknown': { en: 'Unknown', sw: 'Haijulikani' },
  'common.noData': { en: 'No records available.', sw: 'Hakuna taarifa zilizopo.' },
  'common.date': { en: 'Date', sw: 'Tarehe' },
  'common.status': { en: 'Status', sw: 'Hali' },
  'common.actions': { en: 'Actions', sw: 'Vitendo' },
  'common.details': { en: 'Details', sw: 'Maelezo' },
  'common.totalItems': { en: '{{count}} item(s)', sw: 'Bidhaa {{count}}' },
  'common.or': { en: 'or', sw: 'au' },
  'common.verified': { en: 'Verified', sw: 'Imethibitishwa' },
  'common.unverified': { en: 'Unverified', sw: 'Haijathibitishwa' },
  'common.currency': { en: 'Currency', sw: 'Sarafu' },
  'common.country': { en: 'Country', sw: 'Nchi' },
  'common.city': { en: 'City / Region', sw: 'Mji / Mkoa' },
  'common.street': { en: 'Street / Ward / Landmark', sw: 'Mtaa / Kata / Alama' },
  'common.phone': { en: 'Phone Number', sw: 'Namba ya Simu' },
  'common.email': { en: 'Email Address', sw: 'Barua Pepe' },
  'common.backToStore': { en: 'Back to Storefront', sw: 'Rudi Dukani' },

  // Navigation & Header
  'nav.brandTagline': {
    en: 'Fashion You Love, Delivered to You',
    sw: 'Mitindo Unayoipenda, Tunakuletea Ulipo',
  },
  'nav.home': { en: 'Home', sw: 'Nyumbani' },
  'nav.shopAll': { en: 'Shop All', sw: 'Bidhaa Zote' },
  'nav.openMenu': { en: 'Open navigation menu', sw: 'Fungua menyu' },
  'nav.closeMenu': { en: 'Close navigation menu', sw: 'Funga menyu' },
  'nav.offlineBadge': {
    en: 'Offline mode — browsing cached catalog',
    sw: 'Hali ya nje ya mtandao — unatazama bidhaa zilizohifadhiwa',
  },
  'nav.languageEn': { en: 'English', sw: 'Kiingereza (English)' },
  'nav.languageSw': { en: 'Kiswahili', sw: 'Kiswahili' },
  'nav.switchToSw': { en: 'SW', sw: 'SW' },
  'nav.switchToEn': { en: 'EN', sw: 'EN' },
  'nav.notificationsAria': { en: 'Notifications', sw: 'Taarifa' },
  'nav.cartAria': { en: 'Shopping Bag', sw: 'Kikapu cha Ununuzi' },
  'nav.deliveryPartnerPortal': {
    en: 'Delivery Partner Portal',
    sw: 'Sehemu ya Msafirishaji',
  },

  // Footer
  'footer.tagline': {
    en: 'Curated luxury & everyday African and international fashion — delivered across Tanzania and worldwide.',
    sw: 'Mitindo bora ya Kiafrika na kimataifa — inaletwa kote Tanzania na duniani kote.',
  },
  'footer.shopHeading': { en: 'Marketplace', sw: 'Soko' },
  'footer.helpHeading': { en: 'Customer Care', sw: 'Huduma kwa Wateja' },
  'footer.connectHeading': { en: 'Connect & App', sw: 'Ungana Nasi & App' },
  'footer.privacyLink': { en: 'Privacy Policy', sw: 'Sera ya Faragha' },
  'footer.termsLink': { en: 'Terms & Conditions', sw: 'Vigezo na Masharti' },
  'footer.returnsLink': { en: 'Returns & Refunds', sw: 'Kurudisha & Marejesho' },
  'footer.shippingLink': { en: 'Shipping & Customs', sw: 'Usafirishaji & Forodha' },
  'footer.rightsReserved': {
    en: '© {{year}} TANZANITE EXPRESS. All rights reserved.',
    sw: '© {{year}} TANZANITE EXPRESS. Haki zote zimehifadhiwa.',
  },
  'footer.instagram': { en: 'Instagram', sw: 'Instagram' },
  'footer.tiktok': { en: 'TikTok', sw: 'TikTok' },
  'footer.whatsappConcierge': { en: 'WhatsApp Concierge', sw: 'Huduma kwa WhatsApp' },

  // PWA Install
  'pwa.installApp': { en: 'Install App', sw: 'Sakinisha App' },
  'pwa.installed': { en: 'App Installed', sw: 'App Imesakinishwa' },
  'pwa.iosPrompt': {
    en: 'Tap Share in Safari and select "Add to Home Screen" to install TANZANITE EXPRESS.',
    sw: 'Bonyeza alama ya Share kwenye Safari kisha chagua "Add to Home Screen" ili kusakinisha TANZANITE EXPRESS.',
  },
  'pwa.installToast': {
    en: 'TANZANITE EXPRESS app installed to your device.',
    sw: 'App ya TANZANITE EXPRESS imesakinishwa kwenye kifaa chako.',
  },

  // Auth & Mandatory Password Modal
  'auth.welcomeBack': { en: 'Welcome Back', sw: 'Karibu Tena' },
  'auth.joinMarketplace': { en: 'Join TANZANITE EXPRESS', sw: 'Jiunge na TANZANITE EXPRESS' },
  'auth.accountTypeLabel': { en: 'Account Type', sw: 'Aina ya Akaunti' },
  'auth.customerOption': { en: 'Customer (Shopper)', sw: 'Mteja (Mnunuzi)' },
  'auth.supplierOption': { en: 'Supplier (Sell Free · TZS 0)', sw: 'Msambazaji (Uza Bure · TZS 0)' },
  'auth.emailPlaceholder': { en: 'you@example.com', sw: 'barua@mfano.com' },
  'auth.passwordMinPlaceholder': { en: 'At least 8 characters', sw: 'Angalau herufi 8' },
  'auth.signingIn': { en: 'Signing In...', sw: 'Inaingia...' },
  'auth.creatingAccount': { en: 'Creating Account...', sw: 'Inafungua Akaunti...' },
  'auth.sendingReset': { en: 'Sending Reset Link...', sw: 'Inatuma Kiungo...' },
  'auth.sendResetBtn': { en: 'Send Password Reset Email', sw: 'Tuma Barua ya Kuweka Upya Nenosiri' },
  'auth.backToSignIn': { en: 'Back to Sign In', sw: 'Rudi Kwenye Kuingia' },
  'auth.resetSentInfo': {
    en: 'Check your email inbox (and spam folder) for a Firebase password reset link.',
    sw: 'Angalia barua pepe yako (na folda ya Spam) kwa kiungo cha kuweka upya nenosiri.',
  },
  'auth.verificationNotice': {
    en: 'A verification link has been sent to your email. Please verify your address to unlock all account actions.',
    sw: 'Kiungo cha kuthibitisha barua pepe kimetumwa. Tafadhali thibitisha anwani yako kukamilisha usajili.',
  },
  'auth.resendVerificationBtn': { en: 'Resend Verification Email', sw: 'Tuma Tena Barua ya Uthibitisho' },
  'auth.passwordMismatch': { en: 'Passwords do not match.', sw: 'Manenosiri hayafanani.' },
  'auth.passwordTooShort': {
    en: 'Password must be at least 8 characters long.',
    sw: 'Nenosiri lazima liwe na angalau herufi 8.',
  },
  'auth.acceptTermsRequired': {
    en: 'Please accept the Terms & Conditions and Privacy Policy to continue.',
    sw: 'Tafadhali kubali Vigezo na Masharti pamoja na Sera ya Faragha ili kuendelea.',
  },
  'auth.mandatoryChangeTitle': {
    en: 'Security Action Required: Update Your Password',
    sw: 'Hatua ya Usalama Inahitajika: Badilisha Nenosiri Lako',
  },
  'auth.mandatoryChangeDesc': {
    en: 'Your administrator account uses a temporary bootstrap password. Please set a new private password now to continue.',
    sw: 'Akaunti yako ya msimamizi inatumia nenosiri la muda. Tafadhali weka nenosiri jipya sasa ili kuendelea.',
  },
  'auth.currentPasswordLabel': { en: 'Current Password', sw: 'Nenosiri la Sasa' },
  'auth.newPasswordLabel': { en: 'New Password (min 8 characters)', sw: 'Nenosiri Jipya (angalau herufi 8)' },
  'auth.confirmNewPasswordLabel': { en: 'Confirm New Password', sw: 'Thibitisha Nenosiri Jipya' },
  'auth.updatingPassword': { en: 'Updating Password...', sw: 'Inabadilisha Nenosiri...' },
  'auth.updatePasswordBtn': { en: 'Update Password & Continue', sw: 'Badilisha Nenosiri & Endelea' },
  'auth.authErrorTitle': { en: 'Authentication Notice', sw: 'Taarifa ya Kuingia' },

  // Storefront Extended
  'storefront.sortLabel': { en: 'Sort by', sw: 'Panga kwa' },
  'storefront.sortFeatured': { en: 'Featured', sw: 'Maalum' },
  'storefront.sortPriceAsc': { en: 'Price: Low to High', sw: 'Bei: Chini kwenda Juu' },
  'storefront.sortPriceDesc': { en: 'Price: High to Low', sw: 'Bei: Juu kwenda Chini' },
  'storefront.sortRating': { en: 'Highest Rated', sw: 'Ubora wa Juu' },
  'storefront.originAll': { en: 'All Origins', sw: 'Nchi Zote za Asili' },
  'storefront.originLabel': { en: 'Origin', sw: 'Asili' },
  'storefront.productsCount': {
    en: 'Showing {{count}} style(s)',
    sw: 'Inaonyesha bidhaa {{count}}',
  },
  'storefront.bySupplier': { en: 'by {{name}}', sw: 'kutoka {{name}}' },
  'storefront.wishlistAdd': { en: 'Save to Wishlist', sw: 'Hifadhi' },
  'storefront.wishlistRemove': { en: 'Remove from Wishlist', sw: 'Ondoa Kwenye Zilizohifadhiwa' },
  'storefront.quickView': { en: 'Quick View', sw: 'Tazama Kwa Haraka' },
  'storefront.newsletterSuccess': {
    en: 'Subscribed to TANZANITE EXPRESS seasonal edits.',
    sw: 'Umejiunga kikamilifu kupata taarifa za mitindo mipya.',
  },
  'storefront.newsletterInvalid': {
    en: 'Please enter a valid email address.',
    sw: 'Tafadhali weka barua pepe sahihi.',
  },
  'storefront.supplierOriginBadge': { en: 'Ships from {{country}}', sw: 'Inatoka {{country}}' },
  'storefront.viewAllFromSupplier': {
    en: 'Filtering by supplier: {{name}}',
    sw: 'Unatazama bidhaa za muuzaji: {{name}}',
  },
  'storefront.clearSupplierFilter': { en: 'Show All Suppliers', sw: 'Onyesha Wauzaji Wote' },
  'storefront.trendingLabel': { en: 'Trending in {{category}}', sw: 'Zinazovuma: {{category}}' },
  'storefront.becauseViewedLabel': {
    en: 'Because You Viewed {{title}}',
    sw: 'Kwa Sababu Ulitazama {{title}}',
  },

  // Product Detail Modal
  'product.brand': { en: 'Brand', sw: 'Chapa' },
  'product.category': { en: 'Category', sw: 'Aina' },
  'product.gender': { en: 'Collection', sw: 'Mkusanyiko' },
  'product.material': { en: 'Material', sw: 'Kitambaa / Nyenzo' },
  'product.weight': { en: 'Weight', sw: 'Uzito' },
  'product.origin': { en: 'Ships From', sw: 'Inapotoka' },
  'product.sku': { en: 'SKU', sw: 'Msimbo (SKU)' },
  'product.quantity': { en: 'Quantity', sw: 'Idadi' },
  'product.size': { en: 'Size', sw: 'Saizi' },
  'product.color': { en: 'Color', sw: 'Rangi' },
  'product.descriptionTitle': { en: 'Editorial Description', sw: 'Maelezo ya Bidhaa' },
  'product.shippingReturnsTitle': { en: 'Delivery & Returns', sw: 'Usafirishaji & Kurudisha' },
  'product.shippingNotes': { en: 'Shipping Notes', sw: 'Maelezo ya Usafirishaji' },
  'product.noReviewsProduct': {
    en: 'No customer reviews for this piece yet.',
    sw: 'Bado hakuna maoni kwa bidhaa hii.',
  },
  'product.reviewPlaceholder': {
    en: 'Share your thoughts on fit, fabric, and delivery...',
    sw: 'Andika maoni yako kuhusu ubora, saizi, na usafirishaji...',
  },
  'product.ratingLabel': { en: 'Rating', sw: 'Kiwango cha Ubora' },
  'product.signInToReview': {
    en: 'Sign in with a delivered order to post a verified review.',
    sw: 'Ingia na akaunti yenye oda iliyofika ili kuandika maoni yaliyothibitishwa.',
  },
  'product.variantUnavailable': {
    en: 'Please select an available variant.',
    sw: 'Tafadhali chagua saizi na rangi iliyopo.',
  },
  'product.verifiedPurchaseBadge': { en: 'Verified Buyer', sw: 'Mnunuzi Aliyethibitishwa' },

  // Cart & Checkout Extended
  'checkout.itemsInBag': { en: 'Items in Bag', sw: 'Bidhaa Kwenye Kikapu' },
  'checkout.couponCodeLabel': { en: 'Promo / Coupon Code', sw: 'Kodi ya Punguzo (Kuponi)' },
  'checkout.couponPlaceholder': { en: 'e.g. WELCOME10', sw: 'mf. WELCOME10' },
  'checkout.applyCoupon': { en: 'Apply', sw: 'Tumia' },
  'checkout.couponApplied': { en: 'Coupon applied!', sw: 'Kuponi imetumika!' },
  'checkout.couponInvalid': { en: 'Coupon invalid or minimum not met.', sw: 'Kuponi si sahihi au kiwango hakijatimia.' },
  'checkout.savedAddressesLabel': { en: 'Use Saved Address', sw: 'Tumia Anuani Iliyohifadhiwa' },
  'checkout.fullNamePlaceholder': { en: 'Recipient Full Name', sw: 'Jina Kamili la Mpokeaji' },
  'checkout.phonePlaceholder': { en: 'e.g. +255 7XX XXX XXX', sw: 'mf. +255 7XX XXX XXX' },
  'checkout.cityPlaceholder': { en: 'e.g. Dar es Salaam / Arusha / London', sw: 'mf. Dar es Salaam / Arusha / Mwanza' },
  'checkout.streetPlaceholder': { en: 'Street, house number, or delivery landmark', sw: 'Mtaa, namba ya nyumba, au alama maarufu' },
  'checkout.postalPlaceholder': { en: 'Postal / ZIP code (Optional)', sw: 'Msimbo wa Posta (Hiari)' },
  'checkout.taxEstimate': { en: 'Tax / VAT', sw: 'Kodi / VAT' },
  'checkout.orderCreatedSuccess': {
    en: 'Order {{orderId}} created! Follow the official payment instructions below to complete payment.',
    sw: 'Oda {{orderId}} imetengenezwa! Fuata maelekezo rasmi ya malipo hapa chini ili kukamilisha.',
  },
  'checkout.methodUnavailable': {
    en: 'Currently disabled by Admin',
    sw: 'Imesitishwa kwa sasa na Admin',
  },
  'checkout.copyNumber': { en: 'Copy Number', sw: 'Nakili Namba' },
  'checkout.copyAccount': { en: 'Copy Account', sw: 'Nakili Akaunti' },
  'checkout.branchLabel': { en: 'Branch', sw: 'Tawi' },
  'checkout.receiptSelected': { en: 'Selected file: {{name}}', sw: 'Faili lililochaguliwa: {{name}}' },
  'checkout.removeReceipt': { en: 'Remove file', sw: 'Ondoa faili' },
  'checkout.noActiveGateways': {
    en: 'No payment methods are currently enabled. Contact support.',
    sw: 'Hakuna njia ya malipo iliyowezeshwa kwa sasa. Wasiliana na huduma kwa wateja.',
  },
  'checkout.viewInDashboard': {
    en: 'View Order in My Dashboard',
    sw: 'Ona Oda Kwenye Dashibodi Yangu',
  },
  'checkout.missingRequiredFields': {
    en: 'Please fill in email, recipient name, phone, country, city, and street address.',
    sw: 'Tafadhali jaza barua pepe, jina la mpokeaji, simu, nchi, mji, na mtaa.',
  },
  'checkout.acceptCustomsFirst': {
    en: 'Please accept the international customs disclaimer for deliveries outside Tanzania.',
    sw: 'Tafadhali kubali maelezo ya ushuru wa forodha kwa usafirishaji wa nje ya Tanzania.',
  },
  'checkout.enterTxIdError': {
    en: 'Please enter a valid Transaction / Reference ID (at least 4 characters).',
    sw: 'Tafadhali weka Transaction / Reference ID sahihi (angalau herufi 4).',
  },
  'checkout.enterSenderNameError': {
    en: 'Please enter the full name of the sender who made the payment.',
    sw: 'Tafadhali weka jina kamili la aliyetuma malipo.',
  },
  'checkout.amountMismatchSelfHint': {
    en: 'Ensure the amount sent matches the order total displayed above.',
    sw: 'Hakikisha kiasi ulichotuma kinalingana na jumla ya oda iliyoonyeshwa hapo juu.',
  },

  // Support Assistant & Chatbot
  'chatbot.title': {
    en: 'Tanzanite AI Concierge',
    sw: 'Msaidizi Mahiri wa Tanzanite',
  },
  'chatbot.subtitle': {
    en: 'Live Storefront, Orders, Payments & Policies',
    sw: 'Bidhaa za Sasa, Oda, Malipo & Sera Zetu',
  },
  'chatbot.openTooltip': {
    en: 'Ask Tanzanite Assistant',
    sw: 'Uliza Msaidizi wa Tanzanite',
  },
  'chatbot.greeting': {
    en: 'Hello! I am the live TANZANITE EXPRESS Assistant. Ask me about in-stock products & exact prices, active promo codes, M-Pesa/NMB payment steps, delivery zones, free supplier onboarding, or your own orders.',
    sw: 'Habari! Mimi ni Msaidizi mahiri wa TANZANITE EXPRESS. Niulize kuhusu bidhaa zilizopo na bei halisi, kuponi za punguzo, namna ya kulipa M-Pesa/NMB, maeneo ya usafirishaji, usajili bure wa msambazaji, au hali ya oda zako.',
  },
  'chatbot.inputPlaceholder': {
    en: 'Ask anything in English or Kiswahili...',
    sw: 'Uliza chochote kwa Kiswahili au Kiingereza...',
  },
  'chatbot.sendBtn': { en: 'Send', sw: 'Tuma' },
  'chatbot.thinking': { en: 'Checking live catalog & store data...', sw: 'Ninakagua taarifa za sasa za duka...' },
  'chatbot.clearChat': { en: 'Clear chat', sw: 'Futa mazungumzo' },
  'chatbot.quickPrompt1': {
    en: 'What men & women items are in stock right now?',
    sw: 'Kuna bidhaa gani za wanaume na wanawake sokoni sasa?',
  },
  'chatbot.quickPrompt2': {
    en: 'How do I pay via M-Pesa or NMB Bank?',
    sw: 'Je, ninalipaje kwa M-Pesa au Benki ya NMB?',
  },
  'chatbot.quickPrompt3': {
    en: 'How much is shipping and delivery time?',
    sw: 'Gharama na muda wa usafirishaji ni kiasi gani?',
  },
  'chatbot.quickPrompt4': {
    en: 'How can a supplier register for free?',
    sw: 'Msambazaji anawezaje kujisajili bure kuuza?',
  },
  'chatbot.quickPrompt5': {
    en: 'Check my latest order status',
    sw: 'Angalia hali ya oda yangu ya hivi karibuni',
  },
  'chatbot.ticketFormTitle': {
    en: 'Create Human Support Ticket',
    sw: 'Fungua Tiketi Kwa Mhudumu Halisi',
  },
  'chatbot.ticketEmailLabel': { en: 'Your Email', sw: 'Barua Pepe Yako' },
  'chatbot.ticketSubjectLabel': { en: 'Subject', sw: 'Kichwa cha Ujumbe' },
  'chatbot.ticketCategoryLabel': { en: 'Topic', sw: 'Mada' },
  'chatbot.ticketSubmitBtn': { en: 'Send to Human Support', sw: 'Tuma Kwa Timu ya Msaada' },
  'chatbot.ticketCreated': {
    en: 'Support ticket created! Our team will respond shortly.',
    sw: 'Tiketi ya msaada imefunguliwa! Timu yetu itakujibu hivi punde.',
  },
  'chatbot.fallbackNote': {
    en: 'Grounded store answer',
    sw: 'Jibu kulingana na taarifa halisi za mfumo',
  },

  // Track Order & Legal & Support Pages
  'track.lookupPrompt': {
    en: 'Enter both your Order ID (e.g., ord_...) and the email used during checkout.',
    sw: 'Weka Namba ya Oda (mf. ord_...) pamoja na barua pepe uliyotumia kuagiza.',
  },
  'track.orderSummary': { en: 'Order Summary', sw: 'Muhtasari wa Oda' },
  'track.overallStatus': { en: 'Overall Status', sw: 'Hali ya Oda' },
  'track.paymentStatus': { en: 'Payment Status', sw: 'Hali ya Malipo' },
  'track.shipTo': { en: 'Delivery Destination', sw: 'Anwani ya Mpokeaji' },
  'track.suborderHeading': { en: 'Supplier Shipment #{{num}}', sw: 'Mzigo wa Msambazaji #{{num}}' },
  'track.carrier': { en: 'Carrier', sw: 'Kampuni ya Usafirishaji' },
  'track.trackingNo': { en: 'Tracking Number', sw: 'Namba ya Ufuatiliaji' },
  'track.timelineHeading': { en: 'Status Timeline', sw: 'Mfuatano wa Hatua' },
  'support.subjectPlaceholder': { en: 'Brief summary of your issue', sw: 'Muhtasari mfupi wa tatizo lako' },
  'support.messagePlaceholder': {
    en: 'Include Order ID, transaction reference, or item details...',
    sw: 'Andika Namba ya Oda, muamala, au maelezo kamili...',
  },
  'support.orderIdOptional': { en: 'Related Order ID (Optional)', sw: 'Namba ya Oda Husika (Hiari)' },
  'support.signInHint': {
    en: 'Please sign in first to submit a support ticket linked to your account.',
    sw: 'Tafadhali ingia kwenye akaunti yako kwanza ili kutuma ombi la msaada.',
  },
  'legal.returnTitle': { en: 'Return & Refund Policy', sw: 'Sera ya Kurudisha Bidhaa & Marejesho' },
  'legal.returnIntro': {
    en: 'We stand behind the quality of every item sourced from our verified Tanzanian and international suppliers.',
    sw: 'Tunathibitisha ubora wa kila bidhaa inayotoka kwa wasambazaji wetu waliothibitishwa Tanzania na nje ya nchi.',
  },
  'legal.returnBullets': {
    en: '• Return Window: Within 7 days (Tanzania) or 14 days (International) after confirmed delivery.\n• Condition: Items must be unworn, unwashed, undamaged, and have original tags attached.\n• Eligible Reasons: Wrong item, wrong size sent, damaged on arrival, or manufacturing defect.\n• Process: Open Customer Dashboard → Returns & Refunds, upload photo evidence, and submit. Admin reviews and coordinates refund.',
    sw: '• Muda wa Kurudisha: Ndani ya siku 7 (Tanzania) au siku 14 (Kimataifa) baada ya kupokea mzigo.\n• Hali ya Bidhaa: Iwe haijavaliwa, haijafuliwa, haijaharibiwa, na iwe na lebo zake za awali.\n• Sababu Zinazokubalika: Bidhaa tofauti, saizi tofauti na uliyoagiza, imeharibika njiani, au hitilafu ya kiwandani.\n• Utaratibu: Ingia Dashibodi ya Mteja → Kurudisha & Marejesho, pakia picha za ushahidi, kisha tuma. Admin atakagua na kushughulikia marejesho.',
  },
  'legal.shippingTitle': { en: 'Shipping, Delivery Zones & Customs', sw: 'Sera ya Usafirishaji, Maeneo & Forodha' },
  'legal.shippingIntro': {
    en: 'Delivery fees and estimated timelines are calculated transparently at checkout per supplier origin and destination zone.',
    sw: 'Gharama za usafirishaji na muda wa kufika huhesabiwa wazi wakati wa malipo kulingana na anapotoka muuzaji na unapopelekwa mzigo.',
  },
  'legal.shippingBullets': {
    en: '• Tanzania Local (Dar es Salaam, Arusha, Mwanza, Dodoma, Zanzibar): Typically 1–4 business days.\n• East Africa (Kenya, Uganda, Rwanda): Typically 3–7 business days.\n• International (UK, EU, USA, UAE): Typically 5–12 business days via DHL / Aramex / FedEx.\n• Customs Duties: International orders outside Tanzania may incur local import duties collected by the destination carrier.',
    sw: '• Ndani ya Tanzania (Dar es Salaam, Arusha, Mwanza, Dodoma, Zanzibar): Kwa kawaida siku 1–4 za kazi.\n• Afrika Mashariki (Kenya, Uganda, Rwanda): Kwa kawaida siku 3–7 za kazi.\n• Kimataifa (Uingereza, Ulaya, Marekani, UAE): Kwa kawaida siku 5–12 za kazi kupitia DHL / Aramex / FedEx.\n• Ushuru wa Forodha: Mizigo inayovuka mipaka nje ya Tanzania inaweza kuhusisha kodi au ushuru wa nchi husika kupitia kampuni ya usafirishaji.',
  },
  'legal.privacyTitle': { en: 'Privacy & Data Protection Policy', sw: 'Sera ya Faragha na Ulinzi wa Taarifa' },
  'legal.privacyBody': {
    en: 'TANZANITE EXPRESS collects only the information necessary to process orders, verify manual payments, deliver packages, and personalize recommendations if opted in. Private contact data (email, phone, addresses) and payment receipts are strictly isolated per owner and authorized administrators. You may export your data or request privacy erasure anytime from Profile & Preferences.',
    sw: 'TANZANITE EXPRESS hukusanya taarifa muhimu tu za kushughulikia oda, kuhakiki malipo, kufikisha mizigo, na kuboresha mapendekezo ikiwa umeruhusu. Taarifa binafsi (barua pepe, simu, anuani) na risiti za malipo zinalindwa kwa usiri mkubwa. Unaweza kupakua nakala ya taarifa zako au kuomba kufutwa kwa faragha muda wowote kupitia Wasifu & Mapendeleo.',
  },
  'legal.termsTitle': { en: 'Marketplace Terms & Conditions', sw: 'Vigezo na Masharti ya Soko' },
  'legal.termsBody': {
    en: '1. Manual Payment Verification: Submitting a Transaction Reference ID initiates Admin review and does not guarantee order release until incoming M-Pesa or NMB funds are verified.\n2. Free Supplier Onboarding: Independent fashion suppliers register free (TZS 0); Admin reviews quality, sets final customer retail pricing, and authorizes live publication.\n3. Multi-Vendor Fulfillment: Each supplier fulfills their own suborder under marketplace SLA deadlines.',
    sw: '1. Uhakiki wa Malipo ya Mwongozo: Kutuma namba ya muamala (Transaction ID) kunaanzisha ukaguzi wa Admin; mzigo hautumwi hadi pesa ithibitishwe imeingia M-Pesa au Benki ya NMB.\n2. Usajili Bure wa Wasambazaji: Wauzaji wanajisajili bure (TZS 0); Admin hukagua ubora, kuweka bei ya mwisho ya mteja, na kuruhusu bidhaa ionekane sokoni.\n3. Usafirishaji wa Wauzaji Mbalimbali: Kila msambazaji hutuma sehemu ya oda yake ndani ya muda uliowekwa wa huduma (SLA).',
  },

  // Errors & Upload Validation
  'errors.generic': {
    en: 'Something went wrong. Please try again.',
    sw: 'Kuna hitilafu imetokea. Tafadhali jaribu tena.',
  },
  'errors.network': {
    en: 'Network connection issue. Please verify your internet and retry.',
    sw: 'Tatizo la mtandao. Tafadhali hakiki muunganisho wako na ujaribu tena.',
  },
  'errors.boundaryTitle': {
    en: 'Something interrupted this view',
    sw: 'Kuna hitilafu imetokea kwenye ukurasa huu',
  },
  'errors.boundaryBody': {
    en: 'An unexpected interface error occurred. Your account and cart remain safe.',
    sw: 'Hitilafu isiyotarajiwa imetokea. Akaunti na kikapu chako viko salama.',
  },
  'errors.reloadBtn': { en: 'Reload Application', sw: 'Onyesha Upya Mfumo' },
  'errors.unsupportedImage': {
    en: 'Unsupported file "{{name}}". Choose a JPG, JPEG, PNG, or WEBP image.',
    sw: 'Faili "{{name}}" halikubaliwi. Chagua picha ya JPG, JPEG, PNG, au WEBP.',
  },
  'errors.imageTooLarge': {
    en: 'Image "{{name}}" exceeds the 12 MB upload limit.',
    sw: 'Picha "{{name}}" imezidi kikomo cha MB 12.',
  },
  'errors.recoverWorkspaceBtn': {
    en: 'Recover Workspace',
    sw: 'Rejesha Ukurasa',
  },
  'errors.dismissAria': {
    en: 'Dismiss notification',
    sw: 'Funga taarifa',
  },

  // Header & PWA Additions
  'nav.dismissAnnouncement': { en: 'Dismiss announcement', sw: 'Funga tangazo' },
  'nav.homeAria': { en: 'TANZANITE EXPRESS Home', sw: 'Nyumbani TANZANITE EXPRESS' },
  'nav.languageSwitcherAria': { en: 'Language switcher', sw: 'Badilisha lugha' },
  'nav.selectCurrencyAria': { en: 'Select currency', sw: 'Chagua sarafu' },
  'nav.openBagAria': { en: 'Open shopping bag', sw: 'Fungua kikapu' },
  'nav.openNotificationsAria': { en: 'Open notifications', sw: 'Fungua taarifa' },
  'nav.hideNotificationAria': { en: 'Hide notification', sw: 'Ficha taarifa' },
  'nav.openAccountAria': { en: 'Open account menu', sw: 'Fungua menyu ya akaunti' },
  'nav.toggleMobileMenuAria': { en: 'Toggle mobile menu', sw: 'Fungua/funga menyu' },
  'pwa.installIosBtn': { en: 'Install on iOS', sw: 'Sakinisha kwenye iOS' },
  'pwa.installModalTitle': { en: 'Install TANZANITE EXPRESS', sw: 'Sakinisha TANZANITE EXPRESS' },
  'pwa.iosStep1': {
    en: '1. Tap the Share icon in your Safari toolbar.',
    sw: '1. Bonyeza alama ya Share kwenye kivinjari cha Safari.',
  },
  'pwa.iosStep2': {
    en: '2. Scroll down and select Add to Home Screen.',
    sw: '2. Shuka chini kisha chagua "Add to Home Screen".',
  },

  // Auth Additions
  'auth.modalAria': {
    en: 'TANZANITE EXPRESS Authentication',
    sw: 'Kuingia na Usajili wa TANZANITE EXPRESS',
  },
  'auth.closeDialogAria': { en: 'Close sign in dialog', sw: 'Funga dirisha la kuingia' },
  'auth.showPasswordAria': { en: 'Show password', sw: 'Onyesha nenosiri' },
  'auth.hidePasswordAria': { en: 'Hide password', sw: 'Ficha nenosiri' },
  'auth.fullNameRequired': {
    en: 'Please enter your full name.',
    sw: 'Tafadhali weka jina lako kamili.',
  },
  'auth.resetPromptBody': {
    en: 'Enter the email address registered with TANZANITE EXPRESS and we will send a password reset link.',
    sw: 'Weka barua pepe iliyosajiliwa kwenye TANZANITE EXPRESS ili tukutumie kiungo cha kuweka upya nenosiri.',
  },
  'auth.resetSentTo': {
    en: 'Password reset instructions sent to {{email}}. Check your inbox.',
    sw: 'Maelekezo ya kuweka upya nenosiri yametumwa kwenda {{email}}. Kagua kikasha chako.',
  },
  'auth.sendResetShort': { en: 'Send Reset Link', sw: 'Tuma Kiungo' },
  'auth.readPolicies': { en: 'Read Policies', sw: 'Soma Sera' },
  'auth.namePlaceholder': { en: 'e.g. Amina Hassan', sw: 'mf. Amina Hassan' },
  'auth.phonePlaceholder': { en: '+255 7XX...', sw: '+255 7XX...' },
  'auth.confirmPlaceholder': { en: 'Confirm password', sw: 'Thibitisha nenosiri' },
  'auth.adminSecurityKicker': {
    en: 'Security Requirement · First Admin Login',
    sw: 'Hitaji la Usalama · Kuingia kwa Kwanza kwa Admin',
  },
  'auth.updateSuperAdminPassTitle': {
    en: 'Update Super Admin Password',
    sw: 'Badilisha Nenosiri la Super Admin',
  },
  'auth.adminBootstrapDesc': {
    en: 'You signed in with the initial bootstrap credentials ({{email}}). For security, please set a new private password before accessing marketplace controls.',
    sw: 'Umeingia kwa kutumia nenosiri la awali ({{email}}). Kwa usalama, tafadhali weka nenosiri jipya la siri kabla ya kutumia mfumo wa utawala.',
  },
  'auth.adminPassMin10': {
    en: 'New Super Admin password must be at least 10 characters.',
    sw: 'Nenosiri jipya la Super Admin lazima liwe na angalau herufi 10.',
  },
  'auth.adminPassSame': {
    en: 'New password must differ from the bootstrap password.',
    sw: 'Nenosiri jipya lazima liwe tofauti na nenosiri la awali.',
  },
  'auth.newPasswordMin10Label': {
    en: 'New Password (min 10 characters)',
    sw: 'Nenosiri Jipya (angalau herufi 10)',
  },
  'auth.saveNewPasswordBtn': { en: 'Save New Password', sw: 'Hifadhi Nenosiri Jipya' },

  // Notifications Additions
  'notifications.activityCenterKicker': {
    en: 'Real-Time Activity Center',
    sw: 'Kituo cha Taarifa za Moja kwa Moja',
  },
  'notifications.unreadCountLabel': {
    en: '{{count}} unread',
    sw: '{{count}} hazijasomwa',
  },
  'notifications.signInPrompt': {
    en: 'Sign in to view real-time order, payment verification, and fulfillment notifications.',
    sw: 'Ingia kwenye akaunti yako kuona taarifa za papo hapo za oda, uhakiki wa malipo, na usafirishaji.',
  },
  'notifications.muteLabel': { en: 'Mute {{label}}', sw: 'Zima {{label}}' },
  'notifications.unreadBadge': { en: 'Unread', sw: 'Haijasomwa' },
  'notifications.urgentPriority': { en: 'Urgent', sw: 'Dharura' },
  'notifications.highPriority': { en: 'High', sw: 'Kipaumbele' },
  'notifications.hideTooltip': {
    en: 'Hide notification from your personal view',
    sw: 'Ficha taarifa hii kwenye kikasha chako',
  },
  'notifications.openBtn': { en: 'Open', sw: 'Fungua' },
  'notifications.pageSummary': {
    en: 'Page {{page}} of {{total}} ({{count}} visible)',
    sw: 'Ukurasa {{page}} kati ya {{total}} (taarifa {{count}})',
  },
  'notifications.clearing': { en: 'Clearing...', sw: 'Inafuta...' },

  // Tracking & Support Additions
  'track.orderNotFound': { en: 'Order not found.', sw: 'Oda haijapatikana.' },
  'track.infoRequestedPrefix': {
    en: 'Additional Payment Info Requested: {{msg}}',
    sw: 'Maelezo Zaidi ya Malipo Yameombwa: {{msg}}',
  },
  'support.catOrder': { en: 'Order & Delivery Complaint', sw: 'Tatizo la Oda & Usafirishaji' },
  'support.catSupplier': { en: 'Supplier Dispute', sw: 'Mgogoro na Msambazaji' },
  'support.catPayment': { en: 'Payment / Transaction ID Issue', sw: 'Tatizo la Malipo / Muamala' },
  'support.catGeneral': { en: 'General Inquiry', sw: 'Swali la Jumla' },
  'support.priorityLow': { en: 'Low Priority', sw: 'Kipaumbele cha Chini' },
  'support.priorityMedium': { en: 'Medium Priority', sw: 'Kipaumbele cha Wastani' },
  'support.priorityHigh': { en: 'High Priority', sw: 'Kipaumbele cha Juu' },
  'support.priorityUrgent': { en: 'Urgent', sw: 'Dharura' },
  'support.subjectFieldPlaceholder': { en: 'Subject', sw: 'Kichwa cha Ombi' },
  'support.messageLengthError': {
    en: 'Please enter a valid support question (1–600 characters).',
    sw: 'Tafadhali andika swali au maelezo sahihi (herufi 1 hadi 600).',
  },
  'support.formFooterHint': { en: 'Dedicated Support Ticket Form', sw: 'Fomu Rasmi ya Msaada' },
  'support.ticketCreatedToast': {
    en: 'Support ticket created. Our team will respond shortly.',
    sw: 'Ombi la msaada limepokelewa. Timu yetu itakujibu hivi punde.',
  },
  'support.ticketFailed': {
    en: 'Could not create ticket.',
    sw: 'Imeshindikana kutuma ombi la msaada.',
  },

  // Batch B Storefront, Product Detail, Checkout & Chatbot Keys
  'storefront.heroImageAlt': {
    en: 'TANZANITE EXPRESS editorial fashion showcase',
    sw: 'Maonyesho ya mitindo ya TANZANITE EXPRESS',
  },
  'storefront.filterGenderLabel': { en: 'Gender', sw: 'Jinsia' },
  'storefront.filterAllGenders': { en: 'All Genders', sw: 'Jinsia Zote' },
  'storefront.filterOriginCountry': { en: 'Origin Country', sw: 'Nchi Inapotoka' },
  'storefront.filterAllCountries': { en: 'All Countries', sw: 'Nchi Zote' },
  'storefront.filterSupplierHouse': { en: 'Supplier House', sw: 'Duka la Msambazaji' },
  'storefront.filterAllSuppliers': {
    en: 'All Verified Suppliers',
    sw: 'Wasambazaji Wote Waliothibitishwa',
  },
  'storefront.filterSizeColor': { en: 'Size & Color', sw: 'Saizi & Rangi' },
  'storefront.filterMaxPrice': {
    en: 'Max Price ({{price}})',
    sw: 'Bei ya Juu ({{price}})',
  },
  'storefront.filterAnyRating': { en: 'Any Rating', sw: 'Kiwango Chochote' },
  'storefront.filterFourPlusStars': { en: '4+ Stars', sw: 'Nyota 4+' },
  'storefront.promoSubtitleFallback': {
    en: 'Every supplier on TANZANITE EXPRESS undergoes document verification. Multi-supplier baskets automatically split into supplier-specific suborders with individual courier tracking.',
    sw: 'Kila msambazaji kwenye TANZANITE EXPRESS hukaguliwa nyaraka zake kikamilifu. Vikapu vyenye bidhaa za wauzaji wengi hugawanywa kiotomatiki ili kila msafirishaji atume mzigo wake na namba ya ufuatiliaji.',
  },
  'storefront.dispatchLocalTitle': {
    en: 'Tanzania Domestic Dispatch (TZS) · M-Pesa & NMB Bank',
    sw: 'Usafirishaji wa Ndani Tanzania (TZS) · M-Pesa & Benki ya NMB',
  },
  'storefront.dispatchLocalDesc': {
    en: 'Local Dar es Salaam & regional courier delivery within 1–3 business days after Admin verifies payment.',
    sw: 'Usafirishaji Dar es Salaam na mikoani ndani ya siku 1–3 za kazi baada ya Admin kuhakiki malipo.',
  },
  'storefront.dispatchIntlTitle': {
    en: 'International Direct Sourcing (USD / GBP / EUR)',
    sw: 'Bidhaa za Moja kwa Moja Kutoka Nje (USD / GBP / EUR)',
  },
  'storefront.dispatchIntlDesc': {
    en: 'Vetted houses in Italy, UK, USA & Asia with upfront customs & import duty transparency.',
    sw: 'Bidhaa kutoka maduka yaliyohakikiwa Italia, Uingereza, Marekani & Asia zikiwa na uwazi wa ushuru wa forodha.',
  },
  'storefront.customerRoleLabel': { en: 'Customer', sw: 'Mteja' },
  'storefront.footerDesc': {
    en: 'Curated multi-vendor fashion marketplace bridging Tanzanian designers and verified global suppliers with transparent commission and direct fulfillment.',
    sw: 'Soko la mitindo la wauzaji wengi linalounganisha wabunifu wa Tanzania na wasambazaji wa kimataifa waliothibitishwa kwa uwazi na usafirishaji wa moja kwa moja.',
  },
  'storefront.mensFashionLink': { en: 'Men’s Fashion', sw: 'Mitindo ya Wanaume' },
  'storefront.womensFashionLink': { en: 'Women’s Fashion', sw: 'Mitindo ya Wanawake' },
  'storefront.trackSubordersLink': { en: 'Track Suborders', sw: 'Fuatilia Mizigo' },
  'storefront.policiesHelpHeading': { en: 'Policies & Help', sw: 'Sera & Msaada' },
  'storefront.footerPrivacyTerms': {
    en: 'Privacy Policy & Terms',
    sw: 'Sera ya Faragha & Masharti',
  },
  'storefront.footerContactFaq': {
    en: 'Contact Support & FAQ',
    sw: 'Wasiliana na Msaada & Maswali',
  },
  'storefront.footerCopyright': {
    en: '© {{year}} TANZANITE EXPRESS. Dar es Salaam & Global.',
    sw: '© {{year}} TANZANITE EXPRESS. Dar es Salaam & Duniani Kote.',
  },
  'storefront.multiCurrencyNotice': {
    en: 'Multi-Currency Checkout: TZS · USD · GBP · EUR · KES',
    sw: 'Malipo kwa Sarafu Nyingi: TZS · USD · GBP · EUR · KES',
  },
  'storefront.viewProductAria': { en: 'View {{title}}', sw: 'Tazama {{title}}' },
  'storefront.photosCount': { en: '{{count}} photos', sw: 'Picha {{count}}' },

  'product.closeAria': { en: 'Close product detail', sw: 'Funga maelezo ya bidhaa' },
  'product.enlargeAria': { en: 'Enlarge product image', sw: 'Kuza picha ya bidhaa' },
  'product.prevImageAria': { en: 'Previous image', sw: 'Picha iliyopita' },
  'product.nextImageAria': { en: 'Next image', sw: 'Picha inayofuata' },
  'product.closeZoomAria': { en: 'Close zoom viewer', sw: 'Funga picha iliyokuzwa' },
  'product.decreaseQtyAria': { en: 'Decrease quantity', sw: 'Punguza idadi' },
  'product.increaseQtyAria': { en: 'Increase quantity', sw: 'Ongeza idadi' },
  'product.zoomImageCount': {
    en: 'Image {{current}} of {{total}} · {{title}}',
    sw: 'Picha {{current}} kati ya {{total}} · {{title}}',
  },
  'product.outOfStockQtyError': {
    en: 'Selected size/color is out of stock for that quantity.',
    sw: 'Saizi au rangi uliyochagua haina idadi hiyo stoo.',
  },
  'product.reviewPublishedToast': {
    en: 'Review published.',
    sw: 'Maoni yako yamechapishwa.',
  },

  'checkout.closeBagAria': { en: 'Close bag drawer', sw: 'Funga kikapu' },
  'checkout.removeItemAria': { en: 'Remove item', sw: 'Ondoa bidhaa' },
  'checkout.decreaseQtyAria': { en: 'Decrease item quantity', sw: 'Punguza idadi' },
  'checkout.increaseQtyAria': { en: 'Increase item quantity', sw: 'Ongeza idadi' },
  'checkout.chooseReceiptBtn': {
    en: 'Choose PNG / JPG / WEBP',
    sw: 'Chagua Picha (PNG / JPG / WEBP)',
  },
  'checkout.couponAppliedAmount': {
    en: 'Coupon applied ({{amount}} off).',
    sw: 'Kuponi imetumika (punguzo la {{amount}}).',
  },
  'checkout.enterEmailError': {
    en: 'Please enter your email address for order receipts and tracking.',
    sw: 'Tafadhali weka barua pepe yako kwa ajili ya risiti na ufuatiliaji wa oda.',
  },
  'checkout.enterAmountError': {
    en: 'Please enter the exact amount you sent.',
    sw: 'Tafadhali weka kiasi halisi ulichotuma.',
  },
  'checkout.orderHeaderLabel': {
    en: 'Order {{orderId}} — {{status}}',
    sw: 'Oda {{orderId}} — {{status}}',
  },
  'checkout.refLabel': { en: 'Ref', sw: 'Kumbukumbu' },
  'checkout.pendingVerificationRef': {
    en: 'Status: {{status}} · Ref: {{ref}}',
    sw: 'Hali: {{status}} · Kumbukumbu: {{ref}}',
  },
  'checkout.txPlaceholder': {
    en: 'e.g., BGT89X21K9 or NMB-984122',
    sw: 'mf. BGT89X21K9 au NMB-984122',
  },
  'checkout.senderPlaceholder': { en: 'Sender full name', sw: 'Jina kamili la mtumaji' },
  'checkout.receiptPreviewAlt': { en: 'Receipt preview', sw: 'Mwonekano wa risiti' },

  'chatbot.unavailableMsg': {
    en: 'Sorry, the AI assistant service is currently unavailable. Please try again shortly.',
    sw: 'Samahani, huduma ya msaidizi wa AI haipatikani kwa sasa. Tafadhali jaribu tena baada ya muda mfupi.',
  },
  'chatbot.retryBtn': { en: 'Retry', sw: 'Jaribu tena' },
  'chatbot.closeAssistantAria': { en: 'Close support assistant', sw: 'Funga msaidizi' },
  'chatbot.sendAria': { en: 'Send support message', sw: 'Tuma ujumbe' },
  'chatbot.supportDeskLink': { en: 'Support Desk & Policies', sw: 'Kituo cha Msaada & Sera' },
  'chatbot.ticketEmailRequired': {
    en: 'Please enter your email so support can reply.',
    sw: 'Tafadhali weka barua pepe yako ili tukujibu.',
  },
  'chatbot.escalationFailed': {
    en: 'Unable to submit support ticket.',
    sw: 'Imeshindikana kutuma ombi la msaada.',
  },
  'chatbot.defaultEscalateSubject': {
    en: 'Customer Assistance Request',
    sw: 'Ombi la Msaada wa Mteja',
  },
};
