# On Life Likes — onlifelikes.com

**Practical picks for better everyday living.**

A premium lifestyle & product-help website built with Next.js 16, TypeScript, Tailwind CSS 4, and Sanity CMS. Monetized with Google AdSense and the Amazon Associates program (US, UK, CA, DE, FR, ES, IT).

---

## Contents

1. [Quick start](#1-quick-start)
2. [Project structure](#2-project-structure)
3. [CMS setup (Sanity)](#3-cms-setup-sanity)
4. [Daily publishing workflow](#4-daily-publishing-workflow)
5. [Deploying on Vercel](#5-deploying-on-vercel)
6. [Connecting onlifelikes.com](#6-connecting-onlifelikescom)
7. [Amazon affiliate links](#7-amazon-affiliate-links)
8. [Google AdSense](#8-google-adsense)
9. [Google Analytics](#9-google-analytics)
10. [Adding categories & authors](#10-adding-categories--authors)
11. [Homepage featured articles](#11-homepage-featured-articles)
12. [Before applying to AdSense & Amazon](#12-before-applying-to-adsense--amazon)

More docs in [`/docs`](docs/): **[100-article content plan](docs/CONTENT-PLAN-100.md)** · **[Content templates](docs/CONTENT-TEMPLATES.md)** · **[Launch checklist](docs/LAUNCH-CHECKLIST.md)**

---

## 1. Quick start

```bash
# Requirements: Node.js 20+ and npm

npm install          # install dependencies
cp .env.example .env.local   # create your local env file (edit values later)
npm run dev          # start dev server → http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

The site works **immediately with zero configuration** — it ships with 12 complete sample articles, 12 categories, and 3 authors as built-in content. Once you connect Sanity (step 3), articles you publish in the CMS appear automatically and take priority.

## 2. Project structure

```
onlifelikes/
├── src/
│   ├── app/                  # Pages (App Router)
│   │   ├── page.tsx          # Homepage
│   │   ├── [slug]/           # Article + category pages (clean root URLs)
│   │   ├── authors/          # Author list + profiles
│   │   ├── search/           # Client-side search
│   │   ├── studio/           # Sanity Studio (the CMS admin) at /studio
│   │   ├── sitemap.ts        # /sitemap.xml
│   │   ├── robots.ts         # /robots.txt
│   │   ├── feed.xml/         # RSS feed
│   │   └── about, contact, editorial-policy, … (all policy pages)
│   ├── components/           # 25+ reusable components (cards, tables, boxes…)
│   ├── content/              # Built-in sample content (posts, categories, authors)
│   └── lib/                  # Content layer, SEO, JSON-LD, affiliate links
├── sanity/                   # CMS schemas (articles, products, FAQ, SEO fields…)
├── sanity.config.ts          # Studio configuration
├── public/images/            # Original SVG placeholder art (replace with photos)
├── docs/                     # Content plan, templates, launch checklist
└── .env.example              # Every environment variable, documented
```

**How content works:** all pages read through `src/lib/content.ts`. If Sanity is configured, published CMS articles are fetched (revalidated every 5 minutes) and merged over the local samples; otherwise the local samples serve alone. One rendering pipeline (`PostBody`) handles both.

## 3. CMS setup (Sanity)

Sanity's free plan is more than enough to run this site.

1. Create an account at **[sanity.io](https://www.sanity.io)** and click **Create project** at [sanity.io/manage](https://www.sanity.io/manage). Name it "On Life Likes", dataset **production**.
2. Copy the **Project ID** (looks like `ab12cd34`).
3. In `.env.local` (and later in Vercel), set:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=ab12cd34
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API → CORS origins**, add:
   - `http://localhost:3000`
   - `https://onlifelikes.com` (and your `*.vercel.app` preview URL)
   with **Allow credentials** checked.
5. Restart the dev server and open **`/studio`** — that's your admin panel. Log in with your Sanity account.
6. First-time setup inside the Studio (~10 minutes, once):
   - Create your **Categories** with slugs matching the site's categories (`home-living`, `cleaning`, `kitchen`, `smart-home`, `small-spaces`, `home-office`, `pets-at-home`, `bedroom-sleep`, `outdoor-garden`, `buying-guides`, `best-under-budget`, `comparisons`).
   - Create your **Authors** (slug `maya-collins` etc., or your own — if you invent new ones, also add them to `src/content/authors.ts` so bios/pages render).

**Who can log in:** invite editors in sanity.io/manage → Members. No code access needed to publish.

## 4. Daily publishing workflow

Publish a new article every day without touching code:

1. Open **onlifelikes.com/studio** and log in.
2. Click **Articles → + (New)**.
3. Choose the **Article type** (buying guide, comparison, how-to, best-under-budget…).
4. Fill **Title**, click **Generate** next to the slug, pick **Category** and **Author**, write the **Excerpt**, upload a **Featured image** and write its **alt text**.
5. Write the body. Use the **+** menu inside the editor to insert:
   - **Product card** (references a reusable Product — create products under *Products* with name, summary, pros/cons, and the Amazon ASIN or URL)
   - **Comparison table**, **Pros & cons**, **Callout box**, **Quick verdict**, **How we chose**, **Ad slot**, **CTA button**, **Image**
6. Add **FAQs** (they render as an accordion and emit FAQ schema).
7. Open the **SEO** tab: SEO title, meta description, focus keyword, secondary keywords, and tick the **content quality checklist**.
8. Open the **Settings** tab: set **Status → Published**, the **Published date**, the **Review method** (be honest — "researched" unless you truly tested), and toggle **Contains affiliate links** if it does.
9. Click **Publish**.
10. The live site picks it up automatically within 5 minutes (ISR revalidation). No deploy needed.

To edit later: open the article, change anything, update **Last updated date**, publish again.

## 5. Deploying on Vercel

1. Push this repository to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repo. Vercel auto-detects Next.js — accept the defaults.
3. In **Project → Settings → Environment Variables**, add everything from your `.env.local` (at minimum `NEXT_PUBLIC_SITE_URL`, the Sanity vars, and your Amazon tags).
4. Deploy. Every push to the main branch redeploys automatically; CMS publishing needs **no** redeploys.

## 6. Connecting onlifelikes.com

1. In Vercel → your project → **Settings → Domains**, add `onlifelikes.com` and `www.onlifelikes.com` (redirect www → apex, or the reverse — pick one and stay consistent).
2. At your domain registrar, set the DNS records Vercel shows you:
   - **A record** for `onlifelikes.com` → `76.76.21.21`
   - **CNAME** for `www` → `cname.vercel-dns.com`
   (Vercel displays the current values — use those if they differ.)
3. Wait for DNS propagation (minutes to a few hours). Vercel provisions HTTPS automatically.
4. Confirm `NEXT_PUBLIC_SITE_URL=https://onlifelikes.com` is set in Vercel env vars, then redeploy once so sitemap/OG/canonical URLs use the real domain.

## 7. Amazon affiliate links

1. Join **Amazon Associates** in each market you target (US: affiliate-program.amazon.com; also available for UK, CA, DE, FR, ES, IT). See the [launch checklist](docs/LAUNCH-CHECKLIST.md) before applying.
2. Put your tracking IDs in the environment (`.env.local` + Vercel):
   ```
   NEXT_PUBLIC_AMAZON_TAG_US=yourtag-20
   NEXT_PUBLIC_AMAZON_TAG_UK=yourtag-21
   ... (CA, DE, FR, ES, IT)
   ```
3. In the CMS, each **Product** document has an **Amazon ASIN** field (the `B0XXXXXXXX` code in any Amazon product URL). With an ASIN, the site builds correctly tagged links automatically; a full **Amazon URL** works as a fallback (your tag is appended).
4. Every product card renders a **"Check price on Amazon"** button with `rel="nofollow sponsored"` and a "prices may change" note. The affiliate disclosure box appears automatically on any article with **Contains affiliate links** toggled on, and the required Associates line is permanently in the footer.
5. **Updating links later:** products are reusable documents — fix the ASIN once in *Products* and every guide using that product updates.
6. Optional: enroll in **Amazon OneLink** to auto-localize US links for international visitors.

## 8. Google AdSense

1. Apply at [adsense.google.com](https://adsense.google.com) **after** the site has real content and traffic (see the [launch checklist](docs/LAUNCH-CHECKLIST.md)).
2. Once approved, set in Vercel env vars:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE=1234567890   # create ad units in AdSense
   ```
3. Redeploy. That's it — the `AdSlot` components already sit in safe positions (in-article, homepage, category pages) with fixed heights (no layout shift), and the AdSense script loads **only after cookie consent** — compliant for EU visitors. Until then, quiet placeholders render.
4. Ad density is deliberately conservative. Add more slots only by placing `<AdSlot />` components or "Ad slot" blocks in the CMS editor — never stack them.

## 9. Google Analytics

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` in env vars and redeploy. GA4 loads only after cookie consent, with IP anonymization.

**Privacy-friendly alternative:** set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=onlifelikes.com` instead (requires a Plausible account). Plausible is cookieless, so it runs without the consent gate.

## 10. Adding categories & authors

Categories live in `src/content/categories.ts` (title, description, SEO text, FAQs, related categories, image). To add one:

1. Add an entry there (copy an existing block, change slug/title/texts).
2. Add a matching SVG (or photo) in `public/images/categories/`.
3. Create the same category (same slug!) in the Studio so articles can select it.
4. Optionally add it to `mainNav` in `src/lib/site.ts` to show it in the header.

Authors: same pattern in `src/content/authors.ts` + an Author document in the Studio with the same slug.

## 11. Homepage featured articles

The homepage assembles itself:

- **Editor's picks** = articles with the **"Feature in homepage Editor's Picks"** toggle (Settings tab in the Studio; `editorsPick: true` in local content). The newest pick becomes the big featured card.
- **Latest articles** = automatic, by publish date.
- **Topic sections** (Smart Home / Cleaning / Kitchen / Small Spaces) = newest three articles in each category, automatic.

So to change the homepage: toggle Editor's Pick on/off in the CMS. Done.

## 12. Before applying to AdSense & Amazon

Short version — the full checklist is in [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md):

- **20–30+ original articles** published over several weeks (use the [content plan](docs/CONTENT-PLAN-100.md)), site connected to the real domain with HTTPS.
- All policy pages live (they already are), real contact email working.
- Replace placeholder SVG art with original or properly licensed photos.
- Submit the sitemap in **Google Search Console** and get pages indexed first.
- **Amazon note:** you must make 3 qualifying sales within 180 days of joining Associates, and you may not use Amazon links before acceptance in some regions — apply when you have some traffic.

---

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript check |

### Compliance guardrails built in

- Affiliate disclosure above the fold on affiliate articles + global footer line.
- `rel="nofollow sponsored"` on all Amazon links.
- No live prices — "prices and availability may change" phrasing everywhere.
- Honest review-method labels; no Review/star schema on research-based guides.
- Cookie consent gates ads & analytics for US/EU visitors.
- Ads never in misleading positions; no "click the ads" wording anywhere.
