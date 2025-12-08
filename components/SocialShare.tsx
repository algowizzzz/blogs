// components/SocialShare.tsx
"use client";

import { useState } from "react";

interface Props {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description }: Props) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text: description || title,
    url,
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  return (
    <div className="mt-8 pt-6 border-t">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Share this article</h3>
      <div className="flex items-center gap-3 flex-wrap">
        {/* Native Share (mobile) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            Share
          </button>
        )}

        {/* Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Twitter
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Facebook
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          LinkedIn
        </a>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
        >
          {copied ? "✓ Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}

