import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./config";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_STUDIO_URL
        : "http://localhost:3333",
  },
});

export const sanityFetch = async <const QueryString extends string>({
  query,
  params = {},
  ...options
}: {
  query: QueryString;
  params?: QueryParams | Promise<QueryParams>;
  [key: string]: unknown;
}) => {
  let isDraftMode = false;
  try {
    isDraftMode = (await draftMode()).isEnabled;
  } catch {
    // draftMode() throws outside of Request context
  }

  if (isDraftMode && !process.env.SANITY_API_READ_TOKEN) {
    console.warn(
      "Draft mode is enabled, but SANITY_API_READ_TOKEN is not set. Drafts may not be fetched.",
    );
  }

  const fetchClient = isDraftMode
    ? client.withConfig({
        token: process.env.SANITY_API_READ_TOKEN,
        perspective: "previewDrafts",
        stega: true,
      })
    : client;

  const data = await fetchClient.fetch(query, params, options);
  return { data };
};

export const SanityLive = () => null; // Stub to satisfy layout import
