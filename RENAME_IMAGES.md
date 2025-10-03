# 🖼️ Image Renaming Guide

## 📋 **Current Status**
✅ **8 sprite images added** to `public/assets/sprites/`  
✅ **1 background image added** to `public/assets/backgrounds/`  
❌ **Images need correct filenames** to work properly

## 🔄 **Required Renaming**

You need to rename your images to these **exact** names:

### **Sprites Folder** (`public/assets/sprites/`)
```
ChatGPT Image Oct 2, 2025, 10_52_56 PM.png  →  character.png
ChatGPT Image Oct 2, 202 голову8, 10_56_19 PM.png  →  bed.png
ChatGPT Image Oct 2, 2025, 10_56_26 PM.png  →  tv.png
ChatGPT Image Oct 2, 2025, 10_56_53 PM.png  →  kitchen.png
ChatGPT Image Oct 2, 2025, 11_01_51 PM.png  →  football-pitch.png
ChatGPT Image Oct 2, 2025, 11_01_55 PM.png  →  street.png
ChatGPT Image Oct 2, 2025, 11_01_57 PM.png  →  exercise-mat.png
ChatGPT Image Oct 2, 2025, 11_03_29 PM.png  →  juggling-area.png (optional)
```

### **Backgrounds Folder** (`public/assets/backgrounds/`)
```
ChatGPT Image Oct 2, 2025, 11_04_41 PM.png  →  home-interior.png
```

## 🚀 **Quick Rename Commands** (Windows PowerShell)

```powershell
# Navigate to sprites folder
cd "C:\Users\User\Desktop\football-life-sim-fixed\public\assets\sprites"

# Rename each image (replace with actual current names):
ren "ChatGPT Image Oct 2, 2025, 10_52_56 PM.png" "character.png"
ren "ChatGPT Image Oct 2, 2025, 10_56_19 PM.png" "bed.png"
ren "ChatGPT Image Oct 2, 2025, 10_56_26 PM.png" "tv.png"
ren "ChatGPT Image Oct 2, 2025, 10_56_53 PM.png" "kitchen.png"
ren "ChatGPT Image Oct 2, 2025, 11_01_51 PM.png" "football-pitch.png"
ren "ChatGPT Image Oct 2, 2025, 11_01_55 PM.png" "street.png"
ren "ChatGPT Image Oct 2, 2025, 11_01_57 PM.png" "exercise-mat.png"
ren "ChatGPT Image Oct 2, 2025, 11_03_29 PM.png" "juggling-area.png"

# Navigate to backgrounds folder
cd "C:\Users\User\Desktop\football-life-sim-fixed\public\assets\backgrounds"

# Rename background:
ren "ChatGPT Image Oct 2, 2025, 11_04_41 PM.png" "home-interior.png"
```

## 📋 **Manual Renaming** (If commands don't work)

1. **Open Windows Explorer**
2. **Navigate to**: `public/assets/sprites/`
3. **Right-click each file** → Rename
4. **Change names** to match the required names above
5. **Do the same** for `public/assets/backgrounds/`

## ✅ **Verification**

After renaming, you should have:
```
public/assets/sprites/
├── character.png
├── bed.png
├── tv.png
├── kitchen.png
├── football-pitch.png
├── street.png
├── exercise-mat.png
└── juggling-area.png

public/assets/backgrounds/
└── home-interior.png
```

## 🧪 **Test Your Images**

Once renamed, test with:
1. **Open**: `test-sprites.html` - See if all images load
2. **Run game**: `npm run dev` - See sprites in action
3. **Check console**: Should see no 404 errors

## 🎯 **Expected Results**

After proper renaming:
- ✅ Character sprite replaces CSS character
- ✅ Home objects show your AI-generated images
- ✅ Background displays your interior design
- ✅ Pixel-perfect Kairosoft-style graphics
- ✅ No fallback placeholders needed

Your images look great - they just need the right names! 🎨✨
