import type { Author } from "@/lib/types";

export const authors: Author[] = [
  {
    slug: "maya-collins",
    name: "Maya Collins",
    role: "Founder & Lead Editor",
    bio: "Maya founded On Life Likes to help people make smarter everyday purchases without the hype. She specializes in small-space living and home organization, and personally reviews every guide before it's published. Her golden rule: if a product wouldn't survive in her own 550 sq ft apartment, it doesn't get recommended.",
    image: "/images/authors/maya-collins.svg",
    expertise: ["Small spaces", "Home organization", "Buying guides"],
  },
  {
    slug: "daniel-reyes",
    name: "Daniel Reyes",
    role: "Home Tech & Smart Home Editor",
    bio: "Daniel covers smart home devices, home office gear, and cleaning tech. He has spent a decade explaining technology to non-technical readers and believes a smart home should make life quieter, not busier. He writes our comparison guides and keeps ecosystem compatibility notes up to date.",
    image: "/images/authors/daniel-reyes.svg",
    expertise: ["Smart home", "Home office", "Robot vacuums"],
  },
  {
    slug: "sophie-verhoeven",
    name: "Sophie Verhoeven",
    role: "Kitchen & Everyday Living Editor",
    bio: "Sophie writes about kitchens, cleaning routines, and pet-friendly homes for readers across the US and Europe. She focuses on compact tools that earn their space and routines that actually survive a busy week. She keeps our budget guides honest — value first, price second.",
    image: "/images/authors/sophie-verhoeven.svg",
    expertise: ["Kitchen tools", "Cleaning routines", "Pets at home"],
  },
];

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
