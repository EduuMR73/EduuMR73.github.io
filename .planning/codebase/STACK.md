# Technology Stack

**Analysis Date:** 2026-08-13

## Languages

**Primary:**
- HTML5 - Semantic markup for portfolio page structure
- CSS3 - Styling with custom properties, grid, flexbox
- JavaScript (Vanilla/ES6+) - Client-side interactivity without frameworks

**Secondary:**
- None detected. No TypeScript, preprocessors, or additional languages.

## Runtime

**Environment:**
- Browser JavaScript runtime (all modern browsers; tested on desktop/mobile)
- No Node.js, serverless, or backend runtime required

**Package Manager:**
- None - Zero dependencies, no npm/yarn/pnpm
- No `package.json` or lockfile
- All code is hand-written vanilla

## Frameworks

**Core:**
- None - Pure HTML/CSS/JavaScript, no framework
- No React, Vue, Angular, Svelte, or similar

**Testing:**
- None - No test framework in the landing page itself
- (Note: Emite project mentioned has NestJS/Jest, but that's separate)

**Build/Dev:**
- None - No build tool (webpack, Vite, esbuild, etc.)
- No transpilation or bundling required
- Served directly as static files

## Key Dependencies

**None detected.**

The site uses only browser APIs:
- `IntersectionObserver` API - Scroll reveals and active nav detection
- `requestAnimationFrame` - Smooth count-up animations
- `Clipboard API` - Copy email to clipboard
- `<dialog>` HTML element - Lightbox modal
- `matchMedia` - `prefers-reduced-motion` accessibility check

## Configuration

**Environment:**
- GitHub Pages configuration only
- No `.env` files or environment variables
- Single deployment environment (public static hosting)

**Build:**
- No build configuration
- No webpack, Vite, tsconfig, babel, or similar config files
- Static files served as-is

## Platform Requirements

**Development:**
- Any text editor (VS Code recommended)
- Git for version control
- Python or Node.js only if running local web server (`python -m http.server` or similar)
- No build step required

**Production:**
- GitHub Pages hosting
- Git repository: `https://github.com/EduuMR73/EduuMR73.github.io`
- Branch: `master` (deployed automatically on push)
- Domain: `https://eduumr73.github.io`

## Asset Formats

**Images:**
- WebP format for optimal compression
- Location: `assets/img/`
- Lazy loading via `loading="lazy"` attribute

**Videos:**
- MP4 format, compressed to ≤8MB each
- Location: `assets/video/`
- Fast-start encoding for seekable preview
- Conditionally loaded (facade pattern: show image + play button, load video only on user click)

**Fonts:**
- Google Fonts (non-blocking async load with preconnect)
- Plus Jakarta Sans (400, 500, 700, 800) - Primary typeface
- JetBrains Mono (400, 500) - Monospace for code/stats
- Fallback: sans-serif system fonts

## Performance Characteristics

**Lighthouse Scores:**
- Performance: 95 (mobile, 4G throttling)
- Accessibility: 100
- SEO: 100

**Optimization Techniques:**
- No JavaScript frameworks or heavy libraries
- Preconnect to font services
- Image lazy loading
- Video lazy loading (facade pattern)
- Passive scroll listeners
- Respects `prefers-reduced-motion` for accessibility

---

*Stack analysis: 2026-08-13*
