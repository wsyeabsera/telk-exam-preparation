# Progressive Web App & Offline Support

## Summary
Make the app installable as a PWA with full offline support, so users can practice on the go without an internet connection.

## Problem
The app already uses IndexedDB for data persistence, but it requires a network connection to load. Users studying on commutes, flights, or in areas with poor connectivity can't access their tests. The AI features (writing feedback, test generation) need a network, but core test-taking and review should work offline.

## Proposed Solution
- **Service worker** with Next.js PWA plugin to cache all static assets and test data
- **Web app manifest** for installability (home screen icon, splash screen, standalone display)
- **Offline indicator** in the UI header when network is unavailable
- **Graceful degradation**: AI features show "Requires internet" when offline; all other features work normally
- Pre-cache all test JSON files and passage markdown on first load

## Key Changes

| File | Action |
|------|--------|
| `next.config.js` | Modify — add PWA plugin configuration |
| `public/manifest.json` | Create — web app manifest with icons and theme |
| `public/icons/` | Create — app icons at various sizes (192, 512) |
| `src/app/layout.tsx` | Modify — add manifest link and theme-color meta |
| `src/components/ui/OfflineBanner.tsx` | Create — banner shown when navigator.onLine is false |
| `src/app/api/*/route.ts` | Modify — all API routes return graceful error when called offline |

## Acceptance Criteria
- [ ] App is installable on mobile and desktop (Chrome, Safari, Firefox)
- [ ] All tests, flashcards, and SRS review work without internet
- [ ] Static assets are cached after first visit
- [ ] Offline banner appears when network is lost
- [ ] AI features (writing feedback, insights, test generation) show clear "needs internet" message
- [ ] App loads instantly from cache on repeat visits
