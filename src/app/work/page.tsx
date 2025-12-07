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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-tight">
            {profile.name}
          </Link>
          <div className="flex items-center gap-4">
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
      <main className="flex-1 px-6 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">

          {/* Projects */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Projects
            </h2>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="group">
                  {/* Project Header */}
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h3 className="font-medium">
                      <span className={highlightColors[project.color]}>
                        {project.name}
                      </span>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 inline-flex items-center text-foreground-muted hover:text-foreground transition-colors"
                          aria-label={`${project.name} GitHub`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </h3>
                    <span className="text-xs text-foreground-muted whitespace-nowrap">
                      {project.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {project.description}
                  </p>

                  {/* Achievement */}
                  {project.achievement && (
                    <p className="text-sm text-foreground mt-1">
                      <span className={highlightColors.pink}>{project.achievement}</span>
                    </p>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded bg-background-secondary text-foreground-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Publications */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Publications
            </h2>

            <div className="space-y-4">
              {publications.map((pub, index) => (
                <div key={index} className="group">
                  <h3 className="font-medium">
                    <span className={highlightColors[pub.color]}>{pub.title}</span>
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center text-foreground-muted hover:text-foreground transition-colors"
                        aria-label="View publication"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </h3>
                  <p className="text-sm text-foreground-muted mt-1">
                    {pub.venue} · {pub.year}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Highlights & Achievements */}
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Highlights & Achievements
            </h2>

            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div key={index} className="group">
                  <h3 className="font-medium">
                    <span className={highlightColors[item.color]}>{item.title}</span>
                  </h3>
                  <p className="text-sm text-foreground-muted mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-foreground-muted">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
