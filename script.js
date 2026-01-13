const urlParams = new URLSearchParams(window.location.search);
const gameName = urlParams.get('game');
const hud = document.getElementById('hud-cluster');
const menu = document.getElementById('options-menu');
const overlay = document.getElementById('loading-overlay');

// 1. DYNAMIC LOADER
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
} else { showError("No game selected."); }

function showError(msg) {
    if (!overlay) return;
    overlay.innerHTML = `<i class="fa-solid fa-circle-xmark" style="font-size:50px; color:#ff4757;"></i><h2 style="font-family:'Fredoka One'; color:white; margin:20px 0;">VALODOKA ERROR</h2><p style="color:gray;">${msg}</p><a href="../index.html" style="text-decoration:none; margin-top:20px; display:inline-block; background:#ff4757; color:white; padding:10px 25px; border-radius:20px; font-family:'Fredoka One';">RETURN HOME</a>`;
}

// 2. HUD & FLIP LOGIC - THE HARD OVERRIDE
function saveHUD(pos) {
    localStorage.setItem('valodoka_hud_pos', pos);
    
    // FORCE HORIZONTAL: If they click a center button, we kill the flip immediately
    if (pos.includes('center')) {
        localStorage.setItem('valodoka_flipped', 'false');
    }
    
    applyFlip();
    if (menu) menu.style.display = "none";
}
window.saveHUD = saveHUD;

function saveFlip() {
    const pos = localStorage.getItem('valodoka_hud_pos') || 'top-left';
    
    // PHYSICAL BLOCK: Alert and exit if in center
    if (pos.includes('center')) {
        alert("Center positions must stay horizontal! ↔️");
        return false;
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
    
    // THE ULTIMATE RULE: If it is center, actuallyFlipped is ALWAYS false
    const actuallyFlipped = pos.includes('center') ? false : isFlipped;
    
    // Set Flex Direction
    hud.style.flexDirection = actuallyFlipped ? "column" : "row"; 
    
    // Rotate Dividers
    document.querySelectorAll('.divider').forEach(d => {
        d.style.width = actuallyFlipped ? "25px" : "1px";
        d.style.height = actuallyFlipped ? "1px" : "25px";
        d.style.margin = actuallyFlipped ? "5px 0" : "0 5px";
    });
    
    moveHUD(pos, actuallyFlipped);
}

function moveHUD(pos, actuallyFlipped) {
    if (!hud || !menu) return;
    hud.style.top = "auto"; hud.style.bottom = "auto"; hud.style.left = "auto"; hud.style.right = "auto"; hud.style.transform = "none";
    menu.style.top = "auto"; menu.style.bottom = "auto"; menu.style.left = "auto"; menu.style.right = "auto"; menu.style.transform = "none";
    
    let vOffset = actuallyFlipped ? "65px" : "75px"; 

    if (pos.includes('top')) menu.style.top = vOffset;
    if (pos.includes('bottom')) menu.style.bottom = vOffset;

    if (pos === 'top-left') { hud.style.top="15px"; hud.style.left="15px"; menu.style.left=actuallyFlipped ? "75px" : "15px"; }
    if (pos === 'top-right') { hud.style.top="15px"; hud.style.right="15px"; menu.style.right=actuallyFlipped ? "75px" : "15px"; }
    if (pos === 'bottom-left') { hud.style.bottom="15px"; hud.style.left="15px"; menu.style.left=actuallyFlipped ? "75px" : "15px"; }
    if (pos === 'bottom-right') { hud.style.bottom="15px"; hud.style.right="15px"; menu.style.right=actuallyFlipped ? "75px" : "15px"; }

    if (pos.includes('center')) {
        hud.style.left = "50%";
        hud.style.transform = "translateX(-50%)";
        menu.style.left = "50%";
        menu.style.transform = "translateX(-50%)";
        if(pos === 'top-center') hud.style.top = "15px";
        if(pos === 'bottom-center') hud.style.bottom = "15px";
    }
}

// Initial Run
applyFlip();

// 3. UTILITIES
function toggleMenu() { if (menu) menu.style.display = (menu.style.display === 'block') ? 'none' : 'block'; }
window.toggleMenu = toggleMenu;

window.addEventListener('click', (e) => { if (hud && menu && !hud.contains(e.target) && !menu.contains(e.target)) menu.style.display = "none"; });

async function nativeShare() {
    try { await navigator.share({ title: 'Valodoka', text: `Play ${gameName}!`, url: window.location.href }); } catch (err) { }
}
window.nativeShare = nativeShare;

function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied! 📋");
}
window.copyToClipboard = copyToClipboard;

function toggleFullScreen() {
    const f = document.getElementById('game-iframe');
    if (f && f.requestFullscreen) f.requestFullscreen();
    else if (f && f.webkitRequestFullscreen) f.webkitRequestFullscreen();
}
window.toggleFullScreen = toggleFullScreen;
