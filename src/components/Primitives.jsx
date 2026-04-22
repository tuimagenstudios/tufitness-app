import { Icon } from './Icons.jsx'

export const CoachBubble = ({ children, loading }) => (
  <div className="coach-bubble anim-up">
    <div className="coach-avatar">
      <Icon name="spark" size={15} color="#041412" />
    </div>
    <div className="coach-text">
      {loading ? (
        <div className="dot-pulse">
          <span/><span/><span/>
        </div>
      ) : children}
    </div>
  </div>
)

export const ProgressRing = ({ size = 130, stroke = 9, value = 0, color = 'var(--accent)', children }) => {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * Math.max(0, Math.min(1, value))
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--surface-2)" strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.9s cubic-bezier(0.16,1,0.3,1)', filter: 'drop-shadow(0 0 8px var(--accent-glow))' }}/>
      </svg>
      <div className="ring-center">{children}</div>
    </div>
  )
}

export const LifterAnim = () => (
  <div style={{ position:'relative', width:200, height:200, display:'grid', placeItems:'center' }}>
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="50" stroke="var(--accent)" strokeWidth="1" opacity="0.15">
        <animate attributeName="r" values="50;90;50" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite"/>
      </circle>
      <g style={{ transformOrigin:'100px 120px', animation:'lift 1.5s ease-in-out infinite' }}>
        <circle cx="100" cy="78" r="10" fill="var(--accent)"/>
        <rect x="91" y="90" width="18" height="30" rx="5" fill="var(--accent)"/>
        <rect x="93" y="120" width="6" height="24" rx="3" fill="var(--accent)" opacity="0.8"/>
        <rect x="101" y="120" width="6" height="24" rx="3" fill="var(--accent)" opacity="0.8"/>
        <rect x="73" y="94" width="20" height="5" rx="2.5" fill="var(--accent)"/>
        <rect x="107" y="94" width="20" height="5" rx="2.5" fill="var(--accent)"/>
      </g>
      <g style={{ animation:'barLift 1.5s ease-in-out infinite' }}>
        <rect x="46" y="92" width="108" height="3.5" rx="1.75" fill="var(--fg)"/>
        <rect x="38" y="85" width="9" height="17" rx="2" fill="var(--fg)"/>
        <rect x="32" y="82" width="6" height="23" rx="2" fill="var(--fg)" opacity="0.7"/>
        <rect x="153" y="85" width="9" height="17" rx="2" fill="var(--fg)"/>
        <rect x="162" y="82" width="6" height="23" rx="2" fill="var(--fg)" opacity="0.7"/>
      </g>
      <line x1="50" y1="168" x2="150" y2="168" stroke="var(--border-2)" strokeWidth="1" strokeDasharray="3 5"/>
    </svg>
  </div>
)

export const TaskRow = ({ done, label, xp }) => (
  <div className="card card-sm row items-center gap-12" style={{ opacity: done ? 0.6 : 1 }}>
    <div style={{
      width:20, height:20, borderRadius:6, flexShrink:0,
      border: `1.5px solid ${done ? 'var(--accent)' : 'var(--border-2)'}`,
      background: done ? 'var(--accent)' : 'transparent',
      display:'grid', placeItems:'center',
    }}>
      {done && <Icon name="check" size={11} color="#041412" />}
    </div>
    <span style={{ fontSize:13.5, flex:1, textDecoration: done ? 'line-through' : 'none', textDecorationColor:'var(--fg-dim)' }}>{label}</span>
    <span className="mono" style={{ fontSize:10.5, color: done ? 'var(--accent)' : 'var(--fg-dim)' }}>{xp}</span>
  </div>
)
