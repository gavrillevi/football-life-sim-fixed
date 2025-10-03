import React from 'react'
import { useGame } from '../state/store'

type Props = { onClose: ()=>void }

function formatPreview(s:any){
  try {
    if (!s) return 'Empty'
    const { week, day, money } = s
    return `Week ${week}, Day ${day} · $${money}`
  } catch {
    return 'Corrupt'
  }
}

export default function SaveModal({ onClose }: Props){
  const game = useGame()

  const readSlot = (i:number) => {
    const raw = localStorage.getItem(`save${i}`)
    if (!raw) return null
    try { return JSON.parse(raw) } catch { return null }
  }

  const saveTo = (i:number) => {
    const { player, week, day, money, highlight } = game
    localStorage.setItem(`save${i}`, JSON.stringify({ player, week, day, money, highlight }))
  }

  const loadFrom = (i:number) => {
    const raw = localStorage.getItem(`save${i}`)
    if (!raw) return
    try {
      const s = JSON.parse(raw)
      useGame.setState({ ...useGame.getState(), ...s })
      onClose()
    } catch {}
  }

  const del = (i:number) => { localStorage.removeItem(`save${i}`) }

  const slots = [1,2,3]

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <div className="card" style={{margin:0}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2 style={{margin:0}}>Saves</h2>
            <button className="secondary" onClick={onClose}>Close</button>
          </div>
          {slots.map(i=>{
            const data = readSlot(i)
            return (
              <div key={i} className="row" style={{alignItems:'center', marginTop:8}}>
                <div className="col"><strong>Slot {i}</strong><div style={{fontSize:12, color:'#98a2b3'}}>{formatPreview(data)}</div></div>
                <div className="btns">
                  <button onClick={()=>saveTo(i)}>Save</button>
                  <button className="secondary" onClick={()=>loadFrom(i)} disabled={!data}>Load</button>
                  <button className="secondary" onClick={()=>del(i)} disabled={!data}>Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}



