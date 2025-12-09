import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/ghost";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import SocialShare from "@/components/SocialShare";
import { getRelatedPosts } from "@/lib/relatedPosts";
import type { ContentBlock } from "@/types/content-blocks";

type Params = { slug: string };

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params> | Params;
}): Promise<Metadata> {
  try {
    const resolvedParams = await Promise.resolve(params);
    const post = await getPostBySlug(resolvedParams.slug);
    const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://blogs-puce-nine.vercel.app"}/blog/${post.slug}`;

    return {
      title: `${post.title} - DeepLearnHQ`,
      description:
        post.excerpt || post.meta_description || "Read more on DeepLearnHQ",
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
      title: "Post Not Found - DeepLearnHQ",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params> | Params;
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (e) {
    console.error(`Error fetching post with slug "${slug}":`, e);
    return notFound();
  }

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://blogs-puce-nine.vercel.app"}/blog/${slug}`;

  // Get related posts
  const allPosts = await getAllPosts();
  const relatedPosts = getRelatedPosts(post, allPosts, 3);

  // Parse content_blocks from codeinjection_foot
  let contentBlocks: ContentBlock[] = [];
  try {
    const codeinjection = (post as any).codeinjection_foot;
    if (
      codeinjection &&
      typeof codeinjection === "string" &&
      codeinjection.trim().startsWith("[")
    ) {
      const parsed = JSON.parse(codeinjection);
      if (Array.isArray(parsed) && parsed.length > 0) {
        contentBlocks = parsed;
      }
    }
  } catch (e) {
    console.error("Error parsing content_blocks:", e);
  }

  // JSON-LD Schema
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

  // Get category tags
  const categoryTags =
    post.tags?.filter(
      (tag) =>
        tag.slug.startsWith("category:") || tag.name?.startsWith("category:")
    ) || [];

  return (
    <div className="bg-surface-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Header */}
      <header className="classic-padding py-8 md:py-12 bg-surface-100 border-b border-neutral-border">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title || "" },
            ]}
          />

          {/* Category Tags */}
          {categoryTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 mb-4">
              {categoryTags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/category/${tag.slug.replace("category:", "")}`}
                  className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full hover:bg-primary-200 transition-colors"
                >
                  {(tag.name || tag.slug).replace("category:", "")}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-neutral-text-secondary mb-6">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-neutral-text-tertiary">
            {post.published_at && (
              <time>
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            {post.reading_time && (
              <>
                <span className="w-1 h-1 rounded-full bg-neutral-border" />
                <span>{post.reading_time} min read</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Feature Image */}
      {post.feature_image && (
        <div className="classic-padding py-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-card">
              <Image
                src={post.feature_image}
                alt={post.title || ""}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="classic-padding py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {contentBlocks.length > 0 ? (
            <div className="prose prose-lg max-w-none">
              <BlockRenderer blocks={contentBlocks} />
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              {post.html ? (
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              ) : (
                <p className="text-neutral-text-secondary">
                  Content is being loaded...
                </p>
              )}
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-border">
              <h3 className="text-sm font-semibold text-neutral-text-tertiary uppercase tracking-wide mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="px-3 py-1.5 text-sm text-neutral-text-secondary bg-surface-200 rounded-lg"
                  >
                    {(tag.name || tag.slug).replace("category:", "").replace("course:", "")}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Sharing */}
          <div className="mt-8 pt-8 border-t border-neutral-border">
            <SocialShare
              url={postUrl}
              title={post.title || ""}
              description={post.excerpt || post.meta_description}
            />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="classic-padding py-12 md:py-16 bg-surface-100 border-t border-neutral-border">
          <div className="max-w-content">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </section>
      )}
    </div>
  );
}
