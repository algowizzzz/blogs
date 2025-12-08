# Content Structure Analysis & Proposal

## Current Structure (from test_data_3.json)

### Block Types Found:
1. **heading** - Headings with levels (1-6)
2. **paragraph** - Text content with inline formatting
3. **image** - Images with alt text, captions, positioning
4. **table** - Tables with columns, rows, headers, alignments
5. **spacer** - Vertical spacing blocks
6. **multi-column** - Layout blocks with children
7. **footer** - Footer content blocks

### Key Features:
- Each block has: `id`, `type`, `content`, `formatting`, `bbox` (bounding box)
- Paragraphs support inline formatting: `bold`, `italic`, etc.
- Images have: `alt`, `role` (chart/image), `position`
- Tables have: `columns`, `rows`, `has_header`, `column_alignments`
- Multi-column supports nested children blocks
- Formatting includes: `alignment`, `font_size`, `bold`, `size`

## Proposed Blog Content Structure

### Unified Block-Based System

```typescript
interface ContentBlock {
  id: string;
  type: BlockType;
  // Common properties
  formatting?: {
    alignment?: "left" | "center" | "right";
    spacing?: "small" | "medium" | "large";
  };
}

type BlockType = 
  | "heading"
  | "paragraph" 
  | "image"
  | "table"
  | "spacer"
  | "cta"           // NEW: Course CTA blocks
  | "code"          // FUTURE: Code blocks
  | "math"          // FUTURE: Math equations
  | "quote"         // FUTURE: Block quotes
  | "list"          // FUTURE: Ordered/unordered lists
  | "multi-column"; // Layout container
```

### Block Type Definitions

#### 1. Heading Block
```json
{
  "id": "heading_1",
  "type": "heading",
  "level": 1,
  "content": "Main Title",
  "formatting": {
    "alignment": "left",
    "size": "large"
  }
}
```

#### 2. Paragraph Block
```json
{
  "id": "para_1",
  "type": "paragraph",
  "content": [
    {
      "text": "This is ",
      "bold": false
    },
    {
      "text": "bold text",
      "bold": true
    },
    {
      "text": " and this is normal."
    }
  ],
  "formatting": {
    "alignment": "left"
  }
}
```

#### 3. Image Block
```json
{
  "id": "img_1",
  "type": "image",
  "url": "https://example.com/image.jpg",
  "alt": "Description of image",
  "caption": "Optional caption text",
  "width": 800,
  "height": 600,
  "formatting": {
    "alignment": "center",
    "spacing": "medium"
  }
}
```

#### 4. Table Block
```json
{
  "id": "table_1",
  "type": "table",
  "columns": ["Column 1", "Column 2", "Column 3"],
  "rows": [
    ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
    ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"]
  ],
  "has_header": true,
  "column_alignments": ["left", "center", "right"],
  "formatting": {
    "alignment": "center"
  }
}
```

#### 5. Spacer Block
```json
{
  "id": "spacer_1",
  "type": "spacer",
  "height": 40,
  "formatting": {
    "spacing": "medium"
  }
}
```

#### 6. CTA Block (NEW - Blog Specific)
```json
{
  "id": "cta_1",
  "type": "cta",
  "course_id": "course:prompt-bootcamp",
  "variant": "inline",
  "formatting": {
    "alignment": "center",
    "spacing": "large"
  }
}
```

#### 7. Multi-Column Block
```json
{
  "id": "multi_col_1",
  "type": "multi-column",
  "columnCount": 2,
  "children": [
    {
      "id": "col_1",
      "type": "image",
      "url": "https://example.com/img.jpg",
      "alt": "Image"
    },
    {
      "id": "col_2",
      "type": "paragraph",
      "content": [{"text": "Text content"}]
    }
  ]
}
```

#### 8. Code Block (FUTURE)
```json
{
  "id": "code_1",
  "type": "code",
  "language": "javascript",
  "content": "const x = 10;",
  "formatting": {
    "alignment": "left"
  }
}
```

#### 9. Math Block (FUTURE)
```json
{
  "id": "math_1",
  "type": "math",
  "formula": "E = mc^2",
  "format": "latex",
  "formatting": {
    "alignment": "center"
  }
}
```

## Complete Blog Post JSON Structure

```json
{
  "title": "Post Title",
  "slug": "post-slug",
  "excerpt": "Short description",
  "feature_image": "https://example.com/hero.jpg",
  "tags": ["category:prompt-engineering", "course:prompt-bootcamp"],
  "status": "published",
  "content_blocks": [
    {
      "id": "heading_1",
      "type": "heading",
      "level": 1,
      "content": "Introduction"
    },
    {
      "id": "para_1",
      "type": "paragraph",
      "content": [{"text": "Opening paragraph..."}]
    },
    {
      "id": "img_1",
      "type": "image",
      "url": "https://example.com/image.jpg",
      "alt": "Description",
      "caption": "Image caption"
    },
    {
      "id": "cta_1",
      "type": "cta",
      "course_id": "course:prompt-bootcamp",
      "variant": "inline"
    },
    {
      "id": "heading_2",
      "type": "heading",
      "level": 2,
      "content": "Main Section"
    },
    {
      "id": "table_1",
      "type": "table",
      "columns": ["Item", "Value"],
      "rows": [["A", "1"], ["B", "2"]],
      "has_header": true
    },
    {
      "id": "spacer_1",
      "type": "spacer",
      "height": 40
    },
    {
      "id": "cta_2",
      "type": "cta",
      "course_id": "course:chatgpt-mastery",
      "variant": "inline"
    }
  ]
}
```

## Migration Strategy

### Phase 1: Support Both Formats
- Keep existing HTML format working
- Add new `content_blocks` format
- Renderer checks: if `content_blocks` exists, use it; else use `html`

### Phase 2: Block Renderer
- Create `BlockRenderer` component
- Each block type has its own component
- Extensible: new block types = new components

### Phase 3: Full Migration
- Convert all posts to block format
- Deprecate HTML format (or keep as fallback)

## Benefits

✅ **Extensible**: Easy to add new block types (code, math, etc.)
✅ **Structured**: Clear separation of content types
✅ **Flexible**: CTAs can be placed anywhere
✅ **Consistent**: Same structure as your editor
✅ **Future-proof**: Ready for new content types

