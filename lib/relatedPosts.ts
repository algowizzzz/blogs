// lib/relatedPosts.ts
import type { Post, Tag } from "@tryghost/content-api";

export function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit: number = 5
): Post[] {
  // Exclude current post
  const otherPosts = allPosts.filter((p) => p.id !== currentPost.id);

  // Score posts based on:
  // 1. Same category tags (weight: 10)
  // 2. Overlapping regular tags (weight: 5)
  const scored = otherPosts.map((post) => {
    let score = 0;

    const currentCategories = (currentPost.tags || [])
      .filter((t) => t.slug.startsWith("category:"))
      .map((t) => t.slug);

    const postCategories = (post.tags || [])
      .filter((t) => t.slug.startsWith("category:"))
      .map((t) => t.slug);

    // Same category = high score
    const commonCategories = currentCategories.filter((c) =>
      postCategories.includes(c)
    );
    score += commonCategories.length * 10;

    // Overlapping tags = medium score
    const currentTagSlugs = (currentPost.tags || []).map((t) => t.slug);
    const postTagSlugs = (post.tags || []).map((t) => t.slug);
    const commonTags = currentTagSlugs.filter(
      (t) =>
        postTagSlugs.includes(t) &&
        !t.startsWith("category:") &&
        !t.startsWith("course:")
    );
    score += commonTags.length * 5;

    return { post, score };
  });

  // Sort by score, return top N
  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

