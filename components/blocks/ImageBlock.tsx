// components/blocks/ImageBlock.tsx
import Image from "next/image";
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

  // Default dimensions if not provided
  const width = block.width || 800;
  const height = block.height || 600;

  return (
    <figure className={`${spacingClasses[spacing]} ${alignmentClasses[alignment]}`}>
      <div className="relative w-full" style={{ maxWidth: block.width ? `${block.width}px` : undefined }}>
        <Image
          src={block.url}
          alt={block.alt}
          width={width}
          height={height}
          className="w-full rounded-lg"
          style={{
            height: block.height ? `${block.height}px` : "auto",
            objectFit: block.height ? "cover" : "contain",
          }}
          loading="lazy"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

