import { buildMessage, type CheckRequest } from './contact-message';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/** Public Web3Forms access key (safe to ship in client code). Set VITE_WEB3FORMS_KEY in .env.local. */
export function accessKey(): string {
  return import.meta.env.VITE_WEB3FORMS_KEY ?? '';
}

export class SendError extends Error {}

/**
 * Sends a free-check request to John's inbox through Web3Forms.
 * `botcheck` is a honeypot: real people leave it empty.
 */
export async function sendCheck(req: CheckRequest, botcheck = false, key = accessKey()): Promise<void> {
  if (!key) throw new SendError('The form is not set up yet.');

  let res: Response;
  try {
    res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: `Free online checkup: ${req.business.trim()}`,
        from_name: 'JC Borges website',
        replyto: req.reach.includes('@') ? req.reach.trim() : undefined,
        business: req.business.trim(),
        location: req.location.trim() || 'not given',
        website: req.website.trim() || 'none',
        contact: req.reach.trim(),
        message: buildMessage(req),
        botcheck,
      }),
    });
  } catch {
    throw new SendError('We could not reach the server. Check your connection and try again.');
  }

  if (!res.ok) {
    let detail = '';
    try {
      detail = ((await res.json()) as { message?: string }).message ?? '';
    } catch {
      /* ignore */
    }
    throw new SendError(detail || 'The message did not go through. Please try again.');
  }
}
