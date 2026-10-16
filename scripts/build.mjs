/**
 * Builds the site, then prerenders the page into dist/index.html so search engines,
 * link previews and AI crawlers get the full content and structured data without running JavaScript.
 *
 * Usage: node scripts/build.mjs [outDir]   (default: dist)
 */
import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const outDir = resolve(process.argv[2] ?? 'dist');
const ssrDir = resolve('node_modules/.prerender');

await build({ build: { outDir, emptyOutDir: true } });
await build({ logLevel: 'warn', build: { ssr: 'src/entry-server.tsx', outDir: ssrDir, emptyOutDir: true } });

const { render, structuredData } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const file = resolve(outDir, 'index.html');
const html = await readFile(file, 'utf8');

const ROOT = '<div id="root"></div>';
if (!html.includes(ROOT) || !html.includes('</head>'))
  throw new Error(`prerender: ${ROOT} or </head> not found`);

const json = JSON.stringify(structuredData()).replace(/</g, '\\u003c');
const out = html
  .replace(ROOT, `<div id="root">${render()}</div>`)
  .replace('</head>', `  <script type="application/ld+json">${json}</script>\n  </head>`);

await writeFile(file, out);
await rm(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${file}`);
