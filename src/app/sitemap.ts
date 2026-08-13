import type { MetadataRoute } from "next";
import { equipment } from "@/lib/equipment";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/catalog", "/services", "/delivery", "/about", "/contacts", "/request", "/privacy"];
  return [...routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.7 })), ...equipment.map((item) => ({ url: `${siteConfig.url}/catalog/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }))];
}
