/**
 * KuyénDev 3.0 · Script de Interacciones y Experiencia de Usuario
 * Premium Motion Design · Rendimiento Nativo 60 FPS · Accesibilidad ARIA WCAG AA
 * Osorno, Región de Los Lagos, Chile · Asistencia Remota
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Detección de reducción de movimiento y puntero fino
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 2. Protección Casual de Contenido (Sin bloquear DevTools ni atajos de teclado)
  // Evita el arrastre de imágenes y restringe el menú contextual específicamente en imágenes
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', (e) => e.preventDefault());
    img.addEventListener('contextmenu', (e) => {
      // Bloqueo contextual específico solo sobre imágenes protegidas
      e.preventDefault();
    });
  });

  // 3. Barra Discreta de Progreso de Lectura al Scroll (2.5px superior)
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar) {
    let scrollTicking = false;
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateProgress);
        scrollTicking = true;
      }
    }, { passive: true });
    updateProgress();
  }

  // 4. IntersectionObserver para Revelado Progresivo (.reveal-fade, .reveal-scale, .reveal-slide-left, .reveal-slide-right)
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-scale, .reveal-slide-left, .reveal-slide-right');
  
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
      threshold: 0.08
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 5. Micro-iluminación Localizada por Puntero y Micro-Parallax (Solo Desktop)
  if (isFinePointer && !prefersReducedMotion) {
    const interactiveCards = document.querySelectorAll('.service-card, .tech-console-card, .guarantee-card, .checklist-card, .assistant-card, .case-banner');
    
    interactiveCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });
    });

    // Micro-parallax muy sutil (4px max) en el visual del Hero
    const heroSection = document.querySelector('.hero-section');
    const heroVisual = document.querySelector('.hero-visual');
    if (heroSection && heroVisual) {
      let heroTicking = false;
      heroSection.addEventListener('mousemove', (e) => {
        if (!heroTicking) {
          window.requestAnimationFrame(() => {
            const rect = heroSection.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            heroVisual.style.setProperty('--parallax-x', `${relX * 6}px`);
            heroVisual.style.setProperty('--parallax-y', `${relY * 6}px`);
            heroTicking = false;
          });
          heroTicking = true;
        }
      }, { passive: true });

      heroSection.addEventListener('mouseleave', () => {
        heroVisual.style.setProperty('--parallax-x', '0px');
        heroVisual.style.setProperty('--parallax-y', '0px');
      });
    }
  }

  // 6. Menú Móvil Accesible (Hamburger Drawer)
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
      link.addEventListener('click', closeMenu);
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
        closeMenu();
        hamburgerBtn.focus();
      }
    });
  }

  // 7. Navbar Sticky con Fondo Dinámico al Scroll
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    let navTicking = false;
    const updateNav = () => {
      if (window.scrollY > 35) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
      navTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!navTicking) {
        window.requestAnimationFrame(updateNav);
        navTicking = true;
      }
    }, { passive: true });

    updateNav();
  }

  // 8. Cierre de menú móvil al redimensionar a desktop (>768px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('is-active')) {
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-active');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    }
  });

  // 9. Progressive Disclosure en Cards de Servicios (Ver detalles y alcance)
  const detailToggles = document.querySelectorAll('.btn-service-details');
  detailToggles.forEach(toggle => {
    const targetId = toggle.getAttribute('aria-controls');
    const panel = document.getElementById(targetId);
    if (!panel) return;

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      if (isExpanded) {
        panel.setAttribute('hidden', '');
      } else {
        panel.removeAttribute('hidden');
      }
    });
  });

  // 10. Checklist Interactivo Pre-Formateo ("Antes de formatear tu computador")
  const checklistContainer = document.getElementById('preformatChecklist');
  if (checklistContainer) {
    const items = checklistContainer.querySelectorAll('.checklist-item');
    const badge = document.getElementById('checklistProgressBadge');
    const STORAGE_KEY = 'kuyendev_checklist_state_3_0';

    // Cargar estado de sesión previo si existe
    let checkedState = {};
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) checkedState = JSON.parse(saved);
    } catch (_) {}

    const updateChecklistProgress = () => {
      const total = items.length;
      let count = 0;
      items.forEach((item, index) => {
        const isChecked = item.classList.contains('is-checked');
        if (isChecked) count++;
        checkedState[index] = isChecked;
      });

      if (badge) {
        badge.textContent = `${count} de ${total} verificados`;
        if (count === total) {
          badge.style.background = 'rgba(16, 185, 129, 0.22)';
          badge.style.borderColor = 'rgba(16, 185, 129, 0.45)';
        } else {
          badge.style.background = 'rgba(16, 185, 129, 0.12)';
          badge.style.borderColor = 'rgba(16, 185, 129, 0.25)';
        }
      }

      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(checkedState));
      } catch (_) {}
    };

    items.forEach((item, index) => {
      // Restaurar estado si estaba marcado
      if (checkedState[index]) {
        item.classList.add('is-checked');
        item.setAttribute('aria-checked', 'true');
      } else {
        item.setAttribute('aria-checked', 'false');
      }

      const toggleItem = () => {
        const currentlyChecked = item.classList.contains('is-checked');
        if (currentlyChecked) {
          item.classList.remove('is-checked');
          item.setAttribute('aria-checked', 'false');
        } else {
          item.classList.add('is-checked');
          item.setAttribute('aria-checked', 'true');
        }
        updateChecklistProgress();
      };

      item.addEventListener('click', toggleItem);
      item.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggleItem();
        }
      });
    });

    updateChecklistProgress();
  }

  // 11. Acordeón de Preguntas Frecuentes (FAQ Accesible)
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

  // 12. Asistente Interactivo 3.0 ("¿Qué servicio necesito?")
  const assistantContainer = document.getElementById('serviceAssistant');
  if (assistantContainer) {
    const assistantBody = assistantContainer.querySelector('.assistant-card-body');
    const stepIndicator = assistantContainer.querySelector('.assistant-step-indicator span');
    const dots = assistantContainer.querySelectorAll('.assistant-dot');

    const state = {
      step: 1,
      situation: null,
      detail: null
    };

    const updateDots = (step) => {
      dots.forEach((dot, idx) => {
        dot.classList.remove('is-active', 'is-completed');
        if (idx + 1 === step) {
          dot.classList.add('is-active');
        } else if (idx + 1 < step) {
          dot.classList.add('is-completed');
        }
      });
      if (stepIndicator) {
        stepIndicator.textContent = step <= 2 ? `Paso ${step} de 2` : 'Recomendación Orientativa';
      }
    };

    const step1Data = [
      { id: 'lento', title: 'Computador Lento', desc: 'El equipo se congela, tarda en abrir programas o tiene lentitud constante.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
      { id: 'limpiar', title: 'Formateo / Empezar de Cero', desc: 'Quiero una instalación limpia desde cero para eliminar todo residuo.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>' },
      { id: 'sistema', title: 'Instalar o Cambiar de Sistema', desc: 'Necesito configurar Windows o evaluar una distribución de Linux ligera.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
      { id: 'office', title: 'Microsoft Office', desc: 'Necesito Word, Excel, PowerPoint o resolver fallos de apertura y activación.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' },
      { id: 'error', title: 'Error Puntual / Soporte Remoto', desc: 'Tengo errores de software, drivers o sospecha de incidencias solucionables a distancia.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
      { id: 'empresa', title: 'Múltiples Equipos / Empresas', desc: 'Oficinas, pymes, colegios o laboratorios con varias estaciones de trabajo.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>' }
    ];

    const step2Data = {
      lento: {
        title: '¿Cuál es la condición general de tu computador?',
        subtitle: 'Esto nos permite determinar si basta con ajustes de software o conviene formatear desde cero.',
        options: [
          { id: 'acumulado', title: 'Años de uso con programas acumulados', desc: 'El hardware es bueno o moderno, pero el sistema tiene programas residuales y lentitud acumulada.' },
          { id: 'modesto', title: 'Equipo antiguo o con memoria RAM ajustada', desc: 'El computador tiene especificaciones modestas y le cuesta mover sistemas operativos pesados.' }
        ]
      },
      limpiar: {
        title: '¿Qué prioridad tienes para la reinstalación?',
        subtitle: 'Reinstalación limpia de sistema operativo y controladores esenciales.',
        options: [
          { id: 'estandar', title: 'Instalación limpia estándar', desc: 'Windows oficial con todas sus funciones habituales y herramientas de trabajo diario.' },
          { id: 'liviano', title: 'Windows Optimizado (edición ligera)', desc: 'Versión ligera (como Windows LTSC según compatibilidad) priorizando velocidad y bajo consumo.' }
        ]
      },
      sistema: {
        title: '¿Qué entorno prefieres utilizar en tu equipo?',
        subtitle: 'Te orientamos con criterio técnico según la compatibilidad de tus componentes.',
        options: [
          { id: 'windows', title: 'Entorno Windows (10 u 11)', desc: 'Máxima compatibilidad con programas de oficina, estudio, utilidades y aplicaciones estándar.' },
          { id: 'linux', title: 'Distribución Linux ligera o productiva', desc: 'Ideal para revitalizar hardware modesto, máxima estabilidad, seguridad y privacidad.' }
        ]
      },
      office: {
        title: '¿Cuál es tu requerimiento con Microsoft Office?',
        subtitle: 'Configuramos la suite completa para trabajo o estudio.',
        options: [
          { id: 'nuevo', title: 'Instalación desde cero', desc: 'No tengo Office o cambié de equipo y necesito Word, Excel, PowerPoint y Outlook listos.' },
          { id: 'error', title: 'Reparación o problema de activación', desc: 'Tengo Office pero me salen avisos de licencia, se cierra solo o presenta fallos de apertura.' }
        ]
      },
      error: {
        title: '¿El equipo enciende y puede conectarse a internet?',
        subtitle: 'Nos ayuda a saber si podemos resolverlo de forma remota o presencial.',
        options: [
          { id: 'remoto', title: 'Sí, enciende y tiene conexión a internet', desc: 'Podemos evaluar asistencia a distancia mediante RustDesk para resolver problemas compatibles.' },
          { id: 'presencial', title: 'No conecta o tiene un fallo más complejo', desc: 'Requiere revisión presencial coordinada según el caso en Osorno.' }
        ]
      },
      empresa: {
        title: '¿Qué tipo de organización necesitas atender?',
        subtitle: 'Diseñamos soluciones personalizadas acordes a la escala y tipo de usuarios.',
        options: [
          { id: 'oficina', title: 'Oficinas / Pymes / Estaciones administrativas', desc: 'Estandarización de puestos de trabajo, Windows estable y suite de productividad.' },
          { id: 'colegio', title: 'Colegios / Laboratorios de alumnos', desc: 'Protección con Deep Freeze (congelamiento de sistema) y configuración segura.' }
        ]
      }
    };

    const recommendations = {
      'lento-acumulado': {
        title: 'Formateo Limpio de PC o Laptop',
        badge: 'Orientación Sugerida',
        desc: 'Por lo que indicas, cuando un computador acumula años de uso y programas en desuso, <strong>el formateo limpio desde cero</strong> suele ser la solución más duradera y honesta. Elimina archivos residuales y problemas acumulados de software para dejar una base limpia y funcional. Incluye 1 mes de garantía.',
        waText: 'Hola, quisiera consultar por el servicio de formateo para mi computador.'
      },
      'lento-modesto': {
        title: 'Optimización Avanzada o Windows Optimizado',
        badge: 'Orientación Sugerida',
        desc: 'Por lo que indicas, para equipos con hardware modesto o memoria RAM reducida, conviene aplicar <strong>Optimización Avanzada</strong> para reducir procesos en segundo plano, o evaluar <strong>Windows Optimizado (como LTSC)</strong> para reducir el consumo del sistema. Evaluamos el equipo para recomendarte lo más adecuado.',
        waText: 'Hola, quisiera consultar por optimización. Mi computador está funcionando lento y quisiera saber qué se puede mejorar.'
      },
      'limpiar-estandar': {
        title: 'Formateo Limpio con Controladores Oficiales',
        badge: 'Orientación Sugerida',
        desc: 'Reinstalación limpia de sistema operativo y controladores esenciales correspondientes a tu modelo de equipo. Respaldado con <strong>1 mes de garantía técnica</strong>.',
        waText: 'Hola, quisiera consultar por el servicio de formateo para mi computador.'
      },
      'limpiar-liviano': {
        title: 'Instalación de Windows Optimizado',
        badge: 'Orientación Sugerida',
        desc: 'Instalación de una configuración o edición de Windows orientada a <strong>estabilidad y adecuación al hardware</strong> (como Windows LTSC cuando corresponda), priorizando respuesta frente a funciones accesorias innecesarias.',
        waText: 'Hola, quisiera consultar qué versión o configuración de Windows conviene para mi equipo.'
      },
      'sistema-windows': {
        title: 'Instalación y Configuración de Windows (10 / 11)',
        badge: 'Orientación Sugerida',
        desc: 'Configuración de Windows en su edición correspondiente según las especificaciones técnicas de tu hardware y las tareas que realizas a diario, asegurando estabilidad y activación funcional.',
        waText: 'Hola, quisiera consultar qué versión o configuración de Windows conviene para mi equipo.'
      },
      'sistema-linux': {
        title: 'Linux & Cambio de Sistema Operativo',
        badge: 'Orientación Sugerida',
        desc: 'Despliegue de una distribución Linux moderna, amigable y eficiente. Una excelente alternativa para <strong>extender la vida útil de tu hardware</strong> con un entorno veloz, seguro y libre de licencias.',
        waText: 'Hola, quisiera consultar si Linux sería una buena opción para mi computador.'
      },
      'office-nuevo': {
        title: 'Instalación de Microsoft Office',
        badge: 'Orientación Sugerida',
        desc: 'Puesta en marcha de la suite completa: Word, Excel, PowerPoint y Outlook, asegurando su correcto funcionamiento y activación correspondiente para que trabajes o estudies sin interrupciones.',
        waText: 'Hola, quisiera consultar por Microsoft Office.'
      },
      'office-error': {
        title: 'Soporte Remoto para Microsoft Office',
        badge: 'Orientación Sugerida',
        desc: 'Solucionamos fallos de apertura, problemas de licencia o errores de vinculación. En la mayoría de los casos podemos conectarnos mediante <strong>asistencia remota segura con RustDesk</strong> y dejarlo operativo rápidamente.',
        waText: 'Hola, tengo un problema con Microsoft Office y quisiera saber si puede resolverse mediante soporte remoto.'
      },
      'error-remoto': {
        title: 'Asistencia Informática Remota (RustDesk)',
        badge: 'Orientación Sugerida',
        desc: 'Conexión a distancia encriptada y rápida. Ideal para solucionar controladores que fallan, errores de Windows, ajustes de programas o problemas menores sin mover tu equipo de tu escritorio.',
        waText: 'Hola, tengo un problema de software y quisiera saber si puede resolverse mediante soporte remoto.'
      },
      'error-presencial': {
        title: 'Soporte Técnico Presencial Coordinado',
        badge: 'Orientación Sugerida',
        desc: 'Evaluación y atención directa con modalidad coordinada en Osorno para fallas de inicio del sistema, problemas de conexión o situaciones donde el equipo deba ser revisado meticulosamente en persona.',
        waText: 'Hola, tengo un problema técnico en mi computador que requiere atención presencial coordinada en Osorno.'
      },
      'empresa-oficina': {
        title: 'Servicios Informáticos para Empresas y Oficinas',
        badge: 'Propuesta B2B',
        desc: 'Formateo masivo, estandarización de puestos de trabajo, Windows estable y suite de productividad para múltiples computadores de oficina, con cotización personalizada según necesidades.',
        waText: 'Hola, quisiera cotizar servicios informáticos para varios equipos de una empresa o institución.'
      },
      'empresa-colegio': {
        title: 'Soluciones para Colegios e Instituciones',
        badge: 'Propuesta Institucional',
        desc: 'Configuración para flotas estudiantiles con <strong>congelamiento Deep Freeze</strong> (inmunidad ante alteraciones de alumnos tras cada reinicio) y software educativo, respaldado por experiencia institucional real en la zona.',
        waText: 'Hola, quisiera cotizar servicios informáticos para varios equipos de una empresa o institución.'
      }
    };

    const renderStep1 = () => {
      state.step = 1;
      updateDots(1);
      let html = `
        <h3 class="assistant-step-title">1. ¿Cuál es la situación principal de tu equipo?</h3>
        <p class="assistant-step-subtitle">Selecciona la opción que mejor describa lo que le ocurre a tu computador o qué necesitas lograr:</p>
        <div class="assistant-options-grid">
      `;
      step1Data.forEach(item => {
        html += `
          <button type="button" class="assistant-opt-btn" data-sit="${item.id}">
            <div class="assistant-opt-title">
              ${item.icon}
              <span>${item.title}</span>
            </div>
            <div class="assistant-opt-desc">${item.desc}</div>
          </button>
        `;
      });
      html += `</div>`;
      assistantBody.innerHTML = html;

      assistantBody.querySelectorAll('.assistant-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          state.situation = btn.getAttribute('data-sit');
          renderStep2();
        });
      });
    };

    const renderStep2 = () => {
      state.step = 2;
      updateDots(2);
      const detailGroup = step2Data[state.situation];
      if (!detailGroup) return;

      let html = `
        <h3 class="assistant-step-title">2. ${detailGroup.title}</h3>
        <p class="assistant-step-subtitle">${detailGroup.subtitle}</p>
        <div class="assistant-options-grid">
      `;
      detailGroup.options.forEach(opt => {
        html += `
          <button type="button" class="assistant-opt-btn" data-detail="${opt.id}">
            <div class="assistant-opt-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              <span>${opt.title}</span>
            </div>
            <div class="assistant-opt-desc">${opt.desc}</div>
          </button>
        `;
      });
      html += `
        </div>
        <div style="margin-top: 1.5rem;">
          <button type="button" id="assistantBackBtn" class="btn btn-secondary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver al paso anterior
          </button>
        </div>
      `;
      assistantBody.innerHTML = html;

      assistantBody.querySelectorAll('.assistant-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          state.detail = btn.getAttribute('data-detail');
          renderResult();
        });
      });

      const backBtn = document.getElementById('assistantBackBtn');
      if (backBtn) {
        backBtn.addEventListener('click', renderStep1);
      }
    };

    const renderResult = () => {
      state.step = 3;
      updateDots(3);
      const key = `${state.situation}-${state.detail}`;
      const rec = recommendations[key] || recommendations['lento-acumulado'];
      const encodedMsg = encodeURIComponent(rec.waText);
      const waUrl = `https://wa.me/56922231780?text=${encodedMsg}`;

      let html = `
        <div class="assistant-result-box" role="region" aria-live="polite">
          <span class="result-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${rec.badge}
          </span>
          <h3 class="result-title">${rec.title}</h3>
          <p class="result-explanation">${rec.desc}</p>
          <div class="result-actions">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp con esta orientación
            </a>
            <button type="button" id="assistantRestartBtn" class="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Reiniciar Asistente
            </button>
          </div>
        </div>
      `;
      assistantBody.innerHTML = html;

      const restartBtn = document.getElementById('assistantRestartBtn');
      if (restartBtn) {
        restartBtn.addEventListener('click', renderStep1);
      }
    };

    // Inicializar asistente en Paso 1
    renderStep1();
  }

  /* ==========================================================================
     FILTROS Y ORDENACIÓN DE PUBLICACIONES (Publicaciones Hub)
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const pubGrid = document.getElementById('pubGrid');
  const pubEmptyState = document.getElementById('pubEmptyState');
  const btnResetFilter = document.getElementById('btnResetFilter');
  const pubSortSelect = document.getElementById('pubSortSelect');

  if (filterTabs.length && pubGrid) {
    let currentFilter = 'all';

    const getCards = () => Array.from(pubGrid.querySelectorAll('.pub-card'));

    const applyFilter = (category) => {
      currentFilter = category;
      let visibleCount = 0;

      filterTabs.forEach(tab => {
        const isMatch = tab.getAttribute('data-filter') === category;
        tab.classList.toggle('is-active', isMatch);
        tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      const cards = getCards();
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const shouldShow = (category === 'all' || cardCat === category);

        if (shouldShow) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (pubEmptyState) {
        pubEmptyState.hidden = (visibleCount > 0);
      }
    };

    const sortCards = (order) => {
      const cards = getCards();
      cards.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date') || '1970-01-01').getTime();
        const dateB = new Date(b.getAttribute('data-date') || '1970-01-01').getTime();
        return (order === 'oldest') ? (dateA - dateB) : (dateB - dateA);
      });

      cards.forEach(card => {
        if (pubEmptyState) {
          pubGrid.insertBefore(card, pubEmptyState);
        } else {
          pubGrid.appendChild(card);
        }
      });

      applyFilter(currentFilter);
    };

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-filter');
        applyFilter(category);
      });
    });

    /* Custom Dropdown Controller */
    const pubSortDropdown = document.getElementById('pubSortDropdown');
    const pubSortTrigger = document.getElementById('pubSortTrigger');
    const pubSortMenu = document.getElementById('pubSortMenu');
    const pubSortCurrent = document.getElementById('pubSortCurrent');
    const sortItems = pubSortMenu ? Array.from(pubSortMenu.querySelectorAll('.sort-dropdown-item')) : [];

    if (pubSortDropdown && pubSortTrigger && pubSortMenu) {
      let isDropdownOpen = false;

      const setDropdownOpen = (open) => {
        isDropdownOpen = open;
        pubSortTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) {
          pubSortMenu.hidden = false;
          // Pequeño retardo para permitir animación de opacidad/transform
          requestAnimationFrame(() => {
            pubSortMenu.classList.add('is-open');
          });
        } else {
          pubSortMenu.classList.remove('is-open');
          setTimeout(() => {
            if (!isDropdownOpen) pubSortMenu.hidden = true;
          }, 150);
        }
      };

      const selectSortOption = (item) => {
        const value = item.getAttribute('data-value');
        const textSpan = item.querySelector('span');
        if (pubSortCurrent && textSpan) {
          pubSortCurrent.textContent = textSpan.textContent;
        }

        sortItems.forEach(opt => {
          const isSelected = (opt === item);
          opt.classList.toggle('is-selected', isSelected);
          opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });

        sortCards(value);
        setDropdownOpen(false);
        pubSortTrigger.focus();
      };

      pubSortTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        setDropdownOpen(!isDropdownOpen);
      });

      sortItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          selectSortOption(item);
        });

        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectSortOption(item);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = sortItems[(sortItems.indexOf(item) + 1) % sortItems.length];
            if (next) next.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = sortItems[(sortItems.indexOf(item) - 1 + sortItems.length) % sortItems.length];
            if (prev) prev.focus();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            setDropdownOpen(false);
            pubSortTrigger.focus();
          }
        });
      });

      pubSortTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          if (!isDropdownOpen) {
            e.preventDefault();
            setDropdownOpen(true);
            const selected = sortItems.find(i => i.classList.contains('is-selected')) || sortItems[0];
            if (selected) setTimeout(() => selected.focus(), 50);
          }
        } else if (e.key === 'Escape' && isDropdownOpen) {
          e.preventDefault();
          setDropdownOpen(false);
        }
      });

      document.addEventListener('click', (e) => {
        if (isDropdownOpen && !pubSortDropdown.contains(e.target)) {
          setDropdownOpen(false);
        }
      });
    }

    if (btnResetFilter) {
      btnResetFilter.addEventListener('click', () => {
        applyFilter('all');
        const firstTab = document.getElementById('tab-all');
        if (firstTab) firstTab.focus();
      });
    }

    // Navegación por teclado accesible en pestañas (WAI-ARIA Tabs)
    const tabList = document.querySelector('.filter-tabs-wrapper');
    if (tabList) {
      tabList.addEventListener('keydown', (e) => {
        const tabs = Array.from(filterTabs);
        const index = tabs.indexOf(document.activeElement);
        if (index === -1) return;

        let nextIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          nextIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        }

        if (nextIndex !== null) {
          e.preventDefault();
          tabs[nextIndex].focus();
          tabs[nextIndex].click();
        }
      });
    }

    // Orden inicial por defecto: más recientes primero
    sortCards('recent');
  }
});