interface DoodleProps {
  size?: number;
  className?: string;
  color?: string;
}

export function Leaf({ size = 32, className = "", color = "#7A9E7E" }: DoodleProps) {
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
      {/* Main leaf shape */}
      <path
        d="M16 28 C10 22, 4 16, 6 9 C8 3, 14 2, 18 5 C23 8, 25 15, 22 21 C20 25, 18 27, 16 28 Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center vein */}
      <path
        d="M16 28 C15 22, 14 15, 13 8"
        stroke={color}
        strokeWidth="0.85"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small side veins */}
      <path
        d="M13 20 C15 18, 18 17, 20 16"
        stroke={color}
        strokeWidth="0.65"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13.5 14 C15.5 13, 18 12.5, 20 12"
        stroke={color}
        strokeWidth="0.65"
        strokeLinecap="round"
        fill="none"
      />
      {/* Stem */}
      <path
        d="M16 28 C16 29, 15.5 30, 15 31"
        stroke={color}
        strokeWidth="0.85"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
