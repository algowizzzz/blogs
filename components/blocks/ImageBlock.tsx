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
    small: "my-6",
    medium: "my-8",
    large: "my-12",
  };

  // Default dimensions if not provided
  const width = block.width || 800;
  const height = block.height || 600;

  return (
    <figure className={`${spacingClasses[spacing]} ${alignmentClasses[alignment]}`}>
      <div
        className="relative w-full overflow-hidden rounded-xl shadow-card"
        style={{ maxWidth: block.width ? `${block.width}px` : undefined }}
      >
        <Image
          src={block.url}
          alt={block.alt}
          width={width}
          height={height}
          className="w-full transition-transform duration-300 hover:scale-[1.02]"
          style={{
            height: block.height ? `${block.height}px` : "auto",
            objectFit: block.height ? "cover" : "contain",
          }}
          loading="lazy"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-3 text-sm text-neutral-text-tertiary text-center">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
