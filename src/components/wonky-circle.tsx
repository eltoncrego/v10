interface WonkyCircleProps {
  size?: number;
  className?: string;
}

export function WonkyCircle({ size = 48, className }: WonkyCircleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        d={[
          "M 51 3",
          "C 64 2, 76 4, 86 13",
          "C 95 21, 98 36, 97 49",
          "C 96 62, 94 78, 85 87",
          "C 76 96, 63 99, 48 98",
          "C 34 97, 21 94, 13 85",
          "C 4 75, 2 63, 3 50",
          "C 4 37, 7 23, 16 14",
          "C 25 4, 39 3, 51 3",
          "Z",
        ].join(" ")}
      />
    </svg>
  );
}
