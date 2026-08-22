# AGENTS.md — TMNT Arcade Devlog Web

## Stack

- Static site (no build step, no npm, no deps).
- Pure HTML/CSS/JS, served via GitHub Pages.
- Data is `window.*` globals loaded by `<script>` (no fetch, works file://).

## Key files

| File | Purpose |
|---|---|
| `data/devlog.js` | Devlog entries array (ES, canonical). **Add at top.** |
| `data/builds.js` | ROM download entries (ES, canonical). **Add at top.** |
| `assets/js/app.js` | Render + CONFIG + `I18N` UI strings. Update `CONFIG.repoUrl` for a different repo. |
| `index.html` | Uses `?v=YYYYMMDDx` query cache-busting. Bump suffix when editing. |

## Languages (i18n)

The site has three versions: **ES** at root (`index.html`), **EN** in `en/`, **pt-BR** in `pt/`. A switcher lives in the topbar nav of each page.

- Every page sets `window.LANG` (`"es" | "en" | "pt"`) and `window.SITE_ROOT` (`"./"` or `"../"`) before loading scripts.
- JS-generated strings (months, buttons, empty states) live in the `I18N` dict inside `app.js`.
- Translated data: `data/devlog.en.js`, `data/devlog.pt-br.js`, `data/builds.en.js`, `data/builds.pt-br.js`.
- **When adding a devlog entry or build, add it to ALL THREE language files** with identical `date`, media `src`, `file`, `version` and `status`; only `title/part/tags/captions/body/notes/highlights/codename` get translated.
- Tags/categories are translated per file and must be internally consistent within each language (`DEVLOG_CATEGORIES` ↔ entry tags).

## Devlog entry format

```js
window.DEVLOG = [{
  date: "2026-07-22",                          // ISO — used for sort
  part: "",                                     // optional: "noche", "tarde"
  title: "...",
  tags: ["Motor"],                              // must match DEVLOG_CATEGORIES
  media: [{ src: "screenshot.gif", caption: "..." }],  // optional; in assets/images/devlog/
  body: "Markdown: `code`, **bold**, *italic*, > blockquotes"
}];
```

Categories available: `Motor`, `Gameplay`, `Arte`, `Audio`, `Optimización`, `Infra`. Add to `window.DEVLOG_CATEGORIES` for new ones.

## Build entry format

```js
window.BUILDS = [{
  version: "v0.2.0", codename: "HUD & HP",
  date: "2026-07-20", status: "available" | "soon",
  file: "tmnt-md_scene1_v0.2.0.bin",    // file in roms/
  size: "",                              // empty = auto-calculated via HEAD
  notes: "...",  highlights: ["Feature"]
}];
```

## Commands

```bash
# Dev server (needed for ROM sizes HEAD requests)
python3 -m http.server 8000

# Deploy
./deploy.sh   # force-pushes to gh-pages
```

## Quirks

- `.nojekyll` at root for GH Pages.
- `roms/` placeholder files should be replaced with real builds.
- CSS cache-busting: `?v=YYYYMMDDx` in `<link>`/`<script>` tags of `index.html`.
