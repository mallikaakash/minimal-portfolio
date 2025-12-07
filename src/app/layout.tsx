import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Aakash Mallik | Software Developer",
  description:
    "Software Developer and AI Engineer building intelligent systems at the intersection of AI and software engineering.",
  keywords: [
    "Aakash Mallik",
    "Software Developer",
    "AI Engineer",
    "Machine Learning",
    "Full Stack Developer",
  ],
  authors: [{ name: "Aakash Mallik" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${newsreader.variable} antialiased bg-background text-foreground font-serif`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* Umami Analytics - Replace with your own website ID after setup */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={process.env.NEXT_PUBLIC_UMAMI_URL || "https://analytics.umami.is/script.js"}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
