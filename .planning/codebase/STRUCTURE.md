# Codebase Structure

**Analysis Date:** 2026-08-13

## Directory Layout

```
EduuMR73.github.io/
├── .planning/                       # Project planning artifacts
│   ├── .continue-here.md           # Session continuity marker
│   ├── HANDOFF.json                # Handoff metadata
│   └── codebase/                   # (this directory for analysis docs)
├── assets/                         # Project media and documents
│   ├── cv/                         # Resume documents
│   │   └── CV-Eduardo-Moreno.pdf  # Current resume
│   ├── img/                        # Project images (WebP format)
│   │   ├── emite-1.webp           # Dashboard screenshot
│   │   ├── emite-1-full.webp      # Full-res dashboard
│   │   ├── emite-2.webp           # Invoices module screenshot
│   │   ├── emite-2-full.webp      # Full-res invoices
│   │   ├── emite-3.webp           # Mobile view screenshot
│   │   ├── emite-3-full.webp      # Full-res mobile
│   │   ├── emite-cover.webp       # Video poster
│   │   ├── emite-poster.webp      # Promotional image
│   │   ├── hamparo-cover.webp     # Hamparo project image
│   │   ├── og-image.png           # Social media OG image
│   │   ├── pokedex-poster.webp    # Pokédex project poster
│   │   ├── sbl-poster.webp        # Basketball game poster
│   │   └── sbl-poster-vertical.webp # Mobile poster variant
│   └── video/                      # Project demo videos (MP4)
│       ├── emite-demo.mp4         # Emite SaaS demo
│       ├── pokedex-demo.mp4       # Pokédex app demo
│       └── sbl-demo.mp4           # Basketball game demo
├── css/
│   └── styles.css                 # All styling (1297 lines)
├── js/
│   └── main.js                    # All JavaScript (196 lines)
├── .gitkeep                       # Files in subdirectories (empty markers)
├── favicon.svg                    # Browser tab icon
├── index.html                     # Main entry point (641 lines)
├── robots.txt                     # SEO crawler instructions
├── sitemap.xml                    # Site structure for SEO
├── PLAN_PORTFOLIO.md              # Portfolio planning document
├── README.md                      # GitHub repo description
└── package.json                   # (if present, for GitHub Pages config)
```

## Directory Purposes

**`.planning/` — Project Planning Artifacts:**
- Purpose: Store planning documents and handoff metadata for this project
- Contains: Session continuity markers, handoff data, codebase analysis documents
- Key files: `.continue-here.md` (tracks session state), `HANDOFF.json` (metadata), `codebase/` (GSD mapper output)

**`assets/cv/` — Resume Documents:**
- Purpose: Store downloadable professional documents
- Contains: PDF resume
- Key files: `CV-Eduardo-Moreno.pdf` (linked from hero section and contact)

**`assets/img/` — Project Screenshots & Promotional Images:**
- Purpose: Visual media for project cards, hero section, social media
- Contains: WebP images (optimized format, smaller file size than PNG/JPG)
- Key files:
  - `emite-*.webp` — Emite SaaS dashboard, invoices module, mobile view (with full-res variants)
  - `hamparo-cover.webp` — Android healthcare app
  - `pokedex-poster.webp` — Pokédex app
  - `sbl-poster*.webp` — Basketball arcade game (horizontal and vertical)
  - `og-image.png` — Open Graph image for Twitter/LinkedIn share preview
- Naming pattern: `{project-name}` + optional `-{variant}` (e.g., `-1`, `-full`, `-vertical`)

**`assets/video/` — Project Demo Videos:**
- Purpose: Auto-playing demo walkthroughs embedded in project cards
- Contains: MP4 videos (HTML5 native video)
- Key files:
  - `emite-demo.mp4` — Main Emite demo (2:35, in hero section)
  - `sbl-demo.mp4` — Basketball game demo
  - `pokedex-demo.mp4` — Pokédex app demo
- Usage: Video elements with lazy `preload="none"`, poster images for reduced initial load

**`css/` — All Styling:**
- Purpose: Centralized CSS for the entire portfolio
- Contains: Single `styles.css` file with design tokens, component styles, responsive layout
- Key sections:
  - Design tokens (CSS variables): colors, typography scale, spacing scale, breakpoints
  - Reset/base styles
  - Layout utilities (container, grid, flexbox)
  - Navigation bar styling
  - Hero section
  - Project cards and grids
  - Lightbox modal
  - Timeline components
  - Responsive breakpoints (mobile, tablet, desktop)
- Line count: 1297 lines
- No preprocessor: Pure CSS with custom properties (no Sass, Less, etc.)

**`js/` — All JavaScript:**
- Purpose: Centralized interactive features using modular IIFE pattern
- Contains: Single `main.js` file with 6 independent modules
- Key modules:
  1. **Nav scroll effect** — Adds visual feedback when scrolling
  2. **Count-up animation** — Animates stats numbers (hero section)
  3. **Active nav by scroll** — Highlights current section in navigation
  4. **Scroll reveals** — Fade-in animations as sections come into view
  5. **Lightbox modal** — Full-screen image viewer for project screenshots
  6. **Video management** — Facades, auto-pause on scroll, button-triggered play
  7. **Clipboard copy** — Email copy button with visual feedback
- Line count: 196 lines
- No frameworks: Pure vanilla JavaScript, browser APIs only

**Root Directory — Configuration & Entry:**
- `index.html` (641 lines) — Main HTML document, single entry point
- `favicon.svg` — Browser tab icon (SVG, scalable)
- `robots.txt` — Instructions for search engine crawlers
- `sitemap.xml` — Explicit site structure for SEO indexing
- `PLAN_PORTFOLIO.md` — Portfolio planning/brainstorm document (not served)
- `README.md` — GitHub repository description

## Key File Locations

**Entry Points:**
- `index.html` — Browser loads this file. GitHub Pages serves it as the root.

**Configuration Files:**
- `robots.txt` — `Allow: /` (crawlers welcome everywhere)
- `sitemap.xml` — Lists all sections: `/`, `#hero`, `#proyecto-destacado`, etc.
- `favicon.svg` — Displayed in browser tab and bookmarks

**Core Logic:**
- `js/main.js` (196 lines) — All JavaScript functionality (scroll listeners, observers, event handlers)
- `css/styles.css` (1297 lines) — All visual styling (layout, typography, components, responsive design)

**HTML Structure:**
- `index.html` — Single document containing:
  - Navigation header with hash links
  - Hero section with stats (17 modules, 268 tests, 4 projects)
  - Featured project: Emite (with video, thumbnails, metadata)
  - Grid of 3 additional projects: Hamparo, SBL, Pokédex
  - Timeline of experience and education
  - Technology stack section
  - Contact section with email and social links
  - Footer with copyright
  - Lightbox modal (hidden by default)
  - JSON-LD structured data for SEO

**Media Assets:**
- `assets/img/emite-1.webp`, `emite-1-full.webp` — Dashboard image pair (thumbnail + full-res)
- `assets/img/emite-2.webp`, `emite-2-full.webp` — Invoices module image pair
- `assets/img/emite-3.webp`, `emite-3-full.webp` — Mobile view image pair
- `assets/img/hamparo-cover.webp` — Single project cover
- `assets/img/pokedex-poster.webp` — Single project poster
- `assets/img/sbl-poster.webp`, `sbl-poster-vertical.webp` — Two variants for responsive display
- `assets/video/emite-demo.mp4` — Featured video in hero section
- `assets/video/sbl-demo.mp4`, `pokedex-demo.mp4` — Additional demo videos
- `assets/cv/CV-Eduardo-Moreno.pdf` — Downloadable resume

## Naming Conventions

**HTML Files:**
- Lowercase with hyphens: `index.html` (only one, root)
- Section IDs use hyphens: `id="proyecto-destacado"`, `id="trayectoria"`, `id="contacto"`
- Class names use BEM pattern: `.nav__logo`, `.hero__title`, `.emite-grid`, `.lightbox-trigger`

**CSS Files:**
- Lowercase with `.css` extension: `styles.css`
- CSS variable names (design tokens) use double-dashes and descriptive hyphens:
  - `--bg-base`, `--bg-surface`, `--bg-elevated` (color groups)
  - `--text-primary`, `--text-secondary`, `--text-muted` (text tiers)
  - `--fs-hero`, `--fs-h2`, `--fs-body`, `--fs-small` (font size scale)
  - `--sp-1` through `--sp-10` (spacing 4px to 128px)
  - `--container`, `--px-mobile`, `--px-desktop` (layout)
- Class names use:
  - **Utility classes**: `.mono` (font-family monospace)
  - **BEM blocks**: `.nav`, `.hero`, `.emite-grid`, `.proyecto-card`, `.timeline`
  - **BEM elements**: `__container`, `__title`, `__ctas` (child components)
  - **BEM modifiers**: `--scrolled`, `--active`, `--visible`, `--done` (state changes)
  - **Feature classes**: `.reveal`, `.lightbox-trigger`, `.card-facade`, `.skip-link`

**JavaScript Files:**
- Lowercase with `.js` extension: `main.js`
- Function names use camelCase: `runCountUp`, `setActive`, `closeLightbox`, `showVideo`
- Variable names use camelCase: `sectionNavMap`, `revealObserver`, `lastTrigger`
- Constants use UPPERCASE: `const duration = 600;`
- Element selectors target classes/IDs: `.nav`, `#lightbox-img`, `.reveal`, `[data-count]`

**Image Files (WebP format):**
- Lowercase with hyphens: `emite-1.webp`, `hamparo-cover.webp`, `sbl-poster-vertical.webp`
- Naming pattern: `{project-name}-{descriptor}.webp` (e.g., `emite-poster`, `pokedex-demo`)
- Full-resolution variants: `-full` suffix (e.g., `emite-1-full.webp` for lightbox display)
- Poster/cover images: `-cover` or `-poster` suffix

**Video Files (MP4 format):**
- Lowercase with hyphens: `emite-demo.mp4`, `sbl-demo.mp4`
- Pattern: `{project-name}-demo.mp4`

**Document Files:**
- Uppercase with `.md` extension: `README.md`, `PLAN_PORTFOLIO.md`
- Planning docs: `PLAN_PORTFOLIO.md` (brainstorm/tracking)

**Configuration Files:**
- Lowercase without extension: `robots.txt`, `sitemap.xml`
- SVG assets: `favicon.svg`
- JSON-LD: Embedded in `<script type="application/ld+json">` within `index.html`

## Where to Add New Code

**New Feature (JavaScript Interactivity):**
- **Primary code:** `js/main.js`
- **Pattern:** Wrap in IIFE to avoid global namespace pollution:
  ```javascript
  ;(function() {
    // Feature-specific code here
    const elements = document.querySelectorAll('.my-feature');
    elements.forEach(el => {
      el.addEventListener('click', handleClick);
    });
    function handleClick(e) {
      // handler logic
    }
  })();
  ```
- **Testing:** No test framework present; manual testing in browser
- **Error handling:** Check element existence before attaching listeners; wrap Clipboard API in try/catch

**New Component/Section (HTML + Styling):**
- **HTML:** Add `<section id="new-section">` to `index.html` body (maintain semantic structure)
- **Styling:** Add component styles to `css/styles.css`:
  - Define design token variables if introducing new colors/spacing
  - Use BEM class naming: `.new-component`, `.new-component__child`
  - Add responsive breakpoints via `@media (min-width: 768px)` queries
  - Reference design tokens (e.g., `var(--sp-4)` instead of hardcoded `16px`)
- **Navigation:** Update nav links in header if adding new major section

**New Project Card:**
- **HTML:** Add `<article class="proyecto-card">` to `#proyectos` grid
- **Images:** Add WebP files to `assets/img/` (e.g., `newproject-cover.webp`, `newproject-1.webp`, `newproject-1-full.webp`)
- **Videos:** Add MP4 to `assets/video/` if demo needed (e.g., `newproject-demo.mp4`)
- **Styling:** Use existing `.proyecto-card`, `.card-media`, `.proyecto-stack` classes (no new CSS needed)

**New Utility/Helper (JavaScript):**
- **Primary code:** `js/main.js`
- **Pattern:** Define helper functions within the relevant IIFE module, or create a new IIFE for utilities
- **Naming:** Use camelCase: `copyToClipboard()`, `smoothScroll()`, `parseDate()`
- **Scope:** Keep within IIFE closure; don't pollute global scope

**Assets (Images, Videos, Documents):**
- **Images:** `assets/img/{project-name}-{variant}.webp`
  - Use WebP format for all product/screenshot images (smaller than PNG/JPG)
  - Provide both standard and full-resolution variants for lightbox
  - Poster images for video elements (e.g., `assets/img/project-poster.webp`)
- **Videos:** `assets/video/{project-name}-demo.mp4`
  - Use MP4 format (native HTML5 support)
  - Keep duration short (2-3 minutes recommended for portfolio demos)
  - Set `preload="none"` to reduce initial load
- **Documents:** `assets/cv/{Document-Name}.pdf`
  - Current: `CV-Eduardo-Moreno.pdf`

**Responsive Adjustments:**
- **Mobile (< 768px):** Use base styles in main CSS rules
- **Tablet/Desktop (≥ 768px):** Add `@media (min-width: 768px) { }` rules
- **Very Large (≥ 1200px):** Additional breakpoint if needed
- **Reference:** Design tokens `--px-mobile: 24px` (mobile padding), `--px-desktop: 48px` (larger padding)

## Special Directories

**`.planning/` — Planning & Handoff:**
- Purpose: Store GSD workflow artifacts (planning docs, session continuity)
- Generated: Yes (created by GSD mapper agent)
- Committed: Yes (tracked in git)
- Contents:
  - `.continue-here.md` — Session continuity marker
  - `HANDOFF.json` — Metadata for agent handoffs
  - `codebase/` — Analysis documents (ARCHITECTURE.md, STRUCTURE.md, etc.)

**`assets/` — Media & Resources:**
- Purpose: Store all non-code files (images, videos, documents)
- Generated: No (manually curated)
- Committed: Yes (all committed to git)
- Subdirectories:
  - `assets/img/` — Project screenshots and promotional images (WebP)
  - `assets/video/` — Demo video walkthroughs (MP4)
  - `assets/cv/` — Professional documents (PDF)
- `.gitkeep` files: Mark directory existence in git (empty placeholder)

**`node_modules/` — (If Present):**
- Not present in current state
- Would be generated if package.json is added and `npm install` runs
- Should be added to `.gitignore` (standard practice)

**`dist/` or `build/` — (Not Present):**
- Not applicable; portfolio is fully static
- No build process or bundler in use
- All files are served as-is from git

## Maintenance Notes

**Static Site Hosting (GitHub Pages):**
- Root: `index.html` served at `https://EduuMR73.github.io/`
- Hash navigation: `#hero`, `#proyecto-destacado` etc. work natively (no routing library needed)
- Caching: GitHub Pages caches assets; manual cache busting not typically needed

**SEO & Discovery:**
- `robots.txt` — Allows all crawlers
- `sitemap.xml` — Lists all sections for search indexing
- JSON-LD in `index.html` — Structured data for Google, LinkedIn, etc.
- Open Graph meta tags — Social media share previews
- Twitter Card meta tags — Twitter-specific sharing

**Performance Optimization Already In Place:**
- WebP images — Modern format, smaller file sizes
- Lazy loading — `loading="lazy"` on images
- Deferred script load — `<script defer>` on main.js
- Non-blocking fonts — Google Fonts preload with `onload` handler
- Passive event listeners — `{ passive: true }` on scroll listener
- IntersectionObserver — Efficient scroll-based triggers (not polling)

**Future Scaling Considerations:**
- If adding many more projects, consider paginating the grid
- If adding more JavaScript, consider organizing into separate files (imports via script tags)
- If adding CSS, consider splitting into component files (concatenate during build if needed)
- No CDN currently in use; all assets self-hosted on GitHub Pages

---

*Structure analysis: 2026-08-13*
