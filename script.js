// Wrap everything in an Event Listener so it doesn't run until the HTML exists
window.addEventListener('DOMContentLoaded', () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const gameName = urlParams.get('game');
    const hud = document.getElementById('hud-cluster');
    const menu = document.getElementById('options-menu');
    const overlay = document.getElementById('loading-overlay');
    const iframe = document.getElementById('game-iframe');

    // 1. RANDOM LOADING MESSAGES 🌀
    const loadMessages = [
        "SYNCING SESSION...", "CHARGING BATTERIES...", "FINDING PIXELS...",
        "CLEANING THE CONTROLLER...", "GETTING THE HIGH SCORE...",
        "VALODOKA IS LOADING...", "REROUTING POWER...", "UPDATING GRAPHICS..."
    ];

    if (overlay) {
        const loadingText = overlay.querySelector('p');
        if (loadingText) {
            loadingText.innerText = loadMessages[Math.floor(Math.random() * loadMessages.length)];
        }
    }

    // 2. EMERGENCY HIDE (The "Stuck" Killer)
    // This runs after 5 seconds NO MATTER WHAT, even if the game fails to load
    setTimeout(() => {
        if (overlay) {
            overlay.style.transition = 'opacity 0.8s';
            overlay.style.opacity = '0';
            setTimeout(() => { overlay.style.display = 'none'; }, 800);
        }
    }, 5500);

    // 3. DYNAMIC LOADER
    if (gameName && iframe) {
        const path = `../gameiframes/${gameName}.html`;
        iframe.src = path; 
    } else {
        showError("No game selected.");
    }

    // 4. INITIALIZE HUD
    applyFlip();

    // --- FUNCTIONS (Moved inside or kept global for buttons) ---

    window.saveHUD = function(pos) {
        localStorage.setItem('valodoka_hud_pos', pos);
        if (pos.includes('center')) localStorage.setItem('valodoka_flipped', 'false');
        applyFlip();
        if (menu) menu.style.display = "none";
    };

    window.saveFlip = function() {
        const pos = localStorage.getItem('valodoka_hud_pos') || 'top-left';
        if (pos.includes('center')) {
            showToast("Center positions must stay horizontal! ↔️");
            return;
        }
        const currentFlip = localStorage.getItem('valodoka_flipped') === 'true';
        localStorage.setItem('valodoka_flipped', !currentFlip);
        applyFlip();
    };

    function applyFlip() {
        if (!hud) return;
        const pos = localStorage.getItem('valodoka_hud_pos') || 'top-left';
        const isFlipped = localStorage.getItem('valodoka_flipped') === 'true';
        const reallyFlipped = pos.includes('center') ? false : isFlipped;
        
        hud.style.flexDirection = reallyFlipped ? "column" : "row";
        document.querySelectorAll('.divider').forEach(d => {
            d.style.width = reallyFlipped ? "25px" : "1px";
            d.style.height = reallyFlipped ? "1px" : "25px";
            d.style.margin = reallyFlipped ? "5px 0" : "0 5px";
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
            hud.style.left = "50%"; hud.style.transform = "translateX(-50%)";
            menu.style.left = "50%"; menu.style.transform = "translateX(-50%)";
            if (pos === 'top-center') hud.style.top = "15px";
            if (pos === 'bottom-center') hud.style.bottom = "15px";
        }
    }

    window.toggleMenu = function() { 
        if (menu) menu.style.display = (menu.style.display === 'block') ? 'none' : 'block'; 
    };

    window.copyToClipboard = function() {
        navigator.clipboard.writeText(window.location.href);
        showToast("Link copied! 📋");
    };

    window.toggleFullScreen = function() {
        if (iframe && iframe.requestFullscreen) iframe.requestFullscreen();
        else if (iframe && iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    };

    function showError(msg) {
        if (!overlay) return;
        overlay.innerHTML = `<h2 style="font-family:'Fredoka One'; color:white;">ERROR</h2><p style="color:gray;">${msg}</p>`;
    }
});

// Toast stays outside so it can be called easily
function showToast(msg) {
    let toast = document.getElementById('valodoka-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'valodoka-toast';
        toast.style.cssText = "position:fixed; bottom:30px; left:50%; transform:translateX(-50%) translateY(150px); background:#8e44ad; color:white; padding:12px 25px; border-radius:30px; font-family:'Fredoka One'; box-shadow:0 10px 20px rgba(0,0,0,0.4); transition:transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index:9999; font-size: 14px; white-space: nowrap;";
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    setTimeout(() => { toast.style.transform = "translateX(-50%) translateY(0)"; }, 100);
    setTimeout(() => { toast.style.transform = "translateX(-50%) translateY(150px)"; }, 3000);
}
