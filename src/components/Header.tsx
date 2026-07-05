"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav, site } from "@/lib/site";
import { SearchBar } from "./SearchBar";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-beige bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label={`${site.name} — home`}
          onClick={() => setOpen(false)}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="9" fill="#344E41" />
            <path
              d="M16 24c-4.5-2.6-8-5.9-8-9.6C8 11 10 9 12.4 9c1.5 0 2.8.8 3.6 2 .8-1.2 2.1-2 3.6-2C22 9 24 11 24 14.4c0 3.7-3.5 7-8 9.6z"
              fill="#A3B18A"
            />
            <circle cx="16" cy="14.5" r="2.2" fill="#F6F8F6" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-pine">
            On Life <span className="text-forest">Likes</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sage-light text-forest-dark"
                    : "text-pine hover:bg-sage-light hover:text-forest-dark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden w-44 md:block">
          <SearchBar compact />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-pine hover:bg-sage-light lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-beige bg-cream px-4 pb-6 pt-3 lg:hidden"
          aria-label="Mobile"
        >
          <div className="mb-3 md:hidden">
            <SearchBar />
          </div>
          <ul className="grid grid-cols-2 gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-pine hover:bg-sage-light"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/categories"
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-forest hover:bg-sage-light"
                onClick={() => setOpen(false)}
              >
                All categories →
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
