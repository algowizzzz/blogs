import { CourseCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Courses - DeepLearnHQ",
  description: "Master AI and prompt engineering with our comprehensive courses.",
};

const courses = [
  {
    id: "prompt-bootcamp",
    title: "Complete Prompt Engineering, ChatGPT & AI Bootcamp",
    subtitle:
      "Learn practical prompting for real business workflows. Master techniques that work with ChatGPT, Claude, and other AI tools.",
    href: "https://seekhoai.pk/checkout",
    badge: "Best Seller",
    featured: true,
  },
  {
    id: "ai-for-finance",
    title: "AI for Finance Professionals",
    subtitle:
      "Master AI tools for financial analysis and decision-making. Learn to leverage AI in investment research, risk assessment, and more.",
    href: "https://seekhoai.pk/checkout",
    badge: "New",
    featured: false,
  },
  {
    id: "chatgpt-mastery",
    title: "ChatGPT Mastery Course",
    subtitle:
      "Advanced techniques for getting the most out of ChatGPT. From basic prompts to complex multi-step workflows.",
    href: "https://seekhoai.pk/checkout",
    featured: false,
  },
];

export default function CoursesPage() {
  return (
    <div className="bg-surface-0">
      {/* Hero Section */}
      <section className="classic-padding py-16 md:py-24 bg-gradient-to-b from-surface-100 to-surface-0">
        <div className="max-w-content">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full">
              Level Up Your Skills
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-900 tracking-tight mb-6">
              Master AI with Our{" "}
              <span className="bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                Expert-Led Courses
              </span>
            </h1>
            <p className="text-lg text-neutral-text-secondary">
              Learn practical AI skills from industry experts. Our courses are
              designed to take you from beginner to professional.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Course */}
      <section className="classic-padding py-12">
        <div className="max-w-content">
          <div className="bg-gradient-to-br from-primary-700 to-primary-500 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold bg-accent text-primary-900 rounded-full">
                  {courses[0].badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {courses[0].title}
                </h2>
                <p className="text-lg text-white/80 mb-6">
                  {courses[0].subtitle}
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "50+ video lessons",
                    "Hands-on projects",
                    "Certificate of completion",
                    "Lifetime access",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href={courses[0].href}
                  external
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-surface-100 border-0"
                >
                  Enroll Now
                </Button>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="classic-padding py-12 md:py-16">
        <div className="max-w-content">
          <h2 className="text-2xl font-bold text-primary-900 mb-8">
            All Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                subtitle={course.subtitle}
                href={course.href}
                badge={course.badge}
                featured={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="classic-padding py-16 md:py-20 bg-surface-100 border-t border-neutral-border">
        <div className="max-w-content">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-neutral-text-secondary mb-8">
              Check out our free blog content to get a taste of what you'll
              learn in our courses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/blog" variant="secondary">
                Browse Free Articles
              </Button>
              <Button
                href="mailto:support@deeplearnhq.com"
                variant="ghost"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

