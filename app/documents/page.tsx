import { redirect } from "next/navigation";
import { DocumentsManager } from "@/components/DocumentsManager";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "Documents — InternNow" };

export default async function DocumentsPage() {
  if (!(await getCurrentUser())) redirect("/login?next=/documents");
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="display text-3xl font-bold">Résumé &amp; cover letter builder</h1>
      <p className="muted mt-1">Create polished application documents with guided prompts and a printable preview.</p>
      <div className="mt-6">
        <DocumentsManager />
      </div>
    </div>
  );
}
