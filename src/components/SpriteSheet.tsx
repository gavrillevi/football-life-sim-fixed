import React, { useRef, useEffect, useState } from 'react'

interface SpriteSheetProps {
  src: string
  width: number
  height: number
  frameWidth: number
  frameHeight: number
  frameCount: number
  fps?: number
  isPlaying?: boolean
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
}

const SpriteSheet: React.FC<SpriteSheetProps> = ({
  src,
  width,
  height,
  frameWidth,
  frameHeight,
  frameCount,
  fps = 8,
  isPlaying = true,
  className = '',
  style,
  onLoad,
  onError
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const animationRef = useRef<number>()
  const frameRef = useRef(0)
  const lastTimeRef = useRef(0)
  const imageRef = useRef<HTMLImageElement>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Disable image smoothing for pixel-perfect rendering
    ctx.imageSmoothingEnabled = false

    // Set canvas size
    canvas.width = frameWidth
    canvas.height = frameHeight

    // Load image
    const img = new Image()
    img.onload = () => {
      console.log(`🎬 SpriteSheet loaded: ${src}`)
      console.log(`📏 Image dimensions: ${img.width}×${img.height}`)
      console.log(`🎯 Expected frame size: ${frameWidth}×${frameHeight}`)
      console.log(`📊 Frame count: ${frameCount}`)
      imageRef.current = img
      setIsLoaded(true)
      setHasError(false)
      onLoad?.()
    }
    img.onerror = () => {
      console.error(`❌ SpriteSheet failed to load: ${src}`)
      setHasError(true)
      setIsLoaded(false)
      onError?.()
    }
    img.src = src

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [src, frameWidth, frameHeight, onLoad, onError])

  useEffect(() => {
    if (!isLoaded || !isPlaying) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: true })
    const img = imageRef.current
    if (!canvas || !ctx || !img) return

    // CRITICAL: Disable image smoothing for pixel-perfect rendering
    ctx.imageSmoothingEnabled = false

    const animate = (currentTime: number) => {
      if (!isPlaying) return

      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      // Calculate frame based on FPS with proper timing
      const frameTime = 1000 / fps
      if (deltaTime >= frameTime) {
        frameRef.current = (frameRef.current + 1) % frameCount
        // Debug log every 10 frames to avoid spam
        if (frameRef.current % 10 === 0) {
          console.log(`🎬 Frame: ${frameRef.current}, FPS: ${fps}, Playing: ${isPlaying}`)
        }
      }

      // Clear canvas completely
      ctx.clearRect(0, 0, frameWidth, frameHeight)

      // Draw current frame with integer math for pixel-perfect slicing
      const sourceX = Math.floor(frameRef.current * frameWidth)
      ctx.drawImage(
        img,
        sourceX, 0, frameWidth, frameHeight, // Source rectangle (integer coordinates)
        0, 0, frameWidth, frameHeight        // Destination rectangle
      )

      // Always continue animation loop when isPlaying is true
      animationRef.current = requestAnimationFrame(animate)
    }

    lastTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isLoaded, isPlaying, fps, frameCount, frameWidth, frameHeight])

  if (hasError) {
    return (
      <div
        className={`sprite-fallback ${className}`}
        style={{ width, height, ...style }}
        title={`Error loading sprite sheet`}
      >
        ❌
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={`sprite-sheet ${className}`}
      style={{
        width,
        height,
        // CRITICAL: Pixel-perfect rendering
        imageRendering: 'pixelated',
        opacity: isLoaded ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
        ...style
      }}
    />
  )
}

export default SpriteSheet
