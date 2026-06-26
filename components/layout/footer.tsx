"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GITHUB_CONFIG, SITE_CONFIG } from "@/lib/config";
import LogoComponent from "../logo-component";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!bigTextRef.current || !footerRef.current) return;

      gsap.fromTo(
        bigTextRef.current,
        { autoAlpha: 0, y: 60, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-border">
      {/* Top gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoComponent />
              <span className="text-base font-semibold text-foreground">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="max-w-xs text-center text-sm leading-relaxed text-muted-foreground md:text-left">
              {SITE_CONFIG.tagline}. Automatiza tus flujos de trabajo sin depender de la nube.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navegación
            </h3>
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/download"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Descargas
            </Link>
            <a
              href={GITHUB_CONFIG.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-50"
              >
                <path d="M3.5 1.5h7v7M10 2L2 10" />
              </svg>
            </a>
          </div>

          {/* Info */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Proyecto
            </h3>
            <p className="text-sm text-muted-foreground">
              Hecho con ❤️ por Brad
            </p>
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* Giant "FLUX" watermark with bottom gradient fade                   */}
      {/* ================================================================= */}
      <div className="relative mt-4 flex items-end justify-center overflow-hidden pb-0">
        <span
          ref={bigTextRef}
          className="invisible select-none text-[28vw] font-extrabold leading-[0.8] tracking-tighter text-foreground/[0.06] sm:text-[22vw] md:text-[18vw]"
        >
          FLUX
        </span>

        {/* Bottom gradient: fades the text into the background color */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--background) 90%)",
          }}
        />
      </div>
    </footer>
  );
}
