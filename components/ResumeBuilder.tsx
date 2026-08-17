"use client";

import { useState } from "react";
import { DocToolbar } from "./DocToolbar";

type Entry = { title: string; org: string; location: string; dates: string; bullets: string };
type EduEntry = { school: string; credential: string; location: string; gradYear: string; gpa: string; details: string };

export type ResumeData = {
  contact: { name: string; email: string; phone: string; location: string; links: string };
  summary: string;
  education: EduEntry[];
  experience: Entry[];
  activities: Entry[];
  skills: string;
};

export const emptyResume: ResumeData = {
  contact: { name: "", email: "", phone: "", location: "", links: "" },
  summary: "",
  education: [{ school: "", credential: "", location: "", gradYear: "", gpa: "", details: "" }],
  experience: [{ title: "", org: "", location: "", dates: "", bullets: "" }],
  activities: [],
  skills: "",
};

function lines(s: string) {
  return s.split("\n").map((l) => l.trim()).filter(Boolean);
}

export function ResumeBuilder({
  id,
  initialTitle,
  initialData,
}: {
  id: string;
  initialTitle: string;
  initialData: Partial<ResumeData>;
}) {
  const [data, setData] = useState<ResumeData>({ ...emptyResume, ...initialData, contact: { ...emptyResume.contact, ...initialData.contact } });

  const set = (patch: Partial<ResumeData>) => setData((d) => ({ ...d, ...patch }));
  const setContact = (patch: Partial<ResumeData["contact"]>) => setData((d) => ({ ...d, contact: { ...d.contact, ...patch } }));

  function updEntry<K extends "experience" | "activities">(key: K, i: number, patch: Partial<Entry>) {
    setData((d) => ({ ...d, [key]: d[key].map((e, idx) => (idx === i ? { ...e, ...patch } : e)) }));
  }
  function updEdu(i: number, patch: Partial<EduEntry>) {
    setData((d) => ({ ...d, education: d.education.map((e, idx) => (idx === i ? { ...e, ...patch } : e)) }));
  }

  return (
    <div>
      <DocToolbar id={id} type="resume" title={initialTitle} getData={() => data} />

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        {/* form */}
        <div className="space-y-4">
          <Card title="Contact">
            <Grid>
              <Field label="Full name" value={data.contact.name} onChange={(v) => setContact({ name: v })} />
              <Field label="Email" value={data.contact.email} onChange={(v) => setContact({ email: v })} />
              <Field label="Phone" value={data.contact.phone} onChange={(v) => setContact({ phone: v })} />
              <Field label="Location" value={data.contact.location} onChange={(v) => setContact({ location: v })} />
            </Grid>
            <Field label="Links (LinkedIn, portfolio)" value={data.contact.links} onChange={(v) => setContact({ links: v })} />
          </Card>

          <Card title="Summary (optional)">
            <Area value={data.summary} onChange={(v) => set({ summary: v })} placeholder="1–2 sentences about who you are and what you're looking for." />
          </Card>

          <Card title="Education" onAdd={() => set({ education: [...data.education, { school: "", credential: "", location: "", gradYear: "", gpa: "", details: "" }] })}>
            {data.education.map((e, i) => (
              <Entryish key={i} onRemove={data.education.length > 1 ? () => set({ education: data.education.filter((_, idx) => idx !== i) }) : undefined}>
                <Grid>
                  <Field label="School" value={e.school} onChange={(v) => updEdu(i, { school: v })} />
                  <Field label="Credential / focus" value={e.credential} onChange={(v) => updEdu(i, { credential: v })} />
                  <Field label="Grad year" value={e.gradYear} onChange={(v) => updEdu(i, { gradYear: v })} />
                  <Field label="GPA (optional)" value={e.gpa} onChange={(v) => updEdu(i, { gpa: v })} />
                </Grid>
              </Entryish>
            ))}
          </Card>

          <Card title="Experience" onAdd={() => set({ experience: [...data.experience, { title: "", org: "", location: "", dates: "", bullets: "" }] })}>
            {data.experience.map((e, i) => (
              <Entryish key={i} onRemove={() => set({ experience: data.experience.filter((_, idx) => idx !== i) })}>
                <Grid>
                  <Field label="Role / title" value={e.title} onChange={(v) => updEntry("experience", i, { title: v })} />
                  <Field label="Organization" value={e.org} onChange={(v) => updEntry("experience", i, { org: v })} />
                  <Field label="Dates" value={e.dates} onChange={(v) => updEntry("experience", i, { dates: v })} />
                  <Field label="Location" value={e.location} onChange={(v) => updEntry("experience", i, { location: v })} />
                </Grid>
                <Area label="Bullet points (one per line)" value={e.bullets} onChange={(v) => updEntry("experience", i, { bullets: v })} placeholder={"Led a team of 5…\nBuilt a website that…"} />
              </Entryish>
            ))}
          </Card>

          <Card title="Activities & leadership" onAdd={() => set({ activities: [...data.activities, { title: "", org: "", location: "", dates: "", bullets: "" }] })}>
            {data.activities.length === 0 && <p className="muted text-sm">Optional — add clubs, volunteering, or projects.</p>}
            {data.activities.map((e, i) => (
              <Entryish key={i} onRemove={() => set({ activities: data.activities.filter((_, idx) => idx !== i) })}>
                <Grid>
                  <Field label="Role / activity" value={e.title} onChange={(v) => updEntry("activities", i, { title: v })} />
                  <Field label="Organization" value={e.org} onChange={(v) => updEntry("activities", i, { org: v })} />
                  <Field label="Dates" value={e.dates} onChange={(v) => updEntry("activities", i, { dates: v })} />
                </Grid>
                <Area label="Bullet points (one per line)" value={e.bullets} onChange={(v) => updEntry("activities", i, { bullets: v })} />
              </Entryish>
            ))}
          </Card>

          <Card title="Skills">
            <Area value={data.skills} onChange={(v) => set({ skills: v })} placeholder="Comma-separated: Python, public speaking, Adobe Photoshop" />
          </Card>
        </div>

        {/* preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div id="doc-print" className="doc-preview rounded-xl2 border border-[var(--border)] bg-white p-8 shadow-soft">
            <div className="border-b border-slate-300 pb-2 text-center">
              <div className="text-2xl font-bold">{data.contact.name || "Your Name"}</div>
              <div className="mt-1 text-xs text-slate-600">
                {[data.contact.email, data.contact.phone, data.contact.location, data.contact.links].filter(Boolean).join("  •  ")}
              </div>
            </div>

            {data.summary && <PSection title="Summary"><p className="text-sm">{data.summary}</p></PSection>}

            {data.education.some((e) => e.school) && (
              <PSection title="Education">
                {data.education.filter((e) => e.school).map((e, i) => (
                  <div key={i} className="mb-1.5">
                    <div className="flex justify-between text-sm font-semibold"><span>{e.school}</span><span>{e.gradYear}</span></div>
                    <div className="text-sm text-slate-700">{[e.credential, e.gpa && `GPA ${e.gpa}`].filter(Boolean).join(" • ")}</div>
                  </div>
                ))}
              </PSection>
            )}

            {data.experience.some((e) => e.title || e.org) && (
              <PSection title="Experience">
                {data.experience.filter((e) => e.title || e.org).map((e, i) => <PEntry key={i} e={e} />)}
              </PSection>
            )}

            {data.activities.some((e) => e.title || e.org) && (
              <PSection title="Activities & Leadership">
                {data.activities.filter((e) => e.title || e.org).map((e, i) => <PEntry key={i} e={e} />)}
              </PSection>
            )}

            {data.skills.trim() && (
              <PSection title="Skills"><p className="text-sm">{data.skills}</p></PSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function PEntry({ e }: { e: Entry }) {
    const bl = lines(e.bullets);
    return (
      <div className="mb-2">
        <div className="flex justify-between text-sm font-semibold">
          <span>{e.title}{e.org ? `, ${e.org}` : ""}</span>
          <span>{e.dates}</span>
        </div>
        {e.location && <div className="text-xs text-slate-600">{e.location}</div>}
        {bl.length > 0 && (
          <ul className="ml-4 list-disc text-sm text-slate-800">
            {bl.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    );
  }
}

/* ---- small form primitives ---- */
function Card({ title, children, onAdd }: { title: string; children: React.ReactNode; onAdd?: () => void }) {
  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="display font-bold">{title}</h3>
        {onAdd && <button type="button" className="chip" onClick={onAdd}>＋ Add</button>}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}
function Entryish({ children, onRemove }: { children: React.ReactNode; onRemove?: () => void }) {
  return (
    <div className="rounded-xl2 border border-[var(--border)] p-3">
      <div className="space-y-3">{children}</div>
      {onRemove && (
        <button type="button" className="link mt-2 text-xs text-rose-600" onClick={onRemove}>Remove</button>
      )}
    </div>
  );
}
function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-ink-muted">{label}</span>
      <input className="input !py-2" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
function Area({ label, value, onChange, placeholder }: { label?: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-xs font-bold text-ink-muted">{label}</span>}
      <textarea className="input min-h-20" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}
function PSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <h2 className="mb-1 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h2>
      {children}
    </div>
  );
}
