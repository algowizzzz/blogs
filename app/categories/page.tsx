// app/categories/page.tsx
import Link from "next/link";
import { getAllCategories } from "@/lib/ghost";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

function formatCategoryName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      
      {categories.length === 0 ? (
        <p className="text-gray-600">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">
                {formatCategoryName(category.slug)}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

