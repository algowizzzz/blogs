"use client";

import { useState } from "react";
import Link from "next/link";

interface TopBannerProps {
  text: string;
  ctaText: string;
  ctaLink: string;
}

export default function TopBanner({
  text = "Compete in HackAPrompt 2.0, the world's largest AI Red-Teaming competition!",
  ctaText = "Check it out",
  ctaLink = "/courses",
}: TopBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#0D9373] text-white text-sm py-2.5 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="text-center">{text}</span>
        <Link
          href={ctaLink}
          className="inline-flex items-center gap-1 px-3 py-1 bg-white text-[#0D9373] rounded-md text-xs font-medium hover:bg-gray-100 transition-colors"
        >
          {ctaText}
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          aria-label="Dismiss banner"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

