import { ReactNode } from "react";
import { highlightColors, HighlightColor } from "@/content/data";

interface HighlightProps {
  color?: HighlightColor;
  children: ReactNode;
}

export function Hl({ color = "blue", children }: HighlightProps) {
  const className = highlightColors[color] || highlightColors.blue;
  return <span className={className}>{children}</span>;
}

// Also export as Highlight for clarity
export const Highlight = Hl;

export default Hl;
