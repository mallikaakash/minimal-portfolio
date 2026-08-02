"use client";

import { useState, useEffect, ReactNode } from "react";

interface SidenoteProps {
  id: number;
  children: ReactNode;
}

export function Sidenote({ id, children }: SidenoteProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleRefClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  // All sidenotes live in the right margin.
  const side = "sidenote-right";

  return (
    <span className="sidenote-wrapper">
      <sup
        className="sidenote-ref"
        onClick={handleRefClick}
        role={isMobile ? "button" : undefined}
        tabIndex={isMobile ? 0 : undefined}
        onKeyDown={(e) => {
          if (isMobile && (e.key === "Enter" || e.key === " ")) {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        {id}
      </sup>
      <span className={`sidenote ${side} ${isMobile && !isExpanded ? "collapsed" : ""}`}>
        <span className="sidenote-number">{id}.</span>
        {children}
      </span>
    </span>
  );
}

export default Sidenote;
