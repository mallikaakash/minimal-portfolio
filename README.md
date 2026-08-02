# Minimal Portfolio

A clean, minimal developer portfolio built with **Next.js 16**, **Tailwind CSS 4**, and **TypeScript**. Designed to be fast, readable, and easy to customize — all content lives in a single file.

**[Live demo →](https://aakashmallik.dev)**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## Features

- **Single source of truth** — all content (bio, experience, projects, blog links) lives in `src/content/data.ts`
- **Light / dark theme** — system preference aware, toggle built in
- **Highlight syntax** — colorize any word or phrase inline using `{text|color}`
- **Blog system** — write posts as `.mdx` files locally *or* aggregate links from Medium, Substack, LinkedIn, etc.
- **MDX support** — custom components (Sidenote, Figure, Highlight) for rich writing
- **Zero-config analytics** — optional Umami integration, privacy-focused
- **Fully static** — builds to static HTML, deploys anywhere

---

## Pages

| Route | Description |
|---|---|
| `/` | About — bio, education, experience |
| `/work` | Projects and achievements |
| `/blog` | Blog listing — local MDX posts + external platform links |
| `/blog/[slug]` | Individual blog post reader |

---

## Quick Start

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/your-username/minimal-portfolio.git
cd minimal-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Customization

Everything you need to change is in **`src/content/data.ts`**. You don't need to touch any other file to make it your own.

### 1. Profile

```ts
export const profile = {
  name: "Your Name",
  title: "Software Engineer",
  subtitle: "AI Researcher",
  email: "you@example.com",
  location: "San Francisco, CA",

  resume: "/Your_Resume.pdf",   // place your PDF in /public

  social: {
    github: "https://github.com/you",
    linkedin: "https://linkedin.com/in/you",
    x: "https://x.com/you",
    substack: "https://you.substack.com",
    medium: "https://medium.com/@you",
    scholar: "",  // leave empty to hide
  },

  about: {
    lead: "A punchy one-line intro — supports {highlight syntax|blue}.",
    points: [
      "A scannable bullet about what you do.",
      "Another bullet — {highlights|orange} work here too.",
    ],
  },
};
```

The homepage renders `about.lead` as an intro line, then `about.points` as bullets.

Place your resume PDF in the `/public` folder and set `resume` to `"/YourFile.pdf"`.

### 2. Highlight Syntax

Use `{text|color}` anywhere in bio, experience descriptions, or project descriptions to add colored emphasis:

```ts
"I build {intelligent systems|orange} at {Acme Corp|blue}."
```

Available colors: `blue` `green` `orange` `purple` `pink` `yellow`

### 3. Education

```ts
export const education: EducationItem[] = [
  {
    institution: "MIT",
    degree: "B.S. Computer Science",
    score: "3.9 GPA",
    period: "2020–24",
  },
];
```

### 4. Experience

```ts
export const experience: ExperienceItem[] = [
  {
    company: "Acme Corp",
    role: "Software Engineer",
    period: "Jan 2024 – Present",
    color: "blue",       // accent color for this entry
    description: "A short lead line for the role.",   // rendered first
    points: [            // rendered as bullets below the lead
      "Built {distributed systems|blue} serving 10M+ users.",
      "Reduced latency by {40%|orange}.",
    ],
  },
];
```

### 5. Projects

```ts
export const projects: ProjectItem[] = [
  {
    name: "My Project",
    description: "What it does and how you built it.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com/you/project",
    period: "Mar 2024",
    color: "purple",
    achievement: "Won Hackathon X",   // optional
  },
];
```

### 6. Achievements

```ts
export const highlights: HighlightItem[] = [
  {
    title: "Hackathon Win",
    description: "First place at XYZ hackathon out of 200 teams.",
    color: "green",
  },
];
```

### 7. Publications

```ts
export const publications: PublicationItem[] = [
  {
    title: "Your Paper Title",
    venue: "NeurIPS 2024",
    year: "2024",
    link: "https://arxiv.org/abs/...",
    color: "blue",
  },
];
```

---

## Blog

The blog supports two modes that work independently or together.

### Local MDX posts

Create `.mdx` (or `.md`) files in `src/content/blogs/`. Each file needs a frontmatter block at the top:

```mdx
---
title: "My Post Title"
date: "2024-12-01"
description: "A short summary shown in the listing."
tags: ["AI", "Engineering"]
draft: false
---

Your post content goes here. You can use **Markdown** and MDX components.
```

**Optional frontmatter fields:**

| Field | Type | Description |
|---|---|---|
| `readingTime` | number | Override auto-calculated reading time (minutes) |
| `author` | string | Author name (defaults to your profile name) |
| `headerImage` | string | Small illustration shown at the top of the post |
| `coverImage` | string | Full-width cover image |
| `coverCaption` | string | Caption for the cover image |
| `draft` | boolean | `true` hides post in production |
| `substackUrl` | string | Link to cross-posted Substack version |
| `externalUrls` | array | Cross-post links: `[{ platform: "medium", url: "..." }]` |

**Available MDX components** inside posts:

```mdx
import { Sidenote, Figure, Highlight } from "@/components/blog";

<Sidenote>This is a margin note.</Sidenote>

<Figure src="/images/chart.png" caption="Figure 1: something" />

<Highlight color="blue">Callout text here</Highlight>
```

### Publish from a GitHub issue (no local setup)

For a fast, low-friction path — publish straight from a GitHub issue, even on mobile.

1. Open a new issue and pick the **"📝 New blog post"** template.
2. Fill in title, description, tags, and the post body (Markdown/MDX). Optionally add cross-post links and a draft flag.
3. Submit. The **`Blog from issue`** GitHub Action ([`.github/workflows/blog-from-issue.yml`](.github/workflows/blog-from-issue.yml)) parses the issue, generates `src/content/blogs/<slug>.mdx`, commits it to `main`, then comments and closes the issue.
4. Your host (Vercel etc.) redeploys on the new commit — the post goes live.

Notes:
- Only the **repo owner** can trigger publishing (the workflow checks `issue.user == repository_owner`), so random issues can't create posts.
- The slug and date are derived automatically (date = day of publish). Editing the issue re-generates the file.
- Drafts are created but hidden from the live site until you flip Draft to "No".
- Needs a repo where the Action can push to `main` (no branch protection blocking it). The generator lives at [`scripts/blog-from-issue.mjs`](scripts/blog-from-issue.mjs).

### External blog links

Aggregate posts from external platforms without writing locally:

```ts
export const blogPosts: BlogPost[] = [
  {
    title: "My Article on Medium",
    description: "A short description.",
    url: "https://medium.com/@you/...",
    platform: "medium",
    date: "2024-12-01",
    tags: ["AI", "RAG"],
  },
];
```

Supported platforms: `medium` `substack` `linkedin` `dev` `hashnode` `notion` `x` `personal`

---

## Metadata & SEO

Update the page metadata in `src/app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: "Your Name | Software Engineer",
  description: "Your short bio for search engines.",
  keywords: ["Your Name", "Software Engineer", "..."],
  authors: [{ name: "Your Name" }],
};
```

---

## Analytics (Optional)

Uses [Umami](https://umami.is) — open-source, privacy-focused, no cookies.

1. Deploy Umami for free: [umami.is/docs/getting-started](https://umami.is/docs/getting-started)
2. Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
NEXT_PUBLIC_UMAMI_URL=https://your-umami-instance.vercel.app/script.js
```

If these variables are not set, analytics are silently disabled — no errors, no tracking.

---

## Project Structure

```
minimal-portfolio/
├── public/
│   └── YourResume.pdf          # Drop your resume here
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, fonts, metadata
│   │   ├── page.tsx             # Homepage (About)
│   │   ├── work/
│   │   │   └── page.tsx         # Work & projects page
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Individual post reader
│   │   └── api/blog/
│   │       └── route.ts         # API route for blog data
│   ├── components/
│   │   └── blog/
│   │       ├── BlogLayout.tsx   # Post page layout
│   │       ├── Figure.tsx       # Image + caption component
│   │       ├── Highlight.tsx    # Colored callout component
│   │       └── Sidenote.tsx     # Margin note component
│   ├── content/
│   │   ├── data.ts              # ← All your content goes here
│   │   └── blogs/              # ← Your .mdx posts go here
│   └── lib/
│       ├── blog.ts              # Blog file reading utilities
│       ├── theme.tsx            # Light/dark theme provider
│       └── utils.tsx            # Highlight syntax parser
├── next.config.ts
└── tsconfig.json
```

---

## Deployment

**Build for production:**

```bash
npm run build
npm run start
```

**Deploy to Vercel (recommended):**

1. Push your fork to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables if using analytics
4. Deploy — done

Works with any Node.js host (Railway, Render, Fly.io) or as a static export.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 16 | Framework, routing, SSG |
| React | 19 | UI |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| next-mdx-remote | 6 | MDX rendering |
| rehype-pretty-code | 0.14 | Syntax highlighting in posts |
| shiki | 3 | Code theme engine |
| gray-matter | 4 | Frontmatter parsing |
| next-themes | 0.4 | Dark mode |
| Geist + Newsreader | — | Fonts |

---

## License

MIT — use it, fork it, make it yours.

If you build something with this, I'd love to see it.
