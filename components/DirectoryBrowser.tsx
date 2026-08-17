"use client";

import { useMemo, useState } from "react";
import {
  INDUSTRIES,
  OPPORTUNITIES,
  TYPE_LABELS,
  AUDIENCE_LABELS,
  US_STATES,
  type Audience,
  type IndustryId,
  type OppType,
} from "@/lib/catalog";
import { OpportunityCard } from "./OpportunityCard";

const TYPES: OppType[] = ["internship", "volunteering", "fellowship", "program", "scholarship"];
const AUDIENCES: Audience[] = ["high-school", "college"];

export function DirectoryBrowser({
  initialIndustry,
}: {
  initialIndustry?: IndustryId;
}) {
  const [query, setQuery] = useState("");
  const [industries, setIndustries] = useState<IndustryId[]>(
    initialIndustry ? [initialIndustry] : []
  );
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [types, setTypes] = useState<OppType[]>([]);
  const [state, setState] = useState("");

  function toggle<T>(list: T[], setList: (v: T[]) => void, v: T) {
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  // Which states actually have opportunities (plus include national).
  const availableStates = useMemo(() => {
    const codes = new Set<string>();
    OPPORTUNITIES.forEach((o) => o.locations.forEach((l) => codes.add(l.state)));
    return US_STATES.filter((s) => codes.has(s.code));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return OPPORTUNITIES.filter((o) => {
      const hay = `${o.org} ${o.program ?? ""} ${o.summary} ${o.about}`.toLowerCase();
      const mq = !q || hay.includes(q);
      const mi = industries.length === 0 || o.industries.some((i) => industries.includes(i));
      const ma = audiences.length === 0 || o.audiences.some((a) => audiences.includes(a));
      const mt = types.length === 0 || o.types.some((t) => types.includes(t));
      const ms = !state || o.national || o.locations.some((l) => l.state === state);
      return mq && mi && ma && mt && ms;
    });
  }, [query, industries, audiences, types, state]);

  const hasFilters =
    query || industries.length || audiences.length || types.length || state;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-5">
        <h1 className="display text-3xl font-bold">Browse opportunities</h1>
        <p className="muted">
          Search and filter {OPPORTUNITIES.length} internships, fellowships, programs,
          and volunteering opportunities.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* sidebar filters */}
        <aside className="space-y-5">
          <input
            className="input"
            placeholder="Search organizations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search organizations"
          />

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

          <div>
            <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-ink-muted">State</div>
            <select className="input" value={state} onChange={(e) => setState(e.target.value)} aria-label="State">
              <option value="">All states (+ nationwide)</option>
              {availableStates.map((s) => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button
              className="link text-sm"
              onClick={() => {
                setQuery("");
                setIndustries([]);
                setAudiences([]);
                setTypes([]);
                setState("");
              }}
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* results */}
        <div>
          <div className="mb-3 text-sm font-semibold text-ink-soft">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </div>
          {filtered.length === 0 ? (
            <p className="muted py-12 text-center">No opportunities match your filters.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((o) => (
                <OpportunityCard key={o.id} o={o} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
