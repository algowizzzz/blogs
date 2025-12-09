import Link from "next/link";
import Image from "next/image";
import type { Post } from "@tryghost/content-api";

interface Props {
  posts: Post[];
}

export default function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-900 mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block bg-white border border-neutral-border rounded-xl overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1"
          >
            {post.feature_image && (
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={post.feature_image}
                  alt={post.title || ""}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-base font-semibold text-primary-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-neutral-text-secondary line-clamp-2 mb-2">
                  {post.excerpt}
                </p>
              )}
              {post.published_at && (
                <time className="text-xs text-neutral-text-tertiary">
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
