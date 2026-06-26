import type { Metadata } from "next";
import { getLatestRelease, getAllReleases } from "@/lib/github";
import { LatestRelease } from "@/components/download/latest-release";
import { ReleaseNotes } from "@/components/download/release-notes";
import { VersionHistory } from "@/components/download/version-history";

// =============================================================================
// Metadata
// =============================================================================

export const metadata: Metadata = {
  title: "Descargas",
  description:
    "Descarga Flux para macOS, Windows y Linux. Motor de flujos de trabajo de escritorio construido con Tauri y Rust.",
};

// =============================================================================
// Download Page (Server Component)
// =============================================================================

export default async function DownloadPage() {
  const [latestRelease, allReleases] = await Promise.all([
    getLatestRelease(),
    getAllReleases(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Page header */}
      <section className="pt-16 pb-12 text-center">
        <h1 className="gradient-text text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Descargas
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Descarga Flux para tu plataforma. Disponible para macOS, Windows y
          Linux.
        </p>
      </section>

      {/* Content */}
      {latestRelease ? (
        <>
          {/* Latest release */}
          <section className="pb-16">
            <LatestRelease release={latestRelease} />
          </section>

          {/* Release notes */}
          <section className="pb-16">
            <ReleaseNotes notes={latestRelease.notes} />
          </section>

          {/* Version history */}
          <section className="pb-24">
            <VersionHistory releases={allReleases} />
          </section>
        </>
      ) : (
        /* Empty / error state */
        <section className="py-24 text-center">
          <div className="bg-card border mx-auto max-w-md rounded-2xl p-8">
            <div className="mb-4 flex justify-center">
              <svg
                className="h-12 w-12 text-foreground-subtle"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron versiones
            </h2>
            <p className="text-sm text-foreground-subtle">
              No pudimos obtener las versiones de Flux en este momento. Por
              favor, inténtalo de nuevo más tarde o visita nuestro{" "}
              <a
                href="https://github.com/BradMoyetones/flux/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover underline underline-offset-2"
              >
                repositorio en GitHub
              </a>
              .
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
