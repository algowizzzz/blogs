# Architecture Overview

## System Components

### Ghost(Pro) - Headless CMS
- **Role**: Content management and authoring
- **Location**: `https://deeplearnhq.ghost.io`
- **API**: Content API (read-only)
- **Integration**: Via `@tryghost/content-api` SDK

### Next.js Frontend
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Rendering**: Dynamic rendering (force-dynamic) for real-time content

### Key Files
- `lib/ghost.ts` - Ghost API client and helper functions
- `app/page.tsx` - Home page listing all posts
- `app/blog/[slug]/page.tsx` - Individual blog post pages
- `components/Layout.tsx` - Global layout with navigation

## Data Flow

1. **Content Creation**: Authors create posts in Ghost admin
2. **API Access**: Next.js fetches content via Ghost Content API
3. **Rendering**: Pages render dynamically on each request
4. **Caching**: ISR with 60s revalidation

## Environment Variables

- `GHOST_API_URL` - Ghost instance URL
- `GHOST_CONTENT_KEY` - Content API key (read-only)

## Tag Conventions

### Categories
- Format: `category:slug-name`
- Example: `category:prompt-engineering`
- Used for organizing posts into topic sections

### Courses
- Format: `course:course-id`
- Example: `course:prompt-bootcamp`
- Triggers automatic course CTAs on posts

### Regular Tags
- Standard tags for general categorization
- Example: `news`, `tutorial`, `ai`

