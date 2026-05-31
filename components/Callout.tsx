'use client'
type CalloutType = 'info' | 'tip' | 'warn' | 'danger'

const config: Record<CalloutType, { lightBg: string; darkBg: string; border: string; icon: string }> = {
  info:   { lightBg: '#eff6ff', darkBg: '#1a2640', border: '#93c5fd', icon: 'ℹ️' },
  tip:    { lightBg: '#f0fdf4', darkBg: '#142519', border: '#86efac', icon: '✅' },
  warn:   { lightBg: '#fffbeb', darkBg: '#251e10', border: '#fcd34d', icon: '⏱️' },
  danger: { lightBg: '#fef2f2', darkBg: '#25101a', border: '#fca5a5', icon: '🚨' },
}

export function Callout({ type = 'info', children }: { type?: CalloutType; children: React.ReactNode }) {
  const c = config[type]
  return (
    <div
      className="flex gap-3 rounded-lg my-4 p-4 text-sm leading-relaxed callout"
      data-type={type}
      style={{ borderLeft: `3px solid ${c.border}` }}
    >
      <span className="flex-shrink-0 mt-0.5 text-base">{c.icon}</span>
      <div style={{ color: 'var(--text-muted)' }}>{children}</div>
      <style>{`
        [data-type="${type}"].callout { background: ${c.lightBg}; }
        .dark [data-type="${type}"].callout { background: ${c.darkBg}; }
      `}</style>
    </div>
  )
}
