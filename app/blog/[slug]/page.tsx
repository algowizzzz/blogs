// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/ghost";

type Params = { slug: string };

export const revalidate = 60;

// Pre-generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch (e) {
    return notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-10">
      <article>
        <h1 className="text-3xl font-bold mb-4">
          {post.title}
        </h1>

        {post.feature_image && (
          <img
            src={post.feature_image}
            alt={post.title || ""}
            className="w-full rounded-lg mb-6"
          />
        )}

        <div className="text-sm text-gray-500 mb-6">
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString()
            : null}
        </div>

        {/* Ghost returns HTML in post.html */}
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html || "" }}
        />
      </article>
    </main>
  );
}

