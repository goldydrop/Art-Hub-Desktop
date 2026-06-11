<h1 align="center">🎨 Art Reference Hub</h1>

<div align="center">
  <strong>A lightweight, customizable dashboard designed for artists to organize and instantly launch web references, tools, and local PC folders inside clean windows. Now supporting both Windows Desktop and Android Mobile!</strong>
</div>

<br />

## 🚀 Built With
* **Tauri** - Fast, native desktop and mobile engine
* **Vanilla Web** - Pure HTML, CSS, and JavaScript

---

## ✨ Features
- **📁 Custom Folders:** Organize your references into easily accessible categories.
- **📌 Web Link Cards:** Open websites (like Pinterest or Anatomy reference sites) in dedicated, borderless canvas windows.
- **🗃️ Local Explorer Cards (Desktop):** Click a button to instantly open your local PC folders containing your downloaded art references.
- **📱 Cross-Platform:** Compile your hub as a standalone Windows `.exe` or an installable Android `.apk`!

---

## 💻 How to Build and Run the App (Windows)

### 1️⃣ Prerequisites (Windows Setup)
Before downloading the code, make sure you install these three things:
1. **[Node.js](https://nodejs.org/):** Download and install the LTS version (this installs `npm` for web dependencies).
2. **[Rust](https://rustup.rs/):** Download and run `rustup-init.exe` to install the Rust programming language.
3. **Microsoft C++ Build Tools:** Download the [Build Tools for Visual Studio](https://visualstudio.microsoft.com/visual-cpp-build-tools/). When the installer opens, check the box that says **"Desktop development with C++"** and click Install.

### 2️⃣ Download & Install
Once your prerequisites are installed, open your terminal (like PowerShell or VS Code terminal) and run these commands one by one:

```bash
# Clone the repository to your computer
git clone [https://github.com/goldydrop/Art-Hub-Desktop.git](https://github.com/goldydrop/Art-Hub-Desktop.git)

# Go into the project folder
cd Art-Hub-Desktop

# Install the required packages
npm install
```

### 3️⃣ Run in Developer Mode (Live Editing!)
To launch the app on your screen so you can test it or customize the code:

```bash
npm run tauri dev
```
> **💡 Hot-Reloading:** While this command is running, you can open your `index.html` file, add new buttons or notes, and just hit save. The desktop app will instantly update on your screen without needing to restart!

### 4️⃣ Build the Final Desktop App
When you are completely finished customizing and want to compile the app into a final, standalone `.exe` program:

```bash
npm run tauri build
```
> **Note:** Once the build finishes, your final `.exe` file will be located deep in your project folder under `src-tauri/target/release/bundle/nsis/`.

---

## 📱 How to Build and Run the App (Android)

### 1️⃣ Prerequisites (Android Setup)
To build for mobile, you need Android's native tools installed:
1. **[Android Studio](https://developer.android.com/studio):** Download and install Android Studio.
2. Complete the Android Studio setup wizard to install the default **Android SDK** and create a **Virtual Device (Emulator)** to test on.
3. Make sure you install the **Android NDK** and **Command-line tools** via the Android Studio SDK Manager.

### 2️⃣ Run in Developer Mode (Android Emulator)
To test your app on a virtual phone with live hot-reloading:

```bash
npm run tauri android dev
```

### 3️⃣ Build an Installable APK (The Quick Fix)
If you want to install the app on your personal physical phone right now without setting up complex security signing keys, build a debug APK:

```bash
npm run tauri android build -- --debug
```
> **Note:** Once it finishes, transfer the `app-debug.apk` file (located in `src-tauri/gen/android/app/build/outputs/apk/debug/`) to your phone and install it!

---

## ✏️ How to Customize It

### Adding Buttons & Links
Open the `index.html` file. Right at the top, you will find a giant **MASTER COPY & PASTE TEMPLATE** note. Just copy the code for the button you want, paste it into the main hub or a folder, and change the link!

### 🚨 Adding New Folders (CRITICAL RULE)
If you create a brand new custom folder in your `index.html` file (for example: `<div id="vehicles" class="grid hidden">`), you **MUST** tell the app it exists!
1. Open your `src/main.js` file.
2. Find the `grids` array at the very top.
3. Add your exact new folder ID into that list so the app knows how to hide it when you navigate around.

*Example:* `const grids = ['main-hub', 'anatomy', 'environment', 'vehicles'];`


---

## 🖼️ Toggling Icons (Desktop vs. Android)

Mobile operating systems force icons to sit inside strict circles, while Desktop icons look best as free-floating shapes. To handle this easily, keep both base images in your main project folder:
* `icon-desktop.png` (Your free-floating design)
* `icon-android.png` (Your design scaled down with a circular background)

Whenever you are about to build or test the app, you simply toggle which icon Tauri should inject into the code by running the corresponding command:

**When building for Desktop:**
```bash
npm run tauri icon icon-desktop.png
```
*(Then run your `npm run tauri build` or `npm run tauri dev` command)*

**When building for Android:**
```bash
npm run tauri icon icon-android.png
```
*(Then run your `npm run tauri android build -- --debug` or `npm run tauri android dev` command)*
