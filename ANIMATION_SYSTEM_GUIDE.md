# 🎬 Character Animation System Guide

## 📋 Animation Requirements

### **Current Character: anime-clean.png**
- **Base Size:** 32x64 pixels
- **Style:** Clean, simple pixel art
- **Background:** Transparent
- **File Size:** 3.5KB (excellent for animations)

## 🎯 Animation Types Needed

### **1. Walking Animation (4 frames)**
- **Purpose:** Character movement around the house
- **Frames:** 4 frames showing walking cycle
- **Speed:** 0.8 seconds per cycle
- **File:** `anime-walk.png` (4 frames horizontally)

### **2. Idle Breathing Animation (2-4 frames)**
- **Purpose:** Character standing still with subtle movement
- **Frames:** 2-4 frames showing gentle breathing
- **Speed:** 2 seconds per cycle
- **File:** `anime-idle.png` (2-4 frames horizontally)

### **3. Training Animation (4 frames)**
- **Purpose:** Character doing exercises/training
- **Frames:** 4 frames showing training movements
- **Speed:** 1.2 seconds per cycle
- **File:** `anime-train.png` (4 frames horizontally)

### **4. Sleeping Animation (2 frames)**
- **Purpose:** Character sleeping in bed
- **Frames:** 2 frames showing gentle breathing while sleeping
- **Speed:** 3 seconds per cycle
- **File:** `anime-sleep.png` (2 frames horizontally)

### **5. Eating Animation (3 frames)**
- **Purpose:** Character eating food
- **Frames:** 3 frames showing eating motion
- **Speed:** 1.5 seconds per cycle
- **File:** `anime-eat.png` (3 frames horizontally)

## 🎨 Animation Generation Prompts

### **Walking Animation Prompt:**
```
Create a 4-frame walking animation sprite sheet for a pixel art character:

CHARACTER SPECS:
- Size: 32x64 pixels per frame (128x64 total)
- Style: Clean pixel art, anime-inspired
- Background: TRANSPARENT (critical requirement)
- Character: Same as anime-clean.png but in 4 walking poses

WALKING CYCLE:
Frame 1: Left leg forward, right leg back, arms swinging naturally
Frame 2: Both legs closer together, mid-step
Frame 3: Right leg forward, left leg back, arms swinging opposite
Frame 4: Both legs closer together, mid-step

TECHNICAL REQUIREMENTS:
- 4 frames arranged horizontally (128x64 pixels total)
- Each frame exactly 32x64 pixels
- Transparent background
- Consistent character proportions
- Smooth walking motion
- Arms and legs moving naturally
- Same character design as anime-clean.png

FILE NAME: anime-walk.png
```

### **Idle Breathing Animation Prompt:**
```
Create a 2-4 frame idle breathing animation sprite sheet:

CHARACTER SPECS:
- Size: 32x64 pixels per frame
- Style: Clean pixel art, anime-inspired
- Background: TRANSPARENT
- Character: Same as anime-clean.png but with subtle breathing

BREATHING CYCLE:
Frame 1: Normal standing pose
Frame 2: Slightly expanded chest (breathing in)
Frame 3: Normal standing pose
Frame 4: Slightly contracted chest (breathing out)

TECHNICAL REQUIREMENTS:
- 2-4 frames arranged horizontally
- Each frame exactly 32x64 pixels
- Transparent background
- Very subtle movement (breathing)
- Same character design as anime-clean.png

FILE NAME: anime-idle.png
```

### **Training Animation Prompt:**
```
Create a 4-frame training animation sprite sheet:

CHARACTER SPECS:
- Size: 32x64 pixels per frame (128x64 total)
- Style: Clean pixel art, anime-inspired
- Background: TRANSPARENT
- Character: Same as anime-clean.png but doing exercises

TRAINING CYCLE:
Frame 1: Starting position, arms at sides
Frame 2: Arms raised, slight squat
Frame 3: Arms extended, deeper squat
Frame 4: Returning to starting position

TECHNICAL REQUIREMENTS:
- 4 frames arranged horizontally (128x64 pixels total)
- Each frame exactly 32x64 pixels
- Transparent background
- Dynamic training movements
- Same character design as anime-clean.png

FILE NAME: anime-train.png
```

### **Sleeping Animation Prompt:**
```
Create a 2-frame sleeping animation sprite sheet:

CHARACTER SPECS:
- Size: 32x64 pixels per frame (64x64 total)
- Style: Clean pixel art, anime-inspired
- Background: TRANSPARENT
- Character: Same as anime-clean.png but lying down

SLEEPING CYCLE:
Frame 1: Lying down, chest slightly raised (breathing in)
Frame 2: Lying down, chest slightly lowered (breathing out)

TECHNICAL REQUIREMENTS:
- 2 frames arranged horizontally (64x64 pixels total)
- Each frame exactly 32x64 pixels
- Transparent background
- Very subtle breathing movement
- Character lying down position
- Same character design as anime-clean.png

FILE NAME: anime-sleep.png
```

### **Eating Animation Prompt:**
```
Create a 3-frame eating animation sprite sheet:

CHARACTER SPECS:
- Size: 32x64 pixels per frame (96x64 total)
- Style: Clean pixel art, anime-inspired
- Background: TRANSPARENT
- Character: Same as anime-clean.png but eating

EATING CYCLE:
Frame 1: Hand bringing food to mouth
Frame 2: Food at mouth, chewing motion
Frame 3: Hand moving away from mouth

TECHNICAL REQUIREMENTS:
- 3 frames arranged horizontally (96x64 pixels total)
- Each frame exactly 32x64 pixels
- Transparent background
- Eating motion with hand movement
- Same character design as anime-clean.png

FILE NAME: anime-eat.png
```

## 🔧 Implementation Plan

### **Phase 1: Update Asset System**
1. Add new animation assets to `src/assets/index.ts`
2. Update character sprite system to handle animations
3. Add CSS animations for sprite sheet cycling

### **Phase 2: Integrate Animations**
1. Update `SimsHomeScreen.tsx` to use different animations
2. Add animation state management
3. Implement smooth transitions between animations

### **Phase 3: Test and Refine**
1. Test all animations in game
2. Adjust timing and smoothness
3. Add animation transitions

## 📁 File Structure
```
public/assets/sprites/
├── anime-clean.png (current static character)
├── anime-walk.png (4-frame walking animation)
├── anime-idle.png (2-4 frame breathing animation)
├── anime-train.png (4-frame training animation)
├── anime-sleep.png (2-frame sleeping animation)
└── anime-eat.png (3-frame eating animation)
```

## 🎯 Next Steps
1. Generate the animation sprite sheets using the prompts above
2. Update the asset system to load animations
3. Implement the animation system in the game
4. Test all animations and refine timing

## 💡 Tips for Generation
- Use the same character design as anime-clean.png
- Ensure transparent backgrounds
- Keep movements smooth and natural
- Maintain consistent character proportions
- Test each animation individually before combining
