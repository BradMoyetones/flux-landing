"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// =============================================================================
// Features data — 6 features in a 3×2 grid for a richer, more "enterprise" feel
// =============================================================================

const FEATURES = [
  {
    title: "100% Local",
    description:
      "Tus datos nunca salen de tu máquina. Sin servidores, sin latencia, sin dependencias en la nube.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: "Motor Rust",
    description:
      "Rendimiento nativo con Tauri. Arranque instantáneo, bajo consumo de memoria y ejecución ultrarrápida.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Pipeline Context",
    description:
      "Encadena peticiones HTTP, transformaciones de datos y servicios externos. El contexto fluye entre cada paso.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "Arquitectura Modular",
    description:
      "Agrega nuevos Steps sin tocar el núcleo. Cada integración es un módulo aislado y reutilizable.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Extensible por diseño",
    description:
      "Crea nodos personalizados con TypeScript. Hooks de ciclo de vida, validación de esquema y auto-discovery.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Multiplataforma",
    description:
      "Ejecuta en macOS, Windows y Linux de manera nativa. Un solo binario, sin Docker, sin VMs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

// =============================================================================
// FeaturesSection — Scroll-scrubbed progressive reveal
// =============================================================================

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !gridRef.current || !headerRef.current)
        return;

      // Header entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.5,
        },
      });

      tl.from(headerRef.current, {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      // Cards — batch entrance with stagger
      const cards =
        gridRef.current.querySelectorAll<HTMLElement>("[data-feature-card]");

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 50, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 60%",
              scrub: 0.3,
            },
          }
        );

        // Animate the icon container with a subtle glow grow
        const iconEl = card.querySelector("[data-feature-icon]");
        if (iconEl) {
          gsap.fromTo(
            iconEl,
            { scale: 0.5, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.6,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 65%",
                scrub: 0.3,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32">
      {/* Subtle top/bottom fade borders */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center invisible">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Características
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Construido para desarrolladores
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Potencia, privacidad y extensibilidad sin compromisos.
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              data-feature-card
              className="invisible group relative flex flex-col gap-5 rounded-xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_var(--shadow-color)] md:p-7"
            >
              {/* Icon */}
              <div
                data-feature-icon
                className="invisible flex size-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary"
              >
                <div className="size-5">{feature.icon}</div>
              </div>

              {/* Text */}
              <div>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>

              {/* Hover glow line at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
