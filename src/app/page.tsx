"use client";

import { Github, Linkedin, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

import { profile, education, experience, navigation, highlightColors } from "@/content/data";
import { HighlightedText } from "@/lib/utils";

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-end">
          <div className="flex items-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors ${
                  item.href === "/"
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
      <main className="flex-1 px-6 pt-20 pb-8">
        <div className="max-w-6xl mx-auto ">
          {/* Name & Title - Full Width Header */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
              {profile.name}
            </h1>
            <p className="text-lg text-foreground-muted mt-2 ">
              <span className={highlightColors.blue}>{profile.title}</span>
              {" & "}
              <span className={highlightColors.green}>{profile.subtitle}</span>
            </p>
          </div>

          {/* Two Column Layout - About/Education + Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - About + Education */}
            <div className="lg:col-span-5 space-y-8">
              {/* About */}
              <h2 className="text-xl font-semibold text-foreground mb-4 underline">
                  Lil bit about me
                </h2>
              <div className="space-y-3 text-base leading-relaxed text-foreground-muted">
                {profile.bio.map((paragraph, index) => (
                  <p key={index}>
                    <HighlightedText text={paragraph} />
                  </p>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <span className="text-foreground-muted text-sm">•</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-foreground-muted hover:text-foreground underline transition-colors"
                >
                  Resume
                </a>
              </div>

              {/* Education */}
              <div className="pt-6 border-t border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4 underline">
                  Education
                </h2>
                <div className="space-y-2">
                  {education.map((edu, index) => (
                    <p key={index} className="text-sm">
                      <span className="text-base">{edu.institution}</span>
                      <span className="text-foreground-muted">
                        {" : "}
                        {edu.degree} · {edu.score} · {edu.period}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Experience */}
            <div className="lg:col-span-7">
              <h2 className="text-xl font-semibold text-foreground mb-4 underline">
                Experience
              </h2>

              <div className="space-y-5">
                {experience.map((job, index) => (
                  <div key={index} className="group">
                    {/* Header */}
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <h3 className="font-medium">
                        <span className={highlightColors[job.color]}>{job.company}</span>
                        <span className="text-foreground-muted font-normal">
                          {" : "}
                          {job.role}
                        </span>
                      </h3>
                      <span className="text-xs text-foreground-muted whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      <HighlightedText text={job.description} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
