// app/category/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getPostsByCategorySlug, getAllCategories } from "@/lib/ghost";
import PostCard from "@/components/PostCard";

type Params = { slug: string };

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category) => ({ slug: category.slug }));
  } catch (error) {
    return [];
  }
}

function formatCategoryName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function CategoryPage({
  params,
}: {
  params: Params;
}) {
  const posts = await getPostsByCategorySlug(params.slug);

  if (posts.length === 0) {
    return notFound();
  }

  const categoryName = formatCategoryName(params.slug);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {categoryName}
        </h1>
        <p className="text-gray-600">
          {posts.length} {posts.length === 1 ? "article" : "articles"} in this category
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

