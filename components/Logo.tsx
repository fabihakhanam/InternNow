import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const text = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";
  const box = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-8 w-8";
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="InternNow home">
      <span
        className={`grid ${box} place-items-center rounded-xl bg-brand-500 text-white shadow-soft`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none">
          <path
            d="M12 2c-.6 3.2-2 4.6-4.2 6.4C5.5 10.2 4 12.2 4 15a8 8 0 0 0 16 0c0-2.2-.9-3.8-2.2-5.4-.5.9-1.2 1.4-2.1 1.6.6-2.6-.4-6.4-3.7-9.2Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className={`display font-bold ${text}`}>
        Intern<span className="text-brand-500">Now</span>
      </span>
    </Link>
  );
}
