# PRD — Mehta Enterprises Website ("Precision Forged")

## Original Problem Statement
Build a visually stunning, multi-page, mobile-first, modern website for Mehta Enterprises — a premium automotive sheet metal manufacturing company in Pune, India (est. 1986). Dark "Precision Forged" design: deep charcoal/navy UI, fiery crimson accents, brushed steel. Multi-page SPA (Home, About, Infrastructure, Products, Quality, Clients, Gallery, Careers, Contact, 404). React Router + Framer Motion + GSAP ScrollTrigger + Lenis smooth scrolling. Vanilla CSS with the exact design token system provided. No backend/CMS — static frontend. All content (company info, leadership, clients, milestones, awards, capabilities) provided verbatim in the brief with typo corrections applied.

## User Choices
- Use existing React (CRA) setup instead of Vite (approved by user)
- Contact/Career forms: frontend-only with success toast (sonner)
- Follow the spec 1:1 otherwise

## Architecture
- Frontend-only React SPA (CRA + craco) on port 3000; FastAPI backend untouched (unused)
- Vanilla CSS: `src/index.css` (design tokens + base), `src/App.css` (nav/footer/hero/home), `src/styles/pages.css` (inner pages)
- Data centralized in `src/data/content.js` (clients, milestones, awards, products, facilities, gallery, openings, image URLs)
- Shared components in `src/components/Shared.jsx` (Reveal, SectionHeading, AnimatedCounter, PageHero, PageWrap, SparkCanvas, EditorialMarquee), `Navbar.jsx` (glass nav + dropdowns + mobile overlay), `Footer.jsx`
- Pages in `src/pages/` (Home, About, Infrastructure, Products, Quality, Clients, Gallery, Careers, Contact, NotFound)
- Lenis smooth scroll wired in App.js; GSAP ScrollTrigger for About timeline scrub line
- 18 AI-generated images hosted on Emergent static CDN
- SEO: meta tags + JSON-LD ManufacturingBusiness schema + custom SVG favicon in public/index.html

## Implemented (June 2026)
- [x] Home: cinematic hero (masked line-by-line reveal, spark particle canvas, slow-zoom bg, ghost "FORGED" text), client marquee, numbered chapters (01–06), animated stats counters, why-us cards, awards carousel, infra masonry grid, editorial marquee, customers grid, crimson contact CTA band with form
- [x] About: vision/mission/values (5 value cards), company story, leadership bios (Chairman + Director with portraits), chairman's message quote layout, GSAP-scrubbed milestones timeline (1986–2018)
- [x] Infrastructure: 5 facility rows (Press Shop, Welding, Tool Room, Quality Lab, Storage) + 8-step process flow
- [x] Products: 6 category tabs (hash-deep-linkable from navbar dropdown), detail panel, hover-overlay showcase grid, capabilities table
- [x] Quality: policy + 4 policy points, IATF 16949 cert cards (x2), awards list
- [x] Clients: 8 domestic + 6 international cards with "since" years
- [x] Gallery: masonry with filters (All/Facility/Products/Team) + lightbox modal
- [x] Careers: perks, 4 openings, application form (toast)
- [x] Contact: form (toast), info cards, dark-styled Google Maps embed, group companies
- [x] Custom 404, mobile menu, page transitions, all content typos from old site fixed (Bajaj Tempo, GM Colombia, etc.), no placeholder social links

## Backlog / Next
- P1: Group photo lightbox on Infrastructure equipment images
- P2: World map visualization on Clients page
- P2: Wire forms to backend for stored submissions (if user later wants)
- P2: Production build + deployment
