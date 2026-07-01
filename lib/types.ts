// =============================================================================
// Flux Landing — TypeScript Types
// =============================================================================

/**
 * GitHub Release Asset — from the GitHub REST API.
 */
export interface GitHubAsset {
    name: string;
    browser_download_url: string;
    size: number;
    content_type: string;
    created_at: string;
    updated_at: string;
}

/**
 * GitHub Release — from the GitHub REST API.
 */
export interface GitHubRelease {
    id: number;
    tag_name: string;
    name: string | null;
    body: string | null;
    draft: boolean;
    prerelease: boolean;
    published_at: string;
    html_url: string;
    assets: GitHubAsset[];
}

/**
 * Parsed asset with platform metadata, ready for the UI.
 */
export interface ParsedAsset {
    filename: string;
    downloadUrl: string;
    size: number;
    sizeFormatted: string;
    platformKey: string;
    os: 'macos' | 'windows' | 'linux';
    arch: string;
    label: string;
    shortLabel: string;
    format: string;
    description: string;
}

/**
 * A release with its assets parsed and grouped by OS.
 */
export interface ParsedRelease {
    id: number;
    version: string;
    name: string;
    notes: string | null;
    publishedAt: string;
    htmlUrl: string;
    isPrerelease: boolean;
    assets: ParsedAsset[];
    assetsByOS: Record<string, ParsedAsset[]>;
}

/**
 * The detected user platform for smart download suggestions.
 */
export interface DetectedPlatform {
    os: 'macos' | 'windows' | 'linux' | 'unknown';
    arch: 'aarch64' | 'x86_64' | 'unknown';
    label: string;
    suggestedAssetKey: string | null;
}
