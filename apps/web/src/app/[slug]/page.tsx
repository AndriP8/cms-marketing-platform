import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { sanityFetch } from "@/sanity/client";
import { ALL_PAGE_SLUGS_QUERY, PAGE_QUERY } from "@/sanity/queries";

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: ALL_PAGE_SLUGS_QUERY,
  });

  const slugs = data || [];
  return slugs
    .filter(
      (slugObj): slugObj is { slug: string } =>
        typeof slugObj.slug === "string",
    )
    .map((slugObj) => ({
      slug: slugObj.slug,
    }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  if (!data) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description,
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  // Prevent rendering the 'home' page via the generic dynamic slug route
  if (slug === "home") {
    notFound();
  }

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
