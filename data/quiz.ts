import type { IndustryId } from "@/lib/catalog";

export type QuizOption = { label: string; industries: IndustryId[] };
export type QuizQuestion = { q: string; options: QuizOption[] };

// A lightweight interest quiz. Each option nudges one or more industries.
export const QUIZ: QuizQuestion[] = [
  {
    q: "A free Saturday — what sounds best?",
    options: [
      { label: "Build or code something", industries: ["technology"] },
      { label: "Volunteer at a community event", industries: ["nonprofit"] },
      { label: "Sketch, design, or make art", industries: ["arts"] },
      { label: "Run a science experiment", industries: ["science"] },
    ],
  },
  {
    q: "In a group project, you're usually the one who…",
    options: [
      { label: "Organizes the plan and budget", industries: ["business"] },
      { label: "Digs up the facts and data", industries: ["science"] },
      { label: "Makes it look great", industries: ["arts"] },
      { label: "Makes sure everyone's included", industries: ["nonprofit"] },
    ],
  },
  {
    q: "Which headline would you click first?",
    options: [
      { label: "New AI tool changes how we work", industries: ["technology"] },
      { label: "Landmark court ruling, explained", industries: ["law"] },
      { label: "Breakthrough in cancer treatment", industries: ["healthcare"] },
      { label: "How a local election was won", industries: ["government"] },
    ],
  },
  {
    q: "Pick a dream summer:",
    options: [
      { label: "Coding an app", industries: ["technology"] },
      { label: "Shadowing at a hospital", industries: ["healthcare"] },
      { label: "Interning at a museum", industries: ["arts"] },
      { label: "Working on a conservation crew", industries: ["environment"] },
    ],
  },
  {
    q: "What do you care about most?",
    options: [
      { label: "Fairness and justice", industries: ["law"] },
      { label: "Helping my community", industries: ["nonprofit"] },
      { label: "Discovery and how things work", industries: ["science"] },
      { label: "Telling important stories", industries: ["media"] },
    ],
  },
  {
    q: "Favorite class?",
    options: [
      { label: "Math / computer science", industries: ["technology"] },
      { label: "Biology / chemistry", industries: ["science", "healthcare"] },
      { label: "History / government", industries: ["government"] },
      { label: "English / journalism", industries: ["media"] },
    ],
  },
  {
    q: "A cause you'd show up for:",
    options: [
      { label: "Protecting the environment", industries: ["environment"] },
      { label: "Access to education", industries: ["education"] },
      { label: "Equal rights", industries: ["law"] },
      { label: "Public health", industries: ["healthcare"] },
    ],
  },
  {
    q: "You'd rather…",
    options: [
      { label: "Start a small business", industries: ["business"] },
      { label: "Run for student office", industries: ["government"] },
      { label: "Tutor younger kids", industries: ["education"] },
      { label: "Design a poster campaign", industries: ["arts", "media"] },
    ],
  },
];
