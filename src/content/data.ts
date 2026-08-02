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
  title: "Generalist Engineer",
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

  // Short bio for the homepage.
  // `lead` is a punchy intro line; `points` render as scannable bullets.
  // Use {text|color} syntax anywhere for colored spans.
  about: {
    lead:
      "Currently at {Wells Fargo|blue} building Debt Capital Market platforms, and FAFO-ing {AI research stuff|purple} in my free time.",
    points: [
      "{From research to real systems|orange} — I like understanding the fundamentals and building bottom-up.",
      "Chasing the {full AI stack|green} end to end — {not the MERN kind|pink}, but chip architecture and GPU programming through distributed training and efficient inference, edge devices included. A bit better every day.",
      "Currently learning: {Agentic AI systems|purple},{LLM posttraining|blue} and {LLM serving infra|green}",
      "Previously: {Second Brain pipelines|purple} at NeoSapien, classical ML + speech-to-text infra, and won {SUI Overflow 2025|pink}.",
      "Off-screen: {Literature|orange}, {Anime|pink}, {Webtoons|green}, and (irregularly) at the {Gym|yellow}.",
      "Connect with me on {LinkedIn|blue} or {X|pink} or drop me an email at {aakashmallik7777@gmail.com|green}"
    ],
  },
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
  // `description` is a short lead line; `points` render as bullets below it.
  // Use {text|color} syntax for inline highlights in either.
  description: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Wells Fargo",
    role: "Software Developer",
    period: "Aug 2025 - Present",
    color: "blue",
    description:
      "Building the {New Issuance Trading platform|blue} with {React & Redux|green}, supporting Debt Capital Market transactions across production releases.",
    points: [
      "Building {agentic workflows & MCPs|purple} for business-context-aware coding assistants.",
      "Shipped an AI-assisted Github PR review system — cut review time by {30%|orange}.",
      "Owning the migration from WAF & Selenium testing automation to {Playwright|blue}.",
    ],
  },
  {
    company: "NeoSapien",
    role: "ML Developer Intern",
    period: "Aug 2024 - Mar 2025",
    color: "purple",
    description:
      "Implemented the {Second Brain pipeline|purple} for the QA chatbot.",
    points: [
      "Used RAG, Self-Discover & Chain-of-Thought; Benchmarked, wrote Evals and optimized prompting, chunking, and embedding strategies.",
      "Deployed retrieval/storage back-end with {Firestore & Qdrant|blue} — latency down {46.5%|orange}.",
    ],
  },
  {
    company: "Wells Fargo",
    role: "SDE Intern",
    period: "May 2024 - Jul 2024",
    color: "yellow",
    description:
      "Led a 3-member team in the {Process Transformation|yellow} group.",
    points: [
      "Delivered {RPA solutions|yellow} replacing manual workflows.",
      "Built a {skill-based task-matching|green} platform for ~1200 employees — allotment time down {~98%|pink}.",
    ],
  },
];

// =============================================================================
// FREELANCE & CONTRACT - Same shape as experience, minus the time period
// =============================================================================

export interface FreelanceItem {
  company: string;
  role: string;
  color: HighlightColor;
  // `description` is a short lead line; `points` render as bullets below it.
  description: string;
  points: string[];
}

export const freelance: FreelanceItem[] = [
  {
    company: "Setconnect - Kirloskar Ferrous Limited",
    role: "ML Engineer",
    color: "blue",
    description:
      "Data-science engagement to cut {coke consumption|blue} by {~20 kg/T|orange} in the iron-making process.",
    points: [
      "Ran exploratory data analysis and predictive modelling on plant process and laboratory chemicaltest data.",
      "Carried out an on-ground plant visit to map the end-to-end process.",
    ],
  },
  {
    company: "Attenomics Lab",
    role: "ML Engineer",
    color: "green",
    description: "Semantic scoring for high-volume scraped Tweets.",
    points: [
      "{DistilBERT + triplet-loss|green} pipeline — {~10%|green} over baseline, {~$200/month|orange} cost cut.",
      "Built a {hybrid RAG system|purple} with multi-tiered retrieval for a brand marketing & insights chatbot.",
    ],
  },
  {
    company: "OnTheRecord Technology",
    role: "Founding Engineer",
    color: "orange",
    description: "Founding engineer on {BlueCat|orange}, a courtroom transcription desktop app.",
    points: [
      "Built {speech-to-text|green} model infrastructure.",
      "Coded key frontend components.",
    ],
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

