import type { Opportunity } from "@/lib/catalog";

function enc(s: string) {
  return encodeURIComponent(s);
}

export function ConnectSection({ o }: { o: Opportunity }) {
  const q = o.program ? `${o.org} ${o.program}` : o.org;

  const linkedin =
    o.socials?.linkedin ??
    `https://www.linkedin.com/search/results/companies/?keywords=${enc(o.org)}`;
  const instagram =
    o.socials?.instagram ??
    `https://www.instagram.com/explore/search/keyword/?q=${enc(o.org)}`;
  const x = o.socials?.x ?? `https://x.com/search?q=${enc(q)}`;
  const hasExact = Boolean(
    o.socials?.linkedin || o.socials?.instagram || o.socials?.x || o.socials?.youtube
  );

  const links = [
    { label: "Official website", href: o.url, icon: "🌐", exact: true },
    { label: "LinkedIn", href: linkedin, icon: "in", exact: Boolean(o.socials?.linkedin) },
    { label: "Instagram", href: instagram, icon: "◎", exact: Boolean(o.socials?.instagram) },
    { label: "X / Twitter", href: x, icon: "𝕏", exact: Boolean(o.socials?.x) },
  ];
  if (o.socials?.youtube) {
    links.push({ label: "YouTube", href: o.socials.youtube, icon: "▶", exact: true });
  }

  return (
    <section className="mt-8">
      <h2 className="display mb-3 text-xl font-bold">Connect &amp; learn more</h2>

      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="chip hover:border-brand-400"
          >
            <span aria-hidden className="grid h-5 w-5 place-items-center rounded bg-brand-50 text-xs font-bold text-brand-600">
              {l.icon}
            </span>
            {l.label} ↗
          </a>
        ))}
      </div>

      <div className="mt-4 rounded-xl2 border border-[var(--border)] bg-white p-4 text-sm shadow-soft">
        <div className="font-bold">Key contacts</div>
        <p className="muted mt-1">
          The fastest way to reach {o.org} is the{" "}
          <a href={o.url} target="_blank" rel="noopener noreferrer" className="link">
            Contact or Admissions section
          </a>{" "}
          of their official website
          {o.locations.length > 1 || o.national
            ? ", where you can also find the office or program lead for your region."
            : "."}
        </p>
      </div>

      {!hasExact && (
        <p className="muted mt-2 text-xs">
          Social buttons open a search for “{o.org}” on each platform. Always confirm you&apos;ve
          found the official account before sharing personal information.
        </p>
      )}
    </section>
  );
}
