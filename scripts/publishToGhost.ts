// scripts/publishToGhost.ts
import GhostAdminAPI from "@tryghost/admin-api";
import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: path.join(process.cwd(), ".env.local") });

if (!process.env.GHOST_ADMIN_URL || !process.env.GHOST_ADMIN_API_KEY) {
  throw new Error("Missing Ghost Admin API credentials. Set GHOST_ADMIN_URL and GHOST_ADMIN_API_KEY in .env.local");
}

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0",
});

interface PostData {
  title: string;
  slug?: string;
  html: string;
  excerpt?: string;
  tags?: string[];
  status?: "published" | "draft";
  feature_image?: string;
  published_at?: string;
}

/**
 * Create a single post in Ghost
 */
export async function createPost(postData: PostData) {
  try {
    const post = await api.posts.add(
      {
        title: postData.title,
        slug: postData.slug,
        html: postData.html,
        excerpt: postData.excerpt,
        tags: postData.tags || [],
        status: postData.status || "published",
        feature_image: postData.feature_image,
        published_at: postData.published_at,
      },
      { source: "html" }
    );
    console.log(`✅ Created post: "${postData.title}" (${post.url})`);
    return post;
  } catch (error: any) {
    console.error(`❌ Error creating post "${postData.title}":`, error.message);
    if (error.response) {
      console.error("API Response:", error.response.data);
    }
    throw error;
  }
}

/**
 * Bulk create posts from JSON file
 */
export async function bulkCreatePosts(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  const posts: PostData[] = JSON.parse(content);

  console.log(`📝 Found ${posts.length} posts to create...\n`);

  const results = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`[${i + 1}/${posts.length}] Creating: ${post.title}`);
    
    try {
      const created = await createPost(post);
      results.push({ success: true, post: created });
      
      // Rate limiting: wait 1 second between posts
      if (i < posts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      results.push({ success: false, post, error });
    }
  }

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\n📊 Summary:`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);

  return results;
}

// CLI usage
if (require.main === module) {
  const filePath = process.argv[2] || "content/posts.json";
  
  bulkCreatePosts(filePath)
    .then(() => {
      console.log("\n✨ Done!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Fatal error:", error.message);
      process.exit(1);
    });
}

