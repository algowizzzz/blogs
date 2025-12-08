# Implementation Guide: Pre-Launch Features

This guide provides step-by-step implementation for critical pre-launch features.

---

## 1. Analytics Integration (Google Analytics 4)

### Setup
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (format: `G-XXXXXXXXXX`)

### Implementation

**File**: `app/layout.tsx`

```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

**Environment Variable**: Add to `.env.local` and Vercel
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Track CTA Clicks**: Update `components/CourseCTA.tsx` to track clicks

---

## 2. RSS Feed

**File**: `app/rss/route.ts`

```tsx
import { getAllPosts } from '@/lib/ghost';

export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blogs-puce-nine.vercel.app';

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DeepLearnHQ - AI & Prompt Engineering Blog</title>
    <description>Learn practical AI, prompt engineering, and ChatGPT workflows</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt || '')}</description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published_at || '').toUTCString()}</pubDate>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
```

**Access**: `https://yourdomain.com/rss`

---

## 3. Canonical URLs

**File**: `app/blog/[slug]/page.tsx`

Update `generateMetadata`:

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const post = await getPostBySlug(resolvedParams.slug);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;
  
  return {
    title: post.title,
    description: post.excerpt || post.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    // ... rest of metadata
  };
}
```

---

## 4. 404 Page

**File**: `app/not-found.tsx`

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
```

---

## 5. Related Posts

**File**: `lib/relatedPosts.ts`

```tsx
import type { Post, Tag } from '@tryghost/content-api';

export function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit: number = 5
): Post[] {
  // Exclude current post
  const otherPosts = allPosts.filter(p => p.id !== currentPost.id);
  
  // Score posts based on:
  // 1. Same category tags (weight: 10)
  // 2. Overlapping regular tags (weight: 5)
  const scored = otherPosts.map(post => {
    let score = 0;
    
    const currentCategories = (currentPost.tags || [])
      .filter(t => t.slug.startsWith('category:'))
      .map(t => t.slug);
    
    const postCategories = (post.tags || [])
      .filter(t => t.slug.startsWith('category:'))
      .map(t => t.slug);
    
    // Same category = high score
    const commonCategories = currentCategories.filter(c => postCategories.includes(c));
    score += commonCategories.length * 10;
    
    // Overlapping tags = medium score
    const currentTagSlugs = (currentPost.tags || []).map(t => t.slug);
    const postTagSlugs = (post.tags || []).map(t => t.slug);
    const commonTags = currentTagSlugs.filter(t => 
      postTagSlugs.includes(t) && !t.startsWith('category:') && !t.startsWith('course:')
    );
    score += commonTags.length * 5;
    
    return { post, score };
  });
  
  // Sort by score, return top N
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
```

**File**: `components/RelatedPosts.tsx`

```tsx
import Link from 'next/link';
import type { Post } from '@tryghost/content-api';

interface Props {
  posts: Post[];
}

export default function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            {post.excerpt && (
              <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Usage**: Add to `app/blog/[slug]/page.tsx`

---

## 6. Breadcrumbs

**File**: `components/Breadcrumbs.tsx`

```tsx
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${process.env.NEXT_PUBLIC_SITE_URL}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-gray-900">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
```

---

## 7. Image Optimization

**File**: `components/blocks/ImageBlock.tsx`

Replace `<img>` with Next.js `Image`:

```tsx
import Image from 'next/image';

// In component:
<Image
  src={block.url}
  alt={block.alt}
  width={block.width || 800}
  height={block.height || 600}
  className="w-full rounded-lg"
  style={{ objectFit: block.height ? 'cover' : 'contain' }}
  loading="lazy"
/>
```

**File**: `next.config.js` (if not exists, create it)

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deeplearnhq.ghost.io',
      },
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
      },
      // Add other image domains as needed
    ],
  },
};

module.exports = nextConfig;
```

---

## 8. Error Tracking (Sentry)

### Setup
1. Create account at [sentry.io](https://sentry.io)
2. Create Next.js project
3. Get DSN

### Implementation

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Follow the wizard prompts. It will:
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Create `sentry.edge.config.ts`
- Update `next.config.js`
- Add environment variables

**Environment Variables**:
```
SENTRY_DSN=your-dsn-here
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
```

---

## 9. Security Headers

**File**: `next.config.js`

```js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};
```

---

## 10. Google Search Console Setup

### Steps:
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property (your domain)
3. Verify ownership:
   - **Option A**: DNS verification (add TXT record)
   - **Option B**: HTML file upload (download file, add to `public/`)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Wait 24-48 hours for indexing

### Monitor:
- Index coverage
- Search performance
- Core Web Vitals
- Mobile usability

---

## Testing Checklist

After implementing each feature:

- [ ] Analytics: Check GA4 real-time view
- [ ] RSS: Validate at [validator.w3.org/feed](https://validator.w3.org/feed)
- [ ] Canonical: Inspect page source, check `<link rel="canonical">`
- [ ] 404: Visit non-existent URL
- [ ] Related Posts: Check bottom of post page
- [ ] Breadcrumbs: Verify on all pages
- [ ] Images: Check Network tab, verify WebP/optimization
- [ ] Error Tracking: Trigger test error, check Sentry
- [ ] Security Headers: Use [securityheaders.com](https://securityheaders.com)
- [ ] Search Console: Submit sitemap, check indexing

---

## Environment Variables Summary

Add these to `.env.local` and Vercel:

```
# Existing
GHOST_API_URL=...
GHOST_CONTENT_KEY=...
GHOST_ADMIN_URL=...
GHOST_ADMIN_API_KEY=...
NEXT_PUBLIC_SITE_URL=...

# New
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENTRY_DSN=...
SENTRY_ORG=...
SENTRY_PROJECT=...
```

