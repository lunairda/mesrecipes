interface DoodleProps {
  size?: number;
  className?: string;
  color?: string;
}

export function Whisk({ size = 32, className = "", color = "#C46E72" }: DoodleProps) {
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
      {/* Handle */}
      <path
        d="M16 21 L20 30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Handle grip marks */}
      <path d="M17.2 23.5 L18.8 22.8" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />
      <path d="M18 25.5 L19.6 24.8" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />

      {/* Center spine */}
      <path
        d="M16 21 L16 5"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Left wires — arcing outward from spine */}
      <path
        d="M16 18 C14 16, 10 14, 9 10 C8.5 7, 10 5, 13 5 C14.5 5, 16 5.5, 16 5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 18 C14.5 16, 12 14, 12 10 C12 7.5, 13.5 6, 16 5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right wires — arcing outward from spine */}
      <path
        d="M16 18 C17.5 16, 20 14, 20 10 C20 7.5, 18.5 6, 16 5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 18 C18 16, 22 14, 23 10 C23.5 7, 22 5, 19 5 C17.5 5, 16 5.5, 16 5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Gathering band at the bottom of the wires */}
      <path
        d="M9.5 15.5 C11.5 17, 14 18, 16 18 C18 18, 20.5 17, 22.5 15.5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
