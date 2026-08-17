"use client";

import Link from "next/link";
import { useMemo } from "react";
import { OPPORTUNITIES, getOpportunity } from "@/lib/catalog";
import {
  useBookmarks,
  STATUS_LABELS,
  type TrackStatus,
} from "@/components/BookmarkProvider";
import { IndustryBadge } from "@/components/Badges";

const STATUSES = Object.keys(STATUS_LABELS) as TrackStatus[];

// Days from today (local, date-only) to an ISO yyyy-mm-dd string.
function daysUntil(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  const due = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((due.getTime() - today.getTime()) / 86400000);
}

function DueBadge({ iso }: { iso: string }) {
  const d = daysUntil(iso);
  let tone = "bg-slate-100 text-slate-700";
  let text = `Due in ${d} days`;
  if (d < 0) {
    tone = "bg-rose-100 text-rose-700";
    text = `Overdue by ${Math.abs(d)} ${Math.abs(d) === 1 ? "day" : "days"}`;
  } else if (d === 0) {
    tone = "bg-rose-100 text-rose-700";
    text = "Due today";
  } else if (d <= 7) {
    tone = "bg-amber-100 text-amber-800";
    text = `Due in ${d} ${d === 1 ? "day" : "days"}`;
  }
  return <span className={`badge ${tone}`}>🗓️ {text}</span>;
}

export default function SavedPage() {
  const { items, saved, update, toggle, ready } = useBookmarks();

  const rows = useMemo(() => {
    return saved
      .map((id) => ({ opp: getOpportunity(id), item: items[id] }))
      .filter((r) => r.opp)
      .sort((a, b) => {
        // Items with due dates first (soonest first), then the rest.
        const da = a.item.dueDate ? daysUntil(a.item.dueDate) : Infinity;
        const db = b.item.dueDate ? daysUntil(b.item.dueDate) : Infinity;
        if (da !== db) return da - db;
        return b.item.addedAt - a.item.addedAt;
      });
  }, [saved, items]);

  const upcoming = rows.filter(
    (r) => r.item.dueDate && r.item.status !== "declined" && r.item.status !== "accepted"
  );
  const nextDue = upcoming[0];

  if (!ready) return <div className="mx-auto max-w-5xl px-4 py-8" />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="display text-3xl font-bold">My list &amp; deadline tracker</h1>
      <p className="muted mt-1">
        Track status, set your own target deadlines, and jot notes. Everything is saved
        in this browser — no account needed.
      </p>

      {rows.length === 0 ? (
        <div className="card mt-6 text-center">
          <div className="text-4xl">☆</div>
          <p className="mt-2 font-semibold">Nothing saved yet</p>
          <p className="muted mt-1 text-sm">Tap the star on any opportunity to add it here.</p>
          <Link href="/opportunities" className="btn-primary mt-4">Browse opportunities</Link>
        </div>
      ) : (
        <>
          {/* summary */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat value={`${rows.length}`} label="Saved" />
            <Stat value={`${upcoming.length}`} label="With a deadline" />
            <div className="card">
              <div className="text-xs font-bold uppercase tracking-wide text-ink-muted">Next deadline</div>
              {nextDue ? (
                <div className="mt-1">
                  <div className="font-semibold leading-tight">{nextDue.opp!.program ?? nextDue.opp!.org}</div>
                  <div className="mt-1"><DueBadge iso={nextDue.item.dueDate!} /></div>
                </div>
              ) : (
                <div className="muted mt-1 text-sm">Set a due date below to start tracking.</div>
              )}
            </div>
          </div>

          {/* rows */}
          <div className="mt-6 space-y-3">
            {rows.map(({ opp, item }) => (
              <div key={opp!.id} className="card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/opportunities/${opp!.id}`} className="display font-bold leading-tight hover:text-brand-700">
                      {opp!.program ?? opp!.org}
                    </Link>
                    {opp!.program && <div className="muted text-sm">{opp!.org}</div>}
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {opp!.industries.map((i) => <IndustryBadge key={i} id={i} small />)}
                      {item.dueDate && <DueBadge iso={item.dueDate} />}
                    </div>
                  </div>
                  <button
                    onClick={() => toggle(opp!.id)}
                    className="chip !px-2.5 !py-1"
                    aria-label="Remove from list"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[180px_180px_1fr]">
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-muted">Status</span>
                    <select
                      className="input !py-2"
                      value={item.status}
                      onChange={(e) => update(opp!.id, { status: e.target.value as TrackStatus })}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-muted">My deadline</span>
                    <input
                      type="date"
                      className="input !py-2"
                      value={item.dueDate ?? ""}
                      onChange={(e) => update(opp!.id, { dueDate: e.target.value || undefined })}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-muted">Notes</span>
                    <input
                      className="input !py-2"
                      placeholder="e.g. ask Ms. Lee for a recommendation"
                      value={item.notes ?? ""}
                      onChange={(e) => update(opp!.id, { notes: e.target.value || undefined })}
                    />
                  </label>
                </div>

                {opp!.deadlineNote && (
                  <p className="muted mt-2 text-xs">ℹ️ {opp!.deadlineNote}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card">
      <div className="display text-2xl font-bold text-brand-600">{value}</div>
      <div className="muted text-sm">{label}</div>
    </div>
  );
}
