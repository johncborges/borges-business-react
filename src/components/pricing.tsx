import { PLANS } from '../data';
import SectionHead from './section-head';

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title">
      <SectionHead id="pricing-title" title="Simple pricing">
        Flat prices in US dollars so you know the cost up front. Every new site includes mobile design, search
        setup and a Google Business Profile.
      </SectionHead>
      <div className="plans">
        {PLANS.map((p) => (
          <article className={p.featured ? 'plan feature' : 'plan'} key={p.name}>
            {p.featured && <span className="tag">Most popular</span>}
            <h3 className="label">{p.name}</h3>
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
      <p className="fine">Larger sites, online stores and booking systems are quoted after the free check.</p>
    </section>
  );
}
