// components/PostCard.tsx
import Link from "next/link";
import type { Post } from "@tryghost/content-api";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      {post.excerpt && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {post.excerpt}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

