interface DoodleProps {
  size?: number;
  className?: string;
  color?: string;
}

export function HerbSprig({ size = 32, className = "", color = "#7A9E7E" }: DoodleProps) {
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
      {/* Main stem — stops before the top leaf so they don't overlap */}
      <path
        d="M16 30 C16 24, 15.5 18, 15 12"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bottom left leaf */}
      <path
        d="M15.5 26 C13 25, 9 23, 8 20 C10.5 20.5, 13.5 22.5, 15.5 25"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bottom right leaf */}
      <path
        d="M15.5 22 C18 21, 22 19, 23 16 C20.5 16.5, 17.5 18.5, 15.5 21"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Middle left leaf */}
      <path
        d="M15 17 C12 16, 8 13, 8 10 C10.5 10.5, 13.5 13, 15 16"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Middle right leaf */}
      <path
        d="M15 13 C18 12, 22 9, 22 6 C19.5 6.5, 16.5 9, 15 12"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Top single leaf — clean teardrop, separate from stem */}
      <path
        d="M15 12 C14 10, 14 7, 16 5 C18 7, 17.5 10, 16 12 C15.7 12, 15.3 12, 15 12"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Top leaf center vein */}
      <path
        d="M15.5 12 C15.5 10, 15.8 7.5, 16 5"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
