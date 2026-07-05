# Launch Checklist — before applying to AdSense & Amazon Associates

Work top to bottom. Don't apply early: rejections cost weeks.

## Phase 1 — Technical launch (day 1–3)

- [ ] Deploy to Vercel; connect `onlifelikes.com` + HTTPS (README §5–6)
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://onlifelikes.com` and redeploy
- [ ] Connect Sanity and create categories/authors in the Studio (README §3)
- [ ] Set up a real mailbox for hello@ / editorial@ / advertise@onlifelikes.com (or update the addresses in `src/lib/site.ts` to ones you own)
- [ ] Create **Google Search Console** property → verify domain → submit `https://onlifelikes.com/sitemap.xml`
- [ ] Create **Bing Webmaster Tools** property (free extra traffic)
- [ ] Check every footer/policy page renders and the contact email is right

## Phase 2 — Content runway (week 1–6)

- [ ] Replace placeholder SVG featured images with original or properly licensed photos (Unsplash/Pexels license-checked, or your own) — keep descriptive alt text
- [ ] Publish the 18 remaining cluster articles from [CONTENT-PLAN-100.md](CONTENT-PLAN-100.md) (12 samples are pre-built → 30 total)
- [ ] Keep a steady cadence (3–7/week beats 20 in one day, for both Google and AdSense reviewers)
- [ ] Review the 12 built-in sample articles: personalize wording, add real ASINs when you have Associates accounts, adjust picks to current market
- [ ] Interlink: every article links to 2+ siblings; every category has 3+ articles
- [ ] Verify indexing in Search Console (URL inspection on 5–10 articles)

## Phase 3 — Amazon Associates application

Apply **per marketplace you'll actually serve** (US first; UK/DE/CA next; or use one account + OneLink where supported).

- [ ] 20+ substantial articles live, site 4–8 weeks old, some organic traffic
- [ ] About, Contact, Privacy Policy, Affiliate Disclosure pages live (✔ built)
- [ ] Apply at affiliate-program.amazon.com (US) with an honest traffic description
- [ ] After approval: put your tags in Vercel env vars (README §7) and add real ASINs to Product documents in the Studio
- [ ] ⚠️ You must generate **3 qualifying sales within 180 days** or the account closes (you can reapply)
- [ ] ⚠️ Never state prices scraped manually; keep the "prices may change" phrasing (✔ built-in)
- [ ] ⚠️ Keep the exact line "As an Amazon Associate I earn from qualifying purchases." visible (✔ in footer + disclosure page)

## Phase 4 — Google AdSense application

- [ ] 25–30+ original articles, most indexed, site 1–3 months old with real traffic
- [ ] Policy pages + cookie consent live (✔ built — consent gates ad scripts for EU)
- [ ] No copied content, no thin pages, no fake claims anywhere
- [ ] Apply at adsense.google.com → add the site → paste your `ca-pub-…` ID into `NEXT_PUBLIC_ADSENSE_CLIENT` and redeploy (the verification code is then served automatically)
- [ ] After approval: create ad units, fill the slot env vars, redeploy
- [ ] Keep density low at first — the pre-placed slots are enough; measure before adding more

## Phase 5 — Ongoing (monthly)

- [ ] Update 4–6 older guides (availability, better picks) and bump their "Last updated" date
- [ ] Check Search Console for rising queries → write matching articles from the backlog
- [ ] Fix broken Amazon links (Associates → Link Checker, or click-test top guides)
- [ ] Review AdSense placements vs Core Web Vitals in Search Console
- [ ] Grow email list; the newsletter box is wired — connect a provider via `NEXT_PUBLIC_NEWSLETTER_ACTION`
