import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/ghost";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import DocsLayout from "@/components/DocsLayout";
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
      description: post.excerpt || post.meta_description || "Read more on DeepLearnHQ",
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: post.title,
        description: post.excerpt || post.meta_description || undefined,
        images: post.feature_image ? [post.feature_image] : undefined,
        type: "article",
        publishedTime: post.published_at || undefined,
        url: canonicalUrl,
      },
    };
  } catch {
    return { title: "Post Not Found - DeepLearnHQ" };
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

  // Parse content_blocks
  let contentBlocks: ContentBlock[] = [];
  try {
    const codeinjection = (post as any).codeinjection_foot;
    if (codeinjection && typeof codeinjection === "string" && codeinjection.trim().startsWith("[")) {
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
    author: post.authors?.map((author) => ({ "@type": "Person", name: author.name })),
    publisher: { "@type": "Organization", name: "DeepLearnHQ" },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  return (
    <DocsLayout showLeftSidebar={true} showRightTOC={true}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#0D9373]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/blog" className="hover:text-[#0D9373]">Blog</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{post.title}</span>
      </nav>

      <article>
        {/* Title */}
        <h1 id="title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Reading Time: {(post as any).reading_time || 5} minutes</span>
          </div>
          {post.published_at && (
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                Last updated on{" "}
                {new Date(post.updated_at || post.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
          {post.authors && post.authors[0] && (
            <div className="flex items-center gap-1.5 ml-auto">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{post.authors[0].name}</span>
            </div>
          )}
        </div>

        {/* Feature Image */}
        {post.feature_image && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
            <Image
              src={post.feature_image}
              alt={post.title || ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-[#0D9373] prose-a:no-underline hover:prose-a:underline">
          {contentBlocks.length > 0 ? (
            <BlockRenderer blocks={contentBlocks} />
          ) : post.html ? (
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          ) : (
            <p className="text-gray-600">Content is being loaded...</p>
          )}
        </div>

        {/* Social Sharing */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <SocialShare url={postUrl} title={post.title || ""} description={post.excerpt || ""} />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <RelatedPosts posts={relatedPosts} />
        </section>
      )}
    </DocsLayout>
  );
}
