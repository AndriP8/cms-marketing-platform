import { getCliClient } from "sanity/cli";

const client = getCliClient();

async function uploadImageFromUrl(url: string, filename: string) {
  console.log(`Downloading and uploading image: ${filename}...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  const asset = await client.assets.upload("image", Buffer.from(buffer), {
    filename,
  });
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function seed() {
  console.log("Starting Sanity seeding process...");

  // Site Configuration
  console.log("Creating Site Configuration...");
  const siteConfig = {
    _id: "siteConfig",
    _type: "siteConfig",
    siteName: "Forge",
    siteUrl: "https://forge.dev",
    defaultSeo: {
      title: "Forge - Build Better Products, Faster",
      description:
        "The complete platform for modern software teams to manage, build, and scale.",
    },
    nav: [
      { _key: "nav1", _type: "navItem", label: "Features", href: "#features" },
      { _key: "nav2", _type: "navItem", label: "Pricing", href: "#pricing" },
      { _key: "nav3", _type: "navItem", label: "FAQ", href: "#faq" },
    ],
    footer: "© 2026 Forge Inc. All rights reserved.",
  };

  try {
    await client.createOrReplace(siteConfig);
    console.log("✅ Site Configuration created.");
  } catch (error) {
    console.error("Failed to create Site Configuration:", error);
  }

  // Home Page
  console.log("Preparing Home Page with real images...");

  const heroImage = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2850&auto=format&fit=crop",
    "hero-image.jpg",
  );

  const avatarImage = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop",
    "sarah-avatar.jpg",
  );

  const homePage = {
    _id: "home",
    _type: "page",
    title: "Home",
    slug: { _type: "slug", current: "home" },
    seo: {
      title: "Home | Forge",
      description: "Welcome to Forge.",
    },
    blocks: [
      // Hero Block
      {
        _key: "heroBlock1",
        _type: "hero",
        sectionId: "hero",
        heading: "Ship Code Faster Than Ever",
        subheading:
          "Transform your development workflow with our cutting-edge developer tools. Ship with confidence and scale without limits.",
        ctaLabel: "Start Building for Free",
        ctaHref: "/signup",
        image: heroImage,
      },
      // Feature Grid Block
      {
        _key: "featureBlock1",
        _type: "featureGrid",
        sectionId: "features",
        heading: "Why Choose Us?",
        features: [
          {
            _key: "feat1",
            _type: "feature",
            icon: "rocket",
            title: "Lightning Fast",
            body: "Built on a modern stack, our platform is incredibly fast and responsive.",
          },
          {
            _key: "feat2",
            _type: "feature",
            icon: "shield",
            title: "Secure by Design",
            body: "We prioritize your data security with enterprise-grade encryption.",
          },
          {
            _key: "feat3",
            _type: "feature",
            icon: "zap",
            title: "Real-time Analytics",
            body: "Get insights instantly with our powerful real-time analytics engine.",
          },
        ],
      },
      // Pricing Block
      {
        _key: "pricingBlock1",
        _type: "pricing",
        sectionId: "pricing",
        heading: "Simple, Transparent Pricing",
        plans: [
          {
            _key: "plan1",
            name: "Starter",
            price: "$29",
            interval: "/month",
            features: ["5 Projects", "Basic Analytics", "24-hour Support"],
            highlighted: false,
            ctaLabel: "Start Trial",
            ctaHref: "/signup/starter",
          },
          {
            _key: "plan2",
            name: "Pro",
            price: "$99",
            interval: "/month",
            features: [
              "Unlimited Projects",
              "Advanced Analytics",
              "Priority Support",
              "Custom Domain",
            ],
            highlighted: true,
            ctaLabel: "Get Pro",
            ctaHref: "/signup/pro",
          },
        ],
      },
      // Testimonial Block
      {
        _key: "testimonialBlock1",
        _type: "testimonial",
        sectionId: "testimonials",
        heading: "What Our Customers Say",
        testimonials: [
          {
            _key: "test1",
            quote:
              "This platform completely revolutionized how we handle our marketing campaigns. Highly recommended!",
            author: "Sarah Jenkins",
            role: "Marketing Director at TechFlow",
            avatar: avatarImage,
          },
        ],
      },
      // FAQ Block
      {
        _key: "faqBlock1",
        _type: "faq",
        sectionId: "faq",
        heading: "Frequently Asked Questions",
        items: [
          {
            _key: "faqItem1",
            question: "Can I cancel my subscription at any time?",
            answer:
              "Yes, you can cancel your subscription at any time from your account settings. There are no long-term contracts.",
          },
          {
            _key: "faqItem2",
            question: "Do you offer a free trial?",
            answer:
              "We offer a 14-day free trial on all our plans. No credit card required to start.",
          },
        ],
      },
    ],
  };

  try {
    const res = await client.createOrReplace(homePage);
    console.log(`✅ Home Page created/updated with ID: ${res._id}`);
  } catch (error) {
    console.error("Failed to create Home Page:", error);
  }

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
