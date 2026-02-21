import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default function HeroBlock({ block }: { block: any }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">{block.heading}</h1>
        {block.subheading && (
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {block.subheading}
          </p>
        )}
        {block.ctaLabel && block.ctaHref && (
          <a
            href={block.ctaHref}
            className="bg-black text-white px-8 py-3 rounded-full font-medium mb-12 inline-block"
          >
            {block.ctaLabel}
          </a>
        )}
        {block.image && (
          <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={urlFor(block.image).url()}
              alt={block.heading}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
