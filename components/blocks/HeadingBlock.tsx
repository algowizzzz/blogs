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

  const HeadingTag = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  }[block.level] as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  const Component = HeadingTag;

  return (
    <Component
      className={`${sizeClasses[block.level]} ${alignmentClasses[alignment]} ${spacingClasses[spacing]}`}
    >
      {block.content}
    </Component>
  );
}

