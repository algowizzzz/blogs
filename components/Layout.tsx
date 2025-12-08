// components/Layout.tsx
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              DeepLearnHQ
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <Link href="/categories" className="hover:underline">
                Categories
              </Link>
              <Link href="/courses" className="hover:underline">
                Courses
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} DeepLearnHQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

