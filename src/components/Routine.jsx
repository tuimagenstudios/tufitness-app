import { useState } from 'react'
import { Icon } from './Icons.jsx'
import { CoachBubble } from './Primitives.jsx'

const ROUTINES = {
  muscle: {
    title:'Fuerza e Hipertrofia', freq:'5 días/semana',
    splits:[
      { day:'Lun', name:'Push', exercises:[
        { name:'Press banca', sets:4, reps:'8-10', rest:'90s' },
        { name:'Press militar', sets:3, reps:'10', rest:'75s' },
        { name:'Aperturas inclinadas', sets:3, reps:'12', rest:'60s' },
        { name:'Fondos', sets:3, reps:'AMRAP', rest:'90s' },
        { name:'Tríceps en polea', sets:3, reps:'12-15', rest:'45s' },
      ]},
      { day:'Mar', name:'Pull', exercises:[
        { name:'Dominadas', sets:4, reps:'6-8', rest:'90s' },
        { name:'Remo con barra', sets:4, reps:'8-10', rest:'90s' },
        { name:'Jalón al pecho', sets:3, reps:'10-12', rest:'60s' },
        { name:'Curl de bíceps', sets:3, reps:'12', rest:'45s' },
      ]},
      { day:'Mié', name:'Piernas', exercises:[
        { name:'Sentadilla', sets:4, reps:'6-8', rest:'120s' },
        { name:'Peso muerto rumano', sets:3, reps:'8-10', rest:'90s' },
        { name:'Prensa de piernas', sets:3, reps:'10-12', rest:'75s' },
        { name:'Gemelos de pie', sets:4, reps:'15', rest:'45s' },
      ]},
    ],
  },
  fat: {
    title:'Cardio + Fuerza', freq:'4-5 días/semana',
    splits:[
      { day:'Lun', name:'Full Body A', exercises:[
        { name:'Goblet squat', sets:3, reps:'12', rest:'45s' },
        { name:'Press banca mancuernas', sets:3, reps:'10', rest:'60s' },
        { name:'Remo en mancuerna', sets:3, reps:'10', rest:'60s' },
        { name:'HIIT bicicleta', sets:6, reps:'30s on/30s off', rest:'—' },
      ]},
      { day:'Mar', name:'Cardio', exercises:[
        { name:'Caminata rápida / trote', sets:1, reps:'35 min', rest:'—' },
        { name:'Plancha frontal', sets:3, reps:'45s', rest:'30s' },
        { name:'Hollow hold', sets:3, reps:'30s', rest:'30s' },
      ]},
      { day:'Mié', name:'Full Body B', exercises:[
        { name:'Peso muerto', sets:3, reps:'8', rest:'90s' },
        { name:'Press militar', sets:3, reps:'10', rest:'60s' },
        { name:'Jalón al pecho', sets:3, reps:'12', rest:'60s' },
        { name:'Burpees', sets:4, reps:'10', rest:'45s' },
      ]},
    ],
  },
  recomp: {
    title:'Recomposición', freq:'4 días/semana',
    splits:[
      { day:'Lun', name:'Upper', exercises:[
        { name:'Press banca', sets:3, reps:'8-10', rest:'75s' },
        { name:'Remo en máquina', sets:3, reps:'10', rest:'60s' },
        { name:'Press militar', sets:3, reps:'10', rest:'60s' },
        { name:'Curl + Extensión', sets:3, reps:'12', rest:'45s' },
      ]},
      { day:'Mar', name:'Lower', exercises:[
        { name:'Sentadilla', sets:3, reps:'8-10', rest:'90s' },
        { name:'Peso muerto rumano', sets:3, reps:'10', rest:'75s' },
        { name:'Zancadas', sets:3, reps:'12 c/pierna', rest:'60s' },
        { name:'Plancha lateral', sets:3, reps:'30s', rest:'30s' },
      ]},
    ],
  },
}

export default function Routine({ data }) {
  const routine = ROUTINES[data.goal] || ROUTINES.recomp
  const [activeDay, setActiveDay] = useState(0)
  const [completed, setCompleted] = useState({})
  const day = routine.splits[activeDay]
  const key = (di,ei) => `${di}-${ei}`
  const doneCount = Object.entries(completed).filter(([k,v]) => k.startsWith(`${activeDay}-`) && v).length

  return (
    <div className="screen stack spb" style={{paddingBottom:16}}>
      <div className="topbar">
        <div className="stack gap-3">
          <span className="eyebrow">Tu entrenamiento</span>
          <h2>Rutina</h2>
        </div>
        <span className="badge badge-accent"><Icon name="clock" size={10}/> {routine.freq}</span>
      </div>

      {/* Plan summary */}
      <div className="sp anim-up" style={{marginTop:6}}>
        <div className="card card-glow" style={{padding:18}}>
          <span className="eyebrow accent">Programa</span>
          <div style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:800,marginTop:6,letterSpacing:'-0.02em'}}>{routine.title}</div>
          <div className="row gap-8 anim-up-1" style={{marginTop:12,flexWrap:'wrap'}}>
            {routine.splits.map((s,i) => (
              <button key={i} onClick={()=>setActiveDay(i)} style={{
                all:'unset', cursor:'pointer',
                padding:'7px 14px', borderRadius:'var(--r-pill)',
                border:`1px solid ${activeDay===i?'var(--accent)':'var(--border-2)'}`,
                background: activeDay===i?'var(--accent-soft)':'transparent',
                color: activeDay===i?'var(--accent)':'var(--fg-muted)',
                fontSize:12.5, fontFamily:'var(--font-display)', fontWeight:600,
                transition:'all 0.15s',
              }}>
                <span className="mono" style={{fontSize:9.5,marginRight:6,opacity:0.7}}>{s.day}</span>{s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Session */}
      <div className="sp anim-up-1" style={{marginTop:18}}>
        <div className="row items-center justify-between" style={{marginBottom:12}}>
          <div>
            <span className="eyebrow">{day.day} · {day.name}</span>
            <div style={{fontFamily:'var(--font-display)',fontSize:15,fontWeight:600,marginTop:3}}>{day.exercises.length} ejercicios</div>
          </div>
          <div className="stack items-end gap-4">
            <span className="mono" style={{fontSize:12,color:'var(--accent)'}}>{doneCount}/{day.exercises.length}</span>
            <div className="progress-bar" style={{width:72}}><div style={{width:`${(doneCount/day.exercises.length)*100}%`}}/></div>
          </div>
        </div>

        <div className="stack gap-8">
          {day.exercises.map((ex,ei) => {
            const k = key(activeDay,ei)
            const done = !!completed[k]
            return (
              <div key={ei} className="card card-sm" style={{
                padding:'13px 16px', opacity:done?0.55:1,
                borderColor:done?'rgba(62,235,212,0.35)':'var(--border)',
                transition:'all 0.2s',
              }}>
                <div className="row items-center gap-12">
                  <button onClick={()=>setCompleted(c=>({...c,[k]:!c[k]}))} style={{
                    all:'unset', cursor:'pointer', flexShrink:0,
                    width:24, height:24, borderRadius:7,
                    border:`1.5px solid ${done?'var(--accent)':'var(--border-2)'}`,
                    background:done?'var(--accent)':'transparent',
                    display:'grid', placeItems:'center', transition:'all 0.15s',
                  }}>
                    {done && <Icon name="check" size={12} color="#041412"/>}
                  </button>
                  <div className="flex-1">
                    <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:14.5,textDecoration:done?'line-through':'none',textDecorationColor:'var(--fg-dim)'}}>{ex.name}</div>
                    <div className="row items-center gap-6" style={{marginTop:3}}>
                      <span className="mono" style={{fontSize:11,color:'var(--accent)'}}>{ex.sets}×{ex.reps}</span>
                      <span style={{color:'var(--border-2)'}}>·</span>
                      <span className="mono" style={{fontSize:10.5,color:'var(--fg-dim)'}}>descanso {ex.rest}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Coach feedback */}
      <div className="sp anim-up-2" style={{marginTop:18}}>
        <CoachBubble>
          {doneCount===0 && <>Empezá cuando quieras. Marcá cada ejercicio al terminarlo — <strong>yo llevo la cuenta.</strong></>}
          {doneCount>0 && doneCount<day.exercises.length && <>Buen ritmo. Te quedan <strong>{day.exercises.length-doneCount}</strong> para cerrar la sesión.</>}
          {doneCount===day.exercises.length && <><strong>Sesión completa.</strong> Eso es +40 XP para vos. Así se construye. 🎯</>}
        </CoachBubble>
      </div>
    </div>
  )
}
