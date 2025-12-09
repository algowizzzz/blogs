"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface RightTOCProps {
  items?: TOCItem[];
}

export default function RightTOC({ items }: RightTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [tocItems, setTocItems] = useState<TOCItem[]>(items || []);

  // Auto-generate TOC from page headings if items not provided
  useEffect(() => {
    if (!items) {
      const headings = document.querySelectorAll("article h2, article h3");
      const generatedItems: TOCItem[] = Array.from(headings).map((heading) => {
        // Ensure heading has an id
        if (!heading.id) {
          heading.id = heading.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "") || "";
        }
        return {
          id: heading.id,
          text: heading.textContent || "",
          level: heading.tagName === "H2" ? 2 : 3,
        };
      });
      setTocItems(generatedItems);
    }
  }, [items]);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <aside className="w-64 flex-shrink-0 hidden xl:block">
      <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)]">
        <div className="pl-4 border-l border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm font-semibold text-gray-900">On this page</span>
          </div>
          <nav className="space-y-1">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`block w-full text-left text-sm py-1 transition-colors ${
                  item.level === 3 ? "pl-4" : ""
                } ${
                  activeId === item.id
                    ? "text-[#0D9373] font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.text}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
