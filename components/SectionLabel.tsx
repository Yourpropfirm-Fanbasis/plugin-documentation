export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-semibold uppercase tracking-widest mb-2 px-2.5 py-0.5 rounded-full"
      style={{ background: 'var(--accent-lt)', color: 'var(--brand-mid)' }}
    >
      {children}
    </span>
  )
}
