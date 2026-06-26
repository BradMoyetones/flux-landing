"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { detectPlatform } from "@/lib/detect-os";
import type { DetectedPlatform, ParsedAsset } from "@/lib/types";
import { AppleIcon, LinuxIcon, WindowsIcon } from "../icons";

// =============================================================================
// OS Icons (inline SVG)
// =============================================================================



function OSIcon({ os, className }: { os: string; className?: string }) {
  switch (os) {
    case "macos":
      return <AppleIcon className={className} />;
    case "windows":
      return <WindowsIcon className={className} />;
    case "linux":
      return <LinuxIcon className={className} />;
    default:
      return null;
  }
}

// =============================================================================
// SmartDownloadButton Component
// =============================================================================

interface SmartDownloadButtonProps {
  assets?: ParsedAsset[];
  variant?: "hero" | "compact";
}

export function SmartDownloadButton({
  assets,
  variant = "hero",
}: SmartDownloadButtonProps) {
  const [platform, setPlatform] = useState<DetectedPlatform | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPlatform(detectPlatform());
    setIsLoading(false);
  }, []);

  const sizeClass =
    variant === "hero" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";
  const iconClass = variant === "hero" ? "h-6 w-6" : "h-5 w-5";

  if (isLoading) {
    return (
      <motion.div
        className={`animate-pulse inline-flex items-center gap-3 rounded-xl bg-accent border border-accent-foreground/20 ${sizeClass}`}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className={`rounded-full bg-accent-foreground/30 ${iconClass}`} />
        <div className="h-4 w-32 rounded bg-accent-foreground/30" />
      </motion.div>
    );
  }

  const suggestedAsset =
    assets && platform?.suggestedAssetKey
      ? assets.find((a) => a.platformKey === platform.suggestedAssetKey)
      : null;

  const href = suggestedAsset ? suggestedAsset.downloadUrl : "/download";
  const label = platform?.label && platform.os !== "unknown" ? platform.label : "tu plataforma";

  return (
    <Link href={href}>
      <motion.button
        className={`group inline-flex items-center gap-3 rounded-xl bg-accent border border-accent-foreground/20 font-medium text-accent-foreground shadow-lg shadow-accent transition-colors hover:bg-accent-hover ${sizeClass}`}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {platform?.os !== "unknown" && platform?.os ? (
          <OSIcon os={platform.os} className={iconClass} />
        ) : (
          <svg
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        )}
        <span>Descargar para {label}</span>
      </motion.button>
    </Link>
  );
}
