"use client";

import { Sun, Moon, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  profile,
  navigation,
  highlights,
  projects,
  publications,
  highlightColors,
} from "@/content/data";

export default function WorkPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header - Matching main page */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-end">
          <div className="flex items-center gap-3 sm:gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors ${
                  item.href === "/work"
                    ? "text-foreground font-medium"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-full hover:bg-background-secondary transition-colors"
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

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 pt-16 sm:pt-20 pb-6 sm:pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title - Full Width Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
              My Work
            </h1>
            <p className="text-base sm:text-lg text-foreground-muted mt-1.5 sm:mt-2">
              <span className={highlightColors.purple}>Projects</span>
              {", "}
              <span className={highlightColors.blue}>Publications</span>
              {" & "}
              <span className={highlightColors.pink}>Achievements</span>
            </p>
          </div>

          {/* Grid Layout with responsive ordering */}
          {/* Mobile: Projects → Publications → Highlights */}
          {/* Desktop: Left (Highlights + Publications) | Right (Projects) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Projects - First on mobile, Right column on desktop */}
            <section className="order-1 lg:order-2 lg:col-span-7">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 underline">
                Projects
              </h2>
              <div className="space-y-4 sm:space-y-5">
                {projects.map((project, index) => (
                  <div key={index} className="group">
                    {/* Project Header */}
                    <div className="flex items-baseline justify-between gap-3 sm:gap-4 mb-1">
                      <h3 className="font-medium text-sm sm:text-base">
                        <span className={highlightColors[project.color]}>
                          {project.name}
                        </span>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1.5 sm:ml-2 inline-flex items-center text-foreground-muted hover:text-foreground transition-colors"
                            aria-label={`${project.name} GitHub`}
                          >
                            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </a>
                        )}
                      </h3>
                      <span className="text-[10px] sm:text-xs text-foreground-muted whitespace-nowrap">
                        {project.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                      {project.description}
                    </p>

                    {/* Achievement */}
                    {project.achievement && (
                      <p className="text-xs sm:text-sm text-foreground mt-1">
                        <span className={highlightColors.pink}>{project.achievement}</span>
                      </p>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-background-secondary text-foreground-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Left Column Container - Contains Highlights & Publications */}
            <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col gap-6 sm:gap-8">
              
              {/* Publications - Second on mobile, below Highlights on desktop */}
              <section className="order-1 lg:order-2 pt-6 sm:pt-0 border-t sm:border-t-0 lg:pt-6 lg:border-t border-border">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 underline">
                  Publications
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  {publications.map((pub, index) => (
                    <div key={index} className="group">
                      <h3 className="font-medium text-sm sm:text-base">
                        <span className={highlightColors[pub.color]}>{pub.title}</span>
                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1.5 sm:ml-2 inline-flex items-center text-foreground-muted hover:text-foreground transition-colors"
                            aria-label="View publication"
                          >
                            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </a>
                        )}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground-muted mt-1">
                        {pub.venue} · {pub.year}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Highlights & Achievements - Third on mobile, first in left column on desktop */}
              <section className="order-2 lg:order-1 pt-6 sm:pt-0 border-t sm:border-t-0 border-border">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 underline">
                  Highlights & Achievements
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  {highlights.map((item, index) => (
                    <div key={index} className="group">
                      <h3 className="font-medium text-sm sm:text-base">
                        <span className={highlightColors[item.color]}>{item.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground-muted mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
