
import React from "react"
import { useGame } from "../state/store"
import SaveModal from "./SaveModal"
import { useTranslations } from "../hooks/useI18n"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Header() {
  const state = useGame()
  const t = useTranslations()
  const [showSaves, setShowSaves] = React.useState(false)
  const hh = String(Math.floor((state.timeMinutes||0)/60)).padStart(2,'0')
  const mm = String((state.timeMinutes||0)%60).padStart(2,'0')
  const save = () => {
    const { player, week, day, money } = state
    localStorage.setItem("save1", JSON.stringify({ player, week, day, money }))
    alert("Saved!")
  }
  const load = () => {
    const raw = localStorage.getItem("save1")
    if (!raw) return alert("No save found.")
    const s = JSON.parse(raw)
    useGame.setState({ ...useGame.getState(), ...s })
    alert("Loaded!")
  }
  const reset = () => { localStorage.removeItem("save1"); location.reload() }
  const travel = (loc:'HOME'|'GYM'|'SCHOOL'|'STADIUM'|'SHOP')=> useGame.getState().travelTo(loc)
  const getLocationIcon = (loc: string) => {
    switch(loc) {
      case 'HOME': return '🏠'
      case 'GYM': return '🏋️'
      case 'SCHOOL': return '🏫'
      case 'STADIUM': return '🏟️'
      case 'SHOP': return '🛒'
      default: return '📍'
    }
  }

  return (
    <div id="app-container" className="card" style={{position:"relative", display:"flex", gap:12, alignItems:"center", justifyContent:"space-between", background:"linear-gradient(135deg, var(--card-bg) 0%, var(--secondary-bg) 100%)"}}>
      <LanguageSwitcher />
      <div style={{display:"flex", alignItems:"center", gap:12}}>
        <div style={{fontSize:20}}>⚽</div>
        <div>
          <div style={{fontWeight:700, fontSize:16}}>{t('title')}</div>
          <div style={{fontSize:12, color:"var(--text-secondary)"}}>
            🕐 {hh}:{mm} · {getLocationIcon(state.location)} {t(state.location.toLowerCase() as any)}
          </div>
        </div>
      </div>
      <div className="btns">
        {state.location!=='HOME' && <button className="secondary" onClick={()=>travel('HOME')}>🏠 {t('home')}</button>}
        {state.location!=='GYM' && <button className="secondary" onClick={()=>travel('GYM')}>🏋️ {t('gym')}</button>}
        {state.location!=='SCHOOL' && <button className="secondary" onClick={()=>travel('SCHOOL')}>🏫 {t('school')}</button>}
        {state.location!=='STADIUM' && <button className="secondary" onClick={()=>travel('STADIUM')}>🏟️ {t('stadium')}</button>}
        {state.location!=='SHOP' && <button className="secondary" onClick={()=>travel('SHOP')}>🛒 {t('shop')}</button>}
        <button className="secondary" onClick={()=>setShowSaves(true)}>💾 {t('save')}</button>
        <button className="secondary" onClick={save}>💾 {t('save')}</button>
        <button className="secondary" onClick={load}>📁 {t('load')}</button>
        <button className="secondary" onClick={reset}>🔄 Reset</button>
      </div>
      {showSaves && <SaveModal onClose={()=>setShowSaves(false)} />}
    </div>
  )
}
