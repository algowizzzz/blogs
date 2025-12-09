import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsByCategorySlug, getAllCategories } from "@/lib/ghost";
import type { Post } from "@tryghost/content-api";
import TopBanner from "@/components/TopBanner";
import NavbarV2 from "@/components/NavbarV2";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";

type Params = { slug: string };

export const dynamic = "force-dynamic";
export const revalidate = 60;

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<Params> | Params;
}) {
  const resolvedParams = await Promise.resolve(params);
  const categoryName = formatCategoryName(resolvedParams.slug);
  return {
    title: `${categoryName} - DeepLearnHQ`,
    description: `Browse all articles in ${categoryName} category.`,
  };
}

function formatCategoryName(slug: string): string {
  return slug
    .replace("category:", "")
    .replace("category-", "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params> | Params;
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  const categoryName = formatCategoryName(slug);

  let posts: Post[] = [];
  try {
    posts = await getPostsByCategorySlug(slug);
  } catch (error) {
    console.error(`Error fetching posts for category "${slug}":`, error);
    return notFound();
  }

  // Get all categories for the sidebar
  let categories: any[] = [];
  try {
    categories = await getAllCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBanner
        text="Compete in HackAPrompt 2.0, the world's largest AI Red-Teaming competition!"
        ctaText="Check it out"
        ctaLink="/courses"
      />
      <NavbarV2 />

      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#0D9373]">
              Home
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/categories" className="hover:text-[#0D9373]">
              Categories
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar with categories */}
        <aside className="hidden lg:block w-64 border-r border-gray-200 bg-gray-50">
          <div className="p-4 sticky top-16">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <nav className="space-y-1">
              {categories.map((cat) => {
                const catSlug = cat.slug;
                const isActive = catSlug === slug || catSlug === `category:${slug}` || catSlug === `category-${slug}`;
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#0D9373]/10 text-[#0D9373] font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {cat.name?.replace("category:", "").replace("category-", "")}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 py-8 px-8">
          <div className="max-w-5xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
            <p className="text-gray-600 mb-8">
              {posts.length} article{posts.length !== 1 ? "s" : ""} in this category
            </p>

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title || ""}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    publishedAt={post.published_at || undefined}
                    readingTime={(post as any).reading_time}
                    featureImage={post.feature_image || undefined}
                    category={categoryName}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
