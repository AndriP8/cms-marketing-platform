import FAQBlock from "./FAQBlock";
import FeatureGridBlock from "./FeatureGridBlock";
import HeroBlock from "./HeroBlock";
import PricingBlock from "./PricingBlock";
import TestimonialBlock from "./TestimonialBlock";

type BlockType = { _type: string; _key?: string; [key: string]: any };

export default function BlockRenderer({ blocks }: { blocks: BlockType[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const key = block._key || String(index);
        switch (block._type) {
          case "hero":
            return <HeroBlock key={key} block={block} />;
          case "featureGrid":
            return <FeatureGridBlock key={key} block={block} />;
          case "pricing":
            return <PricingBlock key={key} block={block} />;
          case "faq":
            return <FAQBlock key={key} block={block} />;
          case "testimonial":
            return <TestimonialBlock key={key} block={block} />;
          default:
            console.warn(`Unknown block type: ${block._type}`);
            return null;
        }
      })}
    </>
  );
}
