import { getAllPosts } from "@/lib/ghost";
import type { Post } from "@tryghost/content-api";
import { PostCard } from "@/components/ui/Card";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata = {
  title: "Blog - DeepLearnHQ",
  description: "Explore articles on AI, prompt engineering, ChatGPT, and deep learning.",
};

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="classic-padding py-12 md:py-16 bg-surface-0">
      <div className="max-w-content">
        {/* Page Header */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Blog
          </h1>
          <p className="text-lg text-neutral-text-secondary">
            Discover the latest insights, tutorials, and guides on AI, prompt
            engineering, and machine learning.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-surface-100 rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              No posts yet
            </h3>
            <p className="text-neutral-text-secondary">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title || ""}
                excerpt={post.excerpt}
                slug={post.slug}
                publishedAt={post.published_at || undefined}
                featureImage={post.feature_image || undefined}
                tags={post.tags?.map((tag) => ({
                  name: tag.name || "",
                  slug: tag.slug,
                }))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

