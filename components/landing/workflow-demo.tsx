"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NODES = [
  {
    id: "trigger",
    title: "HTTP Request",
    subtitle: "Escucha eventos",
    color: "#3b82f6", // blue
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "transform",
    title: "Transformar Datos",
    subtitle: "Filtra y parsea",
    color: "#8b5cf6", // violet
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: "action",
    title: "Enviar Resultado",
    subtitle: "Dispara acciones",
    color: "#10b981", // green
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

export function WorkflowDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useGSAP(
    () => {
      if (!nodesRef.current) return;
      const cards = Array.from(nodesRef.current.children);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        onEnter: () => setInView(true),
        onLeaveBack: () => setInView(false),
      });

      gsap.from(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        x: -40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-16 text-3xl font-bold tracking-tight md:text-4xl">
          <span className="bg-linear-to-r from-primary via-50% via-primary to-foreground bg-clip-text text-transparent">Cómo funciona</span>
        </h2>

        <div className="relative mx-auto max-w-4xl rounded-3xl bg-background p-8 md:p-16 border border-border">
          {/* SVG Connections Container */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              {/* Path from Trigger to Transform */}
              <motion.path
                d="M 230 100 C 300 100, 300 100, 380 100"
                fill="none"
                stroke="var(--accent-foreground)"
                strokeWidth="3"
                strokeDasharray="6 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.circle
                r="4"
                fill="var(--accent-foreground)"
                className="glow"
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={inView ? { offsetDistance: "100%", opacity: [0, 1, 1, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                style={{ offsetPath: "path('M 230 100 C 300 100, 300 100, 380 100')" }}
              />

              {/* Path from Transform to Action */}
              <motion.path
                d="M 520 100 C 580 100, 580 100, 650 100"
                fill="none"
                stroke="var(--accent-foreground)"
                strokeWidth="3"
                strokeDasharray="6 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
              />
              <motion.circle
                r="4"
                fill="var(--accent-foreground)"
                className="glow"
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={inView ? { offsetDistance: "100%", opacity: [0, 1, 1, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
                style={{ offsetPath: "path('M 520 100 C 580 100, 580 100, 650 100')" }}
              />
            </svg>
          </div>

          {/* Nodes Container */}
          <div ref={nodesRef} className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            {NODES.map((node) => (
              <div
                key={node.id}
                className="bg-card border flex w-full max-w-[240px] flex-col items-center gap-4 rounded-2xl p-6 text-center invisible"
              >
                <div
                  className="flex size-14 items-center justify-center rounded-2xl glow shadow-lg"
                  style={{ backgroundColor: `${node.color}20`, color: node.color }}
                >
                  <div className="size-6">{node.icon}</div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{node.title}</h3>
                  <p className="text-sm text-foreground-muted">{node.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
