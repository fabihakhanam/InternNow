import Link from "next/link";
import { ARTICLES } from "@/data/resources";

export const metadata = { title: "Resources — InternNow" };

const tools = [
  { href: "/quiz", emoji: "🧭", title: "Career-fit quiz", desc: "Answer 8 questions to find fields and opportunities that fit you." },
  { href: "/interview-prep", emoji: "🎤", title: "Interview prep", desc: "STAR method, common questions, and a mock practice set." },
  { href: "/documents", emoji: "📄", title: "Résumé & cover letter builder", desc: "Guided builders with a printable preview." },
  { href: "/deadlines", emoji: "🗓️", title: "Deadline calendar", desc: "Application windows by season, plus what's opening soon." },
  { href: "/discover", emoji: "🃏", title: "Discover (swipe)", desc: "Swipe through opportunities and save the ones you like." },
  { href: "/tips", emoji: "✅", title: "Application tips", desc: "Finding fit, writing supplements, and staying organized." },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="display text-3xl font-bold">Resource library</h1>
      <p className="muted mt-1">Guides and tools to help you apply with confidence.</p>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.href} href={t.href} className="card hover:-translate-y-0.5 hover:shadow-card">
            <div className="text-3xl">{t.emoji}</div>
            <div className="display mt-2 text-lg font-bold">{t.title}</div>
            <div className="muted text-sm">{t.desc}</div>
          </Link>
        ))}
      </section>

      <h2 className="display mt-10 mb-3 text-xl font-bold">How-to guides</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((a) => (
          <Link key={a.slug} href={`/resources/${a.slug}`} className="card group hover:-translate-y-0.5 hover:shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-3xl">{a.emoji}</span>
              <span className="badge bg-brand-50 text-brand-700">{a.category}</span>
            </div>
            <h3 className="display mt-3 text-lg font-bold leading-tight group-hover:text-brand-700">{a.title}</h3>
            <p className="muted mt-1 text-sm">{a.excerpt}</p>
            <p className="muted mt-3 text-xs">{a.minutes} min read →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
