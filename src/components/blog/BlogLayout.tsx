import { ReactNode } from "react";
import Image from "next/image";
import { BlogFrontmatter, formatBlogDate } from "@/lib/blog";

interface BlogLayoutProps {
  frontmatter: BlogFrontmatter;
  children: ReactNode;
}

export function BlogLayout({ frontmatter, children }: BlogLayoutProps) {
  const { title, date, readingTime, author, headerImage, coverImage, coverCaption } = frontmatter;

  return (
    <article className="blog-article">
      {/* Header Sticker/Illustration (optional) */}
      {headerImage && (
        <div className="blog-header-sticker">
          <Image
            src={headerImage}
            alt=""
            width={200}
            height={200}
            priority
            style={{ justifyContent: "center", alignItems: "center", width: "auto", height: "auto", maxHeight: "200px" }}
          />
        </div>
      )}

      {/* Header */}
      <header className="blog-header justify-center align-center">
        <h1 className="text-center">{title}</h1>
      </header>

      {/* Cover Image (optional full-width image) */}
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

      {/* Content */}
      <div className="blog-prose">{children}</div>
    </article>
  );
}

export default BlogLayout;
