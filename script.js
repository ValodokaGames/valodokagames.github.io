const urlParams = new URLSearchParams(window.location.search);
const gameName = urlParams.get('game');
const hud = document.getElementById('hud-cluster');
const menu = document.getElementById('options-menu');
const overlay = document.getElementById('loading-overlay');

// 1. RANDOM LOADING MESSAGES 🌀
const loadMessages = [
    "SYNCING SESSION...",
    "CHARGING BATTERIES...",
    "FINDING PIXELS...",
    "CLEANING THE CONTROLLER...",
    "GETTING THE HIGH SCORE...",
    "VALODOKA IS LOADING...",
    "REROUTING POWER...",
    "UPDATING GRAPHICS..."
];

// Wrap this in a check to make sure it doesn't break the whole script
try {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        const loadingText = overlay.querySelector('p');
        const randomMsg = loadMessages[Math.floor(Math.random() * loadMessages.length)];
        if (loadingText) loadingText.innerText = randomMsg;
    }
} catch (e) {
    console.log("Loading message error:", e);
}


// 2. DYNAMIC LOADER
if (gameName) {
    const path = `../gameiframes/${gameName}.html`;
    fetch(path, { method: 'HEAD' }).then(res => {
        if (res.ok) { 
            document.getElementById('game-iframe').src = path; 
            setTimeout(() => {
                overlay.style.transition = 'opacity 0.8s';
                overlay.style.opacity = '0';
                setTimeout(() => overlay.style.display = 'none', 800);
            }, 5000); 
        } else { showError(`"${gameName}" not found.`); }
    }).catch(() => showError("Connection Error."));
}

function showError(msg) {
    if (!overlay) return;
    overlay.innerHTML = `<h2 style="font-family:'Fredoka One'; color:white;">ERROR</h2><p style="color:gray;">${msg}</p>`;
}

// 3. TOAST SYSTEM 🍞
function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        // Basic styles if CSS isn't loaded yet
        toast.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%) translateY(100px); background:#8e44ad; color:white; padding:12px 25px; border-radius:30px; font-family:'Fredoka One'; box-shadow:0 5px 15px rgba(0,0,0,0.5); transition:transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index:9999;";
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    setTimeout(() => { toast.style.transform = "translateX(-50%) translateY(0)"; }, 100);
    setTimeout(() => { toast.style.transform = "translateX(-50%) translateY(100px)"; }, 3000);
}

// 4. HUD & FLIP LOGIC
function saveHUD(pos) {
    localStorage.setItem('valodoka_hud_pos', pos);
    if (pos.includes('center')) {
        localStorage.setItem('valodoka_flipped', 'false');
    }
    applyFlip();
    if (menu) menu.style.display = "none";
}
window.saveHUD = saveHUD;

function saveFlip() {
    const pos = localStorage.getItem('valodoka_hud_pos') || 'top-left';
    if (pos.includes('center')) {
        showToast("Center positions must stay horizontal! ↔️");
        return;
    }
    const currentFlip = localStorage.getItem('valodoka_flipped') === 'true';
    localStorage.setItem('valodoka_flipped', !currentFlip);
    applyFlip();
}
window.saveFlip = saveFlip;

function applyFlip() {
    if (!hud) return;
    const pos = localStorage.getItem('valodoka_hud_pos') || 'top-left';
    const isFlipped = localStorage.getItem('valodoka_flipped') === 'true';
    const reallyFlipped = pos.includes('center') ? false : isFlipped;
    
    hud.style.flexDirection = reallyFlipped ? "column" : "row";
    document.querySelectorAll('.divider').forEach(d => {
        d.style.width = reallyFlipped ? "25px" : "1px";
        d.style.height = reallyFlipped ? "1px" : "25px";
    });
    moveHUD(pos, reallyFlipped);
}

function moveHUD(pos, reallyFlipped) {
    if (!hud || !menu) return;
    hud.style.top = "auto"; hud.style.bottom = "auto"; hud.style.left = "auto"; hud.style.right = "auto"; hud.style.transform = "none";
    menu.style.top = "auto"; menu.style.bottom = "auto"; menu.style.left = "auto"; menu.style.right = "auto"; menu.style.transform = "none";
    
    let vOffset = reallyFlipped ? "65px" : "75px"; 
    if (pos.includes('top')) menu.style.top = vOffset;
    if (pos.includes('bottom')) menu.style.bottom = vOffset;

    if (pos === 'top-left') { hud.style.top="15px"; hud.style.left="15px"; menu.style.left=reallyFlipped ? "75px" : "15px"; }
    if (pos === 'top-right') { hud.style.top="15px"; hud.style.right="15px"; menu.style.right=reallyFlipped ? "75px" : "15px"; }
    if (pos === 'bottom-left') { hud.style.bottom="15px"; hud.style.left="15px"; menu.style.left=reallyFlipped ? "75px" : "15px"; }
    if (pos === 'bottom-right') { hud.style.bottom="15px"; hud.style.right="15px"; menu.style.right=reallyFlipped ? "75px" : "15px"; }

    if (pos.includes('center')) {
        hud.style.left = "50%";
        hud.style.transform = "translateX(-50%)";
        menu.style.left = "50%";
        menu.style.transform = "translateX(-50%)";
        if(pos === 'top-center') hud.style.top = "15px";
        if(pos === 'bottom-center') hud.style.bottom = "15px";
    }
}

applyFlip();

// 5. UTILITIES
function toggleMenu() { if (menu) menu.style.display = (menu.style.display === 'block') ? 'none' : 'block'; }
window.toggleMenu = toggleMenu;

window.addEventListener('click', (e) => { if (hud && menu && !hud.contains(e.target) && !menu.contains(e.target)) menu.style.display = "none"; });

async function nativeShare() {
    try { await navigator.share({ title: 'Valodoka', text: `Play ${gameName}!`, url: window.location.href }); } catch (err) { }
}
window.nativeShare = nativeShare;

function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied! 📋");
}
window.copyToClipboard = copyToClipboard;

function toggleFullScreen() {
    const f = document.getElementById('game-iframe');
    if (f && f.requestFullscreen) f.requestFullscreen();
    else if (f && f.webkitRequestFullscreen) f.webkitRequestFullscreen();
}
window.toggleFullScreen = toggleFullScreen;
