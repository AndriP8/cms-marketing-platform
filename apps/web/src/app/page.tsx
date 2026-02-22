import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { sanityFetch } from "@/sanity/client";
import { PAGE_QUERY } from "@/sanity/queries";

export default async function HomePage() {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: "home" },
  });

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center space-y-4 p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            No Content Yet
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Please create a page with slug <strong>"home"</strong> in your
            Sanity Studio.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <BlockRenderer blocks={data.blocks || []} />
    </main>
  );
}
