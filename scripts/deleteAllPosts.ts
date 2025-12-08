// scripts/deleteAllPosts.ts
import GhostAdminAPI from "@tryghost/admin-api";
import * as path from "path";
import { config } from "dotenv";

// Load environment variables
config({ path: path.join(process.cwd(), ".env.local") });

if (!process.env.GHOST_ADMIN_URL || !process.env.GHOST_ADMIN_API_KEY) {
  throw new Error("Missing Ghost Admin API credentials");
}

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0",
});

async function deleteAllPosts() {
  try {
    // Get all posts
    const posts = await api.posts.browse({ limit: "all" });
    console.log(`Found ${posts.length} posts to delete...\n`);

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      try {
        await api.posts.delete({ id: post.id });
        console.log(`[${i + 1}/${posts.length}] ✅ Deleted: "${post.title}"`);
        
        // Rate limiting
        if (i < posts.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error: any) {
        console.error(`❌ Error deleting "${post.title}":`, error.message);
      }
    }

    console.log(`\n✨ Deleted ${posts.length} posts`);
  } catch (error: any) {
    console.error("💥 Fatal error:", error.message);
    throw error;
  }
}

if (require.main === module) {
  deleteAllPosts()
    .then(() => {
      console.log("\n✅ Done!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Fatal error:", error.message);
      process.exit(1);
    });
}

