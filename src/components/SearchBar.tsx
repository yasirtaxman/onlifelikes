"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      }}
      className="relative"
    >
      <label htmlFor={compact ? "site-search-compact" : "site-search"} className="sr-only">
        Search articles
      </label>
      <input
        id={compact ? "site-search-compact" : "site-search"}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search guides…"
        className={`w-full rounded-full border border-line bg-white text-ink placeholder:text-ink/50 focus:border-second focus:outline-2 focus:outline-second/50 ${
          compact ? "px-4 py-1.5 text-sm" : "px-5 py-2.5 text-base"
        }`}
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-brand hover:bg-second-tint"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}
