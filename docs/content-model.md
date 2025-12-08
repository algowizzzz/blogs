# Content Model & Tag Conventions

## Tag System

### Category Tags
**Format**: `category:{slug}`

**Purpose**: Organize posts into topic-based sections

**Examples**:
- `category:prompt-engineering`
- `category:finance-ai`
- `category:ai-tools`

**Usage**:
- Posts can have multiple category tags
- Categories appear in navigation
- Category pages list all posts in that category

### Course Tags
**Format**: `course:{course-id}`

**Purpose**: Trigger automatic course CTAs on posts

**Examples**:
- `course:prompt-bootcamp`
- `course:ai-for-finance`
- `course:chatgpt-mastery`

**Usage**:
- When a post has a `course:*` tag, CourseCTA components automatically appear
- Multiple course tags = multiple CTAs
- CTAs appear both inline and at the bottom of posts

### Regular Tags
**Format**: Standard tag names

**Purpose**: General categorization and discovery

**Examples**:
- `news`
- `tutorial`
- `beginner`
- `advanced`
- `ai`
- `chatgpt`

## Post Structure

### Required Fields
- `title` - Post title
- `slug` - URL-friendly identifier
- `html` - Post content (HTML)

### Optional Fields
- `excerpt` - Short description
- `feature_image` - Hero image
- `published_at` - Publication date
- `tags` - Array of tag objects
- `authors` - Array of author objects

## Best Practices

1. **Categories**: Use 1-3 category tags per post
2. **Courses**: Only add course tags when relevant to the content
3. **Regular Tags**: Use 3-5 tags for discoverability
4. **Slugs**: Keep category slugs lowercase with hyphens

