# AGENTS.md — AI Assistant Guide for easy-blog

## Project Overview

Custom **static site generator** built in TypeScript. Converts Markdown files with YAML front-matter into a complete static HTML site using EJS templates. Deployed at `qitry.vip`.

## Quick Start

```bash
npm run build    # Build the site
npm run lint     # Lint TypeScript files
npm run dev      # Serve + watch (live-server + chokidar)
```

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 6.x (CommonJS, strict mode) |
| Runner | ts-node |
| Package mgr | npm |
| Template | EJS |
| Markdown | marked + front-matter |
| Linter | ESLint (flat config) |
| Dev server | live-server + chokidar-cli |
| Client | Prism.js (CDN), github-markdown-css (CDN) |

## Directory Layout

```
build.ts              # Build entry point
src/
  config.ts           # Site config (paths, columns, metadata)
  database.ts         # Post hash persistence (Database class)
  processor.ts        # Markdown parsing & front-matter extraction
  renderer.ts         # EJS template rendering (Renderer class)
  utils.ts            # Utilities (getHash, ensureDir, PostData type)
templates/
  layout.ejs          # Master layout (nav, footer, head, inline CSS)
  index.ejs           # Homepage (avatar, bio, latest 5 posts)
  post.ejs            # Single article page
  archive.ejs         # Full archive with client-side search
  column.ejs          # Column/category listing
posts/                # Markdown source files (*.md)
dist/                 # Build output (static HTML)
database.json         # Persisted post metadata (filename → hash, title, cached HTML)
```

## Key Patterns & Conventions

### Code Style
- 4-space indentation, single quotes, mandatory semicolons
- ESLint: `@eslint/js` recommended rules
- Class-based design with private fields for stateful modules (`Database`, `Renderer`)
- Functional modules for stateless logic (`processPosts`, `getHash`, `ensureDir`)
- Interfaces for type safety (`Config`, `PostData`, `DatabaseData`, `FrontMatterAttributes`)
- Sync file ops (`fs.readFileSync` / `fs.writeFileSync`) — build-time only

### Post Content Format
```markdown
---
title: Post Title
date: 2026-04-06
column: 精品文章
---
Markdown content here...
```

Columns: `闲言碎语` (casual), `精品文章` (featured), `技术随笔` (tech)

### URL Strategy
- Posts use content-addressed URLs: `/posts/<7-char-md5-hash>.html`
- Hash is computed from the **filename** (stable across content changes)
- Persisted in `database.json` for consistency across builds

### CSS Conventions
- Inline minified CSS in `layout.ejs` (no external stylesheets)
- Short class names: `.c`, `.n`, `.t`, `.b`, `.h`, `.l`, `.i`, `.a`, `.lk`, `.ct`, `.cl`
- Responsive: `@media(max-width:560px)` breakpoint
- Accent color: `#3b82f6`; Background: `#fafaf9`; Text: `#1a1a1a`
- Max-width: 680px; Font: `-apple-system, BlinkMacSystemFont, Inter, "Segoe UI", sans-serif`

## Build Process (build.ts)

1. Read all `.md` files from `posts/`
2. Parse YAML front-matter via `front-matter`
3. Convert Markdown body to HTML via `marked` (with GFM heading IDs)
4. Compute/retrieve 7-char MD5 hash for each post
5. Render EJS templates (index, post, archive, column) with `layout.ejs` wrapper
6. Write static HTML to `dist/`
7. Print build summary (file count, sizes, timing)

## Important Constraints

- **TypeScript 6.x** — potentially breaking changes vs 5.x
- **No test suite** — `npm test` is a placeholder
- **CommonJS** — `"type": "commonjs"` in package.json
