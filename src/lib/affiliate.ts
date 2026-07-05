import type { Product } from "./types";

/**
 * Amazon Associates link builder with per-marketplace tracking IDs.
 * Set the tags in .env.local — see .env.example.
 *
 * The site links to the US store by default. If you later add a
 * geo-redirect service (e.g. Amazon OneLink), OneLink handles
 * localization automatically and the US link remains the canonical one.
 */

export type Marketplace = "US" | "UK" | "CA" | "DE" | "FR" | "ES" | "IT";

const MARKETPLACE_HOSTS: Record<Marketplace, string> = {
  US: "www.amazon.com",
  UK: "www.amazon.co.uk",
  CA: "www.amazon.ca",
  DE: "www.amazon.de",
  FR: "www.amazon.fr",
  ES: "www.amazon.es",
  IT: "www.amazon.it",
};

function tagFor(marketplace: Marketplace): string {
  const tags: Record<Marketplace, string | undefined> = {
    US: process.env.NEXT_PUBLIC_AMAZON_TAG_US,
    UK: process.env.NEXT_PUBLIC_AMAZON_TAG_UK,
    CA: process.env.NEXT_PUBLIC_AMAZON_TAG_CA,
    DE: process.env.NEXT_PUBLIC_AMAZON_TAG_DE,
    FR: process.env.NEXT_PUBLIC_AMAZON_TAG_FR,
    ES: process.env.NEXT_PUBLIC_AMAZON_TAG_ES,
    IT: process.env.NEXT_PUBLIC_AMAZON_TAG_IT,
  };
  return tags[marketplace] || "";
}

/** Build a tagged Amazon link for a product. */
export function amazonLink(
  product: Pick<Product, "amazonAsin" | "amazonUrl">,
  marketplace: Marketplace = "US",
): string {
  const tag = tagFor(marketplace);
  if (product.amazonAsin) {
    const host = MARKETPLACE_HOSTS[marketplace];
    const base = `https://${host}/dp/${product.amazonAsin}`;
    return tag ? `${base}?tag=${tag}` : base;
  }
  if (product.amazonUrl) {
    const url = new URL(product.amazonUrl);
    if (tag) url.searchParams.set("tag", tag);
    return url.toString();
  }
  // Placeholder until an ASIN/URL is added in the CMS.
  return "#add-amazon-link";
}

export const PRICE_NOTE =
  "Prices and availability may change. We do not display live prices unless they are accurate and maintained.";
