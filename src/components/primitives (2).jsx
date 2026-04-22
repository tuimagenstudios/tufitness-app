// primitives.jsx — Componentes compartidos

// ── Icons ──────────────────────────────────────────────
export const Icon = ({ name, size = 20, color = 'currentColor' }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'home':      return <svg {...p}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>
    case 'diet':      return <svg {...p}><path d="M12 3c3 0 5 3 5 6s-2 5-5 5-5-2-5-5 2-6 5-6z"/><path d="M12 14v7M9 21h6"/></svg>
    case 'dumbbell':  return <svg {...p}><path d="M6 9v6M18 9v6M3 11v2M21 11v2M6 12h12"/></svg>
    case 'chart':     return <svg {...p}><path d="M4 20V5M20 20H4M7 16l4-5 3 3 5-7"/></svg>
    case 'trophy':    return <svg {...p}><path d="M8 4h8v4a4 4 0 0 1-8 0V4z"/><path d="M8 6H5v2a3 3 0 0 0 3 3M16 6h3v2a3 3 0 0 1-3 3"/><path d="M10 14h4v3h2v2H8v-2h2v-3z"/></svg>
    case 'arrow-r':   return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    case 'arrow-l':   return <svg {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
    case 'check':     return <svg {...p}><path d="M4 12l5 5L20 6"/></svg>
    case 'plus':      return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>
    case 'flame':     return <svg {...p}><path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-5 0 0 3 1 3-3z"/></svg>
    case 'spark':     return <svg {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/></svg>
    case 'user':      return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
    case 'clock':     return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
    case 'target':    return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={color}/></svg>
    case 'bolt':      return <svg {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>
    case 'lock':      return <svg {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
    case 'star':      return <svg {...p}><path d="m12 3 2.7 5.5 6 .9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.3 9.4l6-.9z"/></svg>
    case 'scale':     return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M8 9h8M10 13h4"/></svg>
    case 'send':      return <svg {...p}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
    case 'refresh':   return <svg {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M21 3v5h-5M3 21v-5h5"/></svg>
    default: return null
  }
}

// ── Progress Ring ───────────────────────────────────────
export const ProgressRing = ({ size = 130, stroke = 9, value = 0, color = 'var(--accent)', children }) => {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * Math.min(1, Math.max(0, value))
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'grid', placeItems: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--surface-2)" strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 6px var(--accent-glow))', transition: 'stroke-dasharray 0.9s cubic-bezier(0.16,1,0.3,1)' }}/>
      </svg>
      <div style={{ position: 'relative', textAlign: 'center' }}>{children}</div>
    </div>
  )
}

// ── Coach Bubble ────────────────────────────────────────
export const CoachBubble = ({ children, loading = false }) => (
  <div className="coach anim-up">
    <div className="coach-avatar">🤖</div>
    <div className="coach-msg">
      {loading
        ? <div className="row items-center gap-6" style={{ paddingTop: 6 }}>
            <div className="thinking-dot"/>
            <div className="thinking-dot"/>
            <div className="thinking-dot"/>
          </div>
        : children}
    </div>
  </div>
)

// ── Pulse Ring ──────────────────────────────────────────
export const PulseRing = () => (
  <div style={{
    position: 'absolute', inset: 0, borderRadius: '50%',
    border: '1.5px solid var(--accent)',
    animation: 'pulseRing 2s ease-out infinite',
  }}/>
)
