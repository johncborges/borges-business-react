# JC Borges

Marketing site for **JC Borges**, a service that helps small businesses get found online: a website that works on every phone, Google Business Profile and map listings, local SEO, reviews and a monthly report.

Live at <https://web.johncborges.com/> (hosted on DreamHost).

## Stack

React 18 + TypeScript + Vite, tested with Vitest and Testing Library, linted with ESLint (including `jsx-a11y`) and formatted with Prettier. CI runs on every push and pull request.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run check      # lint + typecheck + tests
npm run build      # production build in dist/
```

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
2. Upload the contents of `dist/` to the `web.johncborges.com` folder on DreamHost (SFTP or the panel's File Manager).
