import Link from "next/link";
import Image from "next/image";

interface CourseCardV2Props {
  title: string;
  description: string;
  href: string;
  badge?: string;
  badgeColor?: "green" | "blue" | "purple";
  partnerLogo?: string;
  partnerName?: string;
  difficulty?: string;
  duration?: string;
  learnerCount?: string;
  rating?: number;
  lessonCount?: number;
  imageUrl?: string;
  featured?: boolean;
}

export default function CourseCardV2({
  title,
  description,
  href,
  badge,
  badgeColor = "green",
  partnerLogo,
  partnerName,
  difficulty,
  duration,
  learnerCount,
  rating,
  lessonCount,
  imageUrl,
  featured = false,
}: CourseCardV2Props) {
  const badgeColors = {
    green: "bg-[#0D9373]/10 text-[#0D9373] border-[#0D9373]/20",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };

  if (featured) {
    return (
      <Link href={href} className="group block">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
          {/* Badge */}
          {badge && (
            <div className="px-6 pt-4">
              <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${badgeColors[badgeColor]}`}>
                {badge}
              </span>
            </div>
          )}

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0D9373] transition-colors">
              {title}
            </h3>

            {/* Partner */}
            {partnerName && (
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <span>Created in Collaboration with</span>
                {partnerLogo ? (
                  <Image src={partnerLogo} alt={partnerName} width={80} height={24} className="h-6 w-auto" />
                ) : (
                  <span className="font-semibold text-gray-900">{partnerName}</span>
                )}
              </div>
            )}

            <p className="text-gray-600 mb-6 line-clamp-3">{description}</p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {difficulty && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {difficulty}
                </span>
              )}
              {duration && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {duration}
                </span>
              )}
              {learnerCount && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {learnerCount} learners enrolled
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Regular course card (with image)
  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative aspect-[16/10] bg-gray-900">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-lg font-semibold">{title}</div>
              </div>
            </div>
          )}
          {badge && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium bg-[#0D9373] text-white rounded">
                {badge}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#0D9373] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">{description}</p>

          {/* Rating and lessons */}
          <div className="flex items-center gap-4 text-sm">
            {rating && (
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">{rating}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            )}
            {lessonCount && (
              <span className="text-gray-500">{lessonCount} Lessons</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

