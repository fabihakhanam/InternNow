import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";

const schema = z.object({
  name: z.string().trim().min(1).max(60),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6).max(200),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });

  const { name, email, password } = parsed.data;
  if (await prisma.user.findUnique({ where: { email } }))
    return NextResponse.json({ error: "An account with that email already exists" }, { status: 409 });

  const user = await prisma.user.create({
    data: { name, email, passwordHash: await hashPassword(password), profile: { create: {} } },
  });
  await createSession(user.id);
  return NextResponse.json({ ok: true });
}
