import React from 'react'
import { useGame } from '../state/store'

export default function LocationScene() {
  const { location, isTraining, isSleeping, player } = useGame()
  
  const getCharacterState = () => {
    if (isTraining) return 'training'
    if (isSleeping) return 'sleeping'
    if ((player as any).hunger > 80) return 'eating'
    return 'idle'
  }

  const getLocationObjects = () => {
    switch (location) {
      case 'HOME':
        return (
          <div className="location-objects">
            <div className="building house"></div>
          </div>
        )
      case 'GYM':
        return (
          <div className="location-objects">
            <div className="building gym-equipment"></div>
          </div>
        )
      case 'SCHOOL':
        return (
          <div className="location-objects">
            <div className="building school-building"></div>
          </div>
        )
      case 'STADIUM':
        return (
          <div className="location-objects">
            <div className="building stadium-field"></div>
          </div>
        )
      case 'SHOP':
        return (
          <div className="location-objects">
            <div className="building shop-front"></div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`location-scene ${location.toLowerCase()}`}>
      {getLocationObjects()}
      <div className={`character-sprite ${getCharacterState()}`}>
        <div className="character-head">
          <div className="character-hair"></div>
        </div>
        <div className="character-body">
          <div className="character-arms left"></div>
          <div className="character-arms right"></div>
        </div>
        <div className="character-legs left"></div>
        <div className="character-legs right"></div>
      </div>
    </div>
  )
}
