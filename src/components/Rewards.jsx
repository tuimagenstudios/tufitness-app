import { Icon } from './Icons.jsx'

const ACHIEVEMENTS = [
  { id:'first_week', name:'Primera semana',        desc:'7 días seguidos activos',      xp:50,  icon:'flame'   },
  { id:'workout_10', name:'10 entrenamientos',     desc:'Completá 10 sesiones',         xp:100, icon:'dumbbell'},
  { id:'diet_7',     name:'Dieta a raya',          desc:'7 días cumpliendo macros',     xp:80,  icon:'diet'    },
  { id:'log_14',     name:'Registro disciplinado', desc:'14 días de registro continuo', xp:120, icon:'chart'   },
  { id:'first_kg',   name:'Primer kg',             desc:'Movete 1 kg en tu objetivo',   xp:150, icon:'target'  },
  { id:'streak_30',  name:'30 días seguidos',      desc:'Racha de 30 días activos',     xp:300, icon:'bolt'    },
]

export default function Rewards({ progress }) {
  const pct = progress.xp / progress.xpNext
  const levelName = progress.level < 3 ? 'Iniciando' : progress.level < 6 ? 'Constante' : progress.level < 10 ? 'Disciplinado' : 'Imparable'

  return (
    <div className="screen stack spb" style={{paddingBottom:16}}>
      <div className="topbar">
        <div className="stack gap-3">
          <span className="eyebrow">Tu disciplina, tus logros</span>
          <h2>Rewards</h2>
        </div>
      </div>

      {/* Level card */}
      <div className="sp anim-up" style={{marginTop:6}}>
        <div className="card card-glow" style={{padding:22}}>
          <div className="row items-center gap-18">
            <div style={{
              width:76, height:76, borderRadius:22, flexShrink:0,
              background:'radial-gradient(circle at 30% 30%, var(--accent), var(--accent-deep))',
              display:'grid', placeItems:'center',
              boxShadow:'0 0 28px rgba(62,235,212,0.5)',
            }}>
              <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:32,color:'#041412'}}>{progress.level}</span>
            </div>
            <div className="stack gap-4 flex-1">
              <span className="eyebrow accent">Nivel actual</span>
              <div style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:800}}>{levelName}</div>
              <div className="mono muted" style={{fontSize:11,marginTop:2}}>{progress.xp} / {progress.xpNext} XP</div>
            </div>
          </div>
          <div className="progress-bar" style={{marginTop:18,height:6}}>
            <div style={{width:`${pct*100}%`}}/>
          </div>
          <div className="mono dim" style={{fontSize:10,marginTop:7,textAlign:'right'}}>
            {progress.xpNext - progress.xp} XP para nivel {progress.level+1}
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="sp anim-up-1" style={{marginTop:14}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
          {[
            {icon:'flame',    val:progress.streak,          lbl:'Días racha'},
            {icon:'dumbbell', val:progress.totalWorkouts,   lbl:'Sesiones'},
            {icon:'star',     val:progress.unlocked.length, lbl:'Logros'},
          ].map((s,i)=>(
            <div key={i} className="stat-box" style={{textAlign:'center'}}>
              <div style={{display:'flex',justifyContent:'center',marginBottom:6}}>
                <Icon name={s.icon} size={14} color="var(--accent)"/>
              </div>
              <div className="stat-val" style={{fontSize:22}}>{s.val}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="sp anim-up-2" style={{marginTop:18}}>
        <div className="row items-center justify-between" style={{marginBottom:12}}>
          <span className="eyebrow">Logros</span>
          <span className="mono dim" style={{fontSize:10}}>{progress.unlocked.length}/{ACHIEVEMENTS.length}</span>
        </div>
        <div className="stack gap-8">
          {ACHIEVEMENTS.map(a => {
            const done = progress.unlocked.includes(a.id)
            return (
              <div key={a.id} className="card card-sm" style={{
                padding:'13px 16px',
                opacity:done?1:0.5,
                borderColor:done?'rgba(62,235,212,0.3)':'var(--border)',
              }}>
                <div className="row items-center gap-12">
                  <div style={{
                    width:40, height:40, borderRadius:10, flexShrink:0,
                    background:done?'var(--accent-soft)':'var(--surface-2)',
                    border:`1px solid ${done?'rgba(62,235,212,0.35)':'var(--border)'}`,
                    display:'grid', placeItems:'center',
                  }}>
                    {done ? <Icon name={a.icon} size={17} color="var(--accent)"/> : <Icon name="lock" size={13} color="var(--fg-dim)"/>}
                  </div>
                  <div className="flex-1">
                    <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:14}}>{a.name}</div>
                    <div style={{fontSize:12,color:'var(--fg-dim)',marginTop:2}}>{a.desc}</div>
                  </div>
                  <span className="mono" style={{fontSize:10.5, color:done?'var(--accent)':'var(--fg-dim)'}}>+{a.xp} XP</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
