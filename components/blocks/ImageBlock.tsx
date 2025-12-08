// components/blocks/ImageBlock.tsx
import type { ImageBlock as ImageBlockType } from "@/types/content-blocks";

interface Props {
  block: ImageBlockType;
}

export default function ImageBlock({ block }: Props) {
  const alignment = block.formatting?.alignment || "center";
  const spacing = block.formatting?.spacing || "medium";

  const alignmentClasses = {
    left: "ml-0",
    center: "mx-auto",
    right: "ml-auto",
  };

  const spacingClasses = {
    small: "my-4",
    medium: "my-6",
    large: "my-8",
  };

  return (
    <figure className={`${spacingClasses[spacing]} ${alignmentClasses[alignment]}`}>
      <img
        src={block.url}
        alt={block.alt}
        className="w-full rounded-lg"
        style={{
          maxWidth: block.width ? `${block.width}px` : undefined,
          height: block.height ? `${block.height}px` : undefined,
          objectFit: block.height ? "cover" : undefined,
        }}
      />
      {block.caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

