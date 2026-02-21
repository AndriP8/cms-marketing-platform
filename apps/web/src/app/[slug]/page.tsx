import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { sanityFetch } from "@/sanity/client";
import { ALL_PAGE_SLUGS_QUERY, PAGE_QUERY } from "@/sanity/queries";

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: ALL_PAGE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return (data || []).map((page: any) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  if (!data) return {};

  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description,
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  if (!data) {
    notFound();
  }

  return (
    <main>
      <BlockRenderer blocks={data.blocks || []} />
    </main>
  );
}
