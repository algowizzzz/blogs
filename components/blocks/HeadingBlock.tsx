// components/blocks/HeadingBlock.tsx
import type { HeadingBlock as HeadingBlockType } from "@/types/content-blocks";

interface Props {
  block: HeadingBlockType;
}

export default function HeadingBlock({ block }: Props) {
  const alignment = block.formatting?.alignment || "left";
  const spacing = block.formatting?.spacing || "medium";
  
  const spacingClasses = {
    small: "mb-2",
    medium: "mb-4",
    large: "mb-6",
  };

  const sizeClasses = {
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-semibold",
    6: "text-base font-semibold",
  };

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`${sizeClasses[block.level]} ${alignmentClasses[alignment]} ${spacingClasses[spacing]}`}
    >
      {block.content}
    </Tag>
  );
}

