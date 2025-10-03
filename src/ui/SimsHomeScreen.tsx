import React, { useState } from 'react'
import { useGame } from '../state/store'
import Sprite from '../components/Sprite'
import SpriteSheet from '../components/SpriteSheet'
import { ASSETS } from '../assets'
import { useTranslations } from '../hooks/useI18n'

interface HomeObject {
  id: string
  name: string
  x: number // percentage from left
  y: number // percentage from top
  width: number
  height: number
  characterTarget: { x: number; y: number } // Where character should stand when using this object
  actions: Array<{
    id: string
    label: string
    icon: string
    onClick: () => void
    disabled?: boolean
    tooltip?: string
  }>
  style: React.CSSProperties
}

export default function SimsHomeScreen() {
  const t = useTranslations()
  const {
    player,
    homePantry,
    eatMeal,
    drink,
    startTrainingLoop,
    startSleep,
    stopSleep,
    isTraining,
    isSleeping,
    location
  } = useGame()
  
  const [selectedObject, setSelectedObject] = useState<string | null>(null)
  const [hoveredObject, setHoveredObject] = useState<string | null>(null)
  const [characterPosition, setCharacterPosition] = useState({ x: 45, y: 20 }) // Starting position
  
  // Debug character position
  console.log(`📍 Character position: x=${characterPosition.x}, y=${characterPosition.y}`)
  const [isWalking, setIsWalking] = useState(false)
  const [walkingDirection, setWalkingDirection] = useState<'left' | 'right'>('right')
  const [clickTarget, setClickTarget] = useState<{ x: number; y: number } | null>(null)
  const [currentAnimation, setCurrentAnimation] = useState<number | null>(null)

  if (location !== 'HOME') return null

  // Function to move character to target position
  const moveCharacterTo = (targetX: number, targetY: number, callback?: () => void) => {
    // Cancel any existing animation
    if (currentAnimation) {
      cancelAnimationFrame(currentAnimation)
    }
    
    setIsWalking(true)
    setWalkingDirection(targetX > characterPosition.x ? 'right' : 'left')
    
    // Calculate movement duration based on distance
    const distance = Math.sqrt(Math.pow(targetX - characterPosition.x, 2) + Math.pow(targetY - characterPosition.y, 2))
    const duration = Math.max(500, distance * 20) // Minimum 500ms, scale with distance
    
    // Animate movement
    const startTime = Date.now()
    const startX = characterPosition.x
    const startY = characterPosition.y
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth movement
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      
      const currentX = startX + (targetX - startX) * easeProgress
      const currentY = startY + (targetY - startY) * easeProgress
      
      setCharacterPosition({ x: currentX, y: currentY })
      
      if (progress < 1) {
        const animationId = requestAnimationFrame(animate)
        setCurrentAnimation(animationId)
      } else {
        setIsWalking(false)
        setCurrentAnimation(null)
        if (callback) callback()
      }
    }
    
    const animationId = requestAnimationFrame(animate)
    setCurrentAnimation(animationId)
  }

  const homeObjects: HomeObject[] = [
    // No objects for now - clean slate
    // Will add objects one by one as we implement their sprites
  ]

  const handleObjectClick = (objectId: string) => {
    if (selectedObject === objectId) {
      setSelectedObject(null)
    } else {
      const obj = getObjectById(objectId)
      if (obj && !isWalking) {
        // Move character to the object first, then show menu
        moveCharacterTo(obj.characterTarget.x, obj.characterTarget.y, () => {
          setSelectedObject(objectId)
        })
      }
    }
  }

  const getObjectById = (id: string) => homeObjects.find(obj => obj.id === id)

  // Get the appropriate character sprite based on current state
  const getCharacterSprite = () => {
    const sprite = isSleeping ? ASSETS.character.sleep :
                   isTraining ? ASSETS.character.train :
                   isWalking ? ASSETS.character.walk :
                   ASSETS.character.idle
    console.log(`🎬 Character state: walking=${isWalking}, training=${isTraining}, sleeping=${isSleeping}, sprite=${sprite}`)
    return sprite
  }

  // Get the appropriate animation class based on current state
  const getAnimationClass = () => {
    const animClass = isSleeping ? 'sleeping' :
                      isTraining ? 'training' :
                      isWalking ? 'walking' :
                      'idle'
    console.log(`🎭 Animation class: ${animClass}`)
    return animClass
  }

  // Handle clicking anywhere on the floor to move character
  const handleFloorClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedObject) return // Don't move if object is selected (but allow movement while walking)
    
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Convert pixel coordinates to percentages
    const targetX = (x / rect.width) * 100
    const targetY = (y / rect.height) * 100
    
    // Define floor boundaries (character should stay within these limits)
    const floorBoundaries = {
      left: 10,    // 10% from left edge (expanded left for more room)
      right: 90,   // 90% from left edge (expanded right for more room)
      top: 25,     // 25% from top edge (expanded upward to reach door)
      bottom: 80   // 80% from top edge (20% from bottom edge, above door)
    }
    
    // Constrain target position to floor boundaries
    const constrainedX = Math.max(floorBoundaries.left, Math.min(floorBoundaries.right, targetX))
    const constrainedY = Math.max(floorBoundaries.top, Math.min(floorBoundaries.bottom, targetY))
    
    // Show click indicator at constrained position
    setClickTarget({ x: constrainedX, y: constrainedY })
    setTimeout(() => setClickTarget(null), 300) // Hide after 300ms
    
    // Move character to constrained location (will cancel any existing movement)
    moveCharacterTo(constrainedX, constrainedY)
  }

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '500px', 
        backgroundImage: `url(${ASSETS.backgrounds.homeInterior})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Fallback gradient if image doesn't exist
        background: `url(${ASSETS.backgrounds.homeInterior}) center/cover no-repeat, linear-gradient(180deg, #87CEEB 0%, #90EE90 50%, #228B22 100%)`,
        borderRadius: '16px', 
        overflow: 'hidden', 
        border: '2px solid var(--border-color)',
        imageRendering: 'pixelated',
        cursor: 'crosshair'
      }}
      onClick={handleFloorClick}
    >
      {/* House structure - hidden when using generated images */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '35%',
        width: '55%',
        height: '60%',
        background: 'linear-gradient(45deg, #8B4513 0%, #A0522D 100%)',
        borderRadius: '8px 8px 0 0',
        border: '3px solid #654321',
        display: 'none' // Hide CSS decorations when using generated background
      }}>
        {/* Roof */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          left: '-5%',
          width: '110%',
          height: '20%',
          background: 'linear-gradient(45deg, #A0522D 0%, #CD853F 100%)',
          clipPath: 'polygon(10% 100%, 50% 0%, 90% 100%)',
          border: '2px solid #8B4513'
        }} />
        
        {/* Windows */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '15%',
          height: '25%',
          background: '#87CEEB',
          border: '2px solid #4682B4',
          borderRadius: '4px'
        }} />
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '15%',
          height: '25%',
          background: '#87CEEB',
          border: '2px solid #4682B4',
          borderRadius: '4px'
        }} />
        
        {/* Door */}
        <div style={{
          position: 'absolute',
          bottom: '0%',
          left: '40%',
          width: '20%',
          height: '40%',
          background: '#654321',
          border: '2px solid #4A4A4A',
          borderRadius: '4px 4px 0 0'
        }} />
      </div>

      {/* Character sprite - Always visible with proper state-based animation */}
      <SpriteSheet
        src={isWalking ? ASSETS.character.walk : ASSETS.character.idle}
        width={32}
        height={64}
        frameWidth={32}
        frameHeight={64}
        frameCount={1}
        fps={isWalking ? 8 : 4}
        isPlaying={true}
        className={`character-sprite ${getAnimationClass()}`}
        style={{
          position: 'absolute',
          bottom: `${100 - characterPosition.y - 12}%`,
          left: `${characterPosition.x - 3}%`,
          zIndex: 10,
          transform: walkingDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
          transition: isWalking ? 'none' : 'transform 0.3s ease',
          imageRendering: 'pixelated',
          opacity: 1,
          visibility: 'visible',
          display: 'block'
        }}
        onLoad={() => console.log('✅ Character sprite loaded successfully')}
        onError={() => console.error('❌ Character sprite failed to load')}
      />

      {/* Floor boundaries indicator (optional - can be removed later) */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '10%',
          width: '80%',
          height: '55%',
          border: '2px dashed rgba(74, 158, 255, 0.3)',
          borderRadius: '8px',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.5
        }}
        title="Character movement area - expanded in all directions"
      />

      {/* Click indicator */}
      {clickTarget && (
        <div
          style={{
            position: 'absolute',
            left: `${clickTarget.x - 2}%`,
            top: `${clickTarget.y - 2}%`,
            width: '4%',
            height: '4%',
            background: 'radial-gradient(circle, rgba(255,255,0,0.8) 0%, rgba(255,255,0,0.4) 40%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 15,
            animation: 'clickPulse 0.3s ease-out forwards'
          }}
        />
      )}

      {/* Interactive Objects - Will be added one by one as we implement sprites */}
      {/* No objects for now - clean slate */}

      {/* Action Menu - Will be added when we have objects */}
      {/* No action menu for now - clean slate */}

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        maxWidth: '200px'
      }}>
        <strong>🏠 Home</strong><br />
        Click anywhere to move • Objects will be added soon
      </div>
    </div>
  )
}
