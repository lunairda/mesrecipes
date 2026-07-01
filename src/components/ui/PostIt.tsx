interface Props {
  label: string;
  note: string;
}

function WheatSlashIcon() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <line x1="11" y1="23" x2="11" y2="2" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11 7 C10 5.5, 7 6, 8 8 C8.5 9, 11 8.5, 11 7Z" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M11 7 C12 5.5, 15 6, 14 8 C13.5 9, 11 8.5, 11 7Z" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M11 12.5 C10 11, 7 11.5, 8 13.5 C8.5 14.5, 11 14, 11 12.5Z" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M11 12.5 C12 11, 15 11.5, 14 13.5 C13.5 14.5, 11 14, 11 12.5Z" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M11 18 C10 16.5, 7 17, 8 19 C8.5 20, 11 19.5, 11 18Z" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M11 18 C12 16.5, 15 17, 14 19 C13.5 20, 11 19.5, 11 18Z" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <line x1="3" y1="2" x2="19" y2="22" stroke="#C46E72" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PostIt({ label, note }: Props) {
  return (
    <div
      className="mb-5 px-5 py-4 rounded-xl"
      style={{
        backgroundColor: "#FEF9E8",
        borderLeft: "4px solid #C9A84C",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
      }}
    >
      <div className="flex items-center gap-2.5 mb-1.5">
        <WheatSlashIcon />
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ fontFamily: "var(--font-body)", color: "#A8882E" }}
        >
          {label}
        </p>
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-body)", color: "#2C3A2C" }}
      >
        {note}
      </p>
    </div>
  );
}
