# 🚶‍♂️ Character Animations Guide - Multiple Activity States

## 🎯 **Character Animation System:**

### **📋 Required Character Animations:**

#### **1. Idle Animation (`character-idle.png`)**
- **Purpose**: Default state when not doing anything
- **Style**: Standing still, maybe slight breathing animation
- **Usage**: When character is stationary

#### **2. Walking Animation (`character-walk.png`)**
- **Purpose**: Moving around the house
- **Style**: Walking motion with leg movement
- **Usage**: When character is moving to clicked locations

#### **3. Running Animation (`character-run.png`)**
- **Purpose**: Fast movement (future use)
- **Style**: Running motion with faster leg movement
- **Usage**: For jogging or quick movement

#### **4. Sleeping Animation (`character-sleep.png`)**
- **Purpose**: When character is sleeping
- **Style**: Lying down or sitting in relaxed position
- **Usage**: When character is sleeping in bed

#### **5. Eating Animation (`character-eat.png`)**
- **Purpose**: When character is eating
- **Style**: Sitting and eating motion
- **Usage**: When character is eating at kitchen

#### **6. Training Animation (`character-train.png`)**
- **Purpose**: When character is doing physical activities
- **Style**: Exercise poses (push-ups, etc.)
- **Usage**: When character is doing push-ups or other exercises

#### **7. Watching Animation (`character-watch.png`)**
- **Purpose**: When character is watching TV
- **Style**: Sitting and watching motion
- **Usage**: When character is watching game footage

---

## 🎨 **AI Generation Prompts:**

### **1. Idle Animation (`character-idle.png`)**
```
Create a pixel art character idle animation for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 64x64 pixels (square)
Format: PNG with transparency

Content:
- Football player character standing still
- Slight breathing animation or subtle movement
- Relaxed, neutral pose
- Simple, clean design

Color palette:
- Football player colors (team colors or neutral)
- Clear, distinct character
- Mobile-optimized contrast
- Professional look

This will be the default character state when not doing anything.
```

### **2. Walking Animation (`character-walk.png`)**
```
Create a pixel art character walking animation for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 64x64 pixels (square)
Format: PNG with transparency

Content:
- Football player character walking
- Leg movement animation
- Natural walking pose
- Simple, clean design

Color palette:
- Football player colors (team colors or neutral)
- Clear, distinct character
- Mobile-optimized contrast
- Professional look

This will be used when character is moving around the house.
```

### **3. Sleeping Animation (`character-sleep.png`)**
```
Create a pixel art character sleeping animation for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 64x64 pixels (square)
Format: PNG with transparency

Content:
- Football player character sleeping
- Lying down or sitting in relaxed position
- Peaceful, restful pose
- Simple, clean design

Color palette:
- Football player colors (team colors or neutral)
- Clear, distinct character
- Mobile-optimized contrast
- Professional look

This will be used when character is sleeping in bed.
```

### **4. Eating Animation (`character-eat.png`)**
```
Create a pixel art character eating animation for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 64x64 pixels (square)
Format: PNG with transparency

Content:
- Football player character eating
- Sitting and eating motion
- Natural eating pose
- Simple, clean design

Color palette:
- Football player colors (team colors or neutral)
- Clear, distinct character
- Mobile-optimized contrast
- Professional look

This will be used when character is eating at kitchen.
```

### **5. Training Animation (`character-train.png`)**
```
Create a pixel art character training animation for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 64x64 pixels (square)
Format: PNG with transparency

Content:
- Football player character doing exercise
- Push-up or training pose
- Active, energetic pose
- Simple, clean design

Color palette:
- Football player colors (team colors or neutral)
- Clear, distinct character
- Mobile-optimized contrast
- Professional look

This will be used when character is doing physical training.
```

### **6. Watching Animation (`character-watch.png`)**
```
Create a pixel art character watching animation for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 64x64 pixels (square)
Format: PNG with transparency

Content:
- Football player character watching TV
- Sitting and watching motion
- Focused, attentive pose
- Simple, clean design

Color palette:
- Football player colors (team colors or neutral)
- Clear, distinct character
- Mobile-optimized contrast
- Professional look

This will be used when character is watching game footage.
```

---

## 🏗️ **Implementation Strategy:**

### **📁 File Structure:**
```
public/assets/sprites/
├── character-idle.png
├── character-walk.png
├── character-sleep.png
├── character-eat.png
├── character-train.png
└── character-watch.png
```

### **🔧 Code Implementation:**

#### **1. Asset Configuration:**
```typescript
character: {
  idle: '/assets/sprites/character-idle.png',
  walk: '/assets/sprites/character-walk.png',
  sleep: '/assets/sprites/character-sleep.png',
  eat: '/assets/sprites/character-eat.png',
  train: '/assets/sprites/character-train.png',
  watch: '/assets/sprites/character-watch.png'
}
```

#### **2. Animation Logic:**
```typescript
const getCharacterSprite = () => {
  if (isSleeping) return ASSETS.character.sleep
  if (isEating) return ASSETS.character.eat
  if (isTraining) return ASSETS.character.train
  if (isWatching) return ASSETS.character.watch
  if (isWalking) return ASSETS.character.walk
  return ASSETS.character.idle
}
```

---

## 🎯 **Benefits of Multiple Animations:**

✅ **Immersive Experience**: Character reflects current activity
✅ **Visual Feedback**: Clear indication of what character is doing
✅ **Professional Look**: More polished and engaging
✅ **Activity Recognition**: Easy to see character's current state
✅ **Mobile Optimized**: Clear animations on small screens
✅ **Future Expandable**: Easy to add more animations later

---

## 🚀 **Implementation Order:**

### **Phase 1: Core Animations**
1. **Idle** - Default state
2. **Walking** - Movement
3. **Sleeping** - Rest state

### **Phase 2: Activity Animations**
4. **Eating** - Kitchen activities
5. **Training** - Exercise activities
6. **Watching** - TV activities

### **Phase 3: Integration**
7. **Update asset configuration**
8. **Implement animation logic**
9. **Test all animations**

---

## 🎨 **Ready to Start:**

**Which animation would you like to generate first?**

**Recommendation: Start with `character-idle.png` as it's the most essential and will be the default state.**

**Ready to generate the first character animation?** 🚶‍♂️🎨✨
