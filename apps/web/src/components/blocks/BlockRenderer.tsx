import type { PAGE_QUERYResult } from "@/sanity/types";
import { FAQBlock } from "./FAQBlock";
import { FeatureGridBlock } from "./FeatureGridBlock";
import { HeroBlock } from "./HeroBlock";
import { PricingBlock } from "./PricingBlock";
import { TestimonialBlock } from "./TestimonialBlock";

export type PageBlocks = NonNullable<PAGE_QUERYResult>["blocks"];

interface BlockRendererProps {
  blocks: PageBlocks;
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="flex flex-col gap-y-16 lg:gap-y-24">
      {blocks.map((block) => {
        switch (block._type) {
          case "hero":
            return <HeroBlock key={block._key} {...block} />;
          case "featureGrid":
            return <FeatureGridBlock key={block._key} {...block} />;
          case "pricing":
            return <PricingBlock key={block._key} {...block} />;
          case "faq":
            return <FAQBlock key={block._key} {...block} />;
          case "testimonial":
            return <TestimonialBlock key={block._key} {...block} />;
          default: {
            const unknownBlock = block as { _type: string; _key: string };
            console.warn(`Unknown block type: ${unknownBlock._type}`);
            return (
              <div
                key={unknownBlock._key}
                className="p-4 m-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded text-sm max-w-2xl mx-auto w-full"
              >
                <strong>Preview:</strong> Unknown block type{" "}
                <code>{unknownBlock._type}</code>.
              </div>
            );
          }
        }
      })}
    </div>
  );
}
