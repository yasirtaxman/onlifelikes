import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "home-living",
    title: "Home & Living",
    description:
      "Practical ideas, useful products, and simple habits that make your home more comfortable, organized, and enjoyable every day.",
    seoText:
      "Home & Living at On Life Likes covers the everyday side of running a home: organization systems that actually stick, furniture and decor choices that work in real houses and apartments, and small upgrades with outsized impact. Our guides are research-based — we compare features, materials, sizing, and real buyer needs so you can make a confident choice without spending a weekend reading spec sheets.",
    image: "/images/categories/home-living.svg",
    imageAlt: "Illustration of a cozy living room in sage and forest green tones",
    relatedCategorySlugs: ["small-spaces", "bedroom-sleep", "cleaning"],
    faqs: [
      {
        question: "What kind of home topics do you cover?",
        answer:
          "We cover organization, storage, furniture, decor, laundry, entryways, and everyday household routines — always with a practical, budget-aware angle.",
      },
      {
        question: "Do you test every product you recommend?",
        answer:
          "Not always. Each guide states its review method clearly: tested, research-based, expert-reviewed, or updated. We never claim hands-on testing that didn't happen.",
      },
    ],
  },
  {
    slug: "cleaning",
    title: "Cleaning",
    description:
      "Cleaning routines, tools, and honest product guides that help you keep a cleaner home with less time and effort.",
    seoText:
      "The Cleaning section of On Life Likes helps you build a low-effort cleaning system: which vacuum type actually suits your floor plan, which tools earn their storage space, and which routines keep mess from piling up. Our vacuum and cleaning-tool guides are research-based comparisons built on specifications, capacity, run time, and buyer needs — and we update them as products change.",
    image: "/images/categories/cleaning.svg",
    imageAlt: "Illustration of cleaning tools in sage and forest green tones",
    relatedCategorySlugs: ["home-living", "small-spaces", "pets-at-home"],
    faqs: [
      {
        question: "Robot vacuum or cordless stick — which should I buy first?",
        answer:
          "If you want daily maintenance with zero effort, start with a robot vacuum. If you want one flexible tool for floors, stairs, and quick messes, start cordless. Our comparison guide walks through both.",
      },
      {
        question: "How often do you update cleaning product guides?",
        answer:
          "We review buying guides regularly for availability and product changes, and each article shows its last-updated date.",
      },
    ],
  },
  {
    slug: "kitchen",
    title: "Kitchen",
    description:
      "Kitchen tools, compact appliances, and organizing ideas that make cooking easier — especially in smaller kitchens.",
    seoText:
      "On Life Likes Kitchen focuses on tools that earn their counter space. We compare compact coffee makers, air fryers, gadgets under $50, and organizers by size, capacity, cleanup effort, and value — because a small kitchen punishes bad purchases fast. Guides are research-based, built from product specifications and real buyer needs, and updated for availability.",
    image: "/images/categories/kitchen.svg",
    imageAlt: "Illustration of kitchen tools in sage and forest green tones",
    relatedCategorySlugs: ["small-spaces", "home-living", "best-under-budget"],
    faqs: [
      {
        question: "Do your kitchen guides focus on small kitchens?",
        answer:
          "Many do, because compact tools are where buying mistakes hurt most. But our picks work in any kitchen — we flag size and capacity clearly in every guide.",
      },
    ],
  },
  {
    slug: "smart-home",
    title: "Smart Home",
    description:
      "Beginner-friendly smart home guides: plugs, lights, speakers, and simple setups that work in apartments and rentals.",
    seoText:
      "Smart Home at On Life Likes is written for normal households, not tech enthusiasts with server racks. We explain what smart plugs, bulbs, and displays actually do day to day, which ecosystems play nicely together, and how renters can automate without rewiring anything. Recommendations are research-based, built on compatibility, setup simplicity, and everyday usefulness.",
    image: "/images/categories/smart-home.svg",
    imageAlt: "Illustration of smart home devices in sage and forest green tones",
    relatedCategorySlugs: ["home-office", "home-living", "small-spaces"],
    faqs: [
      {
        question: "Do I need a smart hub to start?",
        answer:
          "Usually not. Most smart plugs and bulbs connect straight to Wi-Fi and work with the Alexa or Google Home app on your phone. Hubs matter later, if you expand into many devices.",
      },
      {
        question: "Will smart devices work in a rental?",
        answer:
          "Yes — plugs, bulbs, battery cameras, and stick-on sensors need no wiring and leave no marks. Our renter's setup guide covers a full no-drill approach.",
      },
    ],
  },
  {
    slug: "small-spaces",
    title: "Small Spaces",
    description:
      "Space-saving furniture, clever storage, and layout ideas that make small apartments and rooms feel bigger.",
    seoText:
      "Small Spaces is one of our core specialties. We research foldable furniture, vertical storage, entryway organizers, and layout tricks that make studio apartments and compact rooms live larger. Every product pick is filtered for footprint, dual function, and renter-friendliness, and every how-to is written for real apartments — not showroom staging.",
    image: "/images/categories/small-spaces.svg",
    imageAlt: "Illustration of a compact apartment layout in sage and forest green tones",
    relatedCategorySlugs: ["home-living", "kitchen", "home-office"],
    faqs: [
      {
        question: "What counts as a small space?",
        answer:
          "Our guides target studios, one-bedroom apartments, dorms, and any room where every square foot has to work — roughly under 700 sq ft (65 m²) of living space.",
      },
      {
        question: "Are your picks renter-friendly?",
        answer:
          "We prioritize no-drill, freestanding, and removable solutions, and we flag anything that needs wall mounting.",
      },
    ],
  },
  {
    slug: "home-office",
    title: "Home Office",
    description:
      "Desks, chairs, lighting, and setup guides for a comfortable, productive home office — even in a corner of the living room.",
    seoText:
      "The Home Office section helps remote and hybrid workers build a setup that doesn't wreck their back or their budget. We compare desk lamps, compact office chairs, standing desk converters, and full setups under set budgets, using ergonomics guidance, product specifications, and space constraints as our filters. Research-based, honest, and updated as products change.",
    image: "/images/categories/home-office.svg",
    imageAlt: "Illustration of a home office desk in sage and forest green tones",
    relatedCategorySlugs: ["small-spaces", "smart-home", "best-under-budget"],
    faqs: [
      {
        question: "How much should a decent home office setup cost?",
        answer:
          "A comfortable, ergonomic starter setup is realistic around $300 — our budget setup guide shows exactly how to allocate it across chair, lighting, and desk accessories.",
      },
    ],
  },
  {
    slug: "pets-at-home",
    title: "Pets at Home",
    description:
      "Pet cameras, hair-removal tools, beds, and home solutions that keep the house clean and pets comfortable.",
    seoText:
      "Pets at Home covers the intersection of pet life and home life: cameras that let you check in from work, vacuums that actually handle shedding, cat trees that fit apartments, and beds sized for real dogs. We compare products on capacity, durability, noise, and pet-specific features, and we say plainly when a pick is research-based rather than tested.",
    image: "/images/categories/pets-at-home.svg",
    imageAlt: "Illustration of pets at home in sage and forest green tones",
    relatedCategorySlugs: ["cleaning", "home-living", "small-spaces"],
    faqs: [
      {
        question: "Do robot vacuums really handle pet hair?",
        answer:
          "Good ones do, if you match suction, brush design, and bin size to your pet situation. Our pet-hair robot vacuum guide explains which specs matter and why.",
      },
    ],
  },
  {
    slug: "bedroom-sleep",
    title: "Bedroom & Sleep",
    description:
      "Bedroom organization, sleep-friendly lighting, bedding basics, and calm-room ideas for better rest.",
    seoText:
      "Bedroom & Sleep focuses on the room where comfort matters most. We cover storage for small bedrooms, lighting that supports winding down, bedding fundamentals, and simple layout changes that make a bedroom feel calmer. Product recommendations are research-based, comparing materials, sizing, and value.",
    image: "/images/categories/bedroom-sleep.svg",
    imageAlt: "Illustration of a calm bedroom in sage and forest green tones",
    relatedCategorySlugs: ["small-spaces", "home-living", "smart-home"],
  },
  {
    slug: "outdoor-garden",
    title: "Outdoor & Garden",
    description:
      "Balcony, patio, and small-garden ideas: compact furniture, easy plants, and outdoor gear that fits your space.",
    seoText:
      "Outdoor & Garden helps you get more from balconies, patios, and small yards. We focus on compact outdoor furniture, container gardening, low-maintenance plants, and seasonal prep — with the same research-based, budget-aware approach we use indoors.",
    image: "/images/categories/outdoor-garden.svg",
    imageAlt: "Illustration of a balcony garden in sage and forest green tones",
    relatedCategorySlugs: ["small-spaces", "home-living", "cleaning"],
  },
  {
    slug: "buying-guides",
    title: "Buying Guides",
    description:
      "Research-based product guides that compare features, specs, and value — so you can buy once and buy right.",
    seoText:
      "Our Buying Guides collect the best products for a specific need — vacuums for apartments, lamps for home offices, gadgets under $50 — and explain who each pick suits and why. Every guide states its review method, discloses affiliate links, lists how we chose, and gets updated for availability. We never accept payment for a positive recommendation.",
    image: "/images/categories/buying-guides.svg",
    imageAlt: "Illustration of product comparison cards in sage and forest green tones",
    relatedCategorySlugs: ["comparisons", "best-under-budget"],
    faqs: [
      {
        question: "How do you make money from buying guides?",
        answer:
          "Some links are affiliate links — if you buy through them, we may earn a commission at no extra cost to you. This never changes our recommendations, and every guide with affiliate links says so at the top.",
      },
      {
        question: "Are your recommendations independent?",
        answer:
          "Yes. Brands cannot pay for placement or positive coverage, and advertising is always kept separate from editorial picks. See our Product Review Policy for details.",
      },
    ],
  },
  {
    slug: "best-under-budget",
    title: "Best Under Budget",
    description:
      "The best products under $25, $50, $100, and more — real value picks, not just the cheapest thing available.",
    seoText:
      "Best Under Budget rounds up genuinely good products under a fixed price: kitchen gadgets under $50, cleaning tools under $50, office setups under $300. We filter by build quality, usefulness, and long-term value — cheap junk that fails in a month is not a deal, and we treat it that way.",
    image: "/images/categories/best-under-budget.svg",
    imageAlt: "Illustration of budget-friendly product picks in sage and forest green tones",
    relatedCategorySlugs: ["buying-guides", "comparisons"],
  },
  {
    slug: "comparisons",
    title: "Product Comparisons",
    description:
      "Head-to-head comparisons that settle the 'this or that' question: features, trade-offs, and who should pick which.",
    seoText:
      "Product Comparisons put two options side by side — robot vacuum vs cordless, Alexa vs Google Home — and give you a straight answer: who should choose each one. We build these from specifications, ecosystem compatibility, and real-use trade-offs, with a quick verdict up top for readers in a hurry.",
    image: "/images/categories/comparisons.svg",
    imageAlt: "Illustration of two products compared side by side in sage and forest tones",
    relatedCategorySlugs: ["buying-guides", "best-under-budget"],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
