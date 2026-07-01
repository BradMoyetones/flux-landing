'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { SmartDownloadButton } from './smart-download-button';
import { Button } from '../ui/button';

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const headingLine1Ref = useRef<HTMLSpanElement>(null);
    const headingLine2Ref = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

            tl.from(badgeRef.current, { y: -20, autoAlpha: 0 })
                .from(
                    [headingLine1Ref.current, headingLine2Ref.current],
                    { y: 30, autoAlpha: 0, stagger: 0.1 },
                    '-=0.4'
                )
                .from(subtitleRef.current, { y: 20, autoAlpha: 0 }, '-=0.6')
                .from(
                    buttonsRef.current?.children ? Array.from(buttonsRef.current.children) : [],
                    { y: 20, autoAlpha: 0, stagger: 0.1 },
                    '-=0.6'
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-16 text-center"
        >
            {/* Background Radial Gradient Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent blur-[120px]" />

            <div className="z-10 flex max-w-4xl flex-col items-center gap-8">
                {/* Version Badge */}
                <div
                    ref={badgeRef}
                    className="invisible rounded-full border border-accent-foreground/20 bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground"
                >
                    v1.0.0
                </div>

                {/* Main Heading */}
                <h1 className="flex flex-col gap-2 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                    <span
                        ref={headingLine1Ref}
                        className="invisible pb-2 bg-linear-to-l from-primary via-70% via-foreground to-foreground bg-clip-text text-transparent"
                    >
                        Automatiza tus flujos de trabajo.
                    </span>
                    <span
                        ref={headingLine2Ref}
                        className="invisible pb-2 bg-linear-to-r from-primary via-60% via-primary to-foreground bg-clip-text text-transparent"
                    >
                        Sin la nube.
                    </span>
                </h1>

                {/* Subtitle */}
                <p ref={subtitleRef} className="invisible max-w-2xl text-lg text-muted-foreground sm:text-xl">
                    El motor de flujos de trabajo de escritorio construido sobre Tauri. Encadena peticiones HTTP,
                    transforma datos y orquesta servicios con rendimiento nativo y privacidad total.
                </p>

                {/* CTA Buttons */}
                <div ref={buttonsRef} className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                    <SmartDownloadButton variant="hero" />
                    <Link href="/download">
                        <Button variant={'ghost'} className="px-4! py-5! md:px-8! md:py-7! rounded-xl">
                            Ver todas las descargas
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
