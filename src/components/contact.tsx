import { useState, type ChangeEvent, type FormEvent } from 'react';
import { BRAND } from '../data';
import { buildMailto, isComplete, type CheckRequest } from '../contact-message';
import { SendError, sendCheck } from '../send-check';

const EMPTY: CheckRequest = { business: '', location: '', website: '', reach: '', note: '' };

type Status = 'idle' | 'sending' | 'sent' | 'failed';

export default function Contact() {
  const [form, setForm] = useState<CheckRequest>(EMPTY);
  const [honeypot, setHoneypot] = useState(false);
  const [missing, setMissing] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [failure, setFailure] = useState('');
  const [failedRequest, setFailedRequest] = useState<CheckRequest | null>(null);
  const [copied, setCopied] = useState(false);

  const update = (field: keyof CheckRequest) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isComplete(form)) {
      setMissing(true);
      return;
    }
    setMissing(false);
    setStatus('sending');
    try {
      await sendCheck(form, honeypot);
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      setFailure(err instanceof SendError ? err.message : 'Something went wrong. Please try again.');
      setFailedRequest(form);
      setStatus('failed');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable: the address is still visible and selectable */
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
            <button className="copy" type="button" onClick={copyEmail}>
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
        </div>

        {status === 'sent' ? (
          <div className="sent" role="status">
            <h3>Thanks, your request is in.</h3>
            <p>
              I&apos;ll look your business up the way a customer would and reply within a couple of days. If
              you don&apos;t hear back, email me at {BRAND.email}.
            </p>
            <button className="copy" type="button" onClick={() => setStatus('idle')}>
              Send another request
            </button>
          </div>
        ) : (
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
            <input
              type="checkbox"
              name="botcheck"
              className="honeypot"
              tabIndex={-1}
              aria-hidden="true"
              checked={honeypot}
              onChange={(e) => setHoneypot(e.target.checked)}
            />
            {missing && (
              <p className="label error" role="alert">
                Please add your business name and a way to reach you.
              </p>
            )}
            {status === 'failed' && failedRequest && (
              <div className="out" role="alert">
                <strong>{failure}</strong>
                <p>
                  You can also{' '}
                  <a href={buildMailto(BRAND.email, failedRequest)}>send the same details by email</a>.
                </p>
              </div>
            )}
            <button className="btn primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Request my free check'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
