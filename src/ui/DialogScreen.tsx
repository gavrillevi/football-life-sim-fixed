
import React from 'react'
import { useUI } from '../state/store'
import events from '../data/events.json'
import { applyEffects } from '../game/events'
import { useGame } from '../state/store'

export default function DialogScreen(){
  const back = ()=>useUI.getState().setScreen('HUB')
  const evt:any = (events as any[])[0]
  const state = useGame()
  const pick = (c:any)=>{ applyEffects(state.player, c); alert(`Chosen: ${c.label}`); back(); }

  return (
    <div className="card">
      <h2>{evt.title}</h2>
      <p style={{whiteSpace:'pre-wrap'}}>{evt.text}</p>
      <div className="btns">
        {evt.choices.map((c:any)=>(
          <button key={c.id} onClick={()=>pick(c)}>{c.label}</button>
        ))}
        <button className="secondary" onClick={back}>Back</button>
      </div>
    </div>
  )
}
