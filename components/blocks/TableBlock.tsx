// components/blocks/TableBlock.tsx
import type { TableBlock as TableBlockType } from "@/types/content-blocks";

interface Props {
  block: TableBlockType;
}

export default function TableBlock({ block }: Props) {
  const alignment = block.formatting?.alignment || "left";
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

  const getCellAlignment = (index: number) => {
    const alignment = block.column_alignments?.[index] || "left";
    return {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[alignment];
  };

  return (
    <div className={`${spacingClasses[spacing]} ${alignmentClasses[alignment]} overflow-x-auto`}>
      <table className="min-w-full border-collapse border border-gray-300">
        {block.has_header && (
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              {block.columns.map((column, index) => (
                <th
                  key={index}
                  className={`border border-gray-300 px-4 py-2 font-semibold ${getCellAlignment(index)}`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border border-gray-300 px-4 py-2 ${getCellAlignment(cellIndex)}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

