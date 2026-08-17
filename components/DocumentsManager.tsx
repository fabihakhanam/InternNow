"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Doc = { id: string; type: "resume" | "cover-letter"; title: string; updatedAt: string };

export function DocumentsManager() {
  const router = useRouter();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  async function load() {
    const res = await fetch("/api/documents");
    const data = await res.json().catch(() => ({ documents: [] }));
    setDocs(data.documents ?? []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function create(type: "resume" | "cover-letter") {
    setCreating(true);
    const res = await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data: {} }),
    });
    const data = await res.json();
    setCreating(false);
    if (data.document?.id) router.push(`/documents/${data.document.id}`);
  }

  async function remove(id: string) {
    await fetch(`/api/documents/${id}`, { method: "DELETE" });
    setDocs((d) => d.filter((x) => x.id !== id));
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <button onClick={() => create("resume")} disabled={creating} className="card text-left hover:-translate-y-0.5 hover:shadow-card">
          <div className="text-3xl">📄</div>
          <div className="display mt-2 text-lg font-bold">New résumé</div>
          <div className="muted text-sm">Guided sections with a live, printable preview.</div>
        </button>
        <button onClick={() => create("cover-letter")} disabled={creating} className="card text-left hover:-translate-y-0.5 hover:shadow-card">
          <div className="text-3xl">✉️</div>
          <div className="display mt-2 text-lg font-bold">New cover letter</div>
          <div className="muted text-sm">Prompt-by-prompt help to write a strong letter.</div>
        </button>
      </div>

      <h2 className="display mt-8 mb-3 text-xl font-bold">Your documents</h2>
      {loading ? (
        <p className="muted">Loading…</p>
      ) : docs.length === 0 ? (
        <p className="muted">No documents yet. Create one above to get started.</p>
      ) : (
        <div className="space-y-2">
          {docs.map((d) => (
            <div key={d.id} className="card flex items-center justify-between gap-3 py-3">
              <button className="flex items-center gap-3 text-left" onClick={() => router.push(`/documents/${d.id}`)}>
                <span className="text-2xl">{d.type === "resume" ? "📄" : "✉️"}</span>
                <span>
                  <span className="block font-bold">{d.title}</span>
                  <span className="muted text-xs">
                    {d.type === "resume" ? "Résumé" : "Cover letter"} · updated {new Date(d.updatedAt).toLocaleDateString()}
                  </span>
                </span>
              </button>
              <div className="flex gap-2">
                <button className="chip" onClick={() => router.push(`/documents/${d.id}`)}>Open</button>
                <button className="chip text-rose-600" onClick={() => remove(d.id)} aria-label="Delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
