"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

// Register plugins once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GsapProviderProps {
  children: React.ReactNode;
}

export function GsapProvider({ children }: GsapProviderProps) {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Set global defaults for a premium feel
    gsap.defaults({
      ease: "power2.out",
      duration: 0.6,
    });
  }, []);

  // Refresh ScrollTrigger and Lenis when the route changes to recalculate positions
  useEffect(() => {
    // A small timeout ensures the DOM has fully rendered the new page
    // and that unmounted components have removed their pin-spacers
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
      lenis?.resize();
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [pathname, lenis]);

  return <>{children}</>;
}
