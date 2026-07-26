# Screens

The Shadowing Plus app sits behind Supabase Auth and has no seed data, so a live
capture needs credentials and a populated account. Instead the screens here are
rebuilt as static HTML from the project's **own stylesheets**, read verbatim at
build time from `Code HQ/Shadowing Plus/web/src`:

- `app/home.css` (shell, sidebar, Cobalt Editorial tokens)
- `app/app/island/island.css` (Language Island)
- `app/phrases/phrases.css` (Phrase Bank)

The markup mirrors the real JSX (`Sidebar.tsx`, `IslandPieces.tsx`,
`PhraseBank.tsx`). Nothing about the look is invented. The only cosmetic
deviation is a `white-space: nowrap` on the "coming next" pill, noted in
`build.py`.

`public/shots/practice.png` is different: it is a **real screenshot** from
`Shadowing Plus/docs/screenshots/Practice.png`, cropped to 16:9.

`public/shots/pipeline.png` is a diagram, not a screen. It is drawn in the same
design language and every value on it comes from `README.md` and
`web/src/lib/pipeline/`.

## Re-render

```bash
python3 mockups/build.py
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1600,2700 \
  --virtual-time-budget=8000 --screenshot=mockups/raw.png \
  "file://$PWD/mockups/screens.html"
```

Then split `raw.png` into the three 3200x1800 slices (island, phrases, pipeline)
with PIL and write them to `public/shots/`.

## Capturing the pitch page itself

Headless screenshots of the deployed page come back blank unless
`--force-prefers-reduced-motion` is passed, because the scroll reveals never run
under virtual time. With that flag the page renders in its final state.
