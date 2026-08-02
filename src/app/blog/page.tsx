"use client";

import { Sun, Moon, ExternalLink, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

import {
  navigation,
  blogPosts,
  highlightColors,
  profile,
  BlogPlatform,
} from "@/content/data";

interface InternalPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    readingTime?: number;
    tags?: string[];
    substackUrl?: string;
    externalUrls?: { platform: string; url: string }[];
  };
}

type UnifiedPost =
  | {
      kind: "internal";
      slug: string;
      title: string;
      description: string;
      date: string;
      readingTime?: number;
      tags?: string[];
      substackUrl?: string;
      externalUrls?: { platform: string; url: string }[];
    }
  | {
      kind: "external";
      url: string;
      title: string;
      description: string;
      date: string;
      platform: BlogPlatform;
      tags?: string[];
    };

// Color class per platform for the badge
const PLATFORM_COLORS: Record<string, string> = {
  substack: highlightColors.orange,
  medium: highlightColors.green,
  x: highlightColors.blue,
  dev: highlightColors.purple,
  hashnode: highlightColors.purple,
  linkedin: highlightColors.blue,
  notion: highlightColors.yellow,
  personal: "",
};

const PLATFORM_LABELS: Record<string, string> = {
  substack: "Substack",
  medium: "Medium",
  x: "X",
  dev: "Dev.to",
  hashnode: "Hashnode",
  linkedin: "LinkedIn",
  notion: "Notion",
  personal: "Blog",
};

// Social writing platforms to show in the "Find me on" row
const socialLinks = [
  { label: "Substack", url: profile.social.substack },
  { label: "Medium", url: profile.social.medium },
  // { label: "X", url: profile.social.x },
].filter((s): s is { label: string; url: string } => Boolean(s.url));

export default function BlogPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [internalPosts, setInternalPosts] = useState<InternalPost[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setInternalPosts(data.posts || []))
      .catch(() => setInternalPosts([]));
  }, []);

  // All unique tags across all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    internalPosts.forEach((p) => p.frontmatter.tags?.forEach((t) => tagSet.add(t)));
    blogPosts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [internalPosts]);

  // Filtered internal posts
  const filteredInternal = useMemo(() => {
    if (selectedTags.length === 0) return internalPosts;
    return internalPosts.filter((p) =>
      selectedTags.some((t) => p.frontmatter.tags?.includes(t))
    );
  }, [internalPosts, selectedTags]);

  // Filtered external posts
  const filteredExternal = useMemo(() => {
    const sorted = [...blogPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (selectedTags.length === 0) return sorted;
    return sorted.filter((p) =>
      selectedTags.some((t) => p.tags?.includes(t))
    );
  }, [selectedTags]);

  // Single unified chronological list
  const allPosts = useMemo((): UnifiedPost[] => {
    const internal: UnifiedPost[] = filteredInternal.map((p) => ({
      kind: "internal",
      slug: p.slug,
      title: p.frontmatter.title,
      description: p.frontmatter.description,
      date: p.frontmatter.date,
      readingTime: p.frontmatter.readingTime,
      tags: p.frontmatter.tags,
      substackUrl: p.frontmatter.substackUrl,
      externalUrls: p.frontmatter.externalUrls,
    }));
    const external: UnifiedPost[] = filteredExternal.map((p) => ({
      kind: "external",
      url: p.url,
      title: p.title,
      description: p.description,
      date: p.date,
      platform: p.platform,
      tags: p.tags,
    }));
    return [...internal, ...external].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [filteredInternal, filteredExternal]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-end">
          <div className="flex items-center gap-3 sm:gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link text-sm transition-colors ${
                  item.href === "/blog"
                    ? "text-foreground font-medium active"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="theme-toggle p-1.5 rounded-full hover:bg-background-secondary transition-colors"
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

      <main className="flex-1 px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-14">
        <div className="max-w-3xl mx-auto">

          {/* Page title */}
          <div className="mb-5 sm:mb-7">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Writings
            </h1>
            <p className="text-sm sm:text-base text-foreground-muted mt-1.5 leading-relaxed">
              On{" "}
              <span className={highlightColors.green}>ML &amp; AI</span>
              {", "}
              <span className={highlightColors.blue}>engineering</span>
              {", "}
              <span className={highlightColors.purple}>agentic systems</span>
              {" and "}
              <span className={highlightColors.orange}>random thoughts</span>
            </p>
          </div>

          {/* Find me on: platform links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-6 sm:mb-8">
              <span className="text-[0.6375rem] font-sans text-foreground-muted uppercase tracking-widest">
                Find me on
              </span>
              {socialLinks.map(({ label, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-platform-link"
                >
                  {label}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ))}
            </div>
          )}

          {/* Tag filter pills */}
          {allTags.length > 0 && (
            <div className="mb-7 sm:mb-9">
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-[0.6875rem] sm:text-xs px-3 py-1.5 rounded-full border font-sans tracking-wide transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-foreground text-background border-foreground shadow-sm"
                        : "bg-transparent text-foreground-muted border-border hover:border-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-[0.6875rem] sm:text-xs px-2 py-1.5 text-foreground-muted hover:text-foreground transition-colors underline font-sans"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Unified post list */}
          {allPosts.length > 0 ? (
            <div>
              {allPosts.map((post, i) => {
                const isLast = i === allPosts.length - 1;

                if (post.kind === "internal") {
                  // Collect cross-post labels for internal posts
                  const crossPosts: string[] = [];
                  if (post.substackUrl) crossPosts.push("Substack");
                  post.externalUrls?.forEach(({ platform }) => {
                    crossPosts.push(PLATFORM_LABELS[platform] ?? platform);
                  });

                  return (
                    <div key={post.slug}>
                      <div className="py-5 sm:py-6 group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <Link href={`/blog/${post.slug}`}>
                              <h2 className="text-base sm:text-lg font-semibold leading-snug group-hover:text-foreground transition-colors flex items-center gap-1.5 flex-wrap">
                                {post.title}
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                              </h2>
                            </Link>
                            <p className="text-sm text-foreground-muted mt-1 leading-relaxed">
                              {post.description}
                            </p>
                            {/* Tags + cross-post badges */}
                            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                              {post.tags?.map((tag) => (
                                <button
                                  key={tag}
                                  onClick={() => toggleTag(tag)}
                                  className="text-[0.625rem] px-2 py-0.5 rounded-full border border-border text-foreground-muted font-sans tracking-wide hover:border-foreground-muted transition-colors"
                                >
                                  {tag}
                                </button>
                              ))}
                              {crossPosts.map((label) => (
                                <span
                                  key={label}
                                  className={`text-[0.625rem] px-2 py-0.5 rounded-full font-sans tracking-wide ${PLATFORM_COLORS["substack"] || ""}`}
                                >
                                  {label}
                                </span>
                              ))}
                            </div>
                          </div>
                          {/* Date + reading time */}
                          <div className="text-right shrink-0 pt-0.5">
                            <span className="text-xs text-foreground-muted font-sans">
                              {formatDate(post.date)}
                            </span>
                            {post.readingTime && (
                              <p className="text-[0.6875rem] text-foreground-muted mt-0.5 font-sans">
                                {post.readingTime} min
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {!isLast && (
                        <div className="border-b border-dashed border-border" />
                      )}
                    </div>
                  );
                }

                // External post
                const badgeColor = PLATFORM_COLORS[post.platform] || "";

                return (
                  <div key={post.url}>
                    <div className="py-5 sm:py-6 group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h2 className="text-base sm:text-lg font-semibold leading-snug group-hover:text-foreground transition-colors flex items-center gap-1.5 flex-wrap">
                              {post.title}
                              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                            </h2>
                          </a>
                          <p className="text-sm text-foreground-body mt-1 leading-relaxed">
                            {post.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                            {post.tags?.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className="text-[0.625rem] px-2 py-0.5 rounded-full border border-border text-foreground-muted font-sans tracking-wide hover:border-foreground-muted transition-colors"
                              >
                                {tag}
                              </button>
                            ))}
                            {/* Platform badge */}
                            <span
                              className={`text-[0.625rem] px-2 py-0.5 rounded-full font-sans tracking-wide ${badgeColor}`}
                            >
                              {PLATFORM_LABELS[post.platform] ?? post.platform}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 pt-0.5">
                          <span className="text-xs text-foreground-muted font-sans">
                            {formatDate(post.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {!isLast && (
                      <div className="border-b border-dashed border-border" />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-14">
              {selectedTags.length > 0 ? (
                <>
                  <p className="text-base text-foreground-muted mb-1">
                    No posts match those tags.
                  </p>
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-sm text-foreground-muted underline"
                  >
                    Clear filters
                  </button>
                </>
              ) : (
                <p className="text-base text-foreground-muted">
                  Posts coming soon.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
