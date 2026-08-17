import { Suspense } from "react";
import { DirectoryBrowser } from "@/components/DirectoryBrowser";

export const metadata = { title: "Browse — InternNow" };

export default function OpportunitiesPage() {
  return (
    <Suspense>
      <DirectoryBrowser />
    </Suspense>
  );
}
