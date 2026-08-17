import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

const createSchema = z.object({
  type: z.enum(["resume", "cover-letter"]),
  title: z.string().max(120).optional(),
  data: z.any(),
});

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const documents = await prisma.document.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, type: true, title: true, updatedAt: true },
  });
  return NextResponse.json({ documents });
}

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = createSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid document" }, { status: 400 });

  const { type, title, data } = parsed.data;
  const doc = await prisma.document.create({
    data: {
      userId,
      type,
      title: title || (type === "resume" ? "Untitled resume" : "Untitled cover letter"),
      dataJson: JSON.stringify(data ?? {}),
    },
    select: { id: true, type: true, title: true, updatedAt: true },
  });
  return NextResponse.json({ document: doc });
}
