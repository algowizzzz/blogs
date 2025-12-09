import type { HeadingBlock as HeadingBlockType } from "@/types/content-blocks";

interface Props {
  block: HeadingBlockType;
}

export default function HeadingBlock({ block }: Props) {
  const alignment = block.formatting?.alignment || "left";
  const spacing = block.formatting?.spacing || "medium";

  const spacingClasses = {
    small: "mb-3 mt-6",
    medium: "mb-4 mt-8",
    large: "mb-6 mt-10",
  };

  const sizeClasses = {
    1: "text-3xl md:text-4xl font-bold tracking-tight text-primary-900",
    2: "text-2xl md:text-3xl font-bold tracking-tight text-primary-900",
    3: "text-xl md:text-2xl font-semibold text-primary-900",
    4: "text-lg md:text-xl font-semibold text-primary-900",
    5: "text-base md:text-lg font-semibold text-primary-900",
    6: "text-sm md:text-base font-semibold text-neutral-text-secondary uppercase tracking-wide",
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
