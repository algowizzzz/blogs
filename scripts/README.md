# Ghost Post Publisher

This script allows you to bulk create posts in Ghost via the Admin API.

## Setup

### 1. Get Ghost Admin API Key

1. Go to your Ghost admin: `https://deeplearnhq.ghost.io/ghost`
2. Navigate to **Settings → Integrations → Add custom integration**
3. Name it: "Post Publisher" or "Bulk Importer"
4. Copy the **Admin API Key** (format: `xxxxx:yyyyyyyyyyyy`)

### 2. Add Environment Variables

Add to your `.env.local` file:

```env
GHOST_ADMIN_URL=https://deeplearnhq.ghost.io
GHOST_ADMIN_API_KEY=your-admin-api-key-here
```

**⚠️ Important:** Never commit `.env.local` to git! The Admin API key has write access.

## Usage

### Create Posts from JSON

1. Create a JSON file in `content/` directory (see `content/posts.example.json` for format)

2. Run the script:
```bash
npm run publish:ghost content/your-posts.json
```

Or use the example:
```bash
npm run publish:ghost content/posts.example.json
```

### Post JSON Format

```json
[
  {
    "title": "Post Title",
    "slug": "post-slug",
    "html": "<p>Post content in HTML</p>",
    "excerpt": "Short description",
    "tags": ["category:prompt-engineering", "course:prompt-bootcamp"],
    "status": "published",
    "feature_image": "https://example.com/image.jpg"
  }
]
```

### Tag Conventions

- **Categories**: `category:slug-name` (e.g., `category:prompt-engineering`)
- **Courses**: `course:course-id` (e.g., `course:prompt-bootcamp`)
- **Regular tags**: Any other tag name

## Features

- ✅ Bulk import from JSON
- ✅ Rate limiting (1 second between posts)
- ✅ Error handling with detailed logs
- ✅ Progress tracking
- ✅ Summary report

## Example: Creating 1000 Posts

1. Generate your posts JSON (manually or with a script)
2. Save to `content/posts.json`
3. Run: `npm run publish:ghost content/posts.json`
4. Wait for completion (includes rate limiting)

The script will:
- Create posts one by one
- Show progress
- Handle errors gracefully
- Provide a summary at the end

