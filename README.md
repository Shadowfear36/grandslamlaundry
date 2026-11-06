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
4. Settings → Variables and Secrets (add as **Secret** type, for Production
   and Preview):
   - `APPS_SCRIPT_URL` — the Apps Script web app's `/exec` URL
   - `APPS_SCRIPT_SECRET` — long random string; must match the script's
     `SHARED_SECRET` Script Property
   - `TURNSTILE_SECRET_KEY` — from the Turnstile widget
5. Deploy. Every push to `main` will auto-deploy; PRs get preview URLs.

## Before launch

- **Contact form**: the form posts to `/api/contact`
  (`functions/api/contact.ts`, a Cloudflare Pages Function), which verifies a
  Cloudflare Turnstile token and forwards the message to a Google Apps Script
  web app (`apps-script/Code.gs`) on the client's Google account. The script
  only accepts requests carrying the shared secret and emails via `MailApp`.
  Set up:
  1. Turnstile → Add widget for the site's domain(s); its **site key** goes in
     `TURNSTILE_SITE_KEY` in `src/components/Contact.tsx` (done).
  2. Paste `apps-script/Code.gs` into a new project at script.google.com,
     set `TO`, add Script Property `SHARED_SECRET`, and deploy as a Web app
     (Execute as: Me, Access: Anyone).
  3. Add the three Pages variables above and redeploy.

  Local testing: `npm run build && npx wrangler pages dev out` with the
  variables in `.dev.vars`. Turnstile's test keys report hostname
  `example.com`, so the hostname check rejects them locally; real sends are
  best tested on a Pages preview deployment.
