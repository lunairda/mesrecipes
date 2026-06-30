interface DoodleProps {
  size?: number;
  className?: string;
  color?: string;
}

export function Bowl({ size = 32, className = "", color = "#C46E72" }: DoodleProps) {
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
      {/* Bowl rim */}
      <path
        d="M4 13 C4 13, 9 12, 16 12 C23 12, 28 13, 28 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bowl body */}
      <path
        d="M4 13 C5 20, 9 26, 16 27 C23 26, 27 20, 28 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Base */}
      <path
        d="M11 27 C11 28, 12 29, 16 29 C20 29, 21 28, 21 27"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Food / contents suggestion */}
      <path
        d="M9 15 C11 14, 14 13.5, 16 14 C18 14.5, 21 15, 23 15"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Small herb garnish on top */}
      <path
        d="M14 11 C14 9.5, 13 8, 12 7.5 C12.5 9, 13.5 10, 14 11"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 11 C16 9, 16.5 7.5, 18 7 C17.5 8.5, 16.5 9.5, 16 11"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13 11 L17 11"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
