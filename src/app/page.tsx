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
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-tight">
            {profile.name}
          </Link>
          <div className="flex items-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-foreground-muted hover:text-foreground transition-colors"
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
      <main className="flex-1 flex items-center justify-center px-6 pt-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8">
          {/* Left Column - Hero + About */}
          <div className="lg:col-span-5 space-y-6">
            {/* Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
                {profile.name}
              </h1>
              <p className="text-lg text-foreground-muted mt-2">
                <span className={highlightColors.blue}>{profile.title}</span>
                {" & "}
                <span className={highlightColors.green}>{profile.subtitle}</span>
              </p>
            </div>

            {/* About */}
            <div className="space-y-3 text-base leading-relaxed text-foreground-muted">
              {profile.bio.map((paragraph, index) => (
                <p key={index}>
                  <HighlightedText text={paragraph} />
                </p>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 pt-2">
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
                {profile.email}
              </a>
            </div>

            {/* Education */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                Education
              </p>
              <div className="space-y-1.5">
                {education.map((edu, index) => (
                  <p key={index} className="text-sm">
                    <span className="font-medium">{edu.institution}</span>
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
            <p className="text-xs uppercase tracking-wider text-foreground-muted mb-4">
              Experience
            </p>

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
      </main>
    </div>
  );
}
