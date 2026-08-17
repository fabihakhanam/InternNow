import Link from "next/link";
import { INDUSTRIES, OPPORTUNITIES } from "@/lib/catalog";
import { OpportunityCard } from "@/components/OpportunityCard";

const featuredIds = ["america-on-tech", "seo-career", "nasa-ostem", "seeds-of-fortune", "legal-outreach", "met-internships"];

export default function HomePage() {
  const featured = featuredIds
    .map((id) => OPPORTUNITIES.find((o) => o.id === id))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));

  const states = new Set(OPPORTUNITIES.flatMap((o) => o.locations.map((l) => l.state)));

  return (
    <main>
      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-12 md:pt-20">
        <div className="max-w-3xl animate-fade-up">
          <span className="chip mb-5" data-active="true">🇺🇸 A national opportunity map for students</span>
          <h1 className="display text-4xl font-extrabold leading-[1.08] md:text-6xl">
            Find your next internship or volunteer role —{" "}
            <span className="text-brand-500">anywhere in the U.S.</span>
          </h1>
          <p className="muted mt-5 text-lg md:text-xl">
            InternNow maps internships, fellowships, programs, and volunteering for high
            school and college students — sorted by industry, with interview processes,
            sample supplements, and tips for each one.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/map" className="btn-primary text-lg">🗺️ Explore the map</Link>
            <Link href="/opportunities" className="btn-ghost text-lg">Browse opportunities</Link>
          </div>
          <p className="mt-4 text-sm font-semibold">
            <Link href="/start" className="link">🌱 Never applied to anything before? Start here →</Link>
          </p>
          <div className="muted mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
            <span>{OPPORTUNITIES.length} opportunities</span>
            <span>{INDUSTRIES.length} industries</span>
            <span>{states.size} states + nationwide</span>
            <span>100% free · no login</span>
          </div>
        </div>
      </section>

      {/* industries */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="display text-2xl font-bold">Browse by industry</h2>
          <Link href="/industries" className="link text-sm">See all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map((i) => (
            <Link
              key={i.id}
              href={`/industries/${i.id}`}
              className="card flex flex-col items-start gap-2 py-4 hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl text-xl" style={{ background: `${i.color}1a` }}>
                {i.emoji}
              </span>
              <span className="display text-sm font-bold leading-tight">{i.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* featured collections */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="display mb-1 text-2xl font-bold">Featured collections</h2>
        <p className="muted mb-5">Programs that proactively support students often overlooked by other platforms.</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { href: "/opportunities?focus=first-gen", emoji: "🎓", label: "First-generation" },
            { href: "/opportunities?focus=women-in-stem", emoji: "👩‍🔬", label: "Women & girls in STEM" },
            { href: "/opportunities?focus=students-of-color", emoji: "🌍", label: "Students of color" },
            { href: "/opportunities?focus=low-income", emoji: "💛", label: "Low-income / need-based" },
            { href: "/opportunities?format=remote", emoji: "🌐", label: "Remote-friendly" },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="card flex flex-col items-start gap-2 py-4 hover:-translate-y-0.5 hover:shadow-card">
              <span className="text-2xl" aria-hidden>{c.emoji}</span>
              <span className="display text-sm font-bold leading-tight">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* map teaser */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="overflow-hidden rounded-xl3 border border-[var(--border)] bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-white shadow-card md:p-12">
          <div className="max-w-xl">
            <h2 className="display text-2xl font-bold md:text-3xl">See opportunities on a real map</h2>
            <p className="mt-2 text-white/85">
              Start with a national view, then zoom into your city. Pins are colored by
              industry and cluster together until you zoom in — so you can find what&apos;s
              actually near you.
            </p>
            <Link href="/map" className="btn-accent mt-5">Open the map →</Link>
          </div>
        </div>
      </section>

      {/* featured */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="display text-2xl font-bold">Featured opportunities</h2>
            <p className="muted text-sm">Real, well-known programs across the country.</p>
          </div>
          <Link href="/opportunities" className="link text-sm">Browse all →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((o) => <OpportunityCard key={o.id} o={o} />)}
        </div>
      </section>

      {/* more than a directory */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="display mb-1 text-2xl font-bold">More than a directory</h2>
        <p className="muted mb-5">Create a free account to unlock tools that help you actually land the role.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/for-you", emoji: "🎯", title: "For You matches", desc: "Personalized picks based on your grade, interests, and location." },
            { href: "/documents", emoji: "📄", title: "Résumé & cover letters", desc: "Guided builders with a printable, professional preview." },
            { href: "/interview-prep", emoji: "🎤", title: "Interview prep", desc: "STAR method, common questions, and a mock practice set." },
            { href: "/saved", emoji: "🗓️", title: "Deadline tracker", desc: "Save opportunities and track statuses and due dates." },
          ].map((f) => (
            <Link key={f.href} href={f.href} className="card hover:-translate-y-0.5 hover:shadow-card">
              <div className="text-3xl">{f.emoji}</div>
              <div className="display mt-2 text-lg font-bold">{f.title}</div>
              <div className="muted text-sm">{f.desc}</div>
            </Link>
          ))}
        </div>
        <div className="mt-5">
          <Link href="/signup" className="btn-primary">Create a free account →</Link>
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="display mb-5 text-2xl font-bold">How it works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { n: "1", t: "Discover", d: "Explore the map or filter by industry, grade level, and type." },
            { n: "2", t: "Prepare", d: "Each listing has the org's site, a likely process, sample supplements, and tips." },
            { n: "3", t: "Apply & track", d: "Save favorites with the ★ and keep your shortlist in one place." },
          ].map((s) => (
            <div key={s.n} className="card">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 font-bold text-white">{s.n}</span>
              <h3 className="display mt-3 text-lg font-bold">{s.t}</h3>
              <p className="muted mt-1 text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
