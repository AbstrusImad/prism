export function SkeletonCard() {
  return (
    <div className="neu-raised" style={{ padding: 'var(--space-lg)' }}>
      <div className="skeleton-pulse" style={{
        width: '60%',
        height: 20,
        borderRadius: 8,
        marginBottom: 12,
      }} />
      <div className="skeleton-pulse" style={{
        width: '100%',
        height: 14,
        borderRadius: 6,
        marginBottom: 8,
      }} />
      <div className="skeleton-pulse" style={{
        width: '80%',
        height: 14,
        borderRadius: 6,
        marginBottom: 8,
      }} />
      <div className="skeleton-pulse" style={{
        width: '40%',
        height: 14,
        borderRadius: 6,
      }} />
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
