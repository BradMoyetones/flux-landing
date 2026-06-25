// =============================================================================
// Flux Landing — Central Configuration
// =============================================================================

export const SITE_CONFIG = {
  name: "Flux",
  tagline: "Desktop Workflow Engine",
  description:
    "Un motor de automatización y flujos de trabajo de escritorio, construido sobre Tauri. Encadena peticiones HTTP, transforma datos y orquesta servicios — todo local, sin la nube.",
  url: "https://flux.itsbrad.dev",
} as const;

export const GITHUB_CONFIG = {
  owner: "BradMoyetones",
  repo: "flux",
  apiBase: "https://api.github.com",
  get releasesUrl() {
    return `${this.apiBase}/repos/${this.owner}/${this.repo}/releases`;
  },
  get latestReleaseUrl() {
    return `${this.releasesUrl}/latest`;
  },
  get repoUrl() {
    return `https://github.com/${this.owner}/${this.repo}`;
  },
} as const;

// -----------------------------------------------------------------------------
// Platform Mappings
// Maps GitHub release platform keys to human-readable labels and metadata.
// -----------------------------------------------------------------------------

export type PlatformOS = "macos" | "windows" | "linux";

export interface PlatformMapping {
  os: PlatformOS;
  arch: string;
  label: string;
  shortLabel: string;
  icon: PlatformOS;
  format: string;
  description: string;
}

/**
 * Maps asset filenames to platform metadata.
 * Keys match common patterns from the Tauri build output.
 */
export const ASSET_PLATFORM_MAP: Record<string, PlatformMapping> = {
  // macOS
  aarch64_dmg: {
    os: "macos",
    arch: "aarch64",
    label: "macOS (Apple Silicon)",
    shortLabel: "macOS Silicon",
    icon: "macos",
    format: ".dmg",
    description: "Apple Silicon (M1/M2/M3/M4)",
  },
  x64_dmg: {
    os: "macos",
    arch: "x86_64",
    label: "macOS (Intel)",
    shortLabel: "macOS Intel",
    icon: "macos",
    format: ".dmg",
    description: "Intel-based Mac",
  },

  // Windows
  x64_exe: {
    os: "windows",
    arch: "x86_64",
    label: "Windows (NSIS Installer)",
    shortLabel: "Windows",
    icon: "windows",
    format: ".exe",
    description: "Windows 10/11 (64-bit)",
  },
  x64_msi: {
    os: "windows",
    arch: "x86_64",
    label: "Windows (MSI Installer)",
    shortLabel: "Windows MSI",
    icon: "windows",
    format: ".msi",
    description: "Windows 10/11 (64-bit) — MSI",
  },

  // Linux
  amd64_appimage: {
    os: "linux",
    arch: "x86_64",
    label: "Linux (AppImage)",
    shortLabel: "Linux AppImage",
    icon: "linux",
    format: ".AppImage",
    description: "Universal Linux (64-bit)",
  },
  amd64_deb: {
    os: "linux",
    arch: "x86_64",
    label: "Linux (Debian/Ubuntu)",
    shortLabel: "Linux DEB",
    icon: "linux",
    format: ".deb",
    description: "Debian/Ubuntu (64-bit)",
  },
  x86_64_rpm: {
    os: "linux",
    arch: "x86_64",
    label: "Linux (Fedora/RHEL)",
    shortLabel: "Linux RPM",
    icon: "linux",
    format: ".rpm",
    description: "Fedora/RHEL (64-bit)",
  },
} as const;

/**
 * Determines the platform key from an asset filename.
 */
export function getAssetPlatformKey(filename: string): string | null {
  const lower = filename.toLowerCase();

  // Skip signature files, source code, and latest.json
  if (
    lower.endsWith(".sig") ||
    lower === "latest.json" ||
    lower.startsWith("source code")
  ) {
    return null;
  }

  // macOS
  if (lower.includes("aarch64") && lower.endsWith(".dmg"))
    return "aarch64_dmg";
  if (lower.includes("x64") && lower.endsWith(".dmg")) return "x64_dmg";

  // Windows
  if (lower.endsWith("-setup.exe") || lower.endsWith("_x64-setup.exe"))
    return "x64_exe";
  if (lower.endsWith(".msi")) return "x64_msi";

  // Linux
  if (lower.endsWith(".appimage")) return "amd64_appimage";
  if (lower.endsWith(".deb")) return "amd64_deb";
  if (lower.endsWith(".rpm")) return "x86_64_rpm";

  return null;
}

/**
 * Groups releases by OS for the download page.
 */
export const OS_ORDER: PlatformOS[] = ["macos", "windows", "linux"];

export const OS_LABELS: Record<PlatformOS, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};
