// components/blocks/BlockRenderer.tsx
import type { ContentBlock } from "@/types/content-blocks";
import HeadingBlock from "./HeadingBlock";
import ParagraphBlock from "./ParagraphBlock";
import ImageBlock from "./ImageBlock";
import TableBlock from "./TableBlock";
import SpacerBlock from "./SpacerBlock";
import MultiColumnBlock from "./MultiColumnBlock";
import CTABlock from "./CTABlock";

interface Props {
  blocks: ContentBlock[];
}

export default function BlockRenderer({ blocks }: Props) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "heading":
            return <HeadingBlock key={block.id} block={block} />;
          case "paragraph":
            return <ParagraphBlock key={block.id} block={block} />;
          case "image":
            return <ImageBlock key={block.id} block={block} />;
          case "table":
            return <TableBlock key={block.id} block={block} />;
          case "spacer":
            return <SpacerBlock key={block.id} block={block} />;
          case "cta":
            return <CTABlock key={block.id} block={block} />;
          case "multi-column":
            return <MultiColumnBlock key={block.id} block={block} />;
          default:
            console.warn(`Unknown block type: ${(block as any).type}`);
            return null;
        }
      })}
    </>
  );
}

