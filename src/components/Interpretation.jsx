import { useState, useEffect, useMemo } from 'react'
import { Icon } from './Icons.jsx'
import { CoachBubble, LifterAnim } from './Primitives.jsx'
import { GOALS, LEVELS } from './Onboarding.jsx'

function analyzeBreakfast(text) {
  const t = (text||'').toLowerCase()
  const has = w => w.some(x => t.includes(x))
  const protein = has(['huevo','yogur','queso','jamón','pollo','leche','whey','proteína','tofu','atún'])
  const carbs   = has(['pan','tostada','avena','cereal','banana','fruta','arepa','galleta','mermelada'])
  const sugar   = has(['azúcar','mermelada','nutella','chocolate','dulce'])
  const gaps    = []
  if (!protein) gaps.push('Proteína')
  if (!carbs)   gaps.push('Carbohidratos')
  if (sugar)    gaps.push('Azúcares añadidos ↑')
  const level = protein && carbs && !sugar ? 'Alto' : !protein && sugar ? 'Bajo' : 'Medio'
  return { level, gaps, protein, sugar }
}

function AnalyzingRow({ label, delay }) {
  const [done, setDone] = useState(false)
  useEffect(() => { const t = setTimeout(() => setDone(true), delay+700); return () => clearTimeout(t) }, [delay])
  return (
    <div className="card card-sm row items-center gap-12">
      <div style={{
        width:18, height:18, borderRadius:'50%', flexShrink:0,
        border:`1.5px solid ${done?'var(--accent)':'var(--border-2)'}`,
        background: done?'var(--accent)':'transparent',
        display:'grid', placeItems:'center', transition:'all 0.3s ease',
      }}>
        {done && <Icon name="check" size={10} color="#041412"/>}
      </div>
      <span style={{fontSize:13.5, color: done?'var(--fg)':'var(--fg-muted)', flex:1}}>{label}</span>
      {!done && <span className="mono dim" style={{fontSize:10}}>analizando…</span>}
    </div>
  )
}

export default function Interpretation({ data, onContinue }) {
  const [stage, setStage] = useState(0) // 0=analyzing 1=reveal 2=lifter
  const analysis = useMemo(() => analyzeBreakfast(data.breakfast), [data.breakfast])
  const goalLabel = GOALS.find(g => g.id === data.goal)?.label || ''
  const levelLabel = LEVELS.find(l => l.id === data.level)?.label || ''

  useEffect(() => {
    const t = setTimeout(() => setStage(1), 2600)
    return () => clearTimeout(t)
  }, [])

  const coachMsg = analysis.level === 'Alto'
    ? <><strong>Tu desayuno ya tiene buena base.</strong> Proteína presente, carbos equilibrados. Lo ajustamos para que esté 100% alineado con tu objetivo.</>
    : analysis.level === 'Bajo'
    ? <>Tu desayuno es principalmente azúcar rápida — <strong>te deja sin energía a media mañana.</strong> Lo rediseñamos para que rindas todo el día.</>
    : <>Hay base decente, pero <strong>podemos subirle la calidad</strong> con más proteína y menos azúcar. Te preparo el plan exacto.</>

  if (stage === 2) {
    return (
      <div className="screen stack items-center sp spt spb anim-in" style={{justifyContent:'space-between',paddingTop:60,paddingBottom:44}}>
        <div className="stack items-center gap-20 flex-1" style={{justifyContent:'center'}}>
          <LifterAnim/>
          <div className="stack items-center gap-10 text-center">
            <span className="eyebrow accent">Plan generado ✓</span>
            <h1>Listo, <span className="glow">{data.name}.</span></h1>
            <p className="muted" style={{maxWidth:270,fontSize:14,textWrap:'pretty'}}>
              Dieta, rutina y seguimiento calibrados para <strong style={{color:'var(--fg)'}}>{goalLabel.toLowerCase()}</strong>.
            </p>
          </div>
        </div>
        <button className="btn btn-primary btn-block" onClick={onContinue} style={{fontSize:16,padding:'17px 24px'}}>
          Entrar a mi dashboard
          <Icon name="arrow-r" size={18} color="#041412"/>
        </button>
      </div>
    )
  }

  return (
    <div className="screen stack sp spt spb" style={{paddingTop:40}}>
      <div className="stack gap-20 flex-1">
        <div className="stack gap-8 anim-up">
          <span className="eyebrow accent">Analizando tu perfil</span>
          <h1 style={{textWrap:'balance'}}>
            {stage===0 ? 'Leyendo tus respuestas…' : `Esto es lo que veo en vos, ${data.name}.`}
          </h1>
        </div>

        {stage===0 && (
          <div className="stack gap-8 anim-up-1">
            <AnalyzingRow label="Perfil personal" delay={0}/>
            <AnalyzingRow label="Objetivo físico" delay={350}/>
            <AnalyzingRow label="Hábitos alimenticios" delay={700}/>
            <AnalyzingRow label="Nivel fitness detectado" delay={1050}/>
          </div>
        )}

        {stage===1 && (
          <div className="stack gap-14 anim-up">
            <CoachBubble>{coachMsg}</CoachBubble>
            <div className="stack gap-8">
              {[
                { label:'Nivel nutricional', value: analysis.level, color: analysis.level==='Alto'?'var(--accent)':analysis.level==='Bajo'?'var(--warn)':'var(--fg)' },
                { label:'Experiencia fitness', value: levelLabel, color:'var(--fg)' },
                { label:'Áreas a mejorar', value: analysis.gaps.length ? analysis.gaps.join(' · ') : 'Sin carencias evidentes', color: analysis.gaps.length?'var(--warn)':'var(--accent)' },
                { label:'Enfoque del plan', value: goalLabel, color:'var(--accent)' },
              ].map((r,i) => (
                <div key={i} className="card card-sm" style={{padding:'13px 16px'}}>
                  <div className="eyebrow" style={{marginBottom:6}}>{r.label}</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:15,fontWeight:600,color:r.color}}>{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {stage===1 && (
        <div className="anim-up-2" style={{marginTop:24}}>
          <button className="btn btn-primary btn-block" onClick={() => setStage(2)}>
            Generar mi plan
            <Icon name="spark" size={17} color="#041412"/>
          </button>
        </div>
      )}
    </div>
  )
}
