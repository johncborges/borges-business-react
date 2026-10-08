import { BRAND, FACTS } from '../data';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="about">
        <div>
          <p className="label">About</p>
          <h2 id="about-title">Hi, I&apos;m {BRAND.owner}.</h2>
        </div>
        <div className="body">
          <p>
            I&apos;m a principal software engineer. I started {BRAND.name} because I kept seeing good small
            businesses that were hard to find online: old websites, wrong hours on maps, no listing at all.
            Customers searched, didn&apos;t find them, and went somewhere else.
          </p>
          <p>
            Big agencies aren&apos;t built for small businesses, and do-it-yourself tools leave the owner to
            figure out search, listings and upkeep alone. I give you one person who handles the whole picture
            and explains it in plain language.
          </p>
          <dl className="facts">
            {FACTS.map((f) => (
              <div key={f.title}>
                <dt>{f.title}</dt>
                <dd>{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
