import { SERVICES } from '../data';
import SectionHead from './section-head';

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title">
      <SectionHead id="services-title" title="Everything customers see when they look you up">
        Most small businesses have some of these and are missing others. I check every layer, fix what&apos;s
        broken, and keep it current so you can get back to running your business.
      </SectionHead>
      <div className="layers">
        {SERVICES.map((s) => (
          <article className="svc" key={s.label}>
            <p className="label">{s.label}</p>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <ul>
              {s.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
