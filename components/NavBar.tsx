"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { useBookmarks } from "./BookmarkProvider";
import { useSession } from "./SessionProvider";

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { saved, ready } = useBookmarks();
  const user = useSession();

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const links = [
    ...(user ? [{ href: "/for-you", label: "For You" }] : []),
    { href: "/opportunities", label: "Browse" },
    { href: "/map", label: "Map" },
    { href: "/industries", label: "Industries" },
    { href: "/resources", label: "Resources" },
    ...(user ? [{ href: "/documents", label: "Documents" }] : []),
  ];

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-[1000] border-b border-[var(--border)] bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                active(l.href) ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:bg-paper"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/saved" className="chip" data-active={active("/saved")}>
            <span aria-hidden>★</span>
            <span className="hidden sm:inline">Saved</span>
            {ready && saved.length > 0 && (
              <span className="ml-1 rounded-full bg-brand-500 px-1.5 text-xs text-white">{saved.length}</span>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Link href="/profile" className="chip" data-active={active("/profile")}>
                👤 <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
              </Link>
              <button onClick={logout} className="btn-ghost !px-3 !py-2 text-sm">Log out</button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Link href="/login" className="btn-ghost !px-3 !py-2 text-sm">Log in</Link>
              <Link href="/signup" className="btn-primary !px-3 !py-2 text-sm">Sign up</Link>
            </div>
          )}

          <button
            className="btn-ghost !px-3 !py-2 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--border)] bg-white px-4 py-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 font-semibold ${
                active(l.href) ? "bg-brand-50 text-brand-700" : "text-ink-soft"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="my-2 border-t border-[var(--border)]" />
          {user ? (
            <>
              <Link href="/profile" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-semibold text-ink-soft">👤 Profile</Link>
              <button onClick={logout} className="block w-full rounded-lg px-3 py-2.5 text-left font-semibold text-ink-soft">Log out</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-semibold text-ink-soft">Log in</Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-semibold text-brand-700">Sign up</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
