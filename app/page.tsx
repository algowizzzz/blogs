import Link from "next/link";
import { getAllPosts } from "@/lib/ghost";
import type { Post } from "@tryghost/content-api";
import TopBanner from "@/components/TopBanner";
import NavbarV2 from "@/components/NavbarV2";
import Footer from "@/components/Footer";
import TrustLogos from "@/components/TrustLogos";
import CourseCardV2 from "@/components/CourseCardV2";
import BlogCard from "@/components/BlogCard";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const courses = [
  {
    id: "chatgpt-everyone",
    title: "ChatGPT for Everyone",
    description: "Discover how to use ChatGPT effortlessly and explore the exciting world of Generative AI. No prior experience required.",
    href: "https://seekhoai.pk/checkout",
    badge: "Free",
    rating: 4.7,
    lessonCount: 25,
  },
  {
    id: "intro-prompt",
    title: "Introduction to Prompt Engineering",
    description: "Learn the fundamentals of prompt engineering, the practice of crafting effective instructions for AI systems like ChatGPT, Claude, and Midjourney.",
    href: "https://seekhoai.pk/checkout",
    rating: 4.7,
    lessonCount: 12,
  },
  {
    id: "advanced-prompt",
    title: "Advanced Prompt Engineering",
    description: "Discover advanced techniques in prompt engineering to enhance the accuracy, reliability, and efficiency of AI-generated responses.",
    href: "https://seekhoai.pk/checkout",
    rating: 4.4,
    lessonCount: 24,
  },
];

export default async function HomePage() {
  let posts: Post[] = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBanner
        text="Compete in HackAPrompt 2.0, the world's largest AI Red-Teaming competition!"
        ctaText="Check it out"
        ctaLink="/courses"
      />
      <NavbarV2 />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn, Apply, &<br />
            Get Certified in{" "}
            <span className="text-[#0D9373]">Prompt Engineering</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Gain cutting-edge AI knowledge with hands-on, research-backed
            courses that solve real-world problems.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/courses"
              className="px-6 py-3 bg-[#0D9373] text-white rounded-lg font-medium hover:bg-[#0B7D63] transition-colors"
            >
              Start Learning For Free
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              For Businesses
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <TrustLogos />

      {/* Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Courses for Every Learner</h2>
              <p className="text-gray-600">Master AI and Future-Proof Your Career</p>
            </div>
            <Link
              href="/courses"
              className="px-4 py-2 bg-[#0D9373] text-white text-sm rounded-lg hover:bg-[#0B7D63] transition-colors"
            >
              Explore All Courses
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCardV2
                key={course.id}
                title={course.title}
                description={course.description}
                href={course.href}
                badge={course.badge}
                rating={course.rating}
                lessonCount={course.lessonCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Course */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Recommended for AI beginners
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Build your AI skills with interactive courses & learning pathways, curated by real-world experts
          </p>

          <CourseCardV2
            title="ChatGPT for Everyone"
            description="Learn how to use ChatGPT. Discover best practices for writing prompts and explore common business use cases for the powerful AI tool."
            href="https://seekhoai.pk/checkout"
            badge="Free course"
            partnerName="OpenAI"
            difficulty="Beginner Friendly"
            duration="1 hour"
            learnerCount="82,354"
            featured
          />
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Taught by Industry Leaders</h2>
              <p className="text-xl text-gray-300 mb-6">Learn from the best</p>
              <p className="text-gray-400">
                Our instructors are leading Generative AI experts, professionals, and researchers. 
                Don't settle for pseudo-researchers, learn from the people writing the papers.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full mb-4" />
              <p className="text-gray-400 text-sm">Expert instructors from top institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-[#0D9373] rounded-xl p-8 text-white">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full mb-4" />
              <p className="text-white/80 text-sm text-center">Award-winning research</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Powered by Our Award-Winning Research
              </h2>
              <p className="text-gray-600">
                AI moves fast... and so do we. Teach your employees the latest information, techniques, 
                and training from our Award-winning research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Latest from the Blog</h2>
              <Link
                href="/blog"
                className="text-[#0D9373] font-medium hover:underline flex items-center gap-1"
              >
                View all articles
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => {
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
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-[#0D9373]">
        <div className="max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay ahead of the AI curve</h2>
          <p className="text-white/80 mb-8">
            Join 150,000+ professionals getting weekly AI insights and tips.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm focus:outline-none"
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

      <Footer />
    </div>
  );
}
