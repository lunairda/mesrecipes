interface Props {
  label: string;
  note: string;
}

export function PostIt({ label, note }: Props) {
  return (
    <div
      className="relative px-5 py-4 rounded-sm mb-5"
      style={{
        backgroundColor: "#FEF6D6",
        boxShadow: "2px 3px 12px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)",
      }}
    >
      {/* folded corner */}
      <div
        className="absolute bottom-0 right-0 w-5 h-5"
        style={{
          background: "linear-gradient(225deg, #fff 50%, #e8d98a 50%)",
        }}
      />
      <p
        className="text-xs font-bold uppercase tracking-widest mb-1.5"
        style={{ fontFamily: "var(--font-body)", color: "#A8882E" }}
      >
        🌾 {label}
      </p>
      <p
        className="text-sm leading-relaxed pr-3"
        style={{ fontFamily: "var(--font-body)", color: "#2C3A2C" }}
      >
        {note}
      </p>
    </div>
  );
}
