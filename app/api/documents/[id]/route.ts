import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

const patchSchema = z.object({
  title: z.string().max(120).optional(),
  data: z.any().optional(),
});

async function owned(id: string, userId: string) {
  const doc = await prisma.document.findUnique({ where: { id } });
  return doc && doc.userId === userId ? doc : null;
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const doc = await owned(params.id, userId);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    document: { id: doc.id, type: doc.type, title: doc.title, data: JSON.parse(doc.dataJson), updatedAt: doc.updatedAt },
  });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await owned(params.id, userId))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const data: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) data.title = parsed.data.title;
  if (parsed.data.data !== undefined) data.dataJson = JSON.stringify(parsed.data.data);

  const doc = await prisma.document.update({
    where: { id: params.id },
    data,
    select: { id: true, type: true, title: true, updatedAt: true },
  });
  return NextResponse.json({ document: doc });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await owned(params.id, userId))) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.document.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
