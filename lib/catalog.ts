// InternNow catalog: industries + a curated set of real organizations.
//
// IMPORTANT: Organization names, descriptions, and website URLs are factual and
// were verified. The `interviewProcess`, `supplements`, and `tips` fields are
// ILLUSTRATIVE EXAMPLES written by InternNow to help applicants prepare — they
// are NOT any organization's official prompts, questions, or answers. Always
// check the org's own site (linked) for current, authoritative details.

export type IndustryId =
  | "technology"
  | "business"
  | "law"
  | "arts"
  | "science"
  | "healthcare"
  | "government"
  | "nonprofit"
  | "education";

export type Audience = "high-school" | "college";
export type OppType =
  | "internship"
  | "volunteering"
  | "fellowship"
  | "program"
  | "scholarship";
export type Format = "in-person" | "remote" | "hybrid";
export type Cost = "free" | "paid" | "stipend";

export type Industry = {
  id: IndustryId;
  label: string;
  emoji: string;
  color: string; // used for map pins + badges
  blurb: string;
};

export type OppLocation = {
  city: string;
  state: string; // 2-letter
  lat: number;
  lng: number;
};

export type Supplement = {
  prompt: string;
  sampleAnswer: string;
  tips: string;
};

export type Opportunity = {
  id: string;
  org: string;
  program?: string;
  url: string;
  industries: IndustryId[];
  audiences: Audience[];
  types: OppType[];
  format: Format;
  national: boolean;
  locations: OppLocation[];
  cost: Cost;
  compensation?: string;
  deadlineNote?: string;
  summary: string;
  about: string;
  interviewProcess: string[];
  supplements: Supplement[];
  tips: string[];
};

export const INDUSTRIES: Industry[] = [
  { id: "technology", label: "Technology", emoji: "💻", color: "#3a5ce8", blurb: "Software, data, AI, IT, and product." },
  { id: "business", label: "Business & Finance", emoji: "📈", color: "#0e9f6e", blurb: "Finance, consulting, marketing, and entrepreneurship." },
  { id: "law", label: "Law & Justice", emoji: "⚖️", color: "#7c3aed", blurb: "Legal, advocacy, and public interest." },
  { id: "arts", label: "Arts & Culture", emoji: "🎨", color: "#ec4899", blurb: "Museums, design, performing and visual arts." },
  { id: "science", label: "Science & Research", emoji: "🔬", color: "#06b6d4", blurb: "STEM research, labs, space, and engineering." },
  { id: "healthcare", label: "Healthcare & Medicine", emoji: "🩺", color: "#ef4444", blurb: "Clinical, public health, and biomedical research." },
  { id: "government", label: "Government & Policy", emoji: "🏛️", color: "#64748b", blurb: "Civic leadership, policy, and public service." },
  { id: "nonprofit", label: "Nonprofit & Social Impact", emoji: "🤝", color: "#f59e0b", blurb: "Community service, volunteering, and social good." },
  { id: "education", label: "Education & College Prep", emoji: "🎓", color: "#eab308", blurb: "Scholarships, mentorship, and college access." },
];

export const AUDIENCE_LABELS: Record<Audience, string> = {
  "high-school": "High school",
  college: "College",
};

export const TYPE_LABELS: Record<OppType, string> = {
  internship: "Internship",
  volunteering: "Volunteering",
  fellowship: "Fellowship",
  program: "Program",
  scholarship: "Scholarship",
};

export const COST_LABELS: Record<Cost, string> = {
  free: "Free to join",
  paid: "Paid",
  stipend: "Stipend",
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "seo-scholars",
    org: "SEO (Sponsors for Educational Opportunity)",
    program: "SEO Scholars",
    url: "https://www.seo-usa.org",
    industries: ["education", "business"],
    audiences: ["high-school"],
    types: ["program", "scholarship"],
    format: "in-person",
    national: false,
    locations: [
      { city: "New York", state: "NY", lat: 40.7128, lng: -74.006 },
      { city: "San Francisco", state: "CA", lat: 37.7749, lng: -122.4194 },
      { city: "Miami", state: "FL", lat: 25.7617, lng: -80.1918 },
      { city: "Durham", state: "NC", lat: 35.994, lng: -78.8986 },
    ],
    cost: "free",
    compensation: "Free 8-year academic program; no cost to families.",
    deadlineNote: "Applications typically open to public-school students in the fall.",
    summary: "A free, 8-year academic program that helps public high school students become college graduates.",
    about:
      "SEO Scholars is a free, rigorous academic program for public high school students that provides supplemental instruction, college counseling, and support all the way through college graduation.",
    interviewProcess: [
      "Submit an online application with school and academic information.",
      "Complete a diagnostic assessment (math and reading).",
      "Attend an interview or info session with program staff.",
      "Receive an admissions decision and onboarding for the summer start.",
    ],
    supplements: [
      {
        prompt: "Why do you want to join a multi-year college-access program, and what will you commit to it?",
        sampleAnswer:
          "I want to be the first in my family to graduate college, and I know I'll get there faster with structure and mentors. I'm ready to give up Saturday mornings for classes because I've seen how consistent practice raised my math grade from a C to an A this year. A multi-year program means someone is invested in me for the long haul, and I'll show up for that every single week.",
        tips: "Name a concrete goal, prove your commitment with one specific example, and show you understand it's a long-term investment.",
      },
    ],
    tips: [
      "Apply as early in high school as you're eligible — the earlier you start, the more support you get.",
      "Show consistent effort over raw scores; growth stories are compelling.",
      "Talk to a current or former Scholar to understand the weekly time commitment.",
    ],
  },
  {
    id: "seo-career",
    org: "SEO (Sponsors for Educational Opportunity)",
    program: "SEO Career",
    url: "https://www.seo-usa.org",
    industries: ["business", "technology", "law"],
    audiences: ["college"],
    types: ["internship", "fellowship"],
    format: "hybrid",
    national: true,
    locations: [{ city: "New York", state: "NY", lat: 40.7128, lng: -74.006 }],
    cost: "paid",
    compensation: "Paid summer internships with corporate partners.",
    deadlineNote: "Recruiting generally begins in the fall for the following summer.",
    summary: "Recruits and prepares high-achieving undergraduates for paid summer internships in corporate America.",
    about:
      "SEO Career identifies undergraduates from underrepresented backgrounds and provides training, mentorship, and placement into competitive summer internships across finance, tech, law, and more.",
    interviewProcess: [
      "Apply online and submit your resume and transcript.",
      "Complete behavioral and program-fit interviews with SEO.",
      "If matched, interview with a partner company for a specific internship.",
      "Attend pre-internship training before your summer placement.",
    ],
    supplements: [
      {
        prompt: "Tell us about a time you overcame a significant obstacle.",
        sampleAnswer:
          "During my first college semester I was working 25 hours a week and failing calculus. Instead of dropping it, I mapped my week hour by hour, moved shifts to weekends, and joined a 7am study group. I finished with a B+ and, more importantly, learned to ask for help early. That habit is why I now tutor two first-year students myself.",
        tips: "Use the STAR method (Situation, Task, Action, Result). Focus 70% on the action you took and end with what you learned.",
      },
      {
        prompt: "Why this industry, and why now?",
        sampleAnswer:
          "I'm drawn to finance because it's where analysis turns into real decisions with real consequences. This past year I ran a mock portfolio for my investing club and realized I love the discipline of defending a thesis with data. An internship now would let me test that interest against the real thing before I commit my career to it.",
        tips: "Connect a specific personal experience to the industry; avoid generic 'I like helping people' answers.",
      },
    ],
    tips: [
      "Start networking with SEO alumni early — many roles are relationship-driven.",
      "Polish your resume to one page with quantified achievements.",
      "Practice behavioral interviews out loud, not just in your head.",
    ],
  },
  {
    id: "seeds-of-fortune",
    org: "Seeds of Fortune Inc.",
    url: "https://www.seedsoffortune.org",
    industries: ["education", "business"],
    audiences: ["high-school", "college"],
    types: ["program", "scholarship", "fellowship"],
    format: "remote",
    national: true,
    locations: [{ city: "New York", state: "NY", lat: 40.7128, lng: -74.006 }],
    cost: "free",
    compensation: "Free platform and Scholars program; members have earned $73M+ in grants and scholarships.",
    deadlineNote: "Membership and the Scholars program open on a rolling basis — check the site.",
    summary: "A college and career platform focused on college admissions, financial literacy, and scholarships.",
    about:
      "Seeds of Fortune runs an online platform and Scholars program that supports high school and college students with college admissions guidance, financial literacy, career pathways, and scholarship access.",
    interviewProcess: [
      "Create a member profile on the Seeds of Fortune platform.",
      "Complete onboarding modules on college and scholarship planning.",
      "Apply to the Scholars program via application and short essays.",
      "Participate in cohort programming and financial-literacy workshops.",
    ],
    supplements: [
      {
        prompt: "How would you use financial literacy skills to change your future?",
        sampleAnswer:
          "Nobody in my house talks about money because it always felt scary. Learning how compound interest and scholarships actually work would let me graduate college with less debt than my older cousins, who are still paying loans years later. I'd also teach my younger sister what I learn, so the cycle breaks with us.",
        tips: "Be honest about your starting point and show how the skill creates a ripple effect beyond just you.",
      },
    ],
    tips: [
      "Complete your profile fully — scholarship matching improves with more information.",
      "Apply to scholarships continuously, not just senior year.",
      "Track deadlines in a single spreadsheet to avoid missing awards.",
    ],
  },
  {
    id: "america-on-tech",
    org: "America On Tech (AOT)",
    url: "https://www.americaontech.org",
    industries: ["technology"],
    audiences: ["high-school", "college"],
    types: ["program", "internship", "fellowship"],
    format: "hybrid",
    national: false,
    locations: [
      { city: "New York", state: "NY", lat: 40.7128, lng: -74.006 },
      { city: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437 },
      { city: "Miami", state: "FL", lat: 25.7617, lng: -80.1918 },
      { city: "Atlanta", state: "GA", lat: 33.749, lng: -84.388 },
    ],
    cost: "free",
    compensation: "Free programs; some tracks include paid fellowships and stipends.",
    deadlineNote: "Program cohorts recruit seasonally by city.",
    summary: "Prepares the next generation of technology leaders from underestimated communities.",
    about:
      "America On Tech creates pathways to technology careers through programs like TECH360, Tech Flex Leaders, and fellowships, plus AI training, for students from underrepresented communities.",
    interviewProcess: [
      "Submit a program application for your city and grade level.",
      "Attend an interest/info session.",
      "Complete a short skills or motivation interview.",
      "Enroll in a cohort and begin project-based learning.",
    ],
    supplements: [
      {
        prompt: "Describe something you've built or want to build with technology.",
        sampleAnswer:
          "I built a simple website for my mom's home-catering business using a free template, and watching her get three new orders from it flipped a switch for me. I want to learn real coding so I can add online ordering and a photo menu. Tech isn't abstract to me — it's a way to make the people I love more successful.",
        tips: "You don't need a polished project — show curiosity and a real-world reason you care about tech.",
      },
    ],
    tips: [
      "Highlight persistence and curiosity over existing coding skills.",
      "Bring any project, even a small one — a spreadsheet, a game mod, a Canva design.",
      "Ask about which city cohorts and tracks fit your schedule.",
    ],
  },
  {
    id: "genesys-works",
    org: "Genesys Works",
    url: "https://www.genesysworks.org",
    industries: ["technology", "business"],
    audiences: ["high-school"],
    types: ["internship", "program"],
    format: "in-person",
    national: false,
    locations: [
      { city: "Houston", state: "TX", lat: 29.7604, lng: -95.3698 },
      { city: "Chicago", state: "IL", lat: 41.8781, lng: -87.6298 },
      { city: "New York", state: "NY", lat: 40.7128, lng: -74.006 },
      { city: "Nashville", state: "TN", lat: 36.1627, lng: -86.7816 },
      { city: "Tulsa", state: "OK", lat: 36.154, lng: -95.9928 },
      { city: "Washington", state: "DC", lat: 38.9072, lng: -77.0369 },
    ],
    cost: "paid",
    compensation: "Paid corporate internships during senior year of high school.",
    deadlineNote: "Recruits high school juniors for a program that runs through senior year.",
    summary: "Skills training plus paid corporate internships and college coaching for high school students.",
    about:
      "Genesys Works trains high school students in underserved communities and places them in paid internships with corporate partners, with college and career coaching that continues as alumni.",
    interviewProcess: [
      "Apply as a high school junior through your school or the website.",
      "Complete summer skills training (technical + professional).",
      "Interview with a corporate partner for an internship match.",
      "Begin your paid internship during senior year with ongoing coaching.",
    ],
    supplements: [
      {
        prompt: "Why do you want a professional internship while still in high school?",
        sampleAnswer:
          "I've only ever seen the kinds of jobs people in my neighborhood have, and I want to know what an office career actually feels like before I pick a college major. A paid internship also helps my family, which means I can focus on doing great work instead of worrying about money. I'm ready to be the youngest person in the room and prove I belong there.",
        tips: "Show maturity and a growth mindset; mention how the paid aspect enables you to fully commit.",
      },
    ],
    tips: [
      "Treat the summer training like a job — attendance and professionalism are tracked.",
      "Practice a firm handshake, eye contact, and a 30-second self-introduction.",
      "Keep your corporate mentor's contact for future references.",
    ],
  },
  {
    id: "girls-who-code",
    org: "Girls Who Code",
    url: "https://girlswhocode.com",
    industries: ["technology"],
    audiences: ["high-school"],
    types: ["program"],
    format: "hybrid",
    national: true,
    locations: [{ city: "New York", state: "NY", lat: 40.7128, lng: -74.006 }],
    cost: "free",
    compensation: "Free programs; nationwide clubs and self-paced pathways.",
    deadlineNote: "Summer/seasonal programs have set application windows; clubs run year-round.",
    summary: "Free coding programs, clubs, and pathways for students to explore tech, AI, and cybersecurity.",
    about:
      "Girls Who Code offers free programs — including Clubs (grades 3–12) and Pathways for high schoolers — that build computer science skills and confidence, with a focus on closing the gender gap in tech.",
    interviewProcess: [
      "Choose a program (Club, Pathways, or a seasonal offering).",
      "Complete the free online application when the window is open.",
      "For selective summer programs, submit short-answer responses.",
      "Receive placement and join your cohort or local club.",
    ],
    supplements: [
      {
        prompt: "Why is it important to you that more girls and women work in technology?",
        sampleAnswer:
          "In my computer class I was the only girl who stayed after to debug our robot, and I noticed the app we built didn't account for anyone like my grandmother, who can barely see the screen. Technology is built by whoever shows up — so if girls don't show up, whole groups of people get ignored. I want to be in the room where those decisions get made.",
        tips: "Connect the mission to a specific observation from your own life; specificity beats slogans.",
      },
    ],
    tips: [
      "No prior coding experience is required — enthusiasm matters most.",
      "Join a free Club first if a selective program feels intimidating.",
      "Build a tiny project (a webpage, a Scratch game) to talk about.",
    ],
  },
  {
    id: "nasa-ostem",
    org: "NASA",
    program: "OSTEM Internships",
    url: "https://www.nasa.gov/learning-resources/internship-programs/",
    industries: ["science"],
    audiences: ["college"],
    types: ["internship"],
    format: "hybrid",
    national: true,
    locations: [{ city: "Washington", state: "DC", lat: 38.9072, lng: -77.0369 }],
    cost: "stipend",
    compensation: "Paid internships (stipend) across NASA centers; U.S. citizenship required.",
    deadlineNote: "Sessions run fall, spring, and summer with rolling deadlines via NASA STEM Gateway.",
    summary: "Paid NASA internships across centers for students 16+ pursuing STEM and non-STEM fields.",
    about:
      "NASA's Office of STEM Engagement (OSTEM) offers paid internships at NASA centers nationwide. Applicants must be U.S. citizens, at least 16, and generally enrolled at the college level with a 3.0 GPA; all majors are welcome. Apply through NASA STEM Gateway.",
    interviewProcess: [
      "Create a profile on NASA STEM Gateway and search opportunities.",
      "Submit a single application with essays, transcript, and resume.",
      "A NASA mentor reviews applications and may reach out to selected students.",
      "Accept an offer and complete onboarding for your session.",
    ],
    supplements: [
      {
        prompt: "Describe your interest in NASA's mission and how your skills contribute.",
        sampleAnswer:
          "I've followed every Artemis milestone the way some people follow sports. In my data-structures course I built a program that visualizes orbital paths, which taught me both the math and how quickly small errors compound in space applications. I'd bring careful, tested code and a hunger to learn from engineers who do this for real missions.",
        tips: "Reference a specific NASA mission or program and tie it to concrete coursework or projects.",
      },
    ],
    tips: [
      "Write your essays to be readable by mentors across many centers — clarity wins.",
      "List technical skills and tools explicitly; mentors search for keywords.",
      "Apply early in the session window; some mentors review on a rolling basis.",
    ],
  },
  {
    id: "year-up",
    org: "Year Up United",
    url: "https://www.yearup.org",
    industries: ["technology", "business"],
    audiences: ["college"],
    types: ["program", "internship"],
    format: "in-person",
    national: true,
    locations: [{ city: "Boston", state: "MA", lat: 42.3601, lng: -71.0589 }],
    cost: "stipend",
    compensation: "Tuition-free training plus a stipend and a corporate internship.",
    deadlineNote: "Cohorts start throughout the year across 20+ campuses.",
    summary: "Tuition-free job training with a stipend and internships for young adults.",
    about:
      "Year Up United provides free, intensive job training for young adults built around a Train–Experience–Access model: skills training, a hands-on internship with a corporate partner, and career placement support, across 20+ U.S. campuses.",
    interviewProcess: [
      "Attend an info session and confirm eligibility.",
      "Submit an application and complete an interview about your goals.",
      "Enroll in the learning-and-development phase (skills + professionalism).",
      "Match to a corporate internship and transition to career placement.",
    ],
    supplements: [
      {
        prompt: "What are your career goals, and how will a year of training help you reach them?",
        sampleAnswer:
          "I want a stable career in IT support that can grow into cloud administration. I've fixed every family member's laptop for years, but I've never had a credential to prove it. A year of structured training plus a real internship would turn 'the kid who's good with computers' into a hireable professional with references and a certification.",
        tips: "State a specific role you're targeting and show the gap this program closes for you.",
      },
    ],
    tips: [
      "Commitment and attendance are central — plan your finances and transportation.",
      "Lean into the professional-skills training; it's what employers notice.",
      "Keep in touch with your internship team for full-time referrals.",
    ],
  },
  {
    id: "legal-outreach",
    org: "Legal Outreach",
    url: "https://www.legaloutreach.org",
    industries: ["law", "education"],
    audiences: ["high-school"],
    types: ["program", "internship"],
    format: "in-person",
    national: false,
    locations: [{ city: "Long Island City", state: "NY", lat: 40.7447, lng: -73.9485 }],
    cost: "free",
    compensation: "Free; law-based college-prep program with a Summer Law Institute.",
    deadlineNote: "Recruits students beginning in the eighth grade in NYC.",
    summary: "A law-based, college-prep program that builds academic skills and confidence for NYC youth.",
    about:
      "Legal Outreach uses law-based education — including a Summer Law Institute, a four-year College Bound program, and civic engagement — to help low-income, first-generation NYC students matriculate to competitive colleges.",
    interviewProcess: [
      "Apply (often through your NYC middle/high school) as an incoming student.",
      "Complete an interview and writing sample.",
      "Attend the Summer Law Institute to begin the program.",
      "Continue through the multi-year College Bound curriculum.",
    ],
    supplements: [
      {
        prompt: "Why does justice or the law matter to you?",
        sampleAnswer:
          "When my family faced an eviction notice we didn't understand, a legal aid volunteer explained our rights in ten minutes and everything changed. That moment showed me the law isn't just rules — it's power that most people in my neighborhood don't know how to use. I want to be the person who explains it in plain language to families like mine.",
        tips: "Ground your interest in a real experience; mock-trial fans should still add a personal 'why'.",
      },
    ],
    tips: [
      "Be ready for public speaking and debate — it's core to the program.",
      "Show you'll commit for multiple years, not just a summer.",
      "Read a bit about a current legal issue you care about before interviewing.",
    ],
  },
  {
    id: "smithsonian-internships",
    org: "Smithsonian Institution",
    program: "Internships & Fellowships",
    url: "https://internships.si.edu",
    industries: ["arts", "science"],
    audiences: ["college"],
    types: ["internship", "fellowship"],
    format: "in-person",
    national: true,
    locations: [{ city: "Washington", state: "DC", lat: 38.9072, lng: -77.0369 }],
    cost: "stipend",
    compensation: "Many internships offer stipends; opportunities span 21 museums, research centers, and the zoo.",
    deadlineNote: "Deadlines vary widely by museum/program; check individual listings.",
    summary: "Internships and fellowships across the Smithsonian's museums, research centers, and the National Zoo.",
    about:
      "The Smithsonian's Office of Academic Appointments and Internships manages internships, fellowships, and research positions across 21 museums, research centers, offices, and the zoo, open to a range of majors and school years.",
    interviewProcess: [
      "Browse listings by museum, department, and field of interest.",
      "Submit an application with essays, resume, and references.",
      "Selected applicants interview with the hosting department.",
      "Match with a mentor and confirm your internship term.",
    ],
    supplements: [
      {
        prompt: "Which Smithsonian unit do you want to intern with, and why?",
        sampleAnswer:
          "I want to work with the National Museum of American History's public-programs team because I'm fascinated by how objects tell stories to strangers. In my art-history seminar I wrote about how museum labels shape what visitors believe, and I'd love to test those ideas by helping design real exhibit materials for a national audience.",
        tips: "Name a specific museum/department — generic 'the Smithsonian' answers stand out as unprepared.",
      },
    ],
    tips: [
      "Apply to specific departments, not just 'the Smithsonian' broadly.",
      "Tailor each essay to that unit's collection or research.",
      "Line up recommenders early; strong references matter here.",
    ],
  },
  {
    id: "bofa-student-leaders",
    org: "Bank of America",
    program: "Student Leaders",
    url: "https://about.bankofamerica.com/en/making-an-impact/student-leaders",
    industries: ["nonprofit", "business"],
    audiences: ["high-school"],
    types: ["internship"],
    format: "in-person",
    national: true,
    locations: [{ city: "Charlotte", state: "NC", lat: 35.2271, lng: -80.8431 }],
    cost: "paid",
    compensation: "Paid 8-week internship with a local nonprofit plus a national Leadership Summit.",
    deadlineNote: "Applications generally open in the fall/winter for the following summer (high school juniors and seniors).",
    summary: "A paid summer internship with a nonprofit plus a leadership summit for high school students.",
    about:
      "Bank of America's Student Leaders program gives high school juniors and seniors a paid summer internship with a local nonprofit and a trip to a national Leadership Summit, connecting community-minded students to employment and skills development.",
    interviewProcess: [
      "Submit the online application with essays and references.",
      "Selected applicants complete an interview with local reviewers.",
      "Finalists are matched to a local nonprofit host.",
      "Attend the paid internship and national Leadership Summit.",
    ],
    supplements: [
      {
        prompt: "How have you made a difference in your community?",
        sampleAnswer:
          "I noticed younger kids at my library had nowhere to go after school, so I organized a weekly homework-help hour and recruited four classmates to tutor. It started with three kids and grew to fifteen. I learned that leadership is mostly showing up consistently and making other people feel capable — not having all the answers myself.",
        tips: "Pick one initiative you drove and show measurable growth plus a lesson about leadership.",
      },
    ],
    tips: [
      "Emphasize service and leadership, not just grades.",
      "Quantify your impact (people reached, hours, dollars raised).",
      "Ask teachers for references well before the deadline.",
    ],
  },
  {
    id: "met-internships",
    org: "The Metropolitan Museum of Art",
    program: "Internships",
    url: "https://www.metmuseum.org/about-the-met/internships",
    industries: ["arts"],
    audiences: ["high-school", "college"],
    types: ["internship"],
    format: "in-person",
    national: false,
    locations: [{ city: "New York", state: "NY", lat: 40.7794, lng: -73.9632 }],
    cost: "paid",
    compensation: "Many Met internships are paid; programs exist for high school and college students.",
    deadlineNote: "Application windows are seasonal; deadlines differ by program.",
    summary: "Paid internships at one of the world's great art museums for high school and college students.",
    about:
      "The Metropolitan Museum of Art offers internships for high school and college students across curatorial, education, conservation, and administrative areas, giving hands-on experience in a world-class museum.",
    interviewProcess: [
      "Select the program that matches your level (high school or college).",
      "Submit an application with essays and, sometimes, a transcript.",
      "Interview with the hosting department if shortlisted.",
      "Begin your internship term with a staff supervisor.",
    ],
    supplements: [
      {
        prompt: "Describe a work of art that moved you and why.",
        sampleAnswer:
          "The first time I saw a Kehinde Wiley portrait, I stood there for ten minutes — someone who looked like my neighbors was painted with the grandeur usually reserved for kings. It made me realize who gets to be 'important' in art is a choice curators make. I want to help make those choices more inclusive, and interning here is where I'd learn how.",
        tips: "Show genuine looking and thinking; connect the artwork to a bigger idea about museums.",
      },
    ],
    tips: [
      "Write about art specifically — reference technique, context, or your reaction.",
      "Highlight reliability and attention to detail (museums value it).",
      "Apply to the program tier that matches your current level.",
    ],
  },
  {
    id: "idealist",
    org: "Idealist",
    url: "https://www.idealist.org",
    industries: ["nonprofit"],
    audiences: ["high-school", "college"],
    types: ["volunteering", "internship"],
    format: "hybrid",
    national: true,
    locations: [{ city: "New York", state: "NY", lat: 40.7128, lng: -74.006 }],
    cost: "free",
    compensation: "Free directory of volunteering, internships, and nonprofit jobs (now includes VolunteerMatch).",
    deadlineNote: "Listings are posted year-round; each has its own timeline.",
    summary: "A nationwide directory to find volunteering, internships, and jobs at nonprofits near you.",
    about:
      "Idealist connects people with volunteering, internships, and jobs at mission-driven organizations across the country. It now also hosts VolunteerMatch listings, making it a broad starting point for finding local service opportunities.",
    interviewProcess: [
      "Search by cause area, location, and remote/in-person.",
      "Read the listing and apply or express interest directly to the org.",
      "The nonprofit follows up — some have a quick interview or orientation.",
      "Complete any onboarding and start volunteering or interning.",
    ],
    supplements: [
      {
        prompt: "Why do you want to volunteer with our organization?",
        sampleAnswer:
          "I follow your work on food insecurity because my own family relied on a pantry when I was younger. I don't just want to check a service-hours box — I want to help other families feel the dignity that volunteers showed mine. I can commit to a weekly shift and I'm comfortable doing the unglamorous work of stocking and sorting.",
        tips: "Match your answer to that org's specific cause and offer a realistic, concrete commitment.",
      },
    ],
    tips: [
      "Use filters to find opportunities that fit your schedule and cause.",
      "Message organizations directly — many welcome eager students.",
      "Track your service hours; they're useful for college applications.",
    ],
  },
  {
    id: "coro",
    org: "Coro",
    program: "Fellowships & Leadership Programs",
    url: "https://www.coro.org",
    industries: ["government", "nonprofit"],
    audiences: ["college"],
    types: ["fellowship", "program"],
    format: "in-person",
    national: false,
    locations: [
      { city: "New York", state: "NY", lat: 40.7128, lng: -74.006 },
      { city: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437 },
      { city: "San Francisco", state: "CA", lat: 37.7749, lng: -122.4194 },
      { city: "St. Louis", state: "MO", lat: 38.627, lng: -90.1994 },
      { city: "Pittsburgh", state: "PA", lat: 40.4406, lng: -79.9959 },
    ],
    cost: "stipend",
    compensation: "Leadership fellowships (some with stipends) in public affairs and civic leadership.",
    deadlineNote: "Flagship fellowships recruit annually; other programs vary.",
    summary: "Experiential leadership programs and fellowships in public affairs and civic engagement.",
    about:
      "Coro trains leaders through experiential programs in public affairs, including its flagship Fellowship, placing participants across government, business, labor, and nonprofit sectors in several U.S. cities.",
    interviewProcess: [
      "Apply online with essays and your resume.",
      "Complete a group assessment day (collaborative exercises).",
      "Interview with Coro staff and program alumni.",
      "Receive a decision and begin your cohort's placements.",
    ],
    supplements: [
      {
        prompt: "Describe a time you brought people with different views together.",
        sampleAnswer:
          "As student-government treasurer, I mediated a fight between the athletics and arts clubs over budget cuts. Instead of picking a side, I ran a joint meeting where each group had to argue for the other's funding. They found a shared event that served both, and we actually increased total participation. I learned that disagreement is data, not a dead end.",
        tips: "Coro cares about civic collaboration — show facilitation, not just winning an argument.",
      },
    ],
    tips: [
      "Prepare for a collaborative assessment, not just a solo interview.",
      "Show interest in public problems across sectors, not one ideology.",
      "Bring curiosity about your specific city's civic issues.",
    ],
  },
  {
    id: "nih-sip",
    org: "National Institutes of Health (NIH)",
    program: "Summer Internship Program",
    url: "https://www.training.nih.gov",
    industries: ["healthcare", "science"],
    audiences: ["high-school", "college"],
    types: ["internship"],
    format: "in-person",
    national: true,
    locations: [{ city: "Bethesda", state: "MD", lat: 38.9959, lng: -77.101 }],
    cost: "stipend",
    compensation: "Paid summer research internships (stipend) in biomedical labs.",
    deadlineNote: "Applications typically open in the fall/winter for the summer; students 16+ may apply.",
    summary: "Paid summer biomedical research internships in NIH labs for students 16 and older.",
    about:
      "The NIH Summer Internship Program places high school (16+), college, and graduate students in biomedical research labs, primarily at the Bethesda, MD campus, working alongside NIH scientists.",
    interviewProcess: [
      "Create an application in the NIH Office of Intramural Training portal.",
      "Upload transcripts, a cover letter, and references.",
      "Contact investigators whose research matches your interests.",
      "Interview with a potential mentor and accept a lab placement.",
    ],
    supplements: [
      {
        prompt: "What research question excites you, and why NIH?",
        sampleAnswer:
          "I'm fascinated by why some people recover from infections quickly and others don't — I watched it play out very differently in two of my grandparents. In my AP Biology class I designed a small experiment on bacterial growth and loved the process of controlling variables. NIH is where I could learn to ask those questions with real tools and mentorship.",
        tips: "Name a genuine question and reach out to specific investigators — placement is mentor-driven.",
      },
    ],
    tips: [
      "Email potential mentors directly; a good match drives selection.",
      "Even a small science-fair project shows research readiness.",
      "Apply early and follow the portal's document requirements exactly.",
    ],
  },
];

// ---- helpers ---------------------------------------------------------------

export function getIndustry(id: IndustryId) {
  return INDUSTRIES.find((i) => i.id === id)!;
}

export function getOpportunity(id: string) {
  return OPPORTUNITIES.find((o) => o.id === id);
}

export function opportunitiesByIndustry(id: IndustryId) {
  return OPPORTUNITIES.filter((o) => o.industries.includes(id));
}

export type MapPin = {
  oppId: string;
  org: string;
  program?: string;
  industry: IndustryId;
  color: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
};

/** Flattens opportunities into one pin per location for the map. */
export function mapPins(opps: Opportunity[] = OPPORTUNITIES): MapPin[] {
  const pins: MapPin[] = [];
  for (const o of opps) {
    const primary = o.industries[0];
    const color = getIndustry(primary).color;
    for (const loc of o.locations) {
      pins.push({
        oppId: o.id,
        org: o.org,
        program: o.program,
        industry: primary,
        color,
        lat: loc.lat,
        lng: loc.lng,
        city: loc.city,
        state: loc.state,
      });
    }
  }
  return pins;
}

export const US_STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
];
