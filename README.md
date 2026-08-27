# My Wedding

An interactive 3D wedding invitation built as a physical storybook. React DOM keeps the invitation and RSVP accessible; React Three Fiber owns the book, page deformation, camera, lighting, and shadows.

## Stack

- React 19 + strict TypeScript
- Vite + Tailwind CSS
- React Three Fiber + Drei + Three.js
- GSAP
- React Hook Form + Zod
- Vitest + Testing Library

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Customize the invitation

All names, family details, dates, events, story moments, gallery paths, and audio paths live in:

```text
src/config/wedding.ts
```

Add wedding media under `public/images/` and licensed ambient music at `public/audio/ambient.mp3`. Missing media uses intentional visual fallbacks.

## GitHub Pages

The Vite production base defaults to `/my-wedding/`. Override it with `VITE_BASE_PATH` when deploying a fork under a different repository path. The workflow at `.github/workflows/deploy.yml` tests, builds, and deploys `dist/` whenever `main` changes.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once. The live URL is:

```text
https://dungnguyenq237.github.io/my-wedding/
```
