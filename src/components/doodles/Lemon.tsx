interface DoodleProps {
  size?: number;
  className?: string;
  color?: string;
}

export function Lemon({ size = 32, className = "", color = "#C9A84C" }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ transform: "rotate(-18deg)" }}
    >
      {/* Lemon body — vertical oval */}
      <path
        d="M16 32 C11 32, 7 28, 7 22 C7 16, 11 11, 16 11 C21 11, 25 15, 25 21 C25 27, 21 32, 16 32 Z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bottom pointed tip */}
      <path
        d="M16 32 C16.5 33.5, 17 34.5, 17.5 35"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Stem from top of lemon */}
      <path
        d="M16 11 C15.5 9.5, 14.5 8.5, 14 7.5"
        stroke="#7A9E7E"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left leaf */}
      <path
        d="M14 7.5 C10 5.5, 6 7, 6 11 C8.5 9.5, 11.5 8, 14 7.5 Z"
        stroke="#7A9E7E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M14 7.5 C11.5 8.5, 8.5 9.5, 6 11"
        stroke="#7A9E7E"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />

      {/* Right leaf */}
      <path
        d="M14 7.5 C16 4.5, 21 4, 21 8 C19 6.5, 16.5 6.5, 14 7.5 Z"
        stroke="#7A9E7E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M14 7.5 C16.5 6.5, 19 6.5, 21 8"
        stroke="#7A9E7E"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />

      {/* Inner texture dots */}
      <circle cx="13" cy="20" r="1" fill={color} opacity="0.45" />
      <circle cx="16" cy="23" r="0.8" fill={color} opacity="0.35" />
      <circle cx="14" cy="25" r="0.65" fill={color} opacity="0.28" />
    </svg>
  );
}
