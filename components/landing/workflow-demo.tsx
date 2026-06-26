"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// =============================================================================
// Pipeline steps
// =============================================================================

const STEPS = [
  {
    id: "trigger",
    step: "01",
    label: "Trigger",
    title: "HTTP Request",
    description:
      "Escucha webhooks, peticiones REST o eventos programados. El pipeline arranca aquí.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    floats: [
      { text: "GET /api/webhook", pos: "top-10 -left-6 md:top-14 md:-left-16" },
      { text: "→ 200 OK", pos: "bottom-10 -right-4 md:bottom-14 md:-right-14" },
    ],
    phrase: "El flujo comienza aquí",
  },
  {
    id: "transform",
    step: "02",
    label: "Transform",
    title: "Transformar Datos",
    description:
      "Parsea, filtra y reestructura. Los datos fluyen por validadores y funciones puras.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    floats: [
      { text: "JSON.parse(body)", pos: "top-10 -right-6 md:top-14 md:-right-18" },
      { text: ".filter().map()", pos: "bottom-10 -left-4 md:bottom-14 md:-left-14" },
    ],
    phrase: "Datos transformados al vuelo",
  },
  {
    id: "condition",
    step: "03",
    label: "Condition",
    title: "Evaluar Condición",
    description:
      "Bifurca el flujo con lógica condicional. Switch, if/else y evaluaciones dinámicas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <path d="M21 16v5h-5" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
    floats: [
      { text: "if (valid) → next", pos: "top-10 -left-6 md:top-14 md:-left-18" },
      { text: "else → retry", pos: "bottom-10 -right-4 md:bottom-14 md:-right-12" },
    ],
    phrase: "Decisiones inteligentes",
  },
  {
    id: "action",
    step: "04",
    label: "Action",
    title: "Enviar Resultado",
    description:
      "Dispara acciones: notificaciones push, persistencia en DB o llamadas a APIs externas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
    floats: [
      { text: "POST /api/notify", pos: "top-10 -right-6 md:top-14 md:-right-16" },
      { text: "✓ 201 Created", pos: "bottom-10 -left-4 md:bottom-14 md:-left-14" },
    ],
    phrase: "Misión completada",
  },
];

const CONNECTOR_PHRASES = [
  "Los datos fluyen →",
  "Cada paso suma contexto →",
  "Acción inmediata →",
];

// =============================================================================
// WorkflowDemo — Horizontal scroll-driven pipeline
// =============================================================================

export function WorkflowDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Main horizontal scroll tween
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - section.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${track.scrollWidth - section.offsetWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // --- Animate step cards ---
      track.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 50, scale: 0.9 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 90%",
              end: "left 60%",
              scrub: true,
            },
          }
        );
      });

      // --- Animate step number badges ---
      track.querySelectorAll<HTMLElement>("[data-badge]").forEach((badge) => {
        gsap.fromTo(
          badge,
          { autoAlpha: 0, scale: 0 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: badge,
              containerAnimation: scrollTween,
              start: "left 88%",
              end: "left 65%",
              scrub: true,
            },
          }
        );
      });

      // --- Animate floating code pills ---
      track.querySelectorAll<HTMLElement>("[data-float]").forEach((el) => {
        const randomY = gsap.utils.random(-25, 25);
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: randomY, scale: 0.8, rotation: gsap.utils.random(-6, 6) },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              containerAnimation: scrollTween,
              start: "left 92%",
              end: "left 60%",
              scrub: true,
            },
          }
        );
      });

      // --- Animate connector lines ---
      track.querySelectorAll<HTMLElement>("[data-connector]").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              containerAnimation: scrollTween,
              start: "left 75%",
              end: "left 45%",
              scrub: true,
            },
          }
        );
      });

      // --- Animate connector phrases ---
      track
        .querySelectorAll<HTMLElement>("[data-conn-phrase]")
        .forEach((phrase) => {
          gsap.fromTo(
            phrase,
            { autoAlpha: 0, x: -10 },
            {
              autoAlpha: 1,
              x: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: phrase,
                containerAnimation: scrollTween,
                start: "left 78%",
                end: "left 55%",
                scrub: true,
              },
            }
          );
        });

      // --- Animate step phrases ---
      track
        .querySelectorAll<HTMLElement>("[data-step-phrase]")
        .forEach((phrase) => {
          gsap.fromTo(
            phrase,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: phrase,
                containerAnimation: scrollTween,
                start: "left 85%",
                end: "left 58%",
                scrub: true,
              },
            }
          );
        });

      // --- Animate decorative dots ---
      track.querySelectorAll<HTMLElement>("[data-dot]").forEach((dot) => {
        gsap.fromTo(
          dot,
          { autoAlpha: 0, scale: 0 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: dot,
              containerAnimation: scrollTween,
              start: "left 88%",
              end: "left 62%",
              scrub: true,
            },
          }
        );
      });

      // --- Animate outro ---
      const outro = track.querySelector<HTMLElement>("[data-outro]");
      if (outro) {
        gsap.fromTo(
          outro,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: outro,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 50%",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
      <div
        ref={trackRef}
        className="flex h-full items-center"
      >
        {/* ================================================================= */}
        {/* Intro Panel                                                       */}
        {/* ================================================================= */}
        <div className="flex h-full w-screen shrink-0 flex-col items-center justify-center px-8 text-center">
          <span className="mb-5 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Pipeline Engine
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <span className="bg-linear-to-r from-primary via-50% via-primary to-foreground bg-clip-text text-transparent">
              Cómo funciona
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
            Cada paso del pipeline se ejecuta secuencialmente. El contexto fluye
            de un nodo al siguiente.
          </p>
          {/* Scroll indicator */}
          <div className="mt-10 flex items-center gap-2 text-xs text-muted-foreground/50">
            <svg className="size-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Desplázate para explorar el pipeline
          </div>
        </div>

        {/* ================================================================= */}
        {/* Step Panels + Connectors                                          */}
        {/* ================================================================= */}
        {STEPS.map((step, i) => (
          <div key={step.id} className="contents">
            {/* Step panel */}
            <div className="relative flex h-full w-[88vw] shrink-0 items-center justify-center px-6 sm:w-[70vw] md:w-[55vw] lg:w-[45vw]">
              {/* Step phrase (above the card) */}
              <span
                data-step-phrase
                className="invisible absolute top-[18%] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs italic text-muted-foreground/60 sm:text-sm"
              >
                {step.phrase}
              </span>

              {/* Decorative dots */}
              <div
                data-dot
                className="invisible absolute top-[22%] right-[15%] size-2 rounded-full bg-primary/20"
              />
              <div
                data-dot
                className="invisible absolute bottom-[24%] left-[12%] size-1.5 rounded-full bg-primary/15"
              />
              <div
                data-dot
                className="invisible absolute top-[35%] left-[8%] size-1 rounded-full bg-primary/10"
              />

              {/* Step number badge */}
              <div
                data-badge
                className="invisible absolute top-[26%] left-1/2 -translate-x-1/2 flex size-9 items-center justify-center rounded-full border border-primary/30 bg-primary text-xs font-bold text-primary-foreground shadow-[0_0_20px_var(--shadow-color)] sm:size-10 sm:text-sm"
              >
                {step.step}
              </div>

              {/* Main node card */}
              <div
                data-card
                className="invisible relative w-full max-w-[240px] rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:shadow-[0_0_30px_-5px_var(--shadow-color)] sm:max-w-[260px] sm:p-6"
              >
                {/* Label */}
                <span className="mb-3 inline-block rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {step.label}
                </span>

                {/* Icon */}
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <div className="size-5">{step.icon}</div>
                </div>

                {/* Text */}
                <h3 className="mb-1.5 text-sm font-semibold text-foreground sm:text-base">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {step.description}
                </p>
              </div>

              {/* Floating code pills */}
              {step.floats.map((f, j) => (
                <span
                  key={j}
                  data-float
                  className={`invisible absolute z-10 whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1 font-mono text-[10px] text-primary shadow-sm sm:px-3 sm:py-1.5 sm:text-xs ${f.pos}`}
                >
                  {f.text}
                </span>
              ))}
            </div>

            {/* Connector (between steps, not after the last one) */}
            {i < STEPS.length - 1 && (
              <div className="flex h-full w-[14vw] shrink-0 flex-col items-center justify-center gap-3 sm:w-[12vw] md:w-[10vw] lg:w-[8vw]">
                {/* Connector phrase */}
                <span
                  data-conn-phrase
                  className="invisible whitespace-nowrap text-[9px] italic text-muted-foreground/50 sm:text-[10px] md:text-xs"
                >
                  {CONNECTOR_PHRASES[i]}
                </span>
                {/* Connector line */}
                <div className="relative w-full">
                  <div
                    data-connector
                    className="h-px w-full origin-left bg-linear-to-r from-primary/40 to-primary/20"
                  />
                  {/* Arrow tip */}
                  <svg
                    className="absolute -right-1 top-1/2 size-2 -translate-y-1/2 text-primary/30"
                    viewBox="0 0 8 8"
                    fill="currentColor"
                  >
                    <path d="M0 0l8 4-8 4V0z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* ================================================================= */}
        {/* Outro Panel                                                       */}
        {/* ================================================================= */}
        <div className="flex h-full w-[85vw] shrink-0 items-center justify-center px-8 sm:w-[65vw] md:w-[50vw]">
          <div
            data-outro
            className="invisible flex flex-col items-center gap-4 text-center"
          >
            {/* Success icon */}
            <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_30px_var(--shadow-color)] sm:size-16">
              <svg className="size-7 sm:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">
              Pipeline completado
            </h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              Todo el contexto preservado de principio a fin. Sin pérdida de datos, sin estados compartidos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
