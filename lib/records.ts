export type Track = {
  title: string;
  /** Path under /public — e.g. "/media/audio/we-shine.m4a" */
  src: string;
  kind: "track" | "beat";
  /** Display length, e.g. "3:49" */
  length?: string;
};

export type Release = {
  title: string;
  year: string;
  cover: string;
  appleUrl: string;
  label: string;
};

/** The current featured release. */
export const RELEASE: Release = {
  title: "Echoes of Tomorrow",
  year: "2025",
  cover: "/media/records/echoes-of-tomorrow.jpg",
  appleUrl: "https://music.apple.com/us/album/echoes-of-tomorrow-ep/1843876347",
  label: "℗ 2025 SolHous Records",
};

/**
 * The shelf. To publish a record:
 *   1. Drop the audio file in  public/media/audio/  (AAC/m4a or mp3 — convert WAVs first, they're too heavy for the web)
 *   2. Add a line here in track order
 *   3. Commit + push — Vercel redeploys, the player updates automatically.
 */
export const TRACKS: Track[] = [
  { title: "Crashing Colors", src: "/media/audio/crashing-colors.m4a", kind: "track", length: "3:49" },
  { title: "Glass Horizons", src: "/media/audio/glass-horizons.m4a", kind: "track", length: "3:20" },
  { title: "Fractured Light", src: "/media/audio/fractured-light.m4a", kind: "track", length: "4:25" },
  { title: "We Shine!", src: "/media/audio/we-shine.m4a", kind: "track", length: "2:47" },
];
