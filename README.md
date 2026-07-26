# Shadowing Plus pitch page

A standalone, animated project page for [Shadowing Plus](https://github.com/sumin6475/shadowing-plus):
what it is, why it exists, how it is built, and what is not proven yet. Built from
the Pitch Page Studio starter (`Code HQ/Pitch Page Studio/template/starter`).

- **Live app:** https://shadowing-plus.vercel.app
- **Source repo:** https://github.com/sumin6475/shadowing-plus

## Stack

- Next.js 15 (App Router) + TypeScript, fully static output
- Tailwind CSS v4, semantic tokens in `app/globals.css`, brand values in `app/theme.css`
- Framer Motion scroll reveals, with a real reduced-motion fallback

## Design

The active theme is Shadowing Plus's own design system, "Cobalt Editorial":
warm paper background, a single cobalt accent (`#3B6EE1`), Instrument Serif
display headlines at 400, Pretendard body text, pill buttons, layered warm
shadows. It lives in `app/theme.css`, copied from `theme/shadowing-plus.css`,
which was extracted from `Shadowing Plus/design-system/tokens.json`. Components
reference semantic roles only, so swapping that one file swaps the whole look.

## Content

All copy lives in `lib/content.ts`. Every claim traces to the real repo: the MVP
PRD, README, ARCHITECTURE, the migration ledger, the build journal, and
`npm test` output as of 2026-07-26. No invented metrics.

## Screens

`public/shots/` holds the visuals. See [`mockups/README.md`](mockups/README.md)
for how each one was produced, and which are real screenshots versus screens
rebuilt from the app's own stylesheets.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
```

## Deploy

Static, no env vars. See `Pitch Page Studio/template/DEPLOY.md`. Keep
`vercel.json`: it pins the Next.js framework preset, which a CLI-first deploy
otherwise gets wrong.
