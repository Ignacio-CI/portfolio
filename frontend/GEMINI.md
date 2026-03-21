# Portfolio Frontend Specifications

## Overview
The frontend is built for `Ignace.dev`, transitioning from a personal portfolio into an agency portfolio specializing in Web Development and AI Integration. The design aesthetic is modern, futuristic, and minimalist ("The Digital Architect").

## Tech Stack
- **Framework:** Astro 5
- **Package Manager:** Bun
- **Styling:** Tailwind CSS v4
- **Components:** Svelte 5 (for dynamic interactivity) & Astro components

## Architecture
- **Stitch UI Generation:** Initial agency UI generated via Google Stitch. The main layout is located in `src/layouts/StitchLayout.astro`. 
- **Tailwind v4:** Global styles are defined in `src/styles/global.css` using the `@theme` directive to inject the custom colors, fonts, and utilities from Stitch. Tailwind is integrated via `@tailwindcss/vite` in `astro.config.mjs`.
- **Components:** Modularized Astro components for the agency landing page are located under `src/components/stitch/` (e.g., Navbar, Hero, Services, Projects, Contact, Footer).

## Design System
- **Colors:** Deep blacks, dark grays, neon purple (`#cc97ff`) and cyan highlights (`#53ddfc`) for a high-tech vibe.
- **Typography:** 
  - Headlines: Space Grotesk
  - Body: Manrope
  - Labels/Buttons: Inter
- **Visuals:** Glassmorphism panels, glowing neon accents, and dark mode base (`class="dark"`).
