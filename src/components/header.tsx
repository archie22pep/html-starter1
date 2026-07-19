"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "./ui";

const NAV = [
  { href: "/reports/purchase", label: "Purchase Intelligence" },
  { href: "/reports/development", label: "Development Intelligence" },
  { href: "/pricing", label: "Pricing" },
  { href: "/method", label: "Our Method" },
  { href: "/blog", label: "Guides" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="Precursor home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition-colors hover:text-primary ${
                pathname.startsWith(item.href) ? "text-primary" : "text-body"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/sample-report.html"
            target="_blank"
            rel="noopener"
            className="text-sm font-bold text-primary hover:text-primary-hover"
          >
            Sample Report
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/order"
            className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-hover sm:inline-flex"
          >
            Order a Report
          </Link>
          <button
            type="button"
            className="flex size-11 cursor-pointer items-center justify-center rounded-md border border-line-strong lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 20 20" className="size-5 text-ink" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-line bg-paper px-5 pt-2 pb-4 lg:hidden"
          aria-label="Mobile"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3 text-[15px] font-semibold text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/sample-report.html"
            target="_blank"
            rel="noopener"
            className="block border-b border-line py-3 text-[15px] font-bold text-primary"
          >
            Sample Report
          </a>
          <Link
            href="/order"
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-[15px] font-bold text-white"
          >
            Order a Report
          </Link>
        </nav>
      )}
    </header>
  );
}
