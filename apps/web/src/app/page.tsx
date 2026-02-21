import BlockRenderer from "@/components/blocks/BlockRenderer";
import { sanityFetch } from "@/sanity/client";
import { PAGE_QUERY } from "@/sanity/queries";

export default async function HomePage() {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: "home" },
  });

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4 p-8 bg-white rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold">No Content Yet</h1>
          <p className="text-gray-600">
            Please create a page with slug "home" in Sanity Studio.
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
