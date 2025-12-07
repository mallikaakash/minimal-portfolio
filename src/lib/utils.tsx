import { highlightColors, HighlightColor } from "@/content/data";
import { ReactNode } from "react";

/**
 * Parses text with {highlighted|color} syntax and returns React nodes
 * Example: "This is {important|blue} text" => "This is <span class="highlight-blue">important</span> text"
 */
export function parseHighlights(text: string): ReactNode[] {
  const regex = /\{([^|]+)\|(\w+)\}/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add the highlighted span
    const [, content, color] = match;
    const colorClass = highlightColors[color as HighlightColor] || "";
    parts.push(
      <span key={match.index} className={colorClass}>
        {content}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

/**
 * Component that renders text with highlight syntax
 */
export function HighlightedText({ text }: { text: string }) {
  return <>{parseHighlights(text)}</>;
}

