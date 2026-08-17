import Link from "next/link";
import { INDUSTRIES, opportunitiesByIndustry } from "@/lib/catalog";

export const metadata = { title: "Industries — InternNow" };

export default function IndustriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="display text-3xl font-bold">Explore by industry</h1>
      <p className="muted mt-1">Find opportunities in the field you&apos;re curious about.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((i) => {
          const count = opportunitiesByIndustry(i.id).length;
          return (
            <Link
              key={i.id}
              href={`/industries/${i.id}`}
              className="card group hover:-translate-y-0.5 hover:shadow-card"
            >
              <div
                className="mb-3 grid h-12 w-12 place-items-center rounded-xl2 text-2xl"
                style={{ background: `${i.color}1a` }}
              >
                {i.emoji}
              </div>
              <h2 className="display text-lg font-bold group-hover:text-brand-700">{i.label}</h2>
              <p className="muted mt-1 text-sm">{i.blurb}</p>
              <p className="mt-3 text-sm font-semibold" style={{ color: i.color }}>
                {count} {count === 1 ? "opportunity" : "opportunities"} →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
