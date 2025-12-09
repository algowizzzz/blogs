"use client";

import type { Course } from "@/lib/courseMap";
import Button from "@/components/ui/Button";

interface CourseCTAProps {
  course: Course;
  variant?: "inline" | "bottom";
}

export default function CourseCTA({
  course,
  variant = "inline",
}: CourseCTAProps) {
  const isBottom = variant === "bottom";

  const handleClick = () => {
    // Track CTA click in Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "course_cta_click", {
        course_id: course.id,
        course_title: course.title,
        variant: variant,
      });
    }
  };

  return (
    <div
      className={`${
        isBottom ? "mt-12 pt-8 border-t border-neutral-border" : "my-8"
      }`}
    >
      <div className="bg-gradient-to-br from-primary-700 to-primary-500 rounded-xl p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            {course.badge && (
              <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold bg-accent text-primary-900 rounded-full">
                {course.badge}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              {course.title}
            </h3>
            <p className="text-white/80">{course.subtitle}</p>
          </div>
          <div className="flex-shrink-0">
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-full font-semibold hover:bg-surface-100 transition-all hover:-translate-y-0.5 shadow-button"
            >
              View Course
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
