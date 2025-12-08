// app/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/ghost";

export const revalidate = 60; // ISR: revalidate every 60s

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Latest Articles
      </h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            {post.excerpt && (
              <p className="mt-2 text-sm text-gray-600">
                {post.excerpt}
              </p>
            )}
            <div className="mt-3 text-xs text-gray-500">
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString()
                : null}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
