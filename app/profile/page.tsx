import { redirect } from "next/navigation";
import { ProfileForm, type ProfileInit } from "@/components/ProfileForm";
import { getCurrentUser, getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { IndustryId } from "@/lib/catalog";

export const metadata = { title: "Your profile — InternNow" };

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/profile");
  const userId = (await getSessionUserId())!;

  const p = await prisma.profile.findUnique({ where: { userId } });
  const init: ProfileInit = {
    gradeLevel: p?.gradeLevel ?? "",
    state: p?.state ?? null,
    gpa: p?.gpa ?? null,
    interests: JSON.parse(p?.interestsJson ?? "[]") as IndustryId[],
    skills: JSON.parse(p?.skillsJson ?? "[]") as string[],
    extracurriculars: p?.extracurriculars ?? "",
    bio: p?.bio ?? "",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="display text-3xl font-bold">Your profile</h1>
      <p className="muted mt-1">
        Tell us about yourself to unlock personalized matches on your{" "}
        <span className="font-semibold">For You</span> feed. This stays private to your account.
      </p>
      <div className="mt-6">
        <ProfileForm init={init} />
      </div>
    </div>
  );
}
