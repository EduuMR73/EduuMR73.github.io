# Architecture

**Analysis Date:** 2026-08-13

## Pattern Overview

**Overall:** Single-Page Static HTML with Progressive Enhancement

**Key Characteristics:**
- Vanilla HTML, CSS, and JavaScript — no frameworks
- Progressive enhancement: works without JavaScript (semantic HTML)
- Module-based JavaScript using IIFE (Immediately Invoked Function Expressions) for encapsulation
- Design token system via CSS custom properties (variables)
- Intersection Observer API for performance-optimized scroll-based interactions
- Mobile-first responsive design with CSS Grid/Flexbox

## Layers

**HTML Structure Layer (Semantic Markup):**
- Purpose: Semantic document structure with proper accessibility (ARIA labels, semantic tags)
- Location: `index.html`
- Contains: 641 lines of semantic HTML5 with sections, articles, nav, header, footer
- Depends on: CSS for presentation, JavaScript for interactivity
- Used by: Browser rendering engine, assistive technologies, SEO crawlers

**Styling Layer (Design System):**
- Purpose: Visual presentation and responsive behavior through design tokens
- Location: `css/styles.css` (1297 lines)
- Contains: CSS variables (design tokens for color, spacing, typography, breakpoints), component styles, layout utilities
- Depends on: Google Fonts (Plus Jakarta Sans, JetBrains Mono)
- Used by: HTML elements, applied via class names

**JavaScript Interactivity Layer (Modular Features):**
- Purpose: Progressive enhancement of user experience through non-blocking interactions
- Location: `js/main.js` (196 lines)
- Contains: Self-contained feature modules (IIFE pattern), event handlers, DOM observers
- Depends on: HTML structure (via class/id selectors), browser APIs (IntersectionObserver, Clipboard API)
- Used by: Browser event loop and animation frame scheduling

**Assets Layer (Media & Resources):**
- Purpose: Project media, videos, documents
- Location: `assets/` (subdivided into `img/`, `video/`, `cv/`)
- Contains: WebP images, MP4 videos, PDF resume
- Used by: HTML img/video/a tags

## Data Flow

**Page Load Flow:**

1. Browser parses `index.html`
2. CSS loads (non-blocking Google Fonts via preconnect)
3. JavaScript loads deferred (loaded after DOM parse completes)
4. HTML renders semantic structure with lazy-loaded images (`loading="lazy"`)
5. JavaScript executes 6 independent modules:

**Module 1: Navigation Scroll Effect**
- Observes: `window.scroll` event
- Mutates: `.nav` element, adds/removes `nav--scrolled` class
- Outcome: Visual navbar styling change when scrollY > 10px

**Module 2: Hero Count-up Animation**
- Triggered: After 850ms (synced with CSS animation timing)
- Reads: `[data-count]` attributes
- Uses: `requestAnimationFrame` for smooth 600ms animation
- Respects: `prefers-reduced-motion` media query
- Outcome: Numbers animate from 0 to target value

**Module 3: Active Navigation by Section**
- Uses: IntersectionObserver on `section[id]` elements
- Maintains: Map of section ID → nav link selector
- Updates: Adds `nav--active` class to active link
- Outcome: Nav highlights current section as user scrolls

**Module 4: Scroll Reveals (Intersection-based Animation)**
- Uses: IntersectionObserver with `-60px` bottom margin
- Observed: All `.reveal` elements
- Action: Adds `reveal--visible` class on first intersection
- Unobserves: After firing (one-time trigger)
- Respects: `prefers-reduced-motion` setting
- Outcome: Staggered fade-in/slide animations as sections enter viewport

**Module 5: Lightbox Modal**
- Observed: `.lightbox-trigger` buttons (image thumbnails)
- Dialog: Native HTML `<dialog>` element
- Flow:
  1. Click trigger button → sets `data-full` URL to img src
  2. Calls `dialog.showModal()` → opens overlay
  3. Click close or backdrop → `dialog.close()`
  4. Restores focus to triggering button
- Outcome: Full-screen image viewer with keyboard/backdrop dismiss

**Module 6: Video Playback Management**
- Video Facade (SBL, Pokédex):
  1. Shows poster image initially
  2. Click → hides facade, unhides video, plays
  3. Video ends → pauses and shows facade again
- Emite Video Scroll Behavior:
  1. Button click → smooth scroll to video + play
  2. IntersectionObserver on all videos → pause when not visible
- Outcome: Lazy video loading, efficient memory use

**Clipboard Copy (Email Button):**
- Reads: `btn.dataset.copy` value
- Uses: Navigator Clipboard API (with silent fallback)
- Visual Feedback:
  1. Icon changes '⧉' → '✓'
  2. Class `btn-copy--done` applied
  3. After 2s: reverts icon and class
- Outcome: Copy-to-clipboard UX without page reload

## State Management

**Client-side State (All Transient, No Persistence):**
- Active nav link: Computed via IntersectionObserver (not stored)
- Scroll position: Browser native (no storage needed)
- Reveal animations: One-time CSS class toggle (not stored)
- Modal visibility: Native dialog element (browser-managed)
- Video playback: Video element internal state
- Last lightbox trigger button: Reference stored in closure (for focus restoration)

**No Database, API calls, or server communication:**
- Portfolio is fully static
- All data embedded in HTML (project descriptions, stats, stack)
- External links: GitHub, LinkedIn, live demo (navigation only)
- CV download: Static PDF file

## Key Abstractions

**Design Token System:**
- Purpose: Centralized, scalable styling values
- Examples: CSS custom properties in `:root` selector
  - `--bg-base`, `--bg-surface`, `--bg-elevated` (color hierarchy)
  - `--fs-hero`, `--fs-h2`, `--fs-body` (responsive typography scale with clamp())
  - `--sp-1` through `--sp-10` (spacing scale: 4px, 8px, 12px... 128px)
  - `--container: 1100px` (max-width constraint)
- Benefits: Single point of change for colors, spacing, responsive breakpoints

**Modular IIFE Pattern:**
- Purpose: Encapsulate related functionality without global namespace pollution
- Examples: `js/main.js` contains 6 IIFEs, each wrapping one feature
- Pattern:
  ```javascript
  ;(function() {
    // Private variables
    const state = {};
    // Private functions
    function handler() {}
    // Public bindings (via addEventListener, etc.)
    document.querySelector('.selector').addEventListener('click', handler);
  })();
  ```
- Benefits: No closure conflicts, predictable scoping, easy to add/remove features

**Component Classes (BEM-inspired):**
- Purpose: Semantic naming, scoped styling
- Examples:
  - `.nav__container`, `.nav__logo`, `.nav__links` (nav compound)
  - `.hero__title`, `.hero__line1`, `.hero__ctas` (hero section)
  - `.emite-grid`, `.emite-ficha`, `.emite-meta__label` (project card)
  - `.lightbox-trigger`, `.lightbox-close` (modal behaviors)
- Benefits: No style leaks, clear hierarchy, easy to locate CSS for a component

**Semantic HTML Sections:**
- Purpose: Accessibility, SEO, structure clarity
- Examples:
  - `<section id="hero">` → Main hero
  - `<section id="proyecto-destacado">` → Featured project (Emite)
  - `<section id="proyectos">` → More projects grid
  - `<section id="trayectoria">` → Experience & education timeline
  - `<section id="stack">` → Technology stack
  - `<section id="contacto">` → Contact section
  - `<dialog id="lightbox">` → Image modal
- Benefits: Native accessibility, hash-based navigation, SEO structure

## Entry Points

**Page Entry:**
- Location: `index.html`
- Triggers: User navigates to domain URL (GitHub Pages serves this)
- Responsibilities:
  1. Serves semantic HTML document
  2. Loads Google Fonts (non-blocking)
  3. Loads `css/styles.css` (render-blocking)
  4. Defers `js/main.js` (loaded after DOM parse)
  5. Includes structured data (JSON-LD Schema.org markup)

**Hash Navigation Entry Points:**
- `#hero` → Hero section
- `#proyecto-destacado` → Emite featured project
- `#proyectos` → More projects grid
- `#trayectoria` → Timeline section
- `#stack` → Technology stack
- `#contacto` → Contact form (mailto link)

**Browser API Entry Points:**
- Scroll event: Window scroll listener (nav effect)
- IntersectionObserver: Section visibility (active nav, reveals)
- Click events: Lightbox triggers, video facades, copy button
- Dialog: Native showModal/close methods

## Error Handling

**Strategy:** Graceful Degradation (Progressive Enhancement)

**Patterns:**

**1. No JavaScript Fallback:**
- Skip link is visible on focus even without JS
- All nav links work as hash navigation (native browser)
- All images are static (no lazy loading framework needed)
- Videos have poster images visible without playback
- Lightbox gracefully doesn't open (image links can be context-menu saved)
- Copy button is optional enhancement

**2. Missing Elements:**
- IIFE checks existence before operating:
  ```javascript
  const nav = document.querySelector('.nav');
  if (nav) { /* attach listener */ }
  ```
- Dialog checks both dialog and img exist before proceeding

**3. Motion Preferences:**
- Count-up checks `prefers-reduced-motion: reduce` and skips animation
- Reveal animations skip if motion is reduced
- Native CSS transitions respect this via media query

**4. Clipboard API Fallback:**
- Try/catch wraps navigator.clipboard.writeText()
- Failure is silent (no error display, just no feedback)

**5. Intersection Observer Support:**
- Feature detection: `if ('IntersectionObserver' in window)`
- Graceful skip if not available (older browsers)

## Cross-Cutting Concerns

**Accessibility:**
- ARIA labels on interactive elements: `aria-label`, `aria-modal`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Skip link: `.skip-link` for keyboard users
- Focus management: Lightbox restores focus on close
- Focus visible: `:focus-visible` outline styling
- Color contrast: Design tokens ensure sufficient contrast (light text on dark bg)
- Lazy loading: `loading="lazy"` on images for performance

**Performance:**
- CSS custom properties instead of pre-compiled values (smaller payload)
- Single external font file (Plus Jakarta Sans, JetBrains Mono)
- Non-blocking font load: `preload` with `onload` handler
- Lazy image loading: `loading="lazy"` on all project images
- WebP images: Modern format with small file size
- IntersectionObserver: Efficient scroll listeners (not polling)
- requestAnimationFrame: Smooth animations without jank
- Passive event listeners: `{ passive: true }` on scroll listener
- No third-party JS libraries (reducing payload)
- Deferred script loading: Main script loads after DOM parse

**Mobile Responsiveness:**
- Viewport meta tag: `viewport-width=device-width, initial-scale=1.0`
- Responsive typography: `clamp(min, preferred, max)` for heading sizes
- Mobile-first CSS: Base styles mobile, media queries for larger screens
- CSS Grid/Flexbox: Native responsive layout
- Touch-friendly: Interactive elements sized appropriately (lightbox, buttons)
- Video controls: Native HTML5 video with responsive sizing

**SEO & Structured Data:**
- Meta tags: `<meta property="og:*">` for Open Graph
- Twitter Card: `<meta name="twitter:*">` for Twitter sharing
- Canonical URL: `<link rel="canonical">`
- Structured data: JSON-LD `<script type="application/ld+json">` with Person and SoftwareApplication schema
- Semantic HTML: Proper heading hierarchy, section landmarks
- Sitemap: `sitemap.xml` file present
- Robots: `robots.txt` file present

**Localization:**
- Language: `lang="es"` on HTML element (Spanish)
- Content: All text is Spanish (no i18n system implemented)
- No locale-specific formatting applied (dates/numbers are hardcoded)

---

*Architecture analysis: 2026-08-13*
