import { OPPORTUNITIES, type Opportunity } from "@/lib/catalog";

export type Season = "fall" | "winter" | "spring" | "summer" | "rolling" | "varies";

export const SEASON_LABELS: Record<Season, string> = {
  fall: "Fall",
  winter: "Winter",
  spring: "Spring",
  summer: "Summer",
  rolling: "Rolling / year-round",
  varies: "Timing varies",
};

// Classify an opportunity's application timing from its (sourced) deadline note.
export function classifyTiming(note: string | undefined): Season[] {
  if (!note) return ["varies"];
  const n = note.toLowerCase();
  const seasons: Season[] = [];
  if (/rolling|year-round|throughout the year|posted/.test(n)) seasons.push("rolling");
  if (/\bfall\b/.test(n)) seasons.push("fall");
  if (/\bwinter\b/.test(n)) seasons.push("winter");
  if (/\bspring\b/.test(n)) seasons.push("spring");
  if (/\bsummer\b/.test(n) && /due|deadline|submission|runs|season/.test(n)) seasons.push("summer");
  return seasons.length ? Array.from(new Set(seasons)) : ["varies"];
}

// Month index (0–11) -> season.
export function seasonForMonth(month: number): Season {
  if (month >= 8 && month <= 10) return "fall"; // Sep–Nov
  if (month === 11 || month <= 1) return "winter"; // Dec–Feb
  if (month >= 2 && month <= 4) return "spring"; // Mar–May
  return "summer"; // Jun–Aug
}

export function nextSeason(s: Season): Season {
  const order: Season[] = ["winter", "spring", "summer", "fall"];
  const i = order.indexOf(s);
  return i === -1 ? "fall" : order[(i + 1) % order.length];
}

export type TimedOpp = { opp: Opportunity; seasons: Season[] };

export function timedOpportunities(): TimedOpp[] {
  return OPPORTUNITIES.map((opp) => ({ opp, seasons: classifyTiming(opp.deadlineNote) }));
}
