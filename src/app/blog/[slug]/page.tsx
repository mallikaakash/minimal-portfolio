import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";
import { ArrowLeft, Sun, Moon } from "lucide-react";

import { getAllBlogSlugs, getBlogPost, calculateReadingTime } from "@/lib/blog";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { Sidenote } from "@/components/blog/Sidenote";
import { Hl, Highlight } from "@/components/blog/Highlight";
import { Figure } from "@/components/blog/Figure";
import { navigation } from "@/content/data";
import { ThemeToggle } from "./theme-toggle";

// MDX Components available in blog posts
const mdxComponents = {
  Sidenote,
  Hl,
  Highlight,
  Figure,
  // Override default elements for better styling
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined} {...props}>
      {children}
    </a>
  ),
};

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

// Rehype Pretty Code options
const rehypePrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: "plaintext",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Calculate reading time if not provided
  const readingTime =
    post.frontmatter.readingTime || calculateReadingTime(post.content);

  const frontmatter = {
    ...post.frontmatter,
    readingTime,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          {/* Back to writings */}
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Writings</span>
          </Link>

          {/* Navigation */}
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
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16 overflow-visible">
        <BlogLayout frontmatter={frontmatter}>
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                format: "mdx",
                rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
              },
            }}
          />
        </BlogLayout>
      </main>

      {/* Footer */}
      <footer className="border-t border-glass-border py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link
            href="/blog"
            className="text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            ← Back to all writings
          </Link>
        </div>
      </footer>
    </div>
  );
}
