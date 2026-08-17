import Link from "next/link";
import { notFound } from "next/navigation";
import {
  OPPORTUNITIES,
  getOpportunity,
  AUDIENCE_LABELS,
  COST_LABELS,
  TYPE_LABELS,
} from "@/lib/catalog";
import { IndustryBadge, PlainBadge, EquityBadge } from "@/components/Badges";
import { BookmarkButton } from "@/components/BookmarkButton";
import { OpportunityCard } from "@/components/OpportunityCard";
import { ConnectSection } from "@/components/ConnectSection";

export function generateStaticParams() {
  return OPPORTUNITIES.map((o) => ({ id: o.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const o = getOpportunity(params.id);
  return { title: o ? `${o.program ?? o.org} — InternNow` : "InternNow" };
}

const FORMAT_LABELS = { "in-person": "In-person", remote: "Remote", hybrid: "Hybrid" };

export default function OpportunityDetail({ params }: { params: { id: string } }) {
  const o = getOpportunity(params.id);
  if (!o) notFound();

  const similar = OPPORTUNITIES.filter(
    (x) => x.id !== o.id && x.industries.some((i) => o.industries.includes(i))
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Link href="/opportunities" className="muted text-sm hover:text-ink">← All opportunities</Link>

      {/* header */}
      <header className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {o.industries.map((i) => <IndustryBadge key={i} id={i} />)}
            {o.equityTags?.map((t) => <EquityBadge key={t} id={t} />)}
          </div>
          <h1 className="display text-3xl font-bold leading-tight">{o.program ?? o.org}</h1>
          {o.program && <p className="muted mt-1 font-semibold">{o.org}</p>}
          <p className="mt-2 max-w-2xl text-ink-soft">{o.summary}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <a href={o.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Visit official site ↗
          </a>
          <BookmarkButton id={o.id} className="justify-center" />
        </div>
      </header>

      {/* at a glance */}
      <section className="mt-6 grid gap-3 rounded-xl2 border border-[var(--border)] bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-3">
        <Fact label="Audience" value={o.audiences.map((a) => AUDIENCE_LABELS[a]).join(", ")} />
        <Fact label="Type" value={o.types.map((t) => TYPE_LABELS[t]).join(", ")} />
        <Fact label="Cost" value={COST_LABELS[o.cost]} />
        <Fact label="Format" value={FORMAT_LABELS[o.format]} />
        <Fact
          label="Locations"
          value={o.national && o.locations.length <= 1 ? "Nationwide" : o.locations.map((l) => `${l.city}, ${l.state}`).join(" · ")}
        />
        {o.compensation && <Fact label="Details" value={o.compensation} />}
      </section>

      {/* about */}
      <Section title="About">
        <p className="text-ink-soft">{o.about}</p>
        {o.deadlineNote && (
          <p className="mt-3 rounded-xl2 bg-brand-50 px-4 py-3 text-sm text-brand-800">
            🗓️ {o.deadlineNote}
          </p>
        )}
      </Section>

      {/* illustrative disclaimer */}
      <div className="mt-8 rounded-xl2 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>Heads up:</strong> the interview steps, sample supplement prompts and
        answers, and tips below are <strong>illustrative examples</strong> created by
        InternNow to help you prepare — they are not {o.org}&apos;s official prompts or
        answers. Always confirm current details on the{" "}
        <a href={o.url} target="_blank" rel="noopener noreferrer" className="link">official site</a>.
      </div>

      {/* interview process */}
      <Section title="What the process can look like">
        <ol className="space-y-3">
          {o.interviewProcess.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5 text-ink-soft">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* sample supplements */}
      <Section title="Sample supplement prompts & answers">
        <div className="space-y-4">
          {o.supplements.map((s, i) => (
            <div key={i} className="rounded-xl2 border border-[var(--border)] bg-white p-5 shadow-soft">
              <div className="mb-1 text-xs font-bold uppercase tracking-wide text-brand-600">Prompt (example)</div>
              <p className="font-semibold">{s.prompt}</p>
              <div className="mt-3 mb-1 text-xs font-bold uppercase tracking-wide text-emerald-600">Sample answer</div>
              <p className="text-ink-soft">{s.sampleAnswer}</p>
              <div className="mt-3 rounded-xl bg-paper px-3 py-2 text-sm">
                <span className="font-bold">💡 Why it works:</span>{" "}
                <span className="text-ink-soft">{s.tips}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* tips */}
      <Section title="Tips to stand out">
        <ul className="space-y-2">
          {o.tips.map((t, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-accent-500">★</span>
              <span className="text-ink-soft">{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* connect */}
      <ConnectSection o={o} />

      {/* similar */}
      {similar.length > 0 && (
        <Section title="Similar opportunities">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => <OpportunityCard key={s.id} o={s} />)}
          </div>
        </Section>
      )}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wide text-ink-muted">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="display mb-3 text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
