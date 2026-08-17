"use client";

import Link from "next/link";
import { OPPORTUNITIES } from "@/lib/catalog";
import { useBookmarks } from "@/components/BookmarkProvider";
import { OpportunityCard } from "@/components/OpportunityCard";

export default function SavedPage() {
  const { saved, ready } = useBookmarks();
  const opps = saved
    .map((id) => OPPORTUNITIES.find((o) => o.id === id))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="display text-3xl font-bold">Saved opportunities</h1>
      <p className="muted mt-1">
        Your bookmarks are stored in this browser — no account needed.
      </p>

      {!ready ? null : opps.length === 0 ? (
        <div className="card mt-6 text-center">
          <div className="text-4xl">☆</div>
          <p className="mt-2 font-semibold">Nothing saved yet</p>
          <p className="muted mt-1 text-sm">
            Tap the star on any opportunity to save it here.
          </p>
          <Link href="/opportunities" className="btn-primary mt-4">Browse opportunities</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opps.map((o) => <OpportunityCard key={o.id} o={o} />)}
        </div>
      )}
    </div>
  );
}
