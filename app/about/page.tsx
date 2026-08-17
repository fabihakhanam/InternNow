import Link from "next/link";
import { OPPORTUNITIES, INDUSTRIES } from "@/lib/catalog";

export const metadata = { title: "About — InternNow" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="display text-3xl font-bold">About InternNow</h1>
      <p className="mt-4 text-lg text-ink-soft">
        InternNow is a free, national directory that helps high school and college
        students discover internships, fellowships, programs, and volunteering — and
        actually prepare to apply.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat value={`${OPPORTUNITIES.length}`} label="Opportunities" />
        <Stat value={`${INDUSTRIES.length}`} label="Industries" />
        <Stat value="Free" label="Always, no login" />
      </div>

      <section className="mt-10 space-y-4 text-ink-soft">
        <h2 className="display text-xl font-bold text-ink">Why it exists</h2>
        <p>
          Great opportunities exist all over the country, but they&apos;re scattered
          across dozens of websites and often invisible unless you already know
          someone. InternNow puts them on one map, sorts them by industry, and pairs
          each one with the kind of prep — interview steps, sample supplements, and
          tips — that usually only comes from having a connected mentor.
        </p>

        <h2 className="display text-xl font-bold text-ink">How to use it</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li>Explore the <Link href="/map" className="link">map</Link> to see what&apos;s near you.</li>
          <li>Filter by <Link href="/industries" className="link">industry</Link> and your grade level.</li>
          <li>Open any opportunity for its official link plus application prep.</li>
          <li>Save favorites with the ★ and read the <Link href="/tips" className="link">tips</Link> page.</li>
        </ul>

        <h2 className="display text-xl font-bold text-ink">A note on accuracy</h2>
        <p>
          Organization names, descriptions, and links are provided for reference and
          point to each org&apos;s official website. The interview steps, sample
          supplement prompts and answers, and tips are illustrative examples created
          by InternNow to help you prepare — not any organization&apos;s official
          materials. Details change, so always confirm on the organization&apos;s own
          site. InternNow is an independent, student-built resource and is not
          affiliated with the organizations listed.
        </p>
      </section>

      <div className="mt-10">
        <Link href="/opportunities" className="btn-primary">Start browsing →</Link>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card text-center">
      <div className="display text-2xl font-bold text-brand-600">{value}</div>
      <div className="muted text-sm">{label}</div>
    </div>
  );
}
