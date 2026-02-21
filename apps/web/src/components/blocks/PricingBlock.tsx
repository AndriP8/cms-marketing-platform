export default function PricingBlock({ block }: { block: any }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16">
          {block.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {block.plans?.map((plan: any, index: number) => (
            <div
              key={index}
              className={`flex flex-col p-8 rounded-2xl ${plan.highlighted ? "bg-black text-white shadow-xl scale-105" : "bg-gray-50 border border-gray-100"}`}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                {plan.interval && (
                  <span
                    className={
                      plan.highlighted ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    {plan.interval}
                  </span>
                )}
              </div>
              <ul className="flex-1 space-y-4 mb-8">
                {plan.features?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.ctaLabel && plan.ctaHref && (
                <a
                  href={plan.ctaHref}
                  className={`text-center py-3 rounded-xl font-medium transition-colors ${plan.highlighted ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"}`}
                >
                  {plan.ctaLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
