import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Blog", href: "/blog" },
    { name: "Categories", href: "/categories" },
    { name: "Courses", href: "/courses" },
  ],
  resources: [
    { name: "RSS Feed", href: "/rss" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ],
  social: [
    { name: "Twitter", href: "https://twitter.com/deeplearnhq" },
    { name: "LinkedIn", href: "https://linkedin.com/company/deeplearnhq" },
    { name: "GitHub", href: "https://github.com/deeplearnhq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-100 border-t border-neutral-border mt-auto">
      <div className="classic-padding max-w-content py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="text-xl font-bold text-primary-900 tracking-tight">
                DeepLearn<span className="text-primary-500">HQ</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-text-secondary leading-relaxed">
              Your go-to source for AI, prompt engineering, and deep learning insights.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-text-secondary hover:text-primary-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-text-secondary hover:text-primary-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary-900 mb-4">Connect</h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-text-secondary hover:text-primary-500 transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
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
                        d="M7 17L17 7M17 7H7M17 7v10"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-text-tertiary">
            © {new Date().getFullYear()} DeepLearnHQ. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-sm text-neutral-text-tertiary hover:text-primary-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-neutral-text-tertiary hover:text-primary-500 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

