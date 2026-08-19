import {
  OPPORTUNITIES,
  getIndustry,
  type IndustryId,
  type Opportunity,
  type Audience,
} from "@/lib/catalog";

export type ProfileData = {
  gradeLevel: string;
  state?: string | null;
  interests: IndustryId[];
  skills: string[];
};

export function audienceFromGrade(gradeLevel: string): Audience | null {
  if (gradeLevel.startsWith("hs")) return "high-school";
  if (gradeLevel.startsWith("college")) return "college";
  if (gradeLevel.startsWith("grad")) return "graduate";
  return null;
}

const AUDIENCE_REASON: Record<Audience, string> = {
  "high-school": "Open to high schoolers",
  college: "Open to college students",
  graduate: "Open to graduate students",
};

export type Scored = { opp: Opportunity; score: number; reasons: string[] };

export function rankForProfile(profile: ProfileData): Scored[] {
  const audience = audienceFromGrade(profile.gradeLevel);

  const scored: Scored[] = OPPORTUNITIES.map((opp) => {
    let score = 0;
    const reasons: string[] = [];

    const matchedInterests = opp.industries.filter((i) => profile.interests.includes(i));
    if (matchedInterests.length) {
      score += matchedInterests.length * 4;
      reasons.push(
        `Matches your interest in ${matchedInterests.map((i) => getIndustry(i).label).join(" & ")}`
      );
    }

    if (audience && opp.audiences.includes(audience)) {
      score += 3;
      reasons.push(AUDIENCE_REASON[audience]);
    }

    if (profile.state) {
      if (opp.locations.some((l) => l.state === profile.state)) {
        score += 2;
        reasons.push(`Available in ${profile.state}`);
      } else if (opp.national) {
        score += 1;
        reasons.push("Available nationwide");
      }
    } else if (opp.national) {
      score += 1;
      reasons.push("Available nationwide");
    }

    return { opp, score, reasons };
  });

  return scored.sort((a, b) => b.score - a.score);
}
