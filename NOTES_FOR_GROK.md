# CINCH Systems Website Refactoring - Grok AI Collaboration Notes

## Project Overview

**Goal**: Refactor a legacy Adobe Muse export website for optimal performance, responsiveness, accessibility, and SEO while preserving visual appearance and functionality.

**Target Metrics**:
- Lighthouse Performance: 95+ (mobile/desktop)
- Core Web Vitals: All green
- Accessibility: WCAG 2.2 AA
- Mobile-first responsive design
- Semantic HTML5, external CSS/JS, minification
- SEO basics: meta tags, structured data

---

## Current Status (as of 2026-02-18)

### What's Been Done

#### Phase 0: Discovery ✅
- Analyzed project structure
- Key files identified:
  - `index.html` - Main page (271 lines)
  - `css/site_global.css` - Global styles
  - `css/master_a-master.css` - Master page styles
  - `css/index.css` - Page-specific styles
  - `scripts/muse-init.js` - Muse initialization
  - `scripts/museutils.js` - Muse utilities (~122 lines)
  - `scripts/museconfig.js` - RequireJS config
  - `scripts/require.js` - Dependency loader

#### Phase 1: Quick Wins ✅
**Changes to `index.html`**:
- Added `charset="UTF-8"` meta tag
- Added `X-UA-Compatible` for IE compatibility
- Added canonical URL
- Added Open Graph meta tags (og:type, og:url, og:title, og:description, og:image, og:site_name, og:locale)
- Added Twitter Card meta tags
- Added favicon links
- Added JSON-LD structured data (Organization + WebPage)
- Added `rel="preconnect"` for external domains (Facebook, LinkedIn, YouTube, GSA)
- Added `rel="preload"` for critical resources
- Added `loading="lazy"` to below-fold images
- Added `defer`/`async` attributes to scripts
- Added ARIA labels to navigation and social links
- Added `rel="noopener noreferrer"` for external links
- Improved semantic HTML5 structure (`<header>`, `<main>`, `<footer>`)

**Changes to `css/site_global.css`**:
- Added responsive media queries (mobile-first approach)
- Mobile breakpoint: max-width 480px
- Tablet breakpoint: 481px - 1024px
- Desktop breakpoint: 1025px+
- Added print styles
- Added reduced-motion support (accessibility)
- Added dark mode support

**New Files Created**:
- `css/responsive.css` - Complete responsive stylesheet
- `sitemap.xml` - SEO sitemap with 13 URLs
- `robots.txt` - Robots directives
- `scripts/build.minify.js` - CSS/JS minification script
- `scripts/image-optimizer.js` - Image optimization guide

#### Phase 2: Responsiveness ✅
- Mobile-first media queries in `site_global.css`
- Stacked layout for mobile (display: block)
- Flexible grid for tablet
- Original layout preserved for desktop
- Fluid typography and images

#### Phase 3: Performance ✅
- Lazy loading for images
- Async/defer script loading
- Preconnect for external domains
- Preload for critical resources

#### Phase 4: Accessibility & SEO ✅
- Alt text on all images
- ARIA labels on interactive elements
- Semantic HTML5 structure
- JSON-LD structured data
- Sitemap.xml
- robots.txt

---

## Current Issue

**Error**: "JavaScript exception: Error calling selector function: TypeError: f is not a function"

**Root Cause Analysis**:
1. The Muse JavaScript library requires specific initialization code
2. The `museconfig.js` file had a condition that tried to load jQuery from an external CDN (`http://musecdn2.businesscatalyst.com`) which was failing
3. The external CDN fallback was removed to use local jQuery file

**Fix Applied**:
- Modified `scripts/museconfig.js` line 4
- Removed: `if(true&&document.location.protocol!="https:")c.paths.jquery=["http://musecdn2.businesscatalyst.com/scripts/4.0/jquery-1.8.3.min",c.paths.jquery];`
- Now uses local `scripts/jquery-1.8.3.min.js`

**Status**: Waiting for user to test the fix

---

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Added meta tags, structured data, improved semantics, added lazy loading, async scripts |
| `css/site_global.css` | Added responsive media queries |
| `css/responsive.css` | Created new responsive stylesheet |
| `scripts/museconfig.js` | Removed external CDN fallback for jQuery |
| `sitemap.xml` | Created SEO sitemap |
| `robots.txt` | Created robots directives |
| `scripts/build.minify.js` | Created build script |
| `scripts/image-optimizer.js` | Created image optimization guide |

---

## Next Steps (If Error Persists)

1. Check browser console for detailed error message
2. Verify jQuery is loading correctly
3. Check if all Muse dependencies are loading
4. May need to adjust script loading order
5. May need to restore more original inline JavaScript

---

## Commands Reference

```bash
# Minify CSS/JS
node scripts/build.minify.js

# View git diff
git diff

# Add all changes
git add .

# Commit with message
git commit -m "refactor: add responsive design, meta tags, structured data, fix jQuery CDN issue"

# Push to remote
git push
```

---

## Important Notes for Grok AI

1. **Do NOT remove the inline Muse initialization script** - It's required for the library to work
2. **Do NOT use external CDN for jQuery** - Use local file only
3. **Test in browser after each change** - The Muse library is sensitive to script loading order
4. **Keep the `nojs` class handling** - Muse uses this for progressive enhancement
5. **Preserve the CRC parameters** - They're used by Muse for cache busting