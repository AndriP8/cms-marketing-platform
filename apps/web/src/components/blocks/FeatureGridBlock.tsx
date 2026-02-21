export default function FeatureGridBlock({ block }: { block: any }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">
          {block.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {block.features?.map((feature: any, index: number) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
              {feature.icon && (
                <div className="text-3xl mb-4">{/* Render icon later */}★</div>
              )}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
