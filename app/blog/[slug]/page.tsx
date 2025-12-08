// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getPostBySlug, getAllPosts } from "@/lib/ghost";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import SocialShare from "@/components/SocialShare";
import { getRelatedPosts } from "@/lib/relatedPosts";
import type { ContentBlock } from "@/types/content-blocks";

type Params = { slug: string };

export const dynamic = 'force-dynamic'; // Use dynamic rendering
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<Params> | Params }): Promise<Metadata> {
  try {
    const resolvedParams = await Promise.resolve(params);
    const post = await getPostBySlug(resolvedParams.slug);
    const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://blogs-puce-nine.vercel.app'}/blog/${post.slug}`;
    
    return {
      title: post.title,
      description: post.excerpt || post.meta_description || "Read more on DeepLearnHQ",
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt || post.meta_description || undefined,
        images: post.feature_image ? [post.feature_image] : undefined,
        type: "article",
        publishedTime: post.published_at || undefined,
        url: canonicalUrl,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt || post.meta_description || undefined,
        images: post.feature_image ? [post.feature_image] : undefined,
      },
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params> | Params;
}) {
  // Handle both Promise and direct params (Next.js 15+ compatibility)
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  console.log(`[BlogPostPage] Attempting to fetch post with slug: "${slug}"`);
  
  let post;
  try {
    post = await getPostBySlug(slug);
    console.log(`[BlogPostPage] Successfully fetched post: "${post.title}"`);
  } catch (e) {
    console.error(`[BlogPostPage] Error fetching post with slug "${slug}":`, e);
    // Log the error details for debugging
    if (e instanceof Error) {
      console.error('Error message:', e.message);
      console.error('Error stack:', e.stack);
    }
    return notFound();
  }

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://blogs-puce-nine.vercel.app'}/blog/${slug}`;

  // Get related posts
  const allPosts = await getAllPosts();
  const relatedPosts = getRelatedPosts(post, allPosts, 5);

  // Parse content_blocks from codeinjection_foot (we'll store JSON there)
  let contentBlocks: ContentBlock[] = [];
  try {
    // Check both codeinjection_foot and any custom fields
    const codeinjection = (post as any).codeinjection_foot;
    
    if (codeinjection && typeof codeinjection === 'string' && codeinjection.trim().startsWith('[')) {
      // It's a JSON array string
      const parsed = JSON.parse(codeinjection);
      if (Array.isArray(parsed) && parsed.length > 0) {
        contentBlocks = parsed;
        console.log(`[BlogPostPage] Loaded ${contentBlocks.length} content blocks`);
      }
    } else if (codeinjection) {
      console.log(`[BlogPostPage] codeinjection_foot exists but doesn't look like JSON array:`, codeinjection.substring(0, 50));
    } else {
      console.log(`[BlogPostPage] No codeinjection_foot found for post "${post.title}"`);
      console.log(`[BlogPostPage] Available fields:`, Object.keys(post));
    }
  } catch (e) {
    console.error("Error parsing content_blocks:", e);
    if ((post as any).codeinjection_foot) {
      const foot = (post as any).codeinjection_foot;
      console.error("codeinjection_foot content (first 200 chars):", typeof foot === 'string' ? foot.substring(0, 200) : foot);
    }
  }

  // JSON-LD Schema for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.meta_description,
    image: post.feature_image,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: post.authors?.map((author) => ({
      "@type": "Person",
      name: author.name,
    })),
    publisher: {
      "@type": "Organization",
      name: "DeepLearnHQ",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/" },
    { label: post.title },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <article>
        <h1 className="text-4xl font-bold mb-4">
          {post.title}
        </h1>

        {post.feature_image && (
          <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
            <Image
              src={post.feature_image}
              alt={post.title || ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="text-sm text-gray-500 mb-8">
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null}
        </div>

        {/* Render content blocks */}
        {contentBlocks.length > 0 ? (
          <BlockRenderer blocks={contentBlocks} />
        ) : (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600">Content is being loaded...</p>
          </div>
        )}

        {/* Social Sharing */}
        <SocialShare
          url={postUrl}
          title={post.title}
          description={post.excerpt || post.meta_description}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      </article>
    </div>
  );
}

