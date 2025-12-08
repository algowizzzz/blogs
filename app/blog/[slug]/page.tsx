// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/ghost";
import { getCoursesFromTags } from "@/lib/courseMap";
import CourseCTA from "@/components/CourseCTA";

type Params = { slug: string };

export const dynamic = 'force-dynamic'; // Use dynamic rendering
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<Params> | Params }): Promise<Metadata> {
  try {
    const resolvedParams = await Promise.resolve(params);
    const post = await getPostBySlug(resolvedParams.slug);
    
    return {
      title: post.title,
      description: post.excerpt || post.meta_description || "Read more on DeepLearnHQ",
      openGraph: {
        title: post.title,
        description: post.excerpt || post.meta_description || undefined,
        images: post.feature_image ? [post.feature_image] : undefined,
        type: "article",
        publishedTime: post.published_at || undefined,
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

  const courses = post.tags ? getCoursesFromTags(post.tags) : [];
  const firstCourse = courses[0];
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://blogs-puce-nine.vercel.app'}/blog/${slug}`;

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <h1 className="text-4xl font-bold mb-4">
          {post.title}
        </h1>

        {post.feature_image && (
          <img
            src={post.feature_image}
            alt={post.title || ""}
            className="w-full rounded-lg mb-6"
          />
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

        {/* Inline Course CTA (after intro, before content) */}
        {firstCourse && (
          <CourseCTA course={firstCourse} variant="inline" />
        )}

        {/* Ghost returns HTML in post.html */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.html || "" }}
        />

        {/* Bottom Course CTAs (all courses) */}
        {courses.length > 0 && (
          <div className="mt-12">
            {courses.map((course) => (
              <CourseCTA key={course.id} course={course} variant="bottom" />
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

