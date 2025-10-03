
import React from 'react'
import { useGame } from '../state/store'
import Calendar from './Calendar'
import LocationScene from './LocationScene'
import StatsDisplay from './StatsDisplay'
import SimsHomeScreen from './SimsHomeScreen'
import { useTranslations } from '../hooks/useI18n'

// Helper to ensure location type compatibility
const isHomeLocation = (loc: string): loc is 'HOME' => loc === 'HOME'

export default function HubScreen(){
  const t = useTranslations()
  const { player, money, nextEvent, trainingIntensity, setTrainingIntensity, physio, previewTraining, isTraining, trainingProgress, lastTrainingSummary, eatMeal, drink, startTrainingLoop, stopTrainingLoop, isSleeping, startSleep, stopSleep, location, buyMeal, buyDrink, buyBoots, homePantry, lastTrainingTick, timeline } = useGame()
  return (
    <div className={`location-${location.toLowerCase()}`}>
      {/* Sims-style Home Screen */}
      {location === 'HOME' ? (
        <SimsHomeScreen />
      ) : (
        /* Location Scene with Character for other locations */
        <LocationScene />
      )}
      
      {/* Enhanced Stats Display */}
      <StatsDisplay />

      {/* Location-based Training (not shown at home - using Sims interface) */}
      {(location === 'GYM' || location === 'SCHOOL' || location === 'STADIUM') && (
        <div className="card">
          <h2>{t('training')} - {
            location === 'GYM' ? t('gymTraining') :
            location === 'SCHOOL' ? t('schoolTraining') :
            t('stadiumTraining')
          }</h2>
          <div className="btns" style={{marginBottom:8}}>
            <button className={trainingIntensity==='light'?'active':''} onClick={()=>setTrainingIntensity('light')}>{t('light')}</button>
            <button className={trainingIntensity==='normal'?'active':''} onClick={()=>setTrainingIntensity('normal')}>{t('normal')}</button>
            <button className={trainingIntensity==='intense'?'active':''} onClick={()=>setTrainingIntensity('intense')} title={player.hidden.coachTrust<40? 'Requires Coach Trust 40':''}>{t('intense')}</button>
          </div>
          {isTraining && (
            <div className="bar" style={{marginBottom:8}}>
              <div className="fill" style={{width: `${trainingProgress}%`}}></div>
            </div>
          )}
          
          {/* Home Training Options */}
          {isHomeLocation(location) && (
            <div className="btns">
              {(['jogging', 'juggling', 'pushups', 'footage', 'friends'] as const).map(k => {
                const energyBlocked = (player as any).hunger <= 0 || player.energy <= 0
                const labelMap = { 
                  jogging: 'Jogging (+Pace)', 
                  juggling: 'Juggling (+Technique)', 
                  pushups: 'Push-ups (+Strength)', 
                  footage: 'Watch Footage (+Vision)', 
                  friends: 'Play with Friends (+Chemistry, +Fun)' 
                }
                return (
                  <button 
                    key={k} 
                    onClick={() => !energyBlocked && !isTraining && startTrainingLoop(k)} 
                    disabled={energyBlocked || isTraining || isSleeping}
                    title={energyBlocked ? 'Need hunger and energy to train' : 'Continuous training (consumes time until stopped)'}
                  >
                    {labelMap[k]}
                  </button>
                )
              })}
            </div>
          )}
          
          {/* Gym Training Options */}
          {location === 'GYM' && (
            <div className="btns">
              {(['weights', 'conditioning'] as const).map(k => {
                const energyBlocked = (player as any).hunger <= 0 || player.energy <= 0
                const labelMap = { 
                  weights: 'Weight Training (+Strength)', 
                  conditioning: 'Conditioning (+Pace)'
                }
                return (
                  <button 
                    key={k} 
                    onClick={() => !energyBlocked && !isTraining && startTrainingLoop(k)} 
                    disabled={energyBlocked || isTraining || isSleeping}
                    title={energyBlocked ? 'Need hunger and energy to train' : 'Continuous training (consumes time until stopped)'}
                  >
                    {labelMap[k]}
                  </button>
                )
              })}
            </div>
          )}
          
          {/* School Training Options */}
          {location === 'SCHOOL' && (
            <div className="btns">
              {(['shooting', 'tactics', 'coaching', 'position'] as const).map(k => {
                const energyBlocked = (player as any).hunger <= 0 || player.energy <= 0
                const labelMap = { 
                  shooting: 'Shooting Practice (+Shooting)', 
                  tactics: 'Team Tactics (+Vision)', 
                  coaching: 'Specialized Coaching (+Technique)', 
                  position: 'Position Training (+Positioning)'
                }
                return (
                  <button 
                    key={k} 
                    onClick={() => !energyBlocked && !isTraining && startTrainingLoop(k)} 
                    disabled={energyBlocked || isTraining || isSleeping}
                    title={energyBlocked ? 'Need hunger and energy to train' : 'Continuous training (consumes time until stopped)'}
                  >
                    {labelMap[k]}
                  </button>
                )
              })}
            </div>
          )}
          
          {/* Stadium Training Options */}
          {location === 'STADIUM' && (
            <div className="btns">
              {(['scrimmage', 'chemistry'] as const).map(k => {
                const energyBlocked = (player as any).hunger <= 0 || player.energy <= 0
                const labelMap = { 
                  scrimmage: 'Match Simulation (+All Skills)', 
                  chemistry: 'Team Chemistry (+Chemistry)' 
                }
                return (
                  <button 
                    key={k} 
                    onClick={() => !energyBlocked && !isTraining && startTrainingLoop(k)} 
                    disabled={energyBlocked || isTraining || isSleeping}
                    title={energyBlocked ? 'Need hunger and energy to train' : 'Continuous training (consumes time until stopped)'}
                  >
                    {labelMap[k]}
                  </button>
                )
              })}
            </div>
          )}
          
          {isTraining && (
            <div className="btns" style={{marginTop:8}}>
              <button className="secondary" onClick={stopTrainingLoop}>Stop Training</button>
            </div>
          )}
          {isTraining && lastTrainingTick && (
            <div className="training-tick">
              <strong style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
                <span>⚡</span> Training Progress
              </strong>
              <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
                {lastTrainingTick.losses.length > 0 && (
                  <div className="loss-text">📉 {lastTrainingTick.losses.join(', ')}</div>
                )}
                {lastTrainingTick.gains.length > 0 && (
                  <div className="gain-text">📈 {lastTrainingTick.gains.join(', ')}</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card btns">
        {/* Global, always possible */}
        <button className="secondary" onClick={nextEvent}>📖 Story Event</button>
        
        {/* Physio available at Gym */}
        {location==='GYM' && (
          <button className="secondary" onClick={physio} title="- $50, Fatigue -20, Remove Knock" disabled={isTraining}>🏥 Physio</button>
        )}
        
        {/* Shop-only items */}
        {location==='SHOP' && (
          <>
            {(money >= 15) && <button className="secondary" onClick={buyMeal} title="Buy meal to store at home">🍽️ Buy Meal {homePantry.meals>0? `(Home x${homePantry.meals})`:''}</button>}
            {(money >= 8) && <button className="secondary" onClick={buyDrink} title="Buy drink to store at home">🥤 Buy Drink {homePantry.drinks>0? `(Home x${homePantry.drinks})`:''}</button>}
            {(money >= 100) && <button className="secondary" onClick={buyBoots} title="- $100, +1 Pace, +1 Technique (Shop)">👟 Buy Boots</button>}
          </>
        )}
        
        {/* Home activities now handled by Sims interface */}
        {location === 'HOME' && (
          <div style={{textAlign: 'center', padding: '12px', background: 'rgba(74, 158, 255, 0.1)', borderRadius: '8px', margin: '8px 0'}}>
            <strong>🏠 Click on objects in your home to interact with them!</strong>
            <br />
            <small style={{color: 'var(--text-secondary)'}}>
              Bed for sleeping, kitchen for eating, TV for watching footage, etc.
            </small>
          </div>
        )}
      </div>

      {lastTrainingSummary && (
        <div className="card" style={{background:'#10233f'}}>
          <strong>Training Complete:</strong> {lastTrainingSummary.id} ({lastTrainingSummary.intensity})
          <div style={{fontSize:12, color:'#98a2b3'}}>
            {(() => { const d = lastTrainingSummary.deltas; return [
              `Hunger -${d.energyCost}`,
              `Energy -${d.fatigueAdd}`,
              d.deltas?.core?.pace? `Pace +${d.deltas.core.pace}`:null,
              d.deltas?.core?.strength? `Strength +${d.deltas.core.strength}`:null,
              d.deltas?.core?.technique? `Technique +${d.deltas.core.technique}`:null,
              d.deltas?.core?.vision? `Vision +${d.deltas.core.vision}`:null,
              d.deltas?.sec?.shooting? `Shooting +${d.deltas.sec.shooting}`:null,
              d.deltas?.sec?.positioning? `Positioning +${d.deltas.sec.positioning}`:null,
              d.deltas?.sec?.passing? `Passing +${d.deltas.sec.passing}`:null,
              d.deltas?.hidden?.chemistry? `Chemistry +${d.deltas.hidden.chemistry}`:null,
              d.deltas?.hidden?.confidence? `Confidence +${d.deltas.hidden.confidence}`:null,
              d.deltas?.hidden?.injuryRisk? `InjuryRisk +${d.deltas.hidden.injuryRisk}`:null,
              (lastTrainingSummary.trustDelta && lastTrainingSummary.trustDelta>0)? `Coach Trust +${lastTrainingSummary.trustDelta}`:null,
            ].filter(Boolean).join(', ') || 'No visible gains' })()}
          </div>
        </div>
      )}

      {/* Development Timeline */}
      {timeline.length > 0 && (
        <div className="card" style={{marginTop:16}}>
          <h3 style={{display:'flex', alignItems:'center', gap:8, marginBottom:16}}>
            <span>📊</span> Activity Timeline
          </h3>
          <div style={{maxHeight:200, overflowY:'auto', fontSize:12}}>
            {timeline.slice(-10).reverse().map((event, i) => (
              <div key={i} className="timeline-event">
                <div style={{fontWeight:'bold', marginBottom:4}}>
                  🕐 {event.timestamp} - {event.message}
                </div>
                <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                  {event.effects.map((effect, j) => (
                    <span key={j} style={{
                      padding:'2px 6px',
                      borderRadius:4,
                      fontSize:10,
                      fontWeight:600,
                      background: effect.includes('-') ? '#ffe6e6' : '#e6ffe6',
                      color: effect.includes('-') ? '#dc3545' : '#28a745',
                    }}>
                      {effect.includes('-') ? '📉' : '📈'} {effect}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
