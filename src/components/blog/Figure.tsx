import Image from "next/image";
import { ReactNode } from "react";

interface FigureProps {
  src: string;
  alt: string;
  caption?: ReactNode;
  figNumber?: number;
  variant?: "default" | "full-width" | "margin";
  width?: number;
  height?: number;
}

export function Figure({
  src,
  alt,
  caption,
  figNumber,
  variant = "default",
  width = 800,
  height = 600,
}: FigureProps) {
  const variantClass = variant === "default" ? "" : variant;

  return (
    <figure className={`blog-figure ${variantClass}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded"
        style={{ width: "100%", height: "auto" }}
      />
      {caption && (
        <figcaption>
          {figNumber !== undefined && <strong>Figure {figNumber}.</strong>}{" "}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default Figure;
