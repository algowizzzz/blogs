// components/blocks/ParagraphBlock.tsx
import type { ParagraphBlock as ParagraphBlockType } from "@/types/content-blocks";

interface Props {
  block: ParagraphBlockType;
}

export default function ParagraphBlock({ block }: Props) {
  const alignment = block.formatting?.alignment || "left";
  const spacing = block.formatting?.spacing || "medium";

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const spacingClasses = {
    small: "mb-2",
    medium: "mb-4",
    large: "mb-6",
  };

  return (
    <p className={`${alignmentClasses[alignment]} ${spacingClasses[spacing]}`}>
      {block.content.map((segment, index) => {
        let className = "";
        if (segment.bold) className += "font-bold ";
        if (segment.italic) className += "italic ";

        if (segment.link) {
          return (
            <a
              key={index}
              href={segment.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${className}text-blue-600 hover:underline`}
            >
              {segment.text}
            </a>
          );
        }

        return (
          <span key={index} className={className}>
            {segment.text}
          </span>
        );
      })}
    </p>
  );
}

