# Borges Web

Marketing site for **Borges Web**, a service that builds and maintains a complete, searchable online presence for small businesses: website, search setup, map listings, reviews and a monthly report.

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

## Deploy to DreamHost

1. `npm run build`
2. Upload the contents of `dist/` to the `web.johncborges.com` folder on DreamHost (SFTP or the panel's File Manager).
