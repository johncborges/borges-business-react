import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';

export { structuredData } from './structured-data';

/** Renders the page to HTML at build time (see scripts/build.mjs). */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
