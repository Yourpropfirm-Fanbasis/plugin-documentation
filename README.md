# Yourpropfirm Fanbasis — Plugin Documentation

Internal documentation site for the **Yourpropfirm Fanbasis** WordPress/WooCommerce payment gateway plugin (v1.2.0). Built with Next.js and deployed as a static site on GitHub Pages.

> **Internal use only.** Access is protected by a password gate.

---

## Stack

- **Framework** — Next.js 16 (App Router, static export)
- **Styling** — Tailwind CSS + CSS custom properties
- **Theming** — next-themes (light / dark, default: light)
- **Deployment** — GitHub Pages via GitHub Actions

## Pages

| Route | Description |
|---|---|
| `/login` | Password gate |
| `/docs` | General documentation — overview, payment flow, settings, FAQ |
| `/technical` | Technical reference — architecture, webhook, REST endpoints, order meta |

## Development

```bash
npm install
npm run dev       # http://localhost:3000
```

## Build & Deploy

The site is automatically built and deployed to GitHub Pages on every push to `main`.

```bash
npm run build     # outputs static files to /out
```

Live URL: `https://yourpropfirm-fanbasis.github.io/plugin-documentation/`