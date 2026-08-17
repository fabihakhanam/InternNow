import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  const invalid = NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
  if (!user || !(await verifyPassword(password, user.passwordHash))) return invalid;

  await createSession(user.id);
  return NextResponse.json({ ok: true });
}
