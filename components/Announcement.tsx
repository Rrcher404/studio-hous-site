import { getAnnouncement } from "@/lib/content";
import { AnnouncementBar } from "@/components/AnnouncementBar";

/**
 * Site-wide announcement — Panel-controlled, absent by default.
 * Server component: fetches the active announcement (tagged, revalidates with
 * the rest of the content) and hands it to the client bar for dismissal.
 * Fixed chrome at the bottom of the viewport, so it never shifts layout.
 */
export async function Announcement() {
  const announcement = await getAnnouncement();
  if (!announcement) return null;
  return <AnnouncementBar announcement={announcement} />;
}
