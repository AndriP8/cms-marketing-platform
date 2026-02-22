import { defineQuery } from "next-sanity";

export const SITE_CONFIG_QUERY = defineQuery(`
  *[_type == "siteConfig"][0] {
    ...,
    defaultSeo {
      title,
      description,
      ogImage { asset->{url} }
    },
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
    seo {
      title,
      description,
      ogImage { asset->{url} }
    },
    blocks[] {
      ...,
      _type == "hero" => {
        sectionId,
        heading,
        subheading,
        ctaLabel,
        ctaHref,
        image,
      },
      _type == "featureGrid" => {
        sectionId,
        heading,
        features[] {
          icon,
          title,
          body,
        }
      },
      _type == "pricing" => {
        sectionId,
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
        sectionId,
        heading,
        items[] {
          question,
          answer
        }
      },
      _type == "testimonial" => {
        sectionId,
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
