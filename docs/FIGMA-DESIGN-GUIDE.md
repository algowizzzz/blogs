# Complete Figma Design Guide - DeepLearnHQ Blog

## Overview
Design a world-class blog UI for DeepLearnHQ - an AI and prompt engineering education platform. This guide covers **every single page and state** that needs to be designed.

**Inspiration:** [learnprompting.org](https://learnprompting.org/) - clean, modern, trustworthy, conversion-focused design.

---

## Design System (Create First)

### Color Palette
```
Primary Blue: #553DB8 (or #7553FF for lighter)
Secondary Indigo: #6341F0
Accent Green: #00F261 (for success/CTAs)
Text Dark: #181423
Text Medium: #6E6C75
Text Light: #A49FB5
Background White: #FFFFFF
Background Light: #F8F9FA
Border: #E5E7EB
Error Red: #E50045
Warning: #FFA500
```

### Typography Scale
```
H1 (Hero): 48px / 56px line-height / Bold
H1 (Page): 40px / 48px line-height / Bold
H2: 32px / 40px line-height / Bold
H3: 24px / 32px line-height / Semibold
H4: 20px / 28px line-height / Semibold
Body Large: 18px / 28px line-height / Regular
Body: 16px / 24px line-height / Regular
Body Small: 14px / 20px line-height / Regular
Caption: 12px / 16px line-height / Regular
```

### Spacing System (8px grid)
```
XS: 4px
SM: 8px
MD: 16px
LG: 24px
XL: 32px
2XL: 48px
3XL: 64px
4XL: 96px
```

### Component Sizes
```
Button Height: 44px (mobile), 48px (desktop)
Input Height: 44px
Card Padding: 24px
Section Padding: 64px (desktop), 32px (mobile)
Max Content Width: 1200px
Article Max Width: 800px
```

---

## ALL PAGES TO DESIGN

### 1. Homepage (`/`)
**Purpose:** Main landing page showing latest blog posts

**Sections:**
- **Header/Navigation** (sticky)
  - Logo (left)
  - Nav links: Home, Blog, Categories, Courses (right)
  - Mobile: Hamburger menu
  
- **Hero Section**
  - Large headline: "Master AI & Prompt Engineering"
  - Subheadline: "Learn practical AI, prompt engineering, and ChatGPT workflows for real business applications"
  - Primary CTA: "Start Learning Free" or "Browse Articles"
  - Optional: Background gradient or subtle pattern
  - Trust indicator: "Trusted by 3,000,000+ learners" (if applicable)

- **Featured Post Section** (if you have featured posts)
  - Large featured card (full width or 2/3 width)
  - Image, title, excerpt, category tag, CTA

- **Latest Articles Grid**
  - 3 columns (desktop), 2 (tablet), 1 (mobile)
  - Post cards with:
    - Featured image (16:9 ratio)
    - Category tag
    - Title (2 lines max)
    - Excerpt (3 lines max)
    - Date
    - Read more link
  - Hover state: Shadow, slight lift, scale

- **Newsletter/CTA Section** (optional)
  - Email signup or course promotion
  - Gradient background

- **Footer**
  - Links: About, Privacy, Terms
  - Social icons
  - Copyright

**States to Design:**
- Default
- Loading (skeleton cards)
- Empty (no posts)
- Mobile (375px)
- Tablet (768px)
- Desktop (1440px)

---

### 2. Blog Post Detail Page (`/blog/[slug]`)
**Purpose:** Individual blog post with full content

**Sections:**
- **Header/Navigation** (same as homepage)

- **Breadcrumbs**
  - Home > Blog > Post Title
  - Small text, clickable links

- **Article Header**
  - Title (H1, large)
  - Feature image (full width, 16:9 or custom height)
  - Meta info: Date, reading time (optional)
  - Category tags

- **Article Content**
  - Max width: 800px (centered)
  - Typography: Clean, readable
  - Headings (H2, H3)
  - Paragraphs with good line-height
  - Images (with captions)
  - Tables (styled)
  - Code blocks (if any)
  - Lists (bulleted, numbered)
  - Blockquotes
  - Links (styled)

- **Course CTA (Inline)**
  - Appears after intro paragraph
  - Gradient background
  - Course title, subtitle, badge, CTA button

- **Social Sharing**
  - Below article content
  - Buttons: Twitter, Facebook, LinkedIn, Copy Link
  - Native share button (mobile)

- **Related Posts**
  - Section title: "Related Articles"
  - Grid: 2 columns (desktop), 1 (mobile)
  - Cards with image, title, excerpt, date

- **Footer** (same as homepage)

**States to Design:**
- Default
- With multiple CTAs
- With/without feature image
- Mobile
- Tablet
- Desktop

---

### 3. Categories Listing Page (`/categories`)
**Purpose:** Show all available categories

**Sections:**
- **Header/Navigation**

- **Breadcrumbs**
  - Home > Categories

- **Page Header**
  - Title: "Categories"
  - Description: "Browse articles by topic"

- **Categories Grid**
  - 3 columns (desktop), 2 (tablet), 1 (mobile)
  - Category cards:
    - Category name (formatted: "Prompt Engineering")
    - Post count: "X articles"
    - Optional: Category icon or image
    - Hover: Shadow, lift

- **Footer**

**States:**
- Default
- Empty (no categories)
- Mobile/Tablet/Desktop

---

### 4. Category Detail Page (`/category/[slug]`)
**Purpose:** Show all posts in a specific category

**Sections:**
- **Header/Navigation**

- **Breadcrumbs**
  - Home > Categories > Category Name

- **Category Header**
  - Category name (formatted)
  - Description: "X articles in this category"
  - Optional: Category description

- **Posts Grid**
  - Same as homepage blog grid
  - 3 columns (desktop), 2 (tablet), 1 (mobile)
  - Post cards (same design as homepage)

- **Pagination** (if you have many posts)
  - Previous/Next buttons
  - Page numbers

- **Footer**

**States:**
- Default
- Empty (no posts in category)
- With pagination
- Mobile/Tablet/Desktop

---

### 5. 404 Not Found Page (`/not-found`)
**Purpose:** Handle broken links gracefully

**Sections:**
- **Header/Navigation** (optional, can be minimal)

- **Error Content** (centered)
  - Large "404" text
  - Title: "Page Not Found"
  - Description: "The page you're looking for doesn't exist or has been moved."
  - CTAs:
    - Primary: "Go Home"
    - Secondary: "Browse Categories"
  - Optional: Illustration or icon

- **Footer**

**States:**
- Default
- Mobile/Desktop

---

### 6. Blog Index Page (`/blog`)
**Purpose:** Alternative blog listing (if different from homepage)

**Note:** Currently homepage shows all posts. If you want a separate `/blog` page, design it similar to homepage but focused on blog posts only.

**Sections:**
- Same as homepage but without hero section
- Direct to blog grid
- Optional: Filters, search, sorting

---

### 7. Courses Page (`/courses`)
**Purpose:** List all available courses (if you create this page)

**Sections:**
- **Header/Navigation**

- **Breadcrumbs**
  - Home > Courses

- **Page Header**
  - Title: "Our Courses"
  - Description: "Master AI and prompt engineering with our comprehensive courses"

- **Courses Grid**
  - 3 columns (desktop), 2 (tablet), 1 (mobile)
  - Course cards:
    - Course image
    - Badge (if applicable: "Best Seller", "New")
    - Title
    - Subtitle/Description
    - Price or "View Course" CTA
    - Hover: Shadow, lift

- **Footer**

**States:**
- Default
- Empty
- Mobile/Tablet/Desktop

---

## COMPONENT LIBRARY (Create Reusable Components)

### Navigation Components

**Header/Navbar**
- Desktop: Horizontal layout
- Mobile: Hamburger menu
- States: Default, Scrolled (optional: change background)
- Logo: Left side
- Nav links: Right side
- Active state: Underline or color change

**Footer**
- Links organized in columns
- Social icons
- Copyright text
- Optional: Newsletter signup

**Breadcrumbs**
- Small text, clickable
- Separator: "/" or ">"
- Last item: Non-clickable, bold

### Content Components

**Blog Post Card**
- Variants:
  - Featured (large, prominent)
  - Regular (standard grid)
  - Compact (smaller, list view)
- Elements:
  - Image (16:9 ratio)
  - Category tag
  - Title
  - Excerpt
  - Date
  - Read more link
- States: Default, Hover, Loading (skeleton)

**Category Card**
- Category name
- Post count
- Optional: Icon/image
- Hover state

**Course CTA Card**
- Gradient background
- Badge (optional)
- Title
- Subtitle
- CTA button
- Variants: Inline, Bottom, Sidebar

**Related Post Card**
- Smaller than main post card
- Image, title, excerpt, date
- Hover state

### Form Components

**Button**
- Variants:
  - Primary (solid, gradient)
  - Secondary (outline)
  - Ghost (text only)
  - Link (text link style)
- Sizes: Small, Medium, Large
- States: Default, Hover, Active, Disabled, Loading

**Input Field**
- Text input
- Search input (with icon)
- States: Default, Focus, Error, Disabled

### Content Blocks (for blog posts)

**Heading Styles**
- H1, H2, H3, H4 with proper hierarchy

**Paragraph**
- Body text with good line-height
- Links styled

**Image Block**
- Full width or constrained
- Caption (optional)
- Alignment: Left, Center, Right

**Table**
- Styled table
- Header row (different background)
- Alternating row colors
- Borders

**Blockquote**
- Left border
- Italic text
- Optional: Author attribution

**Code Block**
- Monospace font
- Dark background
- Syntax highlighting colors

**List**
- Bulleted
- Numbered
- Nested lists

**Spacer**
- Different heights (small, medium, large)

**Multi-column Layout**
- 2 columns
- 3 columns
- Image + text side by side

### Social Components

**Social Share Buttons**
- Twitter (blue)
- Facebook (dark blue)
- LinkedIn (blue)
- Copy Link (gray)
- Native Share (mobile only)
- States: Default, Hover, Active (copied)

### Utility Components

**Loading Skeleton**
- For post cards
- For article content
- Animated shimmer effect

**Empty State**
- Icon/illustration
- Title
- Description
- Optional CTA

**Error State**
- Icon
- Title
- Description
- CTA to retry or go home

---

## RESPONSIVE BREAKPOINTS

Design for these breakpoints:

**Mobile:**
- Width: 375px (iPhone)
- Single column layouts
- Stacked navigation
- Full-width cards
- Touch-friendly buttons (44px min height)

**Tablet:**
- Width: 768px (iPad)
- 2-column grids
- Horizontal navigation
- Medium spacing

**Desktop:**
- Width: 1440px (standard)
- 3-column grids
- Full navigation
- Generous spacing

**Large Desktop:**
- Width: 1920px (optional)
- Max content width: 1200px (centered)
- Extra spacing

---

## INTERACTIVE STATES

### Hover States
- **Cards:** Shadow increase, slight lift (translateY -4px)
- **Buttons:** Background color change, scale (1.02)
- **Links:** Underline or color change
- **Images:** Slight zoom (1.05) with smooth transition

### Active States
- **Buttons:** Pressed down effect
- **Links:** Color change
- **Navigation:** Active page highlighted

### Focus States
- **Inputs:** Border color change, outline
- **Buttons:** Outline ring
- **Links:** Outline (accessibility)

### Loading States
- **Skeleton loaders:** Animated shimmer
- **Buttons:** Spinner, disabled state
- **Cards:** Placeholder with shimmer

### Empty States
- **No posts:** Illustration, message, CTA
- **No categories:** Message, link to create
- **404:** Error message, navigation options

---

## MICRO-INTERACTIONS

### Animations
- **Page transitions:** Fade in (200ms)
- **Card hover:** Smooth lift (150ms)
- **Button hover:** Color transition (150ms)
- **Image load:** Fade in (300ms)
- **Scroll reveal:** Fade up on scroll (optional)

### Transitions
- All interactive elements: 150-200ms ease-in-out
- Smooth, not jarring
- Consistent timing

---

## ACCESSIBILITY CONSIDERATIONS

### Color Contrast
- Text on background: WCAG AA (4.5:1 minimum)
- Large text: WCAG AA (3:1 minimum)
- Interactive elements: Clear focus states

### Typography
- Minimum font size: 14px
- Line height: 1.5 minimum
- Readable font weights

### Interactive Elements
- Minimum touch target: 44x44px
- Clear focus indicators
- Keyboard navigation support

---

## FIGMA AI PROMPTS (Step by Step)

### Step 1: Design System
```
Create a complete design system for DeepLearnHQ blog:

1. Color palette with primary, secondary, accent, text, and background colors
2. Typography scale (H1-H4, body, caption) with sizes, weights, line-heights
3. Spacing system (8px grid)
4. Component tokens (button heights, padding, border radius)

Reference: learnprompting.org for professional, modern aesthetic
```

### Step 2: Wireframes - All Pages
```
Create low-fidelity wireframes for ALL pages:

1. Homepage (/) - hero, featured post, blog grid
2. Blog post detail (/blog/[slug]) - article, CTAs, related posts
3. Categories listing (/categories) - category grid
4. Category detail (/category/[slug]) - posts in category
5. 404 page (/not-found) - error state
6. Courses page (/courses) - course grid (if applicable)

Include mobile (375px), tablet (768px), and desktop (1440px) versions.
Focus on layout, spacing, and information hierarchy.
```

### Step 3: High-Fidelity - Homepage
```
Convert homepage wireframe to high-fidelity design:

- Apply design system colors and typography
- Design hero section with compelling headline and CTA
- Create blog post card component (with hover state)
- Design featured post section
- Add footer with links and social icons
- Ensure responsive layouts for mobile, tablet, desktop
- Add subtle shadows, gradients, and polish
```

### Step 4: High-Fidelity - Blog Post Page
```
Design blog post detail page:

- Article header with title, image, meta info
- Content area with proper typography (headings, paragraphs, lists, blockquotes)
- Course CTA component (inline variant)
- Social sharing buttons section
- Related posts grid
- Breadcrumbs navigation
- Ensure readability (max-width 800px for content)
- Design all content block types (images, tables, code, etc.)
```

### Step 5: High-Fidelity - Category Pages
```
Design category listing and detail pages:

- Category grid with cards
- Category header with name and description
- Post grid (same cards as homepage)
- Breadcrumbs
- Empty states (no categories/posts)
- Responsive layouts
```

### Step 6: High-Fidelity - 404 Page
```
Design 404 error page:

- Large "404" text
- Clear error message
- Helpful CTAs (Go Home, Browse Categories)
- Optional: Illustration or icon
- Centered, clean layout
```

### Step 7: Component Library
```
Create reusable component library:

1. Blog Post Card (variants: featured, regular, compact)
2. Category Card
3. Course CTA Card (variants: inline, bottom, sidebar)
4. Button (variants: primary, secondary, ghost, link; sizes: sm, md, lg)
5. Navigation Header (desktop and mobile)
6. Footer
7. Breadcrumbs
8. Social Share Buttons
9. Related Post Card
10. Loading Skeleton
11. Empty State
12. Error State

Include all states: default, hover, active, focus, disabled, loading
```

### Step 8: Interactive States
```
Add all interactive states to components:

- Hover states (cards, buttons, links)
- Active states (buttons, navigation)
- Focus states (inputs, buttons, links - for accessibility)
- Loading states (skeleton loaders, button spinners)
- Empty states (no content scenarios)
- Error states (404, API errors)

Ensure smooth transitions (150-200ms) and clear visual feedback.
```

### Step 9: Content Block Styles
```
Design all content block styles for blog posts:

- Headings (H1-H6) with hierarchy
- Paragraphs with proper line-height
- Links (default, hover, visited)
- Images (full-width, constrained, with captions)
- Tables (styled, with header row)
- Blockquotes (with left border)
- Code blocks (monospace, dark background)
- Lists (bulleted, numbered, nested)
- Spacers (different heights)
- Multi-column layouts (2-col, 3-col)

Ensure readability and visual hierarchy.
```

### Step 10: Responsive Design
```
Create responsive variants for all pages:

- Mobile (375px): Single column, stacked layouts, touch-friendly
- Tablet (768px): 2-column grids, horizontal nav
- Desktop (1440px): 3-column grids, full navigation
- Large Desktop (1920px): Max-width content, centered

Show how components adapt at each breakpoint.
Ensure touch targets are at least 44x44px on mobile.
```

### Step 11: Polish & Refinement
```
Add final polish to all designs:

- Subtle shadows and depth
- Smooth transitions and animations
- Micro-interactions (hover effects, button presses)
- Loading animations (skeleton shimmer)
- Image loading states
- Scroll animations (optional)
- Consistent spacing and alignment
- Professional color gradients
- High-quality placeholder images

Ensure everything feels polished and production-ready.
```

### Step 12: Export Specs
```
Prepare design specifications for development:

- Export all color codes (hex values)
- Export typography specs (sizes, weights, line-heights)
- Export spacing values
- Export component dimensions
- Create style guide document
- Export assets (logos, icons, images)
- Document animation timings
- Create component usage guidelines
```

---

## WHAT TO BRING BACK

### Essential Files
1. **Figma file link** (shared, viewable)
2. **Design system specs** (colors, typography, spacing)
3. **Component library** (all reusable components)
4. **All page designs** (homepage, blog post, categories, 404, etc.)
5. **Responsive variants** (mobile, tablet, desktop)

### Export Assets
1. **Logo** (SVG preferred)
2. **Icons** (social, navigation, etc.)
3. **Placeholder images** (if using)
4. **Illustrations** (for empty states, 404)

### Documentation
1. **Style guide** (colors, typography, spacing)
2. **Component usage** (when to use each component)
3. **Animation specs** (timings, easing)
4. **Breakpoint documentation**

---

## CHECKLIST BEFORE RETURNING

### Pages Designed
- [ ] Homepage (/)
- [ ] Blog post detail (/blog/[slug])
- [ ] Categories listing (/categories)
- [ ] Category detail (/category/[slug])
- [ ] 404 page (/not-found)
- [ ] Courses page (/courses) - if applicable
- [ ] Blog index (/blog) - if different from homepage

### Components Created
- [ ] Navigation header (desktop + mobile)
- [ ] Footer
- [ ] Blog post card (all variants)
- [ ] Category card
- [ ] Course CTA card (all variants)
- [ ] Related post card
- [ ] Button (all variants + sizes)
- [ ] Breadcrumbs
- [ ] Social share buttons
- [ ] Loading skeleton
- [ ] Empty state
- [ ] Error state
- [ ] All content blocks (headings, paragraphs, images, tables, etc.)

### States Designed
- [ ] Default states
- [ ] Hover states
- [ ] Active states
- [ ] Focus states (accessibility)
- [ ] Loading states
- [ ] Empty states
- [ ] Error states

### Responsive Design
- [ ] Mobile (375px) - all pages
- [ ] Tablet (768px) - all pages
- [ ] Desktop (1440px) - all pages
- [ ] Large desktop (1920px) - optional

### Design System
- [ ] Color palette (all colors defined)
- [ ] Typography scale (all sizes)
- [ ] Spacing system (8px grid)
- [ ] Component tokens (sizes, padding)

### Polish
- [ ] Shadows and depth
- [ ] Transitions and animations
- [ ] Micro-interactions
- [ ] Consistent spacing
- [ ] Professional gradients

### Documentation
- [ ] Style guide
- [ ] Component usage guide
- [ ] Export specs (colors, fonts, spacing)
- [ ] Animation timings

---

## DESIGN PRINCIPLES TO FOLLOW

1. **Clarity First:** Easy to scan, clear hierarchy
2. **Trust:** Professional, modern, quality
3. **Conversion:** Strategic CTA placement
4. **Accessibility:** WCAG AA compliance
5. **Performance:** Optimize images, minimize animations
6. **Consistency:** Same components, same spacing
7. **Mobile-First:** Design for mobile, enhance for desktop

---

## INSPIRATION REFERENCES

- **Primary:** [learnprompting.org](https://learnprompting.org/) - Clean, modern, trustworthy
- **Secondary:** Stripe.com - Professional, polished
- **Tertiary:** Linear.app - Modern, minimal, beautiful

---

## FINAL NOTES

- **Don't overcomplicate:** Simple, clean designs convert better
- **Focus on content:** Let the blog posts shine
- **CTAs matter:** Make course CTAs visible but not intrusive
- **Mobile is key:** Most traffic will be mobile
- **Test readability:** Ensure text is easy to read
- **Consistent spacing:** Use the 8px grid religiously

When you return with the Figma designs, I'll implement everything exactly as designed using Next.js and Tailwind CSS.

