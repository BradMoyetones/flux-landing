import Link from "next/link";
import { GITHUB_CONFIG, SITE_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Left — Brand */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-accent/10 border border-accent/20">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-accent"
                >
                  <circle cx="4" cy="4" r="2" fill="currentColor" />
                  <circle cx="12" cy="4" r="2" fill="currentColor" opacity="0.7" />
                  <circle cx="8" cy="12" r="2" fill="currentColor" opacity="0.5" />
                  <line x1="5.5" y1="5" x2="7" y2="10.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                  <line x1="10.5" y1="5" x2="9" y2="10.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-foreground-subtle">
              Hecho con ❤️ por Brad
            </p>
          </div>

          {/* Center — Links */}
          <div className="flex items-center gap-8 text-sm text-foreground-muted">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/download"
              className="transition-colors hover:text-foreground"
            >
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
