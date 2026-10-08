import { SAMPLE_REPORT, type CheckStatus } from '../data';

const STATUS_TEXT: Record<CheckStatus, string> = {
  good: 'Good',
  fix: 'Fix',
  missing: 'Missing',
  slow: 'Slow',
};

const STATUS_CLASS: Record<CheckStatus, string> = {
  good: 'ok',
  fix: 'no',
  missing: 'no',
  slow: 'meh',
};

export default function PresenceReport() {
  const { query, business, checks } = SAMPLE_REPORT;
  const passed = checks.filter((c) => c.status === 'good').length;

  return (
    <figure className="report" aria-label={`Example presence check report for ${business}`}>
      <div className="search">{query}</div>
      <div className="rhead">
        <div>
          <p className="label">Presence check · example</p>
          <strong>{business}</strong>
        </div>
        <p className="score" aria-label={`${passed} of ${checks.length} checks passed`}>
          {passed}
          <small> / {checks.length}</small>
        </p>
      </div>
      <ul className="checks">
        {checks.map((c) => (
          <li key={c.label}>
            {c.label}
            <span className={`pill ${STATUS_CLASS[c.status]}`}>{STATUS_TEXT[c.status]}</span>
          </li>
        ))}
      </ul>
      <figcaption className="note">
        This is the kind of report you get for free. Sample business, sample results.
      </figcaption>
    </figure>
  );
}
