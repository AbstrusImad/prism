export function toAtto(s: string): bigint {
  const m = s.trim().match(/^(\d+)(?:\.(\d{0,18}))?$/);
  if (!m) return 0n;
  return BigInt(m[1]) * 10n ** 18n + BigInt((m[2] ?? '').padEnd(18, '0') || '0');
}

export function fromAtto(v: string | bigint, maxFrac = 4): string {
  const n = typeof v === 'bigint' ? v : BigInt(v || '0');
  const whole = n / 10n ** 18n;
  const frac = (n % 10n ** 18n).toString().padStart(18, '0').slice(0, maxFrac).replace(/0+$/, '');
  return frac ? `${whole}.${frac}` : whole.toString();
}

export const shortAddr = (a: string) => `${a.slice(0, 6)}...${a.slice(-4)}`;

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
