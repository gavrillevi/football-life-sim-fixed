# 🚨 Animation Troubleshooting Guide

## Quick Diagnosis Steps

### 1. **Check if the game is running:**
```bash
npm run dev
```
- Should show: `Local: http://localhost:5173/`
- Open that URL in browser

### 2. **Open Browser DevTools:**
- Press `F12` or right-click → Inspect
- Go to **Console** tab
- Look for error messages

### 3. **Test sprite files directly:**
Open these URLs in browser:
- `http://localhost:5173/assets/sprites/anime-clean.png`
- `http://localhost:5173/assets/sprites/anime-walk.png`

### 4. **Check Network tab:**
- In DevTools, go to **Network** tab
- Refresh the page
- Look for failed requests (red entries)

## Common Issues & Solutions

### ❌ **"Character doesn't appear at all"**

**Check:**
1. Are you on the HOME screen? (Character only shows at home)
2. Console errors about missing files?
3. Network tab shows 404 errors?

**Solution:**
```bash
# Check files exist
ls public/assets/sprites/
```

### ❌ **"Character appears but doesn't animate"**

**Check:**
1. Console shows sprite loaded with correct dimensions?
2. Animation loop running? (should see frame logs)
3. Is character walking? (click to move)

**Solution:**
- Look for console logs like: `🎬 SpriteSheet loaded: /assets/sprites/anime-walk.png`
- Should see: `📏 Image dimensions: 128×64`

### ❌ **"Character is blurry/pixelated"**

**Check:**
1. Canvas smoothing disabled?
2. CSS image-rendering set to pixelated?

**Solution:**
- Already implemented in code
- Check browser zoom level (should be 100%)

### ❌ **"Wrong sprite dimensions"**

**Expected:**
- `anime-clean.png`: 32×64 (static)
- `anime-walk.png`: 128×64 (4 frames of 32×64)

**If wrong:**
- Regenerate sprites with correct dimensions
- Or adjust frameCount in code

## Debug Commands

### Test sprite loading:
```bash
# Open quick-sprite-test.html in browser
# Should show both static and animated sprites
```

### Check file access:
```bash
# In browser console:
fetch('/assets/sprites/anime-walk.png')
  .then(r => console.log('Status:', r.status))
  .catch(e => console.error('Error:', e))
```

### Manual sprite test:
```javascript
// In browser console:
const img = new Image();
img.onload = () => console.log('Loaded:', img.width, 'x', img.height);
img.src = '/assets/sprites/anime-walk.png';
```

## Expected Console Output

**When working correctly:**
```
🎬 SpriteSheet loaded: /assets/sprites/anime-walk.png
📏 Image dimensions: 128×64
🎯 Expected frame size: 32×64
📊 Frame count: 4
🎬 Frame: 0, FPS: 8, Playing: true
```

**When broken:**
```
❌ SpriteSheet failed to load: /assets/sprites/anime-walk.png
```

## Quick Fixes

### If sprites don't load:
1. Check file paths in `src/assets/index.ts`
2. Verify files exist in `public/assets/sprites/`
3. Check for typos in filenames

### If animation doesn't work:
1. Check frameCount matches sprite sheet (4 for walk)
2. Verify FPS is reasonable (4-12)
3. Make sure isPlaying is true

### If character doesn't appear:
1. Make sure you're on HOME screen
2. Check if character position is visible
3. Look for CSS issues hiding the character

## Still Not Working?

1. **Share console output** - Copy/paste any error messages
2. **Check file sizes** - Are the PNG files reasonable size?
3. **Test in different browser** - Try Chrome, Firefox, Edge
4. **Clear browser cache** - Ctrl+F5 to force refresh

The debug logging should now show exactly what's happening!



