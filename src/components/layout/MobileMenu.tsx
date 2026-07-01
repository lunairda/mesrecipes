"use client";
import { useState } from "react";
import Link from "next/link";

interface Props {
  links: { href: string; label: string; icon?: React.ReactNode }[];
  switchers: { href: string; label: string }[];
}

export function MobileMenu({ links, switchers }: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex md:hidden items-center justify-center w-9 h-9 rounded-full transition-colors"
        style={{ backgroundColor: "#EDE9E1", color: "#2C3A2C" }}
      >
        {open ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M2 2 L12 12 M12 2 L2 12" />
          </svg>
        ) : (
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M0 1 H16 M0 6 H16 M0 11 H16" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 z-50 flex flex-col px-6 py-5 gap-5 md:hidden"
          style={{ backgroundColor: "#FAF7F2", borderTop: "1px solid #EDE9E1" }}
        >
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className="flex items-center gap-2 text-base font-medium nav-link"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {icon}
              {label}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid #EDE9E1" }} className="pt-4 flex gap-2">
            {switchers.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={close}
                className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full"
                style={{ backgroundColor: "#EDE9E1", color: "#2C3A2C", fontFamily: "var(--font-body)" }}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
