"use client";

import Link from "next/link";
import { useState } from "react";

export function DocToolbar({
  id,
  type,
  title,
  getData,
}: {
  id: string;
  type: "resume" | "cover-letter";
  title: string;
  getData: () => unknown;
}) {
  const [name, setName] = useState(title);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    await fetch(`/api/documents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: name, data: getData() }),
    });
    setSaving(false);
    setSavedAt("Saved");
    setTimeout(() => setSavedAt(null), 2500);
  }

  return (
    <div className="sticky top-16 z-20 flex flex-wrap items-center gap-3 rounded-xl2 border border-[var(--border)] bg-white/90 p-3 shadow-soft backdrop-blur print:hidden">
      <Link href="/documents" className="muted text-sm hover:text-ink">← Documents</Link>
      <input
        className="input !w-auto flex-1 !py-1.5 font-semibold"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Document title"
      />
      <span className="badge bg-brand-50 text-brand-700">{type === "resume" ? "Résumé" : "Cover letter"}</span>
      {savedAt && <span className="text-sm font-semibold text-emerald-600">✓ {savedAt}</span>}
      <button className="btn-ghost !py-2 text-sm" onClick={() => window.print()}>🖨️ Print / PDF</button>
      <button className="btn-primary !py-2 text-sm" onClick={save} disabled={saving}>
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  );
}
