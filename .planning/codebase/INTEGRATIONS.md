# External Integrations

**Analysis Date:** 2026-08-13

## APIs & External Services

**Typography:**
- Google Fonts API (`fonts.googleapis.com`)
  - Service: Cloud font delivery
  - Fonts: Plus Jakarta Sans (primary), JetBrains Mono (monospace)
  - Preconnect: `fonts.googleapis.com`, `fonts.gstatic.com`
  - Load method: Async via `<link rel="preload">` with `onload` callback for non-blocking load
  - Fallback: System fonts

**Web Analytics & Verification:**
- Google Search Console
  - Verification: `<meta name="google-site-verification" content="7L1jCAZkfwjaxo14HvKGYJ4yjNxozRBgllYgjeSH5kw" />`
  - Purpose: SEO verification and indexing

## Data Storage

**Databases:**
- None - Static site, no database backend

**File Storage:**
- Local filesystem only
  - Location: `assets/` directory
  - Images: `assets/img/` (WebP format)
  - Videos: `assets/video/` (MP4 format)
  - Documents: `assets/cv/` (PDF downloads)
- GitHub repository as version control
  - All assets committed to git

**Caching:**
- Browser caching (HTTP cache headers)
- GitHub Pages CDN cache
- No explicit caching configuration detected

## Authentication & Identity

**Auth Provider:**
- None - Static site, no user authentication
- No login, no session management
- All content is public

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Server logs via GitHub Pages infrastructure (not directly accessible)
- No custom logging, telemetry, or error reporting service

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (static site hosting)
- Repository: `https://github.com/EduuMR73/EduuMR73.github.io`
- Branch: `master` (auto-deployed)
- URL: `https://eduumr73.github.io`
- Domain: Custom GitHub Pages domain

**CI Pipeline:**
- GitHub Pages native deployment (push-to-deploy)
- No separate CI/CD service (GitHub Actions, CircleCI, etc.)
- No build step - direct static file serving

## Environment Configuration

**Required env vars:**
- None - No environment-specific configuration

**Secrets location:**
- No secrets in codebase
- All external URLs are public
- Google verification token is intentionally public

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## External Resources & CDNs

**Content Delivery:**
- Google Fonts CDN for typography
- GitHub Pages CDN for site hosting
- No third-party image CDN (images self-hosted)

## Social & Meta Services

**Open Graph / Social Preview:**
- og:image: `https://eduumr73.github.io/assets/img/og-image.png`
- og:type: website
- og:site_name: Eduardo Moreno
- Twitter Card: summary_large_image
- Social preview image self-hosted in `assets/img/og-image.png`

**Structured Data:**
- JSON-LD schema embedded in HTML
  - `@type: Person` - Portfolio owner profile
  - `@type: SoftwareApplication` - Emite project description
  - No external schema service (inline only)

## Referenced External Projects

**Emite SaaS (separate codebase):**
- Demo URL: `https://emite.eduumr.dev/`
- Not integrated into portfolio (linked for reference)
- Uses own stack: Angular, NestJS, PostgreSQL, Stripe, etc.
- Uses services referenced in portfolio: Stripe, Tink (Open Banking), Firebase Auth, AWS S3, Claude Vision API, Resend

**GitHub Repositories:**
- Main repo: `https://github.com/EduuMR73/EduuMR73.github.io`
- Hamparo (Android project): `https://github.com/EduuMR73/Hamparo-TFG-Final`
- Super Basket League (Game): `https://github.com/EduuMR73/super-basket-league`
- Links in portfolio to GitHub profiles and projects

**Social Profiles:**
- GitHub: `https://github.com/EduuMR73`
- LinkedIn: `https://www.linkedin.com/in/eduumr73`
- Links present in navigation and footer

## Embedded Media

**Videos:**
- Self-hosted MP4 files in `assets/video/`
- No YouTube, Vimeo, or external video platform integration
- Files:
  - `emite-demo.mp4` - Emite product demo
  - `sbl-demo.mp4` - Super Basket League game demo
  - `pokedex-demo.mp4` - Pokédex app demo

**Images:**
- All images self-hosted in `assets/img/` as WebP
- No external image services (Cloudinary, Imgix, etc.)
- Lazy loading via browser `loading="lazy"` attribute

## Performance & Optimization

**No third-party analytics or monitoring services detected**
- No Google Analytics, Mixpanel, Amplitude, etc.
- No error tracking (Sentry, Rollbar, etc.)
- No performance monitoring services
- Minimal external dependencies by design

---

*Integration audit: 2026-08-13*
