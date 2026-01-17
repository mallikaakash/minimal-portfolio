"use client";

import { Sun, Moon, ExternalLink, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

import {
  navigation,
  blogPosts,
  platformLabels,
  highlightColors,
  profile,
} from "@/content/data";

// Type for internal blog posts (fetched from API)
interface InternalPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    readingTime?: number;
    tags?: string[];
    substackUrl?: string;
  };
}

export default function BlogPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [internalPosts, setInternalPosts] = useState<InternalPost[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    // Fetch internal posts
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setInternalPosts(data.posts || []))
      .catch(() => setInternalPosts([]));
  }, []);

  // Collect all unique tags from both internal and external posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    internalPosts.forEach((post) => {
      post.frontmatter.tags?.forEach((tag) => tagSet.add(tag));
    });
    blogPosts.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [internalPosts]);

  // Filter posts based on selected tags
  const filteredInternalPosts = useMemo(() => {
    if (selectedTags.length === 0) return internalPosts;
    return internalPosts.filter((post) =>
      selectedTags.some((tag) => post.frontmatter.tags?.includes(tag))
    );
  }, [internalPosts, selectedTags]);

  const filteredExternalPosts = useMemo(() => {
    const sorted = [...blogPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (selectedTags.length === 0) return sorted;
    return sorted.filter((post) =>
      selectedTags.some((tag) => post.tags?.includes(tag))
    );
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

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
          <div className="mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
              Writings
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

          {/* Tag Filter Pills */}
          {allTags.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground-muted border-border hover:border-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-foreground-muted hover:text-foreground transition-colors underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Substack Subscribe Card */}
          <div className="mb-8 sm:mb-10 p-4 sm:p-5 rounded-xl bg-background-secondary border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border">
                <span className="text-lg sm:text-xl font-serif italic text-foreground">AM</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm sm:text-base mb-1">
                  Subscribe to <span className={highlightColors.green}>Substack NewsLetter</span> ✨
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed mb-3">
                  Deep dives into ML research. AI Systems and everything in between.
                </p>
                <a
                  href={profile.social.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium ${highlightColors.green} px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity`}
                >
                  Subscribe to Newsletter
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-4xl space-y-8 sm:space-y-10">
            {/* Internal Posts Section */}
            {filteredInternalPosts.length > 0 && (
              <section>
                <div className="space-y-4 sm:space-y-5">
                  {filteredInternalPosts.map((post) => (
                    <div
                      key={post.slug}
                      className="group p-3 sm:p-4 -mx-3 sm:-mx-4 rounded-lg hover:bg-background-secondary transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="flex-1">
                          <Link href={`/blog/${post.slug}`}>
                            <h3 className="font-medium text-sm sm:text-base group-hover:text-foreground transition-colors flex items-center gap-1.5 sm:gap-2">
                              <span className={highlightColors.purple}>{post.frontmatter.title}</span>
                              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-foreground-muted" />
                            </h3>
                          </Link>
                          <p className="text-xs sm:text-sm text-foreground-muted mt-1 leading-relaxed">
                            {post.frontmatter.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2">
                            {post.frontmatter.tags && post.frontmatter.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-background-secondary text-foreground-muted"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.frontmatter.substackUrl && (
                              <a
                                href={post.frontmatter.substackUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded flex items-center gap-1 ${highlightColors.orange}`}
                              >
                                Substack
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] sm:text-xs text-foreground-muted">
                            {formatDate(post.frontmatter.date)}
                          </span>
                          {post.frontmatter.readingTime && (
                            <p className="text-[10px] sm:text-xs mt-1 text-foreground-muted">
                              {post.frontmatter.readingTime} min read
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* External Posts Section */}
            {filteredExternalPosts.length > 0 && (
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 underline">
                  External Posts
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  {filteredExternalPosts.map((post, index) => (
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
                            <span className={highlightColors.blue}>{post.title}</span>
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
                            <span className={highlightColors.orange}>
                              {platformLabels[post.platform]}
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {filteredInternalPosts.length === 0 && filteredExternalPosts.length === 0 && (
              <div className="py-12 sm:py-16">
                {selectedTags.length > 0 ? (
                  <>
                    <p className="text-lg sm:text-xl text-foreground-muted mb-2">No posts found</p>
                    <p className="text-xs sm:text-sm text-foreground-muted max-w-md">
                      No posts match the selected tags. Try clearing the filters.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-lg sm:text-xl text-foreground-muted mb-2">Coming Soon</p>
                    <p className="text-xs sm:text-sm text-foreground-muted max-w-md">
                      I&apos;m working on some articles about AI, software engineering, and
                      my experiences. Check back soon!
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
