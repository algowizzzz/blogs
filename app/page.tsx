import Link from "next/link";
import { getAllPosts } from "@/lib/ghost";
import type { Post } from "@tryghost/content-api";
import { PostCard } from "@/components/ui/Card";
import { StatsRow } from "@/components/ui/StatPoint";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const stats = [
  { value: "1K+", label: "Monthly Readers" },
  { value: "50+", label: "Articles" },
  { value: "10+", label: "Categories" },
  { value: "3", label: "Courses" },
];

export default async function HomePage() {
  let posts: Post[] = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  const featuredPosts = posts.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="classic-padding py-16 md:py-24 bg-gradient-to-b from-surface-100 to-surface-0">
        <div className="max-w-content">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-900 tracking-tight mb-6 animate-fade-in">
              Your Guide to{" "}
              <span className="bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                AI & Prompt Engineering
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-text-secondary mb-8 leading-relaxed animate-fade-in stagger-1">
              Master the art of communicating with AI. Learn practical prompting
              techniques, deep learning concepts, and cutting-edge AI tools through
              our comprehensive guides and courses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in stagger-2">
              <Button href="/blog" size="lg">
                Start Learning
              </Button>
              <Button href="/courses" variant="secondary" size="lg">
                View Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="classic-padding py-8 border-y border-neutral-border bg-surface-0">
        <div className="max-w-content">
          <StatsRow stats={stats} />
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="classic-padding py-16 md:py-20 bg-surface-0">
        <div className="max-w-content">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">
                Latest Articles
              </h2>
              <p className="text-neutral-text-secondary">
                Explore our latest insights on AI and prompt engineering
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 text-primary-500 hover:text-primary-700 font-medium transition-colors"
            >
              View all articles
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-surface-100 rounded-xl">
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
              {featuredPosts.map((post) => (
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

          <div className="mt-8 text-center md:hidden">
            <Button href="/blog" variant="secondary">
              View all articles
            </Button>
          </div>
        </div>
      </section>

      {/* Course CTA Section */}
      <section className="classic-padding py-16 md:py-20 bg-gradient-to-br from-primary-700 to-primary-500 text-white">
        <div className="max-w-content">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold bg-accent text-primary-900 rounded-full">
              Featured Course
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Prompt Engineering Bootcamp
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Master the art of prompt engineering with our comprehensive bootcamp.
              Learn practical techniques for ChatGPT, Claude, and other AI tools.
            </p>
            <Button
              href="https://seekhoai.pk/checkout"
              external
              variant="secondary"
              size="lg"
              className="bg-white text-primary-700 hover:bg-surface-100 border-0"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="classic-padding py-16 md:py-20 bg-surface-100">
        <div className="max-w-content">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">
              Explore by Category
            </h2>
            <p className="text-neutral-text-secondary">
              Dive into specific topics that interest you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Prompt Engineering",
                slug: "prompt-engineering",
                icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
              {
                name: "ChatGPT",
                slug: "chatgpt",
                icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
              },
              {
                name: "AI Tools",
                slug: "ai-tools",
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              },
              {
                name: "Deep Learning",
                slug: "deep-learning",
                icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
              },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group p-6 bg-white rounded-xl border border-neutral-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <svg
                    className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={category.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button href="/categories" variant="ghost">
              View all categories
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="classic-padding py-16 md:py-20 bg-surface-0">
        <div className="max-w-content">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-neutral-text-secondary mb-8">
              Get the latest AI insights and tutorials delivered straight to your
              inbox. No spam, just valuable content.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-neutral-border focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
