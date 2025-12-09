import { getAllPosts } from "@/lib/ghost";
import type { Post } from "@tryghost/content-api";
import TopBanner from "@/components/TopBanner";
import NavbarV2 from "@/components/NavbarV2";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata = {
  title: "Blog - DeepLearnHQ",
  description: "Get the AI trends and tools you need to know. Join 150,000+ professionals from top companies.",
};

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBanner
        text="Compete in HackAPrompt 2.0, the world's largest AI Red-Teaming competition!"
        ctaText="Check it out"
        ctaLink="/courses"
      />
      <NavbarV2 />

      {/* Hero Section - Green gradient */}
      <section className="bg-gradient-to-b from-[#0D9373] to-[#0B7D63] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            DeepLearnHQ Blog
            <span className="text-3xl">✦</span>
          </h1>
          <p className="text-lg text-white/90 mb-2">
            <span className="font-semibold">Don't fall behind on AI.</span>{" "}
            Get the AI trends and tools you need to know. Join 150,000+ professionals
          </p>
          <p className="text-white/80 mb-8">
            from top companies like Microsoft, Apple, Salesforce and more.
          </p>

          {/* Email signup */}
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="border-b border-gray-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search articles by title, description, or category..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9373]/20 focus:border-[#0D9373]"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{posts.length} articles</span>
              <button className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                Sort
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-600">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                // Extract category from tags
                const categoryTag = post.tags?.find(
                  (tag) => tag.slug.startsWith("category:") || tag.name?.startsWith("category:")
                );
                const category = categoryTag
                  ? (categoryTag.name || categoryTag.slug).replace("category:", "")
                  : undefined;

                return (
                  <BlogCard
                    key={post.id}
                    title={post.title || ""}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    publishedAt={post.published_at || undefined}
                    readingTime={(post as any).reading_time}
                    featureImage={post.feature_image || undefined}
                    category={category}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
