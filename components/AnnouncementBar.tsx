"use client";

import { useEffect, useState } from "react";
import type { Announcement } from "@/lib/content";

const KEY_PREFIX = "sh.annc.";

/**
 * The dismissible bar itself. Dismissal is per-announcement and per-tab
 * (sessionStorage) — a new announcement, or a new visit, shows again.
 */
export function AnnouncementBar({ announcement }: { announcement: Announcement }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.sessionStorage.getItem(KEY_PREFIX + announcement.id)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [announcement.id]);

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(KEY_PREFIX + announcement.id, "dismissed");
    } catch {
      /* storage unavailable — dismiss for this render only */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="annc glass specular" role="status" aria-label="Announcement">
      <span className="annc-title">{announcement.title}</span>
      {announcement.body && <span className="annc-body">{announcement.body}</span>}
      <button type="button" className="annc-close" aria-label="Dismiss announcement" onClick={dismiss}>
        ×
      </button>
    </aside>
  );
}
