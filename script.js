// 1. UTILITIES (Keep these outside so buttons can find them!)
window.toggleMenu = function() {
    const menu = document.getElementById('options-menu');
    if (menu) {
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    }
};

window.toggleFullScreen = function() {
    const f = document.getElementById('game-iframe');
    if (!f) return;
    if (f.requestFullscreen) f.requestFullscreen();
    else if (f.webkitRequestFullscreen) f.webkitRequestFullscreen();
};

// 2. THE MAIN ENGINE
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameName = urlParams.get('game');
    const overlay = document.getElementById('loading-overlay');
    const iframe = document.getElementById('game-iframe');

    // Load the Game Iframe
    if (gameName && iframe) {
        iframe.src = "../gameiframes/" + gameName + ".html";
    }

    // Hide Loading Screen (5 seconds)
    setTimeout(() => {
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => { overlay.style.display = 'none'; }, 800);
        }
    }, 5000);

    // Initial HUD Check
    if (typeof applyFlip === "function") applyFlip();
});

// 3. HUD LOGIC (Attached to window so buttons work)
window.saveHUD = function(pos) {
    localStorage.setItem('valodoka_hud_pos', pos);
    if (pos.includes('center')) localStorage.setItem('valodoka_flipped', 'false');
    applyFlip();
    const menu = document.getElementById('options-menu');
    if (menu) menu.style.display = "none";
};

window.saveFlip = function() {
    const pos = localStorage.getItem('valodoka_hud_pos') || 'top-left';
    if (pos.includes('center')) {
        if (typeof showToast === "function") showToast("Center must stay horizontal! ↔️");
        else alert("Center must stay horizontal!");
        return;
    }
    const current = localStorage.getItem('valodoka_flipped') === 'true';
    localStorage.setItem('valodoka_flipped', !current);
    applyFlip();
};

function applyFlip() {
    const hud = document.getElementById('hud-cluster');
    if (!hud) return;
    
    const pos = localStorage.getItem('valodoka_hud_pos') || 'top-left';
    const isFlipped = localStorage.getItem('valodoka_flipped') === 'true';
    const reallyFlipped = pos.includes('center') ? false : isFlipped;
    
    hud.style.flexDirection = reallyFlipped ? "column" : "row";
    // ... Add your moveHUD call here if needed ...
}
