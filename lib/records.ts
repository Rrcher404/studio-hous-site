export type Track = {
  title: string;
  /** Path under /public — e.g. "/media/audio/first-light.mp3" */
  src: string;
  kind: "track" | "beat";
  /** Optional one-line context shown nowhere yet; reserved. */
  note?: string;
};

/**
 * The shelf. To publish a record:
 *   1. Drop the audio file in  public/media/audio/   (create the folder on first use)
 *   2. Add a line here:  { title: "First Light", src: "/media/audio/first-light.mp3", kind: "track" }
 *   3. Commit + push — Vercel redeploys, the player appears automatically.
 *
 * Empty array = /records/ shows the honest "first pressing" state instead of an empty player.
 */
export const TRACKS: Track[] = [];
