# Avietho Digital

Luxury editorial frontend for Avietho Digital — stories that move the world.

## Stack

- React 18 + TypeScript
- Vite 5
- TailwindCSS 3
- Framer Motion 11
- React Router 6

## Getting started

```bash
npm install
cp .env.example .env   # then edit values as needed
npm run dev
```

The app is served on `http://localhost:5173`.

## Environment variables

| Variable | Purpose | Safe to expose? |
| --- | --- | --- |
| `VITE_GA_ID` | Google Analytics 4 Measurement ID. Injected into `index.html` via Vite's `%VITE_GA_ID%` substitution and used by `useAnalytics` for SPA page tracking. | **Yes.** GA Measurement IDs are designed for client-side use. Protect by restricting property access + referrers in the Google Analytics console. |

Vite only exposes variables prefixed with `VITE_*` to client code. Anything
else stays out of the bundle. **Never** put secret keys (paid APIs, signing
secrets, database creds) in `VITE_*` variables — they will end up in the
browser. Use a backend / proxy for anything that must stay private.

`.env` is git-ignored. `.env.example` is committed as the template.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run type-check` | Run TypeScript without emitting files |

## Project structure

```
src/
  assets/            Static assets (images, fonts)
  components/
    cards/           Article, feature, spotlight, trending cards
    common/          Buttons, badges, container, logo, etc.
    layout/          Navbar, Footer, Layout shell
    sections/        Composed sections used by pages
  data/              Static content (articles, authors, navigation)
  hooks/             Reusable React hooks
  pages/             Top-level route components
  routes/            Route configuration
  styles/            Global CSS (Tailwind layers)
  types/             Shared TypeScript types
  utils/             Pure helpers (cn, formatDate, etc.)
  App.tsx
  main.tsx
```

## Design language

- **Palette** — matte black (`ink`), deep charcoal, bone ivory, soft gold accent, crimson highlight.
- **Typography** — Playfair Display (headlines), Cormorant Garamond (deks/quotes), Inter (UI).
- **Motion** — cubic-bezier(0.22, 1, 0.36, 1), Framer Motion stagger, image zoom on hover.
- **Layout** — generous gutters, large containers (max 1480px), editorial grids.

## Adding a story

Stories live in `src/data/articles.ts`. Add a new entry with a unique `id`, `slug`, and matching
`section` + `category`. The card, archive, and detail views will pick it up automatically.

## License

© Avietho Digital. All rights reserved.
