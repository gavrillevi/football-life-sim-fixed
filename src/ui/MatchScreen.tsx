
import React from 'react'
import abilities from '../data/abilities.json'
import { useGame } from '../state/store'

export default function MatchScreen(){
  const { highlight, choose, player } = useGame()
  const hl = highlight.pending
  return (
    <div>
      <div className="card"><strong>Time:</strong> {Math.min(highlight.minute,90)}' &nbsp; <strong>Score:</strong> {highlight.score[0]} - {highlight.score[1]}</div>
      {hl ? (
        <div className="card">
          <div style={{marginBottom:8}}>{hl.narrative}</div>
          <div className="btns">
            {hl.decisions.map(d => {
              const ab = (abilities as any[]).find(a=>a.id===d.ability)!
              // Ability gating by coach trust
              const requiredTrust: Record<string, number> = { long_shot: 30 }
              const need = requiredTrust[ab.id] ?? 0
              const blocked = player.hidden.coachTrust < need
              const title = blocked && need > 0 ? "Coach won't let you take these yet." : undefined
              return <button key={d.id} onClick={()=>!blocked && choose(d.id)} disabled={blocked} title={title}>{d.label}</button>
            })}
          </div>
        </div>
      ) : (
        <div className="card">
          <h3>Full Time</h3>
          <p>Thanks for playing the demo. Go back to Hub to train more.</p>
        </div>
      )}
      <div className="card">
        <h3>Commentary</h3>
        <ul>
          {highlight.log.map((l,i)=>(<li key={i}>{l}</li>))}
        </ul>
      </div>
    </div>
  )
}
