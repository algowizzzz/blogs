import Link from "next/link";
import TopBanner from "@/components/TopBanner";
import NavbarV2 from "@/components/NavbarV2";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBanner
        text="Compete in HackAPrompt 2.0, the world's largest AI Red-Teaming competition!"
        ctaText="Check it out"
        ctaLink="/courses"
      />
      <NavbarV2 />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8">
            <span className="text-8xl font-bold text-gray-200">404</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page not found
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved or doesn't exist.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-[#0D9373] text-white rounded-lg font-medium hover:bg-[#0B7D63] transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Browse Blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
