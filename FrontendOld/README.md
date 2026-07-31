# Women Portal — Frontend (TypeScript)

React + TypeScript + Vite frontend for the women-centric support portal.
This is a straight TypeScript conversion of the original JSX project —
same components, same CSS, same routes, same image URLs. Nothing about
the design or app flow was changed; only `.jsx`/`.js` became `.tsx`/`.ts`
with proper types, plus some mobile-responsiveness fixes to the two
carousels (see below).

## Getting started

```bash
npm install
cp .env.example .env      # then fill in your real API URL if needed
npm run dev
```

Build for production (runs a type-check, then builds):

```bash
npm run build
npm run preview            # sanity-check the production build locally
```

## Image placeholders — action needed

Your components reference these files by path, but the actual image
files weren't part of what you uploaded, so I generated stand-ins at
the exact same filenames so nothing 404s. Swap them for your real
assets whenever you're ready — no code changes needed, just replace
the files in place:

| Path                                | Used in            |
|--------------------------------------|---------------------|
| `public/images/logo_w.png`           | `Header.tsx` (left logo) |
| `public/images/logo_s.png`           | `Header.tsx` (right/partner logo) |
| `public/images/Women-Safety1.jpeg`   | `Hero.tsx` top banner, slide 1 |
| `public/images/Women-Safety2.jpeg`   | `Hero.tsx` top banner, slide 2 |
| `public/images/Women-Safety3.jpeg`   | `Hero.tsx` top banner, slide 3 |
| `public/images/hero-main.svg`        | `Hero.tsx` side carousel, slide 1 |
| `public/images/hero-2.svg`           | `Hero.tsx` side carousel, slide 2 |
| `public/images/hero-3.svg`           | `Hero.tsx` side carousel, slide 3 |

Note: `Hero.tsx` references slides 2 and 3 of the top banner as
`/images//Women-Safety2.jpeg` and `/images//Women-Safety3.jpeg` (double
slash) — that's preserved exactly as it was in your original file. Most
servers/browsers normalize the double slash fine, but it's worth
cleaning up to a single slash next time you touch that file.

## What changed in the TS conversion

- Every component got a proper TypeScript interface for its props
  (e.g. `ButtonProps`, `FormHeaderProps`, `CarouselProps`) instead of
  `prop-types` — `prop-types` was dropped since TypeScript now covers
  that at compile time.
- Form state in `RegisterForm.tsx` is fully typed (`FormValues`,
  `FormStatus`, typed change/submit handlers).
- `NavBar.tsx` types its menu structure (`NavItem`/`NavChild`) so
  adding/removing dropdown items is type-checked.
- `Hero.tsx` types the services list against `LucideIcon` from
  `lucide-react`, and the two image arrays against exported
  `SlideImage`/`CarouselImage` types.
- `src/vite-env.d.ts` types `import.meta.env.VITE_API_BASE_URL` so
  `apiClient.ts` doesn't need `any`.
- `tsconfig.app.json` has `noUnusedLocals`/`noUnusedParameters` turned
  **off** on purpose — strict enough to catch real bugs, lenient
  enough that a stray unused import while you're iterating won't fail
  the build.

## Mobile responsiveness fixes

Two things were tightened up so both carousels behave on phones:

- **Top hero banner (`HeroCarousel/Slide.tsx` + `Slide.css`)** — was a
  fixed `500px` / `450px` tall banner regardless of screen width. Now
  uses `height: clamp(...)` so it scales fluidly with viewport width,
  with smaller clamps at the `768px` and `480px` breakpoints. The
  prev/next arrows previously used `display: none` below `768px`
  (they were hover-revealed, which doesn't work on touch) — they're
  now always visible at a slightly smaller size on mobile instead, so
  touch users can still navigate manually.
- **Side carousel (`Carousel.tsx` + `Carousel.css`)** — added a
  `480px` breakpoint that shrinks the nav buttons and tightens dot
  spacing so they don't crowd the smaller image frame.

Everything else (grid stacking at `960px`/`640px`, button full-width
below `768px`, footer/nav responsive behavior) was already responsive
in your original CSS and is untouched.

## Project structure

```
src/
  assets/             Logo SVG components (logo-mark, logo-partner)
  components/
    Header/            Fixed header (image logos + Login button)
    NavBar/            Secondary nav with dropdowns
    Hero/              Two-part hero: top banner Slide + content/side carousel + services
    HeroCarousel/       Full-bleed auto-advancing top banner (Slide)
    Carousel/           Side image carousel next to hero content
    Footer/            Site footer
    FormHeader/         Header used on form pages
    Button/            Shared button component
  pages/
    Home/              Header + NavBar + Hero + Footer
    RegisterForm/       Support-request form
  routes/
    AppRoutes.tsx      Route table (react-router-dom)
  styles/
    theme.css          Design tokens (color, type, spacing, motion) — unchanged
  utils/
    validators.ts       Client-side validation + text sanitization helpers
    apiClient.ts         Centralized fetch wrapper, reads VITE_API_BASE_URL
  vite-env.d.ts         Vite + import.meta.env types
```

## Security notes (unchanged from the original scaffold)

- `.env` is git-ignored; only `.env.example` is committed. Anything
  under `VITE_*` is bundled into the client build and is **public** —
  never put a real secret behind a `VITE_` prefix.
- A baseline CSP is set in `index.html`; tighten it to your real API
  and asset origins before deploying.
- Client-side validation (`utils/validators.ts`) is a UX convenience,
  not a security boundary — the backend must independently validate
  and sanitize every request.
- No source maps in production builds (`vite.config.ts`).
- The "Login" button is still a UI placeholder — when you wire up
  auth, prefer httpOnly cookies over `localStorage` for session
  tokens to reduce XSS-driven token theft risk.
