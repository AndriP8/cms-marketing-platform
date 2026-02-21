import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default function TestimonialBlock({ block }: { block: any }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
          {block.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {block.testimonials?.map((t: any, index: number) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl flex flex-col justify-between"
            >
              <p className="text-lg italic text-gray-700 mb-8">"{t.quote}"</p>
              <div className="flex items-center gap-4 mt-auto">
                {t.avatar && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(t.avatar).url()}
                      alt={t.author || "Author"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-bold">{t.author}</h4>
                  {t.role && <p className="text-sm text-gray-500">{t.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
