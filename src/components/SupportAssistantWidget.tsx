import React, { useEffect, useRef, useState } from 'react';
import { LifeBuoy, MessageCircle, RotateCcw, Send, Trash2, X } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { apiFetch } from '../lib/api';
import { auth } from '../lib/firebase';
import { getBcp47Locale } from '../lib/i18n';
import { LanguageCode } from '../types/marketplace';
import { TanzaniteGemIcon } from './TanzaniteBrand';

interface ChatTurn {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestEscalation?: boolean;
  isError?: boolean;
  failedQuestion?: string;
  aiPowered?: boolean;
}

function formatTime(iso: string, lang: LanguageCode): string {
  try {
    return new Date(iso).toLocaleTimeString(getBcp47Locale(lang), {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export const SupportAssistantWidget: React.FC = () => {
  const { language, t, userAccount, setActivePage, toast } = useMarketplace();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [sending, setSending] = useState(false);
  const [showEscalateForm, setShowEscalateForm] = useState(false);
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketBusy, setTicketBusy] = useState(false);
  const [ticketError, setTicketError] = useState('');

  const createWelcomeTurn = (): ChatTurn => ({
    id: `welcome_${Date.now()}`,
    role: 'assistant',
    timestamp: new Date().toISOString(),
    text: t('chatbot.greeting'),
  });

  const [messages, setMessages] = useState<ChatTurn[]>(() => [
    {
      id: `welcome_${Date.now()}`,
      role: 'assistant',
      timestamp: new Date().toISOString(),
      text: t('chatbot.greeting'),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Sync welcome greeting when user toggles EN/SW before starting a conversation
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id.startsWith('welcome_')) {
        return [createWelcomeTurn()];
      }
      return prev;
    });
  }, [language]);

  // Auto-scroll to latest message / typing indicator when open
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages, sending, showEscalateForm]);

  const quickPrompts = [
    t('chatbot.quickPrompt1'),
    t('chatbot.quickPrompt2'),
    t('chatbot.quickPrompt3'),
    t('chatbot.quickPrompt4'),
    t('chatbot.quickPrompt5'),
  ];

  const handleClearChat = () => {
    if (sending) return;
    setMessages([createWelcomeTurn()]);
    setShowEscalateForm(false);
  };

  const sendQuestion = async (textToSend: string, options?: { skipUserBubble?: boolean }) => {
    const trimmed = textToSend.trim();
    if (!trimmed || sending) return;

    const now = new Date().toISOString();
    const userTurn: ChatTurn = {
      id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      role: 'user',
      text: trimmed,
      timestamp: now,
    };

    const priorHistory = messages
      .filter((m) => !m.isError && !m.id.startsWith('welcome_'))
      .slice(-10)
      .map((m) => ({ role: m.role, text: m.text.slice(0, 2400) }));

    if (!options?.skipUserBubble) {
      setMessages((prev) => [...prev, userTurn]);
      setQuestion('');
    } else {
      setMessages((prev) => prev.filter((m) => !m.isError));
    }

    setSending(true);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (auth.currentUser) {
        try {
          const token = await auth.currentUser.getIdToken();
          headers.Authorization = `Bearer ${token}`;
        } catch {
          // Guest fallback if token refresh fails
        }
      }

      const controller = new AbortController();
      const timeoutTimer = setTimeout(() => controller.abort(), 25000);
      let res: Response;
      try {
        res = await fetch('/api/support/assistant', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            question: trimmed,
            history: priorHistory,
            language,
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutTimer);
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.unavailable || !data.reply) {
        const isServiceUnavailable = res.status === 503 || Boolean(data.unavailable);
        const fallbackMsg = data.reply || data.error || t('chatbot.unavailableMsg');
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            role: 'assistant',
            text: fallbackMsg,
            timestamp: new Date().toISOString(),
            suggestEscalation: isServiceUnavailable && Boolean(data.suggestEscalation),
            isError: true,
            failedQuestion: trimmed,
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ast_${Date.now()}`,
          role: 'assistant',
          text: String(data.reply),
          timestamp: new Date().toISOString(),
          suggestEscalation: Boolean(data.suggestEscalation),
          aiPowered: data.aiPowered !== false,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          text: t('chatbot.unavailableMsg'),
          timestamp: new Date().toISOString(),
          suggestEscalation: true,
          isError: true,
          failedQuestion: trimmed,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleEscalateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketError('');
    const emailToUse = (ticketEmail || userAccount?.email || '').trim();
    if (!emailToUse) {
      setTicketError(t('chatbot.ticketEmailRequired'));
      return;
    }
    const cleanMsg = ticketMsg.trim();
    if (cleanMsg.length < 1 || cleanMsg.length > 600) {
      setTicketError(t('support.messageLengthError'));
      return;
    }
    setTicketBusy(true);
    try {
      await apiFetch('/api/support/tickets', {
        method: 'POST',
        body: JSON.stringify({
          email: emailToUse,
          category: 'general',
          priority: 'medium',
          subject: ticketSubject.trim() || t('chatbot.defaultEscalateSubject'),
          message: cleanMsg,
        }),
      });
      setShowEscalateForm(false);
      setTicketSubject('');
      setTicketMsg('');
      setTicketError('');
      toast(t('chatbot.ticketCreated'), 'success');
      setMessages((prev) => [
        ...prev,
        {
          id: `tkt_${Date.now()}`,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          text: t('support.ticketCreatedToast'),
        },
      ]);
    } catch (err: any) {
      const msg = err?.message || t('chatbot.escalationFailed');
      setTicketError(msg);
      toast(msg, 'error');
    } finally {
      setTicketBusy(false);
    }
  };

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-40 max-w-[calc(100vw-1.5rem)]">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t('chatbot.openTooltip')}
          className="min-h-[44px] inline-flex items-center gap-2 bg-[#111322] hover:bg-[#2B3A9F] text-white px-4 py-2.5 text-xs font-semibold border border-[#2B3A9F]/60 shadow-lg transition-colors cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-[#A5B4FC]" />
          <span className="hidden sm:inline">{t('chatbot.title')}</span>
          <span className="sm:hidden">{t('support')}</span>
        </button>
      ) : (
        <div
          className="w-[calc(100vw-1.5rem)] sm:w-96 bg-white border border-[#E2E5F0] shadow-2xl flex flex-col max-h-[min(80dvh,560px)]"
          role="dialog"
          aria-label={t('chatbot.title')}
        >
          <div className="px-4 py-3 bg-[#111322] text-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <TanzaniteGemIcon className="w-5 h-5 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{t('chatbot.title')}</p>
                <p className="text-[10px] text-[#A5B4FC] truncate">{t('chatbot.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                disabled={sending}
                title={t('chatbot.clearChat')}
                aria-label={t('chatbot.clearChat')}
                className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('chatbot.closeAssistantAria')}
                className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#F8F9FC] text-xs">
            {messages.map((m, idx) => (
              <div
                key={m.id}
                className={`p-3 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#2B3A9F] text-white ml-6'
                    : m.isError
                      ? 'bg-red-50 border border-red-200 text-red-900 mr-4'
                      : 'bg-white border border-[#E2E5F0] text-[#111322] mr-4'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <div className="mt-1.5 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] ${
                        m.role === 'user' ? 'text-indigo-200' : 'text-neutral-400'
                      }`}
                    >
                      {formatTime(m.timestamp, language)}
                    </span>
                    {m.role === 'assistant' && m.aiPowered === false && !m.isError && (
                      <span className="text-[10px] text-[#5B3CC4] bg-[#EEF2FF] px-1.5 py-0.5">
                        {t('chatbot.fallbackNote')}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {m.isError && m.failedQuestion && (
                      <button
                        type="button"
                        disabled={sending}
                        onClick={() => sendQuestion(m.failedQuestion!, { skipUserBubble: true })}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-800 hover:text-red-950 underline cursor-pointer disabled:opacity-40"
                      >
                        <RotateCcw className="w-3 h-3" />
                        {t('chatbot.retryBtn')}
                      </button>
                    )}
                    {m.suggestEscalation && (
                      <button
                        type="button"
                        onClick={() => {
                          const prevUser = [...messages]
                            .slice(0, idx)
                            .reverse()
                            .find((x) => x.role === 'user');
                          setTicketSubject(
                            prevUser?.text.slice(0, 60) || t('chatbot.defaultEscalateSubject')
                          );
                          setTicketMsg(prevUser?.text || '');
                          setShowEscalateForm(true);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2B3A9F] underline cursor-pointer"
                      >
                        <LifeBuoy className="w-3 h-3" /> {t('escalateToHuman')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {sending && (
              <div
                aria-live="polite"
                className="bg-white border border-[#E2E5F0] text-[#111322] mr-4 p-3 flex items-center gap-2 text-neutral-600"
              >
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2B3A9F] animate-bounce [animation-delay:-0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2B3A9F] animate-bounce [animation-delay:-0.1s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2B3A9F] animate-bounce" />
                </span>
                <span className="text-[11px]">{t('chatbot.thinking')}</span>
              </div>
            )}

            {messages.length <= 2 && !sending && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quickPrompts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendQuestion(q)}
                    className="text-left text-[11px] border border-[#E2E5F0] bg-white hover:border-[#2B3A9F] px-2.5 py-1.5 text-[#111322] cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {showEscalateForm && (
              <form
                onSubmit={handleEscalateSubmit}
                className="bg-white border border-[#2B3A9F] p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#111322]">
                    {t('chatbot.ticketFormTitle')}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEscalateForm(false);
                      setTicketError('');
                    }}
                    className="text-[11px] text-neutral-500 underline cursor-pointer"
                  >
                    {t('common.cancel')}
                  </button>
                </div>
                {!userAccount?.email && (
                  <input
                    type="email"
                    required
                    value={ticketEmail}
                    onChange={(e) => setTicketEmail(e.target.value)}
                    placeholder={t('chatbot.ticketEmailLabel')}
                    className="w-full border border-[#E2E5F0] px-2.5 py-1.5"
                  />
                )}
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder={t('chatbot.ticketSubjectLabel')}
                  className="w-full border border-[#E2E5F0] px-2.5 py-1.5"
                />
                <div className="space-y-1">
                  <textarea
                    rows={2}
                    required
                    maxLength={600}
                    value={ticketMsg}
                    onChange={(e) => {
                      setTicketMsg(e.target.value);
                      if (ticketError) setTicketError('');
                    }}
                    placeholder={t('support.messagePlaceholder')}
                    className="w-full border border-[#E2E5F0] p-2"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500">
                    <span>
                      {ticketError ? (
                        <span className="text-red-700 font-medium">{ticketError}</span>
                      ) : (
                        t('support.formFooterHint')
                      )}
                    </span>
                    <span className="font-mono-tabular">{ticketMsg.length}/600</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={ticketBusy}
                  className="w-full bg-[#2B3A9F] text-white py-2 font-semibold cursor-pointer disabled:opacity-50"
                >
                  {ticketBusy ? t('common.saving') : t('chatbot.ticketSubmitBtn')}
                </button>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[#E2E5F0] bg-white p-2.5 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendQuestion(question);
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!sending && question.trim()) {
                      sendQuestion(question);
                    }
                  }
                }}
                placeholder={t('chatbot.inputPlaceholder')}
                className="flex-1 min-h-[40px] max-h-24 resize-none border border-[#E2E5F0] px-3 py-2 text-xs bg-[#F8F9FC] focus:outline-none focus:border-[#2B3A9F]"
              />
              <button
                type="submit"
                disabled={sending || !question.trim()}
                aria-label={t('chatbot.sendAria')}
                className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center bg-[#2B3A9F] hover:bg-[#1E2A78] text-white px-3 disabled:opacity-40 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500 px-0.5">
              <button
                type="button"
                onClick={() => {
                  setTicketError('');
                  setShowEscalateForm((s) => !s);
                }}
                className="text-[#2B3A9F] underline cursor-pointer"
              >
                {t('talkToHumanAgent')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setActivePage('support');
                }}
                className="hover:text-[#111322] underline cursor-pointer"
              >
                {t('chatbot.supportDeskLink')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
