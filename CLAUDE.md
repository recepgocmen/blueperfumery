# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Architecture Overview

This is a Next.js 15 perfume recommendation system using App Router. The application helps users discover perfumes through an interactive quiz that analyzes their preferences.

### Key Technical Decisions
- **Framework**: Next.js 15 with App Router (not Pages Router)
- **Styling**: TailwindCSS only (tokens in `tailwind.config.ts`, base layer in `globals.css`)
- **Type Safety**: TypeScript with strict typing
- **Deployment**: Vercel with analytics integration

### Core Business Logic
- The catalog lives in MongoDB and is read through the API (`src/lib/api.ts`); nothing about products is hardcoded here.
- `src/lib/catalog.ts`: scent families, featured ids, price/campaign helpers, photo resolution (`/perfumes/<id>.webp`, falling back to the shared bottle), `askMira()`.
- `src/lib/quiz.ts`: questions and the pure scoring for "Parfümünü Bul" (`quiz.check.ts` is its self-check).
- Mira (`src/components/ChatBot.tsx`) only renders what `POST /chat` returns; the server owns grounding and history.

### Project Structure
- `/src/app/` - routes: home, `/satin-al`, `/kadin-parfum`, `/erkek-parfum`, `/nis-parfum`, `/parfum/[id]`, `/parfumunu-bul`, `/hakkimizda`
- `/src/components/` - Header, Footer, ScentMenu (home hero), HomeShelf, ProductTile, ProductImage, Price, MiraAsk, ChatBot
- `/public/perfumes/` - one product photo per product id
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/` - product context and the design system; read them before changing UI

### Development Patterns
From .cursorrules:
- Use const arrow functions: `const handleClick = () => {}`
- Implement early returns for readability
- Use descriptive function names
- All styling via TailwindCSS classes
- Follow DRY principles
- Ensure accessibility features

### External Integrations
- **E-commerce**: Shopier links for purchases (external)
- **Analytics**: Vercel Analytics (@vercel/analytics)
- **Currency**: USD to TRY exchange rate hook