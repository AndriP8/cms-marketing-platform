import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/client";
import { ALL_PAGE_SLUGS_QUERY, SITE_CONFIG_QUERY } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: siteConfig }, { data: slugs }] = await Promise.all([
    sanityFetch({ query: SITE_CONFIG_QUERY }),
    sanityFetch({ query: ALL_PAGE_SLUGS_QUERY }),
  ]);

  const baseUrl =
    siteConfig?.siteUrl ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  const pages: MetadataRoute.Sitemap = (slugs || []).map((slugObj) => ({
    url: `${baseUrl}/${slugObj.slug === "home" ? "" : slugObj.slug}`,
    lastModified: new Date(),
    changeFrequency: slugObj.slug === "home" ? "weekly" : "monthly",
    priority: slugObj.slug === "home" ? 1 : 0.8,
  }));

  return pages;
}
