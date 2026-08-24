import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/menu", priority: 0.9 },
  { path: "/galerie", priority: 0.7 },
  { path: "/evenements", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/mentions-legales", priority: 0.2 },
  { path: "/confidentialite", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE.siteUrl}${route.path}`,
    lastModified: new Date(),
    priority: route.priority,
  }));
}
