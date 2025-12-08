// components/RelatedPosts.tsx
import Link from "next/link";
import type { Post } from "@tryghost/content-api";

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
            className="border rounded-lg p-4 hover:shadow-md transition-shadow block"
          >
            <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
            )}
            {post.published_at && (
              <div className="mt-2 text-xs text-gray-500">
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

