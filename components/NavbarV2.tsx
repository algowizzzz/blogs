"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Dropdown menu component
function Dropdown({
  label,
  items,
  isOpen,
  onToggle,
}: {
  label: string;
  items: { name: string; href: string; description?: string }[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#0D9373] transition-colors py-2"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0D9373]"
            >
              <div className="font-medium">{item.name}</div>
              {item.description && (
                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Search modal component
function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // Parent will handle opening
        } else {
          onClose();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="max-w-2xl mx-auto mt-20 bg-white rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            className="flex-1 text-sm outline-none"
          />
          <kbd className="px-2 py-1 text-xs bg-gray-100 rounded text-gray-500">ESC</kbd>
        </div>
        <div className="p-4 text-sm text-gray-500 text-center">
          Start typing to search...
        </div>
      </div>
    </div>
  );
}

export default function NavbarV2() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keyboard shortcut for search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const coursesItems = [
    { name: "ChatGPT for Everyone", href: "/courses", description: "Free introductory course" },
    { name: "Prompt Engineering", href: "/courses", description: "Master prompting techniques" },
    { name: "AI for Business", href: "/courses", description: "Enterprise AI solutions" },
  ];

  const resourcesItems = [
    { name: "Blog", href: "/blog", description: "Latest AI news and tutorials" },
    { name: "Newsletter", href: "#newsletter", description: "Weekly AI insights" },
    { name: "Community", href: "#", description: "Join our Discord" },
  ];

  const businessItems = [
    { name: "For Teams", href: "/courses", description: "Team training solutions" },
    { name: "Enterprise", href: "/courses", description: "Custom AI programs" },
    { name: "Contact Sales", href: "#", description: "Get in touch" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0D9373] flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-gray-900 text-lg">
                DeepLearn<span className="text-[#0D9373]">HQ</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Dropdown
                label="Courses"
                items={coursesItems}
                isOpen={openDropdown === "courses"}
                onToggle={() => setOpenDropdown(openDropdown === "courses" ? null : "courses")}
              />
              <Link
                href="/docs"
                className={`text-sm py-2 transition-colors ${
                  isActive("/docs") ? "text-[#0D9373] font-medium" : "text-gray-700 hover:text-[#0D9373]"
                }`}
              >
                Docs
              </Link>
              <Link
                href="/blog"
                className={`text-sm py-2 transition-colors ${
                  isActive("/blog") ? "text-[#0D9373] font-medium" : "text-gray-700 hover:text-[#0D9373]"
                }`}
              >
                Blog
              </Link>
              <Dropdown
                label="Resources"
                items={resourcesItems}
                isOpen={openDropdown === "resources"}
                onToggle={() => setOpenDropdown(openDropdown === "resources" ? null : "resources")}
              />
              <Link
                href="/pricing"
                className={`text-sm py-2 transition-colors ${
                  isActive("/pricing") ? "text-[#0D9373] font-medium" : "text-gray-700 hover:text-[#0D9373]"
                }`}
              >
                Pricing
              </Link>
              <Dropdown
                label="For Business"
                items={businessItems}
                isOpen={openDropdown === "business"}
                onToggle={() => setOpenDropdown(openDropdown === "business" ? null : "business")}
              />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 text-xs bg-white rounded border border-gray-300">⌘K</kbd>
              </button>

              {/* CTA Button */}
              <Link
                href="/courses"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#0D9373] rounded-lg hover:bg-[#0B7D63] transition-colors"
              >
                Start Learning for Free
              </Link>

              {/* Log In */}
              <Link
                href="#"
                className="hidden sm:inline-flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log In
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link href="/courses" className="block text-sm text-gray-700 hover:text-[#0D9373]">
                Courses
              </Link>
              <Link href="/docs" className="block text-sm text-gray-700 hover:text-[#0D9373]">
                Docs
              </Link>
              <Link href="/blog" className="block text-sm text-gray-700 hover:text-[#0D9373]">
                Blog
              </Link>
              <Link href="/categories" className="block text-sm text-gray-700 hover:text-[#0D9373]">
                Categories
              </Link>
              <hr className="my-3" />
              <Link
                href="/courses"
                className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-[#0D9373] rounded-lg"
              >
                Start Learning for Free
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
