"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Streamdown } from 'streamdown';
import type { ParsedRelease } from "@/lib/types";

// =============================================================================
// Chevron Icon
// =============================================================================

function ChevronIcon({ isOpen, className }: { isOpen: boolean; className?: string }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

// =============================================================================
// Version Accordion Item
// =============================================================================

function VersionItem({ release }: { release: ParsedRelease }) {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = new Date(release.publishedAt).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <motion.div
      layout
      className="bg-card border rounded-2xl overflow-hidden"
      transition={{ layout: { duration: 0.25, ease: "easeInOut" } }}
    >
      {/* Header / Toggle */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-mono font-semibold text-foreground">
            v{release.version}
          </span>
          {release.isPrerelease && (
            <span className="rounded-full bg-warning/15 px-2.5 py-0.5 text-xs font-medium text-warning">
              Pre-release
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-foreground hidden sm:inline">
            {formattedDate}
          </span>
          <ChevronIcon isOpen={isOpen} className="h-4 w-4 text-foreground" />
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 py-5">
              {/* Date (visible on mobile since it's hidden above) */}
              <p className="text-xs text-foreground mb-4 sm:hidden">
                {formattedDate}
              </p>

              {release.notes ? (
                <div>
                  <Streamdown>{release.notes}</Streamdown>
                </div>
              ) : (
                <p className="text-sm text-foreground italic">
                  No hay notas de la versión disponibles.
                </p>
              )}

              {/* Link to GitHub release */}
              <a
                href={release.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent-foreground/70 hover:text-accent-foreground transition-colors"
              >
                Ver en GitHub
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// =============================================================================
// VersionHistory Component
// =============================================================================

interface VersionHistoryProps {
  releases: ParsedRelease[];
}

export function VersionHistory({ releases }: VersionHistoryProps) {
  // Skip the first release (it's the latest, shown in LatestRelease)
  const previousReleases = releases.slice(1);

  if (previousReleases.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-semibold text-foreground-muted mb-6">
          Versiones anteriores
        </h2>
        <p className="text-sm text-foreground">
          No hay versiones anteriores disponibles.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-foreground-muted mb-6">
        Versiones anteriores
      </h2>
      <div className="flex flex-col gap-3">
        {previousReleases.map((release) => (
          <VersionItem key={release.id} release={release} />
        ))}
      </div>
    </section>
  );
}
