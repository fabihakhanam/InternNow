"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const KEY = "internnow:saved";

type Ctx = {
  saved: string[];
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
  ready: boolean;
};

const BookmarkContext = createContext<Ctx | null>(null);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(saved));
  }, [saved, ready]);

  const toggle = useCallback((id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]
    );
  }, []);

  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);

  return (
    <BookmarkContext.Provider value={{ saved, isSaved, toggle, ready }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
}
