"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { INDUSTRIES, US_STATES, type IndustryId } from "@/lib/catalog";

export type ProfileInit = {
  gradeLevel: string;
  state: string | null;
  gpa: number | null;
  interests: IndustryId[];
  skills: string[];
  extracurriculars: string;
  bio: string;
};

const GRADES = [
  { v: "hs-9", l: "High school — 9th grade" },
  { v: "hs-10", l: "High school — 10th grade" },
  { v: "hs-11", l: "High school — 11th grade" },
  { v: "hs-12", l: "High school — 12th grade" },
  { v: "college-1", l: "College — 1st year" },
  { v: "college-2", l: "College — 2nd year" },
  { v: "college-3", l: "College — 3rd year" },
  { v: "college-4", l: "College — 4th year+" },
  { v: "grad-masters", l: "Graduate — Master's / MBA" },
  { v: "grad-phd", l: "Graduate — PhD / doctoral" },
  { v: "other", l: "Other" },
];

export function ProfileForm({ init }: { init: ProfileInit }) {
  const router = useRouter();
  const [gradeLevel, setGradeLevel] = useState(init.gradeLevel);
  const [state, setState] = useState(init.state ?? "");
  const [gpa, setGpa] = useState(init.gpa != null ? String(init.gpa) : "");
  const [interests, setInterests] = useState<IndustryId[]>(init.interests);
  const [skills, setSkills] = useState<string[]>(init.skills);
  const [skillInput, setSkillInput] = useState("");
  const [extracurriculars, setExtracurriculars] = useState(init.extracurriculars);
  const [bio, setBio] = useState(init.bio);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggleInterest(id: IndustryId) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function addSkill() {
    const s = skillInput.trim();
    if (s && !skills.includes(s) && skills.length < 30) setSkills([...skills, s]);
    setSkillInput("");
  }

  async function save() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gradeLevel,
        state: state || null,
        gpa: gpa ? Number(gpa) : null,
        interests,
        skills,
        extracurriculars,
        bio,
      }),
    });
    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="card space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block sm:col-span-1">
            <span className="mb-1 block text-sm font-bold">Grade level</span>
            <select className="input" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}>
              <option value="">Select…</option>
              {GRADES.map((g) => <option key={g.v} value={g.v}>{g.l}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-bold">State</span>
            <select className="input" value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">No preference</option>
              {US_STATES.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-bold">GPA (optional)</span>
            <input className="input" type="number" step="0.1" min="0" max="5" value={gpa} onChange={(e) => setGpa(e.target.value)} placeholder="3.5" />
          </label>
        </div>
      </div>

      <div className="card">
        <span className="mb-2 block text-sm font-bold">Interests (pick the fields you care about)</span>
        <div className="flex flex-wrap gap-1.5">
          {INDUSTRIES.map((i) => (
            <button
              key={i.id}
              type="button"
              className="chip"
              data-active={interests.includes(i.id)}
              onClick={() => toggleInterest(i.id)}
              style={interests.includes(i.id) ? { background: i.color, borderColor: i.color } : undefined}
            >
              <span aria-hidden>{i.emoji}</span> {i.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <span className="mb-2 block text-sm font-bold">Skills</span>
        <div className="flex gap-2">
          <input
            className="input"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
            placeholder="e.g. Python, public speaking, Photoshop"
          />
          <button type="button" className="btn-ghost" onClick={addSkill}>Add</button>
        </div>
        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <button key={s} type="button" className="chip" onClick={() => setSkills(skills.filter((x) => x !== s))}>
                {s} ✕
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="card space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-bold">Extracurriculars & experience</span>
          <textarea className="input min-h-24" value={extracurriculars} onChange={(e) => setExtracurriculars(e.target.value)} placeholder="Clubs, jobs, volunteering, projects…" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-bold">About you</span>
          <textarea className="input min-h-20" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A sentence or two about your goals." />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button className="btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save profile"}
        </button>
        {saved && <span className="text-sm font-semibold text-emerald-600">✓ Saved</span>}
        <Link href="/for-you" className="link ml-auto">See your matches →</Link>
      </div>
    </div>
  );
}
