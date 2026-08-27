# Interactive Wedding Book Design

## Goal

Build a static, production-quality wedding invitation that feels like opening a physical luxury album. The 3D book is the navigation model, while readable and interactive content remains semantic DOM.

## Approved experience

- Begin with a closed ivory-and-beige linen book under warm cinematic light.
- Open the cover over roughly 2.4 seconds with camera approach, weight, and settling.
- Present six data-driven spreads: invitation, story, ceremony, reception, gallery, and RSVP.
- Turn visibly curved segmented paper over roughly 900 ms; reject overlapping navigation.
- Support buttons, page-corner clicks, keyboard arrows, and horizontal swipe.
- Adapt to a readable single-page composition on mobile instead of shrinking desktop content.
- Respect reduced motion and provide a complete HTML fallback when WebGL is unavailable.

## Architecture

- React 19 + strict TypeScript + Vite, with Tailwind CSS for DOM styling.
- React Three Fiber, Drei, and Three.js own book geometry, camera, lights, particles, shadows, and frame animation.
- GSAP orchestrates opening and page-turn timelines.
- React DOM owns content, controls, focus behavior, form fields, error/success messages, and fallbacks.
- A typed `weddingConfig` is the single source of truth for all wedding content.
- A reducer-backed book state machine owns `closed | opening | open | turning | closing` transitions and page index.
- RSVP uses React Hook Form + Zod and an `RSVPRepository` abstraction backed by localStorage.

## Visual system

- Palette: ivory `#faf7f2`, cream `#f3eadf`, beige `#d8c3a5`, champagne `#e8d5b5`, brown `#6f5747`, dark brown `#47372d`, gold `#b79a68`.
- Typography: Cormorant Garamond headings, Great Vibes names, Inter body.
- Restrained gold foil, embossed borders, linen texture, generous whitespace, soft shadows, warm light, and minimal particles.
- No neon, heavy gradients, generic landing-page hero, or CSS-only fake book.

## Static deployment

- GitHub Pages serves the project under `/my-wedding/`.
- Static assets use `import.meta.env.BASE_URL`.
- `.github/workflows/deploy.yml` uses official Pages actions on pushes to `main`.
- No Next.js, SSR, server runtime, backend API, or URL-based book routing.

## Acceptance criteria

- `npm install`, `npm run dev`, `npm run test`, and `npm run build` work.
- TypeScript remains strict with no production `any`.
- Production assets resolve from the GitHub Pages subpath.
- The invitation is fully navigable without a pointer.
- RSVP validates locally, persists through the repository, and displays an accessible success state.
- Missing gallery assets degrade to elegant placeholders without delaying the 3D experience.

