import PresenceReport from './presence-report';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div>
        <p className="label">Digital presence for small businesses</p>
        <h1 id="hero-title">Make sure customers can find you, and like what they find.</h1>
        <p className="lede">
          A website is only one piece. Your business also needs to show up in search and on maps, with the
          right hours and phone number everywhere. I set all of it up and keep it working, for small
          businesses of any kind, anywhere.
        </p>
        <div className="ctas">
          <a className="btn primary" href="#contact">
            Get a free presence check
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
