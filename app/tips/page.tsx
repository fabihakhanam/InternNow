export const metadata = { title: "Application tips — InternNow" };

const sections = [
  {
    icon: "🔍",
    title: "Finding the right fit",
    tips: [
      "Start with the map or an industry you're curious about — you don't need to know your career yet.",
      "Filter by your grade level (high school vs. college); many programs are age-specific.",
      "Save 5–8 opportunities, then compare deadlines and time commitments before applying.",
      "Don't skip 'free' programs — several of the most valuable ones cost nothing and even pay you.",
    ],
  },
  {
    icon: "📝",
    title: "Writing strong supplements",
    tips: [
      "Answer the actual question asked — reread the prompt after your first draft.",
      "Use one specific story instead of listing many accomplishments. Specific beats impressive.",
      "Show, don't tell: 'I grew our club from 3 to 15 members' says more than 'I'm a leader.'",
      "End with what you learned or what you'll do next — reflection signals maturity.",
      "Keep it in your own voice. Admissions and program staff can spot generic AI-sounding text.",
    ],
  },
  {
    icon: "🎤",
    title: "Interviewing with confidence",
    tips: [
      "Prepare 3 stories you can adapt to many questions (a challenge, a leadership moment, a failure).",
      "Use the STAR method: Situation, Task, Action, Result — spend most time on your Action.",
      "Research the organization's mission and mention something specific about it.",
      "It's okay to pause and think. A thoughtful 3-second silence beats a rushed answer.",
      "Prepare one genuine question to ask them — it shows real interest.",
    ],
  },
  {
    icon: "📅",
    title: "Staying organized",
    tips: [
      "Keep one spreadsheet: organization, deadline, requirements, status, and login.",
      "Ask recommenders at least 3–4 weeks before a deadline, and share your resume with them.",
      "Set calendar reminders a week before each deadline, not the day of.",
      "Reuse and tailor essays — keep a 'master doc' of your best paragraphs.",
    ],
  },
  {
    icon: "🚀",
    title: "Making the most of it",
    tips: [
      "Say yes to stretch assignments — that's where growth (and references) come from.",
      "Track what you accomplish weekly so you can update your resume later.",
      "Ask your mentor if you can stay in touch; a strong reference is worth more than the title.",
      "Reflect afterward: what did you love, what didn't you? That shapes your next step.",
    ],
  },
];

export default function TipsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="display text-3xl font-bold">Application & interview tips</h1>
      <p className="muted mt-1">
        Practical, no-nonsense advice for landing (and thriving in) your first
        internships and volunteering roles.
      </p>

      <div className="mt-8 space-y-6">
        {sections.map((s) => (
          <section key={s.title} className="card">
            <h2 className="display flex items-center gap-2 text-xl font-bold">
              <span aria-hidden>{s.icon}</span> {s.title}
            </h2>
            <ul className="mt-3 space-y-2">
              {s.tips.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="text-brand-500">✓</span>
                  <span className="text-ink-soft">{t}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
