/**
 * Placeholder for a secondary/partner emblem (e.g. a government or
 * institutional seal) shown on the right side of headers. Replace
 * the markup with the real emblem when available.
 */
interface LogoPartnerProps {
  size?: number;
  className?: string;
}

function LogoPartner({ size = 36, className = '' }: LogoPartnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Partner emblem"
    >
      <circle cx="32" cy="32" r="30" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="22" fill="var(--color-trust-strong)" />
      <path
        d="M32 20l3.5 7.2 7.9 1.15-5.7 5.6 1.35 7.9L32 38.1l-7.05 3.75 1.35-7.9-5.7-5.6 7.9-1.15L32 20Z"
        fill="var(--color-accent-soft)"
      />
    </svg>
  );
}

export default LogoPartner;
