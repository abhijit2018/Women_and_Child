/**
 * Primary portal mark — a simple protective arc over a grounded dot.
 * Swap this file's markup for your real brand logo; the component
 * signature (size, className) is kept stable so callers don't change.
 */
interface LogoMarkProps {
  size?: number;
  className?: string;
}

function LogoMark({ size = 40, className = '' }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Women Portal logo"
    >
      <circle cx="32" cy="32" r="30" fill="var(--color-brand-strong)" />
      <path
        d="M32 14c9.94 0 18 8.06 18 18 0 9.4-7.2 17.1-16.4 17.94V54h-3.2v-4.06C21.2 49.1 14 41.4 14 32c0-9.94 8.06-18 18-18Z"
        fill="var(--color-accent)"
      />
      <circle cx="32" cy="30" r="8" fill="var(--color-brand-strong)" />
    </svg>
  );
}

export default LogoMark;
