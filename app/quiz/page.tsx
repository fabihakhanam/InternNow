"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QUIZ } from "@/data/quiz";
import {
  INDUSTRIES,
  getIndustry,
  opportunitiesByIndustry,
  type IndustryId,
} from "@/lib/catalog";
import { OpportunityCard } from "@/components/OpportunityCard";
import { useSession } from "@/components/SessionProvider";

export default function QuizPage() {
  const user = useSession();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [saved, setSaved] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === QUIZ.length;

  const results = useMemo(() => {
    const score = new Map<IndustryId, number>();
    Object.entries(answers).forEach(([qi, oi]) => {
      const opt = QUIZ[Number(qi)].options[oi];
      opt.industries.forEach((ind) => score.set(ind, (score.get(ind) ?? 0) + 1));
    });
    const sorted = [...score.entries()].sort((a, b) => b[1] - a[1]);
    const max = sorted[0]?.[1] ?? 1;
    return sorted.map(([id, n]) => ({ id, n, pct: Math.round((n / max) * 100) }));
  }, [answers]);

  const top = results.slice(0, 3);
  const topIndustry = top[0]?.id;
  const recommended = topIndustry ? opportunitiesByIndustry(topIndustry).slice(0, 3) : [];

  async function saveToInterests() {
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interests: top.map((t) => t.id) }),
    });
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="display text-3xl font-bold">Career-fit quiz</h1>
      <p className="muted mt-1">
        Not sure where to start? Answer 8 quick questions and we&apos;ll point you toward fields —
        and opportunities — that fit you.
      </p>

      {!showResults ? (
        <>
          <div className="mt-6 space-y-4">
            {QUIZ.map((question, qi) => (
              <fieldset key={qi} className="card">
                <legend className="display mb-2 font-bold">{qi + 1}. {question.q}</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {question.options.map((opt, oi) => {
                    const checked = answers[qi] === oi;
                    return (
                      <button
                        key={oi}
                        type="button"
                        onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                        aria-pressed={checked}
                        className="chip justify-start text-left"
                        data-active={checked}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="sticky bottom-4 mt-6">
            <div className="card flex items-center justify-between gap-3">
              <span className="muted text-sm">{answeredCount} / {QUIZ.length} answered</span>
              <button className="btn-primary" disabled={!allAnswered} onClick={() => { setShowResults(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                See my results →
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-6 space-y-8">
          <section>
            <h2 className="display mb-3 text-xl font-bold">Your top fields</h2>
            <div className="space-y-3">
              {top.map((r) => {
                const ind = getIndustry(r.id);
                return (
                  <Link key={r.id} href={`/opportunities?industry=${r.id}`} className="card block hover:shadow-card">
                    <div className="flex items-center justify-between">
                      <span className="display font-bold">{ind.emoji} {ind.label}</span>
                      <span className="text-sm font-bold" style={{ color: ind.color }}>{r.pct}% match</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper">
                      <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: ind.color }} />
                    </div>
                    <p className="muted mt-2 text-sm">{ind.blurb}</p>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {user ? (
                <button className="btn-primary" onClick={saveToInterests} disabled={saved}>
                  {saved ? "✓ Saved to your profile" : "Save these to my interests"}
                </button>
              ) : (
                <Link href="/signup" className="btn-primary">Save results — create a free account</Link>
              )}
              <button className="link" onClick={() => { setShowResults(false); setAnswers({}); setSaved(false); }}>Retake quiz</button>
            </div>
          </section>

          {recommended.length > 0 && (
            <section>
              <h2 className="display mb-3 text-xl font-bold">Opportunities to explore first</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recommended.map((o) => <OpportunityCard key={o.id} o={o} />)}
              </div>
            </section>
          )}

          {/* Get Ready pathway */}
          <section>
            <h2 className="display mb-3 text-xl font-bold">Your &ldquo;Get Ready&rdquo; path</h2>
            <ol className="space-y-2">
              {[
                { t: "Explore your top field", href: `/opportunities?industry=${topIndustry ?? ""}`, d: "Browse opportunities and save a few that catch your eye." },
                { t: "Read the basics", href: "/resources/resume-basics", d: "Learn how to turn what you've done into a strong résumé." },
                { t: "Build your résumé", href: "/documents", d: "Use the guided builder — it only takes 15 minutes." },
                { t: "Practice interviewing", href: "/interview-prep", d: "Prep a few flexible stories with the STAR method." },
              ].map((step, i) => (
                <li key={i} className="card flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <Link href={step.href} className="display font-bold hover:text-brand-700">{step.t} →</Link>
                    <p className="muted text-sm">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}
    </div>
  );
}
