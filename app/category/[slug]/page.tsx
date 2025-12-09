import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostsByCategorySlug, getAllCategories } from "@/lib/ghost";
import { PostCard } from "@/components/ui/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/ui/Button";

type Params = { slug: string };

export const dynamic = "force-dynamic";
export const revalidate = 60;

function formatCategoryName(slug: string): string {
  return slug
    .replace("category:", "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params> | Params;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const categoryName = formatCategoryName(resolvedParams.slug);

  return {
    title: `${categoryName} - DeepLearnHQ`,
    description: `Browse all articles about ${categoryName} on DeepLearnHQ.`,
  };
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category) => ({
      slug: category.slug.replace("category:", ""),
    }));
  } catch (error) {
    console.error("Error generating static params for categories:", error);
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params> | Params;
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  let posts = [];
  try {
    posts = await getPostsByCategorySlug(slug);
  } catch (error) {
    console.error(`Error in CategoryPage for slug "${slug}":`, error);
    return notFound();
  }

  const categoryName = formatCategoryName(slug);

  return (
    <div className="bg-surface-0">
      {/* Header */}
      <header className="classic-padding py-12 md:py-16 bg-surface-100 border-b border-neutral-border">
        <div className="max-w-content">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Categories", href: "/categories" },
              { label: categoryName },
            ]}
          />

          <div className="mt-6 flex items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary-500"
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
                <h1 className="text-3xl md:text-4xl font-bold text-primary-900">
                  {categoryName}
                </h1>
              </div>
              <p className="text-neutral-text-secondary">
                {posts.length} {posts.length === 1 ? "article" : "articles"} in
                this category
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Posts Grid */}
      <section className="classic-padding py-12 md:py-16">
        <div className="max-w-content">
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
                No posts in this category
              </h3>
              <p className="text-neutral-text-secondary mb-6">
                Check back soon for new content!
              </p>
              <Button href="/blog" variant="secondary">
                Browse all posts
              </Button>
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
      </section>
    </div>
  );
}
