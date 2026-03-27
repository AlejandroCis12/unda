// ========== SLIDER ==========
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
let interval;

// Crear dots
if (slides.length > 0 && dotsContainer) {
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    if (dots[i]) dots[i].classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  if (slides.length === 0) return;
  const next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}

function prevSlide() {
  if (slides.length === 0) return;
  const prev = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(prev);
}

function startSlider() {
  if (interval) clearInterval(interval);
  if (slides.length > 0) {
    interval = setInterval(nextSlide, 5000);
  }
}

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

if (slides.length > 0) {
  goToSlide(0);
  startSlider();

  const sliderContainer = document.querySelector('.hero-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(interval));
    sliderContainer.addEventListener('mouseleave', startSlider);
  }
}

// ========== AÑO AUTOMÁTICO ==========
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// ========== ENVÍO DE COTIZACIÓN (SENCILLO) ==========
const btnEnviar = document.querySelector('.btn-enviar');
if (btnEnviar) {
  btnEnviar.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Obtener valores
    const nombre = document.querySelector('.contacto-formulario input[placeholder="Nombre completo"]')?.value;
    const email = document.querySelector('.contacto-formulario input[placeholder="Correo electrónico"]')?.value;
    const telefono = document.querySelector('.contacto-formulario input[placeholder="Teléfono"]')?.value;
    const mensaje = document.querySelector('.contacto-formulario textarea')?.value;
    
    // Validar campos
    if (!nombre || !email || !telefono || !mensaje) {
      alert('⚠️ Por favor, completa todos los campos');
      return;
    }
    
    // Validar email
    if (!email.includes('@') || !email.includes('.')) {
      alert('⚠️ Por favor, ingresa un correo válido');
      return;
    }
    
    // Crear mensaje
    const asunto = `Cotización UNDA - ${nombre}`;
    const cuerpo = `DATOS DE CONTACTO:
    
Nombre: ${nombre}
Correo: ${email}
Teléfono: ${telefono}

PRODUCTOS SOLICITADOS:
${mensaje}

---
Enviado desde el formulario web de UNDA`;
    
    // Abrir correo
    window.location.href = `mailto:alejandro240915@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    
    alert('✓ Se abrirá tu correo. Solo presiona ENVIAR y te contactaremos pronto.');
    
    // Limpiar formulario
    document.querySelectorAll('.contacto-formulario .campo').forEach(campo => {
      campo.value = '';
    });
  });
}