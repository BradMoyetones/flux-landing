'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { PlatformCard } from '@/components/download/platform-card';
import { OS_ORDER, OS_LABELS } from '@/lib/config';
import { detectPlatform } from '@/lib/detect-os';
import type { ParsedRelease, DetectedPlatform } from '@/lib/types';
import { Download } from 'lucide-react';

// =============================================================================
// OS Section Icons (inline SVG — same as platform-card but larger)
// =============================================================================

function AppleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
    );
}

function WindowsIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12V6.5l8-1.1V12H3zm0 .5V18l8 1.1V12.5H3zm9 0V5.3l9-1.3v8.5h-9zm0 .5V20l9 1.3v-8.3h-9z" />
        </svg>
    );
}

function LinuxIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587.26 1.22.396 1.862.396.635 0 1.27-.136 1.856-.396.238.482.684.83 1.208.946.755.2 1.69-.004 2.616-.47.865-.465 1.964-.4 2.774-.6.405-.131.766-.267.94-.601.174-.34.142-.804-.106-1.484-.077-.242-.019-.571.039-.97a2.174 2.174 0 00.056-.536c.003-.208-.044-.413-.133-.602-.205-.411-.55-.544-.864-.68-.312-.133-.598-.2-.797-.4a3.18 3.18 0 01-.663-.839.424.424 0 00-.11-.135c.123-.805-.009-1.657-.287-2.489-.589-1.77-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.057-5.965-3.17-6.298A5.095 5.095 0 0012.504 0zm-.91 1.894c.068 0 .134.004.199.01 1.673.144 1.467 2.38 1.511 3.391.048.93.266 1.874 1.082 3.049.831.99 1.998 2.573 2.542 4.204.264.79.4 1.559.29 2.246-.18-.07-.37-.12-.56-.16a3.574 3.574 0 00-.586-.08c-.21-.54-.475-1.052-.804-1.537a5.957 5.957 0 00-.104-.155c-.12-.169-.5-.469-.75-.469-.249 0-.451.232-.57.4-.466.66-.884 1.272-1.05 1.78-.083.24-.118.49-.118.74a9.3 9.3 0 01-.1-.13c-.12-.169-.5-.469-.75-.469-.249 0-.451.232-.57.4-.466.66-.884 1.272-1.05 1.78-.065.19-.096.392-.107.59a3.574 3.574 0 00-.586.08c-.19.04-.38.09-.56.16-.11-.687.026-1.456.29-2.246.544-1.631 1.711-3.214 2.542-4.204.816-1.175 1.034-2.12 1.082-3.049.044-1.011-.162-3.247 1.511-3.391.065-.006.131-.01.199-.01z" />
        </svg>
    );
}

function OSSectionIcon({ os, className }: { os: string; className?: string }) {
    switch (os) {
        case 'macos':
            return <AppleIcon className={className} />;
        case 'windows':
            return <WindowsIcon className={className} />;
        case 'linux':
            return <LinuxIcon className={className} />;
        default:
            return null;
    }
}

// =============================================================================
// Smart Download Button
// A large CTA that auto-detects the user's platform.
// =============================================================================

function SmartDownloadButton({
    assets,
    detectedPlatform,
}: {
    assets: ParsedRelease['assets'];
    detectedPlatform: DetectedPlatform | null;
}) {
    const suggestedAsset = detectedPlatform?.suggestedAssetKey
        ? assets.find((a) => a.platformKey === detectedPlatform.suggestedAssetKey)
        : null;

    if (!suggestedAsset) return null;

    return (
        <motion.a
            href={suggestedAsset.downloadUrl}
            download
            className="group inline-flex items-center gap-3 rounded-2xl bg-accent text-accent-foreground border border-accent-foreground/20 shadow-lg shadow-accent px-8 py-4 text-base font-semibold transition-colors"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            <Download size={20} />
            <span>Descargar para {detectedPlatform?.label ?? 'tu plataforma'}</span>
            <span className="text-sm font-normal opacity-70">({suggestedAsset.sizeFormatted})</span>
        </motion.a>
    );
}

// =============================================================================
// LatestRelease Component
// =============================================================================

interface LatestReleaseProps {
    release: ParsedRelease;
}

export function LatestRelease({ release }: LatestReleaseProps) {
    const [detectedPlatform, setDetectedPlatform] = useState<DetectedPlatform | null>(null);

    useEffect(() => {
        setDetectedPlatform(detectPlatform());
    }, []);

    const formattedDate = new Date(release.publishedAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <section>
            {/* Version header */}
            <AnimatedSection className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                    <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground border border-accent-foreground/20">
                        v{release.version}
                    </span>
                    {release.isPrerelease && (
                        <span className="rounded-full bg-warning/15 px-3 py-1 text-xs font-medium text-warning">
                            Pre-release
                        </span>
                    )}
                </div>
                <p className="text-sm text-foreground-subtle">{formattedDate}</p>
            </AnimatedSection>

            {/* Smart download CTA */}
            <AnimatedSection className="flex justify-center mb-16" delay={0.1}>
                <SmartDownloadButton assets={release.assets} detectedPlatform={detectedPlatform} />
            </AnimatedSection>

            {/* Platform sections grouped by OS */}
            {OS_ORDER.map((os, osIndex) => {
                const osAssets = release.assetsByOS[os];
                if (!osAssets || osAssets.length === 0) return null;

                return (
                    <AnimatedSection key={os} className="mb-12" delay={0.15 + osIndex * 0.1}>
                        {/* OS heading */}
                        <div className="flex items-center gap-3 mb-6">
                            <OSSectionIcon os={os} className="h-5 w-5 text-muted-foreground" />
                            <h3 className="text-lg font-semibold text-foreground">{OS_LABELS[os]}</h3>
                        </div>

                        {/* Asset grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {osAssets.map((asset) => (
                                <PlatformCard
                                    key={asset.platformKey}
                                    asset={asset}
                                    isSuggested={detectedPlatform?.suggestedAssetKey === asset.platformKey}
                                />
                            ))}
                        </div>
                    </AnimatedSection>
                );
            })}
        </section>
    );
}
