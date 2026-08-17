import { notFound, redirect } from "next/navigation";
import { getCurrentUser, getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { CoverLetterBuilder } from "@/components/CoverLetterBuilder";

export const metadata = { title: "Edit document — InternNow" };

export default async function DocumentEditor({ params }: { params: { id: string } }) {
  if (!(await getCurrentUser())) redirect(`/login?next=/documents/${params.id}`);
  const userId = (await getSessionUserId())!;

  const doc = await prisma.document.findUnique({ where: { id: params.id } });
  if (!doc || doc.userId !== userId) notFound();

  const data = JSON.parse(doc.dataJson || "{}");

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {doc.type === "resume" ? (
        <ResumeBuilder id={doc.id} initialTitle={doc.title} initialData={data} />
      ) : (
        <CoverLetterBuilder id={doc.id} initialTitle={doc.title} initialData={data} />
      )}
    </div>
  );
}
