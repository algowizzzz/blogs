import Link from "next/link";
import DocsLayout from "@/components/DocsLayout";

export const metadata = {
  title: "Documentation - DeepLearnHQ",
  description: "Comprehensive guide to prompt engineering and AI techniques.",
};

const sections = [
  {
    title: "Basics",
    icon: "😃",
    description: "Start here if you're new to prompt engineering",
    href: "/category/basics",
    articles: [
      "Introduction to Prompts",
      "Basic Formatting",
      "Understanding LLMs",
    ],
  },
  {
    title: "Applications",
    icon: "🤖",
    description: "Real-world use cases and applications",
    href: "/category/applications",
    articles: [
      "Content Creation",
      "Code Generation",
      "Data Analysis",
    ],
  },
  {
    title: "Intermediate",
    icon: "🧑‍🎄",
    description: "Level up your prompting skills",
    href: "/category/intermediate",
    articles: [
      "Chain of Thought",
      "Few-Shot Learning",
      "Prompt Templates",
    ],
  },
  {
    title: "Advanced",
    icon: "🎅",
    description: "Expert-level techniques and concepts",
    href: "/category/advanced",
    articles: [
      "Meta Prompting",
      "Constitutional AI",
      "Advanced Reasoning",
    ],
  },
];

export default function DocsPage() {
  return (
    <DocsLayout showRightTOC={false}>
      <article>
        <h1 id="intro" className="text-4xl font-bold text-gray-900 mb-6">
          Prompt Engineering Guide
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Welcome to DeepLearnHQ's comprehensive guide on Generative AI and Prompt Engineering!
        </p>

        <div className="bg-[#0D9373]/5 border border-[#0D9373]/20 rounded-lg p-6 mb-8">
          <p className="text-gray-700">
            Generative AI is the world's hottest buzzword, and we have created the most comprehensive 
            (<em>and free</em>) guide on how to use it. This guide is tailored to non-technical readers, 
            who may not have even heard of AI, making it the perfect starting point if you are new to 
            Generative AI and Prompt Engineering.
          </p>
        </div>

        <h2 id="getting-started" className="text-2xl font-bold text-gray-900 mt-12 mb-6">
          Getting Started
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-[#0D9373] hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{section.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#0D9373] transition-colors">
                  {section.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">{section.description}</p>
              <ul className="space-y-1">
                {section.articles.map((article) => (
                  <li key={article} className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    {article}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>

        <h2 id="special-topics" className="text-2xl font-bold text-gray-900 mt-12 mb-6">
          Special Topics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { name: "Reliability", icon: "⚖️", href: "/category/reliability" },
            { name: "Prompt Hacking", icon: "🔓", href: "/category/prompt-hacking" },
            { name: "Image Prompting", icon: "🖼️", href: "/category/image-prompting" },
            { name: "New Techniques", icon: "🚀", href: "/category/new-techniques" },
            { name: "Models", icon: "🔧", href: "/category/models" },
            { name: "RAG", icon: "📁", href: "/category/rag" },
            { name: "Agents", icon: "🤖", href: "/category/agents" },
            { name: "Prompt Tuning", icon: "👍", href: "/category/prompt-tuning" },
          ].map((topic) => (
            <Link
              key={topic.name}
              href={topic.href}
              className="group p-4 bg-white border border-gray-200 rounded-lg hover:border-[#0D9373] hover:shadow transition-all text-center"
            >
              <span className="text-2xl block mb-2">{topic.icon}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#0D9373] transition-colors">
                {topic.name}
              </span>
            </Link>
          ))}
        </div>

        <h2 id="about" className="text-2xl font-bold text-gray-900 mt-12 mb-6">
          About This Guide
        </h2>

        <p className="text-gray-600 mb-4">
          The first version of this guide came out in early 2023, making it one of the first comprehensive 
          resources on prompt engineering. It is now cited by Google, Microsoft, Wikipedia, O'REILLY, 
          Salesforce, and used by most Fortune 500 and major consulting companies.
        </p>

        <p className="text-gray-600">
          We recently released the largest survey report on prompting ever and are currently updating 
          the guide to cover this material. This guide that you are currently reading is completely 
          free and open-source.
        </p>
      </article>
    </DocsLayout>
  );
}

