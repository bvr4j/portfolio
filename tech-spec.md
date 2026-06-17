# Tech Spec — Tanish Panwar Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.0 | UI framework |
| react-dom | ^18.3.0 | React DOM renderer |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.3.0 | Vite React plugin |
| typescript | ^5.6.0 | Type safety |
| tailwindcss | ^4.0.0 | Utility CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |
| three | ^0.170.0 | 3D engine |
| @react-three/fiber | ^8.17.0 | React renderer for Three.js |
| @react-three/drei | ^9.114.0 | R3F helpers (Html, Billboard, useTexture) |
| framer-motion | ^11.15.0 | Declarative component animations, AnimatePresence |
| gsap | ^3.12.0 | Core animation engine + ScrollTrigger + ScrollToPlugin |
| lenis | ^1.1.0 | Smooth scroll with inertia |
| lucide-react | ^0.460.0 | UI icons |
| simple-icons | ^13.21.0 | Tech brand SVGs (React, Python, GitHub, etc.) |
| clsx | ^2.1.0 | Conditional class composition |
| tailwind-merge | ^2.6.0 | Tailwind class deduplication |

Font: Instrument Serif and Inter loaded via Google Fonts `<link>` tags in `index.html`. No npm font packages.

---

## Component Inventory

### Layout (shared)

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed top bar. Hidden initially, appears after 100vh scroll. Mobile: full-screen hamburger overlay. Active link tracked via ScrollTrigger. |
| Footer | Custom | Minimal bottom bar with copyright and social icons. |
| SocialLinksBar | Custom | Horizontal row of icon+text links (GitHub, LinkedIn, Email). Used in Contact section and Footer. |
| ScrollIndicator | Custom | Chevron bounce + "SCROLL" text. Fades out at 100px scroll. |

### Sections (page-specific, used once)

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | 300vh pinned. Wraps text overlay + R3F canvas. Orchestrates the opening text sequence and 3D scene lifecycle. |
| StudentSection | Custom | Chapter 1. Narrative block, education cards, journey timeline. |
| SkillsGalaxySection | Custom | 200vh pinned. Wraps R3F canvas for the orbital galaxy scene. |
| BuilderSection | Custom | Chapter 3. TalentIQ showcase. Product mockup, info grid, tech stack, roadmap. |
| ImpactSection | Custom | Chapter 4. Opportunity cards grid, closing statement. |
| VisionSection | Custom | Chapter 5. Background image with parallax, focus tags, ambition quote. |
| ContactSection | Custom | Final section. Social links, email copy-to-clipboard, ambient background drift. |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| ChapterLabel | Custom | Student, Builder, Impact, Vision, Contact sections |
| Card | Custom | Education cards, info cards, opportunity cards |
| Tag | Custom | Tech stack tags, education tags, focus area tags |
| Button (Primary + Ghost) | Custom | Builder CTA, potential future CTAs |
| Timeline | Custom | Student journey, Builder roadmap |
| InterestCard3D | Custom | Hero 3D scene — special card that exists in both R3F (mesh) and DOM (Html overlay). See architecture note below. |

### 3D Scene Components

| Component | Source | Notes |
|-----------|--------|-------|
| ParticleField | Custom (R3F) | Hero scene. 200-300 points drifting with SimplexNoise turbulence. |
| InterestCardsOverlay | Custom (R3F) | Hero scene. Manages 4 InterestCard3D instances, their float animation, parallax, and glow. |
| SkillsGalaxy | Custom (R3F) | Galaxy scene. Central hub, 4 orbital rings, 15 skill nodes, star field, camera controller. |

### Hooks

| Hook | Purpose |
|------|---------|
| useMousePosition | Normalized `[-1, 1]` mouse coords for 3D parallax. Shared between Hero and Galaxy scenes. |
| useReducedMotion | Detects `prefers-reduced-motion: reduce`. Returns boolean; 3D scenes read this to disable animations. |
| useClipboard | Copy-to-clipboard with success state. Used by Contact email display. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Hero text sequence (scroll-driven fade in/out) | GSAP + ScrollTrigger | Single scrubbed timeline on pinned hero. Each text line: `fromTo` for fade-in at specific progress point, `.to` for fade-out at next point. 6 lines distributed across 0-33% of 300vh pin. | **High** 🔒 |
| Hero 3D scene entrance/exit | GSAP + ScrollTrigger | Separate scrubbed timeline for 3D elements. Particle fade (33-40%), card fly-in from z:-500 staggered (40-65%), camera rotation (33-66%), scene exit (66-100%). | **High** 🔒 |
| 3D Particle field | @react-three/fiber (useFrame) | Custom ParticleField component. PointsGeometry with individual velocity vectors. SimplexNoise for turbulence. Wrap-around bounds at ±100 units. | **High** 🔒 |
| 3D Interest cards floating + parallax | @react-three/fiber (useFrame) | Per-frame sine-wave Y-offset for floating. Lerp (factor 0.05) toward mouse-derived target position for parallax. Independent phase/speed per card. | **High** 🔒 |
| Skills galaxy scene | @react-three/fiber + drei | Custom galaxy with hub sphere, 4 torus rings, 15 node spheres with glow halos, star field. Rings rotate at different speeds per frame. | **High** 🔒 |
| Galaxy scroll-driven camera | GSAP + ScrollTrigger | Scrubbed timeline on pinned galaxy. Camera `rotationY` from 0.5 to -0.5 over 200vh pin. Combined additively with auto-orbit and mouse influence. | **High** 🔒 |
| Skills galaxy entrance sequence | GSAP timeline | Orchestrated multi-step: hub scale (800ms), rings fade staggered 150ms apart, nodes pop-in with Elastic easing 50ms stagger, star field fade (1000ms). Triggered on section enter. | **Medium** |
| Hero pin + Galaxy pin | GSAP ScrollTrigger | Two separate `ScrollTrigger.create({ pin: true })` calls. Hero: 300vh. Galaxy: 200vh. Both with `scrub: 1`. | **Medium** |
| Scroll-triggered reveals | GSAP + ScrollTrigger | Batch pattern: `gsap.utils.toArray` + `fromTo` with `start: "top 85%"`, `toggleActions: "play none none none"`. Stagger via `delay: index * 0.15`. Applied globally to `.reveal-element` class. | **Medium** |
| Timeline draw animation | GSAP + ScrollTrigger | Connector line: `scaleY: 0 → 1` with `transformOrigin: top`. Items: `translateX: -16 → 0` staggered 200ms. Triggered at 80% viewport. | **Medium** |
| Smooth scrolling | Lenis | Lenis instance with `lerp: 0.08`, `wheelMultiplier: 0.8`. Connected to GSAP ticker: `lenis.raf(time * 1000)` on `gsap.ticker`. | **Medium** |
| Navigation entrance/scroll-state | Framer Motion | `motion.nav` with `animate` prop for translateY. Scroll state (background, border, blur) via ScrollTrigger callback setting React state, then CSS transition. | **Low** |
| Card hover effects | CSS transitions | Pure Tailwind/CSS: border-color, background-color, box-shadow transitions at 200ms. | **Low** |
| Card component entrance | Framer Motion | `motion.div` with `whileInView`: `opacity: 0 → 1`, `y: 24 → 0`. Used by Card component internally. | **Low** |
| Chapter label entrance | Framer Motion | Dot: `scale: 0 → 1` with spring. Text: `opacity + translateY` with stagger. | **Low** |
| Scroll indicator bounce + fade | Framer Motion | Chevron: `animate={{ y: [0, 6, 0] }}` with `repeat: Infinity`. Fade-out on scroll via state. | **Low** |
| Mobile menu | Framer Motion | `AnimatePresence` + `motion.div` for overlay. Links stagger in at 100ms. | **Low** |
| Background parallax (Vision) | GSAP + ScrollTrigger | `translateY` from -5% to 5% scrubbed over section scroll. | **Low** |
| Contact ambient drift | CSS animation | `@keyframes ambientDrift` on `background-position`, 20s infinite. Pure CSS, no JS. | **Low** |
| Copy-to-clipboard tooltip | Framer Motion | `AnimatePresence` for tooltip fade in/out. 200ms transitions. | **Low** |

---

## State & Logic Plan

### InterestCard3D: R3F + DOM Hybrid Architecture

Each interest card must simultaneously exist as a 3D mesh (position, rotation, scale in R3F scene) and as styled HTML content (text, icons, CSS hover effects). The architecture:

- **R3F side**: Each card is an invisible `mesh` (or empty `group`) at its 3D position. This mesh's world position is read every frame via `mesh.getWorldPosition()`.
- **DOM side**: A single `Html` container (from drei) is attached to each card's mesh. Inside: the actual card UI (icon, title, description, meta). The `Html` component handles the 3D-to-2D projection automatically.
- **Hover**: Handled by CSS on the DOM content inside `Html`. R3F `onPointerOver`/`onPointerOut` also trigger `translateZ` shift on the mesh parent.
- **Rationale**: Drei's `Html` syncs DOM elements to 3D positions per frame. This is the standard R3F pattern for rich HTML inside 3D scenes — avoids manual projection math and keeps text crisp.

### Global Scroll Orchestration

Lenis owns the scroll loop. GSAP's ticker drives Lenis (`lenis.raf`). ScrollTrigger updates fire through Lenis's `on('scroll')` callback. This means:

- No `requestAnimationFrame` loops competing between Lenis and GSAP.
- All scrubbed animations (hero text, galaxy camera) are frame-synced to Lenis output.
- The setup happens once in a top-level provider component.

### Mouse Position: Shared Ref (Not State)

Mouse position for 3D parallax must update every frame without causing React re-renders. Implementation: a `useRef` storing normalized `[-1, 1]` coords, updated via a window `mousemove` listener. R3F `useFrame` hooks read the ref directly. Both Hero and Galaxy scenes consume the same ref instance, passed via React context.

### Canvas Lifecycle: Render-on-Demand

Two R3F canvases exist on the same page. To avoid rendering both simultaneously:

- Each canvas section uses `IntersectionObserver` to detect visibility.
- When section is out of viewport: set `frameloop="demand"` (R3F only renders when explicitly invalidated).
- When section enters viewport: set `frameloop="always"`.
- This is implemented as a `useCanvasVisibility` hook that returns a boolean, consumed by each canvas's `frameloop` prop.

---

## Other Key Decisions

### Raw Three.js over specialized particle libraries

The particle field (200-300 points) and galaxy nodes (15 spheres + stars) are simple enough to implement directly with `PointsGeometry` and `InstancedMesh`. No need for `@react-three/postprocessing` beyond the single `UnrealBloomPass`, or particle-specific libraries like `three-particle-fire`.

### No shadcn/ui components

The design is entirely custom with no standard UI patterns (no forms, dialogs, tables, dropdowns). All components (cards, tags, buttons, timeline) are custom-built. No shadcn installation needed.

### Simple Icons: Inline SVG strategy

`simple-icons` provides SVG path data as a JS object. Each skill icon is rendered as an inline `<svg>` with the path data. This avoids importing the entire icon font and allows per-icon color/size control. A helper component `SimpleIcon` takes a `slug` prop and renders the corresponding SVG.
