import React from 'react'
import { useGame } from '../state/store'

export default function Calendar(){
  const { day, week, nextDay } = useGame()
  const days = [1,2,3,4,5,6,7]
  return (
    <div className="card">
      <h2>Calendar — Week {week}</h2>
      <div className="calendar">
        {days.map(d => (
          <div key={d} className={`day${d===day? ' active':''}`}>
            <div className="num">{d}</div>
            <div className="label">Day</div>
          </div>
        ))}
      </div>
      <div className="btns" style={{ marginTop: 8 }}>
        <button onClick={nextDay}>Next Day</button>
      </div>
    </div>
  )
}



