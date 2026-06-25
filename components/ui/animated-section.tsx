"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  once?: boolean;
}

/**
 * Reusable wrapper that fades in + slides content when it enters the viewport.
 * Uses GSAP ScrollTrigger — no Framer Motion overlap.
 */
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
}: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: 40 };
      case "down":
        return { y: -40 };
      case "left":
        return { x: 40 };
      case "right":
        return { x: -40 };
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const offset = getOffset();

      gsap.from(containerRef.current, {
        ...offset,
        autoAlpha: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ visibility: "hidden" }}
    >
      {children}
    </div>
  );
}
