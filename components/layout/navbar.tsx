'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GITHUB_CONFIG } from '@/lib/config';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import LogoSvg from '../logo-svg';
import { GitHub } from '../icons';
import { Button } from '../ui/button';
import LogoComponent from '../logo-component';

const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/download', label: 'Download' },
];

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Navbar() {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const [variant, setVariant] = useState<"top" | "scrolled">("top");

    const [mobileOpen, setMobileOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (mobileOpen) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }
    }, [mobileOpen])

    const variants = {
        top: "bg-transparent",
        scrolled: "bg-background/50 backdrop-blur-xl ring ring-border",
    }

    useGSAP(
        () => {
            // 1. Estado inicial de React si se refresca a mitad de página
            setVariant(window.scrollY > 50 ? "scrolled" : "top");

            // 2. Animación de entrada blindada con fromTo
            // Al decirle explícitamente DE DÓNDE a DÓNDE va, GSAP no adivina.
            gsap.fromTo('.navbar-inner',
                { yPercent: -150, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
            );

            // 3. ScrollTrigger dinámico
            ScrollTrigger.create({
                start: 'top top',
                end: 'max',
                onUpdate: (self) => {
                    const currentScroll = self.scroll();

                    // Actualiza el fondo en tiempo real
                    setVariant(currentScroll > 50 ? "scrolled" : "top");

                    // Scrollear hacia abajo -> Oculta
                    if (self.direction === 1 && currentScroll > 100) {
                        gsap.to('.navbar-inner', {
                            yPercent: -150,
                            duration: 0.6,
                            ease: 'power2.out',
                        });
                    }
                    // Scrollear hacia arriba -> Muestra
                    else if (self.direction === -1) {
                        gsap.to('.navbar-inner', {
                            yPercent: 0,
                            duration: 0.6,
                            ease: 'power2.out',
                        });
                    }
                },
            });
        },
        { scope: navRef }
    );

    return (
        <header
            ref={navRef}
            className="fixed top-2 md:top-6 right-2 left-2 z-50"
        >
            <nav
                className={
                    cn(
                        "navbar-inner mx-auto flex max-w-6xl items-center justify-between px-6 py-2 rounded-full",
                        variants[variant],
                    )
                }
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <LogoComponent />
                    <span className="text-lg font-semibold tracking-tight text-foreground">Flux</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${pathname === link.href
                                ? 'text-foreground'
                                : 'text-foreground-muted hover:text-foreground'
                                }`}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute inset-0 rounded-lg bg-white/6"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </Link>
                    ))}

                    <div className="mx-3 h-4 w-px bg-border" />

                    <a
                        href={GITHUB_CONFIG.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                        <GitHub />
                        GitHub
                        <svg
                            width="12"
                            height="12"
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

                {/* Mobile Hamburger */}
                <Button
                    variant="ghost"
                    size="icon-lg"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className='md:hidden'
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    >
                        <motion.line
                            x1="3"
                            y1="6"
                            x2="17"
                            y2="6"
                            animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                            style={{ transformOrigin: 'center' }}
                        />
                        <motion.line
                            x1="3"
                            y1="10"
                            x2="17"
                            y2="10"
                            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                        />
                        <motion.line
                            x1="3"
                            y1="14"
                            x2="17"
                            y2="14"
                            animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                            style={{ transformOrigin: 'center' }}
                        />
                    </svg>
                </Button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden bg-background/70 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col gap-1 px-6 py-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                        {
                                            'bg-accent text-accent-foreground': pathname === link.href,
                                            'text-foreground-muted hover:text-foreground': pathname !== link.href
                                        }
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <a
                                href={GITHUB_CONFIG.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-foreground-muted transition-colors hover:text-foreground"
                            >
                                <GitHub />
                                GitHub
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
