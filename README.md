# Auliv Purifiers

Single-page marketing site for Auliv water purifiers. People browse residential and commercial models, then start a WhatsApp chat. There is no cart, checkout, or account.

## Run locally

```bash
npm install
npm run dev
```

The dev server is [http://127.0.0.1:4321](http://127.0.0.1:4321).

```bash
npm test     # catalog prices, contact details, no commerce copy
npm run lint
npm run build
npm run preview
```

## What’s on the page

- Home, Residential ROs (13), Commercial purifiers (8), AMC, Contact
- Prices and MRP from the product catalogs
- UV+UF badge on Auliv Elixir 1 and Auliv Elixir 2
- AMC Half-yearly and Yearly, marked New, with Coming soon prices
- WhatsApp, phone, Instagram, Facebook, and Monday–Saturday hours

Contact details live in `src/lib/contact.ts`. Product copy and prices live in `src/data/residential.json` and `src/data/commercial.json`.

WhatsApp links use `https://wa.me/918368879809` with a prefilled message that names the product or plan.

## Product images

Cards use illustrated placeholders. Do not hotlink another brand’s photos.

When white-background studio shots arrive, add a file under `src/assets/products/` named with the model slug, for example `auliv-grand-plus.webp`. The card swaps the illustration for that file automatically. Slugs are the model name in lowercase, with spaces as hyphens.

## Stack

React, TypeScript, Vite, and Tailwind CSS.
