import { defineField, defineType } from "sanity";

export const featureGridBlock = defineType({
  name: "featureGrid",
  title: "Feature Grid",
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
        "Optional ID used for anchor navigation (e.g. 'features' for /#features)",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineField({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "lucide-icon",
              description: "Name of the icon (e.g., 'star', 'check')",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
            }),
          ],
        }),
      ],
    }),
  ],
});
