import Link from "next/link";
import { notFound } from "next/navigation";
import {
  INDUSTRIES,
  getIndustry,
  opportunitiesByIndustry,
  type IndustryId,
} from "@/lib/catalog";
import { OpportunityCard } from "@/components/OpportunityCard";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const ind = INDUSTRIES.find((i) => i.id === params.slug);
  return { title: ind ? `${ind.label} — InternNow` : "InternNow" };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const valid = INDUSTRIES.some((i) => i.id === params.slug);
  if (!valid) notFound();

  const ind = getIndustry(params.slug as IndustryId);
  const opps = opportunitiesByIndustry(ind.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/industries" className="muted text-sm hover:text-ink">← All industries</Link>

      <div className="mt-3 flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-xl2 text-3xl" style={{ background: `${ind.color}1a` }}>
          {ind.emoji}
        </div>
        <div>
          <h1 className="display text-3xl font-bold">{ind.label}</h1>
          <p className="muted">{ind.blurb}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {opps.map((o) => <OpportunityCard key={o.id} o={o} />)}
      </div>

      <div className="mt-8">
        <Link href="/opportunities" className="link">Browse all opportunities with filters →</Link>
      </div>
    </div>
  );
}
