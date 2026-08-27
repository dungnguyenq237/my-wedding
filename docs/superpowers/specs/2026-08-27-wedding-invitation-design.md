# Wedding Invitation SPA — Design Spec

## Product intent

Create a single-page Vietnamese wedding invitation that feels contemporary, playful, and editorial while remaining warm, restrained, and appropriate for a traditional Vietnamese celebration. The visual base is ivory, white, beige, and espresso, with terracotta as a sparing accent.

The experience is mobile-first. Three.js is used for one tactile invitation-card moment, not as the primary navigation model. All essential invitation content remains accessible as regular HTML.

## Scope

Included:

- A static React single-page application in Vietnamese.
- Mock wedding imagery that can be replaced later through one content module.
- A countdown to 18:00 on 24 October 2026 in the `Asia/Ho_Chi_Minh` timezone.
- Couple story, photo gallery, Vietnamese ceremony information, map links, a Three.js invitation, and an RSVP interaction.
- Local-only RSVP state: no API calls, persistence, or form submission.
- A QR-code placeholder for the declined RSVP path.

Explicitly excluded:

- Backend, authentication, database, analytics, payment/bank QR generation, guest-list management, and real RSVP collection.
- A full-page 3D book or any content that can only be read through WebGL.

## Experience flow

1. **Hero** — Couple names, wedding date, mock photo, and a live countdown labeled `Còn lại để cùng chung vui`.
2. **Chuyện chúng mình** — Short, intimate story beats with playful editorial type and image composition.
3. **Khoảnh khắc của chúng mình** — A photo-led gallery: an asymmetric editorial grid on desktop and a horizontal scroll-snap carousel on mobile.
4. **Ngày chung đôi** — Separate `Lễ Vu Quy`, `Lễ Thành Hôn`, and reception information. Each event exposes its date, time, venue, address, and an external map link.
5. **Thiệp mời** — A Three.js envelope and invitation-card interaction. The guest can press a clear `Mở thiệp` control or use pointer/touch interaction.
6. **Lời hẹn gặp** — The local RSVP question: `Bạn có thể đến chung vui cùng chúng mình không?`
   - **Có** displays `We're hoping to see you there.`
   - **Không** displays the QR-code placeholder and `Sending us some nice words if you cannot be there.`

The hero CTA scrolls to the event details on small screens and to the invitation section on larger screens. This avoids forcing mobile visitors through a costly 3D scene before they can see key information.

## Visual system

### Palette

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#FBF7F0` | Primary page background |
| `white` | `#FFFFFF` | Cards and high-contrast surfaces |
| `sand` | `#E8D9C5` | Borders, paper depth, subtle sections |
| `espresso` | `#3B2D26` | Primary text and line art |
| `terracotta` | `#B9775B` | Small interactive and celebratory accents |
| `olive` | `#839078` | Rare visual balance for imagery only |

### Typography and layout

- Use **Lora** for display copy and invitation headings; use **Be Vietnam Pro** for interface and body text. Both support Vietnamese diacritics well.
- Use wide whitespace, large editorial headlines, date blocks, ticket-like labels, line-art flourishes, and asymmetric image crops for playful character.
- Avoid generic wedding-template tropes: repeated script fonts, continuous confetti, heavy gradients, loud red/gold, and auto-playing music.
- Keep one fluid content column on mobile. Desktop may introduce editorial grids, but no key content may depend on multi-column layout.

## Technical architecture

### Stack

- Vite, React, and TypeScript with strict compiler settings.
- React Three Fiber and Three.js for the invitation scene.
- Tailwind CSS with CSS custom properties for tokens and responsive design.
- Motion only for lightweight HTML transitions; do not couple page layout to the WebGL scene.

### Module boundaries

```text
src/
  app/                 application shell and section composition
  content/             typed wedding data and mock asset references
  components/          reusable HTML UI primitives
  features/
    countdown/         timezone-aware countdown logic and display
    gallery/           responsive gallery layouts
    invitation-3d/     lazy-loaded R3F scene, controls, and fallback
    rsvp/              local RSVP state and outcome panels
  lib/                 pure formatting, date, and WebGL capability helpers
  styles/              global tokens, font setup, and base styles
```

`content/wedding.ts` is the only source of wedding content. It exports a typed object with couple names, family lines, dates, event cards, story content, mock image metadata, map URLs, QR image reference, and the countdown target. Replacing mock content later requires changing this module and adding assets only.

## Data and state

- The countdown target is an ISO timestamp representing `2026-10-24T18:00:00+07:00`.
- Countdown logic derives the display from the target timestamp and current time. It updates once per second and cannot drift because it never decrements an accumulated local counter.
- Once the target is reached, the hero replaces the clock with `Hôm nay là ngày chung đôi!`.
- RSVP state is a discriminated union: `idle | attending | unableToAttend`. It is local React state and resets on reload.
- Event cards use structured date/time values, not preformatted strings, so presentation stays consistent.

## Three.js invitation

- Lazy-load the scene using a viewport-aware boundary; keep the initial page bundle light.
- Render a low-poly but premium paper invitation: ivory envelope, a slim terracotta border, a couple monogram, soft ambient lighting, and restrained floating floral/leaf accents.
- The scene supports click, drag, touch, keyboard-triggered `Mở thiệp`, and a non-animated fallback.
- A separate semantic HTML invitation contains the same critical event details below or alongside the canvas. Canvas text is decorative only.
- Detect unavailable WebGL, context errors, and rendering failures. Show the animated CSS/HTML invitation instead of an empty canvas.

## Mobile, accessibility, and performance

- Design from 320px upward. Test at 320px, 375px, 768px, 1024px, and 1440px widths.
- Respect `prefers-reduced-motion`: disable card tilt, floating scene elements, nonessential parallax, and time-based decorative animation.
- Use visible focus states, semantic headings, native buttons, meaningful image alt text, and sufficient contrast for all text.
- Never require hover. All interactive behavior has a tap/click alternative.
- Use responsive image sizes and lazy loading outside the hero. Limit 3D texture size and dispose scene resources on unmount.
- The WebGL fallback is a first-class UI, not an error message.

## Failure handling

| Condition | User-facing behavior |
| --- | --- |
| WebGL unsupported or scene crashes | Display the HTML/CSS invitation with the same content and RSVP path. |
| Countdown target passed | Replace counters with the wedding-day message. |
| Missing optional gallery image | Omit that item without breaking the grid or carousel. |
| Invalid map URL | Hide the map action; event address remains readable. |
| Reduced-motion preference | Preserve content and controls; remove only decorative motion. |

## Delivery focus

- Prioritize visual polish, interaction feel, and real-device mobile review over a formal automated test suite.
- Before handoff, run the production build and typecheck, then inspect the page manually at 320px, 375px, 768px, 1024px, and 1440px widths.
- Verify the countdown, RSVP outcomes, WebGL fallback, touch controls, and reduced-motion mode manually as part of visual QA.
