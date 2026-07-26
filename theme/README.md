# Themes (design-system swap)

A pitch page's whole look comes from **one active brand file**: `app/theme.css`. It defines the semantic tokens (`--brand-page`, `--brand-heading`, `--brand-accent`, `--brand-font`, …). Every component references those roles, so swapping this one file swaps the entire design system. Components never change.

This folder is a **library of named themes**. To use one, copy its values into `app/theme.css`.

- `default.css` — the Figma "Sumin Kiim" indigo/dark template. The out-of-the-box look.
- `shadowing-plus.css` — a project's own design system, extracted from its repo. Proof that the swap works.

## How to give a project its own design system

1. **Extract the project's tokens.** From its Figma (Figma MCP), its codebase (`globals.css` / Tailwind theme / a tokens file), or a supplied list. The Pitch UI/UX Designer does this with the `reference-to-spec` skill.
2. **Write a theme file** here (`<project>.css`) mapping the project's values onto the semantic roles below.
3. **Activate it**: copy its `:root` block into `app/theme.css`.
4. **Font**: if the project uses a different font, also swap the `next/font` import in `app/layout.tsx` and point `--brand-font` at it.

That's the whole swap. Build and the page wears the project's design system.

## The semantic roles a theme must fill

| Token | Role |
| --- | --- |
| `--brand-page` | page background |
| `--brand-surface` | cards, panels |
| `--brand-line` | borders, dividers |
| `--brand-heading` | headings, primary text |
| `--brand-body` | body copy |
| `--brand-muted` | captions, secondary text |
| `--brand-accent` | the accent (lines, eyebrow, checks, metric numbers) |
| `--brand-accent-solid` | primary button fill, hero shape outlines |
| `--brand-accent-hover` | primary button hover |
| `--brand-accent-edge` | accent border |
| `--brand-accent-deep` | the filled hero shape |
| `--brand-on-accent` | text on an accent-solid surface (contrast) |
| `--brand-secondary` | secondary button fill |
| `--brand-secondary-edge` | secondary button border |
| `--brand-frame` | device bezel behind the scroll-tilt hero screenshot |
| `--brand-frame-edge` | device bezel border |
| `--brand-font` | body font (paired with the next/font import) |
| `--brand-font-heading` | heading font (may differ, e.g. a serif) |
| `--brand-heading-weight` / `--brand-heading-tracking` | heading weight + letter-spacing |
| `--brand-radius-btn` / `--brand-radius-card` | button + card radius |

Light or dark is just which values you set: a light theme sets `--brand-page` light and `--brand-heading` dark. Because components use roles, the same code renders either way.
