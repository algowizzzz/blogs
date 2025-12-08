// types/content-blocks.ts

export interface BaseBlock {
  id: string;
  type: BlockType;
  formatting?: {
    alignment?: "left" | "center" | "right";
    spacing?: "small" | "medium" | "large";
  };
}

export type BlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "table"
  | "spacer"
  | "cta"
  | "multi-column";

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  content: Array<{
    text: string;
    bold?: boolean;
    italic?: boolean;
    link?: string;
  }>;
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface TableBlock extends BaseBlock {
  type: "table";
  columns: string[];
  rows: string[][];
  has_header?: boolean;
  column_alignments?: ("left" | "center" | "right")[];
}

export interface SpacerBlock extends BaseBlock {
  type: "spacer";
  height?: number;
}

export interface CTABlock extends BaseBlock {
  type: "cta";
  course_id: string;
  variant?: "inline" | "bottom";
}

export interface MultiColumnBlock extends BaseBlock {
  type: "multi-column";
  columnCount: number;
  children: ContentBlock[];
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | TableBlock
  | SpacerBlock
  | CTABlock
  | MultiColumnBlock;

