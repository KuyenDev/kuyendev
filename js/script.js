document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer para animaciones Reveal
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Animamos solo una vez
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-fade').forEach(el => {
    observer.observe(el);
  });

  // 2. Efecto Spotlight para Tarjetas Premium
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. Menú Móvil (Hamburger)
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  function toggleMenu() {
    mobileMenu.classList.toggle('active');
    
    // Animar las barras del hamburger
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Cerrar todos
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Si no estaba activo, abrirlo
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Scroll de Navegación (Blur y Fondo)
  const nav = document.getElementById('mainNav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(9, 9, 11, 0.85)';
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    } else {
      nav.style.background = 'rgba(9, 9, 11, 0.5)';
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
    }
  });
});