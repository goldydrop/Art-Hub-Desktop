<h1 align="center">🎨 Art Reference Hub Desktop</h1>

<div align="center">
  <strong>A lightweight, customizable desktop dashboard designed for artists to organize and instantly launch web references, tools, and local PC folders inside clean windows.</strong>
</div>

<br />

## 🚀 Built With
* **Tauri** - Fast, native desktop engine
* **Vanilla Web** - Pure HTML, CSS, and JavaScript

---

## ✨ Features
- **📁 Custom Folders:** Organize your references into easily accessible categories.
- **📌 Web Link Cards:** Open websites (like Pinterest or Anatomy reference sites) in dedicated, borderless canvas windows.
- **🗃️ Local Explorer Cards:** Click a button to instantly open your local PC folders containing your downloaded art references.
- **🛠️ Highly Customizable:** The entire interface is built with simple HTML and CSS. You can easily add your own buttons, links, and folders!

---

## 💻 How to Build and Run the App (Windows)

Because this is a Tauri application, your computer needs a few standard Windows development tools installed before you can compile it.

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

### 4️⃣ Build the Final App
When you are completely finished customizing and want to compile the app into a final, standalone `.exe` program that you can double-click and use without a terminal:

```bash
npm run tauri build
```
> **Note:** Once the build finishes, your final `.exe` file will be located deep in your project folder under `src-tauri/target/release/bundle/nsis/`.

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
