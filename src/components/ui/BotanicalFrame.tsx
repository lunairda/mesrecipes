interface Props {
  children: React.ReactNode;
  className?: string;
}

export function BotanicalFrame({ children, className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      {/* Top-left corner */}
      <svg className="absolute -top-3 -left-3 pointer-events-none" width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M6 58 C6 38, 10 22, 22 12 C30 5, 42 4, 50 8" stroke="#7A9E7E" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4"/>
        <path d="M6 58 C10 46, 14 34, 12 22" stroke="#7A9E7E" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3"/>
        <path d="M12 22 C10 16, 8 10, 11 6" stroke="#7A9E7E" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3"/>
        <path d="M12 22 C17 19, 22 16, 26 11" stroke="#7A9E7E" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.25"/>
        <path d="M12 36 C8 33, 6 29, 4 24" stroke="#7A9E7E" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.25"/>
        <circle cx="26" cy="10" r="2.5" fill="#C9A84C" opacity="0.35"/>
        <circle cx="6" cy="28" r="1.8" fill="#C9A84C" opacity="0.25"/>
      </svg>

      {/* Top-right corner */}
      <svg className="absolute -top-3 -right-3 pointer-events-none" style={{ transform: "scaleX(-1)" }} width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M6 58 C6 38, 10 22, 22 12 C30 5, 42 4, 50 8" stroke="#C46E72" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.3"/>
        <path d="M6 58 C10 46, 14 34, 12 22" stroke="#C46E72" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.25"/>
        <path d="M12 22 C17 19, 22 16, 26 11" stroke="#C46E72" strokeWidth="0.85" strokeLinecap="round" fill="none" opacity="0.2"/>
        <circle cx="26" cy="10" r="2" fill="#C9A84C" opacity="0.3"/>
      </svg>

      {/* Bottom-left corner */}
      <svg className="absolute -bottom-3 -left-3 pointer-events-none" style={{ transform: "scaleY(-1)" }} width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M5 42 C7 30, 14 20, 24 14" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3"/>
        <path d="M14 28 C10 25, 7 20, 6 15" stroke="#C9A84C" strokeWidth="0.85" strokeLinecap="round" fill="none" opacity="0.22"/>
        <circle cx="26" cy="13" r="2" fill="#C9A84C" opacity="0.3"/>
      </svg>

      {/* Bottom-right corner */}
      <svg className="absolute -bottom-3 -right-3 pointer-events-none" style={{ transform: "scale(-1)" }} width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M5 42 C7 30, 14 20, 24 14" stroke="#7A9E7E" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.28"/>
        <path d="M14 28 C10 25, 7 20, 6 15" stroke="#7A9E7E" strokeWidth="0.85" strokeLinecap="round" fill="none" opacity="0.2"/>
        <circle cx="26" cy="13" r="1.8" fill="#7A9E7E" opacity="0.25"/>
      </svg>

      {children}
    </div>
  );
}
