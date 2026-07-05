import type { Metadata } from "next";
import { site } from "./site";
import type { Post } from "./types";

/** Build consistent metadata (title, canonical, OG, Twitter) for any page. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const url = `${site.url}${opts.path}`;
  const image = opts.image
    ? opts.image.startsWith("http")
      ? opts.image
      : `${site.url}${opts.image}`
    : `${site.url}/images/og-default.svg`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: opts.type ?? "website",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

export function postMetadata(post: Post): Metadata {
  const meta = pageMetadata({
    title: post.seoTitle || post.title,
    description: post.metaDescription,
    path: `/${post.slug}`,
    image: post.image,
    type: "article",
  });
  if (post.canonicalUrl) {
    meta.alternates = { canonical: post.canonicalUrl };
  }
  return meta;
}
