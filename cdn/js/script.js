// COPYRIGHT 2026 BY NOTHINGBUTTYLER. ALL RIGHTS RESERVED. \\

function openSearch(){
    document.getElementById('searchOverlay')
    .classList.add('active');
}

function closeSearch(){
    document.getElementById('searchOverlay')
    .classList.remove('active');
}

function openLogin(){
    document.getElementById('loginOverlay')
    .classList.add('active');
}

function closeLogin(){
    document.getElementById('loginOverlay')
    .classList.remove('active');
}

function openSidebar(){
    document.getElementById('sidebar')
    .classList.add('active');
}

function closeSidebar(){
    document.getElementById('sidebar')
    .classList.remove('active');
}

function toggleDropdown(event){

    event.stopPropagation();

    const menu =
    document.querySelector('.dropdown-content');

    const button =
    document.querySelector('.dropdown-btn');

    menu.classList.toggle('active');
    button.classList.toggle('active');
}

document.addEventListener('click',function(){

    document
    .querySelector('.dropdown-content')
    .classList.remove('active');

    document
    .querySelector('.dropdown-btn')
    .classList.remove('active');

});
    
    /* =========================
   SEARCH
========================= */

function openSearch(){
    document
        .getElementById('searchOverlay')
        .classList.add('active');
}

function closeSearch(){
    document
        .getElementById('searchOverlay')
        .classList.remove('active');
}

/* =========================
   LOGIN MODAL
========================= */

function openLogin(){
    document
        .getElementById('loginOverlay')
        .classList.add('active');
}

function closeLogin(){
    document
        .getElementById('loginOverlay')
        .classList.remove('active');
}

/* =========================
   SIDEBAR
========================= */

function openSidebar(){
    document
        .getElementById('sidebar')
        .classList.add('active');
}

function closeSidebar(){
    document
        .getElementById('sidebar')
        .classList.remove('active');
}

/* =========================
   DROPDOWN
========================= */

function toggleDropdown(event){

    event.stopPropagation();

    const menu =
        document.querySelector('.dropdown-content');

    const button =
        document.querySelector('.dropdown-btn');

    menu.classList.toggle('active');
    button.classList.toggle('active');
}

document.addEventListener('click', () => {

    const menu =
        document.querySelector('.dropdown-content');

    const button =
        document.querySelector('.dropdown-btn');

    if(menu){
        menu.classList.remove('active');
    }

    if(button){
        button.classList.remove('active');
    }

});

/* =========================
   SLIDER SYSTEM
========================= */

function setupSlider(
    sliderId,
    leftBtnId,
    rightBtnId
){

    const slider =
        document.getElementById(sliderId);

    const leftBtn =
        document.getElementById(leftBtnId);

    const rightBtn =
        document.getElementById(rightBtnId);

    if(
        !slider ||
        !leftBtn ||
        !rightBtn
    ){
        return;
    }

    function updateButtons(){

        leftBtn.disabled =
            slider.scrollLeft <= 0;

        rightBtn.disabled =
            slider.scrollLeft +
            slider.clientWidth >=
            slider.scrollWidth - 1;
    }

rightBtn.addEventListener(
    'click',
    () => {

        const card =
            slider.querySelector('.game-card');

        const cardWidth =
            card.offsetWidth + 20;

        slider.scrollBy({
            left:cardWidth,
            behavior:'smooth'
        });

    }
);

leftBtn.addEventListener(
    'click',
    () => {

        const card =
            slider.querySelector('.game-card');

        const cardWidth =
            card.offsetWidth + 20;

        slider.scrollBy({
            left:-cardWidth,
            behavior:'smooth'
        });

    }
);

    slider.addEventListener(
        'scroll',
        updateButtons
    );

    updateButtons();
}

/* =========================
   CLOSE MODALS WITH ESC
========================= */

document.addEventListener(
    'keydown',
    (event) => {

        if(event.key === 'Escape'){

            closeSearch();
            closeLogin();
            closeSidebar();

        }

    }
);

/* =========================
   CLOSE OVERLAYS
========================= */

document
    .getElementById('searchOverlay')
    ?.addEventListener('click', e => {

        if(
            e.target.id ===
            'searchOverlay'
        ){
            closeSearch();
        }

    });

document
    .getElementById('loginOverlay')
    ?.addEventListener('click', e => {

        if(
            e.target.id ===
            'loginOverlay'
        ){
            closeLogin();
        }

    });

/* =========================
   INITIALIZE
========================= */

window.addEventListener(
    'load',
    () => {

        setupSlider(
            'gamer-slider',
            'gamer-left',
            'gamer-right'
        );

        setupSlider(
            'edu-slider',
            'edu-left',
            'edu-right'
        );

    }
);

/* =========================
   FUTURE SEARCH SYSTEM
========================= */
/*
const searchInput =
    document.querySelector(
        '.search-bar input'
    );

searchInput.addEventListener(
    'input',
    function(){

        const query =
            this.value
            .toLowerCase();

        // Search logic later

    }
);
*/

/* =========================
   FUTURE ACCOUNT SYSTEM
========================= */
/*
document
.querySelector('.nexora')
.addEventListener('click', () => {

    window.location.href =
    '/auth/nexora';

});
*/
    
    /* =========================
   DRAG / SWIPE SUPPORT
========================= */

document.querySelectorAll('.game-slider').forEach(slider => {

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', e => {

        isDown = true;

        slider.classList.add('active');

        startX = e.pageX - slider.offsetLeft;

        scrollLeft = slider.scrollLeft;

    });

    slider.addEventListener('mouseleave', () => {

        isDown = false;

    });

    slider.addEventListener('mouseup', () => {

        isDown = false;

    });

    slider.addEventListener('mousemove', e => {

        if(!isDown) return;

        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;

        const walk = (x - startX) * 1.5;

        slider.scrollLeft = scrollLeft - walk;

    });

});
    
    // LEAVING SITE - EXTERNAL LINK WARNING
    
    let pendingUrl = "";

function openExternal(url){

    pendingUrl = url;

    const domain =
    new URL(url).hostname;

document.getElementById("externalUrl")
.textContent = domain;

    document.getElementById("externalOverlay")
    .classList.add("active");

}

function closeExternal(){

    document.getElementById("externalOverlay")
    .classList.remove("active");

}

function continueExternal(){

    window.location.href = pendingUrl;

}
    
    // Class=active Page active Script
    
    const currentPath =
window.location.pathname;

document
.querySelectorAll(
    '.desktop-nav a, .sidebar-content a'
)
.forEach(link => {

    const href =
    link.getAttribute('href');

    if(href === currentPath){

        link.classList.add('active');

    }
    
    if(
    currentPath === '/support' ||
    currentPath === '/discord'
){
    document
        .querySelector('.dropdown-btn')
        ?.classList.add('active');
}

});

