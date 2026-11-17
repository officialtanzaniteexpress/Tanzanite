import { LanguageCode } from '../types/marketplace';
import { auth } from './firebase';

const LANGUAGE_STORAGE_KEY = 'tanzanite_express_lang_v1';
const LEGACY_LANGUAGE_KEY = 'mik_fashion_hub_lang_v1';

export function getActiveClientLanguage(): LanguageCode {
  try {
    const saved =
      localStorage.getItem(LANGUAGE_STORAGE_KEY) || localStorage.getItem(LEGACY_LANGUAGE_KEY);
    if (saved === 'en' || saved === 'sw') return saved;
  } catch {
    // Ignore storage access errors in SSR or restricted environments
  }
  return 'sw';
}

export async function apiFetch<T>(
  url: string,
  options: RequestInit & { timeoutMs?: number; retries?: number } = {}
): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();
  const timeoutMs = options.timeoutMs ?? 20000;
  const maxRetries = options.retries ?? (method === 'GET' ? 2 : 0);
  const lang = getActiveClientLanguage();

  let attempt = 0;
  while (true) {
    const headers = new Headers(options.headers || {});
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    if (!headers.has('x-language')) {
      headers.set('x-language', lang);
    }
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();
        headers.set('Authorization', `Bearer ${token}`);
      } catch {
        // Ignore token retrieval error; server will enforce auth if required
      }
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    if (options.signal) {
      if (options.signal.aborted) {
        clearTimeout(timer);
        throw new Error(lang === 'sw' ? 'Ombi limesitishwa.' : 'Request cancelled.');
      }
      options.signal.addEventListener('abort', () => controller.abort(), { once: true });
    }

    try {
      const res = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('text/csv')) {
        if (!res.ok) {
          throw new Error(
            lang === 'sw' ? 'Imeshindwa kupakua faili la CSV.' : 'Failed to export CSV.'
          );
        }
        return (await res.text()) as unknown as T;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if ((res.status === 502 || res.status === 503 || res.status === 504) && attempt < maxRetries) {
          attempt += 1;
          await new Promise((r) => setTimeout(r, 400 * attempt));
          continue;
        }
        throw new Error(
          data.error ||
            (lang === 'sw'
              ? `Ombi limeshindikana (${res.status}).`
              : `Request failed (${res.status}).`)
        );
      }
      return data as T;
    } catch (err: any) {
      const isAbort = err?.name === 'AbortError';
      const isTransientNetwork = isAbort || err instanceof TypeError;
      if (isTransientNetwork && attempt < maxRetries) {
        attempt += 1;
        await new Promise((r) => setTimeout(r, 400 * attempt));
        continue;
      }
      if (isAbort) {
        throw new Error(
          lang === 'sw'
            ? 'Muda wa muunganisho wa mtandao umeisha. Tafadhali kagua mtandao wako na ujaribu tena.'
            : 'Network request timed out. Please check your connection and try again.'
        );
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}
