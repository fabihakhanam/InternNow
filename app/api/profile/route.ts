import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

const schema = z.object({
  gradeLevel: z.string().max(20).optional(),
  state: z.string().max(2).nullable().optional(),
  gpa: z.number().min(0).max(5).nullable().optional(),
  interests: z.array(z.string()).max(20).optional(),
  skills: z.array(z.string().max(40)).max(30).optional(),
  extracurriculars: z.string().max(2000).optional(),
  bio: z.string().max(2000).optional(),
});

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const p = await prisma.profile.findUnique({ where: { userId } });
  return NextResponse.json({ profile: p });
}

export async function PATCH(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid profile" }, { status: 400 });

  const d = parsed.data;
  const data: Record<string, unknown> = {};
  if (d.gradeLevel !== undefined) data.gradeLevel = d.gradeLevel;
  if (d.state !== undefined) data.state = d.state;
  if (d.gpa !== undefined) data.gpa = d.gpa;
  if (d.interests !== undefined) data.interestsJson = JSON.stringify(d.interests);
  if (d.skills !== undefined) data.skillsJson = JSON.stringify(d.skills);
  if (d.extracurriculars !== undefined) data.extracurriculars = d.extracurriculars;
  if (d.bio !== undefined) data.bio = d.bio;

  const profile = await prisma.profile.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });
  return NextResponse.json({ profile });
}
