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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-tight">
            {profile.name}
          </Link>
          <div className="flex items-center gap-4">
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
      <main className="flex-1 px-6 pt-20 pb-12">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
            Blog
          </h1>
          <p className="text-foreground-muted mb-10">
            Thoughts on AI, software engineering, and building things.
          </p>

          {sortedPosts.length > 0 ? (
            <div className="space-y-6">
              {sortedPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group p-4 -mx-4 rounded-lg hover:bg-background-secondary transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="font-medium group-hover:text-accent transition-colors flex items-center gap-2">
                        {post.title}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h2>
                      <p className="text-sm text-foreground-muted mt-1 leading-relaxed">
                        {post.description}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded bg-background-secondary text-foreground-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-foreground-muted">
                        {formatDate(post.date)}
                      </span>
                      <p className="text-xs mt-1">
                        <span className={highlightColors.blue}>
                          {platformLabels[post.platform]}
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-foreground-muted mb-2">Coming Soon</p>
              <p className="text-sm text-foreground-muted max-w-md mx-auto">
                I&apos;m working on some articles about AI, software engineering, and
                my experiences. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-foreground-muted">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}

