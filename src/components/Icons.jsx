export const Icon = ({ name, size = 20, color = 'currentColor' }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'home':      return <svg {...p}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5Z"/></svg>
    case 'diet':      return <svg {...p}><path d="M12 3c3 0 5 3 5 6s-2 5-5 5-5-2-5-5 2-6 5-6Z"/><path d="M12 14v7"/><path d="M9 21h6"/></svg>
    case 'dumbbell':  return <svg {...p}><path d="M6 9v6"/><path d="M18 9v6"/><path d="M3 11v2"/><path d="M21 11v2"/><path d="M6 12h12"/></svg>
    case 'chart':     return <svg {...p}><path d="M4 20V5"/><path d="M20 20H4"/><path d="M7 16l4-5 3 3 5-7"/></svg>
    case 'trophy':    return <svg {...p}><path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 6H5v2a3 3 0 0 0 3 3"/><path d="M16 6h3v2a3 3 0 0 1-3 3"/><path d="M10 14h4v3h2v2H8v-2h2v-3Z"/></svg>
    case 'arrow-r':   return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    case 'arrow-l':   return <svg {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
    case 'check':     return <svg {...p}><path d="M4 12l5 5L20 6"/></svg>
    case 'plus':      return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>
    case 'flame':     return <svg {...p}><path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-5 0 0 3 1 3-3Z"/></svg>
    case 'spark':     return <svg {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/></svg>
    case 'user':      return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
    case 'clock':     return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
    case 'target':    return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={color}/></svg>
    case 'bolt':      return <svg {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>
    case 'star':      return <svg {...p}><path d="m12 3 2.7 5.5 6 .9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.3 9.4l6-.9L12 3Z"/></svg>
    case 'lock':      return <svg {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
    case 'send':      return <svg {...p}><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>
    case 'scale':     return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M8 9h8M10 13h4"/></svg>
    case 'medal':     return <svg {...p}><circle cx="12" cy="14" r="6"/><path d="M9 3h6l2 4H7l2-4Z"/><path d="M12 11v3l1.5 1.5"/></svg>
    default: return null
  }
}
