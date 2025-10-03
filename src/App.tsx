
import React from 'react'
import { useUI } from './state/store'
import HubScreen from './ui/HubScreen'
import DialogScreen from './ui/DialogScreen'
import Header from './ui/Header'
import { I18nProvider } from './hooks/useI18n'

export default function App(){
  const screen = useUI(s=>s.screen)
  return (
    <I18nProvider>
      <div className="container">
        <div className="tabs">
          <div className={`tab ${screen==='HUB'?'active':''}`} onClick={()=>useUI.getState().setScreen('HUB')}>🏠 Hub</div>
          <div className={`tab ${screen==='EVENT'?'active':''}`} onClick={()=>useUI.getState().setScreen('EVENT')}>📖 Event</div>
        </div>

        <Header />

        {screen==='HUB' && <HubScreen/>}
        {screen==='EVENT' && <DialogScreen/>}
      </div>
    </I18nProvider>
  )
}
