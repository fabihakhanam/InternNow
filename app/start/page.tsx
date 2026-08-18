import Link from "next/link";
import { TYPE_LABELS } from "@/lib/catalog";

export const metadata = { title: "Start here — InternNow" };

const steps = [
  {
    n: "1",
    title: "Figure out what fits you",
    body: "You don't need to know your career. Pick a field that sounds interesting and start there.",
    cta: { href: "/quiz", label: "Take the 2-min quiz" },
    alt: { href: "/opportunities", label: "or browse by interest" },
  },
  {
    n: "2",
    title: "Know your options",
    body: "Opportunities come in many shapes — you can start small.",
    cta: { href: "/industries", label: "See industries" },
  },
  {
    n: "3",
    title: "Get your materials ready",
    body: "A simple, clean résumé and a short cover letter go a long way. Our builders walk you through every line.",
    cta: { href: "/documents", label: "Build a résumé" },
    alt: { href: "/resources/resume-basics", label: "or read résumé basics" },
  },
  {
    n: "4",
    title: "Apply and keep track",
    body: "Save opportunities with the ★, set your own target deadlines, and track each application's status so nothing slips.",
    cta: { href: "/saved", label: "Open your tracker" },
  },
  {
    n: "5",
    title: "Prep for the interview",
    body: "Most interviews ask the same handful of questions. A little practice makes a big difference.",
    cta: { href: "/interview-prep", label: "Interview prep" },
  },
];

const typeGlossary: { key: keyof typeof TYPE_LABELS; desc: string }[] = [
  { key: "internship", desc: "Hands-on work experience, sometimes paid, at an organization." },
  { key: "volunteering", desc: "Giving your time to a cause — flexible and great for beginners." },
  { key: "program", desc: "A structured experience that teaches skills over weeks or months." },
  { key: "summer-program", desc: "Immersive learning during the summer, often on a campus." },
  { key: "scholarship", desc: "Money for education, usually via an application and essays." },
  { key: "fellowship", desc: "A selective, often paid, multi-part leadership experience." },
  { key: "research", desc: "Working on a real research project, often with a mentor or lab." },
  { key: "competition", desc: "Build or submit a project and compete for recognition or prizes." },
  { key: "mentorship", desc: "Guidance from someone further along in a field you care about." },
];

export default function StartPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <span className="chip" data-active="true">🌱 New here? You&apos;re in the right place.</span>
      <h1 className="display mt-4 text-4xl font-bold">Never applied to anything before?</h1>
      <p className="muted mt-3 text-lg">
        That&apos;s exactly who InternNow is for. You don&apos;t need connections, a perfect
        résumé, or to have it all figured out. Here&apos;s a simple path — take it one step at a
        time.
      </p>

      <ol className="mt-8 space-y-4">
        {steps.map((s) => (
          <li key={s.n} className="card flex gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 font-bold text-white">{s.n}</span>
            <div>
              <h2 className="display text-lg font-bold">{s.title}</h2>
              <p className="muted mt-0.5 text-sm">{s.body}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                <Link href={s.cta.href} className="btn-primary !py-2">{s.cta.label} →</Link>
                {s.alt && <Link href={s.alt.href} className="link">{s.alt.label}</Link>}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-10">
        <h2 className="display text-2xl font-bold">A quick glossary</h2>
        <p className="muted mt-1">The kinds of opportunities you&apos;ll see on InternNow:</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {typeGlossary.map((t) => (
            <div key={t.key} className="rounded-xl2 border border-[var(--border)] bg-white p-4 shadow-soft">
              <dt className="font-bold">{TYPE_LABELS[t.key]}</dt>
              <dd className="muted mt-0.5 text-sm">{t.desc}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-10 rounded-xl3 bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-white">
        <h2 className="display text-2xl font-bold">Ready when you are</h2>
        <p className="mt-1 text-white/85">Create a free account to save opportunities and get matches made for you.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/signup" className="btn-accent">Create a free account</Link>
          <Link href="/opportunities" className="btn bg-white/15 text-white hover:bg-white/25">Just start browsing</Link>
        </div>
      </div>
    </div>
  );
}
