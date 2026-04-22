import { useState } from 'react'
import { Icon } from './Icons.jsx'

const GOALS = [
  { id:'muscle', label:'Ganar masa muscular', hint:'Fuerza e hipertrofia' },
  { id:'fat',    label:'Perder grasa',        hint:'Déficit + cardio' },
  { id:'recomp', label:'Recomposición',       hint:'Tonificar y mantener' },
]
const LEVELS = [
  { id:'beg', label:'Principiante', hint:'Menos de 6 meses' },
  { id:'int', label:'Intermedio',   hint:'6 meses – 2 años' },
  { id:'adv', label:'Avanzado',     hint:'2+ años constantes' },
]

export { GOALS, LEVELS }

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ name:'', age:'', weight:'', height:'', goal:'', breakfast:'', level:'' })
  const set = (k, v) => setData(d => ({ ...d, [k]: v }))

  const steps = [
    {
      kicker:'01 — Hola', title:'¿Cómo te llamás?',
      sub:'Empecemos por lo básico. Te voy a llamar por tu nombre.',
      render: () => <input autoFocus className="field" placeholder="Tu nombre" value={data.name} onChange={e => set('name', e.target.value)}/>,
      valid: () => data.name.trim().length >= 2,
    },
    {
      kicker:'02 — Edad', title:`Un gusto, ${data.name || 'vos'}.`,
      sub:'¿Qué edad tenés? La uso para calcular tu gasto calórico.',
      render: () => <input autoFocus className="field" placeholder="Ej. 28" inputMode="numeric" type="number" value={data.age} onChange={e => set('age', e.target.value.replace(/\D/g,'').slice(0,3))}/>,
      valid: () => +data.age >= 13 && +data.age <= 90,
    },
    {
      kicker:'03 — Peso', title:'¿Cuánto pesás hoy?',
      sub:'No hay números buenos ni malos — es tu punto de partida.',
      render: () => (
        <div className="row items-center gap-10">
          <input autoFocus className="field flex-1" placeholder="Ej. 72.5" inputMode="decimal" type="number" value={data.weight} onChange={e => set('weight', e.target.value)}/>
          <span className="mono muted" style={{fontSize:14}}>kg</span>
        </div>
      ),
      valid: () => +data.weight >= 30 && +data.weight <= 300,
    },
    {
      kicker:'04 — Altura', title:'¿Tu altura?',
      sub:'Para calcular tu IMC y referencias de rendimiento.',
      render: () => (
        <div className="row items-center gap-10">
          <input autoFocus className="field flex-1" placeholder="Ej. 175" inputMode="numeric" type="number" value={data.height} onChange={e => set('height', e.target.value)}/>
          <span className="mono muted" style={{fontSize:14}}>cm</span>
        </div>
      ),
      valid: () => +data.height >= 120 && +data.height <= 240,
    },
    {
      kicker:'05 — Objetivo', title:'¿Qué querés lograr?',
      sub:'Tu plan completo se adapta a esta decisión.',
      render: () => (
        <div className="stack gap-10">
          {GOALS.map(g => (
            <button key={g.id} className={`chip ${data.goal === g.id ? 'selected' : ''}`} onClick={() => set('goal', g.id)}>
              <div>
                <div style={{fontWeight:600,fontSize:15}}>{g.label}</div>
                <div style={{fontSize:12,color:'var(--fg-dim)',marginTop:3}}>{g.hint}</div>
              </div>
              <div className="chip-dot"/>
            </button>
          ))}
        </div>
      ),
      valid: () => !!data.goal,
    },
    {
      kicker:'06 — Hábitos', title:'Contame cómo comés y entrenás.',
      sub:'Con esto detecto tu nivel real y personalizo mejor.',
      render: () => (
        <div className="stack gap-18">
          <div className="stack gap-8">
            <span className="eyebrow">¿Qué desayunás normalmente?</span>
            <textarea className="field" rows={3} placeholder="Ej. café con leche y tostadas con mermelada"
              value={data.breakfast} onChange={e => set('breakfast', e.target.value.slice(0,200))}/>
          </div>
          <div className="stack gap-8" style={{marginTop:10}}>
            <span className="eyebrow">Tu nivel con el entrenamiento</span>
            <div className="stack gap-8">
              {LEVELS.map(l => (
                <button key={l.id} className={`chip ${data.level === l.id ? 'selected' : ''}`} onClick={() => set('level', l.id)}>
                  <div>
                    <div style={{fontWeight:600,fontSize:15}}>{l.label}</div>
                    <div style={{fontSize:12,color:'var(--fg-dim)',marginTop:3}}>{l.hint}</div>
                  </div>
                  <div className="chip-dot"/>
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      valid: () => data.breakfast.trim().length >= 4 && !!data.level,
    },
  ]

  const total = steps.length
  const s = steps[step]
  const next = () => { if (!s.valid()) return; step < total-1 ? setStep(step+1) : onFinish(data) }
  const back = () => step > 0 && setStep(step-1)

  return (
    <div className="screen stack" style={{height:'100%'}} onKeyDown={e => e.key==='Enter' && s.valid() && next()}>
      {/* Progress header */}
      <div className="sp spt" style={{paddingBottom:20}}>
        <div className="row items-center gap-12">
          <button onClick={back} disabled={step===0} style={{
            background:'none', border:'none', cursor: step===0?'default':'pointer',
            opacity: step===0?0.2:1, padding:4, color:'var(--fg)'
          }}>
            <Icon name="arrow-l" size={22} color="var(--fg)"/>
          </button>
          <div className="progress-bar flex-1"><div style={{width:`${((step+1)/total)*100}%`}}/></div>
          <span className="mono dim" style={{fontSize:11}}>{String(step+1).padStart(2,'0')}/{String(total).padStart(2,'0')}</span>
        </div>
      </div>

      {/* Question */}
      <div className="sp stack gap-20 flex-1" key={step} style={{paddingBottom:24}}>
        <div className="stack gap-8 anim-up">
          <span className="eyebrow accent">{s.kicker}</span>
          <h1 style={{textWrap:'balance'}}>{s.title}</h1>
          <p className="muted" style={{fontSize:13.5, textWrap:'pretty'}}>{s.sub}</p>
        </div>
        <div className="anim-up-1">{s.render()}</div>
      </div>

      {/* CTA */}
      <div className="sp spb">
        <button className="btn btn-primary btn-block" disabled={!s.valid()} onClick={next}>
          {step === total-1 ? 'Analizar mi perfil' : 'Siguiente'}
          <Icon name={step === total-1 ? 'spark' : 'arrow-r'} size={17} color="#041412"/>
        </button>
      </div>
    </div>
  )
}
