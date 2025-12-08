// lib/ghost.ts
import GhostContentAPI from "@tryghost/content-api";
import type { Post, Tag } from "@tryghost/content-api";

if (!process.env.GHOST_API_URL || !process.env.GHOST_CONTENT_KEY) {
  throw new Error("Missing Ghost API environment variables");
}

const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_KEY,
  version: "v5.0",
});

// Export types for use in components
export type { Post, Tag };

/**
 * Get all published posts
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    return await api.posts.browse({
      include: ["tags"],
      limit: "all",
    });
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    return await api.posts.read(
      { slug },
      { include: ["tags", "authors"] }
    );
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    throw new Error(`Failed to fetch post: ${slug}`);
  }
}

/**
 * Get posts filtered by category tag (format: category:slug)
 */
export async function getPostsByCategorySlug(categorySlug: string): Promise<Post[]> {
  try {
    const allPosts = await getAllPosts();
    const categoryTag = `category:${categorySlug}`;
    return allPosts.filter((post) =>
      post.tags?.some((tag) => tag.slug === categoryTag || tag.name === categoryTag)
    );
  } catch (error) {
    console.error(`Error fetching posts for category "${categorySlug}":`, error);
    return [];
  }
}

/**
 * Get all unique category tags from posts
 */
export async function getAllCategories(): Promise<Tag[]> {
  try {
    const allPosts = await getAllPosts();
    const categoryMap = new Map<string, Tag>();
    
    allPosts.forEach((post) => {
      post.tags?.forEach((tag) => {
        if (tag.slug.startsWith("category:") || tag.name.startsWith("category:")) {
          const slug = tag.slug.startsWith("category:") 
            ? tag.slug.replace("category:", "") 
            : tag.name.replace("category:", "");
          categoryMap.set(slug, {
            ...tag,
            slug,
          });
        }
      });
    });
    
    return Array.from(categoryMap.values());
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

