# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start local dev server → http://localhost:3000
npm run build        # Production build
npx tsc --noEmit     # TypeScript type-check (run before every deploy)
npx vercel --prod    # Deploy to production (must be run in Terminal, not sandbox)
```

No test suite is configured. TypeScript check is the only pre-deploy validation.

## Architecture

**Stack:** Next.js 14 App Router · Supabase (Postgres) · TypeScript · Vercel

The entire public site is a **single server component** (`app/page.tsx`) that fetches one row from Supabase and passes it to `LandingPageView`. All HTML, CSS, and layout live inside that one component as a TypeScript template literal string. There are no separate CSS files, no CSS-in-JS library, no component tree below `LandingPageView`.

```
app/page.tsx                   → Server component, ISR revalidate=60s
  └─ components/LandingPageView.tsx  → 'use client', renders dangerouslySetInnerHTML
        (all CSS in `const CSS = \`...\``)
        (all HTML in template literal returned by component)

public/lalag-init.js           → All client-side JS (cursor, GSAP, animations, marquee)
public/lalag-editor.js         → Dashboard visual editor overlay

app/dashboard/page.tsx         → 'use client', admin UI — reads/writes Supabase directly
app/dashboard/login/           → Cookie-based login (sets ds_session cookie)

lib/supabase.ts                → Shared client + LandingData / Testimonial / FaqItem types
middleware.ts                  → Protects /dashboard/* with ds_session cookie check
```

### CSS + JS split

All styles are in the `CSS` template literal constant inside `LandingPageView.tsx`. Editing styles means editing that string — no `.css` file exists. The component injects this via `<style dangerouslySetInnerHTML>`.

All runtime JS (cursor, GSAP ScrollTrigger animations, marquee, magnetic buttons, ambient glow, social proof ticker) lives in `public/lalag-init.js`. GSAP and ScrollTrigger are loaded via `<script>` tags in the HTML template before `lalag-init.js`. The split is intentional: SSR renders complete HTML+CSS; JS enhances progressively.

### Data model

One Supabase table: `landing_page_settings` — always exactly one row. `testimonials` and `faq_items` are JSONB columns (arrays). `LandingData` in `lib/supabase.ts` is the canonical type; `LandingPageView.tsx` duplicates a subset of it (keep them in sync).

Testimonials shape: `{ id, avatar, name, msg1, time1, msg2, time2 }` — two WhatsApp-style chat bubbles per card.

### Dashboard

Full visual editor at `/dashboard`. Uses a split-pane layout: left panel = layer/field editor, right panel = live iframe preview at configurable device widths (390 / 768 / 1440). Saves to Supabase, then POST to `/api/revalidate` to flush ISR cache.

`/api/save-asset` is **disabled** (returns 403) — do not re-enable.

### Authentication

Dashboard is protected by a cookie `ds_session` checked in `middleware.ts`. The secret is stored as `DASHBOARD_SECRET` env var on Vercel. Login credentials (`zehava` / password) are stored as Vercel env vars — never hardcode them.

### Environment variables

```
NEXT_PUBLIC_SUPABASE_URL        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Supabase anon key
DASHBOARD_SECRET                # Cookie value for dashboard auth
```

`.env.local` must never be committed (already in `.gitignore`).

### Deploy

The sandbox cannot reach the npm registry. All deploys must be run in the user's Terminal: `cd ~/Documents/landing-page-app && npx vercel --prod`. Use `mcp__computer-use__write_clipboard` to copy the command and instruct the user to paste it.

### Key CSS variables (in `:root`)

`--pink` (#F0516A) is the primary brand colour. `--brown` (#1C0A04) is the primary text colour. `--cream` / `--warm` / `--bg` are background variants. `--ease` is the global easing curve. The site is RTL (`direction:rtl`).

### Public assets

Logo variants in `public/`: `lalag-7.png` (used in loader), `lalag-logo.png`, `lalag-color.png`. Portrait photo: `zahava.png`. Videos: `workshop1-3.mp4` + three WhatsApp videos. Images: `lalag-new-1` through `lalag-new-6.png`.
