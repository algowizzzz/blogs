import type { SpacerBlock as SpacerBlockType } from "@/types/content-blocks";

interface Props {
  block: SpacerBlockType;
}

export default function SpacerBlock({ block }: Props) {
  const height = block.height || 40;
  const spacing = block.formatting?.spacing || "medium";

  const spacingHeights = {
    small: 24,
    medium: 48,
    large: 72,
  };

  const finalHeight =
    spacing === "small" || spacing === "medium" || spacing === "large"
      ? spacingHeights[spacing]
      : height;

  return (
    <div
      className="w-full"
      style={{ height: `${finalHeight}px` }}
      aria-hidden="true"
    />
  );
}
