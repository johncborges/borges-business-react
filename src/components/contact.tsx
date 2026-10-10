import { useState, type ChangeEvent, type FormEvent } from 'react';
import { BRAND } from '../data';
import { buildMailto, buildMessage, isComplete, type CheckRequest } from '../contact-message';

const EMPTY: CheckRequest = { business: '', location: '', website: '', reach: '', note: '' };

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function Contact() {
  const [form, setForm] = useState<CheckRequest>(EMPTY);
  const [submitted, setSubmitted] = useState<CheckRequest | null>(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState<'email' | 'message' | null>(null);

  const update = (field: keyof CheckRequest) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isComplete(form)) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitted(form);
  };

  const onCopy = async (what: 'email' | 'message', text: string) => {
    if (await copy(text)) {
      setCopied(what);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="contact">
        <div>
          <p className="label">Free online checkup</p>
          <h2 id="contact-title">See what customers see when they search for you.</h2>
          <p className="intro">
            Send me your business name and where you&apos;re located. Within a couple of days you&apos;ll get
            a short report like the one above. No charge and no pressure.
          </p>
          <div className="direct">
            <span className="label">Or email me directly</span>
            <a className="addr" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>
            <button className="copy" type="button" onClick={() => onCopy('email', BRAND.email)}>
              {copied === 'email' ? 'Copied' : 'Copy email'}
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate aria-labelledby="contact-title">
          <label htmlFor="biz">
            Business name
            <input
              id="biz"
              required
              value={form.business}
              onChange={update('business')}
              placeholder="e.g. Harbor Street Bakery"
            />
          </label>
          <label htmlFor="loc">
            City and country
            <input
              id="loc"
              value={form.location}
              onChange={update('location')}
              placeholder="e.g. Lisbon, Portugal"
            />
          </label>
          <label htmlFor="site">
            Current website
            <input
              id="site"
              value={form.website}
              onChange={update('website')}
              placeholder="e.g. harborstreetbakery.com (or “none”)"
            />
          </label>
          <label htmlFor="reach">
            Your email or phone
            <input
              id="reach"
              required
              value={form.reach}
              onChange={update('reach')}
              placeholder="So I can send you the report"
            />
          </label>
          <label htmlFor="note">
            Anything else?
            <textarea
              id="note"
              value={form.note}
              onChange={update('note')}
              placeholder="What you'd most like to improve"
            />
          </label>
          {error && (
            <p className="label error" role="alert">
              Please add your business name and a way to reach you.
            </p>
          )}
          <button className="btn primary" type="submit">
            Request my free check
          </button>

          {submitted && (
            <div className="out" role="status">
              <strong>Almost done. Email this to {BRAND.email}:</strong>
              <pre>{buildMessage(submitted)}</pre>
              <div className="out-actions">
                <a className="btn primary" href={buildMailto(BRAND.email, submitted)}>
                  Open in email
                </a>
                <button
                  className="copy"
                  type="button"
                  onClick={() => onCopy('message', buildMessage(submitted))}
                >
                  {copied === 'message' ? 'Copied' : 'Copy message'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
