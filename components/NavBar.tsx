"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { useBookmarks } from "./BookmarkProvider";

const links = [
  { href: "/opportunities", label: "Browse" },
  { href: "/map", label: "Map" },
  { href: "/industries", label: "Industries" },
  { href: "/tips", label: "Tips" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { saved, ready } = useBookmarks();

  const active = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-[1000] border-b border-[var(--border)] bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
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
              <span className="ml-1 rounded-full bg-brand-500 px-1.5 text-xs text-white">
                {saved.length}
              </span>
            )}
          </Link>
          <button
            className="btn-ghost !px-3 !py-2 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--border)] bg-white px-4 py-2 md:hidden">
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
        </nav>
      )}
    </header>
  );
}
