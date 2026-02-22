import Link from "next/link";

export interface PricingPlan {
  _key: string;
  name?: string | null;
  price?: string | null;
  interval?: string | null;
  features?: string[] | null;
  highlighted?: boolean | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

export interface PricingBlockProps {
  heading?: string | null;
  plans?: PricingPlan[] | null;
}

export function PricingBlock({ heading, plans }: PricingBlockProps) {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {heading && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-zinc-900 dark:text-white sm:text-5xl">
              {heading}
            </h2>
          </div>
        )}

        {plans && plans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan._key}
                className={`relative flex flex-col p-8 rounded-3xl shadow-xl transition-transform duration-300 hover:-translate-y-2 ${
                  plan.highlighted
                    ? "bg-indigo-600 dark:bg-indigo-600 text-white border-2 border-indigo-500 scale-105 z-10"
                    : "bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-gray-100 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full shadow-sm">
                    Most Popular
                  </span>
                )}
                <div className="mb-6">
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      plan.highlighted
                        ? "text-white"
                        : "text-zinc-900 dark:text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-5xl font-extrabold tracking-tight ${
                        plan.highlighted
                          ? "text-white"
                          : "text-zinc-900 dark:text-white"
                      }`}
                    >
                      {plan.price || "Free"}
                    </span>
                    {plan.interval && (
                      <span
                        className={`text-lg font-medium ${
                          plan.highlighted
                            ? "text-indigo-200"
                            : "text-zinc-500 dark:text-zinc-400"
                        }`}
                      >
                        /{plan.interval}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="flex-1 space-y-4 mb-8">
                  {plan.features?.map((feature, idx) => (
                    <li
                      key={`${plan._key}-feature-${idx}`}
                      className="flex items-start gap-3"
                    >
                      <svg
                        aria-hidden="true"
                        className={`w-6 h-6 shrink-0 ${
                          plan.highlighted
                            ? "text-indigo-200"
                            : "text-indigo-600 dark:text-indigo-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={
                          plan.highlighted
                            ? "text-indigo-50"
                            : "text-zinc-600 dark:text-zinc-300"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.ctaLabel && plan.ctaHref && (
                  <Link
                    href={plan.ctaHref}
                    className={`block w-full py-4 px-6 rounded-xl font-bold text-center transition-all ${
                      plan.highlighted
                        ? "bg-white text-indigo-600 hover:bg-gray-50 shadow-md"
                        : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                    }`}
                  >
                    {plan.ctaLabel}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
