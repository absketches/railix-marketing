---
name: railix-website-verification
description: "Verify and review Railix website changes through static checks, local serving, responsive/browser checks and social preview validation."
---

# Website Verification And Review

Choose evidence that can disprove the changed behavior.

## Static Checks

Run from repository root:

```sh
git diff --check
```

When JavaScript changed:

```sh
node --check i18n.js
```

When repeated navigation/header changed, inspect all HTML files and check for duplicate IDs within
each page.

## Local Preview

Use a short-lived server only when needed:

```sh
python3 -m http.server 18084 --bind 127.0.0.1
```

Verify relevant pages/assets:

```sh
curl -sS -I http://127.0.0.1:18084/index.html
curl -sS -I http://127.0.0.1:18084/styles.css
curl -sS -I http://127.0.0.1:18084/i18n.js
```

Stop the server before finishing. Do not leave preview processes running.

## Review

For review-only work, do not edit. For implementation, inspect the final diff before responding.
Report findings first with file/line, trigger and consequence. Say `No findings` when none
qualify.

Call out untested browser/mobile/social-preview behavior explicitly. Do not imply screenshot or
browser validation happened if it did not.
