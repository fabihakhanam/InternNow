import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rankForProfile, audienceFromGrade } from "@/lib/match";
import { OpportunityCard } from "@/components/OpportunityCard";
import { AUDIENCE_LABELS, type IndustryId } from "@/lib/catalog";

export const metadata = { title: "For You — InternNow" };

export default async function ForYouPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/for-you");
  const userId = (await getSessionUserId())!;
  const p = await prisma.profile.findUnique({ where: { userId } });

  const interests = JSON.parse(p?.interestsJson ?? "[]") as IndustryId[];
  const skills = JSON.parse(p?.skillsJson ?? "[]") as string[];
  const profileComplete = Boolean(p?.gradeLevel) || interests.length > 0;

  if (!profileComplete) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="display text-3xl font-bold">Your For You feed</h1>
        <div className="card mt-6 text-center">
          <div className="text-4xl">🧭</div>
          <p className="mt-2 font-semibold">Let&apos;s personalize your matches</p>
          <p className="muted mx-auto mt-1 max-w-md text-sm">
            Add your grade level and a few interests, and we&apos;ll recommend opportunities that
            fit you — with a note on <em>why</em> each one matches.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/profile" className="btn-primary">Complete your profile →</Link>
            <Link href="/quiz" className="btn-ghost">Not sure? Take the quiz</Link>
          </div>
        </div>
      </div>
    );
  }

  const ranked = rankForProfile({
    gradeLevel: p?.gradeLevel ?? "",
    state: p?.state ?? null,
    interests,
    skills,
  });

  const matches = ranked.filter((r) => r.score >= 3).slice(0, 9);
  const more = ranked.filter((r) => !matches.includes(r)).slice(0, 6);
  const audience = audienceFromGrade(p?.gradeLevel ?? "");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="display text-3xl font-bold">For you, {user.name.split(" ")[0]} 👋</h1>
          <p className="muted mt-1">
            Based on your profile{audience ? ` (${AUDIENCE_LABELS[audience]})` : ""}
            {interests.length ? ` and interest in ${interests.length} field${interests.length > 1 ? "s" : ""}` : ""}.
          </p>
        </div>
        <Link href="/profile" className="btn-ghost text-sm">Edit profile</Link>
      </div>

      {matches.length === 0 ? (
        <div className="card mt-6">
          <p className="font-semibold">No strong matches yet.</p>
          <p className="muted mt-1 text-sm">Try adding more interests or clearing your state filter on your profile.</p>
        </div>
      ) : (
        <section className="mt-6">
          <h2 className="display mb-3 text-xl font-bold">Top matches</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map(({ opp, reasons }) => (
              <div key={opp.id} className="flex flex-col gap-2">
                <OpportunityCard o={opp} />
                {reasons.length > 0 && (
                  <div className="rounded-xl2 border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                    <span className="font-bold">Why: </span>
                    {reasons.join(" · ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="mt-10">
          <h2 className="display mb-3 text-xl font-bold">More to explore</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map(({ opp }) => <OpportunityCard key={opp.id} o={opp} />)}
          </div>
        </section>
      )}
    </div>
  );
}
