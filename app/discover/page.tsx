"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  INDUSTRIES,
  OPPORTUNITIES,
  AUDIENCE_LABELS,
  COST_LABELS,
  getIndustry,
  type IndustryId,
  type Opportunity,
} from "@/lib/catalog";
import { IndustryBadge, PlainBadge, EquityBadge } from "@/components/Badges";
import { useBookmarks } from "@/components/BookmarkProvider";

function locationText(o: Opportunity) {
  if (o.national && o.locations.length <= 1) return "Nationwide";
  const c = o.locations.map((l) => `${l.city}, ${l.state}`);
  return c.length <= 2 ? c.join(" · ") : `${c[0]} +${c.length - 1}`;
}

export default function DiscoverPage() {
  const { isSaved, toggle } = useBookmarks();
  const [filter, setFilter] = useState<IndustryId | null>(null);
  const [index, setIndex] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [drag, setDrag] = useState(0);
  const [leaving, setLeaving] = useState<"left" | "right" | null>(null);
  const startX = useRef<number | null>(null);

  const deck = useMemo(
    () => (filter ? OPPORTUNITIES.filter((o) => o.industries.includes(filter)) : OPPORTUNITIES),
    [filter]
  );
  const current = deck[index];
  const done = index >= deck.length;

  function reset(f: IndustryId | null) {
    setFilter(f);
    setIndex(0);
    setDrag(0);
    setLeaving(null);
    setSavedIds([]);
  }

  function advance(dir: "left" | "right") {
    if (!current) return;
    if (dir === "right") {
      if (!isSaved(current.id)) toggle(current.id);
      setSavedIds((s) => [...s, current.id]);
    }
    setLeaving(dir);
    setTimeout(() => {
      setLeaving(null);
      setDrag(0);
      setIndex((i) => i + 1);
    }, 220);
  }

  function onDown(e: React.PointerEvent) {
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function onMove(e: React.PointerEvent) {
    if (startX.current === null) return;
    setDrag(e.clientX - startX.current);
  }
  function onUp() {
    if (startX.current === null) return;
    const d = drag;
    startX.current = null;
    if (d > 110) advance("right");
    else if (d < -110) advance("left");
    else setDrag(0);
  }

  const transform = leaving
    ? `translateX(${leaving === "right" ? 700 : -700}px) rotate(${leaving === "right" ? 25 : -25}deg)`
    : `translateX(${drag}px) rotate(${drag / 22}deg)`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="text-center">
        <h1 className="display text-3xl font-bold">Discover</h1>
        <p className="muted mt-1">Swipe right to save, left to skip. Or use the buttons.</p>
      </div>

      {/* field filter */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        <button className="chip" data-active={filter === null} onClick={() => reset(null)}>All fields</button>
        {INDUSTRIES.map((i) => (
          <button key={i.id} className="chip" data-active={filter === i.id} onClick={() => reset(i.id)}
            style={filter === i.id ? { background: i.color, borderColor: i.color } : undefined}>
            <span aria-hidden>{i.emoji}</span> {i.label}
          </button>
        ))}
      </div>

      {done ? (
        <div className="card mt-8 text-center">
          <div className="text-4xl">🎉</div>
          <p className="mt-2 font-semibold">You&apos;ve seen them all!</p>
          <p className="muted mt-1 text-sm">
            You saved {savedIds.length} {savedIds.length === 1 ? "opportunity" : "opportunities"} this round.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/saved" className="btn-primary">View saved</Link>
            <button className="btn-ghost" onClick={() => reset(filter)}>Start over</button>
          </div>
        </div>
      ) : (
        <>
          {/* card stack */}
          <div className="relative mx-auto mt-6 h-[420px] max-w-md select-none">
            {/* peek of next card */}
            {deck[index + 1] && (
              <div className="absolute inset-x-3 top-3 h-full">
                <div className="card h-full opacity-60" />
              </div>
            )}
            {current && (
              <div
                className="card absolute inset-0 flex h-full cursor-grab flex-col active:cursor-grabbing"
                style={{ transform, transition: leaving || drag === 0 ? "transform 0.22s ease" : "none", touchAction: "pan-y" }}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={onUp}
              >
                <div className="flex flex-wrap gap-1.5">
                  {current.industries.map((i) => <IndustryBadge key={i} id={i} small />)}
                </div>
                <div className="mt-3">
                  <div className="display text-2xl font-bold leading-tight">{current.program ?? current.org}</div>
                  {current.program && <div className="muted">{current.org}</div>}
                </div>
                <p className="mt-3 text-ink-soft">{current.summary}</p>
                {current.equityTags && current.equityTags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {current.equityTags.map((t) => <EquityBadge key={t} id={t} />)}
                  </div>
                )}
                <div className="mt-auto flex flex-wrap gap-1.5">
                  <PlainBadge tone="blue">📍 {locationText(current)}</PlainBadge>
                  {current.audiences.map((a) => <PlainBadge key={a}>{AUDIENCE_LABELS[a]}</PlainBadge>)}
                  <PlainBadge tone={current.cost === "free" ? "green" : "amber"}>{COST_LABELS[current.cost]}</PlainBadge>
                </div>
                <Link href={`/opportunities/${current.id}`} className="link mt-3 text-sm" onClick={(e) => e.stopPropagation()}>
                  View full details →
                </Link>

                {/* drag hints */}
                {drag < -40 && <div className="pointer-events-none absolute left-4 top-4 rotate-[-12deg] rounded-lg border-2 border-slate-400 px-2 py-1 text-sm font-black text-slate-400">SKIP</div>}
                {drag > 40 && <div className="pointer-events-none absolute right-4 top-4 rotate-[12deg] rounded-lg border-2 border-emerald-500 px-2 py-1 text-sm font-black text-emerald-500">SAVE ★</div>}
              </div>
            )}
          </div>

          {/* controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => advance("left")} className="grid h-14 w-14 place-items-center rounded-full border-2 border-[var(--border)] bg-white text-2xl shadow-soft hover:bg-paper" aria-label="Skip">✕</button>
            <span className="muted text-sm">{index + 1} / {deck.length}</span>
            <button onClick={() => advance("right")} className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-2xl text-white shadow-soft hover:bg-emerald-600" aria-label="Save">★</button>
          </div>
        </>
      )}
    </div>
  );
}
