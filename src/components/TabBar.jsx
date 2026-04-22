import { Icon } from './Icons.jsx'

const TABS = [
  { id:'home',     icon:'home',     label:'Inicio'  },
  { id:'diet',     icon:'diet',     label:'Dieta'   },
  { id:'routine',  icon:'dumbbell', label:'Rutina'  },
  { id:'progress', icon:'chart',    label:'Progreso'},
  { id:'rewards',  icon:'trophy',   label:'Rewards' },
]

export default function TabBar({ active, onChange }) {
  return (
    <div className="tabbar">
      {TABS.map(t => (
        <button key={t.id} className={`tab ${active===t.id?'active':''}`} onClick={()=>onChange(t.id)}>
          <Icon name={t.icon} size={20} color={active===t.id?'var(--accent)':'var(--fg-dim)'}/>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  )
}
