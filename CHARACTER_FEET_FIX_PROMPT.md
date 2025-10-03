# 🦶 Character Feet Fix Prompt

## 🚨 **Problem Identified:**
- Character looks good overall
- **FEET ARE TRANSPARENT** (missing/invisible)
- Need to fix the feet while keeping the rest of the character

## 🎨 **Fixed Character Generation Prompt:**

```
Create a 32x32 pixel art character sprite for a football player game asset.

**CRITICAL REQUIREMENT - TRANSPARENT BACKGROUND:**
- MUST have completely transparent background
- NO white background, NO colored background, NO solid background
- Background must be 100% transparent/alpha
- PNG format with alpha channel

**CRITICAL REQUIREMENT - SOLID FEET:**
- FEET MUST be completely solid and visible
- NO transparent feet
- NO missing feet
- Feet should be black shoes (#000000)
- Feet should be clearly defined and opaque
- Character must be standing on solid ground (feet visible)

**Base Character Design (Default):**
- Young male football player (teenager)
- Blue football jersey (#0066CC), white shorts (#FFFFFF), black shoes (#000000)
- Short brown hair (#8B4513), light skin tone (#FFDBAC)
- Standing pose: arms at sides, feet apart, FEET CLEARLY VISIBLE
- Confident expression
- Kairosoft-style pixel art

**Technical Specifications:**
- 32x32 pixels exactly
- PNG format with alpha transparency
- Pixel art style (no anti-aliasing)
- Sharp, crisp edges
- High contrast colors
- Single character sprite (not multiple frames)

**Color Requirements:**
- Blue jersey (#0066CC)
- White shorts (#FFFFFF)
- Black shoes (#000000) - MUST BE SOLID AND VISIBLE
- Natural skin tone (#FFDBAC)
- Brown hair (#8B4513)

**Background Requirements (CRITICAL):**
- Completely transparent background
- No background color
- No background pattern
- No background texture
- Character must be isolated
- Alpha channel must be enabled
- Background must be see-through
- BUT FEET MUST BE SOLID AND OPAQUE

**Style Reference:**
- Game Dev Story character sprites
- Pocket League Story character sprites
- Clean, minimalist pixel art
- Professional game asset quality

**Output Requirements:**
- PNG file with transparent background
- 32x32 pixels resolution
- Alpha channel enabled
- No background elements
- Character only on transparent background
- SOLID, VISIBLE FEET
```

## 🛠️ **Alternative Fix Prompts:**

### **Method 1: Emphasize Feet**
```
Create a 32x32 pixel art character sprite for a football player.

CRITICAL: Must have completely transparent background BUT solid, visible feet.

Character: Young male football player, blue jersey, white shorts, BLACK SHOES (must be solid and visible), brown hair, light skin.

Style: Kairosoft pixel art, standing pose with feet clearly visible.

Technical: 32x32 pixels, PNG with transparent background, FEET MUST BE OPAQUE AND VISIBLE.

Background: Transparent, but character's feet must be solid black shoes.
```

### **Method 2: Technical Focus**
```
Generate a 32x32 pixel art character sprite for a game:

Character: Football player (teenager, blue jersey, white shorts, black shoes, brown hair, light skin)
Style: Kairosoft pixel art
Technical: PNG format, alpha channel enabled, transparent background
Background: Alpha channel = 0 (completely transparent)
Output: Character sprite with no background elements

CRITICAL: Background must be transparent, but the character's feet/shoes must be solid and opaque.
FEET MUST BE VISIBLE - no transparent feet.
```

### **Method 3: Reference-Based**
```
Create a character sprite like Game Dev Story characters:

- 32x32 pixels
- Football player (blue jersey, white shorts, black shoes, brown hair, light skin)
- Kairosoft pixel art style
- PNG format with transparent background
- Character isolated on transparent background
- No background color or pattern

IMPORTANT: The character's feet must be solid and visible - like in Game Dev Story sprites where characters have solid feet.
```

## 🚨 **Troubleshooting Feet Issues:**

### **If Feet Are Still Transparent:**

1. **Try Different Phrasing:**
   - "Solid feet"
   - "Visible feet"
   - "Opaque feet"
   - "Feet must be solid"
   - "No transparent feet"

2. **Use Negative Instructions:**
   - "NO transparent feet"
   - "NO missing feet"
   - "NO invisible feet"
   - "Feet must be opaque"

3. **Technical Terms:**
   - "Feet alpha = 1"
   - "Solid feet"
   - "Opaque feet"
   - "Visible feet"

### **Alternative Approach:**
```
If you get transparent feet again:
1. Generate the character with a white background
2. Use an image editor to:
   - Select the white background
   - Delete it (make transparent)
   - BUT keep the feet solid
   - Save as PNG with transparency
```

## 📁 **File Requirements:**

**Target File:** `character-idle.png`
**Location:** `public/assets/sprites/character-idle.png`
**Size:** 32x32 pixels
**Format:** PNG with transparent background
**Style:** Kairosoft pixel art
**CRITICAL:** Solid, visible feet

## 🎯 **Success Criteria:**

The generated character should:
- [ ] Load properly in the game
- [ ] Have transparent background
- [ ] Be clearly visible at 64x64 pixels (scaled up)
- [ ] Look professional and game-ready
- [ ] Match the Kairosoft aesthetic
- [ ] **HAVE SOLID, VISIBLE FEET** (no transparency)

---

**Ready to fix the feet transparency issue!** 🦶🎨✨
