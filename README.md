# 🧭 InternNow

**Internships & volunteering for students — mapped, by industry.**

InternNow is a free, national directory that helps **high school and college
students** discover internships, fellowships, programs, and volunteering
opportunities, and actually prepare to apply. Explore a real US **map**, filter
by **industry** and grade level, and open any opportunity for its official link
plus a likely process, **sample supplements**, and **tips**.

## ✨ Features

- **🗺️ National map** — a real, zoomable Leaflet/OpenStreetMap view. Pins are colored by industry and cluster together until you zoom into a city, with a dedicated **nationwide programs** section.
- **🏭 Industry filters** — Technology, Business & Finance, Law & Justice, Arts & Culture, Science & Research, Healthcare, Government & Policy, Nonprofit, Education, Media & Journalism, and Environment.
- **🔎 Powerful browse** — search + filters for industry, audience (HS/college), type, and state.
- **📄 Rich detail pages** — official website link, "what the process can look like", **sample supplement prompts & answers**, **tips to stand out**, and a **Connect & learn more** section (LinkedIn/socials + how to reach them).
- **👤 Accounts + profiles** — email/password accounts with a student profile (grade, interests, skills, location).
- **🎯 "For You" feed** — personalized recommendations that explain *why* each opportunity matches your profile.
- **📝 Résumé & cover letter builder** — guided, section-by-section builders with a live, printable preview; documents save to your account.
- **🎤 Interview prep + resource library** — STAR method, common/mock questions, and how-to guides (networking, cold emails, first internship, and more).
- **🧭 Career-fit quiz + "Get Ready" path** — 8 questions map you to fields, then a step-by-step prep checklist.
- **🃏 Discover (swipe)** — swipe right to save, left to skip through opportunities.
- **🗓️ Deadline calendar** — application windows grouped by season with an "opening soon" view.
- **♿ Equity & access** — filter by communities served (first-gen, low-income, students of color, women in STEM) and by remote/hybrid; a beginner **"Start here"** onboarding.
- **⭐ Save + deadline tracker** — bookmark opportunities and track status, personal deadlines, and notes.
- **📱 Responsive** — works great on phones and desktops.

## 🏢 Organizations included

Real, verified programs across industries, including **SEO (Sponsors for
Educational Opportunity)**, **Seeds of Fortune**, **America On Tech**, **Genesys
Works**, **Girls Who Code**, **NASA OSTEM**, **Year Up United**, **Legal
Outreach**, the **Smithsonian**, **Bank of America Student Leaders**, **The Met**,
**Idealist**, **Coro**, and the **NIH Summer Internship Program**.

> **Accuracy note:** organization names, descriptions, and links are factual and
> point to each org's official site. The interview steps, sample supplement
> prompts/answers, and tips are **illustrative examples** created by InternNow to
> help applicants prepare — they are not any organization's official materials.
> InternNow is an independent, student-built resource and is not affiliated with
> the organizations listed.

## 🧱 Tech stack

| Layer     | Choice                                        |
| --------- | --------------------------------------------- |
| Framework | Next.js (App Router) + TypeScript             |
| Styling   | Tailwind CSS                                  |
| Map       | Leaflet + React-Leaflet + marker clustering   |
| Content   | Typed, curated catalog (`lib/catalog.ts`)     |
| Database  | Prisma ORM + SQLite (users, profiles, documents) |
| Auth      | `jose` JWT session cookies + `bcryptjs`       |
| Tracker   | Browser localStorage (saved list + deadlines) |

## 🚀 Getting started

```bash
npm install
npm run setup      # generate Prisma client + create the SQLite database
npm run dev
```

Open <http://localhost:3000>, create a free account, fill in your profile, and
your **For You** feed and document builders unlock.

### Scripts

| Script          | What it does                               |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start the dev server                       |
| `npm run setup` | Generate Prisma client + create the DB     |
| `npm run build` | Production build (also generates Prisma)   |
| `npm run start` | Run the production build                   |

## 🔧 Configuration

Environment variables live in `.env` (see `.env.example`):

- `DATABASE_URL` — SQLite file path (default `file:./dev.db`)
- `AUTH_SECRET` — secret used to sign session cookies. **Change this in production.**

## ➕ Adding an opportunity

Add an entry to the `OPPORTUNITIES` array in [`lib/catalog.ts`](lib/catalog.ts).
Each opportunity includes its industries, audiences, types, locations (with
lat/lng so it appears on the map), and prep content. Everything else — cards,
map pins, industry pages, filters — updates automatically.

## 🗺️ Roadmap

Planned platform features (need real users and/or a hosted backend):

- Reviews & testimonials from past interns
- Discussion forums / Q&A
- Mentorship matching
- Email/push notifications for deadlines and new opportunities
- Referral system
- DB-synced saved list & tracker (currently browser-local)
- Multi-language support
- Verified-listing badges and employer self-serve org pages
- Events calendar
