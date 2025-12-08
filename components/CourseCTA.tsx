// components/CourseCTA.tsx
import Link from "next/link";
import type { Course } from "@/lib/courseMap";

interface CourseCTAProps {
  course: Course;
  variant?: "inline" | "bottom";
}

export default function CourseCTA({ course, variant = "inline" }: CourseCTAProps) {
  const isBottom = variant === "bottom";
  
  return (
    <div
      className={`${
        isBottom
          ? "mt-12 border-t pt-8"
          : "my-8 border rounded-lg"
      } bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          {course.badge && (
            <span className="inline-block mb-2 px-2 py-1 text-xs font-semibold bg-blue-600 text-white rounded">
              {course.badge}
            </span>
          )}
          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{course.subtitle}</p>
              <Link
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                onClick={() => {
                  // Track CTA click in Google Analytics
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'course_cta_click', {
                      course_id: course.id,
                      course_title: course.title,
                      variant: variant,
                    });
                  }
                }}
              >
                View Course →
              </Link>
        </div>
      </div>
    </div>
  );
}

