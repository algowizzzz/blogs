import React from "react";

interface StatPointProps {
  value: string;
  label: string;
  gradient?: boolean;
  className?: string;
}

export default function StatPoint({
  value,
  label,
  gradient = true,
  className = "",
}: StatPointProps) {
  return (
    <div className={`text-center ${className}`}>
      <div
        className={`
          text-4xl md:text-5xl font-bold tracking-tight mb-2
          ${
            gradient
              ? "bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent"
              : "text-primary-900"
          }
        `}
      >
        {value}
      </div>
      <div className="text-sm md:text-base text-neutral-text-secondary font-medium">
        {label}
      </div>
    </div>
  );
}

// Stats Row Component for displaying multiple stats
interface StatsRowProps {
  stats: Array<{ value: string; label: string }>;
  gradient?: boolean;
  className?: string;
}

export function StatsRow({ stats, gradient = true, className = "" }: StatsRowProps) {
  return (
    <div
      className={`
        grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-8 md:py-12
        ${className}
      `}
    >
      {stats.map((stat, index) => (
        <StatPoint
          key={index}
          value={stat.value}
          label={stat.label}
          gradient={gradient}
        />
      ))}
    </div>
  );
}

