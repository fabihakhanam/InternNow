"use client";

import { useState } from "react";
import { DocToolbar } from "./DocToolbar";

export type CoverLetterData = {
  senderName: string;
  senderContact: string;
  date: string;
  recipientName: string;
  orgName: string;
  role: string;
  greeting: string;
  intro: string;
  body: string;
  closing: string;
  signOff: string;
};

export const emptyCoverLetter: CoverLetterData = {
  senderName: "",
  senderContact: "",
  date: "",
  recipientName: "",
  orgName: "",
  role: "",
  greeting: "",
  intro: "",
  body: "",
  closing: "",
  signOff: "Sincerely,",
};

const PROMPTS = {
  intro: "Introduce yourself, name the role/program, and say why you're excited in one or two sentences.",
  body: "Give one specific example that shows you're a fit — a project, class, or experience and what you achieved.",
  closing: "Restate your interest, mention you'd love to talk, and thank them.",
};

export function CoverLetterBuilder({
  id,
  initialTitle,
  initialData,
}: {
  id: string;
  initialTitle: string;
  initialData: Partial<CoverLetterData>;
}) {
  const [data, setData] = useState<CoverLetterData>({ ...emptyCoverLetter, ...initialData });
  const set = (patch: Partial<CoverLetterData>) => setData((d) => ({ ...d, ...patch }));

  const greeting = data.greeting || (data.recipientName ? `Dear ${data.recipientName},` : "Dear Hiring Team,");

  return (
    <div>
      <DocToolbar id={id} type="cover-letter" title={initialTitle} getData={() => data} />

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        {/* form */}
        <div className="space-y-4">
          <div className="card space-y-3">
            <h3 className="display font-bold">Your info</h3>
            <F label="Your name" value={data.senderName} onChange={(v) => set({ senderName: v })} />
            <F label="Your contact (email • phone)" value={data.senderContact} onChange={(v) => set({ senderContact: v })} />
            <F label="Date" value={data.date} onChange={(v) => set({ date: v })} placeholder="e.g. August 17, 2026" />
          </div>

          <div className="card space-y-3">
            <h3 className="display font-bold">Who it&apos;s to</h3>
            <F label="Organization" value={data.orgName} onChange={(v) => set({ orgName: v })} />
            <F label="Role / program" value={data.role} onChange={(v) => set({ role: v })} />
            <F label="Recipient name (optional)" value={data.recipientName} onChange={(v) => set({ recipientName: v })} placeholder="Leave blank for 'Dear Hiring Team,'" />
          </div>

          <div className="card space-y-3">
            <h3 className="display font-bold">The letter</h3>
            <A label="Opening" value={data.intro} onChange={(v) => set({ intro: v })} hint={PROMPTS.intro} />
            <A label="Body" value={data.body} onChange={(v) => set({ body: v })} hint={PROMPTS.body} />
            <A label="Closing" value={data.closing} onChange={(v) => set({ closing: v })} hint={PROMPTS.closing} />
            <F label="Sign-off" value={data.signOff} onChange={(v) => set({ signOff: v })} />
          </div>
        </div>

        {/* preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div id="doc-print" className="doc-preview rounded-xl2 border border-[var(--border)] bg-white p-8 text-sm leading-relaxed shadow-soft">
            <div className="mb-6">
              <div className="font-semibold">{data.senderName || "Your Name"}</div>
              {data.senderContact && <div className="text-slate-600">{data.senderContact}</div>}
            </div>
            {data.date && <div className="mb-4">{data.date}</div>}
            <div className="mb-4">
              {data.orgName && <div className="font-semibold">{data.orgName}</div>}
              {data.role && <div className="text-slate-700">Re: {data.role}</div>}
            </div>
            <p className="mb-3">{greeting}</p>
            {[data.intro, data.body, data.closing].map(
              (p, i) => p.trim() && <p key={i} className="mb-3 whitespace-pre-wrap">{p}</p>
            )}
            <p className="mt-6">{data.signOff}</p>
            <p className="font-semibold">{data.senderName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function F({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-ink-muted">{label}</span>
      <input className="input !py-2" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}
function A({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-ink-muted">{label}</span>
      <textarea className="input min-h-24" value={value} onChange={(e) => onChange(e.target.value)} placeholder={hint} />
    </label>
  );
}
