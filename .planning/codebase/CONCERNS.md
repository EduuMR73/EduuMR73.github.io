# Codebase Concerns

**Analysis Date:** 2026-08-13

## Tech Debt

**Monolithic CSS without modularization:**
- Issue: All 1,298 lines of CSS in a single file (`css/styles.css`) without logical sections or component-level splitting
- Files: `css/styles.css`
- Impact: Difficult to locate rules quickly; high cognitive load during edits; no scoping isolation (all rules compete globally); hard to measure stylesheet bloat per feature
- Fix approach: While this works fine for a single-page site at this scale, consider organizing sections into CSS Grid blocks or converting to CSS Modules if the site grows to multiple pages. Current size (~30KB) is within budget; only refactor if maintenance becomes difficult.

**Multiple IntersectionObserver instances:**
- Issue: Three separate IntersectionObserver instances created for independent features (nav active state, scroll reveals, video pause), each with individual entry processing
- Files: `js/main.js` lines 34–67, 70–93, 156–173
- Impact: Minor memory overhead; callbacks fire redundantly; harder to debug intersection behavior; if a DOM element matches multiple selectors, multiple observers trigger
- Fix approach: Consider unifying into one observer with a dispatch system that handles all intersection cases. Not urgent (current performance is good), but worth refactoring if more intersection-based features are added.

**Silent error handling in clipboard functionality:**
- Issue: Clipboard API failure caught but silently ignored (line 191-192 in `js/main.js`): `catch { // fallback silencioso }`
- Files: `js/main.js` lines 176–195
- Impact: User clicks "copy" button, nothing happens, no feedback that it failed. Older browsers without Clipboard API show no error.
- Fix approach: Add a data attribute to detect Clipboard API support; fall back to a text selection + manual copy prompt if not available. Or: show an error toast/fallback message "Copiar manualmente: [email]" on failure.

**Hard-coded dates requiring manual updates:**
- Issue: Year "2026" appears in multiple places: nav active state, timeline dates, footer, meta tags, JSON-LD
- Files: `index.html` (lines 164, 178, 259, 335, 392, 401, 432, 636), `PLAN_PORTFOLIO.md`
- Impact: When 2027 arrives, the site looks outdated; timeline dates for "feb–may 2026" show as past events. Recruiters will assume the site hasn't been maintained.
- Fix approach: Create a date utility function (or just update manually each year, realistically). If automating: inject current year via JS into timeline items, or use a build step to replace `${YEAR}` tokens.

## Known Bugs

**Lightbox focus management race condition:**
- Symptoms: After closing lightbox, focus should return to the trigger button. If the button is removed from DOM or becomes invisible between open and close, focus is lost.
- Files: `js/main.js` lines 96–128
- Trigger: (1) Open lightbox, (2) navigate away, (3) close dialog without reopening
- Workaround: Focus currently falls to document root (acceptable but not ideal UX)
- Fix approach: Store focus target in a safe way; validate it exists before calling `.focus()`. Use a try-catch or existence check.

**Count-up timing dependent on hero animation:**
- Symptoms: Stats count animation expects hero to have loaded within 850ms. If page is slow, count-up starts before hero is visible.
- Files: `js/main.js` lines 12–31; `css/styles.css` lines 1056–1094
- Trigger: Slow network (3G), JavaScript parsing delays
- Workaround: None; counting happens regardless of viewport visibility
- Fix approach: Tie count-up to scroll visibility (IntersectionObserver) instead of hard-coded timeout. Or: ensure timeout only fires if hero is visible.

## Security Considerations

**Email address exposed in plain text:**
- Risk: Email `eduumr@gmail.com` (line 545 in `index.html`) is publicly visible and indexed by search engines. Harvested by email scrapers for spam/phishing.
- Files: `index.html` lines 545, 619
- Current mitigation: None. Email is intentionally public (contact channel).
- Recommendations: This is by design and appropriate for a portfolio. If spam becomes an issue later: (1) consider a contact form with server-side validation, or (2) use `&#64;` entity encoding (offers zero real protection but satisfies checklist). Best: keep it as-is; spam is a feature of having a public presence.

**Google site verification token visible in HTML:**
- Risk: Token in meta tag (line 5) could theoretically be reused by attackers if site is compromised. Low risk in practice for a static site.
- Files: `index.html` line 5
- Current mitigation: Static site, no code injection vectors; token itself does not grant access to Google Search Console.
- Recommendations: None required. The token is meant to be public (it's how Google verifies ownership).

**GitHub repository URLs exposed:**
- Risk: Repository links (lines 278, 314, 354 in `index.html`) to public GitHub repositories containing code, commits, issues, and potentially secrets.
- Files: `index.html` (project links)
- Current mitigation: Repositories should already be public and scanned for secrets before linking. Private repos are correctly excluded (Emite note on line 230–233).
- Recommendations: Before committing to this portfolio, audit linked repos for: API keys in commit history, `.env` files, or credentials in README files. Use `git-secrets` hook on those repos.

## Performance Bottlenecks

**CSS file size and parse time:**
- Problem: `css/styles.css` is 1,298 lines (~30KB uncompressed). Mobile parse time is measurable.
- Files: `css/styles.css`
- Cause: Comprehensive design token system, extensive media queries, animation keyframes, and semantic CSS rules. Well-organized but dense.
- Improvement path: (1) Minification reduces to ~18KB; (2) Gzip to ~6KB in transit. (3) Consider critical CSS inlining for above-the-fold (hero section). Currently acceptable; only optimize if Lighthouse Performance drops below 90.

**Multiple asynchronous data sources (fonts, images, videos):**
- Problem: Google Fonts (2 font families, multiple weights) loaded asynchronously; images lazy-loaded; videos preload="none". Potential for Cumulative Layout Shift (CLS) during load.
- Files: `index.html` lines 28–37 (fonts); video elements (lines 127, 295, 331)
- Cause: No explicit `width`/`height` attributes on all images and video placeholders; flex/grid layouts shift as media loads.
- Improvement path: (1) Verify all images have `width`/`height` attributes (checking… images do have them, good). (2) Assign `aspect-ratio` CSS to video containers. (3) Use `font-display: swap` (already in use, good). CLS should be near zero; Lighthouse should confirm.

**IntersectionObserver threshold configurations:**
- Problem: Three separate observers with different `rootMargin` and `threshold` values. Threshold 0.1 for reveals means elements start animating when 10% visible; nav uses -60px top margin, creating a wide "active zone."
- Files: `js/main.js` lines 55–64 (nav), 85–88 (reveals), 167–172 (video)
- Cause: Tuning for different UI behaviors is reasonable, but could cause excessive callback firing on slower devices.
- Improvement path: Monitor DevTools Performance tab; if callback overhead is >10ms per scroll frame, consolidate observers. Currently not a concern (callback logic is trivial).

## Fragile Areas

**Navigation active state detection:**
- Files: `js/main.js` lines 34–67
- Why fragile: Intersection margin `-60px 0px -60% 0px` creates a 60% viewport height "dead zone" where sections become active. If user scrolls very quickly or if viewport height changes dynamically (mobile browser toolbar), active state can lag or jump.
- Safe modification: (1) Test rapid scrolling on mobile; (2) adjust `rootMargin` if behavior feels off. (3) Add console logging to debug: `console.log('Active section:', sectionId)`.
- Test coverage: No unit tests. Manual testing required on 360px, 768px, and 1024px viewports.

**Lightbox image source detection:**
- Files: `js/main.js` lines 96–128; `index.html` lines 132–158
- Why fragile: Lightbox source falls back to `btn.dataset.full || btn.dataset.src`. If `data-full` is missing and `data-src` points to a low-res image, user sees pixelated lightbox. No error handling if image fails to load.
- Safe modification: (1) Always provide both `data-src` (thumbnail) and `data-full` (high-res). (2) Add an `onerror` handler to `#lightbox-img` to show a fallback message.
- Test coverage: Manual testing of each project card's lightbox.

**Facade video trigger logic:**
- Files: `js/main.js` lines 131–153; `index.html` lines 287–297, 323–333
- Why fragile: Facade system assumes exact DOM structure: `.card-facade` must be direct child of `.card-media`; `.card-media` must be sibling to `<video>`. If HTML structure changes (e.g., wrapper div added), selectors break silently.
- Safe modification: (1) Use data attributes instead of class/sibling selectors: `data-facade="true"` on facade, find video via `data-video="true"`. (2) Add null checks and console warnings if elements not found.
- Test coverage: Video play/pause tested manually for SBL and Pokédex cards only.

**Hardcoded animation timings:**
- Files: `css/styles.css` lines 1056–1094; `js/main.js` lines 27–29
- Why fragile: Count-up animation starts at 850ms (hardcoded in two places). If CSS animation sequence changes, timing falls out of sync. No shared constant.
- Safe modification: (1) Define `const HERO_COUNTUP_DELAY = 850;` in JS. (2) Use CSS custom property `--hero-countup-delay: 850ms;` and inject via JS. (3) Add a data attribute to trigger and validate timing.
- Test coverage: Timing verified visually only; no automated tests.

**Email copy button state management:**
- Files: `js/main.js` lines 176–195
- Why fragile: `timer` variable persists globally. If user clicks copy button twice rapidly, first `clearTimeout` may not fire in time, leading to state inconsistency (button shows "Copiado" but resets late).
- Safe modification: (1) Add a `isAnimating` flag to prevent double-clicks. (2) Use a data attribute on the button to track state. (3) Cancel animation if button is clicked while animating.
- Test coverage: Manual testing of rapid clicks.

## Scaling Limits

**Single HTML file architecture:**
- Current capacity: ~650 lines, 7 sections, fits comfortably in one file.
- Limit: Adding a 4th major section (blog, case study library, pricing page) would push to ~1,000 lines. At ~1,500 lines, navigation becomes cumbersome.
- Scaling path: (1) If adding more pages: move to static site generator (11ty, Hugo) with template partials. (2) Keep current single-page approach for Portfolio; create separate landing for other sections.

**CSS weight without preprocessor:**
- Current capacity: 1,298 lines, single file, no SASS nesting or mixins. Media queries repeated across rules.
- Limit: At ~2,000 lines, maintainability suffers; media query duplication causes ~20% bloat.
- Scaling path: (1) Introduce a CSS preprocessor (SASS) for mixins and nesting. (2) Or: use CSS-in-JS if moving to a framework later. (3) For now: organize current CSS into "layers" using `@layer` (modern browsers only, so conditional).

**Asset management without build tooling:**
- Current capacity: 10 static images (WebP), 3 videos (< 8 MB each). Manual path management works.
- Limit: Adding 50+ images or dynamic asset generation requires a build step.
- Scaling path: Introduce a simple build script (esbuild for JS minification, ImageOptim for batch processing) or static site generator.

**JavaScript without module system:**
- Current capacity: ~200 lines in IIFEs, 4 independent features.
- Limit: At ~500 lines, lack of module boundaries causes tight coupling; any refactor risks breaking multiple features.
- Scaling path: (1) Use ES6 modules with a bundler (esbuild, Rollup) if adding complexity. (2) For now: stick with IIFEs; keep each module simple and self-contained.

## Dependencies at Risk

**Google Fonts CDN:**
- Risk: External dependency on `fonts.googleapis.com`. If CDN is down, fonts fail to load; page falls back to system fonts. Latency adds ~200-500ms to page load.
- Impact: Appearance changes if system fonts are different aspect ratio (e.g., system sans-serif is wider than Plus Jakarta Sans, causing layout shift).
- Migration plan: (1) Self-host fonts by downloading WOFF2 files and serving locally. (2) Or: preload from Google Fonts but with local fallback fonts specified. (3) Current mitigation: `font-display: swap` ensures text is visible immediately with fallback, then swaps to custom font when loaded. Acceptable trade-off.

**GitHub Pages hosting:**
- Risk: Free GitHub Pages can have outages; no SLA. Custom domain (not yet purchased) adds risk if DNS provider fails.
- Impact: Portfolio unreachable; job prospects interrupted during outage.
- Migration plan: (1) Purchase domain and add CNAME to GitHub Pages (GitHub handles DNS). (2) Or: move to Netlify/Vercel for better reliability and edge caching. (3) For now: no action needed; GitHub Pages is reliable for static sites.

**No build dependencies — actually a strength:**
- No npm packages means no supply chain risk (typosquatting, malicious updates).
- No lock file drift (no `package.json`, no version lock).

## Missing Critical Features

**No analytics or error reporting:**
- Problem: Can't track visitor behavior, referral sources, or which project links drive interest.
- Blocks: Data-driven decisions (e.g., should Emite case study be longer? Are recruiters clicking Stack section?).
- Recommendation: Add Plausible Analytics (privacy-first, 1KB script) for basic stats. Or: use Fathom. Skip Google Analytics (heavy, tracks across web, creates privacy liability).

**No automated testing:**
- Problem: Changes to JS or CSS have no regression suite. Interactive features (lightbox, copy, video play) tested manually only.
- Blocks: Confident refactoring; no QA automation; high bus factor if Eduardo is unavailable.
- Recommendation: (1) Add Jest + Testing Library for JS. (2) Use Lighthouse CI for performance regression. (3) Screenshot testing (Percy, Chromatic) for visual regressions. Start with critical paths (lightbox open/close, clipboard copy).

**No fallback for older browsers:**
- Problem: `<dialog>` not supported in IE11 or older Safari; `IntersectionObserver` polyfill not included.
- Blocks: Site works in modern browsers only. No graceful degradation path.
- Recommendation: Add polyfills (dialog-polyfill, intersection-observer-polyfill) or feature detection. Or: declare modern-only and accept that IE11 users see a plain page (reasonable trade-off for 2026).

**No 404 or error page:**
- Problem: If user navigates to `https://eduumr73.github.io/about/`, GitHub Pages shows a generic 404.
- Blocks: Broken links from external sources leave users without guidance.
- Recommendation: Add a `404.html` file with a link back to home. GitHub Pages will serve it automatically.

**No RSS feed or update notifications:**
- Problem: Recruiters can't subscribe to changes or project updates.
- Blocks: Passive engagement; visitors must manually check back.
- Recommendation: Low priority. If a blog section is added later, include RSS. For now, social media (GitHub, LinkedIn) serves this role.

## Test Coverage Gaps

**Interactive JavaScript features untested:**
- What's not tested: (1) Lightbox open/close/focus management, (2) Clipboard copy success/failure, (3) Video play/pause facade toggling, (4) Nav active state on scroll.
- Files: `js/main.js` (all features)
- Risk: Refactoring counts, observers, or focus logic could break UX without detection.
- Priority: High for lightbox (most used interaction) and clipboard (failure is silent).

**Responsive design untested:**
- What's not tested: Layout at 360px, 480px, 768px, 1024px breakpoints; text overflow; image aspect ratios.
- Files: `css/styles.css` (media queries)
- Risk: Mobile users encounter broken layouts on edge case screen sizes.
- Priority: Medium. Current media query tuning is solid, but new features must be QA'd at all breakpoints.

**Accessibility features untested:**
- What's not tested: (1) Keyboard navigation (Tab, Enter, Escape), (2) Screen reader announcements, (3) `prefers-reduced-motion` respected, (4) Color contrast verified programmatically.
- Files: `index.html` (ARIA), `css/styles.css` (motion), `js/main.js` (focus)
- Risk: Disabled and assistive-tech users encounter barriers.
- Priority: High. Accessibility is a legal/ethical requirement, not optional. Conduct WCAG 2.1 AA audit before publicizing.

**Performance under load untested:**
- What's not tested: (1) Lighthouse performance on 4G throttling (target: ≥95), (2) Time to Interactive (TTI) on slow devices, (3) Cumulative Layout Shift (CLS) with various image load times.
- Files: All assets and `js/main.js`
- Risk: Recruiters on slow mobile networks have poor experience; bounce rate increases.
- Priority: Medium. Lighthouse CI (free) runs on each commit; no need for manual testing.

**Video fallback behavior untested:**
- What's not tested: (1) Video load failure (404, timeout), (2) Browser without video support, (3) Video codec compatibility across devices.
- Files: `index.html` video elements; `js/main.js` video play logic
- Risk: Project demos fail to load for some users; no fallback to screenshots.
- Priority: Low. Videos have WebP poster fallback and explicit `<source type="video/mp4">`. Acceptable for modern browsers.

---

*Concerns audit: 2026-08-13*
