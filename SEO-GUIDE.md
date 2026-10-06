# Dynamic Travels — SEO Guide

## Part 1 — On-page SEO (already built into the website)

| What | Where |
|---|---|
| Unique title + description + canonical URL for every page | `app/layout.js`, `app/<page>/layout.js` |
| Open Graph / WhatsApp / Facebook share preview (1200×630 image) | `public/og-image.jpg` |
| Business schema (TravelAgency + TaxiService + LocalBusiness): name, phone, email, full address, 24/7 hours, services, ISO certificate | `app/layout.js` |
| FAQ rich results (FAQPage schema) | home page FAQ |
| Breadcrumb schema on inner pages | `app/<page>/layout.js` |
| Destinations list schema (ItemList / TouristDestination) | `/destinations` |
| `sitemap.xml` and `robots.txt` (admin, API, booking steps hidden from Google) | `app/sitemap.js`, `app/robots.js` |
| Web app manifest + icons (Add to Home Screen) | `app/manifest.js`, `app/icon.png` |
| Fast images: WebP copies, ~110 MB → 8.8 MB, lazy loading, responsive `srcset` | `public/images/web/` |
| Self-hosted fonts (no Google Fonts request) | `@fontsource-variable/*` |
| One H1 per page, keyword-rich H2s, descriptive image `alt` text | all pages |
| Keyword content block + 100+ Bengaluru service areas | home + footer |

### Do this right after going live
1. In `.env.local`, set `NEXT_PUBLIC_SITE_URL` to the real domain (e.g. `https://www.dynamictravels.in`). Canonicals, sitemap and schema all read it.
2. **Google Search Console** → add the domain → paste the verification code into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` → redeploy → submit `https://YOUR-DOMAIN/sitemap.xml`.
3. **Bing Webmaster Tools** → import from Search Console (or use `NEXT_PUBLIC_BING_SITE_VERIFICATION`).
4. Add social profile URLs (`NEXT_PUBLIC_INSTAGRAM_URL`, `..._FACEBOOK_URL`, `..._YOUTUBE_URL`, `..._GOOGLE_BUSINESS_URL`). They go into the schema `sameAs` field.
5. Test with Google's **Rich Results Test** and **PageSpeed Insights** (mobile).

---

## Part 2 — Off-page SEO (work done outside the website)

### 1. Google Business Profile — the #1 priority for a Bengaluru cab company
- Claim/verify the profile with the **exact** name, address and phone below.
- Primary category **Taxi service**; secondary: *Travel agency, Car rental agency, Bus charter, Tour operator, Airport shuttle service*.
- Add all services (Airport taxi, Outstation cabs, Tempo Traveller rental, Urbania rental, Bus hire…) with short descriptions.
- Upload 25+ real photos: every vehicle (inside and out), drivers in uniform, office, the expo photos and the ISO certificate. Add 2–3 new photos every week.
- Post a Google Update weekly (offers, new vehicle, festival trips, a route of the week).
- Turn on messaging and set hours to **Open 24 hours**.
- Answer the Q&A section yourself with the FAQ questions from the website.

### 2. NAP consistency — copy this exactly, everywhere
```
Dynamic Travels
No. 91, 1st Floor, 11th A Cross, Dasarahalli Main Road,
Bhuvaneshwari Nagar, Hebbal, Kempapura, Bengaluru, Karnataka 560024
+91 73490 16519 · dynamictours76@gmail.com · https://YOUR-DOMAIN
```
One spelling, one phone number, one website link. Inconsistent listings hurt local ranking.

### 3. Citations / directory listings (do 5 per week)
**Priority:** Justdial · Sulekha · IndiaMART · TradeIndia · Bing Places · Apple Business Connect (Apple Maps) · Facebook Page · Instagram Business · LinkedIn Company Page · YouTube channel.
**Travel-specific:** TripAdvisor (as a tour/transport provider) · Savaari / Gozo partner listings · MakeMyTrip & Yatra holiday partner programmes · Karnataka Tourism partner directories · BookMyBus/redBus group-hire partner where available.
**Local India directories:** Grotal · AskLaila · Yellow Pages India · Hotfrog · Cybo · Brownbook · TrueLocal India · ClickIndia · Quikr Services · OLX services (vehicle rental).

### 4. Reviews — the strongest trust and ranking signal
- After every completed trip, the driver or office sends the **Google review link** on WhatsApp (Google Business → *Ask for reviews* → copy link).
- Goal: 10 new genuine reviews per month. Reply to **every** review within 24 hours, using the service and place names naturally ("Thanks for travelling Bangalore to Coorg in our Innova Crysta!").
- Never buy or fake reviews. Google removes them and can suspend the profile.
- Once you have real reviews, a reviews section can be added to the home page.

### 5. Backlinks — quality over quantity
- Partner hotels, resorts, homestays and wedding venues in Coorg, Chikmagalur, Mysore and Ooty: exchange "recommended transport partner" links.
- Wedding planners, event companies and corporate travel desks in Bengaluru.
- Local news / PR: expo participation and the ISO certification are good story angles (Deccan Herald, The Hindu Bengaluru, Bangalore Mirror, Citizen Matters).
- Guest posts on Bengaluru travel blogs ("10 weekend trips from Bangalore by road").
- Quora + Reddit (r/bangalore): genuinely answer cab and road-trip questions and mention the service where it fits.
- Avoid paid link farms and "1000 backlinks for ₹999" offers. They cause penalties.

### 6. Content plan (add a /blog later; 2 posts per month)
Target real searches people type:
- Bangalore to Mysore cab fare & best route (2026)
- Bangalore airport taxi: timings, tolls & how to book
- Tempo Traveller vs Urbania: which is right for your group?
- 2-day Coorg trip from Bangalore by car — itinerary
- Bangalore to Ooty by road: ghat roads, stops, best season
- Tirupati darshan trip from Bangalore by cab
- Wedding car rental in Bangalore: a complete checklist
Each post should link to `/fleet`, `/destinations` and the booking form.

### 7. Social signals
- Instagram/YouTube Reels: vehicle walk-arounds, scenic route clips, happy-customer moments (with permission), driver introductions.
- Pin a WhatsApp booking link in every bio.
- Use location tags (Bengaluru, Mysore, Coorg) and keep handles identical everywhere.

### 8. Monthly checklist
- [ ] 8–10 new Google reviews, all replied to
- [ ] 4 Google Business posts + 8 new photos
- [ ] 5–10 new citations / directory listings
- [ ] 2 blog posts or long Google posts
- [ ] 2–3 quality backlinks (partners / PR / guest posts)
- [ ] Check Search Console: coverage errors, top queries, click-through rate
