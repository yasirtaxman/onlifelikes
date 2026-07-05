export const site = {
  name: "On Life Likes",
  domain: "onlifelikes.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://onlifelikes.com",
  tagline: "Practical picks for better everyday living",
  description:
    "On Life Likes helps you discover useful home ideas, smart products, cleaning tips, kitchen tools, small-space solutions, and buying guides that make daily life easier.",
  locale: "en_US",
  email: {
    contact: "hello@onlifelikes.com",
    editorial: "editorial@onlifelikes.com",
    advertise: "advertise@onlifelikes.com",
  },
  amazonAssociateLine:
    "As an Amazon Associate I earn from qualifying purchases.",
  organization: {
    legalName: "On Life Likes",
    foundingYear: 2026,
  },
} as const;

/** Primary navigation shown in the header. */
export const mainNav = [
  { label: "Home & Living", href: "/home-living" },
  { label: "Cleaning", href: "/cleaning" },
  { label: "Kitchen", href: "/kitchen" },
  { label: "Smart Home", href: "/smart-home" },
  { label: "Small Spaces", href: "/small-spaces" },
  { label: "Buying Guides", href: "/buying-guides" },
] as const;

/** Everything, for the mobile menu + categories page. */
export const footerPolicyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Product Review Policy", href: "/product-review-policy" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Advertise With Us", href: "/advertise" },
  { label: "Write for Us", href: "/write-for-us" },
  { label: "Sitemap", href: "/sitemap-page" },
] as const;
