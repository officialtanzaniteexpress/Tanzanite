import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatLocalizedDateTime, translateNotificationType } from '../lib/i18n';
import { NotificationType } from '../types/marketplace';

const NOTIFICATION_TYPE_IDS: ('all' | NotificationType)[] = [
  'all',
  'payment',
  'order',
  'fulfillment',
  'return',
  'supplier',
  'product',
  'security',
  'system',
];

const PAGE_SIZE = 15;

export const NotificationsPage: React.FC = () => {
  const {
    firebaseUser,
    openAuthModal,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    hideNotification,
    clearVisibleNotifications,
    navigateFromNotification,
    notificationPreferences,
    updateNotificationPreferences,
    language,
    t,
  } = useMarketplace();

  const [typeFilter, setTypeFilter] = useState<'all' | NotificationType>('all');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [page, setPage] = useState(1);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [clearing, setClearing] = useState(false);

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      if (n.hiddenByRecipient) return false;
      if (typeFilter !== 'all' && n.type !== typeFilter) return false;
      if (unreadOnly && n.read) return false;
      return true;
    });
  }, [notifications, typeFilter, unreadOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const getCategoryLabel = (id: 'all' | NotificationType) =>
    id === 'all' ? t('common.all') : translateNotificationType(id, language);

  if (!firebaseUser) {
    return (
      <div className="max-w-xl mx-auto my-16 bg-white border border-[#E2E5F0] p-8 text-center">
        <Bell className="w-8 h-8 text-[#5B3CC4] mx-auto mb-3" />
        <h2 className="font-editorial text-3xl font-semibold text-[#111322]">
          {t('notifications')}
        </h2>
        <p className="text-sm text-neutral-600 mt-3">
          {t('notifications.signInPrompt')}
        </p>
        <button
          type="button"
          onClick={() => openAuthModal('signin')}
          className="mt-6 bg-[#2B3A9F] hover:bg-[#5B3CC4] text-white px-6 py-3 text-xs font-semibold uppercase tracking-wide cursor-pointer"
        >
          {t('signIn')}
        </button>
      </div>
    );
  }

  const muted = notificationPreferences?.mutedTypes || [];

  const toggleMutedType = async (typeId: NotificationType) => {
    const nextMuted = muted.includes(typeId)
      ? muted.filter((tItem) => tItem !== typeId)
      : [...muted, typeId];
    await updateNotificationPreferences({ mutedTypes: nextMuted });
  };

  const handleConfirmClear = async () => {
    setClearing(true);
    try {
      await clearVisibleNotifications(typeFilter !== 'all' ? typeFilter : undefined);
      setConfirmClearOpen(false);
      setPage(1);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3.5 sm:px-8 py-6 sm:py-10 space-y-6">
      <div className="bg-white border border-[#E2E5F0] p-4 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.14em] text-[#5B3CC4] font-semibold">
            {t('notifications.activityCenterKicker')}
          </p>
          <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#111322] mt-1">
            {t('notifications')} ({t('notifications.unreadCountLabel', { count: unreadNotificationCount })})
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPrefs((p) => !p)}
            className="inline-flex items-center gap-1.5 border border-[#E2E5F0] bg-white hover:border-[#2B3A9F] px-3.5 py-2 text-xs font-medium cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {t('notificationPreferences')}
          </button>
          <button
            type="button"
            onClick={markAllNotificationsRead}
            disabled={unreadNotificationCount === 0}
            className="inline-flex items-center gap-1.5 bg-[#2B3A9F] hover:bg-[#5B3CC4] text-white px-4 py-2 text-xs font-medium disabled:opacity-40 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            {t('markAllRead')}
          </button>
          <button
            type="button"
            onClick={() => setConfirmClearOpen(true)}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-1.5 border border-red-200 bg-white hover:bg-red-50 text-red-700 px-3.5 py-2 text-xs font-medium disabled:opacity-40 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {t('clearVisibleNotifications')}
          </button>
        </div>
      </div>

      {showPrefs && notificationPreferences && (
        <div className="bg-white border border-[#E2E5F0] p-6 space-y-4 text-xs">
          <h2 className="font-editorial text-xl font-semibold text-[#111322]">
            {t('notificationPreferences')}
          </h2>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notificationPreferences.inAppEnabled}
                onChange={(e) =>
                  updateNotificationPreferences({ inAppEnabled: e.target.checked })
                }
                className="accent-[#2B3A9F]"
              />
              {t('notifications.inAppToggle')}
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notificationPreferences.emailEnabled}
                onChange={(e) =>
                  updateNotificationPreferences({ emailEnabled: e.target.checked })
                }
                className="accent-[#2B3A9F]"
              />
              {t('notifications.emailToggle')}
            </label>
          </div>
          <div className="border-t border-[#E2E5F0] pt-4">
            <p className="text-neutral-600 mb-2 font-medium">
              {t('notifications.mutedCategories')}:
            </p>
            <div className="flex flex-wrap gap-4">
              {NOTIFICATION_TYPE_IDS.filter((x) => x !== 'all').map((catId) => (
                <label key={catId} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={muted.includes(catId as NotificationType)}
                    onChange={() => toggleMutedType(catId as NotificationType)}
                    className="accent-[#2B3A9F]"
                  />
                  <span>{t('notifications.muteLabel', { label: getCategoryLabel(catId) })}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Filter Bar */}
      <div className="bg-white border border-[#E2E5F0] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {NOTIFICATION_TYPE_IDS.map((catId) => (
            <button
              key={catId}
              type="button"
              onClick={() => {
                setTypeFilter(catId);
                setPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                typeFilter === catId
                  ? 'bg-[#2B3A9F] text-white border-[#2B3A9F]'
                  : 'bg-[#F8F9FC] text-neutral-700 border-[#E2E5F0] hover:border-[#2B3A9F]'
              }`}
            >
              {getCategoryLabel(catId)}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={(e) => {
              setUnreadOnly(e.target.checked);
              setPage(1);
            }}
            className="accent-[#2B3A9F]"
          />
          <span>{t('unreadOnly')}</span>
        </label>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {paginated.length === 0 ? (
          <div className="bg-white border border-[#E2E5F0] p-10 text-center text-xs text-neutral-500">
            {t('noNotificationsYet')}
          </div>
        ) : (
          paginated.map((n) => (
            <div
              key={n.id}
              className={`border p-4 sm:p-5 flex flex-wrap items-start justify-between gap-3 sm:gap-4 transition-colors ${
                n.read
                  ? 'bg-white border-[#E2E5F0]'
                  : 'bg-[#EEF2FF]/50 border-[#2B3A9F]'
              }`}
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
                  <span className="font-semibold uppercase tracking-wide text-[#5B3CC4]">
                    {translateNotificationType(n.type, language)}
                  </span>
                  {(n.priority === 'urgent' || n.priority === 'high') && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-semibold uppercase border ${
                        n.priority === 'urgent'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {n.priority === 'urgent'
                        ? t('notifications.urgentPriority')
                        : t('notifications.highPriority')}
                    </span>
                  )}
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">
                    {formatLocalizedDateTime(n.createdAt, language)}
                  </span>
                  {!n.read && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-[#2B3A9F]">
                        {t('notifications.unreadBadge')}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-[#111322]">{n.title}</h3>
                <p className="text-xs text-neutral-700 leading-relaxed">{n.message}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {!n.read && (
                  <button
                    type="button"
                    onClick={() => markNotificationRead(n.id)}
                    className="inline-flex items-center gap-1 border border-[#E2E5F0] bg-white hover:border-[#2B3A9F] px-3 py-1.5 text-xs font-medium cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {t('markRead')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => hideNotification(n.id)}
                  title={t('notifications.hideTooltip')}
                  className="inline-flex items-center gap-1 border border-[#E2E5F0] bg-white hover:border-red-300 hover:text-red-700 px-2.5 py-1.5 text-xs font-medium cursor-pointer"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  {t('hideNotification')}
                </button>
                <button
                  type="button"
                  onClick={() => navigateFromNotification(n)}
                  className="inline-flex items-center gap-1 bg-[#2B3A9F] text-white hover:bg-[#5B3CC4] px-3.5 py-1.5 text-xs font-medium cursor-pointer"
                >
                  {n.actionLabel || t('notifications.openBtn')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-[#E2E5F0] px-4 py-3 text-xs">
          <span className="text-neutral-600 font-mono-tabular">
            {t('notifications.pageSummary', {
              page: safePage,
              total: totalPages,
              count: filtered.length,
            })}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 border border-[#E2E5F0] px-3 py-1.5 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> {t('common.previous')}
            </button>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 border border-[#E2E5F0] px-3 py-1.5 disabled:opacity-40 cursor-pointer"
            >
              {t('common.next')} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E5F0] p-6 w-full max-w-md space-y-4">
            <h3 className="font-editorial text-2xl font-semibold text-[#111322]">
              {t('clearVisibleConfirmTitle')}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('clearVisibleConfirmBody')}
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={clearing}
                onClick={() => setConfirmClearOpen(false)}
                className="border border-[#E2E5F0] px-4 py-2 text-xs cursor-pointer"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                disabled={clearing}
                onClick={handleConfirmClear}
                className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 text-xs font-semibold cursor-pointer disabled:opacity-50"
              >
                {clearing ? t('notifications.clearing') : t('clearVisibleNotifications')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
