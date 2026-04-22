import { useState } from 'react'
import { Icon } from './Icons.jsx'
import { CoachBubble } from './Primitives.jsx'

export default function Progress({ data, progress, setProgress }) {
  const [weight, setWeight] = useState(String(progress.weightCurrent))
  const hist = progress.weightHistory

  const logWeight = () => {
    const w = parseFloat(weight)
    if (isNaN(w) || w < 30 || w > 300) return
    const delta = +(w - progress.weightCurrent).toFixed(1)
    setProgress(p => ({
      ...p, weightCurrent:w, weightDelta:delta,
      weightHistory:[...p.weightHistory.slice(-11), w],
      xp: p.xp + 15,
      tasks:{...p.tasks, weight:true},
    }))
  }

  // SVG chart
  const W=310, H=130
  const min = Math.min(...hist)-0.5, max = Math.max(...hist)+0.5
  const pts = hist.map((v,i)=>[
    (i/(hist.length-1))*W,
    H-((v-min)/(max-min))*H
  ])
  const path = pts.map(([x,y],i)=>`${i===0?'M':'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = path+` L${W},${H} L0,${H} Z`

  const totalDelta = +(hist[hist.length-1]-hist[0]).toFixed(1)
  const trend = Math.abs(totalDelta)<0.4?'estable':totalDelta<0?'bajando':'subiendo'
  const aligned = (data.goal==='fat'&&trend==='bajando')||(data.goal==='muscle'&&trend==='subiendo')||(data.goal==='recomp'&&trend==='estable')
  const goalDir = {muscle:'subiendo',fat:'bajando',recomp:'estable'}[data.goal]

  return (
    <div className="screen stack spb" style={{paddingBottom:16}}>
      <div className="topbar">
        <div className="stack gap-3">
          <span className="eyebrow">Tu evolución</span>
          <h2>Progreso</h2>
        </div>
      </div>

      {/* Peso + gráfico */}
      <div className="sp anim-up" style={{marginTop:6}}>
        <div className="card">
          <div className="row items-center justify-between" style={{marginBottom:4}}>
            <span className="eyebrow">Peso actual</span>
            <span className="mono" style={{fontSize:10.5, color:progress.weightDelta<0?'var(--accent)':'var(--warn)'}}>
              {progress.weightDelta>0?'+':''}{progress.weightDelta} kg esta semana
            </span>
          </div>
          <div className="row items-baseline gap-6">
            <span style={{fontFamily:'var(--font-display)',fontSize:44,fontWeight:800,letterSpacing:'-0.04em'}}>{progress.weightCurrent}</span>
            <span className="mono muted" style={{fontSize:14}}>kg</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',height:128,marginTop:10,overflow:'visible'}} preserveAspectRatio="none">
            <defs>
              <linearGradient id="wGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={area} fill="url(#wGrad)"/>
            <path d={path} stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{filter:'drop-shadow(0 0 5px var(--accent-glow))'}}/>
            {pts.map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r={i===pts.length-1?4.5:2} fill="var(--accent)"/>
            ))}
          </svg>
          <div className="row justify-between" style={{marginTop:4}}>
            <span className="mono dim" style={{fontSize:9.5}}>12 semanas atrás</span>
            <span className="mono dim" style={{fontSize:9.5}}>Hoy</span>
          </div>
        </div>
      </div>

      {/* Coach */}
      <div className="sp anim-up-1" style={{marginTop:14}}>
        <CoachBubble>
          {aligned
            ? <>Vas <strong>{goalDir}</strong> — exactamente lo que buscamos. Mantené el ritmo.</>
            : <>Estás {trend} pero tu objetivo pide {goalDir}. <strong>Revisá adherencia a macros</strong> esta semana.</>}
        </CoachBubble>
      </div>

      {/* Log peso */}
      <div className="sp anim-up-2" style={{marginTop:18}}>
        <span className="eyebrow" style={{display:'block',marginBottom:10}}>Registrar peso de hoy</span>
        <div className="row gap-10">
          <input className="field flex-1" type="number" inputMode="decimal" value={weight}
            onChange={e=>setWeight(e.target.value)} step="0.1" style={{maxWidth:160}}/>
          <button className="btn btn-primary" onClick={logWeight} style={{padding:'0 20px',height:52}}>
            <Icon name="plus" size={15} color="#041412"/>
            Guardar
          </button>
        </div>
      </div>

      {/* Medidas */}
      <div className="sp anim-up-3" style={{marginTop:18}}>
        <span className="eyebrow" style={{display:'block',marginBottom:10}}>Medidas corporales</span>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {[
            {k:'Cintura',v:progress.measures.waist,u:'cm',d:-1.5},
            {k:'Pecho',  v:progress.measures.chest,u:'cm',d:+0.8},
            {k:'Brazo',  v:progress.measures.arm,  u:'cm',d:+0.4},
            {k:'Muslo',  v:progress.measures.thigh,u:'cm',d:+0.2},
          ].map((m,i)=>(
            <div key={i} className="stat-box">
              <div className="stat-lbl">{m.k}</div>
              <div className="row items-baseline gap-4" style={{marginTop:5}}>
                <div className="stat-val">{m.v}</div>
                <span className="mono dim" style={{fontSize:11}}>{m.u}</span>
              </div>
              <div className="mono" style={{fontSize:9.5,marginTop:4,color:m.d<0?'var(--accent)':'var(--fg-dim)'}}>
                {m.d>0?'+':''}{m.d} este mes
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Semana */}
      <div className="sp" style={{marginTop:18}}>
        <span className="eyebrow" style={{display:'block',marginBottom:10}}>Esta semana</span>
        <div className="stack gap-8">
          {[
            {label:'Entrenamientos',value:`${progress.week.workouts}/5`,pct:progress.week.workouts/5},
            {label:'Adherencia dieta',value:`${progress.week.diet}%`,pct:progress.week.diet/100},
            {label:'Registros diarios',value:`${progress.week.logs}/7`,pct:progress.week.logs/7},
          ].map((s,i)=>(
            <div key={i} className="card card-sm" style={{padding:'12px 14px'}}>
              <div className="row justify-between items-center" style={{marginBottom:8}}>
                <span style={{fontSize:13}}>{s.label}</span>
                <span className="mono" style={{fontSize:11,color:'var(--accent)'}}>{s.value}</span>
              </div>
              <div className="progress-bar"><div style={{width:`${s.pct*100}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
