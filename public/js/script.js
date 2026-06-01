// LOAD DYNAMIC SECTIONS
const sections = [
  { id: 'section-about', file: 'pages/nosotros.html' },
  { id: 'section-services', file: 'pages/servicios.html' },
  { id: 'section-problems', file: 'pages/problemas.html' },
  { id: 'section-education', file: 'pages/educacion.html' },
  { id: 'section-process', file: 'pages/proceso.html' },
  { id: 'section-instagram', file: 'pages/instagram.html' },
  { id: 'section-testimonios', file: 'pages/testimonios.html' },
  { id: 'section-faq', file: 'pages/faq.html' },
  { id: 'section-contact', file: 'pages/contacto.html' }
];

async function loadSections() {
  for (const section of sections) {
    const container = document.getElementById(section.id);
    if (container) {
      try {
        const response = await fetch(section.file);
        if (response.ok) {
          const html = await response.text();
          container.innerHTML = html;
        }
      } catch (error) {
        console.error(`Error loading ${section.file}:`, error);
      }
    }
  }
  // Initialize reveal animations after loading all sections
  initScrollReveal();
}

// Wait for DOM to be ready, then load sections
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSections);
} else {
  loadSections();
}

let observer; // Declare observer globally so it can be reused

function initScrollReveal() {
  // Initialize scroll reveal observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// PARTICLE CANVAS
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const particles = [];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,217,255,${p.opacity})`;
    ctx.fill();
  });
  // lines
  particles.forEach((a, i) => {
    particles.slice(i+1).forEach(b => {
      const d = Math.hypot(a.x-b.x, a.y-b.y);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0,123,255,${0.15 * (1 - d/120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// SCROLL REVEAL - Now initialized after sections are loaded
// This will be called by loadSections() after content is dynamically loaded

// NAV SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  nav.style.background = window.scrollY > 50 ? 'rgba(4,27,61,0.98)' : 'rgba(4,27,61,0.85)';
});

// FAQ
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// MOBILE MENU
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// WHATSAPP FORM - Improved version
function sendWhatsApp() {
  // Get all form inputs
  const inputs = document.querySelectorAll('.contact-form .form-input');
  const name = inputs[0]?.value || '';
  const phone = inputs[1]?.value || '';
  const email = inputs[2]?.value || '';
  const service = document.querySelector('.form-select')?.value || '';
  const description = document.querySelector('.form-textarea')?.value || '';
  
  // Validate that at least name is provided
  if (!name.trim()) {
    alert('Por favor, ingresa tu nombre');
    return;
  }
  
  // Build professional message with proper formatting
  let message = `*CONSULTA DE SERVICIO - KuyénDev*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  message += `*Datos del Cliente:*\n`;
  message += `👤 Nombre: ${name}\n`;
  
  if (phone.trim()) {
    message += `📱 Teléfono: ${phone}\n`;
  }
  
  if (email.trim()) {
    message += `📧 Correo: ${email}\n`;
  }
  
  message += `\n*Información de la Solicitud:*\n`;
  
  if (service && service !== '') {
    message += `🔧 Servicio: ${service}\n`;
  }
  
  if (description.trim()) {
    message += `📝 Descripción del problema:\n${description}\n`;
  }
  
  message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Contactado desde el sitio web de KuyénDev*\n`;
  message += `🌐 www.kuyendev.cl`;
  
  // Send to WhatsApp
  window.open(`https://wa.me/56942513730?text=${encodeURIComponent(message)}`, '_blank');
}