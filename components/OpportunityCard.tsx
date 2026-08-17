import Link from "next/link";
import {
  AUDIENCE_LABELS,
  COST_LABELS,
  TYPE_LABELS,
  type Opportunity,
} from "@/lib/catalog";
import { IndustryBadge, PlainBadge, EquityBadge } from "./Badges";
import { BookmarkButton } from "./BookmarkButton";

const FORMAT_BADGE: Record<string, string> = { remote: "🌐 Remote", hybrid: "🔀 Hybrid" };

function locationText(o: Opportunity) {
  if (o.national && o.locations.length <= 1) return "Nationwide";
  const cities = o.locations.map((l) => `${l.city}, ${l.state}`);
  if (cities.length <= 2) return cities.join(" · ");
  return `${cities[0]} +${cities.length - 1} more`;
}

export function OpportunityCard({ o }: { o: Opportunity }) {
  return (
    <Link
      href={`/opportunities/${o.id}`}
      className="card group flex h-full flex-col gap-3 hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {o.industries.slice(0, 2).map((i) => (
            <IndustryBadge key={i} id={i} small />
          ))}
        </div>
        <BookmarkButton id={o.id} showLabel={false} className="!px-2.5 !py-1" />
      </div>

      <div>
        <h3 className="display text-lg font-bold leading-tight group-hover:text-brand-700">
          {o.program ? `${o.program}` : o.org}
        </h3>
        <p className="muted text-sm">{o.program ? o.org : ""}&nbsp;</p>
      </div>

      <p className="text-sm text-ink-soft">{o.summary}</p>

      {o.equityTags && o.equityTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {o.equityTags.map((t) => <EquityBadge key={t} id={t} />)}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        <PlainBadge tone="blue">📍 {locationText(o)}</PlainBadge>
        {FORMAT_BADGE[o.format] && <PlainBadge tone="green">{FORMAT_BADGE[o.format]}</PlainBadge>}
        {o.audiences.map((a) => (
          <PlainBadge key={a}>{AUDIENCE_LABELS[a]}</PlainBadge>
        ))}
        <PlainBadge tone={o.cost === "free" ? "green" : "amber"}>
          {COST_LABELS[o.cost]}
        </PlainBadge>
        <PlainBadge>{o.types.map((t) => TYPE_LABELS[t]).join(" · ")}</PlainBadge>
      </div>
    </Link>
  );
}
