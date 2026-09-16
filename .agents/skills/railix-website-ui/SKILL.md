---
name: railix-website-ui
description: "Build and review the static Railix website UI: HTML structure, CSS layout, responsive behavior, navigation and accessibility."
---

# Static Website UI

Keep the site small, responsive and readable. This is a static marketing site, not an application
shell.

## Build

1. Use plain HTML, CSS and the existing `i18n.js`. Do not add frameworks, bundlers, icon libraries
   or client-side routing unless explicitly requested.
2. Scope CSS to the changed component or page. Avoid broad selectors that alter unrelated pages.
3. Keep desktop and mobile behavior intentional. For header/menu work, verify no-JS fallback,
   keyboard access, focus state and `aria-expanded`.
4. Preserve the existing visual system: restrained cards, 8px-or-less radii, teal/orange accents,
   light paper surfaces and product imagery. Do not turn operational/product pages into landing
   page ornament.
5. Text must fit on mobile. Avoid long labels inside narrow controls; prefer dropdowns or vertical
   lists when nav cannot fit.
6. Do not hide content behind JavaScript-only interactions unless a non-JS fallback remains
   reachable.

## Structure

Repeated header/footer markup exists in each HTML file. When changing nav structure, update every
page consistently:

- `index.html`
- `model.html`
- `run-anywhere.html`
- `use-cases.html`
- `security.html`
- `team.html`
- `contact.html`

Keep per-page active nav state correct.

## Check

- Run `git diff --check`.
- Run `node --check i18n.js` when JavaScript changed.
- For layout changes, serve locally with `python3 -m http.server 18084 --bind 127.0.0.1`, inspect
  desktop and narrow widths when possible, then stop the server.
