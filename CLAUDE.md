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
- **Styling**: TailwindCSS only - no separate CSS files
- **State Management**: React Context API
- **Type Safety**: TypeScript with strict typing
- **Deployment**: Vercel with analytics integration

### Core Business Logic
The recommendation algorithm (`src/utils/recommendations.ts`) uses:
1. User survey responses mapped to perfume characteristics
2. Note matching with emoji associations
3. Preferred perfume boosting for specific IDs (10, 11, 12, 29, 39, 61, 89, 91, 93, 94, 95)
4. Scoring system that prioritizes preferred perfumes

### Project Structure
- `/src/app/` - Page routes following Next.js App Router conventions
- `/src/components/` - Reusable components (Header, SurveyForm, ResultScreen)
- `/src/data/perfumes.ts` - Perfume database with 95+ entries
- `/src/types/` - TypeScript interfaces for Perfume and Survey types
- Dynamic routes: `/parfum/[id]` for individual perfume pages

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