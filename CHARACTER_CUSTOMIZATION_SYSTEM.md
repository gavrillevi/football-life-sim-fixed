# 🎨 Character Customization System

## 📋 **Character Customization Features:**

### **👤 Basic Customization:**
- **Gender:** Male, Female
- **Race/Ethnicity:** Various skin tones
- **Hair:** Color, style, length
- **Eyes:** Color, shape
- **Body Type:** Athletic, lean, muscular

### **👕 Clothing Customization:**
- **Jersey:** Team colors, custom colors
- **Shorts:** White, black, matching team colors
- **Shoes:** Black, white, team colors
- **Accessories:** Wristbands, headbands, etc.

### **🏆 Team Customization:**
- **Team Colors:** Primary and secondary colors
- **Team Logo:** Custom team emblems
- **Uniform Style:** Home, away, alternate uniforms

## 🎯 **Character Generation Strategy:**

### **Phase 1: Base Character (Current)**
- Generate default character (blue jersey, white shorts, black shoes)
- Male, light skin, brown hair
- 32x32 pixels, transparent background

### **Phase 2: Clothing Variants**
- Generate 5-10 different jersey colors
- Generate different shorts/shoes combinations
- Create team uniform sets

### **Phase 3: Character Variants**
- Generate different skin tones
- Generate different hair colors/styles
- Generate male/female variants

### **Phase 4: Advanced Customization**
- Generate accessories
- Generate different poses
- Generate animation frames

## 🎨 **Character Generation Prompts:**

### **Base Character (Default):**
```
Create a 32x32 pixel art character sprite for a football player game asset.

**CRITICAL REQUIREMENT - TRANSPARENT BACKGROUND:**
- MUST have completely transparent background
- NO white background, NO colored background, NO solid background
- Background must be 100% transparent/alpha
- PNG format with alpha channel

**Base Character Design (Default):**
- Young male football player (teenager)
- Blue football jersey (#0066CC), white shorts (#FFFFFF), black shoes (#000000)
- Short brown hair (#8B4513), light skin tone (#FFDBAC)
- Standing pose: arms at sides, feet apart
- Confident expression
- Kairosoft-style pixel art

**Technical:** 32x32 pixels, PNG with transparent background, pixel art style
```

### **Jersey Color Variants:**
```
Create a 32x32 pixel art character sprite with these jersey color options:

**Base Character:** Young male football player, standing pose, transparent background
**Jersey Colors:** 
- Red (#CC0000)
- Blue (#0066CC) 
- Green (#00CC00)
- Yellow (#CCCC00)
- Purple (#6600CC)
- Orange (#FF6600)
- Pink (#FF69B4)
- Teal (#008080)

**Other Elements:** White shorts, black shoes, brown hair, light skin
**Technical:** 32x32 pixels, PNG with transparent background, Kairosoft pixel art
```

### **Skin Tone Variants:**
```
Create a 32x32 pixel art character sprite with these skin tone options:

**Base Character:** Young male football player, standing pose, transparent background
**Skin Tones:**
- Light (#FFDBAC)
- Medium (#D2B48C)
- Dark (#8B4513)
- Tan (#DEB887)
- Olive (#C19A6B)

**Other Elements:** Blue jersey, white shorts, black shoes, brown hair
**Technical:** 32x32 pixels, PNG with transparent background, Kairosoft pixel art
```

### **Hair Color Variants:**
```
Create a 32x32 pixel art character sprite with these hair color options:

**Base Character:** Young male football player, standing pose, transparent background
**Hair Colors:**
- Black (#000000)
- Brown (#8B4513)
- Blonde (#FFD700)
- Red (#DC143C)
- Gray (#808080)

**Other Elements:** Blue jersey, white shorts, black shoes, light skin
**Technical:** 32x32 pixels, PNG with transparent background, Kairosoft pixel art
```

### **Gender Variants:**
```
Create a 32x32 pixel art character sprite with these gender options:

**Base Character:** Young football player, standing pose, transparent background
**Gender Options:**
- Male (athletic build)
- Female (athletic build)

**Other Elements:** Blue jersey, white shorts, black shoes, brown hair, light skin
**Technical:** 32x32 pixels, PNG with transparent background, Kairosoft pixel art
```

## 🎮 **Game Implementation:**

### **Character Customization UI:**
```typescript
interface CharacterCustomization {
  gender: 'male' | 'female'
  skinTone: 'light' | 'medium' | 'dark' | 'tan' | 'olive'
  hairColor: 'black' | 'brown' | 'blonde' | 'red' | 'gray'
  jerseyColor: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink' | 'teal'
  shortsColor: 'white' | 'black' | 'matching'
  shoesColor: 'black' | 'white' | 'matching'
}
```

### **Asset Management:**
```typescript
const CHARACTER_ASSETS = {
  male: {
    light: {
      black: { red: 'character-male-light-black-red.png', blue: 'character-male-light-black-blue.png' },
      brown: { red: 'character-male-light-brown-red.png', blue: 'character-male-light-brown-blue.png' },
      // ... more combinations
    },
    medium: { /* ... */ },
    dark: { /* ... */ }
  },
  female: { /* ... */ }
}
```

## 📁 **File Organization:**

```
public/assets/sprites/characters/
├── base/
│   ├── character-idle.png (default)
│   └── character-walk.png (default)
├── male/
│   ├── light/
│   │   ├── black/
│   │   │   ├── red-jersey.png
│   │   │   ├── blue-jersey.png
│   │   │   └── green-jersey.png
│   │   ├── brown/
│   │   └── blonde/
│   ├── medium/
│   └── dark/
├── female/
│   ├── light/
│   ├── medium/
│   └── dark/
└── teams/
    ├── team-a/
    ├── team-b/
    └── team-c/
```

## 🎯 **Implementation Priority:**

1. **Phase 1:** Generate base character (current)
2. **Phase 2:** Generate 5-8 jersey color variants
3. **Phase 3:** Generate 3-5 skin tone variants
4. **Phase 4:** Generate 3-5 hair color variants
5. **Phase 5:** Generate female variant
6. **Phase 6:** Add customization UI to game
7. **Phase 7:** Add team customization
8. **Phase 8:** Add animation variants

## 🎨 **Generation Strategy:**

### **Batch Generation:**
- Generate multiple variants in one prompt
- Use consistent base character design
- Maintain same pose and style
- Only change specific customization elements

### **Quality Control:**
- Test each variant in game
- Ensure consistent sizing (32x32)
- Verify transparent backgrounds
- Check color accuracy

### **File Naming Convention:**
```
character-{gender}-{skinTone}-{hairColor}-{jerseyColor}.png
Example: character-male-light-brown-blue.png
```

---

**Ready to implement character customization system!** 🎨✨
