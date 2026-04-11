# GEMINI.md - Project Context & Instructions

This document provides essential context and instructions for AI agents working on the Ignace.dev Portfolio project.

## Project Overview
A high-end, modern personal and agency portfolio for `Ignace.dev`. The project transitions from a personal site to an agency portfolio specializing in Web Development and AI Integration. The aesthetic is "The Digital Architect"—minimalist, futuristic, and high-tech.

### Architecture
- **Frontend:** Astro 5 + Svelte 5 (runes) + Tailwind CSS v4 + Bun.
- **Backend:** FastAPI + Python 3.13 + AWS Bedrock (Nova models) + Mangum (for Lambda).
- **Infrastructure:** Terraform (AWS S3, Lambda, API Gateway, CloudFront).

---

## Core Mandates & Conventions

### General
1.  **Language:** All code, comments, and documentation MUST be in English.
2.  **Simplicity:** Prefer simple solutions; do not over-engineer.
3.  **Brevity:** Be concise in READMEs and comments.
4.  **No Defensive Programming:** Avoid overly defensive checks; trust the types and internal logic.

### Frontend (Astro & Svelte)
- **Package Manager:** ALWAYS use `bun`. Commands: `bun run dev`, `bun run build`.
- **Astro:** Use accurate Astro 5+ syntax.
- **Svelte:** Use Svelte 5 "Runes" (e.g., `$state`, `$derived`, `$effect`) and built-in transitions.
- **Styling:** Use Tailwind CSS v4 via `@tailwindcss/vite`. Global styles are in `src/styles/global.css`.
- **UI:** Glassmorphism, neon accents (Cyan `#53ddfc`, Purple `#cc97ff`), and dark mode defaults.
- **Stitch UI:** Parts of the UI are generated via Google Stitch. Layout: `src/layouts/StitchLayout.astro`. Components: `src/components/stitch/`.

### Backend (Python & AI)
- **Dependency Management:** ALWAYS use `uv`. Command: `uv run <script>`.
- **Python Version:** 3.13+.
- **AI Model:** AWS Bedrock `amazon.nova-lite-v1:0` (balanced) or `amazon.nova-pro-v1:0` (capable).
- **Deployment:** Backend is wrapped with Mangum for AWS Lambda execution.

---

## Building and Running

### Frontend
```bash
cd frontend
bun install
bun run dev      # Local development
bun run build    # Production build
```

### Backend
```bash
cd backend
uv sync          # Install dependencies
uv run server.py # Local FastAPI server
```

### Deployment
```bash
# Deploys backend to Lambda, applies Terraform, and syncs frontend to S3
./scripts/deploy.sh [dev|test|prod]
```

---

## Key Files & Directories
- `/frontend/src/`: Core frontend source code.
- `/frontend/src/components/stitch/`: Agency-specific UI components.
- `/backend/server.py`: FastAPI application logic and Bedrock integration.
- `/backend/context.py`: AI system prompts and personality definitions.
- `/terraform/`: Infrastructure as Code for AWS resources.
- `/scripts/deploy.sh`: Orchestration script for full-stack deployment.

---

## Development Workflow
1.  **Research:** Analyze existing Astro/Svelte patterns before adding new components.
2.  **Styles:** Check `src/styles/global.css` for existing Tailwind `@theme` variables before adding custom colors.
3.  **AI Integration:** Modify `backend/context.py` to tune the "Digital Twin" personality.
4.  **Verification:** Always test frontend changes with `bun run dev` and backend changes with `uv run server.py`.
