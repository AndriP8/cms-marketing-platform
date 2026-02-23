import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/client";
import { SITE_CONFIG_QUERY } from "@/sanity/queries";

export default async function robots(): Promise<MetadataRoute.Robots> {
  let siteConfigUrl: string | undefined;

  try {
    const { data: siteConfig } = await sanityFetch({
      query: SITE_CONFIG_QUERY,
    });
    siteConfigUrl = siteConfig?.siteUrl;
  } catch (error) {
    console.warn("Failed to fetch site config for robots.txt:", error);
  }

  const baseUrl =
    siteConfigUrl ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
