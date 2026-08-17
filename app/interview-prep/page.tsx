import Link from "next/link";

export const metadata = { title: "Interview prep — InternNow" };

const common = [
  "Tell me about yourself.",
  "Why are you interested in this opportunity?",
  "Tell me about a challenge you overcame.",
  "Describe a time you worked on a team.",
  "What's a strength, and what's something you're working on?",
  "Tell me about a time you failed or made a mistake.",
  "Why should we choose you?",
  "Where do you see yourself in a few years?",
  "Do you have any questions for us?",
];

const mock = [
  "Tell me about a project you're proud of and your exact role in it.",
  "Describe a time you disagreed with someone. What did you do?",
  "Give an example of when you had to learn something quickly.",
  "Tell me about a time you led without being 'in charge'.",
  "What would your teacher or coach say is your biggest strength?",
];

export default function InterviewPrepPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/resources" className="muted text-sm hover:text-ink">← Resources</Link>
      <h1 className="display mt-2 text-3xl font-bold">Interview prep</h1>
      <p className="muted mt-1">Walk in calm and prepared. Here&apos;s everything you need.</p>

      <section className="card mt-6">
        <h2 className="display text-xl font-bold">The STAR method</h2>
        <p className="muted mt-1 text-sm">The simplest way to answer any &ldquo;tell me about a time&rdquo; question.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            ["S — Situation", "Set the scene in one sentence."],
            ["T — Task", "What was your responsibility or goal?"],
            ["A — Action", "What you did — spend most of your time here."],
            ["R — Result", "How it turned out; add a number if you can."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl2 border border-[var(--border)] p-3">
              <div className="font-bold text-brand-700">{t}</div>
              <div className="muted text-sm">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="card">
          <h2 className="display text-xl font-bold">Common questions</h2>
          <ul className="mt-3 space-y-2">
            {common.map((q) => (
              <li key={q} className="flex gap-2 text-sm"><span aria-hidden className="text-brand-500">•</span><span>{q}</span></li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="display text-xl font-bold">Mock practice set</h2>
          <p className="muted mt-1 text-sm">Record yourself answering these out loud, then watch it back.</p>
          <ul className="mt-3 space-y-2">
            {mock.map((q) => (
              <li key={q} className="flex gap-2 text-sm"><span aria-hidden className="text-accent-500">★</span><span>{q}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6 grid gap-6 sm:grid-cols-3">
        <Tips title="Before" items={["Research the org's mission", "Prepare 3 flexible stories", "Plan your outfit & route/tech", "Write 2 questions to ask them"]} />
        <Tips title="During" items={["Breathe; it's okay to pause", "Use STAR for examples", "Be specific, not generic", "Show curiosity"]} />
        <Tips title="After" items={["Send a thank-you within 24h", "Note what they asked", "Reflect on what to improve", "Connect on LinkedIn"]} />
      </section>

      <div className="mt-8">
        <Link href="/documents" className="btn-primary">Build a résumé to bring →</Link>
      </div>
    </div>
  );
}

function Tips({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card">
      <h3 className="display font-bold">{title}</h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm"><span aria-hidden className="text-brand-500">✓</span><span>{i}</span></li>
        ))}
      </ul>
    </div>
  );
}
