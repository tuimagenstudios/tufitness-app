import { useState } from 'react'
import { Icon } from './Icons.jsx'
import { CoachBubble, ProgressRing, TaskRow } from './Primitives.jsx'
import { askGemini, buildCoachPrompt } from '../hooks/useGemini.js'

export function generatePlan(data) {
  const w = +data.weight, h = +data.height, age = +data.age
  const bmr = Math.round(10*w + 6.25*h - 5*age + 5)
  const tdee = Math.round(bmr * 1.55)
  const kcal = data.goal==='muscle' ? tdee+300 : data.goal==='fat' ? tdee-400 : tdee
  const protein = Math.round(w * (data.goal==='fat' ? 2.2 : 2.0))
  const fat     = Math.round(w * 0.9)
  const carbs   = Math.max(80, Math.round((kcal - protein*4 - fat*9) / 4))
  return { bmr, tdee, kcal, macros:{ protein, carbs, fat } }
}

export const DEFAULT_PROGRESS = {
  overall:42, level:4, xp:380, xpNext:500, streak:7,
  totalWorkouts:18, weightCurrent:72.5, weightDelta:-0.3,
  weightHistory:[74.2,74.0,73.8,73.9,73.5,73.4,73.1,73.0,72.9,72.7,72.8,72.5],
  measures:{ waist:82, chest:102, arm:36, thigh:58 },
  week:{ workouts:3, diet:78, logs:5 },
  tasks:{ breakfast:true, workout:false, water:true, weight:false },
  unlocked:['first_week','workout_10','diet_7'],
}

function QuickCard({ icon, label, value, sub, onClick }) {
  return (
    <button onClick={onClick} style={{
      textAlign:'left', cursor:'pointer',
      background:'var(--surface)', border:'1px solid var(--border)',
      borderRadius:'var(--r-md)', padding:'14px',
      transition:'all 0.15s ease', color:'var(--fg)',
      display:'block', width:'100%',
    }}
    onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--border-2)'; e.currentTarget.style.background='var(--surface-2)' }}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--surface)' }}
    >
      <div className="row items-center justify-between" style={{marginBottom:10}}>
        <div style={{width:30,height:30,borderRadius:8,background:'var(--accent-soft)',display:'grid',placeItems:'center'}}>
          <Icon name={icon} size={15} color="var(--accent)"/>
        </div>
        <Icon name="arrow-r" size={13} color="var(--fg-dim)"/>
      </div>
      <div className="eyebrow" style={{marginBottom:4}}>{label}</div>
      <div style={{fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,letterSpacing:'-0.02em',lineHeight:1.1}}>{value}</div>
      <div className="mono" style={{fontSize:10.5,color:'var(--fg-dim)',marginTop:5}}>{sub}</div>
    </button>
  )
}

export default function Dashboard({ data, plan, progress, onNav }) {
  const [coachMsg, setCoachMsg] = useState(null)
  const [coachLoading, setCoachLoading] = useState(false)
  const name = data.name || 'Atleta'
  const hour = new Date().getHours()
  const greeting = hour<12?'Buenos días':hour<19?'Buenas tardes':'Buenas noches'
  const goalLabel = { muscle:'Ganar músculo', fat:'Perder grasa', recomp:'Recomposición' }[data.goal] || ''

  const askCoach = async () => {
    if (coachLoading) return
    setCoachLoading(true)
    setCoachMsg(null)
    try {
      const prompt = buildCoachPrompt(data, plan)
      const q = `Dame un consejo motivador y específico para hoy, considerando que mi objetivo es ${goalLabel} y llevo ${progress.streak} días de racha.`
      const res = await askGemini(prompt, q)
      setCoachMsg(res)
    } catch {
      setCoachMsg('Seguí así. La consistencia es la única variable que no falla. Hoy es otro día para sumar.')
    } finally {
      setCoachLoading(false)
    }
  }

  return (
    <div className="screen stack" style={{paddingBottom:16}}>
      {/* Topbar */}
      <div className="topbar">
        <div className="stack gap-3">
          <span className="eyebrow">{greeting}</span>
          <h2 style={{fontSize:21}}>{name}</h2>
        </div>
        <div className="row items-center gap-10">
          <span className="badge badge-accent"><Icon name="flame" size={10}/> {progress.streak} días</span>
          <div style={{width:36,height:36,borderRadius:'50%',background:'var(--surface-2)',border:'1px solid var(--border)',display:'grid',placeItems:'center'}}>
            <Icon name="user" size={15} color="var(--fg-muted)"/>
          </div>
        </div>
      </div>

      {/* Hero ring */}
      <div className="sp anim-up" style={{marginTop:6}}>
        <div className="card card-glow" style={{padding:20}}>
          <div className="row items-center gap-16">
            <ProgressRing size={118} stroke={8} value={progress.overall/100}>
              <div style={{fontFamily:'var(--font-display)',fontSize:26,fontWeight:800,color:'var(--accent)',letterSpacing:'-0.03em'}}>
                {progress.overall}<span style={{fontSize:13,color:'var(--fg-muted)'}}>%</span>
              </div>
              <div className="eyebrow" style={{marginTop:2,fontSize:9}}>progreso</div>
            </ProgressRing>
            <div className="stack gap-8 flex-1">
              <span className="eyebrow accent">Objetivo</span>
              <div style={{fontFamily:'var(--font-display)',fontSize:17,fontWeight:700,lineHeight:1.2}}>{goalLabel}</div>
              <div className="row items-center gap-6" style={{marginTop:2,flexWrap:'wrap'}}>
                <span className="badge badge-muted">{plan.kcal} kcal</span>
                <span className="badge badge-muted">Niv. {progress.level}</span>
              </div>
            </div>
          </div>
          <div className="divider" style={{margin:'14px 0'}}/>
          {/* Coach con Gemini */}
          {coachMsg || coachLoading ? (
            <CoachBubble loading={coachLoading}>{coachMsg}</CoachBubble>
          ) : (
            <button onClick={askCoach} className="btn btn-ghost btn-block" style={{padding:'11px 16px',fontSize:13}}>
              <Icon name="spark" size={14} color="var(--accent)"/>
              Pedirle consejo al coach IA
            </button>
          )}
        </div>
      </div>

      {/* Grid rápido */}
      <div className="sp anim-up-1" style={{marginTop:18}}>
        <div className="row items-center justify-between" style={{marginBottom:12}}>
          <span className="eyebrow">Tu plan de hoy</span>
          <span className="mono dim" style={{fontSize:10}}>
            {new Date().toLocaleDateString('es',{weekday:'long',day:'numeric',month:'short'})}
          </span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          <QuickCard icon="diet"     label="Dieta"    value={`${plan.kcal} kcal`}  sub={`P ${plan.macros.protein}g · C ${plan.macros.carbs}g · G ${plan.macros.fat}g`} onClick={()=>onNav('diet')}/>
          <QuickCard icon="dumbbell" label="Rutina"   value={data.goal==='fat'?'Full + HIIT':'Push · Fuerza'} sub="45 min · funcional" onClick={()=>onNav('routine')}/>
          <QuickCard icon="chart"    label="Progreso" value={`${progress.weightCurrent} kg`} sub={`${progress.weightDelta>0?'+':''}${progress.weightDelta} kg esta semana`} onClick={()=>onNav('progress')}/>
          <QuickCard icon="trophy"   label="Rewards"  value={`Nivel ${progress.level}`} sub={`${progress.xp}/${progress.xpNext} XP`} onClick={()=>onNav('rewards')}/>
        </div>
      </div>

      {/* Checklist */}
      <div className="sp anim-up-2" style={{marginTop:18}}>
        <span className="eyebrow" style={{display:'block',marginBottom:10}}>Checklist de hoy</span>
        <div className="stack gap-8">
          <TaskRow done={progress.tasks.breakfast} label="Desayuno registrado" xp="+10 XP"/>
          <TaskRow done={progress.tasks.workout}   label="Rutina completa"     xp="+40 XP"/>
          <TaskRow done={progress.tasks.water}     label="2L de agua"          xp="+10 XP"/>
          <TaskRow done={progress.tasks.weight}    label="Peso del día"        xp="+15 XP"/>
        </div>
      </div>
    </div>
  )
}
