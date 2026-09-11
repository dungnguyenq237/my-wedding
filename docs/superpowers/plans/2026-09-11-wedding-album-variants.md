# Wedding album variants implementation plan

Goal: deliver two independent branches from main with distinct wedding book styling for comparison.
Architecture: retain AlbumGallery(images), isolate page-flip's DOM inside an engine-owned mount, render immutable HTML page templates with React, and keep navigation and accessibility controls outside cloned pages.
Stack: React 19, TypeScript, pinned page-flip, scoped CSS.
Approved design: ivory/gold formal album versus warm floral scrapbook; same four existing photos, white/beige/yellow palette, mobile single page, desktop spread, hard covers, no automatic looping.

- [x] Add navigation tests for covers, odd photo counts, single/spread navigation and end boundaries using node:test. Run against missing implementation to verify failure.
- [x] Implement pure book model plus engine lifecycle, reduced-motion mode, image decoding, disabled controls during flips and keyboard navigation. Keep vertical touch scrolling available.
- [x] Build royal cover, borders, ornaments, ribbon and photo pages in AlbumPages.tsx and album.css; use full-photo containment.
- [x] Generate display WebP variants from the four original photos, preserving originals. Use only for gallery and thumbnails.
- [x] Build/typecheck/lint and real-engine Node DOM regression checks. Browser preview access was denied; rendered layout, touch and Safari checks remain pending outside this environment.
- [ ] Commit royal branch. Create floral branch from the same main, applying common engine and assets, replace page composition/styles with floral scrapbook design; verify independently.
- [ ] Push both branches without merging; provide comparison captures and branch links. Production deployment remains main until selection.
