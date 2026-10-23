# G-LIGHT — Website PRD (v2, revised after client brand feedback)

## 1. Brand positioning
- **Master brand:** G-LIGHT, with a descriptor line rather than "G-Light Electrical" everywhere — e.g. "G-LIGHT — Electrical & Energy Solutions" or "Engineering • Energy • Power."
- **Tagline:** Powering progress.
- **Core idea:** G-LIGHT engineers the power systems that keep people, businesses and infrastructure moving — electrical engineering, solar energy, power systems, maintenance and energy consulting, not just installation.
- **Brand words:** Power, Engineering, Innovation, Reliability, Progress.
- **Tone shift:** away from "local electrician," toward a technical, scalable energy/engineering company. Ambition (commercial, industrial, eventually international) is communicated, not claimed outright — no false claims of work not yet done.

## 2. Visual identity
- **Palette:** near-black / deep charcoal as primary, electric blue as the brand color, white and metallic grey as secondary, a small amber accent retained to match the existing logo's glow (open to revisiting if the logo is redesigned).
- **Typography:** bold, technical display face for headings; clean sans for body — carried over from the current build.
- **Imagery:** real project photography preferred over stock. Until available, abstract energy/circuit-style graphics built from the "G" mark stand in for the cinematic hero image the client described.
- **Logo:** current mark has "ELECTRICAL" in the wordmark. A G-only crop can represent "G-LIGHT" as the master brand without a full logo redesign; full redesign is a separate decision for the client.

## 3. Scope — Phase 1 (launch)
Pages:
1. **Home** — hero ("Engineering power. Enabling progress." or similar), brand statement, capabilities overview, featured projects, metrics bar, CTA.
2. **About** — story, mission/vision, values ("Why G-LIGHT": Engineered, Reliable, Innovative, Built to last), certifications, team.
3. **Capabilities** — Electrical Engineering, Solar Energy (kept visible as its own section given it's a major line), Power Systems, Commercial & Industrial, Maintenance & Support, Energy Consulting.
4. **Projects** — database-driven. Each project: name, location, client/sector, year, type, system capacity, services provided, technology, images, description. Seeded with real projects only (e.g. Seaside Hotels Sagbama, Everlight Hotel & Suites Yenagoa, Otuoke residential development, African University Toro Orua) — all pending the client's confirmation of details and permission to publish.
5. **Contact / Start a Project** — shortened intake: name, phone or email, project type, description required; location, estimated size, budget, timeline optional. File upload for drawings/documents if feasible. Short privacy notice given the personal data collected.

Backend (Django/DRF):
- `Project` model expanded: name, location, client/sector, year, category (updated to match the six capabilities), system capacity, services provided, technology, description, images, featured flag.
- `ContactSubmission` model gains a `status` field (New → Contacted → Quoted → Negotiation → Won → Completed), manageable from Django admin — this is the "lightweight CRM" for launch, not a custom dashboard.
- Stats (years in business, projects delivered, etc.) as editable admin fields, not auto-counted, since real project entries won't match marketing numbers until the backlog is uploaded.

## 4. Scope — Phase 2 (deferred)
- **Insights** page (technical articles) — held until 3–4 real, reviewed articles exist; an empty blog hurts more than no blog.
- **Custom admin dashboard** (overview tiles, lead pipeline visualization) beyond what Django admin already provides.
- **"From Nigeria. Built for the world"** section with animated map — ambition messaging, treated as a later visual flourish rather than launch-critical.
- Expanded Start-a-Project form fields (budget range, full document uploads with storage) if the shortened version proves insufficient.

## 5. Open items needing client confirmation
- Final capability list: confirm appliance installation and interior decoration are intentionally dropped from the six capability cards (or should be folded in explicitly).
- Who holds responsibility for "Energy Consulting" claims (engineer of record, registration/certifications) — needed before publishing that capability.
- Confirmation of real numbers: years in business, years in solar, project count, states served — no placeholder stats ship to production.
- Written permission from named clients (Seaside Hotels, Everlight Hotel & Suites, Otuoke development, African University) before publishing project details publicly.
- Decision on logo: G-only crop for now, or full redesign later.
- Confirmation of "24/7" as an actual operational commitment before it's published as a claim.

## 6. Design requirements (carried over / updated)
- Primary: near-black / deep charcoal
- Brand accent: electric blue
- Secondary: white, metallic grey
- Retained accent: amber (logo-matching), pending logo decision
- Mobile-first, responsive (already implemented sitewide)

## 7. Technical requirements (carried over)
- Frontend: React, component-based (existing Navbar/Footer/CTASection/Reveal components carried forward)
- Backend: Django + DRF, SQLite for dev — Project and Contact apps already scaffolded, to be extended per Section 3
- Hosting: React on static hosting (Vercel/Netlify); Django on a host with a database (Render/Railway)

## 8. Success metrics
- Start-a-Project submissions per month, and lead status progression through the pipeline
- Time on Capabilities and Projects pages
- Bounce rate on Home

## 9. Non-goals (Phase 1)
- No e-commerce/payment processing
- No customer login/account system
- No Insights/blog content until real articles are ready
- No custom dashboard beyond Django admin