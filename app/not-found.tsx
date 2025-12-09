import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center classic-padding py-16">
      <div className="max-w-md mx-auto text-center">
        {/* 404 Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-primary-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-primary-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-text-secondary mb-8">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or doesn't exist.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/">Go Home</Button>
          <Button href="/blog" variant="secondary">
            Browse Articles
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-neutral-border">
          <p className="text-sm text-neutral-text-tertiary mb-4">
            Here are some helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/categories"
              className="text-sm text-primary-500 hover:text-primary-700 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/courses"
              className="text-sm text-primary-500 hover:text-primary-700 transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/rss"
              className="text-sm text-primary-500 hover:text-primary-700 transition-colors"
            >
              RSS Feed
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
