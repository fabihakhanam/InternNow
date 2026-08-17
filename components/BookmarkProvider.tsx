"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const KEY = "internnow:tracker";
const LEGACY_KEY = "internnow:saved";

export type TrackStatus =
  | "interested"
  | "applying"
  | "applied"
  | "interview"
  | "accepted"
  | "declined";

export type TrackItem = {
  addedAt: number;
  status: TrackStatus;
  dueDate?: string; // ISO yyyy-mm-dd
  notes?: string;
};

export const STATUS_LABELS: Record<TrackStatus, string> = {
  interested: "Interested",
  applying: "Applying",
  applied: "Applied",
  interview: "Interview",
  accepted: "Accepted",
  declined: "Declined",
};

type Ctx = {
  items: Record<string, TrackItem>;
  saved: string[]; // ids, most-recently-added first
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
  update: (id: string, partial: Partial<TrackItem>) => void;
  ready: boolean;
};

const BookmarkContext = createContext<Ctx | null>(null);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<string, TrackItem>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        setItems(JSON.parse(raw));
      } else {
        // Migrate the older array-of-ids format, if present.
        const legacy = localStorage.getItem(LEGACY_KEY);
        if (legacy) {
          const ids: string[] = JSON.parse(legacy);
          const migrated: Record<string, TrackItem> = {};
          ids.forEach((id, i) => {
            migrated[id] = { addedAt: Date.now() - i, status: "interested" };
          });
          setItems(migrated);
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const toggle = useCallback((id: string) => {
    setItems((prev) => {
      if (prev[id]) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: { addedAt: Date.now(), status: "interested" } };
    });
  }, []);

  const update = useCallback((id: string, partial: Partial<TrackItem>) => {
    setItems((prev) => {
      const existing = prev[id] ?? { addedAt: Date.now(), status: "interested" };
      return { ...prev, [id]: { ...existing, ...partial } };
    });
  }, []);

  const isSaved = useCallback((id: string) => Boolean(items[id]), [items]);

  const saved = useMemo(
    () =>
      Object.keys(items).sort((a, b) => items[b].addedAt - items[a].addedAt),
    [items]
  );

  return (
    <BookmarkContext.Provider value={{ items, saved, isSaved, toggle, update, ready }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
}
