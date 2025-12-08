# UI Navigation & Page Flow

## Overall Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Layout Component                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Header: Logo + Nav (Home, Blog, Categories)     │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Main Content Area                     │  │
│  │  (Different pages render here)                     │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Footer: Copyright                                │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Page Flow

### 1. Home Page (`/`)
```
User lands here
  ↓
Shows: List of all posts (PostCard components)
  ↓
Click post → Goes to /blog/[slug]
Click "Categories" → Goes to /categories
```

### 2. Blog Post Page (`/blog/[slug]`)
```
Structure:
  ├── Title (H1)
  ├── Feature Image (if exists)
  ├── Published Date
  ├── Content Blocks (rendered in order):
  │   ├── Heading blocks
  │   ├── Paragraph blocks
  │   ├── Image blocks (anywhere in content)
  │   ├── Table blocks
  │   ├── CTA blocks (course promotions)
  │   ├── Spacer blocks
  │   └── Multi-column blocks
  └── Bottom CTAs (if any course tags)
```

### 3. Categories Page (`/categories`)
```
Shows: Grid of all category cards
  ↓
Click category → Goes to /category/[slug]
```

### 4. Category Page (`/category/[slug]`)
```
Shows: 
  ├── Category Title
  ├── Post count
  └── List of posts in this category (PostCard components)
      ↓
      Click post → Goes to /blog/[slug]
```

## Content Block Rendering Flow

```
JSON with content_blocks
  ↓
BlockRenderer component
  ↓
For each block:
  ├── type: "heading" → HeadingBlock component
  ├── type: "paragraph" → ParagraphBlock component
  ├── type: "image" → ImageBlock component
  ├── type: "table" → TableBlock component
  ├── type: "cta" → CourseCTA component
  ├── type: "spacer" → SpacerBlock component
  ├── type: "multi-column" → MultiColumnBlock (recursive)
  ├── type: "code" → CodeBlock component (future)
  └── type: "math" → MathBlock component (future)
```

## Component Hierarchy

```
Layout
└── Page Component
    └── Content Area
        ├── PostCard (for lists)
        └── Article (for single post)
            └── BlockRenderer
                ├── HeadingBlock
                ├── ParagraphBlock
                ├── ImageBlock
                ├── TableBlock
                ├── CourseCTA
                ├── SpacerBlock
                └── MultiColumnBlock
                    └── BlockRenderer (recursive)
```

## Navigation Links

```
Header Navigation:
  Home → /
  Blog → / (same as home, shows all posts)
  Categories → /categories
  Courses → /courses (future page)

PostCard Links:
  Title → /blog/[slug]

Category Card Links:
  Category Name → /category/[slug]

Category Page:
  PostCard → /blog/[slug]
```

## Data Flow

```
Ghost CMS
  ↓ (Content API)
Next.js Server
  ↓ (getAllPosts, getPostBySlug)
Page Component
  ↓ (processes content_blocks)
BlockRenderer
  ↓ (renders each block)
UI Components
```

## Example: Complete User Journey

1. **Land on Home** (`/`)
   - Sees 6 posts in cards
   - Each card shows: title, excerpt, date, tags

2. **Click "Introduction to Prompt Engineering"**
   - Goes to `/blog/introduction-to-prompt-engineering`
   - Sees: title, feature image, date
   - Content blocks render in order:
     - Heading: "Introduction"
     - Paragraph: "Prompt engineering is..."
     - Image: Chart showing examples
     - CTA: Course promotion (inline)
     - Heading: "Key Principles"
     - Paragraph: "Be specific..."
     - Table: Comparison table
     - CTA: Another course (bottom)

3. **Click "Categories" in nav**
   - Goes to `/categories`
   - Sees 2 category cards: "Prompt Engineering", "Finance AI"

4. **Click "Prompt Engineering" category**
   - Goes to `/category/prompt-engineering`
   - Sees 4 posts in that category
   - Each post is a PostCard

5. **Click a post**
   - Back to step 2 (post page)

## Styling Consistency

All pages share:
- **Max width**: `max-w-3xl mx-auto` (centered, readable width)
- **Padding**: `px-4 py-10` (consistent spacing)
- **Typography**: Tailwind Typography plugin for prose
- **Colors**: Consistent theme (dark mode support)
- **Spacing**: Consistent gaps between elements

