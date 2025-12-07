"use client";

import { Sun, Moon, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  profile,
  navigation,
  blogPosts,
  platformLabels,
  highlightColors,
} from "@/content/data";

export default function BlogPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header - Matching main page */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-end">
          <div className="flex items-center gap-3 sm:gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors ${
                  item.href === "/blog"
                    ? "text-foreground font-medium"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-full hover:bg-background-secondary transition-colors"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 pt-16 sm:pt-20 pb-6 sm:pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title - Full Width Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
              Blog
            </h1>
            <p className="text-base sm:text-lg text-foreground-muted mt-1.5 sm:mt-2">
              Thoughts on{" "}
              <span className={highlightColors.green}>AI</span>
              {", "}
              <span className={highlightColors.blue}>software engineering</span>
              {", and "}
              <span className={highlightColors.orange}>building things</span>
            </p>
          </div>

          {sortedPosts.length > 0 ? (
            <div className="max-w-4xl">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 underline">
                Posts
              </h2>
              <div className="space-y-4 sm:space-y-5">
                {sortedPosts.map((post, index) => (
                  <a
                    key={index}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group p-3 sm:p-4 -mx-3 sm:-mx-4 rounded-lg hover:bg-background-secondary transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm sm:text-base group-hover:text-foreground transition-colors flex items-center gap-1.5 sm:gap-2">
                          <span className={highlightColors.purple}>{post.title}</span>
                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-foreground-muted" />
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground-muted mt-1 leading-relaxed">
                          {post.description}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-background-secondary text-foreground-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] sm:text-xs text-foreground-muted">
                          {formatDate(post.date)}
                        </span>
                        <p className="text-[10px] sm:text-xs mt-1">
                          <span className={highlightColors.blue}>
                            {platformLabels[post.platform]}
                          </span>
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl">
              <div className="py-12 sm:py-16">
                <p className="text-lg sm:text-xl text-foreground-muted mb-2">Coming Soon</p>
                <p className="text-xs sm:text-sm text-foreground-muted max-w-md">
                  I&apos;m working on some articles about AI, software engineering, and
                  my experiences. Check back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
