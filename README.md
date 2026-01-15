# Blue Perfumery

AI-powered perfume e-commerce frontend with personalized fragrance finder and intelligent chatbot, built with Next.js 15 and TailwindCSS.

🌐 **Live**: [blueperfumery.com](https://www.blueperfumery.com/)

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.1+ | React Framework (App Router) |
| React | 19+ | UI Library |
| TypeScript | 5+ | Type Safety |
| TailwindCSS | 3.4+ | Styling |
| Lucide React | 0.562+ | Icons |
| Vercel Analytics | 1.5+ | Performance Tracking |

## AI Features

### 🤖 Mira - AI Perfume Consultant (Claude 3.5 Haiku)

Intelligent chatbot powered by **Anthropic Claude 3.5 Haiku** that provides:
- Personalized perfume recommendations based on user preferences
- Natural conversation with context awareness
- Real-time product suggestions with direct purchase links
- User profiling (gender, occasion, season, personality)

### 🎯 Smart Recommendation Engine

Survey-based recommendation system that analyzes:
- User preferences (notes, intensity, occasion)
- Personality matching
- Season and style compatibility
- Budget considerations

## Features

- **Perfume Finder** - Interactive survey for personalized recommendations
- **AI Chatbot** - "Mira" fragrance consultant with Claude Haiku integration
- **Category Pages** - Men's, Women's, and Niche perfume collections
- **Product Details** - Rich perfume profiles with notes and characteristics
- **Responsive Design** - Mobile-first, accessibility-focused
- **SEO Optimized** - Server-side rendering with Next.js

## Getting Started

```bash
# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── parfum/[id]/    # Product detail pages
│   ├── parfumunu-bul/  # AI Perfume Finder
│   ├── erkek-parfum/   # Men's collection
│   ├── kadin-parfum/   # Women's collection
│   └── nis-parfum/     # Niche collection
├── components/         # React components
│   ├── ChatBot.tsx     # Mira AI chatbot (Claude Haiku)
│   ├── SurveyForm.tsx  # Recommendation survey
│   └── PerfumeCard.tsx # Product cards
├── lib/                # API client
├── utils/              # Recommendation algorithm
└── types/              # TypeScript definitions
```

## API Integration

```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://blueperfumery-backend.vercel.app/api
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
