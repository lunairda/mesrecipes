"use client";

interface Props {
  label: string;
}

export function PrintButton({ label }: Props) {
  return (
    <button
      onClick={() => window.print()}
      aria-label={label}
      className="print-hide flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80 cursor-pointer"
      style={{
        backgroundColor: "#EDE9E1",
        color: "#2C3A2C",
        fontFamily: "var(--font-body)",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 5V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" />
        <rect x="1" y="5" width="12" height="7" rx="1" />
        <path d="M4 10h6M4 12h4" />
        <circle cx="10.5" cy="7.5" r="0.5" fill="currentColor" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
