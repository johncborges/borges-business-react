import { BRAND, SECTIONS } from '../data';

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#main">
        <i aria-hidden="true" />
        {BRAND.name}
      </a>
      <nav aria-label="Main">
        <ul className="navlinks">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
