const volumeSlider = document.getElementById('volume-slider');
const volumeDisplay = document.getElementById('volume-display');

volumeSlider.addEventListener('input', () => {
    volumeDisplay.textContent = volumeSlider.value;
});



