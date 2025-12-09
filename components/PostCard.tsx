import Link from "next/link";
import Image from "next/image";
import type { Post } from "@tryghost/content-api";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Get category tags
  const categoryTags =
    post.tags?.filter(
      (tag) =>
        tag.slug.startsWith("category:") || tag.name?.startsWith("category:")
    ) || [];

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white border border-neutral-border rounded-xl overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1">
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
        <div className="p-5">
          {categoryTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categoryTags.slice(0, 2).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2.5 py-0.5 text-xs font-medium text-primary-700 bg-primary-100 rounded-full"
                >
                  {(tag.name || tag.slug).replace("category:", "")}
                </span>
              ))}
            </div>
          )}
          <h2 className="text-lg font-semibold text-primary-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-sm text-neutral-text-secondary line-clamp-2 mb-3">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between">
            <time className="text-xs text-neutral-text-tertiary">
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : null}
            </time>
            {(post as any).reading_time && (
              <span className="text-xs text-neutral-text-tertiary">
                {(post as any).reading_time} min read
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
