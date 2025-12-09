import Link from "next/link";
import { getAllCategories, getPostsByCategorySlug } from "@/lib/ghost";
import { CategoryCard } from "@/components/ui/Card";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata = {
  title: "Categories - DeepLearnHQ",
  description: "Browse all categories on DeepLearnHQ - AI, Prompt Engineering, ChatGPT, and more.",
};

function formatCategoryName(slug: string): string {
  return slug
    .replace("category:", "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  // Get post counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const posts = await getPostsByCategorySlug(category.slug);
      return {
        ...category,
        postCount: posts.length,
      };
    })
  );

  return (
    <div className="classic-padding py-12 md:py-16 bg-surface-0">
      <div className="max-w-content">
        {/* Page Header */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Categories
          </h1>
          <p className="text-lg text-neutral-text-secondary">
            Explore our content organized by topic. Find the resources you need
            to master AI and prompt engineering.
          </p>
        </div>

        {/* Categories Grid */}
        {categoriesWithCounts.length === 0 ? (
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
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              No categories yet
            </h3>
            <p className="text-neutral-text-secondary">
              Categories will appear here once posts are tagged.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesWithCounts.map((category) => (
              <CategoryCard
                key={category.id}
                name={formatCategoryName(category.slug)}
                slug={category.slug.replace("category:", "")}
                postCount={category.postCount}
              />
            ))}
          </div>
        )}

        {/* Featured Categories (hardcoded for now) */}
        <div className="mt-16 pt-12 border-t border-neutral-border">
          <h2 className="text-2xl font-bold text-primary-900 mb-6">
            Popular Topics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Prompt Engineering", slug: "prompt-engineering", icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { name: "ChatGPT", slug: "chatgpt", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
              { name: "AI Tools", slug: "ai-tools", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
              { name: "Deep Learning", slug: "deep-learning", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
            ].map((topic) => (
              <Link
                key={topic.slug}
                href={`/category/${topic.slug}`}
                className="group flex items-center gap-3 p-4 bg-surface-100 rounded-xl hover:bg-primary-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <svg
                    className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={topic.icon} />
                  </svg>
                </div>
                <span className="font-medium text-primary-900 group-hover:text-primary-700 transition-colors">
                  {topic.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
