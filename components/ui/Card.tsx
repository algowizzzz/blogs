import React from "react";
import Link from "next/link";
import Image from "next/image";

// Base Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  flat?: boolean;
}

export function Card({ children, className = "", hover = true, flat = false }: CardProps) {
  return (
    <div
      className={`
        ${flat ? "bg-surface-100 border-none" : "bg-white border border-neutral-border"}
        rounded-xl p-6
        ${hover ? "transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Post Card Component
interface PostCardProps {
  title: string;
  excerpt?: string;
  slug: string;
  publishedAt?: string;
  featureImage?: string;
  tags?: Array<{ name: string; slug: string }>;
}

export function PostCard({
  title,
  excerpt,
  slug,
  publishedAt,
  featureImage,
  tags,
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="bg-white border border-neutral-border rounded-xl overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1">
        {featureImage && (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={featureImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag.slug}
                  className="px-2.5 py-0.5 text-xs font-medium text-primary-700 bg-primary-100 rounded-full"
                >
                  {tag.name.replace("category:", "")}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-lg font-semibold text-primary-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm text-neutral-text-secondary line-clamp-2 mb-3">
              {excerpt}
            </p>
          )}
          {publishedAt && (
            <time className="text-xs text-neutral-text-tertiary">
              {new Date(publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </article>
    </Link>
  );
}

// Category Card Component
interface CategoryCardProps {
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
}

export function CategoryCard({ name, slug, description, postCount }: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} className="group block">
      <div className="bg-white border border-neutral-border rounded-xl p-6 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary-300">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
          {postCount !== undefined && (
            <span className="text-xs text-neutral-text-tertiary">
              {postCount} {postCount === 1 ? "post" : "posts"}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-neutral-text-secondary line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

// Course Card Component
interface CourseCardProps {
  title: string;
  subtitle: string;
  href: string;
  badge?: string;
  featured?: boolean;
}

export function CourseCard({ title, subtitle, href, badge, featured = false }: CourseCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div
        className={`
          rounded-xl p-6 transition-all duration-200 hover:-translate-y-1
          ${
            featured
              ? "bg-gradient-to-br from-primary-700 to-primary-500 text-white shadow-button hover:shadow-lg"
              : "bg-white border border-neutral-border hover:shadow-card-hover hover:border-primary-300"
          }
        `}
      >
        {badge && (
          <span
            className={`
              inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full
              ${featured ? "bg-accent text-primary-900" : "bg-primary-100 text-primary-700"}
            `}
          >
            {badge}
          </span>
        )}
        <h3
          className={`
            text-lg font-semibold mb-2
            ${featured ? "text-white" : "text-primary-900 group-hover:text-primary-700"}
            transition-colors
          `}
        >
          {title}
        </h3>
        <p
          className={`
            text-sm mb-4
            ${featured ? "text-white/80" : "text-neutral-text-secondary"}
          `}
        >
          {subtitle}
        </p>
        <div
          className={`
            inline-flex items-center gap-1 text-sm font-medium
            ${featured ? "text-white" : "text-primary-500 group-hover:text-primary-700"}
            transition-colors
          `}
        >
          View Course
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
        </div>
      </div>
    </a>
  );
}

