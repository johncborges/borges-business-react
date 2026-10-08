import { STEPS } from '../data';
import SectionHead from './section-head';

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title">
      <SectionHead id="process-title" title="How it works">
        Everything can be done online, by video call and email, in your time zone. You only pay once
        you&apos;re happy with the plan.
      </SectionHead>
      <ol className="steps">
        {STEPS.map((s, i) => (
          <li className="step" key={s.title}>
            <span className="n">Step {i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
