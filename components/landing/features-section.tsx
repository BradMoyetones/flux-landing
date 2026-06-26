"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FEATURES = [
  {
    title: "100% Local",
    description:
      "Tus datos nunca salen de tu máquina. Sin servidores, sin latencia, sin dependencias en la nube.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Pipeline Context",
    description:
      "Encadena peticiones HTTP, transformaciones de datos y servicios externos. El contexto fluye entre cada paso.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = Array.from(gridRef.current.children);

      ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
          );
        },
        start: "top 85%",
        once: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Construido para desarrolladores
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Potencia, privacidad y extensibilidad sin compromisos.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-card flex flex-col gap-6 p-6 md:p-8 border-2 rounded-xl hover:border-accent-foreground transition-colors"
              style={{ visibility: "hidden" }}
              whileHover={{
                scale: 1.02,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground border border-accent-foreground/20">
                <div className="size-6">{feature.icon}</div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
