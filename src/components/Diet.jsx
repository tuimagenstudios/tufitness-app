import { useState } from 'react'
import { Icon } from './Icons.jsx'
import { CoachBubble } from './Primitives.jsx'

const MEALS = {
  muscle: [
    { time:'07:30', name:'Desayuno',     kcal:520, items:['Avena 80g + leche','3 huevos revueltos','Banana + canela'],           tag:'Alta proteína' },
    { time:'11:00', name:'Media mañana', kcal:280, items:['Yogur griego 200g','Nueces 20g','Miel 1 cdta'],                        tag:'Snack' },
    { time:'14:00', name:'Almuerzo',     kcal:680, items:['Pollo 180g','Arroz integral 120g','Ensalada con aceite de oliva'],     tag:'Principal' },
    { time:'17:30', name:'Pre-entreno',  kcal:260, items:['Tostada integral','Palta ½','Café negro'],                             tag:'Energía' },
    { time:'21:00', name:'Cena',         kcal:620, items:['Salmón 180g','Quinoa 100g','Verduras al horno'],                       tag:'Recovery' },
  ],
  fat: [
    { time:'08:00', name:'Desayuno',     kcal:360, items:['Yogur 200g + frutos rojos','2 huevos duros','Té verde'],               tag:'Bajo carbo' },
    { time:'11:30', name:'Media mañana', kcal:170, items:['Manzana','Almendras 15g'],                                             tag:'Snack' },
    { time:'14:00', name:'Almuerzo',     kcal:520, items:['Pechuga 150g','Batata 100g','Ensalada verde abundante'],               tag:'Principal' },
    { time:'17:30', name:'Merienda',     kcal:190, items:['Pepino + hummus 40g','Café'],                                          tag:'Ligera' },
    { time:'20:30', name:'Cena',         kcal:430, items:['Pescado blanco 180g','Verduras grilladas','Palta ¼'],                  tag:'Proteína limpia' },
  ],
  recomp: [
    { time:'08:00', name:'Desayuno',     kcal:440, items:['2 tostadas integrales','2 huevos + palta','Café con leche'],           tag:'Balanceado' },
    { time:'11:00', name:'Media mañana', kcal:210, items:['Yogur griego','Semillas de chía'],                                     tag:'Snack' },
    { time:'14:00', name:'Almuerzo',     kcal:590, items:['Carne magra 160g','Arroz 100g','Ensalada mixta'],                      tag:'Principal' },
    { time:'17:30', name:'Merienda',     kcal:230, items:['Queso cottage 100g','Frutos rojos'],                                   tag:'Proteína' },
    { time:'20:30', name:'Cena',         kcal:530, items:['Pollo/tofu 150g','Lentejas 100g','Vegetales salteados'],               tag:'Recovery' },
  ],
}

function MealCard({ meal, index }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className="card card-sm" style={{padding:'13px 16px'}}>
      <button onClick={()=>setOpen(!open)} style={{all:'unset',cursor:'pointer',width:'100%',display:'flex',alignItems:'center',gap:12}}>
        <span className="mono" style={{fontSize:11,color:'var(--accent)',letterSpacing:'0.04em',width:44}}>{meal.time}</span>
        <div className="flex-1">
          <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:14.5}}>{meal.name}</div>
          <div className="row items-center gap-6" style={{marginTop:2}}>
            <span className="mono" style={{fontSize:10.5,color:'var(--fg-dim)'}}>{meal.kcal} kcal</span>
            <span style={{color:'var(--border-2)'}}>·</span>
            <span style={{fontSize:10.5,color:'var(--fg-muted)'}}>{meal.tag}</span>
          </div>
        </div>
        <div style={{transition:'transform 0.2s',transform:open?'rotate(90deg)':'none'}}>
          <Icon name="arrow-r" size={13} color="var(--fg-dim)"/>
        </div>
      </button>
      {open && (
        <div className="anim-up" style={{marginTop:11,paddingTop:11,borderTop:'1px solid var(--border)'}}>
          <div className="stack gap-6">
            {meal.items.map((it,i) => (
              <div key={i} className="row items-center gap-10">
                <div style={{width:3,height:3,borderRadius:'50%',background:'var(--accent)',flexShrink:0}}/>
                <span style={{fontSize:13,color:'var(--fg-muted)'}}>{it}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Diet({ data, plan }) {
  const meals = MEALS[data.goal] || MEALS.recomp
  const { protein, carbs, fat } = plan.macros
  const maxG = Math.max(protein, carbs, fat)

  return (
    <div className="screen stack spb" style={{paddingBottom:16}}>
      <div className="topbar">
        <div className="stack gap-3">
          <span className="eyebrow">Tu plan alimenticio</span>
          <h2>Dieta</h2>
        </div>
        <span className="badge badge-accent"><Icon name="spark" size={10}/> {plan.kcal} kcal</span>
      </div>

      {/* Macros */}
      <div className="sp anim-up" style={{marginTop:6}}>
        <div className="card">
          <div className="row justify-between items-center" style={{marginBottom:14}}>
            <span className="eyebrow">Macros del día</span>
            <span className="mono dim" style={{fontSize:10}}>distribución</span>
          </div>
          <div className="stack gap-12">
            {[
              { label:'Proteína',       g:protein, kcal_v:protein*4, pct:protein/maxG, color:'var(--accent)' },
              { label:'Carbohidratos',  g:carbs,   kcal_v:carbs*4,   pct:carbs/maxG,   color:'#7dd3c8' },
              { label:'Grasas',         g:fat,     kcal_v:fat*9,     pct:fat/maxG,     color:'#4da8a0' },
            ].map((m,i) => (
              <div key={i}>
                <div className="row justify-between items-center" style={{marginBottom:6}}>
                  <span style={{fontSize:13}}>{m.label}</span>
                  <span className="mono" style={{fontSize:11}}>
                    <span style={{color:m.color}}>{m.g}g</span>
                    <span style={{color:'var(--fg-dim)'}}> · {m.kcal_v} kcal</span>
                  </span>
                </div>
                <div className="macro-bar"><div style={{width:`${m.pct*100}%`,background:m.color}}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coach */}
      <div className="sp anim-up-1" style={{marginTop:14}}>
        <CoachBubble>
          {data.goal==='muscle' && <><strong>+300 kcal sobre mantenimiento.</strong> Los {protein}g de proteína son lo crítico — si no los llegás, el músculo no crece.</>}
          {data.goal==='fat'    && <><strong>Déficit moderado, no agresivo.</strong> Proteína alta para proteger músculo mientras bajás grasa.</>}
          {data.goal==='recomp' && <><strong>Plan equilibrado</strong> cerca de tu mantenimiento — suficiente proteína para tonificar sin sumar grasa.</>}
        </CoachBubble>
      </div>

      {/* Meals */}
      <div className="sp anim-up-2" style={{marginTop:18}}>
        <div className="row items-center justify-between" style={{marginBottom:12}}>
          <span className="eyebrow">Comidas del día</span>
          <span className="mono dim" style={{fontSize:10}}>{meals.length} comidas</span>
        </div>
        <div className="stack gap-8">
          {meals.map((m,i) => <MealCard key={i} meal={m} index={i}/>)}
        </div>
      </div>

      {/* Tips */}
      <div className="sp anim-up-3" style={{marginTop:18}}>
        <span className="eyebrow" style={{display:'block',marginBottom:10}}>Tips clave</span>
        <div className="stack gap-8">
          {['Al menos 2.5L de agua al día — no es opcional.','Priorizá proteína entera (huevos, carnes, lácteos).','Timing flexible: lo importante es cumplir los totales.'].map((t,i) => (
            <div key={i} className="card card-sm row items-start gap-10">
              <div style={{width:4,height:4,borderRadius:'50%',background:'var(--accent)',marginTop:7,flexShrink:0}}/>
              <span style={{fontSize:13,color:'var(--fg-muted)',lineHeight:1.55}}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
