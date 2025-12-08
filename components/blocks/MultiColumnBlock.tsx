// components/blocks/MultiColumnBlock.tsx
import type { MultiColumnBlock as MultiColumnBlockType } from "@/types/content-blocks";
import BlockRenderer from "./BlockRenderer";

interface Props {
  block: MultiColumnBlockType;
}

export default function MultiColumnBlock({ block }: Props) {
  const spacing = block.formatting?.spacing || "medium";

  const spacingClasses = {
    small: "my-4",
    medium: "my-6",
    large: "my-8",
  };

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`${spacingClasses[spacing]} grid ${gridCols[block.columnCount as keyof typeof gridCols] || gridCols[2]} gap-4`}>
      {block.children.map((childBlock) => (
        <div key={childBlock.id} className="flex flex-col">
          <BlockRenderer blocks={[childBlock]} />
        </div>
      ))}
    </div>
  );
}

