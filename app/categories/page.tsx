import Link from "next/link";
import { getAllCategories } from "@/lib/ghost";
import TopBanner from "@/components/TopBanner";
import NavbarV2 from "@/components/NavbarV2";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata = {
  title: "Categories - DeepLearnHQ",
  description: "Browse all categories and topics on DeepLearnHQ.",
};

// Category icons mapping
const categoryIcons: Record<string, string> = {
  basics: "😃",
  applications: "🤖",
  intermediate: "🧑‍🎄",
  advanced: "🎅",
  reliability: "⚖️",
  "prompt-hacking": "🔓",
  "image-prompting": "🖼️",
  "new-techniques": "🚀",
  models: "🔧",
  rag: "📁",
  agents: "🤖",
  "prompt-tuning": "👍",
  "prompt-engineering": "💡",
  "finance-ai": "💰",
  default: "📚",
};

export default async function CategoriesPage() {
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

      {/* Hero */}
      <section className="py-12 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Categories</h1>
          <p className="text-gray-600">
            Browse all topics and categories. Click on a category to see related articles.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {categories.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories yet</h3>
              <p className="text-gray-600">Categories will appear here once posts are tagged.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.map((category) => {
                const slug = category.slug.replace("category:", "").replace("category-", "");
                const icon = categoryIcons[slug] || categoryIcons.default;

                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="group flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#0D9373] hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 group-hover:bg-[#0D9373]/10 rounded-lg text-2xl transition-colors">
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#0D9373] transition-colors">
                        {category.name?.replace("category:", "").replace("category-", "")}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {category.count?.posts || 0} articles
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
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
