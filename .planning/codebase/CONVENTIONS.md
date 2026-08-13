# Coding Conventions

**Analysis Date:** 2026-08-13

## Overview

This codebase follows a vanilla HTML/CSS/JS architecture with no build tools or frameworks. All code is handwritten, semantic, and accessibility-first. The project prioritizes performance and progressive enhancement.

## Naming Patterns

**Files:**
- Lowercase with hyphens: `styles.css`, `main.js`, `index.html`
- Asset paths use descriptive names: `emite-1.webp`, `emite-demo.mp4`, `btn-emite-video`

**CSS Classes:**
- BEM-inspired variant: `{block}__{element}--{modifier}`
- Examples from `css/styles.css`:
  - `.nav__container` (block + element)
  - `.nav__link` (block + element)
  - `.nav--scrolled` (block + modifier)
  - `.hero__body` (block + element)
  - `.emite-grid` (hyphenated block name)
  - `.proyecto-card` (hyphenated block name)
  - `.btn--primary` (button + modifier)
  - `.btn--ghost` (button + modifier)
- Single-letter abbreviations in semantic contexts: `.mono` for monospace font, `.js` for JS-enabled state

**JavaScript Variables:**
- camelCase for variables: `sectionNavMap`, `runCountUp`, `allNavLinks`, `lastTrigger`, `dlgImg`
- camelCase for function names: `setActive()`, `closeLightbox()`, `showVideo()`, `showFacade()`
- CONST_CASE for configuration objects: `sectionNavMap` contains section→selector mappings

**HTML Data Attributes:**
- kebab-case for data attribute names: `data-count`, `data-src`, `data-full`, `data-alt`, `data-copy`
- Used to pass configuration from HTML to JavaScript without inline logic

**CSS Custom Properties:**
- Semantic naming with prefixes: `--bg-*`, `--text-*`, `--accent-*`, `--border-*`
- Scale tokens: `--sp-1` through `--sp-10` (spacing scale 4px–128px)
- Examples from `css/styles.css`:
  - `--bg-base: #161616`
  - `--text-primary: #F2F0EB`
  - `--accent: #E8C96D`
  - `--container: 1100px`
  - `--fs-hero: clamp(2.6rem, 7vw, 4.8rem)` (fluid typography)

## Code Style

**Formatting:**
- No formatter configured (prettier/eslint not used)
- Consistent 2-space indentation throughout
- Max line length implicit (typically 80–100 chars for readability)
- Semicolons used at end of statements
- Spaces around operators and after keywords

**Linting:**
- No ESLint or stylelint configuration
- Code review: manual inspection via HANDOFF.json tasks and commits

**CSS Organization:**
Logical sections with clear demarcation:
```css
/* ============================================================
   SECTION NAME
   ============================================================ */
```
- Reset/defaults at top
- Design tokens (CSS custom properties) early
- Layout components (container, grid)
- Typography
- Components (nav, buttons, cards)
- Responsive media queries within each section
- Animation/motion at end

**Mobile-First Approach:**
- Base styles are mobile
- `@media (min-width: 768px)` and higher for desktop
- Use of `clamp()` for fluid scaling: `font-size: clamp(1.8rem, 4vw, 2.6rem)`
- Responsive spacing via CSS variables

## Import Organization

**JavaScript (IIFE Pattern):**
Each functionality block is wrapped in an immediately-invoked function expression (IIFE) for scope isolation. All IIFEs are preceded by a semicolon to prevent accidental concatenation:

```javascript
// ── Nav scroll ──
;(function() {
  // isolated scope
})()

// ── Count-up sincronizado ──
;(function() {
  // isolated scope
})()
```

Files organized by feature (from `js/main.js`):
1. JS enabled indicator: `document.documentElement.classList.add('js')`
2. Nav scroll behavior
3. Count-up animation with reduced-motion check
4. Active nav link tracking via IntersectionObserver
5. Scroll reveals with IntersectionObserver
6. Lightbox image modal
7. Video facade (play button overlay)
8. Video autoplay/pause on scroll
9. Clipboard email copy

**HTML:**
- Single entry point: `index.html`
- CSS linked in `<head>`: `<link rel="stylesheet" href="css/styles.css">`
- JS deferred at end of `<body>`: `<script src="js/main.js" defer></script>`
- Structured Data (JSON-LD) at end of body

**CSS:**
- No imports (single file organization)
- All styles in `css/styles.css`
- Design tokens defined once in `:root`

## Error Handling

**Silent Fallbacks:**
Errors are caught and handled gracefully without alerting the user:

```javascript
// Clipboard copy with fallback
try {
  await navigator.clipboard.writeText(btn.dataset.copy);
  // success: update UI
} catch {
  // fallback silencioso - no error thrown
}
```

**Progressive Enhancement:**
- Lightbox checks for element existence: `if (!dialog || !dlgImg) return;`
- IntersectionObserver feature detection: `if ('IntersectionObserver' in window) { ... }`
- Reduced motion respected: `if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { ... }`
- Async/await used without polyfills (modern browser target)

**Null/Empty Checks:**
Elements are verified before use:
- `const closeBtn = document.querySelector('.lightbox-close');`
- `if (nav) { ... }` before adding event listeners
- `if (btnEmite && emiteVid) { ... }` before triggering actions

## Comments

**When to Comment:**
- Section headers with visual delimiters (80-char line of `=`)
- Inline comments for non-obvious behavior (`;// ── Feature name ──`)
- HTML sections marked with large block comments
- CSS sections clearly labeled

**Example Patterns:**

HTML section header:
```html
<!-- ============================================================
     CONTENIDO PRINCIPAL
     ============================================================ -->
```

JavaScript inline:
```javascript
// ── Count-up sincronizado con animación hero (t=850ms) ──
;(function() { ... })()
```

CSS section:
```css
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
```

**No JSDoc:** Vanilla code with descriptive function names instead of formal JSDoc comments.

## Accessibility

**Patterns:**
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ARIA labels where needed: `aria-label="Navegación principal"`, `aria-label="Copiar email al portapapeles"`
- Alt text on all images with context: `alt="Emite — dashboard con evolución de facturación"`
- Keyboard focus handling in lightbox: `lastTrigger?.focus()` after close
- Skip link for content navigation: `.skip-link` hidden by default, visible on `:focus`
- Form accessibility: `<button>` elements with `aria-label` instead of bare icons
- Reduced motion respect: CSS animations gated by `@media (prefers-reduced-motion: no-preference)`

**Focus Management:**
- Custom outline style: `outline: 2px solid var(--accent); outline-offset: 3px;`
- Modal dialog: `<dialog id="lightbox" aria-modal="true">`
- Proper focus return after modal close

## Typography

**System:**
- Display font: 'Plus Jakarta Sans' (modern, readable)
- Mono font: 'JetBrains Mono' (code/labels)
- Font loading: preload with fallback noscript tag
- Fluid sizing: `clamp()` for responsive headlines

**Classes:**
- `.mono` utility class applies monospace family and tabular-nums for data display

## Function Design

**Size:**
- Compact, single-responsibility functions (typically <30 lines)
- Example: `runCountUp()` handles just count animation

**Parameters:**
- Minimal parameters, data pulled from HTML/DOM where appropriate
- Configuration via data attributes rather than function parameters

**Return Values:**
- Most functions return `void` (side effects only)
- Early returns for guard clauses: `if (!dialog || !dlgImg) return;`

## Module Design

**Exports:**
- No module exports (no bundler)
- Global scope pollution minimized via IIFEs
- Only necessary globals: `document`, `window`, `navigator`

**Scope Isolation:**
All meaningful logic isolated in IIFEs. Zero global function definitions.

## State Management

**Where State Lives:**
- DOM state: CSS classes (`.nav--scrolled`, `.nav--active`, `.reveal--visible`, `.btn-copy--done`)
- Transient state: JavaScript variables within IIFE scopes (e.g., `lastTrigger`, `timer`)
- Persistent state: HTML data attributes (counts, copy text, image paths)

**State Mutations:**
- Direct DOM manipulation: `element.classList.add()`, `element.classList.remove()`
- CSS variable updates not used; CSS pseudo-classes and transitions handle visual states
- No state objects or frameworks

## Performance Patterns

**Lazy Loading:**
- Images: `loading="lazy"` attribute on `<img>` elements
- Fonts: non-blocking load via `onload` event with noscript fallback

**Event Optimization:**
- Passive listeners where appropriate: `{ passive: true }` on scroll events
- Event delegation via `document.querySelectorAll()` loops (small dataset)
- No event bubbling exploited; explicit targets

**Requestable Elements:**
- `window.requestAnimationFrame()` for smooth animations
- Browser paint optimization via RAF in count-up animation

**Avoid:**
- No debouncing/throttling (not needed at this scale)
- No lazy-loading of JavaScript (single main.js file)
- No caching headers configured in codebase (server-level concern)

---

*Convention analysis: 2026-08-13*
