// lib/courseMap.ts

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
}

export const COURSE_MAP: Record<string, Course> = {
  "course:prompt-bootcamp": {
    id: "course:prompt-bootcamp",
    title: "Complete Prompt Engineering, ChatGPT & AI Bootcamp",
    subtitle: "Learn practical prompting for real business workflows.",
    url: "https://seekhoai.pk/checkout",
    badge: "Best Seller",
  },
  "course:ai-for-finance": {
    id: "course:ai-for-finance",
    title: "AI for Finance Professionals",
    subtitle: "Master AI tools for financial analysis and decision-making.",
    url: "https://seekhoai.pk/checkout",
    badge: "New",
  },
  "course:chatgpt-mastery": {
    id: "course:chatgpt-mastery",
    title: "ChatGPT Mastery Course",
    subtitle: "Advanced techniques for getting the most out of ChatGPT.",
    url: "https://seekhoai.pk/checkout",
  },
} as const;

/**
 * Extract course tags from post tags
 */
export function getCoursesFromTags(tags: Array<{ slug: string; name: string }>): Course[] {
  const courses: Course[] = [];
  
  tags.forEach((tag) => {
    const courseId = tag.slug.startsWith("course:") 
      ? tag.slug 
      : tag.name.startsWith("course:") 
        ? tag.name 
        : null;
    
    if (courseId && COURSE_MAP[courseId]) {
      courses.push(COURSE_MAP[courseId]);
    }
  });
  
  return courses;
}

