import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  excerpt?: string;
  slug: string;
  publishedAt?: string;
  readingTime?: number;
  featureImage?: string;
  category?: string;
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  publishedAt,
  readingTime,
  featureImage,
  category,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image with branded overlay */}
        <div className="relative aspect-[16/10] bg-[#0D9373] overflow-hidden">
          {featureImage ? (
            <Image
              src={featureImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-center px-6">
              <div className="text-white">
                <div className="text-lg font-semibold mb-1">DeepLearnHQ</div>
                <div className="text-2xl font-bold">Newsletter</div>
              </div>
              {/* Astronaut illustration placeholder */}
              <div className="absolute right-4 bottom-4 w-24 h-24 opacity-80">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white/30">
                  <circle cx="50" cy="30" r="20" fill="currentColor" />
                  <rect x="35" y="50" width="30" height="40" rx="5" fill="currentColor" />
                </svg>
              </div>
            </div>
          )}
          {/* Category badge */}
          {category && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2.5 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-md">
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0D9373] transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">{excerpt}</p>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {publishedAt && (
              <time>
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            )}
            {readingTime && (
              <>
                <span>•</span>
                <span className="px-2 py-0.5 bg-[#0D9373]/10 text-[#0D9373] rounded text-xs font-medium">
                  {readingTime} minutes
                </span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

