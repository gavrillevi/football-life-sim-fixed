import React from 'react'

interface SpriteProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function Sprite({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  style = {}, 
  onClick,
  onMouseEnter,
  onMouseLeave 
}: SpriteProps) {
  const [imageExists, setImageExists] = React.useState(true)
  const [isLoaded, setIsLoaded] = React.useState(false)

  const handleError = () => {
    setImageExists(false)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  // Fallback to CSS graphics if image doesn't exist
  if (!imageExists) {
    return (
      <div 
        className={`sprite-fallback ${className}`}
        style={{
          width: width ? `${width}px` : 'auto',
          height: height ? `${height}px` : 'auto',
          backgroundColor: '#ddd',
          border: '2px solid #999',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: '#666',
          cursor: onClick ? 'pointer' : 'default',
          ...style
        }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        title={`Missing: ${alt}`}
      >
        {alt}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`sprite ${className} ${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        imageRendering: 'pixelated',
        cursor: onClick ? 'pointer' : 'default',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        ...style
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onError={handleError}
      onLoad={handleLoad}
    />
  )
}
