/**
 * Single Source of Truth
 * ----------------------
 * All editable content for the portfolio website.
 * Update this file to change any text, links, or styling across the site.
 */

// =============================================================================
// PROFILE - Basic information
// =============================================================================

export const profile = {
  name: "Aakash Mallik",
  title: "Software Developer",
  subtitle: "AI Engineer",
  email: "aakashmallik7777@gmail.com",
  location: "India",

  social: {
    github: "https://github.com/mallikaakash",
    linkedin: "https://linkedin.com/in/aakash-mallik-82b99423b/",
  },

  // Short bio for the homepage - use {highlight} syntax for colored spans
  bio: [
    "I build {intelligent systems|orange} at the intersection of AI and software engineering. Currently at {Wells Fargo|blue}, working on Debt Capital Market platforms.",
    "Previously shipped {RAG pipelines|purple} at NeoSapien (reduced latency by 46.5%), built speech-to-text infrastructure at OnTheRecord, and won {SUI Overflow 2025|pink} globally.",
  ],
};

// =============================================================================
// HIGHLIGHT COLORS - Map of color names to CSS classes
// =============================================================================

export const highlightColors = {
  blue: "highlight-blue",
  green: "highlight-green",
  orange: "highlight-orange",
  purple: "highlight-purple",
  pink: "highlight-pink",
  yellow: "highlight-yellow",
} as const;

export type HighlightColor = keyof typeof highlightColors;

// =============================================================================
// EDUCATION
// =============================================================================

export interface EducationItem {
  institution: string;
  degree: string;
  score: string;
  period: string;
}

export const education: EducationItem[] = [
  {
    institution: "NIT Karnataka, Surathkal",
    degree: "B.Tech EEE, Minor in CS",
    score: "8.07 CGPA",
    period: "2021–25",
  },
  {
    institution: "National Public School, Rajajinagar",
    degree: "CBSE Class XII",
    score: "97.6%",
    period: "2021",
  },
  {
    institution: "Presidency School, Nandini Layout",
    degree: "ICSE Class X",
    score: "98.88% · AIR 5",
    period: "2019",
  },
];

// =============================================================================
// EXPERIENCE - Full sentence descriptions with highlights
// =============================================================================

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  color: HighlightColor;
  // Use {text|color} syntax for inline highlights in description
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    company: "Wells Fargo",
    role: "Software Developer",
    period: "Aug 2025 →",
    color: "blue",
    description:
      "Working in the {Corporate Investment Banking|blue} team, building the Orderbook platform that supports Debt Capital Market deals. Primarily focusing on {ReactJs frontend|green} development and resolving high-priority security vulnerabilities.",
  },
  {
    company: "Attenomics Lab",
    role: "ML Engineer",
    period: "Apr–Jun 2025",
    color: "green",
    description:
      "Built a custom {Machine Learning pipeline|green} to semantically score periodically scraped Tweets. Developed a {hybrid RAG system|purple} with multi-tiered retrieval strategy for the online Chain of Thought reasoning chatbot.",
  },
  {
    company: "NeoSapien",
    role: "AI Developer",
    period: "Aug 2024–Mar 2025",
    color: "purple",
    description:
      "Implemented the {Second Brain pipeline|purple} using RAG, Self-discover, and Chain-of-Thought paradigms. Deployed retrieval and storage systems with {Firestore & Qdrant|blue}, reducing response latency by {46.5%|orange}.",
  },
  {
    company: "OnTheRecord Technology",
    role: "Founding Engineer",
    period: "Nov 2024–Jan 2025",
    color: "orange",
    description:
      "Worked on {BlueCat|orange}, a desktop application for legal proceedings transcription in courts. As a founding engineer, focused on {speech-to-text model|green} infrastructure and coding frontend components.",
  },
  {
    company: "Wells Fargo",
    role: "SDE Intern",
    period: "May–Jul 2024",
    color: "yellow",
    description:
      "Delivered {RPA solutions|yellow} for the Process Transformation team. Built a full-stack application for algorithmic skill-based task-employee matching, reducing task allotment time by {98.75%|pink}.",
  },
];

// =============================================================================
// HIGHLIGHTS & ACHIEVEMENTS - For the Work page
// =============================================================================

export interface HighlightItem {
  title: string;
  description: string;
  color: HighlightColor;
}

export const highlights: HighlightItem[] = [
  {
    title: "SUI Overflow 2025",
    description: "Global Runner Up in the Programmable Storage track. Built a decentralized Graph DB on Sui blockchain.",
    color: "pink",
  },
  {
    title: "0G Labs Grant Recipient (2x)",
    description: "Received grants worth approximately ₹60k to develop a Vector Database project.",
    color: "blue",
  },
  {
    title: "KVPY SX 2021",
    description: "All India Rank 1373 out of 0.6 Million candidates in the Kishore Vaigyanik Protsahan Yogna examination.",
    color: "green",
  },
  {
    title: "ICSE Class X 2019",
    description: "All India Rank 5 with 98.88% aggregate score in the Indian Council of Secondary Education examination.",
    color: "orange",
  },
  {
    title: "ASSET Aptitude Exam 2016",
    description: "Achieved All India Rank 1 in the national aptitude examination.",
    color: "purple",
  },
];

// =============================================================================
// PROJECTS - For the Work page
// =============================================================================

export interface ProjectItem {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  period: string;
  color: HighlightColor;
  achievement?: string;
}

export const projects: ProjectItem[] = [
  {
    name: "KathaAI",
    description:
      "Developed an iterative context solution to increase context length and preserve intent for writing long-form novels based on author specifications.",
    tech: ["Next.js", "React", "MapBox", "Gemini", "SarvamAI"],
    github: "https://github.com/mallikaakash/TGBH-StackedPitha",
    period: "Mar 2025",
    color: "purple",
    achievement: "First Runner Up at KukuFm National Project K hackathon (150+ teams)",
  },
  {
    name: "Great Bangalore Hackathon 2025",
    description:
      "Built a novel solution to improve driver-customer matching and reduce cancellations with a dynamic pricing system. Deployed a masked autoencoder model to predict customer requests and proactively guide drivers to hotspots.",
    tech: ["Next.js", "MapBox", "Gemini"],
    github: "https://github.com/mallikaakash/TGBH-StackedPitha",
    period: "Mar 2025",
    color: "green",
  },
];

// =============================================================================
// PUBLICATIONS
// =============================================================================

export interface PublicationItem {
  title: string;
  venue: string;
  year: string;
  link?: string;
  color: HighlightColor;
}

export const publications: PublicationItem[] = [
  {
    title: "QGAPHnet: QGA Based Hybrid QLSTM Model for Soil Moisture Estimation",
    venue: "IEEE IGARSS 2024, Athens",
    year: "2024",
    link: "https://ieeexplore.ieee.org/document/10641651",
    color: "blue",
  },
];

// =============================================================================
// BLOG POSTS - External links to posts on various platforms
// =============================================================================

export type BlogPlatform = "medium" | "linkedin" | "notion" | "personal" | "dev" | "hashnode";

export interface BlogPost {
  title: string;
  description: string;
  url: string;
  platform: BlogPlatform;
  date: string; // Format: "YYYY-MM-DD"
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  // Add your blog posts here
  // Example:
  // {
  //   title: "Building RAG Pipelines at Scale",
  //   description: "How we reduced latency by 46.5% using hybrid retrieval strategies",
  //   url: "https://medium.com/@aakashmallik/...",
  //   platform: "medium",
  //   date: "2024-12-01",
  //   tags: ["AI", "RAG", "Machine Learning"],
  // },
];

// Platform display names and icons
export const platformLabels: Record<BlogPlatform, string> = {
  medium: "Medium",
  linkedin: "LinkedIn",
  notion: "Notion",
  personal: "Blog",
  dev: "Dev.to",
  hashnode: "Hashnode",
};

// =============================================================================
// NAVIGATION
// =============================================================================

export const navigation = [
  { name: "About", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Blog", href: "/blog" },
];

