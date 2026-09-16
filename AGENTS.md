# Railix Website

Read the relevant skills before changes; open the linked files directly if your tool does not discover them:

- [Copy](.agents/skills/railix-website-copy/SKILL.md): product positioning, page copy, German/English i18n, metadata.
- [UI](.agents/skills/railix-website-ui/SKILL.md): static HTML/CSS, responsive layout, navigation, accessibility.
- [Assets](.agents/skills/railix-website-assets/SKILL.md): images, video loops, posters, favicon and social previews.
- [Verification](.agents/skills/railix-website-verification/SKILL.md): checks, local preview, review, link/social validation.

Each skill contains its own rules and checks; combine skills only when the task spans their scopes.
Run commands from repository root. Consult [README](README.md) for structure. Use the Railix
product repo docs only as background for product truth, not as a source of website implementation
rules.

## Working Rules

- Preserve unrelated work. Resolve repository facts yourself; ask before material design, product
  positioning, or scope changes.
- Make the smallest working change through the owning static boundary: page HTML, shared CSS,
  language messages, JavaScript, or `public/` assets.
- Keep fallbacks and enhanced behavior aligned. The checked-in German HTML must remain usable
  before JavaScript runs.
- Report actual verification and gaps. Stop task-owned preview servers before finishing.
- Review the intended diff before publication. Commit, push, deployment and PR creation each need explicit, single-use permission.
