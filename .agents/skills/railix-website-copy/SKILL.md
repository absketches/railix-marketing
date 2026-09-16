---
name: railix-website-copy
description: "Write and review Railix marketing copy, product positioning, German/English i18n, titles, metadata and social preview text."
---

# Website Copy And Positioning

Keep the site truthful, concrete and aligned with Railix product direction.

## Product Claims

1. Railix is a product-building system based on one executable visual model. Do not call it a
   hosted workflow runtime, diagram-to-code tool, generic automation canvas or low-code clone.
2. The core story is: model product behavior, verification, deployment, security and operations in
   one place; compile to portable standalone applications that run on infrastructure the team
   controls.
3. Creator can be described as keeping model changes compiling in the background, giving teams a
   live-dev feel with almost no deployment wait. Do not claim literal zero-time deploy.
4. Distinguish shipped/current behavior from product direction. Use "planned", "designed for" or
   "intended" when the site describes roadmap-level behavior.
5. Avoid inflated claims such as "production-ready", "fully automatic", "zero config" or "no
   infrastructure" unless the page has exact evidence and the product repo supports that status.

## Edit Copy

Update both `messages/de.js` and `messages/en.js` for any user-visible text controlled by
`data-i18n`. Keep German fallback HTML in sync with `messages/de.js` so pages work before
JavaScript runs.

For metadata changes, update the owning page head and the relevant language messages. Homepage
social previews must keep standard description, Open Graph and Twitter text aligned.

Prefer short sentences in heroes, nav, cards and CTAs. Longer explanatory text belongs on content
pages, not inside compact UI controls.

## Check

- Search for stale or one-language-only wording with `rg`.
- Run `node --check i18n.js` when message keys or i18n behavior changed.
- Run `git diff --check` before handoff.
