import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Path to blog content directory
const BLOGS_DIR = path.join(process.cwd(), "src/content/blogs");

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  readingTime?: number;
  tags?: string[];
  author?: string;
  headerImage?: string; // Cute sticker/illustration at top
  coverImage?: string;
  coverCaption?: string;
  draft?: boolean;
  substackUrl?: string; // Link to the post on Substack
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  frontmatter: BlogFrontmatter;
}

/**
 * Get all blog post slugs for static generation
 */
export function getAllBlogSlugs(): string[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(BLOGS_DIR)) {
    fs.mkdirSync(BLOGS_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(BLOGS_DIR);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  const mdxPath = path.join(BLOGS_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOGS_DIR, `${slug}.md`);

  let filePath: string;
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
  };
}

/**
 * Get all blog posts metadata (for listing)
 */
export function getAllBlogPosts(): BlogPostMeta[] {
  const slugs = getAllBlogSlugs();

  const posts = slugs
    .map((slug) => {
      const post = getBlogPost(slug);
      if (!post) return null;

      // Skip drafts in production
      if (post.frontmatter.draft && process.env.NODE_ENV === "production") {
        return null;
      }

      return {
        slug: post.slug,
        frontmatter: post.frontmatter,
      };
    })
    .filter((post): post is BlogPostMeta => post !== null);

  // Sort by date (newest first)
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Calculate reading time from content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Format date for display
 */
export function formatBlogDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).toUpperCase().replace(",", "");
}
