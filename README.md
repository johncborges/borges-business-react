# JC Borges

Marketing site for **JC Borges**, a service that helps small businesses get found online: a website that works on every phone, Google Business Profile and map listings, local SEO, reviews and a monthly report.

Live at <https://jcborges.com/> (hosted on DreamHost).

## Stack

React 18 + TypeScript + Vite, tested with Vitest and Testing Library (unit) and Playwright (end-to-end), linted with ESLint (including `jsx-a11y`) and formatted with Prettier. CI runs on every push and pull request.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run check      # lint + typecheck + tests
npm run build      # production build in dist/
npm run test:e2e   # end-to-end tests in a real browser
```

## End-to-end tests

[Playwright](https://playwright.dev) tests in `e2e/` build the site, serve it with `vite preview` and drive it in Chromium at desktop and phone (Pixel 7) sizes. They cover the nav and phone menu, the skip link, pricing, the free check form (success, failure and offline, with the Web3Forms request intercepted so no email is sent), the files in `public/`, and an [axe](https://github.com/dequelabs/axe-core) accessibility scan in light and dark mode.

Run `npx playwright install chromium` once before the first run. `npm run test:e2e:ui` opens Playwright's UI for debugging. In CI they run as a separate `e2e` job; on failure, the report and traces are uploaded as a build artifact.

`playwright-core` is listed alongside `@playwright/test` so `@axe-core/playwright` shares the same copy. Upgrade the two together.

## Editing content

All copy, prices and contact details live in [`src/data.ts`](src/data.ts). Change the business name in `BRAND` and in `index.html` / `public/sitemap.xml` if it changes.

## Files for search engines and AI tools

`public/robots.txt`, `public/sitemap.xml` and `public/llms.txt` (a Markdown summary of the site for AI assistants, per [llmstxt.org](https://llmstxt.org)). When prices, services or contact details change in `src/data.ts`, update `public/llms.txt` to match.

## Free check form

The form sends requests by email through [Web3Forms](https://web3forms.com) (no server needed).

1. Get a free access key at web3forms.com using the email address that should receive requests.
2. Copy `.env.example` to `.env.local` and paste the key into `VITE_WEB3FORMS_KEY`.
3. Rebuild. The key is baked into the build; it is public by design and only lets the form email you.

Without a key the form shows an error and offers a pre-filled email link instead.

## Deploy to DreamHost

1. `npm run build`
2. Upload the contents of `dist/` to the `jcborges.com` folder on DreamHost (SFTP or the panel's File Manager).
