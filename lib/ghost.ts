// lib/ghost.ts
import GhostContentAPI from "@tryghost/content-api";

if (!process.env.GHOST_API_URL || !process.env.GHOST_CONTENT_KEY) {
  throw new Error("Missing Ghost API environment variables");
}

const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_KEY,
  version: "v5.0",
});

export async function getAllPosts() {
  return api.posts.browse({
    include: ["tags"],
    limit: "all",
  });
}

export async function getPostBySlug(slug: string) {
  return api.posts.read(
    { slug },
    { include: ["tags", "authors"] }
  );
}

