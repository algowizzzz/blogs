import TopBanner from "@/components/TopBanner";
import NavbarV2 from "@/components/NavbarV2";
import Footer from "@/components/Footer";
import CourseCardV2 from "@/components/CourseCardV2";

export const metadata = {
  title: "Courses - DeepLearnHQ",
  description: "Master AI and prompt engineering with our comprehensive courses.",
};

const featuredCourse = {
  id: "chatgpt-everyone",
  title: "ChatGPT for Everyone",
  description: "Learn how to use ChatGPT. Discover best practices for writing prompts and explore common business use cases for the powerful AI tool.",
  href: "https://seekhoai.pk/checkout",
  badge: "Free course",
  partnerName: "OpenAI",
  difficulty: "Beginner Friendly",
  duration: "1 hour",
  learnerCount: "82,354",
};

const courses = [
  {
    id: "chatgpt-everyone",
    title: "ChatGPT for Everyone",
    description: "Discover how to use ChatGPT effortlessly and explore the exciting world of Generative AI. No prior experience required.",
    href: "https://seekhoai.pk/checkout",
    badge: "Free",
    rating: 4.7,
    lessonCount: 25,
  },
  {
    id: "intro-prompt",
    title: "Introduction to Prompt Engineering",
    description: "Learn the fundamentals of prompt engineering, the practice of crafting effective instructions for AI systems like ChatGPT, Claude, and Midjourney. You'll learn how to write better prompts, understand how large language models (LLMs) interpret inputs, and apply AI tools for content creation, problem-solving, and workflow automation.",
    href: "https://seekhoai.pk/checkout",
    rating: 4.7,
    lessonCount: 12,
  },
  {
    id: "advanced-prompt",
    title: "Advanced Prompt Engineering",
    description: "Discover advanced techniques in prompt engineering to enhance the accuracy, reliability, and efficiency of AI-generated responses. Learn systematic methods for creating complex prompts for AI models like GPT-4, A1, Claude, and Gemini. Master key techniques like chain-of-thought prompting and automation.",
    href: "https://seekhoai.pk/checkout",
    rating: 4.4,
    lessonCount: 24,
  },
  {
    id: "ai-finance",
    title: "AI for Finance Professionals",
    description: "Master AI tools for financial analysis and decision-making. Learn to leverage AI in investment research, risk assessment, and more.",
    href: "https://seekhoai.pk/checkout",
    badge: "New",
    rating: 4.5,
    lessonCount: 18,
  },
  {
    id: "chatgpt-mastery",
    title: "ChatGPT Mastery",
    description: "Advanced techniques for getting the most out of ChatGPT. From basic prompts to complex multi-step workflows.",
    href: "https://seekhoai.pk/checkout",
    rating: 4.6,
    lessonCount: 30,
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBanner
        text="Compete in HackAPrompt 2.0, the world's largest AI Red-Teaming competition!"
        ctaText="Check it out"
        ctaLink="/courses"
      />
      <NavbarV2 />

      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Courses for Every Learner
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master AI and Future-Proof Your Career with hands-on, expert-led courses
          </p>
        </div>
      </section>

      {/* Featured Course */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended for AI beginners</h2>
          <p className="text-gray-600 mb-8">
            Build your AI skills with interactive courses & learning pathways, curated by real-world experts
          </p>

          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
            <span>Upskilling 2+ people?</span>
            <a href="#" className="text-[#0D9373] hover:underline">
              Get Learn Prompting for Teams →
            </a>
          </div>

          <CourseCardV2
            title={featuredCourse.title}
            description={featuredCourse.description}
            href={featuredCourse.href}
            badge={featuredCourse.badge}
            partnerName={featuredCourse.partnerName}
            difficulty={featuredCourse.difficulty}
            duration={featuredCourse.duration}
            learnerCount={featuredCourse.learnerCount}
            featured
          />
        </div>
      </section>

      {/* All Courses Grid */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCardV2
                key={course.id}
                title={course.title}
                description={course.description}
                href={course.href}
                badge={course.badge}
                rating={course.rating}
                lessonCount={course.lessonCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* For Business CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Training Your Team?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get custom AI training programs for your organization. Our enterprise solutions 
            help teams master AI tools efficiently.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-[#0D9373] text-white rounded-lg font-medium hover:bg-[#0B7D63] transition-colors"
            >
              Contact Sales
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
