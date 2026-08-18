import Link from "next/link";
import {
  timedOpportunities,
  seasonForMonth,
  nextSeason,
  SEASON_LABELS,
  type Season,
} from "@/lib/timing";
import { IndustryBadge } from "@/components/Badges";
import type { Opportunity } from "@/lib/catalog";

export const metadata = { title: "Deadlines — InternNow" };
// Recompute "opening soon" per request so it reflects the current date.
export const dynamic = "force-dynamic";

function DeadlineRow({ opp }: { opp: Opportunity }) {
  return (
    <Link href={`/opportunities/${opp.id}`} className="card flex items-start justify-between gap-3 py-3 hover:shadow-card">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="display font-bold">{opp.program ?? opp.org}</span>
          {opp.industries.slice(0, 1).map((i) => <IndustryBadge key={i} id={i} small />)}
        </div>
        {opp.deadlineNote && <p className="muted mt-0.5 text-sm">🗓️ {opp.deadlineNote}</p>}
      </div>
      <span aria-hidden className="text-ink-muted">›</span>
    </Link>
  );
}

export default function DeadlinesPage() {
  const now = new Date();
  const cur = seasonForMonth(now.getMonth());
  const nxt = nextSeason(cur);
  const timed = timedOpportunities();

  const openingSoon = timed.filter((t) => t.seasons.includes(cur) || t.seasons.includes(nxt));
  const seasonGroups: Season[] = ["fall", "winter", "spring", "summer"];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="display text-3xl font-bold">Deadline calendar</h1>
      <p className="muted mt-1">
        Application windows drawn from each organization&apos;s guidance, grouped by season so you
        never miss one. Always confirm exact dates on the official site.
      </p>

      {/* Opening soon */}
      <section className="mt-6 rounded-xl3 border border-brand-200 bg-brand-50/60 p-5">
        <h2 className="display text-xl font-bold text-brand-700">
          ⏰ Opening soon — {SEASON_LABELS[cur]} &amp; {SEASON_LABELS[nxt]}
        </h2>
        <p className="muted mt-1 text-sm">Based on today&apos;s date, these tend to open or close in the current or next season.</p>
        <div className="mt-3 grid gap-2">
          {openingSoon.length === 0 ? (
            <p className="muted text-sm">Nothing flagged right now — check the seasonal lists below.</p>
          ) : (
            openingSoon.map((t) => <DeadlineRow key={t.opp.id} opp={t.opp} />)
          )}
        </div>
      </section>

      {/* Rolling */}
      <SeasonSection
        title="🔁 Rolling / year-round"
        subtitle="Apply anytime — these accept applications throughout the year."
        opps={timed.filter((t) => t.seasons.includes("rolling")).map((t) => t.opp)}
      />

      {/* By season */}
      {seasonGroups.map((s) => (
        <SeasonSection
          key={s}
          title={`${SEASON_LABELS[s]} deadlines`}
          opps={timed.filter((t) => t.seasons.includes(s)).map((t) => t.opp)}
        />
      ))}

      {/* Varies */}
      <SeasonSection
        title="🗓️ Timing varies"
        subtitle="These recruit on their own schedule — check the org's site."
        opps={timed.filter((t) => t.seasons.includes("varies")).map((t) => t.opp)}
      />

      <div className="mt-8 rounded-xl2 border border-[var(--border)] bg-white p-5 shadow-soft">
        <h3 className="display font-bold">Never miss a deadline</h3>
        <p className="muted mt-1 text-sm">
          Save opportunities and set your own target dates in your tracker. (Email &amp; push
          reminders are on the roadmap.)
        </p>
        <Link href="/saved" className="btn-primary mt-3">Open your tracker</Link>
      </div>
    </div>
  );
}

function SeasonSection({ title, subtitle, opps }: { title: string; subtitle?: string; opps: Opportunity[] }) {
  if (opps.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="display text-xl font-bold">{title}</h2>
      {subtitle && <p className="muted mb-2 text-sm">{subtitle}</p>}
      <div className="mt-2 grid gap-2">
        {opps.map((o) => <DeadlineRow key={o.id} opp={o} />)}
      </div>
    </section>
  );
}
