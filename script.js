// Generic function to setup sliders
function setupSlider(sliderId, leftBtnId, rightBtnId) {
    const slider = document.getElementById(sliderId);
    const leftBtn = document.getElementById(leftBtnId);
    const rightBtn = document.getElementById(rightBtnId);

    if(!slider || !leftBtn || !rightBtn) return; // Safety check

    rightBtn.addEventListener('click', () => {
        slider.scrollLeft += 300;
    });

    leftBtn.addEventListener('click', () => {
        slider.scrollLeft -= 300;
    });

    slider.addEventListener('scroll', () => {
        leftBtn.disabled = slider.scrollLeft <= 0;
        rightBtn.disabled = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;
    });
}

// Initialize Sliders when the page loads
window.onload = function() {
    setupSlider('gamer-slider', 'gamer-left', 'gamer-right');
    setupSlider('edu-slider', 'edu-left', 'edu-right');
};
