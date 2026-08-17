"use client";

import { useBookmarks } from "./BookmarkProvider";

export function BookmarkButton({
  id,
  className = "",
  showLabel = true,
}: {
  id: string;
  className?: string;
  showLabel?: boolean;
}) {
  const { isSaved, toggle, ready } = useBookmarks();
  const active = ready && isSaved(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from saved" : "Save opportunity"}
      className={`chip ${className}`}
      data-active={active}
    >
      <span aria-hidden>{active ? "★" : "☆"}</span>
      {showLabel && (active ? "Saved" : "Save")}
    </button>
  );
}
