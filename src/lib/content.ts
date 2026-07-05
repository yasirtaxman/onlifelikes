/**
 * Content data layer.
 *
 * All pages read content through these functions. The source is:
 *  - Sanity CMS, when NEXT_PUBLIC_SANITY_PROJECT_ID is set (daily publishing
 *    happens in the Studio at /studio — no code changes needed), plus the
 *    built-in sample posts as a fallback for anything not yet in the CMS.
 *  - The built-in sample content only, when Sanity isn't configured yet.
 */

import type { Author, Category, Post, PostCard } from "./types";
import { readingTime } from "./text";
import { localPosts } from "@/content/posts";
import { categories as localCategories, getCategory } from "@/content/categories";
import { authors as localAuthors, getAuthor } from "@/content/authors";
import { fetchSanityPosts, sanityConfigured } from "./sanity/fetch";

async function allPosts(): Promise<Post[]> {
  let posts: Post[] = [];
  if (sanityConfigured) {
    try {
      posts = await fetchSanityPosts();
    } catch (err) {
      console.error("Sanity fetch failed, falling back to local content:", err);
    }
  }
  // Merge: CMS posts win on slug collisions; local samples fill the rest.
  const bySlug = new Map<string, Post>();
  for (const p of localPosts) bySlug.set(p.slug, p);
  for (const p of posts) bySlug.set(p.slug, p);
  return [...bySlug.values()]
    .filter((p) => p.status === "published")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function toCard(post: Post): PostCard {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    type: post.type,
    categorySlug: post.categorySlug,
    image: post.image,
    imageAlt: post.imageAlt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    readingTime: readingTime(post),
    editorsPick: post.editorsPick,
  };
}

export async function getPosts(): Promise<Post[]> {
  return allPosts();
}

export async function getPostCards(): Promise<PostCard[]> {
  return (await allPosts()).map(toCard);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await allPosts()).find((p) => p.slug === slug);
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const posts = await allPosts();
  // The roundup categories also collect posts by article type.
  if (categorySlug === "buying-guides") {
    return posts.filter(
      (p) => p.type === "buying-guide" || p.categorySlug === categorySlug,
    );
  }
  if (categorySlug === "comparisons") {
    return posts.filter(
      (p) => p.type === "comparison" || p.categorySlug === categorySlug,
    );
  }
  if (categorySlug === "best-under-budget") {
    return posts.filter(
      (p) => p.type === "best-under-budget" || p.categorySlug === categorySlug,
    );
  }
  return posts.filter((p) => p.categorySlug === categorySlug);
}

export async function getPostsByAuthor(authorSlug: string): Promise<Post[]> {
  return (await allPosts()).filter((p) => p.authorSlug === authorSlug);
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<PostCard[]> {
  const posts = await allPosts();
  const picked: Post[] = [];
  for (const slug of post.relatedSlugs ?? []) {
    const found = posts.find((p) => p.slug === slug);
    if (found) picked.push(found);
  }
  if (picked.length < limit) {
    for (const p of posts) {
      if (picked.length >= limit) break;
      if (p.slug === post.slug) continue;
      if (picked.some((x) => x.slug === p.slug)) continue;
      if (p.categorySlug === post.categorySlug) picked.push(p);
    }
  }
  return picked.slice(0, limit).map(toCard);
}

export async function getEditorsPicks(limit = 4): Promise<PostCard[]> {
  const posts = await allPosts();
  const picks = posts.filter((p) => p.editorsPick);
  const rest = posts.filter((p) => !p.editorsPick);
  return [...picks, ...rest].slice(0, limit).map(toCard);
}

export async function getBuyingGuides(limit = 6): Promise<PostCard[]> {
  return (await allPosts())
    .filter((p) => p.type === "buying-guide" || p.type === "best-under-budget")
    .slice(0, limit)
    .map(toCard);
}

export function getCategories(): Category[] {
  return localCategories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategory(slug);
}

export function getAuthors(): Author[] {
  return localAuthors;
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return getAuthor(slug);
}
