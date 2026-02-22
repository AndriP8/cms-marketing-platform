import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { PageBlocks } from "./BlockRenderer";

export type FeatureGridBlockProps = Extract<
  NonNullable<PageBlocks>[number],
  { _type: "featureGrid" }
>;

export function FeatureGridBlock({ heading, features }: FeatureGridBlockProps) {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        {heading && (
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              {heading}
            </h2>
          </div>
        )}

        {features && features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-8 bg-white dark:bg-zinc-950 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon ? (
                    <DynamicIcon
                      name={feature.icon as IconName}
                      className="w-8 h-8"
                    />
                  ) : (
                    <span className="text-2xl">✨</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
