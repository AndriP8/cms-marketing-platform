import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  title: {
    default: "Forge",
    template: "%s | Forge",
  },
  description: "Forge - Build Better Products, Faster",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: siteConfig } = await sanityFetch({
    query: SITE_CONFIG_QUERY,
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        {siteConfig && <Header siteConfig={siteConfig} />}
        <main className="grow pt-16">{children}</main>
        {siteConfig && <Footer siteConfig={siteConfig} />}
        <SanityLive />
        <SanityVisualEditing />
      </body>
    </html>
  );
}
