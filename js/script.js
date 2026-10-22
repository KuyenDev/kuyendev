/**
 * KUYÉNDEV · SCRIPT DE INTERACCIONES Y EXPERIENCIA DE USUARIO v4.0
 * Estudio Tecnológico: Desarrollo Web & Servicios Informáticos
 * Osorno, Región de Los Lagos, Chile · Asistencia Remota
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Detección de Capacidades del Dispositivo
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 2. Barra Superior de Progreso de Lectura
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

  // 3. Navbar Sticky con Fondo Dinámico al Scroll
  const mainHeader = document.querySelector('header');
  if (mainHeader) {
    let headerTicking = false;
    const updateHeader = () => {
      if (window.scrollY > 35) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
      headerTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!headerTicking) {
        window.requestAnimationFrame(updateHeader);
        headerTicking = true;
      }
    }, { passive: true });
    updateHeader();
  }

  // 4. Menú Móvil Accesible (Hamburger Drawer)
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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
        closeMenu();
        hamburgerBtn.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 960 && mobileMenu.classList.contains('is-active')) {
        closeMenu();
      }
    });
  }

  // 5. Revelado Progresivo con IntersectionObserver
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
      threshold: 0.08
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 6. Micro-Iluminación Spotlight por Ratón (Desktop)
  if (isFinePointer && !prefersReducedMotion) {
    const spotlightCards = document.querySelectorAll('.card-kd, .card-spotlight, .plan-card');
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });
    });
  }

  // 7. Acordeones Accesibles (FAQs)
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Cerrar otros acordeones si se desea comportamiento exclusivo
      const container = item.closest('.accordion-group');
      if (container && container.getAttribute('data-exclusive') !== 'false') {
        container.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            const otherTrigger = other.querySelector('.accordion-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });
      }

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 8. Renderizado Dinámico de Planes Web (si existe contenedor)
  const plansContainer = document.getElementById('plansDynamicContainer');
  if (plansContainer && window.KUYENDEV_PLANS_CONFIG) {
    const config = window.KUYENDEV_PLANS_CONFIG;
    let html = '';

    config.plans.forEach(plan => {
      const waLink = `https://wa.me/${config.supportPhone}?text=${encodeURIComponent(plan.waMessage)}`;
      const isHigh = plan.highlighted;

      html += `
        <article class="card-kd plan-card ${isHigh ? 'card-kd-highlight' : ''} reveal-fade">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <span class="badge-kd ${isHigh ? 'badge-kd-indigo' : 'badge-kd-cyan'}">${plan.badge}</span>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${plan.name}</h3>
            <p style="font-size: 0.875rem; color: var(--kd-text-muted); line-height: 1.5; margin-bottom: 1.5rem;">${plan.tagline}</p>

            <div class="plan-price-box">
              <div class="plan-price-val">${plan.price !== null ? `${config.currencySymbol}${plan.price.toLocaleString('es-CL')}` : plan.priceDisplay}</div>
              <span style="font-size: 0.8rem; color: var(--kd-text-dim); text-transform: uppercase; font-weight: 600;">Modalidad ${plan.period}</span>
            </div>

            <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--kd-text-primary); margin-bottom: 1rem;">
              ${plan.scopeTitle}
            </div>

            <ul class="plan-features-list">
              ${plan.features.map(f => `
                <li class="plan-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style="${f.strong ? 'font-weight: 600; color: var(--kd-text-primary);' : ''}">${f.text}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div style="margin-top: 1.5rem;">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-kd ${isHigh ? 'btn-kd-primary' : 'btn-kd-secondary'}" style="width: 100%;">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              ${plan.ctaText}
            </a>
          </div>
        </article>
      `;
    });

    plansContainer.innerHTML = html;
  }

  // 9. Formulario Inteligente de Cotización Web (Generador a WhatsApp / Email)
  const quoteForm = document.getElementById('quoteSmartForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('quoteName')?.value.trim();
      const business = document.getElementById('quoteBusiness')?.value.trim() || 'No especificado';
      const projectType = document.getElementById('quoteType')?.value;
      const budget = document.getElementById('quoteBudget')?.value || 'A evaluar';
      const details = document.getElementById('quoteDetails')?.value.trim();

      if (!name || !details) {
        alert('Por favor completa tu nombre y una breve descripción del proyecto.');
        return;
      }

      const msg = `*SOLICITUD DE COTIZACIÓN WEB — KUYÉNDEV*\n\n` +
                  `👤 *Nombre:* ${name}\n` +
                  `🏢 *Negocio/Marca:* ${business}\n` +
                  `💻 *Tipo de Sitio:* ${projectType}\n` +
                  `💰 *Rango/Presupuesto:* ${budget}\n` +
                  `📝 *Detalles del Requerimiento:*\n${details}\n\n` +
                  `_Enviado desde el formulario oficial en kuyendev.cl_`;

      const encoded = encodeURIComponent(msg);
      const waUrl = `https://wa.me/56922231780?text=${encoded}`;

      // Feedback visual y apertura
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = `<span>Abriendo WhatsApp...</span>`;
      }

      window.open(waUrl, '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = `<span>Solicitud Enviada ✓</span>`;
        }
      }, 1000);
    });
  }

  // 10. Checklist Interactivo Pre-Formateo (Persistencia en sessionStorage)
  const checklistContainer = document.getElementById('preformatChecklist');
  if (checklistContainer) {
    const items = checklistContainer.querySelectorAll('.checklist-item');
    const badge = document.getElementById('checklistProgressBadge');
    const STORAGE_KEY = 'kd_next_checklist_state';

    let checkedState = {};
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) checkedState = JSON.parse(saved);
    } catch (_) {}

    const updateChecklist = () => {
      let count = 0;
      items.forEach((item, index) => {
        const isChecked = item.classList.contains('is-checked');
        if (isChecked) count++;
        checkedState[index] = isChecked;
      });

      if (badge) {
        badge.textContent = `${count} de ${items.length} verificados`;
        badge.className = count === items.length ? 'badge-kd badge-kd-emerald' : 'badge-kd badge-kd-cyan';
      }

      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(checkedState));
      } catch (_) {}
    };

    items.forEach((item, index) => {
      if (checkedState[index]) {
        item.classList.add('is-checked');
        item.setAttribute('aria-checked', 'true');
      }

      const toggleItem = () => {
        const isChecked = item.classList.contains('is-checked');
        item.classList.toggle('is-checked', !isChecked);
        item.setAttribute('aria-checked', String(!isChecked));
        updateChecklist();
      };

      item.addEventListener('click', toggleItem);
      item.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggleItem();
        }
      });
    });

    updateChecklist();
  }

  // 11. Filtro Interactivo de Noticias y Publicaciones
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const newsCards = document.querySelectorAll('.project-card-item');
  const newsEmptyState = document.getElementById('newsEmptyState');
  const btnResetFilter = document.getElementById('btnResetFilter');

  if (filterTabs.length && newsCards.length) {
    const applyFilter = (cat) => {
      filterTabs.forEach(t => {
        const isMatch = t.getAttribute('data-filter') === cat;
        t.classList.toggle('is-active', isMatch);
        t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      let visibleCount = 0;
      newsCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (newsEmptyState) {
        newsEmptyState.style.display = (visibleCount > 0) ? 'none' : 'block';
      }
    };

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-filter');
        applyFilter(cat);
      });
    });

    if (btnResetFilter) {
      btnResetFilter.addEventListener('click', () => {
        applyFilter('all');
      });
    }
  }

  /* ==========================================================================
     PROTECCIÓN DE CONTENIDO: PREVENIR ARRASTRE, COPIA Y SELECCIÓN NO DESEADA
     ========================================================================== */
  // 1. Evitar arrastrar imágenes y gráficos
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.closest('img, picture, svg')) {
      e.preventDefault();
      return false;
    }
  });

  // 2. Prevenir menú contextual sobre imágenes (evita "Guardar imagen como..." y "Copiar imagen")
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.closest('img, picture, svg')) {
      e.preventDefault();
    }
  });

  // 3. Prevenir copia indebida de texto fuera de campos de formulario
  document.addEventListener('copy', (e) => {
    const active = document.activeElement;
    const isInputField = active && (
      active.tagName === 'INPUT' || 
      active.tagName === 'TEXTAREA' || 
      active.isContentEditable
    );
    if (!isInputField) {
      e.preventDefault();
    }
  });
});