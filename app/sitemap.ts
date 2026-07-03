import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://solhous.com/",
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
