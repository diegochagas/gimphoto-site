# GIMPhoto's website

The website of [GIMPhoto](https://github.com/diegochagas/gimphoto), GIMP
with Photoshop's tools: <https://diegochagas.github.io/gimphoto-site/>, in
English (`/`) and Portuguese (`/pt/`), with a section asking for donations
to keep GIMPhoto's development going.

Next.js (App Router, React, TypeScript), exported as static files and
published by GitHub Pages. It is built from GIMPhoto's own README and docs:
`scripts/gimphoto.mjs` fetches them (a shallow, docs-only clone into
`.gimphoto/`), or set `GIMPHOTO_DIR` to a local checkout of GIMPhoto.

## What it shows, and where it comes from

| Part | Source |
|---|---|
| The feature catalogue and one page per feature | GIMPhoto's README feature table and each `docs/features/<feature>.md`: its before and after screenshots, its other screenshots and how it is tested, read at build time (`src/lib/catalogue.ts`). A feature added to GIMPhoto's README and docs is on the site with the next build (daily, or *Run workflow*). |
| The large showcase on the home page | `content/features.json` (English and Portuguese) |
| Every interface text | `content/i18n.json` (the unit tests require the same keys in both languages) |
| Screenshots, icon, favicon, link preview | GIMPhoto's `docs/images/` and `branding/`, converted to WebP into `public/` by `scripts/assets.mjs` before each build |
| Stars, latest release, roadmap | GitHub's API, from the visitor's browser; the page shows its own values when GitHub does not answer |
| Donation methods | `content/donate.json` |

## Donations

Fill in `content/donate.json`; an empty value hides that method, and with
none set up the section says donations are opening soon.

- `pix`: the key, and the receiver's name and city. PIX is Brazilian, so it
  is offered on the Portuguese pages only.
  The site makes the PIX copy-and-paste code (the Banco Central's BR Code)
  and its QR code at build time.
- `links`: full `https://` addresses for GitHub Sponsors, Ko-fi, Buy Me a
  Coffee, PayPal or Liberapay.
- `qr`: link methods that also show a QR code, each with what the code
  holds (empty: the link itself). PayPal's own QR adds `&source=qr`.
- `goal`: a monthly amount and what came in, to show a progress bar (0:
  hidden).

## Develop

```bash
npm ci
git config core.hooksPath .githooks   # scripts/check before every push
npm run dev        # http://localhost:4310 (fetches GIMPhoto's docs, makes public/)
scripts/check      # types, unit tests, static build
npm run e2e        # builds with /gimphoto-site, Playwright at 1280 and 375 px,
                   # screenshots in test-results/screenshots/
GIMPHOTO_DIR=../gimphoto npm run dev   # from a local GIMPhoto checkout instead
```

The end-to-end tests answer GitHub's API themselves: no test calls an
outside service.

## Publish

`.github/workflows/site.yml` checks every pull request and push, and on
`main` (each push, once a day, or *Run workflow*) builds with
`SITE_BASE_PATH=/gimphoto-site` and deploys to GitHub Pages. The
repository's Pages source must be "GitHub Actions" (Settings › Pages).

## License

GPL-3.0, as GIMPhoto. The screenshots and texts about each feature come
from GIMPhoto's documentation.
