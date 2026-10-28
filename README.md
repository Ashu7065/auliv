# Auliv Purifiers

Marketing site for Auliv water purifiers. The home page previews each range in a carousel. `/residential` and `/commercial` list every model. People enquire on WhatsApp. There is no cart, checkout, or account.

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

- Home hero, residential carousel (8 of 13), commercial carousel (6 of 8), AMC, Contact
- Full listings at `/residential` and `/commercial`
- Hero: morning kitchen with the Auliv Sapphire, WhatsApp, and one trust line
- Soft cyan wave under the hero only; commercial and AMC use alternating soft washes
- Prices and MRP from the product catalogs
- UV+UF badge on Auliv Elixir 1 and Auliv Elixir 2
- AMC Half-yearly and Yearly, marked New, with Coming soon prices
- WhatsApp, phone, Instagram, Facebook, and Monday–Saturday hours

Contact details live in `src/lib/contact.ts`. Product copy and prices live in `src/data/residential.json` and `src/data/commercial.json`.

WhatsApp links use `https://wa.me/918368879809` with a prefilled message that names the product or plan.

## Product images

Each residential and commercial card shows a white-background studio photo from `src/assets/products/`. The file name is the model name (`auliv_name`) as a slug: lowercase, with spaces and punctuation as hyphens. `Auliv Grand Plus` uses `auliv-grand-plus.png`. `productPhoto()` in `src/data/products.ts` resolves that file, and the card renders it with `object-contain` on a white background.

Do not hotlink another brand’s photos. Card copy is one short line so the price and WhatsApp button lead.

## Stack

React, TypeScript, Vite, and Tailwind CSS.
