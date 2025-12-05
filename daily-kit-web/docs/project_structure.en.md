# Project Structure Documentation

## Project Purpose
**DailyKit** is a comprehensive web-based toolkit designed to provide essential utilities for users and developers. It aims to be a "Daily Kit" that people can rely on for various tasks.
- **Screen Tests**: Tools to check for dead pixels, burn-in, and other display issues.
- **Device Tests**: Utilities to verify the functionality of input devices like keyboards, mice, and gamepads.
- **Developer Tools**: A collection of helpers for developers (e.g., JSON formatter).
- **Blog**: A section for sharing updates and technical insights.

## Overview
**DailyKit Web** is a Next.js 16 application built with React 19, Tailwind CSS 4, and TypeScript. It uses `next-intl` for internationalization.

## Directory Layout

### Root Directory
- **`app/`**: Contains the App Router file system.
    - `[locale]/`: Root layout and pages, localized.
    - `globals.css`: Global styles and CSS variables.
- **`components/`**: React components, strictly separated by purpose.
    - `features/`: Feature-specific logic and UI (e.g., `device`, `home`, `tools`).
    - `layout/`: Global layout components (`Header`, `Footer`).
    - `ui/`: Reusable UI primitives (`BentoCard`, etc.).
- **`i18n/`**: Internationalization configuration (`request.ts`, `routing.ts`).
- **`messages/`**: JSON translation files (`en.json`, `ko.json`).
- **`public/`**: Static assets (images, sounds).

### Key Architectural Patterns
1.  **Separation of Concerns**:
    - `app/` directory handles **routing** and **metadata** only.
    - `components/features/` handles **business logic** and **UI implementation**.
    - All client-side logic (`"use client"`) should reside in `components/features`.

2.  **Internationalization (i18n)**:
    - Uses `next-intl`.
    - All routes are wrapped in `[locale]`.
    - Text content should be extracted to `messages/*.json`.

3.  **Styling**:
    - **Tailwind CSS 4** is the primary styling engine.
    - **CSS Variables** in `globals.css` define the color theme (supports dark mode).
    - **Bento Grid** design system is used for the main layout.

## Key Files
- `package.json`: Dependencies and scripts.
- `middleware.ts`: Handles locale routing and redirection.
- `next.config.ts`: Next.js configuration.
