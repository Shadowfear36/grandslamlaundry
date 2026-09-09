# Grand Slam Laundry

Baseball-themed marketing site for Grand Slam Laundry, a coin laundromat in
Clovis/Fresno, CA. Built with Next.js (App Router) + Tailwind CSS, exported
as static HTML for Cloudflare Pages.

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
- **Real address/phone/hours**: placeholder values live in
  `src/components/Footer.tsx` and `src/components/HoursLocation.tsx`
  (123 Home Plate Ave, Clovis, CA / (559) 555-0123). The map embed in
  `HoursLocation.tsx` also needs the real address once known.
- **Photos**: `src/components/Gallery.tsx` currently shows labeled
  placeholder tiles — swap in real photos of the storefront/machines.
- **Logo/branding**: currently using a baseball emoji as the mark; swap for
  a real logo if your buddy has one designed.
