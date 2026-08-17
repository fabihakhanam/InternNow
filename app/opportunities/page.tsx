import { Suspense } from "react";
import { DirectoryBrowser } from "@/components/DirectoryBrowser";
import { INDUSTRIES, EQUITY_META, type EquityTag, type Format, type IndustryId } from "@/lib/catalog";

export const metadata = { title: "Browse — InternNow" };

const FORMATS = ["remote", "hybrid", "in-person"];

export default function OpportunitiesPage({
  searchParams,
}: {
  searchParams: { industry?: string; focus?: string; format?: string };
}) {
  const initialIndustry = INDUSTRIES.some((i) => i.id === searchParams.industry)
    ? (searchParams.industry as IndustryId)
    : undefined;
  const initialEquity = EQUITY_META.some((e) => e.id === searchParams.focus)
    ? (searchParams.focus as EquityTag)
    : undefined;
  const initialFormat = FORMATS.includes(searchParams.format ?? "")
    ? (searchParams.format as Format)
    : undefined;

  return (
    <Suspense>
      <DirectoryBrowser
        initialIndustry={initialIndustry}
        initialEquity={initialEquity}
        initialFormat={initialFormat}
      />
    </Suspense>
  );
}
