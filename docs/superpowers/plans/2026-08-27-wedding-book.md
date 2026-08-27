# Interactive Wedding Book Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver and deploy the approved interactive 3D wedding invitation in `dungnguyenq237/my-wedding`.

**Architecture:** A strict Vite React application separates semantic DOM content from the R3F scene. A reducer state machine synchronizes GSAP-driven book motion with accessible navigation, and repository abstractions isolate static persistence.

**Tech Stack:** React 19, TypeScript 5 strict, Vite, React Three Fiber, Drei, Three.js, GSAP, Tailwind CSS, React Hook Form, Zod, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-08-27-wedding-book-design.md`

## Global Constraints

- Static GitHub Pages deployment at `/my-wedding/`; no Next.js, SSR, backend, or React Router.
- R3F owns physical geometry and animation; DOM owns wedding information and controls.
- All wedding data comes from `weddingConfig`.
- Reduced motion, keyboard navigation, swipe, WebGL fallback, and mobile readability are required.
- Additional navigation is ignored while opening or turning.

---

### Task 1: Vite foundation and domain contracts

**Files:**
- Modify: `package.json`, `tsconfig.json`
- Create: `vite.config.ts`, `index.html`, `src/main.tsx`, `src/types/wedding.ts`, `src/config/wedding.ts`
- Test: `src/config/wedding.test.ts`

**Interfaces:**
- Produces: `WeddingConfig`, `WeddingPageId`, `weddingConfig`, `assetUrl(path: string): string`

- [ ] Write a failing config test asserting six ordered page IDs and base-aware gallery/audio URLs.
- [ ] Run `npm test -- src/config/wedding.test.ts` and confirm the missing module failure.
- [ ] Replace the starter dependencies and implement typed configuration plus the Vite entry point.
- [ ] Install from the new lockfile and rerun the focused test to green.

### Task 2: Book state machine and persistence contracts

**Files:**
- Create: `src/hooks/useBookNavigation.ts`, `src/hooks/useReducedMotion.ts`, `src/hooks/useResponsiveBook.ts`, `src/repositories/rsvp.ts`
- Test: `src/hooks/bookNavigation.test.ts`, `src/repositories/rsvp.test.ts`

**Interfaces:**
- Produces: `bookReducer(state, action)`, `initialBookState`, `RSVPData`, `RSVPRepository`, `LocalStorageRSVPRepository`

- [ ] Write failing reducer tests for opening, settling, forward/back turns, and ignored overlapping input.
- [ ] Write a failing repository test proving serialized local persistence.
- [ ] Run focused tests and verify both fail because implementation is absent.
- [ ] Implement the minimal reducer, hooks, and repository contracts.
- [ ] Rerun focused tests to green.

### Task 3: Physical scene and coordinated animation

**Files:**
- Create: `src/three/WeddingScene.tsx`, `src/three/WeddingBook.tsx`, `src/three/BookCover.tsx`, `src/three/BookPage.tsx`, `src/three/PageStack.tsx`, `src/three/CameraRig.tsx`, `src/three/Lighting.tsx`, `src/three/DustParticles.tsx`

**Interfaces:**
- Consumes: reducer state, responsive profile, reduced-motion preference
- Produces: `WeddingScene`, `WeddingBook`, physical page-turn completion callbacks

- [ ] Build reusable memoized cover, spine, page-stack, and segmented page geometry.
- [ ] Orchestrate the opening and page turn with cleaned-up GSAP timelines.
- [ ] Add camera interpolation, warm light, contact shadows, and buffer-based particles without per-frame React state.
- [ ] Expose corner hit targets and synchronize animation completion with reducer transitions.

### Task 4: Invitation pages and accessible controls

**Files:**
- Create: `src/app/App.tsx`, `src/components/wedding/WeddingContent.tsx`, `src/components/wedding/InvitationSpread.tsx`, `src/components/wedding/StoryPage.tsx`, `src/components/wedding/CeremonyPage.tsx`, `src/components/wedding/ReceptionPage.tsx`, `src/components/wedding/GalleryPage.tsx`, `src/components/wedding/RSVPPage.tsx`, `src/components/ui/PageNavigation.tsx`, `src/components/ui/LoadingScreen.tsx`, `src/components/ui/AudioButton.tsx`, `src/components/ui/RSVPForm.tsx`, `src/components/ui/WebGLFallback.tsx`
- Test: `src/components/ui/RSVPForm.test.tsx`

**Interfaces:**
- Consumes: `weddingConfig`, navigation state/actions, `RSVPRepository`
- Produces: responsive DOM overlay, validated RSVP flow, keyboard/swipe/audio controls, HTML fallback

- [ ] Write a failing RSVP test covering invalid input and successful repository submission.
- [ ] Run the focused test and confirm expected missing-component failure.
- [ ] Implement data-driven pages, controls, input gestures, focus treatment, fallbacks, and form success state.
- [ ] Rerun the focused test to green.

### Task 5: Visual polish, responsive behavior, and Pages delivery

**Files:**
- Create: `src/styles/globals.css`, `public/favicon.svg`, `public/audio/README.md`, `public/images/README.md`, `.github/workflows/deploy.yml`, `README.md`
- Modify: `vite.config.ts`, `index.html`

**Interfaces:**
- Produces: a static `dist/` compatible with `https://dungnguyenq237.github.io/my-wedding/`

- [ ] Apply the approved palette, typography, linen/paper treatments, mobile single-page layout, and reduced-motion rules.
- [ ] Add graceful gallery/audio placeholders using base-safe URLs.
- [ ] Configure official GitHub Pages Actions and document local/deployment commands.
- [ ] Run `npm run test`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- [ ] Review the generated output for `/my-wedding/` asset paths, push `main`, and verify the Pages workflow and live URL.

