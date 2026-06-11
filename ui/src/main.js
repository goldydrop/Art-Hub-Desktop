console.log("✅ SEAMLESS HYBRID WINDOW SWAP V16 (INNER-SIZE FIX) + EXPLORER V2 ONLINE!");

let unlistenResize = null;
let unlistenMove = null;

window.closeInterceptors = {}; 

/* ███████████████████████████████████████████████████████████████████████████████

    🚨 CRITICAL RULE FOR ADDING NEW FOLDERS 🚨
    
    Every time you create a new folder section in your 'index.html' file 
    (for example: <div id="vehicles" class="grid hidden">), you MUST add 
    its exact ID string into the 'grids' array below!
    
    Why? The app uses this list to hide all other folders when you click 
    on a new one. If you forget to add your new ID here, your folder will 
    get stuck on the screen and won't hide when you go back to the hub!

    EXAMPLE:
    const grids = ['main-hub', 'anatomy', 'environment', 'vehicles'];

███████████████████████████████████████████████████████████████████████████████ 
*/
window.showGrid = function(targetId) {

    // ADD YOUR NEW FOLDER ID NAMES INSIDE THESE BRACKETS:
    const grids = [
        'main-hub', 
        'sketchdaily', 
        'lineofaction',
        /* 👈 Add a comma here, then type your 'new-folder-name' */
    ];

    // Loop through all folders in the list to hide them or show the active one
    grids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.className = (id === targetId) ? "grid visible" : "grid hidden";
        }
    });
};

// 🗃️ TAURI V2 CODESPACE OPENER FUNCTION
window.openExplorer = async function(folderPath) {
    try {
        // Swapped out old window.__TAURI__.shell.open for the v2 Opener plugin API
        await window.__TAURI__.opener.openPath(folderPath);
    } catch (error) {
        console.error("Failed to open local folder:", error);
        alert("Could not open folder! Check the console for the path error.");
    }
};

function setupMemoryModal() {
    if (document.getElementById('memory-modal')) return;

    const modalHtml = `
        <div id="memory-modal" style="
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.8); z-index: 99999;
            align-items: center; justify-content: center;
            font-family: system-ui, -apple-system, sans-serif;
        ">
            <div style="
                background: #1a1a1a; padding: 30px; border-radius: 12px;
                border: 1px solid #333; max-width: 420px; width: 85%; text-align: center;
                box-shadow: 0 20px 40px rgba(0,0,0,0.6);
            ">
                <h3 id="modal-title" style="margin-top: 0; color: #ffffff; font-size: 18px; font-weight: 600;">Remember Canvas Position?</h3>
                <p style="color: #aaaaaa; font-size: 14px; line-height: 1.5; margin-bottom: 24px;">
                    Would you like to freeze this page in the background to keep your exact scroll position and login, or completely wipe it clean?
                </p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button id="modal-btn-save" style="
                        background: #2563eb; color: white; border: none; padding: 11px 22px; 
                        border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;
                    ">📌 Save Spot</button>
                    <button id="modal-btn-wipe" style="
                        background: #333333; color: #ff4a4a; border: 1px solid #444; padding: 11px 22px; 
                        border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;
                    ">🌪️ Wipe Clean</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

window.showMemoryModal = function(titleText, targetLabel) {
    setupMemoryModal();
    const modal = document.getElementById('memory-modal');
    const modalTitle = document.getElementById('modal-title');
    const btnSave = document.getElementById('modal-btn-save');
    const btnWipe = document.getElementById('modal-btn-wipe');

    modalTitle.innerText = `Remember your spot in ${titleText}?`;
    modal.style.display = 'flex';

    btnSave.onclick = () => {
        modal.style.display = 'none';
    };

    btnWipe.onclick = async () => {
        modal.style.display = 'none';
        try {
            const { WebviewWindow } = window.__TAURI__.webviewWindow;
            const targetWindow = await WebviewWindow.getByLabel(targetLabel);
            
            if (targetWindow) {
                if (window.closeInterceptors[targetLabel]) {
                    window.closeInterceptors[targetLabel](); 
                    delete window.closeInterceptors[targetLabel]; 
                }
                await targetWindow.close();
            }
        } catch (err) {
            console.error("Failed to wipe window:", err);
        }
    };
};

window.openApp = async function(url, titleText, keepAlive = false) {
    try {
        const { WebviewWindow } = window.__TAURI__.webviewWindow;
        const currentWindow = window.__TAURI__.window.getCurrentWindow();

        const targetLabel = 'canvas-' + titleText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        const innerSize = await currentWindow.innerSize();
        const outerPos = await currentWindow.outerPosition();
        const scaleFactor = await currentWindow.scaleFactor();

        const logicalWidth = innerSize.width / scaleFactor;
        const logicalHeight = innerSize.height / scaleFactor;
        const logicalX = outerPos.x / scaleFactor;
        const logicalY = outerPos.y / scaleFactor;

        let targetWindow = await WebviewWindow.getByLabel(targetLabel);
        let isNew = false;

        await currentWindow.setAlwaysOnTop(true);

        if (!targetWindow) {
            isNew = true;
            targetWindow = new WebviewWindow(targetLabel, {
                url: url,
                title: "Art Hub - " + titleText,
                width: logicalWidth,
                height: logicalHeight,
                x: logicalX,
                y: logicalY,
                visible: false
            });
        } 

        const activateTransition = async () => {
            try {
                const exactInnerSize = await currentWindow.innerSize();
                const exactOuterPos = await currentWindow.outerPosition();
                await targetWindow.setSize(exactInnerSize);
                await targetWindow.setPosition(exactOuterPos);

                await targetWindow.show(); 

                const renderDelay = isNew ? 800 : 150;
                await new Promise(resolve => setTimeout(resolve, renderDelay));

                await currentWindow.setAlwaysOnTop(false);
                await currentWindow.hide();
                await targetWindow.setFocus();

                if (unlistenResize) unlistenResize();
                if (unlistenMove) unlistenMove();

                unlistenResize = await targetWindow.onResized(async (event) => {
                    await currentWindow.setSize(event.payload);
                });

                unlistenMove = await targetWindow.onMoved(async (event) => {
                    await currentWindow.setPosition(event.payload);
                });

            } catch (err) {
                console.error("Transition sync failed:", err);
            }
        };

        if (isNew) {
            targetWindow.once('tauri://created', async () => {
                
                window.closeInterceptors[targetLabel] = await targetWindow.onCloseRequested(async (event) => {
                    event.preventDefault(); 
                    
                    if (unlistenResize) unlistenResize();
                    if (unlistenMove) unlistenMove();

                    await currentWindow.show();
                    await currentWindow.setAlwaysOnTop(true);
                    await targetWindow.hide();

                    await currentWindow.setAlwaysOnTop(false);
                    await currentWindow.setFocus();
                    window.showGrid('main-hub');

                    if (keepAlive) {
                        window.showMemoryModal(titleText, targetLabel);
                    } else {
                        if (window.closeInterceptors[targetLabel]) {
                            window.closeInterceptors[targetLabel](); 
                            delete window.closeInterceptors[targetLabel];
                        }
                        await targetWindow.close();
                    }
                });

                await activateTransition();
            });
        } else {
            await activateTransition();
        }

    } catch (error) {
        console.error("Failed to execute hybrid window handoff:", error);
    }
};

window.goHome = async function() {
    const { WebviewWindow } = window.__TAURI__.webviewWindow;
    const windows = await WebviewWindow.getAll();
    const currentWindow = window.__TAURI__.window.getCurrentWindow();

    await currentWindow.show();
    await currentWindow.setAlwaysOnTop(true);

    for (const w of windows) {
        if (w.label !== 'main') {
            await w.hide(); 
        }
    }
    
    if (unlistenResize) unlistenResize();
    if (unlistenMove) unlistenMove();

    await currentWindow.setAlwaysOnTop(false);
    await currentWindow.setFocus();
    window.showGrid('main-hub');
};