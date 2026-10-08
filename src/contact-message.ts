export interface CheckRequest {
  business: string;
  location: string;
  website: string;
  reach: string;
  note: string;
}

export function isComplete(req: CheckRequest): boolean {
  return req.business.trim() !== '' && req.reach.trim() !== '';
}

export function buildMessage(req: CheckRequest): string {
  const lines = [
    `Business: ${req.business.trim()}`,
    `Location: ${req.location.trim() || 'not given'}`,
    `Website: ${req.website.trim() || 'none'}`,
    `Reach me at: ${req.reach.trim()}`,
  ];
  const note = req.note.trim();
  return note ? `${lines.join('\n')}\n\n${note}` : lines.join('\n');
}

export function buildMailto(email: string, req: CheckRequest): string {
  const subject = `Free presence check: ${req.business.trim()}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(req))}`;
}
