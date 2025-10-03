# 🧪 Testing Guide - Football Life Sim

## 🚀 **Option 1: Quick Demo Test (No Installation Required)**

### **Multilingual Features Demo**
```bash
# Open in browser:
multilingual-demo.html
```
- ✅ **Language switching demo**
- ✅ **Translation examples**
- ✅ **UI changes showcase**
- ✅ **No setup needed**

### **Graphics System Demo**
```bash
# Open in browser:
kairosoft-demo.html
```
- ✅ **Kairosoft-style graphics preview**
- ✅ **Sprite system demonstration**
- ✅ **Professional game quality showcase**

### **Asset Generation Demo**
```bash
# Open in browser:
generate-assets.html
```
- ✅ **Pixel art generator**
- ✅ **AI prompts for assets**
- ✅ **Download generated sprites**

---

## 🎮 **Option 2: Full Game Test (Requires Node.js)**

### **Prerequisites**
Make sure you have Node.js installed:
- Download from: https://nodejs.org/
- Install Node.js (includes npm)

### **Running the Game**
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to: http://localhost:5173
```

### **Testing Multilingual Features**
1. **Find language switcher**: Look for 🌐 EN/RU buttons in top-right of header
2. **Switch languages**: Click EN or RU to change language instantly
3. **Test translations**: Check all UI text changes
4. **Verify persistence**: Refresh page - language choice should be remembered

### **Testing Graphics System**
1. **Add your generated images**: Place PNG files in folders:
   - `public/assets/sprites/` (character, objects)
   - `public/assets/backgrounds/` (home interior)
2. **See sprites**: Your images will replace CSS shapes automatically
3. **Test interactions**: Click objects to see your assets in action

---

## 🌍 **Testing Checkpoints**

### **✅ Multilingual Testing**
- [ ] Language switcher appears in header
- [ ] Switching from EN to RU works instantly
- [ ] Switching from RU to EN works instantly
- [ ] All UI text translates properly:
  - [ ] Header title and buttons
  - [ ] Player statistics
  - [ ] Training activities
  - [ ] Home object names
  - [ ] Action tooltips
- [ ] Language preference persists after refresh
- [ ] No errors in browser console

### **✅ Graphics Testing**
- [ ] Character sprite loads (if generated)
- [ ] Home objects show images (if generated)
- [ ] Background image displays (if generated)
- [ ] Fallback CSS graphics work when images missing
- [ ] Character movement animations work
- [ ] Object interactions work smoothly

### **✅ Game Functionality Testing**
- [ ] Player can travel between locations
- [ ] Training works at different locations
- [ ] Sims-style home interactions work
- [ ] Character moves to clicked objects
- [ ] Resource management (hunger, energy, money) works
- [ ] Save/load system works
- [ ] Timeline/development log works

---

## 🐛 **Troubleshooting**

### **If Node.js is not installed:**
```bash
# Check if Node.js is installed:
node --version
npm --version

# If not found, install from: https://nodejs.org/
```

### **If npm commands fail:**
```bash
# Try with PowerShell syntax:
cd C:\Users\User\Desktop\football-life-sim-fixed; npm run dev

# Or use Command Prompt instead of PowerShell
```

### **If images don't load:**
1. Check file names match exactly:
   - `character.png` (not `Character.png`)
   - `bed.png`, `tv.png`, `kitchen.png`, etc.
2. Verify files are in correct folders:
   - `public/assets/sprites/`
   - `public/assets/backgrounds/`
3. Check browser console for 404 errors

### **If translations don't work:**
1. Check browser console for JavaScript errors
2. Verify all translation files exist:
   - `src/locales/en.ts`
   - `src/locales/ru.ts`
   - `src/hooks/useI18n.tsx`
3. Clear browser cache and reload

### **If Sims home screen doesn't work:**
1. Check that location is set to 'HOME'
2. Verify character movement animations
3. Test object clicking and interactions

---

## 📊 **Test Results Checklist**

### **🎯 Core Game**
- [ ] Game loads without errors
- [ ] Navigation works (Hub <-> Event tabs)
- [ ] Player stats display correctly
- [ ] Location switching works
- [ ] Character appears and moves

### **🌍 Multilingual**
- [ ] Language switcher visible and functional
- [ ] English interface reads naturally
- [ ] Russian interface reads correctly
- [ ] Language switching is instant
- [ ] Preferences saved/restored

### **🎨 Graphics** (if images added)
- [ ] Sprites replace CSS shapes
- [ ] Character uses generated image
- [ ] Objects use generated sprites
- [ ] Background uses generated image
- [ ] Pixel-perfect rendering

### **🏠 Sims Interface**
- [ ] Home screen interactive
- [ ] Character moves to clicked objects
- [ ] Object menus appear correctly
- [ ] Action execution works
- [ ] Visual feedback smooth

---

## 🎉 **Success Indicators**

### **✅ Perfect Setup**
- Multiple browsers test successfully
- Both languages work flawlessly
- Generated sprites display beautifully
- Character animations smooth
- All interactions responsive

### **✅ Almost Perfect**
- Minor CSS issues but core functionality works
- Language switching works with minor delays
- Most translations correct
- Sprites load but scaling needs adjustment

### **⚠️ Needs Work**
- Language switching broken
- Major translation issues
- Sprites not loading
- Character movement problems
- Console errors present

---

## 🚀 **Next Steps After Testing**

### **If Everything Works:**
1. **Generate more assets** for different locations
2. **Add more languages** (Spanish, French, etc.)
3. **Polish animations** and interactions
4. **Add sound effects** and music

### **If Issues Found:**
1. **Report specific problems**
2. **Check console errors**
3. **Verify file paths**
4. **Test in different browsers**

## 💡 **Pro Tips**

- **Test in multiple browsers** (Chrome, Firefox, Edge)
- **Check mobile responsiveness** by resizing window
- **Generate different sprite styles** to compare quality
- **Test with slow internet** to check loading behavior
- **Use browser dev tools** to debug issues

**Happy Testing! 🎮✨**
