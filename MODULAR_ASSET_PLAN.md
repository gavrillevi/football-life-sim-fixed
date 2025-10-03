# 🏗️ Modular Asset System - Complete Redesign

## 🎯 **Modular Architecture:**

### **📋 Asset Breakdown:**

#### **1. Floor Assets**
- **`floor-wood.png`** - Main wooden floor tiles
- **`floor-carpet.png`** - Carpet area (optional)
- **`floor-tile.png`** - Bathroom/kitchen tiles (future)

#### **2. Wall Assets**
- **`wall-basic.png`** - Basic wall texture (beige/cream)
- **`wall-corner.png`** - Wall corners
- **`wall-doorway.png`** - Door opening in wall

#### **3. Window Assets**
- **`window-frame.png`** - Window frame/trim
- **`window-view.png`** - Outdoor scene visible through window
- **`window-curtain.png`** - Optional curtains

#### **4. Door Assets**
- **`door-frame.png`** - Door opening in wall
- **`door-main.png`** - Main door (closed)
- **`door-open.png`** - Open door showing outside
- **`door-handle.png`** - Door handle/knob

#### **5. Ceiling Assets**
- **`ceiling-basic.png`** - Basic ceiling texture
- **`ceiling-light.png`** - Light fixture areas

---

## 🎨 **Asset Generation Prompts:**

### **0. Background Structure (`home-interior.png`) - UPDATED**
```
Create a pixel art home interior background structure for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 1024x768 pixels (4:3 ratio for mobile compatibility)
Format: PNG with transparency

Content:
- Basic room structure ONLY
- NO FLOOR (will be added as separate tiles)
- Basic walls in neutral beige/cream
- Window openings (empty frames)
- Door opening (empty frame)
- Empty space for modular elements
- Clean, minimal design

Color palette:
- Neutral beige/cream for walls (#F5F5DC, #DEB887)
- Transparent areas for floor, windows, door
- Soft lighting
- No furniture or floor details

This is the base structure that modular tiles will be placed on top of.
```

### **1. Floor - Wooden (`floor-wood.png`)**
```
Create a pixel art wooden floor tile for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 128x128 pixels (square tile)
Format: PNG with transparency

Content:
- Wooden floor texture
- Wood grain pattern
- Warm brown colors
- Seamless tileable pattern
- Subtle variation in wood planks

Color palette:
- Warm browns (#8B4513, #A0522D, #CD853F)
- Dark wood grain lines
- Light highlights
- Seamless edges for tiling

This will be repeated to create the floor surface.
```

### **2. Wall - Basic (`wall-basic.png`)**
```
Create a pixel art basic wall texture for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 128x128 pixels (square tile)
Format: PNG with transparency

Content:
- Basic wall texture
- Subtle wall pattern
- Neutral, warm colors
- Seamless tileable pattern
- Clean, simple design

Color palette:
- Neutral beige/cream (#F5F5DC, #DEB887, #F5DEB3)
- Subtle texture variation
- Light shadows
- Seamless edges for tiling

This will be repeated to create wall surfaces.
```

### **3. Window Frame (`window-frame.png`)**
```
Create a pixel art window frame for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 128x96 pixels (window proportions)
Format: PNG with transparency

Content:
- Window frame/trim
- Dark wood or metal frame
- Window opening (transparent center)
- Simple, clean design
- Professional look

Color palette:
- Dark brown/black frame (#654321, #2F2F2F)
- Transparent center
- Subtle frame details
- Clean edges

This will be placed over wall tiles to create windows.
```

### **4. Window View (`window-view.png`)**
```
Create a pixel art outdoor view for home windows in a football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 128x96 pixels (matches window frame)
Format: PNG with transparency

Content:
- Pleasant outdoor scene
- Garden, street, or neighborhood view
- Bright, cheerful atmosphere
- Simple, clean design
- No people or complex details

Color palette:
- Green grass/trees
- Blue sky
- Warm outdoor lighting
- Complementary to interior colors

This will be placed behind window frames.
```

### **5. Door Frame (`door-frame.png`)**
```
Create a pixel art door frame for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 64x128 pixels (door proportions)
Format: PNG with transparency

Content:
- Door opening in wall
- Door frame/trim
- Dark wood frame
- Simple, clean design
- Professional look

Color palette:
- Dark brown frame (#654321, #2F2F2F)
- Transparent center
- Subtle frame details
- Clean edges

This will be placed over wall tiles to create doorways.
```

### **6. Door Main (`door-main.png`)**
```
Create a pixel art closed door for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 64x128 pixels (matches door frame)
Format: PNG with transparency

Content:
- Closed door
- Wooden door texture
- Door handle/knob
- Simple, clean design
- Professional look

Color palette:
- Wooden door (#8B4513, #A0522D)
- Dark handle (#2F2F2F)
- Subtle door details
- Clean edges

This will be placed in door frames.
```

### **7. Door Open (`door-open.png`)**
```
Create a pixel art open door showing outside view for a mobile football life simulation game.

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 64x128 pixels (matches door frame)
Format: PNG with transparency

Content:
- Open door
- Outdoor view through doorway
- Garden, street, or neighborhood
- Bright, inviting atmosphere
- Simple, clean design

Color palette:
- Green grass/trees
- Blue sky
- Warm outdoor lighting
- Inviting atmosphere

This will be shown when door is open.
```

---

## 🏗️ **Implementation Strategy:**

### **Phase 1: Core Assets**
1. **Floor tiles** - `floor-wood.png`
2. **Wall tiles** - `wall-basic.png`
3. **Window system** - `window-frame.png` + `window-view.png`
4. **Door system** - `door-frame.png` + `door-main.png` + `door-open.png`

### **Phase 2: Assembly**
1. **Create background** by combining tiles
2. **Add windows** with frames and views
3. **Add door** with open/closed states
4. **Test** modular system

### **Phase 3: Enhancement**
1. **Add furniture** sprites on top
2. **Add character** movement
3. **Add interactions** (door opening, etc.)

---

## 📁 **File Structure:**
```
public/assets/
├── backgrounds/
│   ├── floor-wood.png
│   ├── wall-basic.png
│   ├── window-frame.png
│   ├── window-view.png
│   ├── door-frame.png
│   ├── door-main.png
│   └── door-open.png
└── sprites/
    └── (furniture sprites)
```

---

## 🎯 **Benefits of Modular System:**

✅ **Flexible**: Easy to change individual elements
✅ **Scalable**: Can add more room types later
✅ **Professional**: Industry-standard approach
✅ **Maintainable**: Easy to update specific parts
✅ **Reusable**: Tiles can be used in multiple rooms
✅ **Interactive**: Door can open/close, windows can change

---

## 🚀 **Ready to Start:**

**Which asset should we generate first?**
1. **Floor tiles** (foundation)
2. **Wall tiles** (structure)
3. **Window system** (views)
4. **Door system** (exit to outside)

**Let's start with the floor tiles!** 🏗️🎨
