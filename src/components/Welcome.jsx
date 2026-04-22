import { Icon } from './Icons.jsx'

const BASE = import.meta.env.BASE_URL

export default function Welcome({ onStart }) {
  return (
    <div className="screen stack sp spt spb anim-in" style={{ justifyContent:'space-between', paddingTop:60, paddingBottom:44 }}>
      <div className="stack items-center gap-28 flex-1" style={{ justifyContent:'center' }}>
        {/* Logo */}
        <div style={{ position:'relative', width:200, height:200 }}>
          <div style={{
            position:'absolute', inset:0, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(62,235,212,0.15), transparent 70%)',
            filter:'blur(12px)',
          }}/>
          <img
            src={`${BASE}assets/logo.png`}
            alt="TU FITNESS"
            style={{ position:'relative', width:'100%', height:'100%', objectFit:'contain', filter:'drop-shadow(0 0 28px rgba(62,235,212,0.4))' }}
            onError={e => { e.target.style.display='none' }}
          />
          <div className="pulse-ring" style={{ inset:30 }}/>
        </div>

        {/* Copy */}
        <div className="stack items-center gap-12 text-center anim-up-1">
          <div className="eyebrow accent" style={{ letterSpacing:'0.3em' }}>TU FITNESS</div>
          <h1 style={{ maxWidth:290, textWrap:'balance' }}>
            Tu coach digital. <span className="glow">Personal de verdad.</span>
          </h1>
          <p className="muted" style={{ maxWidth:280, fontSize:14, lineHeight:1.65, textWrap:'pretty' }}>
            No un formulario más. Te analizo, te entiendo y te acompaño desde el primer día con IA.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="stack gap-10 anim-up-2">
        <button className="btn btn-primary btn-block" onClick={onStart} style={{ fontSize:16, padding:'17px 24px' }}>
          Empezar mi plan
          <Icon name="arrow-r" size={18} color="#041412"/>
        </button>
        <p className="dim text-center" style={{ fontSize:11, letterSpacing:'0.05em' }}>
          Menos de 2 min · 6 preguntas · Gratis
        </p>
      </div>
    </div>
  )
}
