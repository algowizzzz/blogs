// components/blocks/CTABlock.tsx
import type { CTABlock as CTABlockType } from "@/types/content-blocks";
import { COURSE_MAP } from "@/lib/courseMap";
import CourseCTA from "@/components/CourseCTA";

interface Props {
  block: CTABlockType;
}

export default function CTABlock({ block }: Props) {
  const course = COURSE_MAP[block.course_id];
  
  if (!course) {
    console.warn(`Course not found: ${block.course_id}`);
    return null;
  }

  return (
    <div className={block.formatting?.spacing === "large" ? "my-8" : "my-6"}>
      <CourseCTA course={course} variant={block.variant || "inline"} />
    </div>
  );
}

