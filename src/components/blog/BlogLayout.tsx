import { ReactNode } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { BlogFrontmatter, formatBlogDate, TocItem } from "@/lib/blog";
import { BlogToc } from "./BlogToc";

interface BlogLayoutProps {
  frontmatter: BlogFrontmatter;
  children: ReactNode;
  toc?: TocItem[];
}

const PLATFORM_LABELS: Record<string, string> = {
  substack: "Substack",
  medium: "Medium",
  x: "X",
  dev: "Dev.to",
  hashnode: "Hashnode",
  linkedin: "LinkedIn",
  notion: "Notion",
};

export function BlogLayout({ frontmatter, children, toc = [] }: BlogLayoutProps) {
  const {
    title,
    date,
    readingTime,
    author,
    tags,
    coverImage,
    coverCaption,
    substackUrl,
    externalUrls,
  } = frontmatter;

  // Collect all external platform links
  const platformLinks: { label: string; url: string }[] = [];
  if (substackUrl) platformLinks.push({ label: "Substack", url: substackUrl });
  if (externalUrls) {
    externalUrls.forEach(({ platform, url }) => {
      platformLinks.push({ label: PLATFORM_LABELS[platform] ?? platform, url });
    });
  }

  return (
    <div className="blog-shell">
      {/* Table of contents — sticky left rail on desktop, collapsible on mobile */}
      <BlogToc toc={toc} />

      <article className="blog-article">
      {/* Tags at the very top */}
      {tags && tags.length > 0 && (
        <div className="blog-tags">
          {tags.map((tag) => (
            <span key={tag} className="blog-tag-pill">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Post header */}
      <header className="blog-header">
        <h1>{title}</h1>

        {/* Meta row: author · date · reading time */}
        <div className="blog-meta">
          {author && <span>{author}</span>}
          {author && date && <span className="meta-sep">·</span>}
          {date && <span>{formatBlogDate(date)}</span>}
          {readingTime && (
            <>
              <span className="meta-sep">·</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </div>

        {/* Also on: external platform links */}
        {platformLinks.length > 0 && (
          <div className="blog-external-links">
            <span className="also-on-label">Also on</span>
            {platformLinks.map(({ label, url }) => (
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
      </header>

      {/* Dotted separator before prose */}
      <div className="blog-dotted-separator" />

      {/* Optional cover image */}
      {coverImage && (
        <figure className="blog-cover">
          <Image
            src={coverImage}
            alt={title}
            width={1200}
            height={800}
            priority
            style={{ width: "100%", height: "auto" }}
          />
          {coverCaption && (
            <figcaption>
              <strong>Figure 1.</strong> {coverCaption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Main prose content */}
      <div className="blog-prose">{children}</div>
      </article>
    </div>
  );
}

export default BlogLayout;
