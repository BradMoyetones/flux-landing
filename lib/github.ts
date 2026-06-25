// =============================================================================
// Flux Landing — GitHub API Service
// Server-side only. These functions run during SSR/ISR.
// =============================================================================

import { GITHUB_CONFIG, ASSET_PLATFORM_MAP, getAssetPlatformKey } from "./config";
import type { GitHubRelease, ParsedRelease, ParsedAsset } from "./types";

// -----------------------------------------------------------------------------
// Formatting Helpers
// -----------------------------------------------------------------------------

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// -----------------------------------------------------------------------------
// Asset Parsing
// -----------------------------------------------------------------------------

function parseAsset(asset: GitHubRelease["assets"][0]): ParsedAsset | null {
  const platformKey = getAssetPlatformKey(asset.name);
  if (!platformKey) return null;

  const mapping = ASSET_PLATFORM_MAP[platformKey];
  if (!mapping) return null;

  return {
    filename: asset.name,
    downloadUrl: asset.browser_download_url,
    size: asset.size,
    sizeFormatted: formatBytes(asset.size),
    platformKey,
    os: mapping.os,
    arch: mapping.arch,
    label: mapping.label,
    shortLabel: mapping.shortLabel,
    format: mapping.format,
    description: mapping.description,
  };
}

function parseRelease(release: GitHubRelease): ParsedRelease {
  const assets = release.assets
    .map(parseAsset)
    .filter((a): a is ParsedAsset => a !== null);

  const assetsByOS: Record<string, ParsedAsset[]> = {};
  for (const asset of assets) {
    if (!assetsByOS[asset.os]) {
      assetsByOS[asset.os] = [];
    }
    assetsByOS[asset.os].push(asset);
  }

  return {
    id: release.id,
    version: release.tag_name.replace(/^v/, ""),
    name: release.name || release.tag_name,
    notes: release.body,
    publishedAt: release.published_at,
    htmlUrl: release.html_url,
    isPrerelease: release.prerelease,
    assets,
    assetsByOS,
  };
}

// -----------------------------------------------------------------------------
// API Functions (Server-side)
// -----------------------------------------------------------------------------

const FETCH_OPTIONS: RequestInit = {
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
  // Revalidate every 5 minutes for ISR
  next: { revalidate: 300 },
};

/**
 * Fetch the latest published release.
 */
export async function getLatestRelease(): Promise<ParsedRelease | null> {
  try {
    const res = await fetch(GITHUB_CONFIG.latestReleaseUrl, FETCH_OPTIONS);

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return null;
    }

    const data: GitHubRelease = await res.json();
    return parseRelease(data);
  } catch (error) {
    console.error("Failed to fetch latest release:", error);
    return null;
  }
}

/**
 * Fetch all published releases (non-draft).
 */
export async function getAllReleases(): Promise<ParsedRelease[]> {
  try {
    const res = await fetch(
      `${GITHUB_CONFIG.releasesUrl}?per_page=20`,
      FETCH_OPTIONS
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: GitHubRelease[] = await res.json();
    return data
      .filter((r) => !r.draft)
      .map(parseRelease);
  } catch (error) {
    console.error("Failed to fetch all releases:", error);
    return [];
  }
}

/**
 * Fetch a specific release by tag (client-side compatible).
 * Used by the version history accordion.
 */
export async function getReleaseByTag(tag: string): Promise<ParsedRelease | null> {
  try {
    const res = await fetch(
      `${GITHUB_CONFIG.releasesUrl}/tags/${tag}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!res.ok) return null;

    const data: GitHubRelease = await res.json();
    return parseRelease(data);
  } catch {
    return null;
  }
}
