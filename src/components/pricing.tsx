import { PLAN_GROUPS, PRICING_NOTES } from '../data';
import SectionHead from './section-head';

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title">
      <SectionHead id="pricing-title" title="Simple pricing">
        Two steps, flat prices in US dollars. First I build or fix your site, then you choose how to keep it
        working: a monthly care plan or help by the hour.
      </SectionHead>
      <div className="plan-groups">
        {PLAN_GROUPS.map((g, i) => (
          <div className="plan-group" key={g.title} role="group" aria-labelledby={`plans-step-${i + 1}`}>
            <div className="plan-group-head">
              <span className="label">{g.step}</span>
              <h3 id={`plans-step-${i + 1}`}>{g.title}</h3>
              <span className="label">{g.note}</span>
            </div>
            <div className="plans">
              {g.plans.map((p) => (
                <article className={p.tag ? 'plan feature' : 'plan'} key={p.name}>
                  {p.tag && <span className="tag">{p.tag}</span>}
                  <h4 className="label">{p.name}</h4>
                  <p className="price">
                    {p.price} <small>{p.unit}</small>
                  </p>
                  <ul>
                    {p.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="fine">
        {PRICING_NOTES.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </section>
  );
}
