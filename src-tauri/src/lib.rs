// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .on_page_load(|webview, _payload| {
            // 🚨 THE FIX: Inject a silent script on every page load to force 
            // all external links to open inside the current Canvas window.
            let _ = webview.eval(r#"
                window.addEventListener('click', function(e) {
                    let target = e.target.closest('a');
                    if (target && target.getAttribute('target') === '_blank') {
                        target.setAttribute('target', '_self');
                    }
                }, true);
            "#);
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}