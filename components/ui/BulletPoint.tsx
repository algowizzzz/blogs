import React from "react";

interface BulletPointProps {
  icon: React.ReactNode;
  header: string;
  description: string;
  className?: string;
}

export default function BulletPoint({
  icon,
  header,
  description,
  className = "",
}: BulletPointProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-base font-semibold text-primary-900 mb-1">
          {header}
        </h4>
        <p className="text-sm text-neutral-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// FAQ Item Component with expandable functionality
interface FAQItemProps {
  question: string;
  answer: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

export function FAQItem({
  question,
  answer,
  icon,
  defaultOpen = false,
}: FAQItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-neutral-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-start gap-4 text-left group"
      >
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
            {icon}
          </div>
        )}
        <div className="flex-1 flex items-start justify-between gap-4">
          <h4 className="text-base font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
            {question}
          </h4>
          <svg
            className={`w-5 h-5 text-neutral-text-tertiary flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className={`pb-4 ${icon ? "pl-14" : ""} animate-slide-down`}>
          <p className="text-sm text-neutral-text-secondary leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

