import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "Sign up — InternNow" };

export default async function SignupPage() {
  if (await getCurrentUser()) redirect("/for-you");
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-10">
      <Suspense>
        <AuthForm mode="signup" />
      </Suspense>
    </main>
  );
}
