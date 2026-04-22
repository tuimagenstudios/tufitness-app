import { useState, useMemo } from 'react'
import Welcome from './components/Welcome.jsx'
import Onboarding from './components/Onboarding.jsx'
import Interpretation from './components/Interpretation.jsx'
import Dashboard, { generatePlan, DEFAULT_PROGRESS } from './components/Dashboard.jsx'
import Diet from './components/Diet.jsx'
import Routine from './components/Routine.jsx'
import Progress from './components/Progress.jsx'
import Rewards from './components/Rewards.jsx'
import TabBar from './components/TabBar.jsx'

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}

export default function App() {
  const [phase, setPhase]       = useState(() => load('tuf_phase', 'welcome'))
  const [userData, setUserData] = useState(() => load('tuf_user', null))
  const [tab, setTab]           = useState(() => load('tuf_tab', 'home'))
  const [progress, setProgress] = useState(() => load('tuf_progress', DEFAULT_PROGRESS))

  const save = (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
  }

  const setPhaseS   = v => { setPhase(v);    save('tuf_phase', v) }
  const setTabS     = v => { setTab(v);      save('tuf_tab', v) }
  const setUserS    = v => { setUserData(v); save('tuf_user', v) }
  const setProgressS = v => {
    setProgress(prev => {
      const next = typeof v === 'function' ? v(prev) : v
      save('tuf_progress', next)
      return next
    })
  }

  const reset = () => {
    localStorage.clear()
    setPhase('welcome'); setUserData(null)
    setTab('home'); setProgress(DEFAULT_PROGRESS)
  }

  const plan = useMemo(() => userData ? generatePlan(userData) : null, [userData])

  // ── Render phase ──
  if (phase === 'welcome') {
    return (
      <Shell>
        <Welcome onStart={() => setPhaseS('onboarding')}/>
      </Shell>
    )
  }

  if (phase === 'onboarding') {
    return (
      <Shell>
        <Onboarding onFinish={d => { setUserS(d); setPhaseS('interpret') }}/>
      </Shell>
    )
  }

  if (phase === 'interpret') {
    return (
      <Shell>
        <Interpretation data={userData} onContinue={() => setPhaseS('app')}/>
      </Shell>
    )
  }

  if (phase === 'app' && userData && plan) {
    return (
      <Shell>
        {tab === 'home'     && <Dashboard data={userData} plan={plan} progress={progress} onNav={setTabS}/>}
        {tab === 'diet'     && <Diet      data={userData} plan={plan}/>}
        {tab === 'routine'  && <Routine   data={userData}/>}
        {tab === 'progress' && <Progress  data={userData} progress={progress} setProgress={setProgressS}/>}
        {tab === 'rewards'  && <Rewards   progress={progress}/>}
        <TabBar active={tab} onChange={setTabS}/>
      </Shell>
    )
  }

  // Fallback (estado corrupto)
  return (
    <Shell>
      <Welcome onStart={() => { reset(); setPhaseS('onboarding') }}/>
    </Shell>
  )
}

function Shell({ children }) {
  return (
    <div className="shell">
      <div className="phone">{children}</div>
    </div>
  )
}
