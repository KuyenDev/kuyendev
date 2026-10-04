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

  // 6. Cierre de menú móvil al redimensionar a desktop (>768px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('is-active')) {
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-active');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    }
  });

  // 7. Asistente Interactivo "¿Qué servicio necesito?"
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
        stepIndicator.textContent = step <= 2 ? `Paso ${step} de 2` : 'Recomendación';
      }
    };

    const step1Data = [
      { id: 'lento', title: 'Computador Lento', desc: 'El equipo se congela, tarda en abrir programas o tiene lentitud constante.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
      { id: 'limpiar', title: 'Formateo / Limpieza Total', desc: 'Quiero borrar todo y empezar de cero con una instalación limpia y segura.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>' },
      { id: 'sistema', title: 'Instalar o Cambiar de Sistema', desc: 'Necesito configurar Windows o probar una distribución de Linux.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
      { id: 'office', title: 'Microsoft Office & 365', desc: 'Necesito Word, Excel, PowerPoint o resolver fallos de activación.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' },
      { id: 'error', title: 'Problema Puntual / Soporte', desc: 'Tengo errores de drivers, programas o sospecha de virus.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
      { id: 'empresa', title: 'Múltiples Computadores', desc: 'Empresas, oficinas, pymes o laboratorios de colegios.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>' }
    ];

    const step2Data = {
      lento: {
        title: '¿Cuál es la condición general de tu computador?',
        subtitle: 'Esto nos permite determinar si basta con ajustes de software o conviene reinstalar.',
        options: [
          { id: 'acumulado', title: 'Años de uso con programas acumulados', desc: 'El hardware es bueno o moderno, pero el sistema está lleno de archivos residuales y programas viejos.' },
          { id: 'modesto', title: 'Equipo antiguo o con memoria RAM ajustada', desc: 'El computador tiene especificaciones modestas y le cuesta mover sistemas operativos pesados.' }
        ]
      },
      limpiar: {
        title: '¿Qué prioridad tienes para la reinstalación?',
        subtitle: 'Ambas opciones se realizan con particionado y controladores limpios.',
        options: [
          { id: 'estandar', title: 'Instalación limpia estándar', desc: 'Windows oficial con todas sus funciones habituales y herramientas de trabajo diario.' },
          { id: 'liviano', title: 'Sistema optimizado al máximo (sin bloatware)', desc: 'Versión ligera (como Windows LTSC) priorizando velocidad y eliminando servicios innecesarios.' }
        ]
      },
      sistema: {
        title: '¿Qué entorno prefieres utilizar en tu equipo?',
        subtitle: 'Te asesoramos según la compatibilidad técnica de tus componentes.',
        options: [
          { id: 'windows', title: 'Entorno Windows (10 u 11)', desc: 'Máxima compatibilidad con programas de oficina, juegos y utilidades estándar.' },
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
        title: '¿El equipo puede conectarse a internet?',
        subtitle: 'Nos ayuda a saber si podemos resolverlo de forma remota o presencial.',
        options: [
          { id: 'remoto', title: 'Sí, enciende y tiene conexión estable', desc: 'Podemos evaluar asistencia a distancia mediante RustDesk para resolverlo en minutos.' },
          { id: 'presencial', title: 'No conecta o tiene un fallo más complejo', desc: 'Requiere revisión directa coordinada en Osorno.' }
        ]
      },
      empresa: {
        title: '¿Qué tipo de organización o flota necesitas atender?',
        subtitle: 'Diseñamos planes acordes a la escala y tipo de usuarios.',
        options: [
          { id: 'oficina', title: 'Oficinas / Pymes / Estaciones administrativas', desc: 'Estandarización de puestos de trabajo, Windows estable y suite de productividad.' },
          { id: 'colegio', title: 'Colegios / Laboratorios de estudiantes', desc: 'Protección con Deep Freeze (congelamiento de sistema) y filtros de navegación.' }
        ]
      }
    };

    const recommendations = {
      'lento-acumulado': {
        title: 'Formateo Limpio de Computador / Laptop',
        badge: 'Recomendación Sugerida',
        desc: 'Cuando un computador acumula años de uso, actualizaciones residuales y programas viejos, <strong>el formateo limpio desde cero</strong> es la solución más duradera y honesta. Elimina toda la lentitud de raíz y devuelve la respuesta ágil de fábrica. Incluye 1 mes de garantía.',
        waText: 'Hola Franco, usé el asistente en la web y me recomendó evaluar Formateo Limpio para mi computador lento. Quisiera consultar disponibilidad y coordinar.'
      },
      'lento-modesto': {
        title: 'Optimización Avanzada o Windows LTSC',
        badge: 'Recomendación Sugerida',
        desc: 'Para computadores con hardware modesto o memoria RAM reducida, conviene aplicar <strong>Optimización Avanzada</strong> para reducir procesos en segundo plano, o evaluar <strong>Windows LTSC</strong> para eliminar bloatware y reducir el consumo del sistema. Evaluamos el equipo para recomendarte lo más adecuado.',
        waText: 'Hola Franco, usé el asistente web y me recomendó evaluar Optimización Avanzada o Windows LTSC para mi equipo de especificaciones modestas. Quisiera orientación.'
      },
      'limpiar-estandar': {
        title: 'Formateo Limpio con Controladores Oficiales',
        badge: 'Recomendación Sugerida',
        desc: 'Reinstalación limpia y exhaustiva de sistema operativo, particionado de almacenamiento y despliegue de controladores oficiales correspondientes a tu modelo de PC o laptop. Respaldado con <strong>1 mes de garantía técnica</strong>.',
        waText: 'Hola Franco, quisiera consultar por el servicio de formateo limpio para mi equipo.'
      },
      'limpiar-liviano': {
        title: 'Instalación de Windows Optimizado (LTSC)',
        badge: 'Recomendación Sugerida',
        desc: 'Instalación de una configuración o versión especial de Windows orientada a <strong>máxima estabilidad y bajo consumo de recursos</strong> (como Windows LTSC cuando aplique), sin aplicaciones secundarias que saturen tu disco o memoria.',
        waText: 'Hola Franco, quisiera consultar por la instalación de Windows optimizado (LTSC) para mi computador.'
      },
      'sistema-windows': {
        title: 'Instalación y Configuración de Windows (10 / 11)',
        badge: 'Recomendación Sugerida',
        desc: 'Configuración de Windows en su edición Home, Pro o LTSC según las especificaciones técnicas de tu hardware y las tareas que realizas a diario, garantizando estabilidad y activación funcional.',
        waText: 'Hola Franco, quisiera consultar qué versión o configuración de Windows conviene para mi equipo.'
      },
      'sistema-linux': {
        title: 'Linux & Cambio de Sistema Operativo',
        badge: 'Recomendación Sugerida',
        desc: 'Despliegue de una distribución Linux moderna, amigable y eficiente. Una excelente alternativa para <strong>extender la vida útil de tu hardware</strong> con un entorno veloz, seguro y libre de licencias costosas.',
        waText: 'Hola Franco, quisiera consultar si Linux sería una buena opción para mi computador.'
      },
      'office-nuevo': {
        title: 'Instalación de Microsoft Office & 365',
        badge: 'Recomendación Sugerida',
        desc: 'Puesta en marcha de la suite completa: Word, Excel, PowerPoint y Outlook, asegurando su correcto funcionamiento y activación permanente para que trabajes o estudies sin interrupciones.',
        waText: 'Hola Franco, quisiera consultar por la instalación de Microsoft Office para mi computador.'
      },
      'office-error': {
        title: 'Soporte Remoto para Microsoft Office',
        badge: 'Recomendación Sugerida',
        desc: 'Solucionamos fallos de apertura, problemas de licencia o errores de vinculación. En la mayoría de los casos podemos conectarnos mediante <strong>asistencia remota segura con RustDesk</strong> y dejarlo operativo en minutos.',
        waText: 'Hola Franco, tengo un problema con Microsoft Office y quisiera saber si se puede resolver mediante soporte remoto.'
      },
      'error-remoto': {
        title: 'Asistencia Informática Remota (RustDesk)',
        badge: 'Recomendación Sugerida',
        desc: 'Conexión a distancia encriptada y rápida. Ideal para solucionar controladores que fallan, errores de Windows, ajustes de programas o problemas menores sin mover tu equipo de tu escritorio.',
        waText: 'Hola Franco, tengo un problema de software y quisiera saber si puede resolverse mediante soporte remoto.'
      },
      'error-presencial': {
        title: 'Soporte Técnico Presencial Coordinado',
        badge: 'Recomendación Sugerida',
        desc: 'Evaluación y atención directa en Osorno para fallas de inicio del sistema, imposibilidad de conexión o situaciones donde el equipo deba ser revisado meticulosamente en persona.',
        waText: 'Hola Franco, tengo un problema técnico en mi computador que requiere atención presencial coordinada en Osorno.'
      },
      'empresa-oficina': {
        title: 'Servicios Informáticos para Empresas y Oficinas',
        badge: 'Propuesta B2B',
        desc: 'Formateo masivo, estandarización de puestos de trabajo, Windows estable y suite de productividad para múltiples computadores de oficina, con cotización transparente por volumen.',
        waText: 'Hola Franco, quisiera cotizar servicios informáticos para varios equipos de una oficina/empresa.'
      },
      'empresa-colegio': {
        title: 'Soluciones para Colegios y Laboratorios (Deep Freeze)',
        badge: 'Propuesta Institucional',
        desc: 'Configuración para flotas estudiantiles con <strong>congelamiento Deep Freeze</strong> (inmunidad ante virus y modificaciones de alumnos tras cada reinicio) y filtros seguros de navegación.',
        waText: 'Hola Franco, quisiera consultar por soluciones y optimización de computadores para un colegio/institución.'
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
              Consultar por WhatsApp con este diagnóstico
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
});