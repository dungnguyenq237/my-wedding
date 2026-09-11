# Album design comparison

Two independent alternatives branch from main commit `6740465`:

| Branch | Direction |
| --- | --- |
| `feat/gallery-royal-album` | Ivory/gold formal album: monogram crest, engraved corners, ribbon bookmark, double gold photo frames |
| `feat/gallery-floral-scrapbook` | Romantic scrapbook: linen cover, botanical illustrations, satin ribbon, wax seal, taped photo mounts and personal notes |

Both use the same four photos, soft page turns and hard covers. Wide layouts display a spread; narrow layouts display one page. Buttons, horizontal swipes, arrow keys, Home/End and thumbnail navigation work without looping through the covers. Reduced motion changes pages directly. Vertical touch scrolling is retained.

## Compare locally

Use Node 24. For each branch:

```sh
git fetch origin
git switch feat/gallery-royal-album
npm ci
npm run dev
```

Scroll to “Những ngày rất thương”, open the album, then compare with:

```sh
git switch feat/gallery-floral-scrapbook
npm ci
npm run dev
```

Stop the previous dev server before switching. Check at desktop width and a phone width of 390px. Also verify on a real iPhone before choosing a design.

## Verification scope

Build, strict TypeScript, ESLint and navigation/dependency regression checks run for both branches. Cloud browser access to the local preview was denied, so no actual rendered desktop/mobile screenshots or Safari verification were completed in this environment. Node DOM regression tests do not validate visual layout or real touch scrolling.

No production deployment or merge is included. Both branches remain alternatives until one is selected.

## Images

The four original JPEGs are retained. Gallery-only WebP copies are at most 1440px wide / 1800px tall, quality 88, and total approximately 528 KB. Main-page hero assets are unchanged. Page layouts contain the full image; thumbnail tiles intentionally crop.
