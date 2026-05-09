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

  resume: "/Aakash_Resume.pdf",

  social: {
    github: "https://github.com/mallikaakash",
    linkedin: "https://linkedin.com/in/aakash-mallik-82b99423b/",
    substack: "https://aakashmallik1.substack.com/",
    medium: "https://medium.com/@aakashmallik7777",
    x: "https://x.com/malliktwts",
    scholar: "https://scholar.google.com/citations?user=b1ZPeEcAAAAJ&hl=en",
  },

  // Short bio for the homepage - use {highlight} syntax for colored spans
  bio: [
    "{Generalist|orange}{Software Engineer|blue} & {Researcher|green}. Currently at {Wells Fargo|blue}, working on Debt Capital Market platforms. I explore Agentic AI systems and implement them in my free time.",
    " {From research to real systems|orange} - That's my engineering way. I love to understand the underlying fundamental principles and building from bottom up. I also aim to be a {Full Stack Engineer|green} - {NO HOLD UP!!!|pink} not the MERN stack kinda guy but rather someone who understands the entire AI stack from  chip architecture to GPU programming right from distributed training of LLMs upto there distributed deployment and efficient inference (including on edge devices). This is the {Goal|pink} I try to work towards daily trying to be a bit better everyday.",
    "Previously shipped {RAG pipelines|purple} at NeoSapien, built speech-to-text infrastructure at OnTheRecord, and won {SUI Overflow 2025|pink}.",
    "Love exploring different stuff. {Philosophy|purple}, {Literature|orange}, {Anime|pink}, {Webtoons|green} and {Gym|yellow} take up a major chunk of my time too.",
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
    degree: "B.Tech EEE, Minor in CSE",
    score: "8.07 CGPA",
    period: "2021-25",
  },
  {
    institution: "National Public School, Rajajinagar",
    degree: "CBSE Class XII",
    score: "97.6%",
    period: "2019-21",
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
    period: "Aug 2025 - Present",
    color: "blue",
    description:
      "Working on the {New Issuance Trading platform|blue} with {ReactJs and Redux|green}, supporting all Debt Capital Market transactions across production releases. Also building {agentic workflows and MCPs|purple} to improve business-context awareness in coding assistants; developed an AI-assisted PR review system cutting review time by {30%|orange}. Owning migration from WAF & Selenium to {Playwright|blue}.",
  },
  {
    company: "Attenomics Lab",
    role: "ML Engineer (Contract)",
    period: "Apr 2025 - Jun 2025",
    color: "green",
    description:
      "Developed a {DistilBERT model with triplet loss|green} pipeline to semantically score high-volume scraped Tweets — improved performance by {~10%|green} over baseline and cut operational cost by {~$200/month|orange}. Built a {hybrid RAG system|purple} with multi-tiered retrieval for a Reasoning Brand Marketing & Insights chatbot.",
  },
  {
    company: "NeoSapien",
    role: "ML Developer Intern",
    period: "Aug 2024 - Mar 2025",
    color: "purple",
    description:
      "Implemented the {Second Brain pipeline|purple} using RAG, Self-discover, and Chain-of-Thought paradigms — evaluated prompting, chunking, and embedding strategies for the QA Chatbot. Deployed retrieval and storage back-end systems with {Firestore & Qdrant|blue}, reducing pipeline response latency by {46.5%|orange}.",
  },
  {
    company: "OnTheRecord Technology",
    role: "ML Engineer (Contract)",
    period: "Nov 2024 - Jan 2025",
    color: "orange",
    description:
      "Worked on {BlueCat|orange}, a desktop application for legal proceedings transcription in courts. As a founding engineer, built {speech-to-text model|green} infrastructure and coded key frontend components.",
  },
  {
    company: "Wells Fargo",
    role: "SDE Intern",
    period: "May 2024 - Jul 2024",
    color: "yellow",
    description:
      "Led a 3-member team in the {Process Transformation|yellow} group, delivering {RPA solutions|yellow} to replace manual workflows. Built a full-stack {skill-based task matching|green} platform serving ~1200 employees, reducing task allotment time by {~98%|pink}.",
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
    title: "IEEE IGARSS 2025",
    description: "Accepted paper for IEEE IGARSS 2025. One of the few Btech students to receive a fully funded travel grant and registration fee waiver to attend the conference.",
    color: "orange",
  },
  {
    title: "KUKUFM National Project K hackathon 2025",
    description: "First Runner Up at KukuFm National Project K hackathon (150+ teams)",
    color: "purple",
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
    name: "WalGraph",
    description:
      "Built a scalable decentralized graph database using SUI blockchain and Walrus protocol for decentralized storage. Implemented Cypher-like query engine and an interactive D3.js interface for visualization, querying, and analytics.",
    tech: ["Next.js", "Typescript", "SUI Blockchain", "Walrus", "Move"],
    github: "https://github.com/violinadoley/WalGraph",
    period: "Mar 2025",
    color: "purple",
    achievement: "First Runner Up in the Programmable Storage track at SUI Overflow 2025 out of 600+ teams",
  },
  {
    name: "KathaAI",
    description:
      "Developed an iterative context solution to increase context length and preserve intent for writing long-form novels based on author specifications.",
    tech: ["Next.js", "React", "MapBox", "Gemini", "SarvamAI"],
    github: "https://github.com/mallikaakash/Katha.Ai",
    period: "Mar 2025",
    color: "purple",
    achievement: "First Runner Up at KukuFm National Project K hackathon (150+ teams)",
  },
  {
    name: "Smart Ride Matching with Demand Prediction",
    description:
      "Built a novel solution to improve driver-customer matching and reduce cancellations with a dynamic pricing system @The Great Bangalore Hackathon 2025 . Deployed a masked autoencoder model to predict customer requests and proactively guide drivers to hotspots.",
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

export type BlogPlatform = "medium" | "linkedin" | "notion" | "personal" | "dev" | "hashnode" | "x" | "substack";

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

// Platform display names
export const platformLabels: Record<BlogPlatform, string> = {
  medium: "Medium",
  linkedin: "LinkedIn",
  notion: "Notion",
  personal: "Blog",
  dev: "Dev.to",
  hashnode: "Hashnode",
  x: "X",
  substack: "Substack",
};

// =============================================================================
// NAVIGATION
// =============================================================================

export const navigation = [
  { name: "About", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Writings", href: "/blog" },
];

