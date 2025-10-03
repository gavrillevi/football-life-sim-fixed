# 🚀 Node.js Installation Guide for Windows

## 📥 **Step 1: Download Node.js**

### **Option A: Direct Download (Recommended)**
1. **Visit**: https://nodejs.org/
2. **Click**: "LTS" button (Long Term Support - most stable)
3. **Download**: `node-v20.x.x-x64.msi` (or latest LTS version)
4. **File location**: Check your Downloads folder

### **Option B: Alternative Download Links**
- **Official**: https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi
- **All versions**: https://nodejs.org/dist/

---

## 🔧 **Step 2: Install Node.js**

### **Windows Installer Steps:**
1. **Run the downloaded `.msi` file**
2. **Click "Next"** through the setup wizard
3. **Accept license agreement** → Next
4. **Choose installation folder** (default is fine) → Next
5. **Keep default settings** → Next
6. **Don't install Chocolatey** (uncheck if shown)
7. **Click "Install"** → Wait for installation
8. **Click "Finish"** when done

### **What Gets Installed:**
- ✅ **Node.js runtime** (JavaScript engine)
- ✅ **npm** (package manager)
- ✅ **Add to PATH** (environment variable)

---

## ✅ **Step 3: Verify Installation**

### **Open Command Prompt or PowerShell:**
```
1. Press Windows + R
2. Type: cmd (or powershell)
3. Press Enter
```

### **Test Commands:**
```bash
# Check Node.js version
node --version
# Should show: v20.x.x (or v18.x.x)

# Check npm version  
npm --version
# Should show: 10.x.x (or 9.x.x)

# If commands work without errors, installation successful!
```

---

## 🎮 **Step 4: Launch Your Football Game**

### **Commands to Run:**
```bash
# Navigate to your project folder
cd C:\Users\User\Desktop\football-life-sim-fixed

# Install project dependencies (first time only)
npm install

# Start the development server
npm run dev
```

### **Expected Success Output:**
```
> football-life-sim@0.0.0 dev
> vite

  VITE v4.4.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### **Open Your Game:**
```
Visit: http://localhost:5173/
```

---

## 🌟 **What You'll See:**

### **🎨 Beautiful Graphics:**
- Your AI-generated home interior background
- Professional character sprite (football player)
- Detailed furniture sprites (bed, TV, kitchen, etc.)
- Kairosoft-quality pixel art throughout

### **🌍 Multilingual Features:**
- Language switcher buttons (🌐 EN/RU)
- Instant translation between English and Russian
- All UI elements translated properly

### **🎮 Sims-Style Gameplay:**
- Click objects around the house
- Character walks smoothly to clicked objects
- Action menus appear with options
- Resource management (hunger, energy, money)

---

## 🐛 **Troubleshooting**

### **❌ "node: command not found"**
**Problem**: Node.js not installed or not in PATH
**Solution**: 
1. Restart your terminal/PowerShell
2. Try again: `node --version`
3. If still fails, reinstall Node.js

### **❌ "npm: command not found"**
**Problem**: npm not installed or PATH issue
**Solution**:
1. Reinstall Node.js (npm comes with Node.js)
2. Restart terminal after installation

### **❌ "Permission denied" errors**
**Problem**: Windows security restrictions
**Solution**:
1. Run terminal as Administrator
2. Or use different installation folder

### **❌ PowerShell execution policy errors**
**Problem**: PowerShell security settings
**Solution**:
```powershell
# Set execution policy (run as Administrator)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or use Command Prompt instead of PowerShell
```

---

## 🎯 **Quick Installation Summary**

1. **Download**: https://nodejs.org/ → Click "LTS"
2. **Install**: Run the `.msi` file → Follow wizard
3. **Verify**: `node --version` → Should show version number
4. **Launch Game**: 
   ```bash
   cd C:\Users\User\Desktop\football-life-sim-fixed
   npm install
   npm run dev
   ```
5. **Open**: http://localhost:5173/

---

## 🎉 **Success Indicators**

**When everything is working:**
- ✅ `node --version` shows a version number
- ✅ `npm --version` shows a version number  
- ✅ `npm run dev` starts without errors
- ✅ Browser opens to show "Football Life Sim"
- ✅ Language switcher buttons visible (🌐 EN/RU)
- ✅ Beautiful graphics load properly

---

## 📞 **Need Help?**

### **Common Issues:**
1. **Windows Defender**: May block installation - allow when prompted
2. **Old versions**: Uninstall old Node.js before installing new version
3. **Antivirus**: Temporarily disable if installation fails
4. **Admin rights**: Right-click installer → "Run as administrator"

### **Alternative Installation Methods:**
1. **Chocolatey**: `choco install nodejs` (if you have Chocolatey)
2. **Winget**: `winget install OpenJS.NodeJS` (Windows 10+)
3. **Portable**: Download standalone executable

---

**Once Node.js is installed, your Football Life Sim will be ready to launch with all the beautiful graphics and multilingual features we've built! 🎮⚽✨**
