import Header from './components/header';
import Hero from './components/hero';
import Services from './components/services';
import Process from './components/process';
import Pricing from './components/pricing';
import About from './components/about';
import Contact from './components/contact';
import Faq from './components/faq';
import { BRAND } from './data';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <div className="wrap">
        <main id="main" tabIndex={-1}>
          <Hero />
          <Services />
          <Process />
          <Pricing />
          <About />
          <Faq />
          <Contact />
        </main>
        <footer className="site-footer">
          {/* the prerendered year can be stale until the next build */}
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {BRAND.name}
          </span>
          <span>{BRAND.tagline}</span>
        </footer>
      </div>
    </>
  );
}
