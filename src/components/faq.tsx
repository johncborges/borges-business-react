import { FAQS } from '../data';
import SectionHead from './section-head';

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title">
      <SectionHead id="faq-title" title="Common questions">
        Short answers about cost, ownership and how the work gets done. Anything else, just ask.
      </SectionHead>
      <div className="faq">
        {FAQS.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
