import type { MultiColumnBlock as MultiColumnBlockType } from "@/types/content-blocks";
import BlockRenderer from "./BlockRenderer";

interface Props {
  block: MultiColumnBlockType;
}

export default function MultiColumnBlock({ block }: Props) {
  const spacing = block.formatting?.spacing || "medium";

  const spacingClasses = {
    small: "my-6",
    medium: "my-8",
    large: "my-12",
  };

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={`${spacingClasses[spacing]} grid ${gridCols[block.columnCount as keyof typeof gridCols] || gridCols[2]} gap-6 md:gap-8`}
    >
      {block.children.map((childBlock) => (
        <div
          key={childBlock.id}
          className="flex flex-col p-4 bg-surface-100 rounded-xl"
        >
          <BlockRenderer blocks={[childBlock]} />
        </div>
      ))}
    </div>
  );
}
