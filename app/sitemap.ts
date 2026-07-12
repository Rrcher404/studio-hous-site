import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  type CF = "weekly" | "monthly";
  const pages: { path: string; priority: number; changeFrequency?: CF }[] = [
    { path: "/", priority: 1.0 },
    { path: "/work/", priority: 0.9 },
    { path: "/sessions/", priority: 0.9 },
    { path: "/direction-market/", priority: 0.8, changeFrequency: "weekly" },
    { path: "/records/", priority: 0.7 },
    { path: "/field-notes/", priority: 0.8 },
    { path: "/spaces/", priority: 0.7 },
    { path: "/housscapes/", priority: 0.7 },
    { path: "/hous-sites/", priority: 0.7 },
    { path: "/contact/", priority: 0.6 },
    { path: "/privacy/", priority: 0.3 },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `https://solhous.com${path}`,
    changeFrequency: changeFrequency ?? "monthly",
    priority,
  }));
}
