import { Request } from 'express';
import { LanguageCode } from '../types/marketplace.ts';
import { StoreSnapshot } from './store.ts';

export function resolveRequestLanguage(
  req?: Partial<Request> & { authUser?: { preferredLanguage?: LanguageCode } },
  explicitLang?: unknown
): LanguageCode {
  if (explicitLang === 'sw' || explicitLang === 'en') return explicitLang;

  const bodyLang = (req?.body as any)?.language;
  if (bodyLang === 'sw' || bodyLang === 'en') return bodyLang;

  const queryLang = (req?.query as any)?.language || (req?.query as any)?.lang;
  if (queryLang === 'sw' || queryLang === 'en') return queryLang;

  const headerRaw =
    typeof req?.headers?.['x-language'] === 'string'
      ? req.headers['x-language']
      : Array.isArray(req?.headers?.['x-language'])
        ? req.headers['x-language'][0]
        : '';
  const cleanHeader = headerRaw.trim().toLowerCase().slice(0, 2);
  if (cleanHeader === 'sw' || cleanHeader === 'en') {
    return cleanHeader;
  }

  if (req?.authUser?.preferredLanguage === 'sw' || req?.authUser?.preferredLanguage === 'en') {
    return req.authUser.preferredLanguage;
  }

  return 'en';
}

export function resolveUserLanguage(
  store: Pick<StoreSnapshot, 'users'>,
  uid?: string | null,
  fallback: LanguageCode = 'sw'
): LanguageCode {
  if (!uid) return fallback;
  const user = store.users[uid];
  if (user?.preferredLanguage === 'sw' || user?.preferredLanguage === 'en') {
    return user.preferredLanguage;
  }
  return fallback;
}

export function pickBi(lang: LanguageCode, en: string, sw: string): string {
  return lang === 'sw' ? sw : en;
}
