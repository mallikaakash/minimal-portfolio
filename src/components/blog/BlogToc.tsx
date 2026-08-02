"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog";

interface BlogTocProps {
  toc: TocItem[];
}

/**
 * Table of contents.
 * - Desktop (>= 1280px): fixed in the left margin, always visible while scrolling,
 *   with the current section highlighted (scroll-spy).
 * - Mobile / tablet: a collapsible "Contents" disclosure at the top of the post.
 */
export function BlogToc({ toc }: BlogTocProps) {
  const [activeSlug, setActiveSlug] = useState<string>(toc[0]?.slug ?? "");

  useEffect(() => {
    if (toc.length === 0) return;

    const headings = toc
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the topmost heading currently intersecting the reading band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <details className="blog-toc scrollbar-hide" open>
      <summary className="blog-toc-summary">Contents</summary>
      <nav className="blog-toc-nav" aria-label="Table of contents">
        <p className="blog-toc-title">On this page</p>
        <ul>
          {toc.map((item) => (
            <li
              key={item.slug}
              className={`blog-toc-item depth-${item.depth}${
                activeSlug === item.slug ? " active" : ""
              }`}
            >
              <a href={`#${item.slug}`} onClick={() => setActiveSlug(item.slug)}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}

export default BlogToc;
