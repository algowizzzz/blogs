import type { CTABlock as CTABlockType } from "@/types/content-blocks";
import { COURSE_MAP } from "@/lib/courseMap";
import Button from "@/components/ui/Button";

interface Props {
  block: CTABlockType;
}

export default function CTABlock({ block }: Props) {
  const course = COURSE_MAP[block.course_id];

  if (!course) {
    console.warn(`Course not found: ${block.course_id}`);
    return null;
  }

  const isBottom = block.variant === "bottom";
  const spacing = block.formatting?.spacing || "medium";

  const spacingClasses = {
    small: "my-6",
    medium: "my-8",
    large: "my-12",
  };

  return (
    <div
      className={`
        ${spacingClasses[spacing]}
        ${isBottom ? "mt-12 pt-8 border-t border-neutral-border" : ""}
      `}
    >
      <div className="bg-gradient-to-br from-primary-700 to-primary-500 rounded-xl p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            {course.badge && (
              <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold bg-accent text-primary-900 rounded-full">
                {course.badge}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-bold mb-2">{course.title}</h3>
            <p className="text-white/80">{course.subtitle}</p>
          </div>
          <div className="flex-shrink-0">
            <Button
              href={course.url}
              external
              className="bg-white text-primary-700 hover:bg-surface-100 border-0"
            >
              View Course
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
