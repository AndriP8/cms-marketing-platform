import type { PageBlocks } from "./BlockRenderer";

export type FAQBlockProps = Extract<
  NonNullable<PageBlocks>[number],
  { _type: "faq" }
>;

export function FAQBlock({ sectionId, heading, items }: FAQBlockProps) {
  return (
    <section
      id={sectionId || "faq"}
      className="py-24 bg-zinc-50 dark:bg-zinc-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {heading && (
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white sm:text-4xl">
              {heading}
            </h2>
          </div>
        )}

        {items && items.length > 0 && (
          <div className="space-y-6">
            {items.map((item) => (
              <details
                key={item.question}
                className="group border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-2xl p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-zinc-900 dark:text-white">
                  <h3 className="text-lg font-semibold">{item.question}</h3>

                  <span className="shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 p-2 sm:p-3 text-zinc-900 dark:text-white group-open:-rotate-45 transition-transform duration-300">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
