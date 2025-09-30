# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal static website built with 11ty (Eleventy) v3.0 featuring a minimalist design (<100kb per page). The site includes personal/professional information, resume, projects, and writing.

## Build & Development Commands

### Development
- `npm run build:dev` - Build site (outputs to `public/`)
- `npm run build:dev:watch` - Build with watch mode for auto-rebuild
- `npm run serve` - Serve locally with HTTPS at https://localhost:8080

### Production
- `npm run build:prod` - Build for production (outputs to `../gooseus.github.io`, minifies CSS, bundles JS)
- `npm run build:prod:watch` - Production build with watch mode

**Note:** Production builds:
1. Minify resume CSS with `cleancss`
2. Bundle JavaScript with `rollup` (converts `js/index.js` to `js/bundle.js` as IIFE)
3. Output to sibling directory `../gooseus.github.io` instead of `public/`

### Local HTTPS Setup
Site requires SSL certificates for local development:
```bash
mkcert -install
mkcert localdev.goose.us "*.localdev.goose.us" localhost 127.0.0.1 ::1
```

## Architecture

### Build Environment Control
The `BUILD_ENV` environment variable controls behavior throughout:
- **Development** (`BUILD_ENV=development`): Outputs to `public/`, loads unbundled `js/index.js`
- **Production** (`BUILD_ENV=production`): Outputs to `../gooseus.github.io`, loads bundled `js/bundle.js`

Exposed via `_data/environment.js` and accessible in templates as `environment.is_production`.

### Template System
- **Layout**: Single EJS template at [_includes/layout.ejs](_includes/layout.ejs)
- **Frontmatter**: Pages define `section`, `nav`, license metadata
- **Helper functions in layout**:
  - `is_defined(key)` - Check if variable exists
  - `if_exists(key, elseVal)` - Return value or default
  - `if_eq(a, b, ifVal, elVal)` - Conditional value based on equality

### Content Structure
- Content pages are Markdown files with frontmatter (`.md`)
- Enhanced with `markdown-it-attrs` for class attributes (`{.classname}` syntax)
- Navigation defined in layout frontmatter
- Sections: `projects/`, `thoughts/`, `resume/`

### JavaScript Architecture
- **TypeScript sources** in `src/*.ts` compiled to `js/*.js`
- **No bundler in dev**: Uses native ES modules via `<script type="module">`
- **Production bundling**: Rollup creates IIFE bundle at `js/bundle.js`
- **Current functionality**: Minimal - smooth scrolling for anchor links and footnote placeholders

### Static Assets
Passthrough copies configured in [.eleventy.js](.eleventy.js):
- `CNAME`, `favicon.png`
- `files/`, `images/`, `css/`, `js/`
- `resume/css/`, `resume/images/`

## 11ty Configuration

Located at [.eleventy.js](.eleventy.js):
- Uses `@11ty/eleventy-plugin-ejs` for EJS support
- HTTPS dev server configuration (uses mkcert certificates)
- Output directory switches based on `BUILD_ENV`
- Input directory is project root (`.`)

## Important Notes

- **Dual output strategy**: Development builds to `public/`, production to `../gooseus.github.io`
- **No tests configured**: `npm test` returns error
- **Publishing**: Uses `rsync` to sync `public/` to `$DEST_FOLDER` (environment variable)
- **TypeScript**: Plain TS files in `src/`, no formal compilation step configured
- **Dependencies**: No runtime dependencies, only devDependencies
