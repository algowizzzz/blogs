import React from "react";

type CalloutType = "tip" | "note" | "example" | "warning" | "danger" | "success";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig: Record<
  CalloutType,
  { bg: string; border: string; iconColor: string; icon: React.ReactNode }
> = {
  tip: {
    bg: "bg-[#F0F7FF]",
    border: "border-[#3A7AFE]",
    iconColor: "text-[#3A7AFE]",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  note: {
    bg: "bg-[#F5F5FA]",
    border: "border-[#7D7D87]",
    iconColor: "text-[#7D7D87]",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  example: {
    bg: "bg-[#F7F2FF]",
    border: "border-[#6D5DFB]",
    iconColor: "text-[#6D5DFB]",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  warning: {
    bg: "bg-[#FFF8E8]",
    border: "border-[#FFB200]",
    iconColor: "text-[#FFB200]",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
  danger: {
    bg: "bg-[#FFF0F0]",
    border: "border-[#E5484D]",
    iconColor: "text-[#E5484D]",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
  success: {
    bg: "bg-[#E9FFF5]",
    border: "border-[#0DBA6A]",
    iconColor: "text-[#0DBA6A]",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
};

const defaultTitles: Record<CalloutType, string> = {
  tip: "Tip",
  note: "Note",
  example: "Example",
  warning: "Warning",
  danger: "Danger",
  success: "Success",
};

export default function Callout({
  type = "note",
  title,
  children,
  className = "",
}: CalloutProps) {
  const config = calloutConfig[type];
  const displayTitle = title || defaultTitles[type];

  return (
    <div
      className={`
        flex gap-3 p-4 rounded-lg border-l-4 my-6
        ${config.bg} ${config.border}
        ${className}
      `}
    >
      <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        {displayTitle && (
          <h4 className={`text-sm font-semibold mb-1 ${config.iconColor}`}>
            {displayTitle}
          </h4>
        )}
        <div className="text-sm text-neutral-text-primary leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

