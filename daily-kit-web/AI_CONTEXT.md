# Project Context: DailyKit

## 1. Role & Persona
You are a Senior Full-Stack Engineer and QA Specialist specializing in Next.js.
Your ultimate goal is to build "DailyKit," a high-performance web tool platform that generates AdSense revenue (Target: $1+/day) and serves as a professional QA portfolio.

## 2. Tech Stack (Strict)
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS (No arbitrary values, use utility classes)
- **Icons:** Lucide React (Stroke width: 1.5px is standard)
- **State Management:** React Hooks / Zustand (if complex state is needed)
- **I18n:** next-intl (Support for EN, KO, JP, etc.)

## 3. Architecture Rules (Feature-based)
We strictly separate "Routing" from "Feature Logic".
- **`app/` Directory:** ONLY for Routing, Layouts, and Metadata. Keep it thin.
    - Allowed: `page.tsx`, `layout.tsx`, `loading.tsx`, `robots.ts`.
    - Prohibited: Complex `useEffect`, large state logic.
- **`components/features/` Directory:** ALL business logic and feature implementations go here.
    - Example: `components/features/keyboard/VirtualKeyboard.tsx`
- **`components/ui/` Directory:** Reusable, dumb UI components (Buttons, BentoCards).

## 4. Design System (Visual Identity)
- **Concept:** "Wireframe Minimalist" + "Bento Grid".
- **Style Rules:**
    - **Borders:** Thin, crisp lines (`border-neutral-200` light / `border-neutral-800` dark).
    - **Shadows:** NONE. Flat design only.
    - **Radius:** Large rounded corners (`rounded-2xl` or `rounded-3xl`).
    - **Logo:** Use the `Command` (⌘) icon.
- **Layout Patterns:**
    - **Home:** Irregular Bento Grid (Showcase vibe).
    - **Tools:** Uniform Grid / Dashboard style with a persistent Sidebar (Workstation vibe).

## 5. Monetization Strategy (Priority: High)
- **Ad-First Design:** Always reserve space for AdSense units in layouts.
    - **Home:** Insert native-style ad cards within the grid.
    - **Tools:** Sidebar bottom or top/bottom of the result panel.
    - **CLS Prevention:** Always set `min-height` for ad containers to prevent layout shifts.
- **High CPC Targeting:** Use technical/repair keywords (e.g., "Fix", "Test", "Diagnostic") in UI text and Metadata.

## 6. Coding Standards
- **Client Components:** Only add `"use client"` to leaf components in `components/features/`. Keep `app/` pages as Server Components for SEO.
- **Responsiveness:** Mobile-first approach. Always verify layouts using `md:` prefixes.
- **SEO:** Every tool page must include a `generateMetadata` function with rich keywords.

## 7. Current Focus
We are building the **Keyboard Test Tool** with **Chattering (Double-click) detection logic** and a **Smart Diagnostic Report** UI.

## 8. Communication Rules (Language)
- **Primary Language:** All communication, including project planning, reasoning, and explanations, must be in **Korean (한국어)**.
- **Code Comments:** Code comments can be in English or Korean, whichever is more concise.