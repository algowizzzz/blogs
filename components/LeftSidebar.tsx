"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  name: string;
  href?: string;
  icon?: string;
  children?: SidebarItem[];
  color?: string;
}

interface LeftSidebarProps {
  items?: SidebarItem[];
  title?: string;
}

const defaultItems: SidebarItem[] = [
  {
    name: "Prompt Engineering Guide",
    href: "/docs",
    children: [
      { name: "Basics", icon: "😃", href: "/category/basics" },
      { name: "Applications", icon: "🤖", href: "/category/applications" },
      { name: "Intermediate", icon: "🧑‍🎄", href: "/category/intermediate" },
      { name: "Advanced", icon: "🎅", href: "/category/advanced" },
    ],
  },
  {
    name: "Special Topics",
    children: [
      {
        name: "Reliability",
        icon: "⚖️",
        href: "/category/reliability",
        children: [
          { name: "Introduction", href: "/blog/reliability-intro", color: "bg-green-500" },
          { name: "Prompt Debiasing", href: "/blog/prompt-debiasing", color: "bg-green-500" },
          { name: "Prompt Ensembling", href: "/blog/prompt-ensembling", color: "bg-blue-500" },
          { name: "LLM Self-Evaluation", href: "/blog/llm-self-eval", color: "bg-blue-500" },
        ],
      },
      { name: "Prompt Hacking", icon: "🔓", href: "/category/prompt-hacking" },
      { name: "Image Prompting", icon: "🖼️", href: "/category/image-prompting" },
      { name: "New Techniques", icon: "🚀", href: "/category/new-techniques" },
      { name: "Models", icon: "🔧", href: "/category/models" },
      { name: "RAG", icon: "📁", href: "/category/rag" },
      { name: "Agents", icon: "🤖", href: "/category/agents" },
      { name: "Prompt Tuning", icon: "👍", href: "/category/prompt-tuning" },
      { name: "Language Model Inversion", icon: "🔄", href: "/category/lm-inversion" },
    ],
  },
  {
    name: "Resources",
    children: [
      { name: "Bibliography", icon: "📚", href: "/resources/bibliography" },
    ],
  },
];

function SidebarSection({
  item,
  depth = 0,
}: {
  item: SidebarItem;
  depth?: number;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href && pathname === item.href;

  if (!hasChildren && item.href) {
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
          isActive
            ? "bg-[#0D9373]/10 text-[#0D9373] font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        style={{ paddingLeft: `${12 + depth * 12}px` }}
      >
        {item.color && (
          <span className={`w-2 h-2 rounded-full ${item.color}`} />
        )}
        {item.icon && <span className="text-base">{item.icon}</span>}
        <span>{item.name}</span>
      </Link>
    );
  }

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors ${
          depth === 0
            ? "font-semibold text-[#0D9373] hover:bg-gray-50"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        style={{ paddingLeft: `${12 + depth * 12}px` }}
      >
        <span className="flex items-center gap-2">
          {item.icon && <span className="text-base">{item.icon}</span>}
          <span>{item.name}</span>
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {isOpen && hasChildren && (
        <div className="mt-1">
          {item.children!.map((child, idx) => (
            <SidebarSection key={idx} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LeftSidebar({ items = defaultItems, title }: LeftSidebarProps) {
  return (
    <aside className="w-72 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto h-[calc(100vh-64px)] sticky top-16">
      <div className="py-4">
        {title && (
          <div className="px-4 mb-4">
            <h2 className="text-sm font-semibold text-[#0D9373]">{title}</h2>
          </div>
        )}
        <nav className="px-2">
          {items.map((item, idx) => (
            <SidebarSection key={idx} item={item} />
          ))}
        </nav>

        {/* Bottom section */}
        <div className="mt-8 px-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span>English</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
