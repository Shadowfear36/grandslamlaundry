# Grand Slam Laundry

Baseball-themed marketing site for Grand Slam Laundry, a coin laundromat in
Fresno, CA. Built with Next.js (App Router) + Tailwind CSS, exported as
static HTML for Cloudflare Pages.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

This produces a static export in `out/` (configured via `output: "export"`
in `next.config.ts`) — no server runtime required.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: Workers & Pages → Create → Pages → Connect to
   GitHub → select this repo.
3. Build settings:
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npm run build`
   - Build output directory: `out`
4. Deploy. Every push to `main` will auto-deploy; PRs get preview URLs.

## Before launch

- **Contact form**: `src/components/Contact.tsx` posts to a placeholder
  Formspree endpoint (`FORM_ENDPOINT`). Sign up at
  [formspree.io](https://formspree.io), create a form, and replace the URL.
- **Site URL**: `src/app/layout.tsx` sets `metadataBase` to a placeholder
  `https://grandslamlaundry.pages.dev`. Update it to the real Cloudflare
  Pages domain (or custom domain) once known, so Open Graph / Twitter share
  links resolve `og-image.png` correctly.
