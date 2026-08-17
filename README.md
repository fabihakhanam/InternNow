# 🧭 InternNow

**Internships & volunteering for students — mapped, by industry.**

InternNow is a free, national directory that helps **high school and college
students** discover internships, fellowships, programs, and volunteering
opportunities, and actually prepare to apply. Explore a real US **map**, filter
by **industry** and grade level, and open any opportunity for its official link
plus a likely process, **sample supplements**, and **tips**.

## ✨ Features

- **🗺️ National map** — a real, zoomable Leaflet/OpenStreetMap view. Pins are colored by industry and cluster together until you zoom into a city.
- **🏭 Industry filters** — Technology, Business & Finance, Law & Justice, Arts & Culture, Science & Research, Healthcare, Government & Policy, Nonprofit, and Education.
- **🔎 Powerful browse** — search + filters for industry, audience (HS/college), type, and state.
- **📄 Rich detail pages** — official website link, "what the process can look like", **sample supplement prompts & answers**, and **tips to stand out**.
- **⭐ Save opportunities** — bookmark favorites (stored locally in your browser, no login required).
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
| Data      | Typed, curated catalog (`lib/catalog.ts`)     |
| Saving    | Browser localStorage (no backend/accounts)    |

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Script          | What it does           |
| --------------- | ---------------------- |
| `npm run dev`   | Start the dev server   |
| `npm run build` | Production build       |
| `npm run start` | Run the production build |

## ➕ Adding an opportunity

Add an entry to the `OPPORTUNITIES` array in [`lib/catalog.ts`](lib/catalog.ts).
Each opportunity includes its industries, audiences, types, locations (with
lat/lng so it appears on the map), and prep content. Everything else — cards,
map pins, industry pages, filters — updates automatically.

## 🗺️ Roadmap

- More opportunities and deeper regional coverage
- Deadline reminders and a personal application tracker
- Optional accounts to sync saved opportunities across devices
- User-submitted opportunities with moderation
