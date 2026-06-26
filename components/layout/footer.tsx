import Link from 'next/link';
import { GITHUB_CONFIG, SITE_CONFIG } from '@/lib/config';
import LogoComponent from '../logo-component';

export function Footer() {
    return (
        <footer className="relative border-t border-border">
            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />

            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                    {/* Left — Brand */}
                    <div className="flex flex-col items-center gap-3 md:items-start">
                        <Link href="/" className="flex items-center gap-2">
                            <LogoComponent />

                            <span className="text-sm font-semibold text-foreground">{SITE_CONFIG.name}</span>
                        </Link>
                        <p className="text-sm text-foreground-subtle">Hecho con ❤️ por Brad</p>
                    </div>

                    {/* Center — Links */}
                    <div className="flex items-center gap-8 text-sm text-foreground-muted">
                        <Link href="/" className="transition-colors hover:text-foreground">
                            Home
                        </Link>
                        <Link href="/download" className="transition-colors hover:text-foreground">
                            Download
                        </Link>
                        <a
                            href={GITHUB_CONFIG.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
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

                    {/* Right — Copyright */}
                    <p className="text-xs text-foreground-subtle">
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
