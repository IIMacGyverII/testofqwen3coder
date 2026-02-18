# CINCH Systems Refactoring Notes

## Project Context
- **Project**: CINCH Systems website (legacy Adobe Muse export)
- **Location**: `c:/Users/Joshua/Documents/website/testofqwen3coder`
- **Goal**: Refactor for performance, responsiveness, accessibility, SEO

## Current Status (as of 2026-02-18)

### Completed Phases:
1. **Phase 0 - Discovery**: Analyzed index.html, CSS, JS structure
2. **Phase 1 - Quick Wins**: Added meta tags, semantics, structured data
3. **Phase 2 - Responsiveness**: Added media queries to site_global.css
4. **Phase 3 - Performance**: Added lazy loading, async scripts
5. **Phase 4 - Accessibility/SEO**: Added ARIA, alt text, sitemap, robots.txt

### Known Issue:
**Error**: "JavaScript exception: Error calling selector function: TypeError: f is not a function"

**Root Cause**: The Muse JavaScript library requires specific initialization code to run. The inline script was removed during refactoring.

**Fix Applied**: Added inline Muse initialization script at line 43-49 of index.html:
```javascript
document.documentElement.className = document.documentElement.className.replace(/\bnojs\b/g, 'js');
if(typeof Muse == "undefined") window.Muse = {}; window.Muse.assets = {"required":["museutils.js", "museconfig.js", "jquery.watch.js", "jquery.musepolyfill.bgsize.js", "webpro.js", "musewpslideshow.js", "jquery.museoverlay.js", "touchswipe.js", "jquery.musemenu.js", "require.js", "index.css"], "outOfDate":[]};
```

**Status**: Still getting error - need to investigate further

## Files Modified/Created:
- `index.html` - Refactored HTML with semantic elements, meta tags, structured data
- `css/site_global.css` - Added responsive media queries
- `css/responsive.css` - Complete responsive stylesheet
- `sitemap.xml` - SEO sitemap
- `robots.txt` - Robots directives
- `scripts/build.minify.js` - Build script for minification
- `scripts/image-optimizer.js` - Image optimization guide

## Next Steps (Debugging):
1. Check if Muse scripts are loading correctly
2. Verify RequireJS configuration
3. Check browser console for detailed error
4. May need to restore more original inline JavaScript

## Instructions for Future Sessions:
1. Read this file first to understand current state
2. After making any changes, update this file with:
   - What was changed
   - Why it was changed
   - Whether it fixed the issue
3. Test the page in browser after each change
4. Keep the "Known Issue" section updated with current status