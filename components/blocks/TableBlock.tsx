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
    small: "my-6",
    medium: "my-8",
    large: "my-12",
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
      <table className="min-w-full border border-neutral-border rounded-lg overflow-hidden">
        {block.has_header && (
          <thead>
            <tr className="bg-surface-200">
              {block.columns.map((column, index) => (
                <th
                  key={index}
                  className={`border-b border-neutral-border px-4 py-3 font-semibold text-sm text-primary-900 ${getCellAlignment(index)}`}
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
              className={`${
                rowIndex % 2 === 0 ? "bg-surface-0" : "bg-surface-100"
              } hover:bg-primary-100/30 transition-colors`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border-b border-neutral-border px-4 py-3 text-sm text-neutral-text ${getCellAlignment(cellIndex)}`}
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
