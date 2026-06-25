// =============================================================================
// Flux Landing — OS & Architecture Detection (Client-side only)
// =============================================================================

import type { DetectedPlatform } from "./types";

/**
 * Detects the user's operating system and CPU architecture.
 * Uses navigator.userAgentData (modern) with fallback to navigator.userAgent.
 */
export function detectPlatform(): DetectedPlatform {
  if (typeof window === "undefined") {
    return {
      os: "unknown",
      arch: "unknown",
      label: "your platform",
      suggestedAssetKey: null,
    };
  }

  let os: DetectedPlatform["os"] = "unknown";
  let arch: DetectedPlatform["arch"] = "unknown";

  // Try modern API first (Chromium-based browsers)
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;

  if (uaData?.platform) {
    const platform = uaData.platform.toLowerCase();
    if (platform === "macos" || platform === "mac os x") os = "macos";
    else if (platform === "windows") os = "windows";
    else if (platform === "linux") os = "linux";
  } else {
    // Fallback to userAgent string
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("mac os x") || ua.includes("macintosh")) os = "macos";
    else if (ua.includes("windows")) os = "windows";
    else if (ua.includes("linux")) os = "linux";
  }

  // Architecture detection
  const ua = navigator.userAgent;
  if (os === "macos") {
    // Apple Silicon detection: check for ARM in userAgent or absence of Intel indicators
    // On Safari, ARM Macs don't explicitly say "ARM" but they also don't say "Intel"
    // On Chrome, navigator.userAgentData.architecture may help
    if (ua.includes("ARM") || !ua.includes("Intel")) {
      arch = "aarch64";
    } else {
      arch = "x86_64";
    }
  } else {
    // Windows and Linux are predominantly x86_64 for desktop
    arch = "x86_64";
  }

  // Map to asset key
  const suggestedAssetKey = getSuggestedAssetKey(os, arch);
  const label = getLabel(os, arch);

  return { os, arch, label, suggestedAssetKey };
}

function getSuggestedAssetKey(
  os: DetectedPlatform["os"],
  arch: DetectedPlatform["arch"]
): string | null {
  if (os === "macos") {
    return arch === "aarch64" ? "aarch64_dmg" : "x64_dmg";
  }
  if (os === "windows") return "x64_exe";
  if (os === "linux") return "amd64_appimage";
  return null;
}

function getLabel(
  os: DetectedPlatform["os"],
  arch: DetectedPlatform["arch"]
): string {
  if (os === "macos") {
    return arch === "aarch64" ? "macOS Silicon" : "macOS Intel";
  }
  if (os === "windows") return "Windows";
  if (os === "linux") return "Linux";
  return "your platform";
}
