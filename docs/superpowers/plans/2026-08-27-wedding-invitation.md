# Wedding Invitation SPA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, visually polished Vietnamese wedding invitation SPA with a Three.js invitation moment, countdown, gallery, event details, and local RSVP outcomes.

**Architecture:** Use a Vite React TypeScript SPA with content-driven sections. Keep the Three.js scene in a lazy-loaded React Three Fiber feature with a semantic HTML fallback; keep wedding data in one typed module and local RSVP state isolated from presentation.

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS, React Three Fiber, Three.js, drei, Motion, Lucide React.

**Spec:** `docs/superpowers/specs/2026-08-27-wedding-invitation-design.md`

## Global Constraints

- Use Vietnamese UI copy; the two RSVP result lines remain exactly `We're hoping to see you there.` and `Sending us some nice words if you cannot be there.`
- Build mobile-first from 320px. Do not rely on hover for interaction.
- The only countdown target is `2026-10-24T18:00:00+07:00`.
- Do not add a backend, persistence, analytics, a real QR image, or an automated test suite.
- Three.js is isolated to the invitation section. All event information and RSVP actions must remain usable with WebGL disabled.
- Use mock image URLs only from the typed content module, making later replacement a data change.

---

## File structure

```text
index.html
package.json
vite.config.ts
tsconfig.json
tsconfig.app.json
eslint.config.js
src/
  main.tsx
  app/App.tsx
  content/wedding.ts
  components/ui/SectionHeading.tsx
  components/ui/Reveal.tsx
  features/countdown/Countdown.tsx
  features/countdown/useCountdown.ts
  features/gallery/Gallery.tsx
  features/invitation-3d/InvitationExperience.tsx
  features/invitation-3d/InvitationScene.tsx
  features/invitation-3d/InvitationFallback.tsx
  features/invitation-3d/useWebGLSupport.ts
  features/rsvp/RSVP.tsx
  lib/date.ts
  styles/globals.css
```

## Tasks

### Task 1: Create the SPA foundation

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `eslint.config.js`
- Create: `src/main.tsx`, `src/app/App.tsx`, `src/styles/globals.css`

**Produces:** A Vite React TypeScript app with Tailwind token support and a minimal `App` mount point.

- [ ] Create `package.json` with `dev`, `build`, `preview`, `lint`, and `typecheck` scripts. Install `react`, `react-dom`, `three`, `@react-three/fiber`, `@react-three/drei`, `motion`, `lucide-react`, `tailwindcss`, `@tailwindcss/vite`, TypeScript, Vite, and ESLint packages.
- [ ] Configure Vite with the React and Tailwind plugins; configure strict TypeScript with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`.
- [ ] Add the root document title `Thiệp cưới | Ngày chung đôi` and a Vietnamese `lang` attribute.
- [ ] Create the initial app shell and global stylesheet with an importable font pair: Lora and Be Vietnam Pro.
- [ ] Run `npm run typecheck` and `npm run build`.
- [ ] Commit with `chore: scaffold wedding invitation app`.

### Task 2: Define content, time utilities, and visual tokens

**Files:**
- Create: `src/content/wedding.ts`, `src/lib/date.ts`
- Modify: `src/styles/globals.css`

**Interfaces:**
- Produces `wedding: WeddingContent`, `formatVietnameseDate(date: Date): string`, and `getCountdownParts(targetIso: string, now: number): CountdownParts`.

- [ ] Define `WeddingContent`, `WeddingEvent`, `GalleryImage`, and `StoryBeat` interfaces in `src/content/wedding.ts`.
- [ ] Export `wedding` with mock couple/family/event content, the exact countdown ISO target, four specific remote mock-image URLs, a map URL per event, and `qrImage: null`.
- [ ] Implement `getCountdownParts` to compute days, hours, minutes, seconds, and `isComplete` from timestamps; use `Math.max` to clamp expired values to zero.
- [ ] Add CSS variables for paper, white, sand, espresso, terracotta, and olive. Define fluid display/body scales, surface shadows, focus styling, and a `prefers-reduced-motion` block that disables nonessential animation.
- [ ] Render the content module in the app shell temporarily to verify imports and type safety.
- [ ] Run `npm run typecheck` and commit with `feat: add wedding content and design tokens`.

### Task 3: Implement hero and countdown

**Files:**
- Create: `src/features/countdown/useCountdown.ts`, `src/features/countdown/Countdown.tsx`
- Modify: `src/app/App.tsx`, `src/styles/globals.css`

**Interfaces:**
- Consumes `wedding.countdownTarget`.
- Produces `<Countdown targetIso={string} />`.

- [ ] Implement `useCountdown(targetIso: string)` using a one-second `window.setInterval`; derive values with `getCountdownParts(targetIso, Date.now())` rather than decrementing state.
- [ ] Implement `Countdown` with four labeled numeric units: `Ngày`, `Giờ`, `Phút`, and `Giây`.
- [ ] Render `Hôm nay là ngày chung đôi!` once `isComplete` is true.
- [ ] Build the hero with names, date, image, countdown, and a button that scrolls to `#su-kien` on mobile and `#thiep-moi` from the desktop layout.
- [ ] Add responsive hero styles that preserve hierarchy at 320px without text overlap or horizontal overflow.
- [ ] Run `npm run build` and commit with `feat: add wedding countdown hero`.

### Task 4: Build the editorial story, gallery, and event details

**Files:**
- Create: `src/components/ui/SectionHeading.tsx`, `src/components/ui/Reveal.tsx`, `src/features/gallery/Gallery.tsx`
- Modify: `src/app/App.tsx`, `src/styles/globals.css`

**Interfaces:**
- Consumes `wedding.story`, `wedding.gallery`, and `wedding.events`.
- Produces `<SectionHeading eyebrow={string} title={string} />`, `<Reveal>{children}</Reveal>`, and `<Gallery images={GalleryImage[]} />`.

- [ ] Create `SectionHeading` for consistent eyebrow/title copy and `Reveal` for motion-safe entrance animation; render children immediately when reduced motion is enabled.
- [ ] Add the story section with asymmetrically framed mock photos and concise Vietnamese narrative blocks from content.
- [ ] Implement `Gallery` as a CSS grid at `min-width: 768px` and a touch-friendly horizontal scroll-snap list below that breakpoint.
- [ ] Add `Ngày chung đôi` event cards for `Lễ Vu Quy`, `Lễ Thành Hôn`, and reception. Each card includes date, time, full address, and a `Xem bản đồ` external link with a location icon.
- [ ] Use semantic `section`, `article`, heading levels, descriptive image alt text, and focusable links throughout.
- [ ] Run `npm run lint`, `npm run typecheck`, and `npm run build`; commit with `feat: add wedding story gallery and events`.

### Task 5: Build the progressive-enhancement 3D invitation

**Files:**
- Create: `src/features/invitation-3d/useWebGLSupport.ts`, `src/features/invitation-3d/InvitationFallback.tsx`, `src/features/invitation-3d/InvitationScene.tsx`, `src/features/invitation-3d/InvitationExperience.tsx`
- Modify: `src/app/App.tsx`, `src/styles/globals.css`

**Interfaces:**
- Consumes `wedding.invitation` and `wedding.events`.
- Produces `<InvitationExperience invitation={InvitationContent} events={WeddingEvent[]} />`.

- [ ] Implement `useWebGLSupport()` with a temporary canvas and `getContext('webgl2') || getContext('webgl')`; return `false` safely in non-browser environments.
- [ ] Implement `InvitationFallback` as a responsive HTML invitation card with the couple names, formal family/event content, and a visible `Mở thiệp` button that toggles the card open state.
- [ ] Implement `InvitationScene` with an R3F canvas containing a paper-toned envelope plane, a bordered invitation plane, soft ambient/directional lighting, and small decorative mesh accents. Bind envelope/card opening to `isOpen`.
- [ ] Implement `InvitationExperience` with `React.lazy`, `Suspense`, an accessible `Mở thiệp` button, and a canvas error boundary. Render `InvitationFallback` when WebGL is unavailable, the lazy scene fails, or reduced motion is enabled.
- [ ] Put identical essential invitation text in the semantic HTML content below the canvas. Use the canvas only for visual depth.
- [ ] Add bounded canvas dimensions, touch-safe controls, lazy loading near the viewport, and resource cleanup on unmount.
- [ ] Run `npm run typecheck` and `npm run build`; commit with `feat: add 3d wedding invitation`.

### Task 6: Add the RSVP ending and page polish

**Files:**
- Create: `src/features/rsvp/RSVP.tsx`
- Modify: `src/app/App.tsx`, `src/styles/globals.css`

**Interfaces:**
- Produces `<RSVP />` with local state type `type RSVPResponse = 'idle' | 'attending' | 'unableToAttend'`.

- [ ] Build the RSVP section after the invitation with two native buttons: `Có, chúng mình sẽ đến` and `Không thể đến được`.
- [ ] In `attending`, show the exact copy `We're hoping to see you there.` and a warm visual acknowledgement.
- [ ] In `unableToAttend`, show the exact copy `Sending us some nice words if you cannot be there.` and a clearly styled QR placeholder box labeled `QR mừng cưới sẽ được cập nhật`.
- [ ] Ensure changing the selection replaces the old outcome, works with keyboard, and never submits or sends data.
- [ ] Add the footer, small line-art flourish, responsive spacing, button states, and no-horizontal-scroll guard.
- [ ] Run `npm run lint`, `npm run typecheck`, and `npm run build`; commit with `feat: add local rsvp experience`.

### Task 7: Perform visual QA and delivery cleanup

**Files:**
- Modify only files required by visual defects found during QA.

**Interfaces:**
- Preserves the public component interfaces introduced in Tasks 2–6.

- [ ] Start the production preview with `npm run build` followed by `npm run preview`.
- [ ] Inspect the hero, gallery, event cards, invitation fallback, active WebGL scene, and both RSVP outcomes at widths 320px, 375px, 768px, 1024px, and 1440px.
- [ ] Verify touch opening, keyboard focus, reduced-motion mode, countdown target display, and no-WebGL fallback manually.
- [ ] Correct only concrete visual or interaction defects discovered in the inspection; preserve content centralization and section order.
- [ ] Re-run `npm run lint`, `npm run typecheck`, and `npm run build`.
- [ ] Commit final adjustments with `fix: polish wedding invitation experience`.

## Plan self-review

- Spec coverage: Tasks 2–6 cover centralised content, the Vietnamese single-page flow, mock imagery, countdown, local RSVP outcomes, 3D invitation, HTML fallback, and mobile/accessibility requirements. Task 7 covers the explicit visual/mobile QA requirement.
- Scope: The plan deliberately excludes backend RSVP storage, real bank QR handling, analytics, and full-page WebGL navigation.
- Consistency: `wedding.countdownTarget`, `getCountdownParts`, `InvitationExperience`, and `RSVPResponse` are defined once and consumed with the same names throughout.
