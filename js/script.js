/**
 * KuyénDev · Script de Interacciones y Experiencia de Usuario
 * Rendimiento nativo, accesibilidad ARIA y microinteracciones
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Detección de reducción de movimiento
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. IntersectionObserver para Revelado Progresivo (.reveal-fade)
  const revealElements = document.querySelectorAll('.reveal-fade');
  
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 3. Menú Móvil Accesible (Hamburger Drawer)
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const openMenu = () => {
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('is-active');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-active');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    };

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = hamburgerBtn.classList.contains('is-active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
        closeMenu();
        hamburgerBtn.focus();
      }
    });
  }

  // 4. Acordeón de Preguntas Frecuentes (FAQ Accesible)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Cerrar otros acordeones abiertos para mantener orden y foco
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
          }
        }
      });

      // Alternar el actual
      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 5. Navbar Sticky con Fondo Dinámico al Scroll
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    let ticking = false;

    const updateNav = () => {
      if (window.scrollY > 40) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });

    // Ejecución inicial por si la página carga con scroll previo
    updateNav();
  }

  // 6. Protección de Contenido: Bloqueo de Copia, Menú Contextual y Arrastre
  // Bloquear clic derecho (menú contextual)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Bloquear arrastre de imágenes y enlaces
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  // Bloquear eventos de copia y corte
  document.addEventListener('copy', (e) => {
    e.preventDefault();
  });

  document.addEventListener('cut', (e) => {
    e.preventDefault();
  });

  // Bloquear atajos de teclado de copia, guardado y visualización de código
  document.addEventListener('keydown', (e) => {
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;
    if (isCtrlOrMeta) {
      const key = e.key.toLowerCase();
      // 'c' = copiar, 'u' = ver código fuente, 's' = guardar página, 'a' = seleccionar todo
      if (key === 'c' || key === 'u' || key === 's' || key === 'a') {
        e.preventDefault();
      }
    }
  });
});