import { useEffect, useState } from 'react';
import { BRAND, SECTIONS } from '../data';

export default function Header() {
  const [open, setOpen] = useState(false);

  // Close the phone menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="#main">
          <i aria-hidden="true" />
          {BRAND.name}
        </a>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={open ? 'menu-icon open' : 'menu-icon'} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav aria-label="Main" id="main-nav">
          <ul className={open ? 'navlinks open' : 'navlinks'}>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={() => setOpen(false)}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
