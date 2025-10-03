// Asset paths - clean slate, only character for now
export const ASSETS = {
  // Character sprites - multiple animations
  character: {
    idle: '/assets/sprites/anime-clean.png', // Static character (32×64) - breathing animation
    walk: '/assets/sprites/anime-clean.png', // Static character (32×64) - walking animation
    sleep: '/assets/sprites/anime-clean.png', // Static character (32×64) - sleeping animation
    eat: '/assets/sprites/anime-clean.png', // Static character (32×64) - eating animation
    train: '/assets/sprites/anime-clean.png', // Static character (32×64) - training animation
    watch: '/assets/sprites/anime-clean.png' // Static character (32×64) - watching animation
  },
  
  // Object sprites (will be added one by one)
  objects: {
    // bed: '/assets/sprites/bed.png', // Will add later
    // tv: '/assets/sprites/tv.png', // Will add later
    // kitchen: '/assets/sprites/kitchen.png', // Will add later
    // footballPitch: '/assets/sprites/football-pitch.png', // Will add later
    // street: '/assets/sprites/street.png', // Will add later
    // exerciseMat: '/assets/sprites/exercise-mat.png', // Will add later
    // jugglingArea: '/assets/sprites/juggling-area.png' // Will add later
  },
  
  // Backgrounds (will be added one by one)
  backgrounds: {
    homeInterior: '/assets/backgrounds/home-interior.png' // Testing home-interior.png
  }
}

// Helper function to check if asset exists
export const checkAssetExists = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(path, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

// Preload critical assets
export const preloadAssets = async () => {
  const criticalAssets = [
    ASSETS.character.idle,
    ASSETS.character.walk,
    ASSETS.character.sleep,
    ASSETS.character.eat,
    ASSETS.character.train,
    ASSETS.character.watch,
    ASSETS.backgrounds.homeInterior
    // Will add more assets as we implement them
  ]
  
  const promises = criticalAssets.map(src => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = src
    })
  })
  
  await Promise.all(promises)
}
