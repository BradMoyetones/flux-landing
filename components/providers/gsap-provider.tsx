"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GsapProviderProps {
  children: React.ReactNode;
}

export function GsapProvider({ children }: GsapProviderProps) {
  useEffect(() => {
    // Set global defaults for a premium feel
    gsap.defaults({
      ease: "power2.out",
      duration: 0.6,
    });
  }, []);

  return <>{children}</>;
}
