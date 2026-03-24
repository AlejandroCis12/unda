
// Año automático
document.getElementById('currentYear').textContent = new Date().getFullYear();

const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
let interval;

// Crear dots
slides.forEach((_, i) => {
const dot = document.createElement('div');
dot.classList.add('dot');
if (i === 0) dot.classList.add('active');
dot.addEventListener('click', () => goToSlide(i));
dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    if (dots[i]) dots[i].classList.toggle('active', i === index);
});
currentSlide = index;
}

function nextSlide() {
const next = (currentSlide + 1) % slides.length;
goToSlide(next);
}

function prevSlide() {
const prev = (currentSlide - 1 + slides.length) % slides.length;
goToSlide(prev);
}

function startSlider() {
if (interval) clearInterval(interval);
interval = setInterval(nextSlide, 5000);
}

// Eventos botones
if (prevBtn && nextBtn) {
prevBtn.addEventListener('click', () => {
    prevSlide();
    clearInterval(interval);
    startSlider();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    clearInterval(interval);
    startSlider();
});
}

goToSlide(0);
startSlider();

// Pausar al hover
const sliderContainer = document.querySelector('.hero-slider');
if (sliderContainer) {
sliderContainer.addEventListener('mouseenter', () => clearInterval(interval));
sliderContainer.addEventListener('mouseleave', startSlider);
}