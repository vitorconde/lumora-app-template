export function LumoraLogo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="var(--lumora-azul)" />
      <circle cx="20" cy="17" r="7" fill="var(--lumora-ambar)" />
      <path d="M10 29h20" stroke="var(--lumora-ambar)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
