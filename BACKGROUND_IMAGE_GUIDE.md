# 🖼️ Background Image Implementation Guide

## 🎯 **Step 1: Home Interior Background**

### 📋 **What We Need:**
- **File**: `home-interior.png`
- **Location**: `public/assets/backgrounds/home-interior.png`
- **Purpose**: Main background for the home scene

---

## 🎨 **Image Specifications:**

### **📐 Technical Requirements:**
- **Format**: PNG (with transparency support)
- **Style**: Pixel art / Kairosoft-style
- **Resolution**: 1024x768 pixels (4:3 ratio, mobile-optimized)
- **Color Palette**: Warm, cozy home colors
- **Mobile-friendly**: High contrast, clear details for small screens

### **🏠 Content Requirements:**
- **Living room interior** with:
  - Wooden floor or carpet
  - Walls (can be simple)
  - Windows (optional)
  - Basic room structure
- **Empty space** for furniture placement
- **Cozy atmosphere** - warm lighting
- **Clean design** - not too cluttered

### **🎯 Design Focus:**
- **Background only** - no furniture (we'll add those as separate sprites)
- **Neutral colors** - won't clash with furniture sprites
- **Simple layout** - clear areas for object placement
- **Pixel art style** - consistent with game aesthetic

---

## 📝 **AI Generation Prompt:**

```
Create a pixel art home interior background for a mobile football life simulation game. 

Style: Kairosoft/Pocket League Story 2 inspired pixel art
Resolution: 1024x768 pixels (4:3 ratio for mobile compatibility)
Format: PNG with transparency

Content:
- Cozy living room interior
- Wooden floor or warm carpet
- Simple walls (light colors)
- One or two windows for natural light
- Empty space in center for furniture placement
- Warm, inviting atmosphere
- Clean, uncluttered design

Mobile optimization:
- High contrast colors for small screens
- Clear, distinct areas for touch interaction
- Bold pixel art style (not too fine details)
- Readable at small sizes

Color palette:
- Warm browns for floor
- Light beige/cream for walls
- Soft lighting
- No furniture (background only)

The image should feel like a comfortable home where a football player would relax and train, optimized for mobile viewing.
```

---

## 🔄 **Implementation Steps:**

1. **🎨 Generate Image**: Use the prompt above
2. **📁 Save File**: As `home-interior.png`
3. **📂 Place File**: In `public/assets/backgrounds/`
4. **🧪 Test**: Refresh browser to see background
5. **✅ Verify**: Background displays correctly

---

## 🧪 **Testing Checklist:**

### **🖥️ Desktop Testing:**
- [ ] Image loads without errors
- [ ] Background covers full home scene
- [ ] No CSS decorations showing
- [ ] Proper aspect ratio maintained
- [ ] Colors look good with existing UI
- [ ] Ready for furniture sprites on top

### **📱 Mobile Testing:**
- [ ] Image scales properly on mobile screens
- [ ] High contrast visible on small screens
- [ ] Touch targets remain accessible
- [ ] No performance issues on mobile
- [ ] Works in both portrait and landscape
- [ ] Clear details at mobile zoom levels

---

## 🎯 **Expected Result:**

After implementation, the home scene should show:
- **Beautiful pixel art background** instead of CSS gradients
- **Clean, professional look** 
- **Perfect foundation** for adding furniture sprites
- **Cozy home atmosphere** for the football player

---

## 🚀 **Ready to Start!**

**Please generate the `home-interior.png` image using the prompt above, then place it in `public/assets/backgrounds/` and let me know when it's ready for testing!**

We'll implement it step by step and make sure it looks perfect before moving to the next image. 🎨✨
