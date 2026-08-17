import { getIndustry, type IndustryId } from "@/lib/catalog";

export function IndustryBadge({ id, small }: { id: IndustryId; small?: boolean }) {
  const ind = getIndustry(id);
  return (
    <span
      className="badge"
      style={{ background: `${ind.color}1a`, color: ind.color }}
      title={ind.label}
    >
      <span aria-hidden>{ind.emoji}</span>
      {!small && ind.label}
    </span>
  );
}

export function PlainBadge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "green" | "blue" | "amber";
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-700",
    blue: "bg-brand-50 text-brand-700",
    amber: "bg-amber-100 text-amber-800",
  };
  return <span className={`badge ${tones[tone]}`}>{children}</span>;
}
