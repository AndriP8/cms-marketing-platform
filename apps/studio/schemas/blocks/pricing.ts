import { defineField, defineType } from "sanity";

export const pricingBlock = defineType({
  name: "pricing",
  title: "Pricing",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionId",
      title: "Section ID",
      description:
        "Optional ID used for anchor navigation (e.g. 'pricing' for /#pricing)",
      type: "string",
    }),
    defineField({
      name: "plans",
      title: "Plans",
      type: "array",
      of: [
        defineField({
          name: "plan",
          title: "Plan",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "interval",
              title: "Interval",
              type: "string",
              description: "e.g., '/month', '/year'",
            }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "highlighted",
              title: "Highlighted",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "ctaLabel",
              title: "CTA Label",
              type: "string",
            }),
            defineField({
              name: "ctaHref",
              title: "CTA Href",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});
