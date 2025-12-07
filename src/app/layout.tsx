import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${geistSans.variable} ${sourceSerif.variable} antialiased bg-background text-foreground font-serif`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
