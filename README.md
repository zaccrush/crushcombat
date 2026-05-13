# Crush Combat

**Architects of the Combat Economy.** Southeast Asia's MMA talent agency and broadcast media house. Powering Khmer Flow Arena.

Production: https://crushcombat.com

## Stack

- Astro 5 (static)
- React 19 (islands only)
- Tailwind CSS 4
- Cloudflare Pages (hosting)

## Develop

```bash
npm install
npm run dev          # http://localhost:4321
```

## Build

```bash
npm run build        # writes ./dist
npm run preview      # serves ./dist
```

## Deploy

```bash
# One-shot from local (requires wrangler login):
npm run deploy

# Or push to main — GitHub Actions deploys via Cloudflare Pages.
```

## Content

- Fighter profiles: `src/content/fighters/*.md`
- Fighter assets: `src/assets/fighters/`
- Partners / sponsors: `src/data/partners.json` (hidden when tier-filtered array is empty)
- Translations: `src/data/translations.ts`

## Section structure

`src/pages/index.astro` composes `src/components/landing/`:

1. `Hero` — agency-positioned dual CTA
2. `AgencyProof` — KPI band
3. `DisciplineSelector` — MMA · Kun Khmer · Grappling
4. `RosterStrip` — featured fighters
5. `UpcomingFights` — KFA event cards
6. `MediaHouse` — broadcast capabilities
7. `Mission` — Lethwei FC kinship editorial
8. `StorytellingTrio` — article / video / fighter spotlight
9. `PartnerLogos` (sponsor) — data-driven
10. `PartnerLogos` (promotion) — data-driven
11. `ApparelCallout` — outbound to khmerflow.com
12. `ApplyCTA` — bottom conversion catch

## Ecosystem

- **Khmer Flow Arena (KFA)** — sole promotion partner today; aggregator vision
- **Khmer Flow** (khmerflow.com) — official apparel
- **Lethwei Fighting Championship** — kindred mission, ancient martial arts preservation
