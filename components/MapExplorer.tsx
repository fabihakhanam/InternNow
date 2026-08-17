"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import {
  INDUSTRIES,
  OPPORTUNITIES,
  TYPE_LABELS,
  AUDIENCE_LABELS,
  mapPins,
  type Audience,
  type IndustryId,
  type OppType,
} from "@/lib/catalog";
import { OpportunityCard } from "./OpportunityCard";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center rounded-xl2 bg-brand-50 text-brand-600">
      Loading map…
    </div>
  ),
});

const TYPES: OppType[] = ["internship", "volunteering", "fellowship", "program", "scholarship"];
const AUDIENCES: Audience[] = ["high-school", "college"];

export function MapExplorer() {
  const [industries, setIndustries] = useState<IndustryId[]>([]);
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [types, setTypes] = useState<OppType[]>([]);

  function toggle<T>(list: T[], setList: (v: T[]) => void, v: T) {
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  const filtered = useMemo(() => {
    return OPPORTUNITIES.filter((o) => {
      const mi = industries.length === 0 || o.industries.some((i) => industries.includes(i));
      const ma = audiences.length === 0 || o.audiences.some((a) => audiences.includes(a));
      const mt = types.length === 0 || o.types.some((t) => types.includes(t));
      return mi && ma && mt;
    });
  }, [industries, audiences, types]);

  const pins = useMemo(() => mapPins(filtered), [filtered]);
  const hasFilters = industries.length + audiences.length + types.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4">
        <h1 className="display text-3xl font-bold">Explore the map</h1>
        <p className="muted">
          Zoom into any region to find opportunities. Pins are colored by industry and
          cluster together until you zoom in.
        </p>
      </div>

      {/* filters */}
      <div className="card mb-4 space-y-3">
        <div>
          <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-ink-muted">Industry</div>
          <div className="flex flex-wrap gap-1.5">
            {INDUSTRIES.map((i) => (
              <button
                key={i.id}
                className="chip"
                data-active={industries.includes(i.id)}
                onClick={() => toggle(industries, setIndustries, i.id)}
                style={industries.includes(i.id) ? { background: i.color, borderColor: i.color } : undefined}
              >
                <span aria-hidden>{i.emoji}</span> {i.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-ink-muted">Audience</div>
            <div className="flex flex-wrap gap-1.5">
              {AUDIENCES.map((a) => (
                <button key={a} className="chip" data-active={audiences.includes(a)} onClick={() => toggle(audiences, setAudiences, a)}>
                  {AUDIENCE_LABELS[a]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-ink-muted">Type</div>
            <div className="flex flex-wrap gap-1.5">
              {TYPES.map((t) => (
                <button key={t} className="chip" data-active={types.includes(t)} onClick={() => toggle(types, setTypes, t)}>
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
          {hasFilters && (
            <button
              className="link ml-auto self-end text-sm"
              onClick={() => {
                setIndustries([]);
                setAudiences([]);
                setTypes([]);
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        {/* map */}
        <div className="h-[62vh] min-h-[420px] overflow-hidden rounded-xl2 border border-[var(--border)] shadow-soft">
          <MapView pins={pins} />
        </div>

        {/* results */}
        <div className="lg:h-[62vh] lg:overflow-y-auto lg:pr-1">
          <div className="mb-2 text-sm font-semibold text-ink-soft">
            {filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"}
          </div>
          <div className="grid gap-3">
            {filtered.map((o) => (
              <OpportunityCard key={o.id} o={o} />
            ))}
            {filtered.length === 0 && (
              <p className="muted py-8 text-center">No opportunities match these filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
