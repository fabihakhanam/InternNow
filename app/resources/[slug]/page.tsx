import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/data/resources";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  return { title: a ? `${a.title} — InternNow` : "InternNow" };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/resources" className="muted text-sm hover:text-ink">← Resource library</Link>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-4xl">{a.emoji}</span>
        <div>
          <span className="badge bg-brand-50 text-brand-700">{a.category}</span>
          <span className="muted ml-2 text-xs">{a.minutes} min read</span>
        </div>
      </div>
      <h1 className="display mt-3 text-3xl font-bold">{a.title}</h1>
      <p className="muted mt-2 text-lg">{a.excerpt}</p>

      <div className="mt-6 space-y-6">
        {a.sections.map((s, i) => (
          <section key={i}>
            <h2 className="display text-xl font-bold">{s.heading}</h2>
            {s.paragraphs?.map((p, j) => (
              <p key={j} className="mt-2 text-ink-soft">{p}</p>
            ))}
            {s.bullets && (
              <ul className="mt-2 space-y-1.5">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2"><span aria-hidden className="text-brand-500">•</span><span className="text-ink-soft">{b}</span></li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/opportunities" className="btn-primary">Browse opportunities</Link>
        <Link href="/resources" className="btn-ghost">More guides</Link>
      </div>
    </article>
  );
}
