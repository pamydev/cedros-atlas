# WinnetouJS Application - AI Coding Instructions

This is a WinnetouJS web application that compiles HTML components (constructos) into reusable JS classes.

## Architecture Overview

- **Component System**: HTML components in `.wcto.html` files are compiled to `.wcto.js` classes by WBR (WinnetouJS Build Runtime)
- **Monorepo Structure**: Frontend lives in `winnetoujs/`, with shared contracts at `../contracts/`
- **Build Pipeline**: WBR transpiles constructos and bundles TypeScript with esbuild
- **Styling**: SCSS with CSS custom properties (`--background-color`, `--foreground-color`, `--accent-color`)

## Critical Development Workflow

```bash
# Development with watch mode
npm run wbr:dev

# SCSS compilation (outputs to ../public/css/)
npm run sass:dev

# Production builds
npm run wbr:prod && npm run sass:prod
```

**Important**: Copilot does not need to run bash script because it will be already running in background watch process by user.

## Component (Constructos) Patterns

### Creating Components

```html
<!-- src/common/common.wcto.html -->
<winnetou>
  <div id="[[div]]" class="{{class?:string}}">{{content?}}</div>
</winnetou>
```

### Using Components

```typescript
import { $div } from "./common/common.wcto";

const element = new $div({
  class: "mainDiv",
  content: "Hello",
}).create("#app").ids.div;
```

**Key Patterns**:

- First `id="[[name]]"` becomes the class name (`$name`)
- Props use `{{propName?:type}}` syntax (? = optional)
- `.create(selector)` renders to DOM, returns `{ids: {...}}`
- Multiple components per `.wcto.html` file are allowed

## Project Structure Conventions

```
src/
├── app.ts                    # Entry point with translation setup
├── strings.js               # i18n strings (W.strings export)
├── _app.scss                # Global app styles
├── common/
│   ├── common.wcto.html     # Reusable base components
│   └── common.wcto.js       # Auto-generated (hidden in VSCode)
└── [feature]/
    ├── [feature].ts         # Feature logic classes
    ├── [feature].wcto.html  # Feature components
    └── [feature].scss       # Feature styles
```

## Key Integration Points

### Path Aliases (jsconfig.json)

- `@libs/*` → `./libs/*` (utilities like fetch wrapper)
- `@contracts/*` → `../contracts/*` (shared TypeScript interfaces)

### Translation System

```typescript
// Required in app.ts entry point
updateTranslations({
  stringsClass: strings,
  translationsPublicPath: "/translations",
}).then(() => new app());
```

### SCSS Import Pattern

```scss
// sass/main.scss
@use "app"; // src/_app.scss
@use "fileExplorer/fileExplorer"; // src/fileExplorer/fileExplorer.scss
```

## Build Configuration

**win.config.json**: Controls WBR compilation

- `apps`: Entry points for esbuild bundling
- `outputDir`: Where bundles are written (`../public/js/`)
- `constructosSourceFolder`: Where to find `.wcto.html` files

**Critical**: Output paths reference `../public/` - this suggests the app serves from a parent directory structure.

## Development Guidelines

1. **Component Creation**: Always create `.wcto.html` in feature folders, never edit `.wcto.js` files
2. **Styling**: Use CSS custom properties exclusively for colors
3. **State Management**: Use WinnetouJS mutables for reactive state
4. **API Calls**: Use the fetch wrapper in `@libs/fetch` with TypeScript contracts
5. **File Organization**: Group related components, styles, and logic by feature

## Common Gotchas

- VSCode hides `.wcto.js` files but they must exist for imports to work
- WBR watch mode only watches `.wcto.html` changes, restart for config changes
- SCSS outputs to `../public/css/` - ensure this directory exists
- Translation setup is required before component rendering
