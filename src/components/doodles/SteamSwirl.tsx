interface DoodleProps {
  size?: number;
  className?: string;
  color?: string;
}

export function SteamSwirl({ size = 32, className = "", color = "#C8B89A" }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Left steam wisp */}
      <path
        d="M10 30 C10 27, 7 25, 8 22 C9 19, 12 19, 12 16 C12 13, 9 11, 10 8"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Center steam wisp */}
      <path
        d="M16 30 C16 26, 13 24, 14 20 C15 17, 18 17, 18 13 C18 10, 15 8, 16 5"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right steam wisp */}
      <path
        d="M22 30 C22 27, 19 25, 20 22 C21 19, 24 19, 24 16 C24 13, 21 11, 22 8"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
