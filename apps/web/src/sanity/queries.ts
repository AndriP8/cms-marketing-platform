import { defineQuery } from "next-sanity";

export const SITE_CONFIG_QUERY = defineQuery(`
  *[_type == "siteConfig"][0] {
    ...,
    nav[] {
      ...,
    }
  }
`);

export const ALL_PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    seo,
    blocks[] {
      ...,
      _type == "hero" => {
        heading,
        subheading,
        ctaLabel,
        ctaHref,
        image,
      },
      _type == "featureGrid" => {
        heading,
        features[] {
          icon,
          title,
          body,
        }
      },
      _type == "pricing" => {
        heading,
        plans[] {
          name,
          price,
          interval,
          features,
          highlighted,
          ctaLabel,
          ctaHref
        }
      },
      _type == "faq" => {
        heading,
        items[] {
          question,
          answer
        }
      },
      _type == "testimonial" => {
        heading,
        testimonials[] {
          quote,
          author,
          role,
          avatar
        }
      }
    }
  }
`);
