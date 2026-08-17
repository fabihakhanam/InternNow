"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const isSignup = mode === "signup";
  const next = params.get("next") || (isSignup ? "/profile" : "/for-you");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isSignup ? { name, email, password } : { email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data.error || "Something went wrong");
      router.push(next);
      router.refresh();
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card w-full max-w-md space-y-4">
      <div>
        <h1 className="display text-2xl font-bold">{isSignup ? "Create your free account" : "Welcome back"}</h1>
        <p className="muted mt-1 text-sm">
          {isSignup ? "Get personalized matches, build your resume, and track applications." : "Log in to see your For You feed and documents."}
        </p>
      </div>

      {error && (
        <div role="alert" className="rounded-xl2 border border-rose-300 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700">
          {error}
        </div>
      )}

      {isSignup && (
        <label className="block">
          <span className="mb-1 block text-sm font-bold">Name</span>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" required />
        </label>
      )}
      <label className="block">
        <span className="mb-1 block text-sm font-bold">Email</span>
        <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-bold">Password</span>
        <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isSignup ? "At least 6 characters" : "Your password"} autoComplete={isSignup ? "new-password" : "current-password"} minLength={6} required />
      </label>

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "Please wait…" : isSignup ? "Create account" : "Log in"}
      </button>

      <p className="muted text-center text-sm">
        {isSignup ? (
          <>Already have an account? <Link href="/login" className="link">Log in</Link></>
        ) : (
          <>New here? <Link href="/signup" className="link">Create a free account</Link></>
        )}
      </p>
    </form>
  );
}
