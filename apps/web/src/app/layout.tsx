import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { draftMode } from "next/headers";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { SanityLive, sanityFetch } from "@/sanity/client";
import { SITE_CONFIG_QUERY } from "@/sanity/queries";
import SanityVisualEditing from "@/sanity/VisualEditing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { data: siteConfig } = await sanityFetch({
    query: SITE_CONFIG_QUERY,
  });

  const fallbackTitle = "Forge";
  const fallbackDescription = "Forge - Build Better Products, Faster";

  const siteName = siteConfig?.siteName || fallbackTitle;
  const title = siteConfig?.defaultSeo?.title || fallbackTitle;
  const description =
    siteConfig?.defaultSeo?.description || fallbackDescription;
  const ogImageUrl = siteConfig?.defaultSeo?.ogImage?.asset?.url || "";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    ),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    openGraph: {
      title,
      description,
      siteName,
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: siteConfig } = await sanityFetch({
    query: SITE_CONFIG_QUERY,
  });

  const { isEnabled: isDraftMode } = await draftMode();

  const orgJsonLd = siteConfig
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.siteName,
        url:
          siteConfig.siteUrl ||
          process.env.NEXT_PUBLIC_BASE_URL ||
          "http://localhost:3000",
        ...(siteConfig.defaultSeo?.ogImage?.asset?.url && {
          logo: siteConfig.defaultSeo.ogImage.asset.url,
        }),
      }
    : null;

  return (
    <html lang="en" suppressHydrationWarning>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        {orgJsonLd && (
          <script
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Need to render raw JSON-LD for SEO
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          />
        )}
        {siteConfig && <Header siteConfig={siteConfig} />}
        <main className="grow pt-16">{children}</main>
        {siteConfig && <Footer siteConfig={siteConfig} />}
        {isDraftMode && (
          <>
            <SanityLive />
            <SanityVisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
