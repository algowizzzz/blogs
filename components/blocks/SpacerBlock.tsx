// components/blocks/SpacerBlock.tsx
import type { SpacerBlock as SpacerBlockType } from "@/types/content-blocks";

interface Props {
  block: SpacerBlockType;
}

export default function SpacerBlock({ block }: Props) {
  const height = block.height || 40;
  const spacing = block.formatting?.spacing || "medium";

  const spacingHeights = {
    small: 20,
    medium: 40,
    large: 60,
  };

  const finalHeight = spacing === "small" || spacing === "medium" || spacing === "large"
    ? spacingHeights[spacing]
    : height;

  return <div style={{ height: `${finalHeight}px` }} />;
}

