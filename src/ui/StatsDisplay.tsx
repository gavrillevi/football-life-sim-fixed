import React from 'react'
import { useGame } from '../state/store'

export default function StatsDisplay() {
  const { player, money } = useGame()

  const StatRow = ({ 
    icon, 
    label, 
    level, 
    points, 
    iconClass 
  }: { 
    icon: string; 
    label: string; 
    level?: number; 
    points?: number; 
    iconClass: string;
  }) => (
    <div className="stat">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={`stat-icon ${iconClass}`}>{icon}</div>
        <span>{label}</span>
      </div>
      {level !== undefined && points !== undefined ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Lv.{level}</span>
          <div className="skill-progress">
            <div className="fill" style={{ width: `${points}%` }}></div>
          </div>
          <span style={{ fontSize: 10, color: '#98a2b3' }}>{points}/100</span>
        </div>
      ) : (
        <span>{level}</span>
      )}
    </div>
  )

  const ResourceBar = ({ 
    icon, 
    label, 
    value, 
    max = 100, 
    iconClass 
  }: { 
    icon: string; 
    label: string; 
    value: number; 
    max?: number; 
    iconClass: string;
  }) => (
    <div className="resource-bar">
      <div className={`resource-icon ${iconClass}`}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
          <span style={{ fontSize: 14 }}>{value}{max === 100 ? '%' : ''}</span>
        </div>
        <div className="bar">
          <div className="fill" style={{ width: `${(value / max) * 100}%` }}></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="card">
      <h2 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>⚽</span> Player Stats
      </h2>
      
      {/* Resources */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12, color: '#98a2b3', fontSize: 14 }}>RESOURCES</h3>
        <ResourceBar icon="🍽️" label="Hunger" value={(player as any).hunger} iconClass="hunger" />
        <ResourceBar icon="⚡" label="Energy" value={player.energy} iconClass="energy" />
        <ResourceBar icon="🎉" label="Fun" value={player.hidden.fun} iconClass="fun" />
        <ResourceBar icon="💰" label="Money" value={money} max={1000} iconClass="money" />
      </div>

      <div className="row">
        <div className="col">
          <h3 style={{ marginBottom: 12, color: '#98a2b3', fontSize: 14 }}>CORE SKILLS</h3>
          <StatRow 
            icon="🏃" 
            label="Pace" 
            level={player.core.pace.level} 
            points={player.core.pace.points} 
            iconClass="pace" 
          />
          <StatRow 
            icon="💪" 
            label="Strength" 
            level={player.core.strength.level} 
            points={player.core.strength.points} 
            iconClass="strength" 
          />
          <StatRow 
            icon="⚽" 
            label="Technique" 
            level={player.core.technique.level} 
            points={player.core.technique.points} 
            iconClass="technique" 
          />
          <StatRow 
            icon="👁️" 
            label="Vision" 
            level={player.core.vision.level} 
            points={player.core.vision.points} 
            iconClass="vision" 
          />
          <StatRow 
            icon="🛡️" 
            label="Defense" 
            level={player.core.defense.level} 
            points={player.core.defense.points} 
            iconClass="defense" 
          />
        </div>
        
        <div className="col">
          <h3 style={{ marginBottom: 12, color: '#98a2b3', fontSize: 14 }}>SPECIALIZED SKILLS</h3>
          <StatRow 
            icon="🎯" 
            label="Shooting" 
            level={player.sec.shooting.level} 
            points={player.sec.shooting.points} 
            iconClass="shooting" 
          />
          <StatRow 
            icon="🎯" 
            label="Passing" 
            level={player.sec.passing.level} 
            points={player.sec.passing.points} 
            iconClass="passing" 
          />
          <StatRow 
            icon="📍" 
            label="Positioning" 
            level={player.sec.positioning.level} 
            points={player.sec.positioning.points} 
            iconClass="positioning" 
          />
          <StatRow 
            icon="🤝" 
            label="Chemistry" 
            level={player.hidden.chemistry.level} 
            points={player.hidden.chemistry.points} 
            iconClass="technique" 
          />
        </div>
        
        <div className="col">
          <h3 style={{ marginBottom: 12, color: '#98a2b3', fontSize: 14 }}>MENTAL & SOCIAL</h3>
          <StatRow icon="😊" label="Confidence" level={player.hidden.confidence} iconClass="technique" />
          <StatRow icon="🏆" label="Reputation" level={player.hidden.reputation} iconClass="technique" />
          <StatRow icon="👨‍🏫" label="Coach Trust" level={player.hidden.coachTrust} iconClass="technique" />
          <StatRow icon="😴" label="Morale" level={player.hidden.morale} iconClass="technique" />
        </div>
      </div>
    </div>
  )
}
