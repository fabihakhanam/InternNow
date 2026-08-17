import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="display text-lg font-bold">
              Intern<span className="text-brand-500">Now</span>
            </div>
            <p className="muted mt-2 text-sm">
              A free, national directory of internships and volunteering for high
              school and college students — with a map, industry filters, and
              application prep.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            <Link href="/opportunities" className="muted hover:text-ink">Browse</Link>
            <Link href="/map" className="muted hover:text-ink">Map</Link>
            <Link href="/industries" className="muted hover:text-ink">Industries</Link>
            <Link href="/tips" className="muted hover:text-ink">Tips</Link>
            <Link href="/saved" className="muted hover:text-ink">Saved</Link>
            <Link href="/about" className="muted hover:text-ink">About</Link>
          </nav>
        </div>
        <p className="muted mt-8 text-xs leading-relaxed">
          Organization names, descriptions, and links are provided for reference and
          point to each organization&apos;s official website. Interview steps, sample
          supplement prompts/answers, and tips are illustrative examples created by
          InternNow to help you prepare — always verify current details on the
          organization&apos;s own site. InternNow is an independent, student-built
          resource and is not affiliated with the organizations listed.
        </p>
      </div>
    </footer>
  );
}
