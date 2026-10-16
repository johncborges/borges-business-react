import PresenceReport from './presence-report';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div>
        <p className="label">Websites, Google &amp; local SEO</p>
        <h1 id="hero-title">Small business websites customers can find, and like what they find.</h1>
        <p className="lede">
          A website is only one piece. When someone looks you up, they also need to find you on Google and on
          maps, with the right hours and phone number everywhere. I set all of it up and keep it working, for
          small businesses of any kind, anywhere.
        </p>
        <div className="ctas">
          <a className="btn primary" href="#contact">
            Get a free online checkup
          </a>
          <a className="btn ghost" href="#services">
            What&apos;s included
          </a>
        </div>
        <p className="label where">Any industry · Any country · You own everything</p>
      </div>
      <PresenceReport />
    </section>
  );
}
