// Original how-to articles for the InternNow resource library.

export type Article = {
  slug: string;
  title: string;
  category: string;
  minutes: number;
  emoji: string;
  excerpt: string;
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "how-to-network",
    title: "How to Network (Without Feeling Awkward)",
    category: "Networking",
    minutes: 5,
    emoji: "🤝",
    excerpt: "Networking is just talking to people about things you're both curious about. Here's how to start.",
    sections: [
      {
        heading: "Reframe what networking is",
        paragraphs: [
          "Networking isn't asking strangers for favors. It's building genuine relationships by being curious about what other people do. Most professionals remember being a student and are happy to help — you just have to ask well.",
        ],
      },
      {
        heading: "Where to start",
        bullets: [
          "Teachers, counselors, and family friends — the easiest first connections.",
          "Alumni from your school in a field you're curious about.",
          "Speakers at events, info sessions, and career fairs.",
          "People whose work you admire online (a short, specific message goes far).",
        ],
      },
      {
        heading: "The 15-minute informational chat",
        paragraphs: [
          "Ask for 15 minutes to learn about someone's path — not a job. Come with 3–4 specific questions, take notes, and end by asking, 'Is there anyone else you'd suggest I talk to?' Always follow up with a thank-you.",
        ],
      },
    ],
  },
  {
    slug: "cold-email",
    title: "Writing a Cold Email That Gets a Reply",
    category: "Networking",
    minutes: 4,
    emoji: "✉️",
    excerpt: "A short, specific, respectful email beats a long one every time. Here's a simple template.",
    sections: [
      {
        heading: "The formula",
        bullets: [
          "Subject: clear and specific — 'Question from a high school student interested in marine biology'.",
          "Line 1: who you are (one sentence).",
          "Line 2: why them specifically — reference their actual work.",
          "Line 3: a small, easy ask (15 minutes, or one question).",
          "Line 4: thank them and make it easy to say yes.",
        ],
      },
      {
        heading: "Example",
        paragraphs: [
          "\"Hi Dr. Lee, I'm a junior at Lincoln High who got hooked on marine biology after a tide-pool project. I read about your work on coral restoration and would love to hear how you got started. Could I ask you two quick questions by email, or grab 15 minutes whenever's easy for you? Thank you either way!\"",
        ],
      },
      {
        heading: "Rules of thumb",
        bullets: [
          "Keep it under 120 words.",
          "Proofread — one typo can undercut the whole thing.",
          "If you don't hear back in a week, send one short, polite follow-up.",
        ],
      },
    ],
  },
  {
    slug: "first-internship",
    title: "What to Expect at Your First Internship",
    category: "On the job",
    minutes: 6,
    emoji: "🚀",
    excerpt: "Nobody expects you to know everything. Here's how to make a great impression anyway.",
    sections: [
      {
        heading: "Your first week",
        bullets: [
          "Show up a few minutes early and figure out the tools they use.",
          "Write down names, logins, and how-tos — you won't remember them all.",
          "Ask your manager what a 'great summer' would look like to them.",
        ],
      },
      {
        heading: "How to be the intern everyone wants back",
        bullets: [
          "Ask questions after trying first — 'I tried X and got Y, what am I missing?'",
          "Do the unglamorous task well; reliability is remembered.",
          "Send a short weekly update on what you did and what's next.",
          "Keep a running list of your accomplishments for your résumé later.",
        ],
      },
      {
        heading: "Before you leave",
        paragraphs: [
          "Ask your supervisor if they'd be a reference, and connect on LinkedIn. A strong reference is often worth more than the title on your résumé.",
        ],
      },
    ],
  },
  {
    slug: "resume-basics",
    title: "Résumé Basics for Students",
    category: "Applications",
    minutes: 5,
    emoji: "📄",
    excerpt: "You have more to put on a résumé than you think. Here's how to make one page count.",
    sections: [
      {
        heading: "What to include",
        bullets: [
          "Contact info, education, experience, activities/leadership, and skills.",
          "Experience counts broadly: jobs, volunteering, projects, clubs, and family responsibilities.",
        ],
      },
      {
        heading: "Write strong bullet points",
        paragraphs: [
          "Start each with an action verb and, where you can, a number. 'Tutored 8 younger students weekly, raising their quiz average by a letter grade' beats 'Was a tutor.'",
        ],
      },
      {
        heading: "Keep it clean",
        bullets: [
          "One page, consistent formatting, no typos.",
          "Save and share as a PDF so it looks the same everywhere.",
          "Tailor the top of your résumé to each opportunity.",
        ],
      },
    ],
  },
  {
    slug: "ask-for-recommendation",
    title: "How to Ask for a Recommendation Letter",
    category: "Applications",
    minutes: 4,
    emoji: "💌",
    excerpt: "Ask the right person, the right way, with enough time — and make their job easy.",
    sections: [
      {
        heading: "Who to ask",
        paragraphs: [
          "Pick someone who knows your work and likes it — a teacher, coach, or supervisor who has seen you grow, not just the most impressive name.",
        ],
      },
      {
        heading: "How to ask",
        bullets: [
          "Ask at least 3–4 weeks before the deadline, in person or in a thoughtful email.",
          "Give them a 'brag sheet': the opportunity, the deadline, and 3 things you'd love them to mention.",
          "Share your résumé and remind them of a specific moment they witnessed.",
          "Send a thank-you afterward and tell them how it turned out.",
        ],
      },
    ],
  },
  {
    slug: "paid-vs-unpaid",
    title: "Paid vs. Unpaid: How to Decide",
    category: "Applications",
    minutes: 4,
    emoji: "💸",
    excerpt: "Compensation matters — but so does what you'll learn. Here's how to weigh it.",
    sections: [
      {
        heading: "Look at the whole picture",
        bullets: [
          "Many of the strongest student programs are free to join and even pay a stipend — don't skip them.",
          "For unpaid roles, ask what you'll actually learn and who you'll work with.",
          "Check for hidden costs: transportation, housing, or required materials.",
          "Ask if stipends, scholarships, or travel support are available — many programs have them.",
        ],
      },
      {
        heading: "A fair question to ask",
        paragraphs: [
          "It's completely okay to ask, 'Is this position paid, and are there any stipends or support for travel or housing?' Good programs expect the question.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
