// app/page.tsx
import { getAllPosts } from "@/lib/ghost";
import type { Post } from "@tryghost/content-api";
import PostCard from "@/components/PostCard";

export const dynamic = 'force-dynamic'; // Use dynamic rendering
export const revalidate = 60; // ISR: revalidate every 60s

export default async function HomePage() {
  let posts: Post[] = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Latest Articles
      </h1>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts found.</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
