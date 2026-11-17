import React, { useState } from 'react';
import { PackageSearch, Send } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { apiFetch } from '../lib/api';
import {
  formatLocalizedDateTime,
  translateCountry,
  translateOrderStatus,
  translatePaymentStatus,
} from '../lib/i18n';

export const TrackOrderPage: React.FC = () => {
  const { formatMoney, language, t, toast } = useMarketplace();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiFetch(
        `/api/orders/track/${encodeURIComponent(orderId.trim())}?email=${encodeURIComponent(
          email.trim()
        )}`
      );
      setResult(data);
    } catch (err: any) {
      setResult(null);
      toast(err.message || t('track.orderNotFound'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white border border-[#E2E5F0] p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-xs text-[#5B3CC4] uppercase tracking-wider font-semibold">
          <PackageSearch className="w-4 h-4" />
          <span>{t('trackSubtitle')}</span>
        </div>
        <h1 className="font-editorial text-3xl font-semibold text-[#111322]">
          {t('trackOrderTitle')}
        </h1>
        <p className="text-xs text-neutral-600">{t('track.lookupPrompt')}</p>
        <form onSubmit={handleTrack} className="grid sm:grid-cols-3 gap-3 text-xs">
          <input
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder={t('orderIdPlaceholder')}
            className="border border-[#E2E5F0] px-3 py-2.5 font-mono-tabular"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('checkoutEmailPlaceholder')}
            className="border border-[#E2E5F0] px-3 py-2.5"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2B3A9F] hover:bg-[#5B3CC4] text-white px-4 py-2.5 font-semibold uppercase tracking-wide cursor-pointer"
          >
            {loading ? t('searching') : t('trackButton')}
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-white border border-[#E2E5F0] p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap justify-between gap-2 pb-3 border-b border-[#E2E5F0] text-xs">
            <div className="min-w-0">
              <p className="font-mono-tabular font-semibold break-all">{result.order.id}</p>
              <p className="text-neutral-500">
                {result.order.shippingCity},{' '}
                {translateCountry(result.order.shippingCountry, language)}
              </p>
              {result.order.submittedTransactionId && (
                <p className="font-mono-tabular text-[#5B3CC4] mt-0.5 break-all">
                  {t('submittedTxIdLabel')}: {result.order.submittedTransactionId} (
                  {String(result.order.paymentProvider || '').toUpperCase()})
                </p>
              )}
            </div>
            <div className="sm:text-right">
              <p className="font-semibold">
                {translateOrderStatus(result.order.overallStatus, language)} ·{' '}
                {translatePaymentStatus(result.order.paymentStatus, language)}
              </p>
              <p className="tabular-nums text-neutral-600">
                {t('total')}: {formatMoney(result.order.totalUsd)}
              </p>
            </div>
          </div>

          {result.order.paymentRejectionReason && (
            <div className="bg-red-50 border border-red-200 p-3 text-xs text-red-900">
              {result.order.paymentRejectionReason}
            </div>
          )}
          {result.order.paymentInfoRequestMessage && (
            <div className="bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
              {t('track.infoRequestedPrefix', {
                msg: result.order.paymentInfoRequestMessage,
              })}
            </div>
          )}

          <div className="space-y-3">
            {result.suborders.map((sub: any) => (
              <div key={sub.id} className="border border-[#E2E5F0] bg-[#F8F9FC] p-4 text-xs space-y-2">
                <div className="flex flex-wrap justify-between gap-2 font-semibold">
                  <span>
                    {sub.supplierName} ({translateCountry(sub.supplierCountry, language)})
                  </span>
                  <span className="text-[#2B3A9F]">
                    {translateOrderStatus(sub.status, language)}
                  </span>
                </div>
                {sub.trackingNumber && (
                  <p className="font-mono-tabular text-emerald-800">
                    {sub.carrierName}: {sub.trackingNumber}
                  </p>
                )}
                <div className="text-[11px] text-neutral-500 space-y-1 pt-1">
                  {sub.statusHistory.map((h: any, idx: number) => (
                    <div key={idx}>
                      {formatLocalizedDateTime(h.timestamp, language)} —{' '}
                      {translateOrderStatus(h.status, language)} ({h.note})
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const SupportAndLegalPage: React.FC = () => {
  const { userAccount, t, toast } = useMarketplace();
  const [policyTab, setPolicyTab] = useState<'contact' | 'returns' | 'shipping' | 'privacy' | 'terms' | 'faq'>('contact');
  const [form, setForm] = useState({
    email: userAccount?.email || '',
    category: 'order' as 'order' | 'supplier' | 'payment' | 'general',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    orderId: '',
    subject: '',
    message: '',
  });

  const [ticketError, setTicketError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketError('');
    const msg = form.message.trim();
    if (msg.length < 1 || msg.length > 600) {
      setTicketError(t('support.messageLengthError'));
      return;
    }
    try {
      await apiFetch('/api/support/tickets', {
        method: 'POST',
        body: JSON.stringify({ ...form, message: msg }),
      });
      setForm({ ...form, subject: '', message: '', orderId: '' });
      toast(t('support.ticketCreatedToast'), 'success');
    } catch (err: any) {
      const m = err.message || t('support.ticketFailed');
      setTicketError(m);
      toast(m, 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3.5 sm:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
      <div className="flex flex-wrap gap-2 border-b border-[#E2E5F0] pb-4">
        {[
          { id: 'contact', label: t('contactSupportTab') },
          { id: 'returns', label: t('returnPolicyTab') },
          { id: 'shipping', label: t('shippingPolicyTab') },
          { id: 'faq', label: t('faqTab') },
          { id: 'privacy', label: t('privacyPolicyTab') },
          { id: 'terms', label: t('termsTab') },
        ].map((tabItem) => (
          <button
            key={tabItem.id}
            type="button"
            onClick={() => setPolicyTab(tabItem.id as any)}
            className={`px-3.5 sm:px-4 min-h-[40px] py-2 text-xs font-medium border cursor-pointer ${
              policyTab === tabItem.id
                ? 'bg-[#2B3A9F] text-white border-[#2B3A9F]'
                : 'bg-white text-neutral-700 border-[#E2E5F0] hover:border-[#2B3A9F]'
            }`}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      {policyTab === 'contact' && (
        <div className="bg-white border border-[#E2E5F0] p-4 sm:p-8 space-y-5">
          <h1 className="font-editorial text-3xl font-semibold text-[#111322]">{t('supportDeskTitle')}</h1>
          <p className="text-xs text-neutral-600">{t('supportDeskSub')}</p>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 text-xs">
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t('chatbot.ticketEmailLabel')}
              className="border border-[#E2E5F0] px-3 py-2.5"
            />
            <input
              value={form.orderId}
              onChange={(e) => setForm({ ...form, orderId: e.target.value })}
              placeholder={t('support.orderIdOptional')}
              className="border border-[#E2E5F0] px-3 py-2.5 font-mono-tabular"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as any })}
              className="border border-[#E2E5F0] px-3 py-2.5 bg-white"
            >
              <option value="order">{t('support.catOrder')}</option>
              <option value="supplier">{t('support.catSupplier')}</option>
              <option value="payment">{t('support.catPayment')}</option>
              <option value="general">{t('support.catGeneral')}</option>
            </select>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
              className="border border-[#E2E5F0] px-3 py-2.5 bg-white"
            >
              <option value="low">{t('support.priorityLow')}</option>
              <option value="medium">{t('support.priorityMedium')}</option>
              <option value="high">{t('support.priorityHigh')}</option>
              <option value="urgent">{t('support.priorityUrgent')}</option>
            </select>
            <input
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder={t('support.subjectFieldPlaceholder')}
              className="border border-[#E2E5F0] px-3 py-2.5 sm:col-span-2"
            />
            <div className="sm:col-span-2 space-y-1">
              <textarea
                required
                rows={4}
                maxLength={600}
                value={form.message}
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });
                  if (ticketError) setTicketError('');
                }}
                placeholder={t('support.messagePlaceholder')}
                className="w-full border border-[#E2E5F0] p-3"
              />
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>
                  {ticketError ? (
                    <span className="text-red-700 font-medium">{ticketError}</span>
                  ) : (
                    t('support.formFooterHint')
                  )}
                </span>
                <span className="font-mono-tabular">{form.message.length}/600</span>
              </div>
            </div>
            <button
              type="submit"
              className="sm:col-span-2 inline-flex items-center justify-center gap-2 bg-[#2B3A9F] hover:bg-[#5B3CC4] text-white py-3 font-semibold uppercase tracking-wide cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> {t('submitTicket')}
            </button>
          </form>
        </div>
      )}

      {policyTab === 'returns' && (
        <div className="bg-white border border-[#E2E5F0] p-5 sm:p-8 space-y-4 text-sm text-neutral-700 leading-relaxed">
          <h2 className="font-editorial text-3xl font-semibold text-[#111322]">
            {t('legal.returnTitle')}
          </h2>
          <p>{t('legal.returnIntro')}</p>
          <div className="space-y-2">
            {t('legal.returnBullets')
              .split('\n')
              .map((line, i) => (
                <p key={i}>{line}</p>
              ))}
          </div>
        </div>
      )}

      {policyTab === 'shipping' && (
        <div className="bg-white border border-[#E2E5F0] p-5 sm:p-8 space-y-4 text-sm text-neutral-700 leading-relaxed">
          <h2 className="font-editorial text-3xl font-semibold text-[#111322]">
            {t('legal.shippingTitle')}
          </h2>
          <p>{t('legal.shippingIntro')}</p>
          <div className="space-y-2">
            {t('legal.shippingBullets')
              .split('\n')
              .map((line, i) => (
                <p key={i}>{line}</p>
              ))}
          </div>
        </div>
      )}

      {policyTab === 'faq' && (
        <div className="bg-white border border-[#E2E5F0] p-5 sm:p-8 space-y-4 text-sm text-neutral-700">
          <h2 className="font-editorial text-3xl font-semibold text-[#111322]">{t('faqTitle')}</h2>
          <div>
            <p className="font-semibold text-[#111322]">{t('faqSplitQ')}</p>
            <p className="mt-1">{t('faqSplitA')}</p>
          </div>
          <div>
            <p className="font-semibold text-[#111322]">{t('faqPayQ')}</p>
            <p className="mt-1">{t('faqPayA')}</p>
          </div>
        </div>
      )}

      {policyTab === 'privacy' && (
        <div className="bg-white border border-[#E2E5F0] p-5 sm:p-8 space-y-4 text-sm text-neutral-700 leading-relaxed">
          <h2 className="font-editorial text-3xl font-semibold text-[#111322]">
            {t('legal.privacyTitle')}
          </h2>
          <p>{t('legal.privacyBody')}</p>
        </div>
      )}

      {policyTab === 'terms' && (
        <div className="bg-white border border-[#E2E5F0] p-5 sm:p-8 space-y-4 text-sm text-neutral-700 leading-relaxed">
          <h2 className="font-editorial text-3xl font-semibold text-[#111322]">
            {t('legal.termsTitle')}
          </h2>
          <div className="space-y-2">
            {t('legal.termsBody')
              .split('\n')
              .map((line, i) => (
                <p key={i}>{line}</p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
