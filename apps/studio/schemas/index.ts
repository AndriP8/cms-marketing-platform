import { faqBlock } from "./blocks/faq";
import { featureGridBlock } from "./blocks/featureGrid";
import { heroBlock } from "./blocks/hero";
import { pricingBlock } from "./blocks/pricing";
import { testimonialBlock } from "./blocks/testimonial";

import { page } from "./documents/page";
import { siteConfig } from "./documents/siteConfig";

export const schemaTypes = [
  // blocks
  heroBlock,
  featureGridBlock,
  pricingBlock,
  faqBlock,
  testimonialBlock,

  // documents
  page,
  siteConfig,
];
