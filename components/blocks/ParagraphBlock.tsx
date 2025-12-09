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
    small: "mb-3",
    medium: "mb-5",
    large: "mb-8",
  };

  return (
    <p
      className={`text-neutral-text leading-relaxed ${alignmentClasses[alignment]} ${spacingClasses[spacing]}`}
    >
      {block.content.map((segment, index) => {
        let className = "";
        if (segment.bold) className += "font-semibold text-primary-900 ";
        if (segment.italic) className += "italic ";

        if (segment.link) {
          return (
            <a
              key={index}
              href={segment.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${className}text-primary-500 hover:text-primary-700 underline underline-offset-2 transition-colors`}
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
