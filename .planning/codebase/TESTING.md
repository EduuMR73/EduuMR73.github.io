# Testing Patterns

**Analysis Date:** 2026-08-13

## Current State

**Framework:** Not applicable — no test infrastructure present

This is a vanilla HTML/CSS/JS portfolio landing page with zero automated tests. The project is tested manually via:
- Browser DevTools inspection
- Lighthouse audits (mentioned in HANDOFF.json F8 task)
- Visual regression via GitHub Pages preview
- Manual accessibility testing

## Test Framework

**Runner:** None

**Assertion Library:** Not applicable

**Build/Test Commands:** None

**Config Files:** None detected

## Why No Tests?

This codebase is deliberately simple by design (as stated in the footer comment: "HTML, CSS y JS escritos a mano. No necesitaba más."). Key reasons:

1. **Single-file JavaScript** (~200 lines total)
2. **No business logic** — purely presentational/interactive
3. **Vanilla APIs** — no complex state management
4. **Team of one** — developer controls all changes
5. **Manual QA sufficient** — changes are visual/behavioral, inspectable in browser

The HANDOFF.json indicates QA is done via Lighthouse score (F8 target: "Lighthouse >=95").

## Test File Organization

**Location:** No test files present

**Pattern if added:** Would be co-located with source
- `index.html.test.js`
- `js/main.test.js`
- `css/styles.test.js` (if CSS testing added)

**Naming:** Would follow Jest convention: `*.test.js` or `*.spec.js`

## Testable Functions (if framework were added)

These pure/semi-pure functions could be unit tested:

**From `js/main.js`:**

### Count-up Animation (pure function)
```javascript
function runCountUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 600;
  const start = performance.now();
  // ... animation logic
}
```
**Testable via:** Mock `performance.now()`, `requestAnimationFrame()`, verify DOM mutations

### Active Section Tracking (side-effect function)
```javascript
function setActive(sectionId) {
  allNavLinks.forEach(l => l.classList.remove('nav--active'));
  const selector = sectionNavMap[sectionId];
  if (selector) {
    const link = document.querySelector(selector);
    if (link) link.classList.add('nav--active');
  }
}
```
**Testable via:** Mock DOM, verify class mutations

### Video Facade Toggle (event handler)
```javascript
function showVideo() {
  facade.hidden = true;
  video.hidden = false;
  video.play();
}
```
**Testable via:** Mock DOM elements, verify state changes

### Lightbox Modal Handler (event handler)
```javascript
function closeLightbox() {
  dialog.close();
}
```
**Testable via:** Mock dialog API, verify method calls

## Non-Testable Patterns (Vanilla Limitations)

The following lack automated test infrastructure without heavy mocking:

**IntersectionObserver Logic:**
- Scroll reveal animations
- Active nav link detection via viewport intersection
- Video autoplay on scroll

Reason: Requires browser viewport simulation (jsdom limitations)

**Event Listeners:**
- Click handlers on lightbox triggers
- Copy-to-clipboard button
- Video play/pause controls

Reason: Requires full DOM + event simulation

**Async Clipboard API:**
```javascript
await navigator.clipboard.writeText(btn.dataset.copy);
```
Reason: Requires secure context (https) and browser APIs

**CSS Animations:**
- IIFE-based animation timing checks
- IntersectionObserver animation triggers
- `requestAnimationFrame()` calls

Reason: No DOM paint simulation in test environment

## Manual QA Patterns

Since automated testing isn't used, quality is ensured via:

**Browser Testing:**
1. Desktop Chrome, Firefox, Safari
2. Mobile iOS Safari, Chrome Android
3. DevTools viewport testing: 320px, 768px, 1024px, 1920px

**Performance Testing:**
- Lighthouse via Chrome DevTools
- Target: Lighthouse >=95 (from HANDOFF.json)
- Checks: Performance, Accessibility, Best Practices, SEO

**Accessibility Testing:**
- Screen reader: NVDA (Windows) or VoiceOver (Mac)
- Keyboard navigation: Tab through all interactive elements
- Color contrast: Verified via contrast checkers
- Reduced motion: Tested via DevTools emulation

**Functional Testing:**
Done manually via:
- Lightbox: Click thumbnails, verify full image opens, escape key closes, focus returns
- Email copy: Click button, verify clipboard content, icon feedback shows
- Video playback: Click play, verify scroll, verify pause on viewport exit
- Nav active state: Scroll sections, verify nav highlight updates
- Count-up animation: Verify numbers animate from 0 to target

## Coverage Gaps

Since no automated tests exist, these areas are untested:

**High Risk (logic-based):**
- Intersection observer threshold calculations (could miss viewport edge cases)
- Section → nav selector mapping (`sectionNavMap`) — typos in strings not caught
- Performance now() calculations in count-up (could fail on slow devices)
- Timer cleanup in clipboard button (race conditions on rapid clicks)

**Medium Risk (UI-based):**
- Lightbox on mobile (touch events vs click)
- Reduced motion CSS animations (timing could be wrong in disabled state)
- Font loading fallback (noscript path rarely tested)

**Low Risk (simple DOM):**
- CSS class additions/removals
- Data attribute reading
- Basic event listener registration

## If Testing Were to Be Added

**Recommended Approach:**

1. **Unit tests for utility functions** (Jest)
   ```javascript
   describe('runCountUp', () => {
     it('should increment from 0 to target over duration', () => {
       // Mock requestAnimationFrame, performance.now()
       // Verify textContent updates
     });
   });
   ```

2. **Integration tests for DOM interactions** (Playwright or Cypress)
   - Browser-based, tests real DOM
   - Good for: lightbox, copy button, video playback
   - Example:
     ```javascript
     test('lightbox opens on thumbnail click', async ({ page }) => {
       await page.click('[data-src="assets/img/emite-1.webp"]');
       const dialog = await page.locator('#lightbox[open]');
       await expect(dialog).toBeVisible();
     });
     ```

3. **Visual regression tests** (Percy or Chromatic)
   - Detect unintended CSS changes
   - Baseline: current screenshot, compare on each build

4. **Accessibility tests** (axe or Deque)
   ```javascript
   it('has no accessibility violations', async () => {
     await injectAxe(page);
     const results = await checkA11y(page);
     expect(results).toHaveNoViolations();
   });
   ```

5. **Lighthouse CI** (Lighthouse CI)
   - Enforce Lighthouse >95 in CI/CD before merge
   - Already mentioned as F8 task goal

## Current QA Gates

From HANDOFF.json:
- Commit convention enforcement (git-based)
- Manual code review via PR (visual inspection)
- Lighthouse audit (F8 pending)
- Manual browser testing across devices

## Test Strategy for New Features

If new JavaScript features are added:

1. **Start with Cypress** for browser integration tests
   - No jsdom overhead, real browser
   - Easy to test IntersectionObserver, animations
   
2. **Add Jest for pure utility functions** (if extracted)
   - Math-heavy count-up logic
   - String parsing from data attributes
   
3. **Defer Lighthouse** until feature is visually complete (not needed during dev)

4. **Manual testing checklist** before deployment:
   - ✓ Works at 320px, 768px, 1024px, 1920px
   - ✓ Keyboard navigation working (Tab, Enter, Escape)
   - ✓ Screen reader announces new elements
   - ✓ Reduced motion CSS applied correctly
   - ✓ All new elements have data-* attributes if JS-controlled

## Common Testing Pitfalls to Avoid

1. **IntersectionObserver mocking:** Requires full viewport simulation — use Cypress instead
2. **setTimeout/setInterval:** Use fake timers in Jest (jest.useFakeTimers())
3. **Event bubbling:** Ensure test fires event on correct element
4. **Async clipboard:** Requires secure context — test navigator.permissions instead
5. **CSS animations:** Don't test animation values; test end states via classList checks

---

*Testing analysis: 2026-08-13*
