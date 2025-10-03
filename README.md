# Football Life Sim - Character Animation System

A React-based football life simulation game with sprite animation system.

## 🎮 Features

- **Character Animation System**: Sprite-based character with walking, idle, training, and sleeping animations
- **Interactive Home Environment**: Click-to-move character around the house
- **State Management**: Zustand-based game state with character positioning
- **Multi-language Support**: English and Russian localization
- **Pixel-Perfect Rendering**: Crisp sprite animations with proper scaling

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:5173
   ```

## 🎯 Character Animation System

The game features a sophisticated sprite animation system:

- **SpriteSheet Component**: Handles frame-based animations with pixel-perfect rendering
- **State-Based Animations**: Different animations for idle, walking, training, sleeping
- **CSS Integration**: Smooth transitions and visual effects
- **Direction Flipping**: Character faces left/right based on movement

## 🛠️ Technical Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Zustand** for state management
- **Canvas API** for sprite rendering
- **CSS Animations** for visual effects

## 📁 Project Structure

```
src/
├── components/
│   └── SpriteSheet.tsx      # Sprite animation component
├── ui/
│   └── SimsHomeScreen.tsx   # Main game screen
├── state/
│   └── store.ts             # Game state management
├── assets/
│   └── index.ts             # Asset paths
└── styles.css               # Game styles and animations
```

## 🎨 Assets

- **Character Sprites**: 32x64 pixel sprites with multiple animation states
- **Backgrounds**: Home interior backgrounds
- **Animations**: CSS-based breathing, walking, and activity effects

## 🔧 Development

- **Hot Reload**: Vite provides instant updates during development
- **TypeScript**: Full type safety and IntelliSense support
- **Debug Logging**: Console logs for animation and state debugging

## 📝 Recent Updates

- ✅ Fixed character visibility issues
- ✅ Implemented proper sprite animation system
- ✅ Added state-based animation switching
- ✅ Improved pixel-perfect rendering
- ✅ Enhanced CSS animation effects

## 🐛 Known Issues

- `anime-walk.png` has incorrect dimensions (1536x1024 instead of 128x64)
- Currently using `anime-clean.png` as fallback for all animations
- CSS animations provide visual feedback until proper sprite sheets are available

## 🚀 Next Steps

1. Create proper 4-frame sprite sheets (128x64) for walking animation
2. Add more character states (eating, watching TV, etc.)
3. Implement object interactions
4. Add sound effects
5. Create more detailed home environments

## 📄 License

This project is for educational and development purposes.