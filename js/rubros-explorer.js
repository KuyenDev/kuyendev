/**
 * KUYÉNDEV · EXPLORADOR INTERACTIVO DE CARPETAS POR RUBRO
 * Renderiza el sistema de carpetas de rubros y vitrina de 15 estilos para fotógrafos.
 */

(function () {
  'use strict';

  // Detección exacta de la raíz del proyecto a partir de la URL de este script
  const currentScriptEl = document.currentScript || document.querySelector('script[src*="rubros-explorer.js"]');
  const isSubfolder = window.location.pathname.includes('/pages/') || 
                      window.location.pathname.includes('/demos/');
  const rootPrefix = (currentScriptEl && currentScriptEl.src)
    ? new URL('../', currentScriptEl.src).href
    : (isSubfolder ? '../' : '');

  // Iconos SVG reutilizables
  const ICONS = {
    camera: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
    scissors: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
    activity: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    coffee: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
    briefcase: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    folder: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    zoom: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
    target: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    external: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>`,
    check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
    arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
  };

  class RubroFolderExplorer {
    constructor(container) {
      this.container = container;
      this.config = window.KUYENDEV_RUBROS_CONFIG;
      if (!this.config) {
        console.warn('KUYENDEV_RUBROS_CONFIG no encontrado.');
        return;
      }
      this.currentRubroId = this.config.activeRubroDefault || 'fotografia';
      this.currentFilter = 'all';
      this.currentModalStyleIndex = 0;

      this.init();
    }

    getActiveRubro() {
      return this.config.rubros.find(r => r.id === this.currentRubroId) || this.config.rubros[0];
    }

    getActiveRubroStyles() {
      const active = this.getActiveRubro();
      return (active && active.styles) ? active.styles : [];
    }

    init() {
      this.render();
      this.createModal();
      this.attachEvents();
    }

    render() {
      const rubros = this.config.rubros;
      const activeRubro = this.getActiveRubro();

      let html = `
        <div class="rubro-folder-system">
          <!-- Pestañas Superiores de Carpetas -->
          <div class="rubro-folder-nav-wrapper">
            <div class="rubro-folder-tabs" role="tablist" aria-label="Carpetas de Ejemplos por Rubro">
              ${rubros.map(rubro => {
                const isActive = rubro.id === this.currentRubroId;
                const iconSvg = ICONS[rubro.icon] || ICONS.folder;
                return `
                  <button type="button" 
                          role="tab" 
                          class="rubro-folder-tab ${isActive ? 'is-active' : ''}" 
                          data-rubro-id="${rubro.id}"
                          aria-selected="${isActive ? 'true' : 'false'}"
                          id="tab-${rubro.id}"
                          aria-controls="panel-${rubro.id}">
                    <span class="tab-icon">${iconSvg}</span>
                    <span>${rubro.name}</span>
                    <span class="tab-badge">${rubro.badge}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Contenido Interior de la Carpeta -->
          <div class="rubro-folder-sheet" 
               id="panel-${activeRubro.id}" 
               role="tabpanel" 
               aria-labelledby="tab-${activeRubro.id}">
            ${this.renderSheetContent(activeRubro)}
          </div>
        </div>
      `;

      this.container.innerHTML = html;
      this.bindTabEvents();
      this.initLivePreviews();
    }

    initLivePreviews() {
      const wraps = this.container.querySelectorAll('.style-live-preview-wrap');
      if (!wraps.length) return;

      const updateScale = (wrap) => {
        const w = wrap.clientWidth || 360;
        const scale = w / 1280;
        wrap.style.setProperty('--kd-preview-scale', scale.toFixed(4));
      };

      wraps.forEach(updateScale);

      if ('ResizeObserver' in window) {
        if (this._ro) this._ro.disconnect();
        this._ro = new ResizeObserver((entries) => {
          for (const entry of entries) {
            updateScale(entry.target);
          }
        });
        wraps.forEach(w => this._ro.observe(w));
      }

      const loadIframe = (wrap) => {
        const iframe = wrap.querySelector('iframe[data-src]');
        if (!iframe || iframe.getAttribute('src')) return;
        iframe.addEventListener('load', () => {
          try {
            const doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
            const bodyText = (doc && doc.body && doc.body.innerText) ? doc.body.innerText.trim() : '';
            const isErrorPage = !doc || !doc.body || bodyText.startsWith('Cannot GET') || (doc.title && doc.title.toLowerCase().includes('404'));
            if (!isErrorPage) {
              wrap.classList.add('is-loaded');
            }
          } catch (err) {
            wrap.classList.add('is-loaded');
          }
        }, { once: true });
        iframe.setAttribute('src', iframe.getAttribute('data-src'));
      };

      if ('IntersectionObserver' in window) {
        if (this._io) this._io.disconnect();
        this._io = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            loadIframe(entry.target);
            obs.unobserve(entry.target);
          });
        }, { rootMargin: '320px 0px' });
        wraps.forEach(w => this._io.observe(w));
      } else {
        wraps.forEach(loadIframe);
      }
    }

    renderSheetContent(rubro) {
      if (rubro.styles && rubro.styles.length > 0) {
        return this.renderStylesCollectionFolder(rubro);
      } else if (rubro.demoUrl) {
        return this.renderSingleShowcaseFolder(rubro);
      } else {
        return this.renderTeaserFolder(rubro);
      }
    }

    renderStylesCollectionFolder(rubro) {
      const styles = rubro.styles || [];
      const filteredStyles = this.currentFilter === 'all'
        ? styles
        : styles.filter(s => s.category === this.currentFilter);

      const iconSvg = ICONS[rubro.icon] || ICONS.folder;

      let demoBannerHtml = '';
      if (rubro.demoUrl) {
        demoBannerHtml = `
          <!-- Banner de Demostración en vivo -->
          <div class="photographer-lumen-banner">
            <div class="lumen-banner-info">
              <div class="badge-kd badge-kd-indigo" style="margin-bottom: 0.5rem; display: inline-flex;">${rubro.demoBadge || 'Demostración Funcional en Vivo'}</div>
              <div class="lumen-banner-title">${rubro.demoTitle || 'Sitio Web Completo en Vivo'}</div>
              <p class="lumen-banner-desc">
                ${rubro.demoDesc || 'Comprueba la velocidad de navegación instantánea, el diseño interactivo y la experiencia de usuario en un sitio completo:'}
              </p>
            </div>
            <div>
              <a href="${rootPrefix}${rubro.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-kd btn-kd-primary">
                Explorar Sitio en Vivo
                ${ICONS.external}
              </a>
            </div>
          </div>
        `;
      }

      return `
        <!-- Encabezado del Rubro -->
        <div class="rubro-sheet-header">
          <div class="rubro-sheet-title-box">
            <span class="rubro-sheet-tag">
              ${iconSvg}
              ${rubro.tagline || rubro.name}
            </span>
            <h3 class="rubro-sheet-title">${styles.length} Estilos de Diseño Web Exclusivos para ${rubro.shortName || rubro.name}</h3>
            <p class="rubro-sheet-desc">${rubro.description}</p>
          </div>
          <div class="rubro-sheet-stats">
            <div>
              <div class="rubro-sheet-stat-val">${styles.length}</div>
              <div class="rubro-sheet-stat-lbl">Estilos de Autor</div>
            </div>
            <div style="width: 1px; height: 32px; background: var(--kd-border-subtle);"></div>
            <div>
              <div class="rubro-sheet-stat-val">100%</div>
              <div class="rubro-sheet-stat-lbl">Código a Medida</div>
            </div>
          </div>
        </div>

        <!-- Filtros por Categoría de Estilo -->
        ${rubro.filters && rubro.filters.length > 0 ? `
          <div class="style-filter-nav" role="toolbar" aria-label="Filtrar estilos de ${rubro.shortName || rubro.name}">
            <span class="style-filter-label">Filtrar Colección:</span>
            ${rubro.filters.map(filter => `
              <button type="button" 
                      class="style-filter-btn ${this.currentFilter === filter.id ? 'is-active' : ''}" 
                      data-filter-id="${filter.id}">
                ${filter.label}
              </button>
            `).join('')}
          </div>
        ` : ''}

        <!-- Grilla de Tarjetas de Estilos -->
        <div class="photographer-styles-grid" id="stylesCollectionGrid">
          ${filteredStyles.map(style => this.renderStyleCard(style, rubro)).join('')}
        </div>

        ${demoBannerHtml}
      `;
    }

    renderStyleCard(style, rubro) {
      const activeRubro = rubro || this.getActiveRubro();
      const rubroLabel = activeRubro ? activeRubro.shortName : 'mi negocio';
      const imageSrc = `${rootPrefix}${style.image}`;
      const hasLiveDemo = Boolean(style.demoPage);
      const demoHref = hasLiveDemo ? `${rootPrefix}${style.demoPage}` : (activeRubro && activeRubro.demoUrl ? `${rootPrefix}${activeRubro.demoUrl}` : '#');

      const thumbMediaHtml = hasLiveDemo
        ? `
          <div class="style-live-preview-wrap" title="Vista previa en vivo de ${style.name}">
            <div class="style-live-browser-bar">
              <span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span>
              <span class="browser-url">${style.demoPage}</span>
              <span class="browser-live-pill">LIVE HTML</span>
            </div>
            <div class="style-live-viewport">
              <div class="style-live-loader" aria-hidden="true">
                <span class="style-live-spinner"></span>
              </div>
              <iframe class="style-live-iframe" data-src="${demoHref}?preview=1&v=2" title="Demostración en vivo: ${style.name}" loading="lazy" tabindex="-1"></iframe>
            </div>
          </div>
        `
        : `<img src="${imageSrc}" alt="${style.name} - Diseño Web ${rubroLabel} KuyénDev" loading="lazy" onerror="this.onerror=null; this.src='${imageSrc}';">`;

      return `
        <article class="style-card" data-style-id="${style.id}">
          <div class="style-card-thumb" ${hasLiveDemo ? `data-action="open-demo" data-demo-url="${demoHref}"` : `data-action="open-modal" data-style-id="${style.id}"`}>
            <span class="style-badge-num">#${style.number}</span>
            <span class="style-badge-cat">${(style.categoryLabel || '').split(' ')[0]}</span>
            ${thumbMediaHtml}
            <div class="style-card-overlay">
              ${ICONS.external}
              <span>${hasLiveDemo ? 'Abrir Demostración en Nueva Pestaña' : 'Ver Detalles & Paleta'}</span>
            </div>
          </div>

          <div class="style-card-body">
            <div>
              <div class="style-card-header">
                <h4 class="style-card-title">${style.number}. ${style.name}</h4>
                <p class="style-card-desc">${style.description}</p>
              </div>

              <div class="style-ideal-pill">
                ${ICONS.target}
                <div>
                  <strong>Ideal:</strong> ${style.ideal}
                </div>
              </div>

              <div class="style-features-row">
                ${style.features.map(f => `<span class="style-feature-tag">${f}</span>`).join('')}
              </div>
            </div>

            <div class="style-card-actions">
              <button type="button" class="btn-kd btn-kd-secondary btn-kd-sm" data-action="open-modal" data-style-id="${style.id}">
                ${ICONS.zoom}
                Detalles & Paleta
              </button>
              <a href="${demoHref}" target="_blank" rel="noopener noreferrer" class="btn-kd btn-kd-primary btn-kd-sm" style="color: #061118;">
                ${ICONS.external}
                Ver Demostración
              </a>
            </div>
          </div>
        </article>
      `;
    }

    renderSingleShowcaseFolder(rubro) {
      const demoFullUrl = `${rootPrefix}${rubro.demoUrl}`;
      const waText = encodeURIComponent(`Hola Franco, me interesa cotizar una página web para el rubro "${rubro.name}" basada en la demo "${rubro.demoTitle}".`);
      const waLink = `https://wa.me/${this.config.supportPhone}?text=${waText}`;

      return `
        <!-- Encabezado del Rubro -->
        <div class="rubro-sheet-header">
          <div class="rubro-sheet-title-box">
            <span class="rubro-sheet-tag">
              ${ICONS[rubro.icon] || ICONS.folder}
              ${rubro.tagline}
            </span>
            <h3 class="rubro-sheet-title">${rubro.name}</h3>
            <p class="rubro-sheet-desc">${rubro.description}</p>
          </div>
          <div class="rubro-sheet-stats">
            <div>
              <div class="rubro-sheet-stat-val">100%</div>
              <div class="rubro-sheet-stat-lbl">Interactiva</div>
            </div>
            <div style="width: 1px; height: 32px; background: var(--kd-border-subtle);"></div>
            <div>
              <div class="rubro-sheet-stat-val">&lt; 1s</div>
              <div class="rubro-sheet-stat-lbl">Velocidad Móvil</div>
            </div>
          </div>
        </div>

        <!-- Showcase de 2 columnas -->
        <div class="rubro-single-showcase">
          <div class="rubro-single-thumb">
            <img src="${rubro.demoImage}" alt="${rubro.demoTitle}" loading="lazy">
          </div>
          <div class="rubro-single-content">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
              ${rubro.badges ? rubro.badges.map(b => `<span class="badge-kd badge-kd-cyan" style="font-size: 0.725rem;">${b}</span>`).join('') : ''}
            </div>
            <h3>${rubro.demoTitle}</h3>
            <p>${rubro.demoDesc}</p>

            <ul class="rubro-features-list">
              ${rubro.features.map(f => `
                <li>
                  ${ICONS.check}
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem;">
              <a href="${demoFullUrl}" target="_blank" rel="noopener noreferrer" class="btn-kd btn-kd-primary">
                Explorar Sitio Web en Vivo
                ${ICONS.external}
              </a>
              <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-kd btn-kd-secondary">
                ${ICONS.whatsapp}
                Cotizar para mi Negocio
              </a>
            </div>
          </div>
        </div>
      `;
    }

    renderTeaserFolder(rubro) {
      const waText = encodeURIComponent(`Hola Franco, me interesa proponer o encargar un proyecto web a medida para el rubro "${rubro.name}".`);
      const waLink = `https://wa.me/${this.config.supportPhone}?text=${waText}`;

      return `
        <div class="rubro-teaser-card">
          <div class="rubro-teaser-icon">
            ${ICONS[rubro.icon] || ICONS.folder}
          </div>
          <div class="badge-kd badge-kd-cyan" style="margin-bottom: 0.75rem; display: inline-flex;">Rubro en Desarrollo Activo</div>
          <h3 style="font-size: 1.75rem; margin-bottom: 0.75rem; color: var(--kd-text-primary);">${rubro.name}</h3>
          <p style="font-size: 0.95rem; color: var(--kd-text-secondary); line-height: 1.6; margin-bottom: 2rem;">
            ${rubro.description}
          </p>

          <div style="text-align: left; background: rgba(22, 38, 58, 0.5); padding: 1.5rem; border-radius: var(--kd-radius-sm); border: 1px solid var(--kd-border-subtle); margin-bottom: 2rem;">
            <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--kd-cyan-light); margin-bottom: 0.75rem;">
              Características que incluirá este rubro:
            </div>
            <ul class="rubro-features-list" style="margin: 0;">
              ${rubro.features.map(f => `
                <li>
                  ${ICONS.check}
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-kd btn-kd-primary">
            ${ICONS.whatsapp}
            Solicitar Evaluación Temprana para ${rubro.shortName}
          </a>
        </div>
      `;
    }

    switchRubro(rubroId) {
      if (!rubroId || rubroId === this.currentRubroId) return;
      this.currentRubroId = rubroId;
      this.currentFilter = 'all';
      this.currentModalStyleIndex = 0;
      this.render();
    }

    setFilter(filterId) {
      if (!filterId) return;
      this.currentFilter = filterId;

      const filterBtns = this.container.querySelectorAll('.style-filter-btn');
      filterBtns.forEach(btn => {
        const id = btn.dataset.filterId || btn.getAttribute('data-filter-id');
        btn.classList.toggle('is-active', id === filterId);
      });

      const grid = this.container.querySelector('#stylesCollectionGrid') || 
                   this.container.querySelector('#photographerStylesGrid');
      if (grid) {
        const styles = this.getActiveRubroStyles();
        const filteredStyles = this.currentFilter === 'all'
          ? styles
          : styles.filter(s => s.category === this.currentFilter);
        const activeRubro = this.getActiveRubro();
        grid.innerHTML = filteredStyles.map(style => this.renderStyleCard(style, activeRubro)).join('');
        this.initLivePreviews();
      }
    }

    bindTabEvents() {
      // Eventos gestionados centralmente mediante delegación en attachEvents()
    }

    bindCardEvents() {
      // Eventos gestionados centralmente mediante delegación en attachEvents()
    }

    createModal() {
      if (document.getElementById('styleLightboxModal')) return;

      const modalHtml = `
        <div class="style-modal-backdrop" id="styleLightboxModal" aria-hidden="true" role="dialog" aria-modal="true" style="visibility: hidden; pointer-events: none;">
          <div class="style-modal-dialog">
            <button type="button" class="style-modal-close" id="modalCloseBtn" aria-label="Cerrar vista previa">
              ${ICONS.close}
            </button>
            <div class="style-modal-img-col" id="modalPreviewCol">
              <img id="modalImg" src="" alt="Vista previa del estilo">
              <iframe id="modalLiveIframe" src="" title="Vista previa interactiva del estilo" style="display:none;width:100%;height:100%;min-height:460px;border:none;background:#090d16;"></iframe>
            </div>
            <div class="style-modal-info-col">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <span class="badge-kd badge-kd-cyan" id="modalBadge">#01</span>
                  <span style="font-size: 0.75rem; color: var(--kd-text-muted); font-weight: 600;" id="modalCounter"></span>
                </div>
                <h3 id="modalTitle" style="font-size: 1.6rem; font-weight: 800; color: var(--kd-text-primary); margin-bottom: 0.75rem; line-height: 1.25;"></h3>
                <p id="modalDesc" style="font-size: 0.925rem; color: var(--kd-text-secondary); line-height: 1.6; margin-bottom: 1.25rem;"></p>

                <div class="style-ideal-pill" id="modalIdealBox">
                  ${ICONS.target}
                  <div>
                    <strong>Ideal:</strong> <span id="modalIdeal"></span>
                  </div>
                </div>

                <div style="font-size: 0.785rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--kd-text-muted); margin-bottom: 0.4rem;">
                  Paleta Cromática & Atmósfera:
                </div>
                <div class="modal-palette-row" id="modalPalette"></div>

                <div style="background: rgba(16, 28, 45, 0.6); padding: 0.85rem 1rem; border-radius: var(--kd-radius-xs); border: 1px solid var(--kd-border-subtle); margin-bottom: 1.25rem;">
                  <div style="font-size: 0.75rem; color: var(--kd-text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 0.25rem;">
                    Tipografías sugeridas:
                  </div>
                  <div id="modalFonts" style="font-size: 0.875rem; color: var(--kd-cyan-light); font-weight: 600;"></div>
                </div>
              </div>

              <div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 1rem;">
                  <a id="modalDemoBtn" href="#" target="_blank" rel="noopener noreferrer" class="btn-kd btn-kd-primary" style="width: 100%; justify-content: center; color: #061118;">
                    ${ICONS.external}
                    Ver Demostración
                  </a>
                  <a id="modalWaBtn" href="#" target="_blank" rel="noopener noreferrer" class="btn-kd btn-kd-secondary" style="width: 100%; justify-content: center;">
                    ${ICONS.whatsapp}
                    Cotizar Estilo
                  </a>
                </div>

                <div class="style-modal-nav-bar">
                  <button type="button" class="btn-kd btn-kd-secondary btn-kd-sm" id="modalPrevBtn">
                    ${ICONS.arrowLeft}
                    Anterior
                  </button>
                  <span style="font-size: 0.8rem; color: var(--kd-text-muted);">Usa las flechas ← → del teclado</span>
                  <button type="button" class="btn-kd btn-kd-secondary btn-kd-sm" id="modalNextBtn">
                    Siguiente
                    ${ICONS.arrowRight}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);

      // Listeners del modal
      const modal = document.getElementById('styleLightboxModal');
      const closeBtn = document.getElementById('modalCloseBtn');
      const prevBtn = document.getElementById('modalPrevBtn');
      const nextBtn = document.getElementById('modalNextBtn');

      closeBtn.addEventListener('click', () => this.closeModal());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });

      prevBtn.addEventListener('click', () => this.stepModal(-1));
      nextBtn.addEventListener('click', () => this.stepModal(1));

      document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('is-open')) return;
        if (e.key === 'Escape') this.closeModal();
        if (e.key === 'ArrowLeft') this.stepModal(-1);
        if (e.key === 'ArrowRight') this.stepModal(1);
      });
    }

    openModalByStyleId(styleId) {
      const styles = this.getActiveRubroStyles();
      const idx = styles.findIndex(s => s.id === styleId);
      if (idx !== -1) {
        this.currentModalStyleIndex = idx;
        this.updateModalContent();
        const modal = document.getElementById('styleLightboxModal');
        if (modal) {
          modal.style.visibility = 'visible';
          modal.style.pointerEvents = 'auto';
          modal.classList.add('is-open');
          modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      }
    }

    stepModal(direction) {
      const styles = this.getActiveRubroStyles();
      const total = styles.length;
      if (total === 0) return;
      this.currentModalStyleIndex = (this.currentModalStyleIndex + direction + total) % total;
      this.updateModalContent();
    }

    updateModalContent() {
      const styles = this.getActiveRubroStyles();
      const style = styles[this.currentModalStyleIndex];
      if (!style) return;

      const activeRubro = this.getActiveRubro();
      const rubroLabel = activeRubro ? activeRubro.shortName : 'mi negocio';

      const modalImg = document.getElementById('modalImg');
      const modalLiveIframe = document.getElementById('modalLiveIframe');
      const modalBadge = document.getElementById('modalBadge');
      const modalCounter = document.getElementById('modalCounter');
      const modalTitle = document.getElementById('modalTitle');
      const modalDesc = document.getElementById('modalDesc');
      const modalIdeal = document.getElementById('modalIdeal');
      const modalPalette = document.getElementById('modalPalette');
      const modalFonts = document.getElementById('modalFonts');
      const modalWaBtn = document.getElementById('modalWaBtn');
      const modalDemoBtn = document.getElementById('modalDemoBtn');

      const imageSrc = `${rootPrefix}${style.image}`;
      const hasLiveDemo = Boolean(style.demoPage);
      const demoHref = hasLiveDemo
        ? `${rootPrefix}${style.demoPage}`
        : (activeRubro && activeRubro.demoUrl ? `${rootPrefix}${activeRubro.demoUrl}` : '#');

      if (hasLiveDemo && modalLiveIframe) {
        modalImg.style.display = 'none';
        modalLiveIframe.style.display = 'block';
        modalLiveIframe.src = `${demoHref}?preview=1`;
      } else {
        if (modalLiveIframe) {
          modalLiveIframe.style.display = 'none';
          modalLiveIframe.src = '';
        }
        modalImg.style.display = 'block';
        modalImg.src = imageSrc;
        modalImg.alt = `${style.name} - Portafolio ${rubroLabel}`;
      }

      if (modalDemoBtn) {
        modalDemoBtn.href = demoHref;
      }

      modalBadge.textContent = `#${style.number} · ${style.categoryLabel}`;
      modalCounter.textContent = `${this.currentModalStyleIndex + 1} de ${styles.length}`;
      modalTitle.textContent = `${style.number}. ${style.name}`;
      modalDesc.textContent = style.description;
      modalIdeal.textContent = style.ideal;
      modalFonts.textContent = style.fonts || 'Inter + Syne';

      // Paleta
      if (style.palette && style.palette.length > 0) {
        modalPalette.innerHTML = style.palette.map(color => `
          <div class="modal-palette-dot" style="background-color: ${color};" title="${color}"></div>
        `).join('') + `<span style="font-size: 0.75rem; color: var(--kd-text-muted); margin-left: 0.5rem;">${style.vibe || ''}</span>`;
      } else {
        modalPalette.innerHTML = '';
      }

      // WhatsApp Button
      const waText = encodeURIComponent(`Hola Franco, me interesa cotizar una página web para ${rubroLabel} con el estilo "${style.number}. ${style.name}" en KuyénDev.`);
      modalWaBtn.href = `https://wa.me/${this.config.supportPhone}?text=${waText}`;
    }

    closeModal() {
      const modal = document.getElementById('styleLightboxModal');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        modal.style.visibility = 'hidden';
        modal.style.pointerEvents = 'none';
        document.body.style.overflow = '';
      }
    }

    attachEvents() {
      // Delegación de eventos centralizada sobre el contenedor del explorador
      this.container.addEventListener('click', (e) => {
        // 1. Clic en pestaña de rubro
        const tab = e.target.closest('.rubro-folder-tab');
        if (tab) {
          e.preventDefault();
          const rubroId = tab.dataset.rubroId || tab.getAttribute('data-rubro-id');
          if (rubroId && rubroId !== this.currentRubroId) {
            this.switchRubro(rubroId);
          }
          return;
        }

        // 2. Clic en botón de filtro de estilos de fotografía
        const filterBtn = e.target.closest('.style-filter-btn');
        if (filterBtn) {
          e.preventDefault();
          const filterId = filterBtn.dataset.filterId || filterBtn.getAttribute('data-filter-id');
          if (filterId && filterId !== this.currentFilter) {
            this.setFilter(filterId);
          }
          return;
        }

        // 3. Clic en miniatura con demostración interactiva directa (abre en pestaña/ventana aparte)
        const demoTrigger = e.target.closest('[data-action="open-demo"]');
        if (demoTrigger) {
          e.preventDefault();
          const demoUrl = demoTrigger.getAttribute('data-demo-url');
          if (demoUrl && demoUrl !== '#') {
            window.open(demoUrl, '_blank', 'noopener,noreferrer');
          }
          return;
        }

        // 4. Clic en disparador de modal de estilo
        const modalTrigger = e.target.closest('[data-action="open-modal"]');
        if (modalTrigger) {
          e.preventDefault();
          e.stopPropagation();
          const styleId = modalTrigger.dataset.styleId || modalTrigger.getAttribute('data-style-id');
          if (styleId) {
            this.openModalByStyleId(styleId);
          }
          return;
        }
      });
    }
  }

  // Inicialización automática cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.rubro-folder-explorer-target');
    containers.forEach(container => {
      new RubroFolderExplorer(container);
    });
  });

  window.RubroFolderExplorer = RubroFolderExplorer;
})();
