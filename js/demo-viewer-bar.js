/**
 * KUYÉNDEV · BARRA DE MODO DEMOSTRACIÓN PARA CLIENTES (Demo Viewer Bar)
 * Se inyecta automáticamente en cada una de las demostraciones interactivas.
 * - Oculta automáticamente la barra cuando la página se carga dentro del iframe de vista previa (?preview=1 o window.self !== window.top).
 * - Permite regresar al catálogo, identificar el estilo actual, navegar al estilo anterior/siguiente,
 *   alternar vista Escritorio / Tablet / Móvil, inspeccionar la paleta cromática y ocultar la barra sin distracciones.
 */

(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const isIframePreview = params.get('preview') === '1' || window.self !== window.top;

  // Si estamos dentro de la miniatura en vivo del catálogo o en el simulador de dispositivo interno, no mostrar la barra
  if (isIframePreview) {
    document.documentElement.classList.add('kd-is-preview-embed');
    const style = document.createElement('style');
    style.textContent = `
      html.kd-is-preview-embed::-webkit-scrollbar { display: none !important; }
      html.kd-is-preview-embed { scrollbar-width: none !important; pointer-events: none; user-select: none; }
    `;
    document.head.appendChild(style);
    return;
  }

  function initDemoBar() {
    const config = window.KUYENDEV_RUBROS_CONFIG;
    if (!config || !Array.isArray(config.rubros)) return;

    const path = window.location.pathname;
    let currentRubro = null;
    let currentStyle = null;
    let currentStyleIndex = -1;

    // Detectar rubro y estilo según la URL actual o atributos data en <body>
    const bodyRubroId = document.body.getAttribute('data-rubro-id');
    const bodyStyleId = document.body.getAttribute('data-style-id');

    for (const r of config.rubros) {
      if (bodyRubroId && r.id === bodyRubroId && Array.isArray(r.styles)) {
        const idx = r.styles.findIndex(s => s.id === bodyStyleId);
        if (idx !== -1) {
          currentRubro = r;
          currentStyle = r.styles[idx];
          currentStyleIndex = idx;
          break;
        }
      }
      if (Array.isArray(r.styles)) {
        const idx = r.styles.findIndex(s => s.demoPage && path.endsWith(s.demoPage.replace(/^demos\//, '')));
        if (idx !== -1) {
          currentRubro = r;
          currentStyle = r.styles[idx];
          currentStyleIndex = idx;
          break;
        }
      }
    }

    // Fallback si estamos en demos/fotografia/XX-id.html
    if (!currentStyle) {
      for (const r of config.rubros) {
        if (!Array.isArray(r.styles)) continue;
        const idx = r.styles.findIndex(s => path.includes(`${s.number}-${s.id}`) || path.includes(s.id));
        if (idx !== -1) {
          currentRubro = r;
          currentStyle = r.styles[idx];
          currentStyleIndex = idx;
          break;
        }
      }
    }

    if (!currentRubro || !currentStyle) return;

    const styles = currentRubro.styles;
    const total = styles.length;
    const prevStyle = styles[(currentStyleIndex - 1 + total) % total];
    const nextStyle = styles[(currentStyleIndex + 1) % total];

    const resolveDemoHref = (styleObj) => {
      if (styleObj.demoPage) {
        return `../../${styleObj.demoPage}`;
      }
      return `${styleObj.number}-${styleObj.id}.html`;
    };

    const waText = encodeURIComponent(
      `Hola Franco, estuve explorando la demostración interactiva "${currentStyle.number}. ${currentStyle.name}" (${currentRubro.shortName}) en KuyénDev y me gustaría cotizar un sitio web con este estilo.`
    );
    const waLink = `https://wa.me/${config.supportPhone || '56922231780'}?text=${waText}`;

    // Inyectar estilos encapsulados de la barra de demostración
    const css = document.createElement('style');
    css.id = 'kd-demo-viewer-styles';
    css.textContent = `
      .kd-demo-bar-root {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2147483640;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        color: #F4F8FC;
        max-width: calc(100vw - 24px);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
      }
      .kd-demo-bar-root.is-minimized .kd-demo-dock {
        display: none;
      }
      .kd-demo-bar-root:not(.is-minimized) .kd-demo-restore-pill {
        display: none;
      }
      .kd-demo-dock {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: rgba(8, 15, 28, 0.92);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(39, 199, 212, 0.38);
        border-radius: 999px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75), 0 0 28px rgba(39, 199, 212, 0.2);
        flex-wrap: nowrap;
        white-space: nowrap;
      }
      .kd-demo-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 12px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(22, 38, 58, 0.75);
        color: #E2E8F0;
        font-size: 12px;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;
        line-height: 1;
      }
      .kd-demo-btn:hover {
        background: rgba(39, 199, 212, 0.18);
        border-color: #27C7D4;
        color: #FFFFFF;
      }
      .kd-demo-btn.is-active {
        background: #27C7D4;
        border-color: #27C7D4;
        color: #061118;
        font-weight: 700;
      }
      .kd-demo-btn-cta {
        background: linear-gradient(135deg, #27C7D4 0%, #2866BA 100%);
        border-color: rgba(101, 224, 221, 0.5);
        color: #FFFFFF;
        font-weight: 700;
      }
      .kd-demo-btn-cta:hover {
        filter: brightness(1.1);
        color: #FFFFFF;
      }
      .kd-demo-btn svg {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
      }
      .kd-demo-badge-info {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 8px;
        border-left: 1px solid rgba(255, 255, 255, 0.12);
        border-right: 1px solid rgba(255, 255, 255, 0.12);
      }
      .kd-demo-style-num {
        background: rgba(39, 199, 212, 0.18);
        border: 1px solid rgba(39, 199, 212, 0.4);
        color: #65E0DD;
        font-size: 11px;
        font-weight: 800;
        padding: 3px 7px;
        border-radius: 999px;
      }
      .kd-demo-style-select {
        background: transparent;
        border: none;
        color: #F4F8FC;
        font-size: 12.5px;
        font-weight: 700;
        cursor: pointer;
        padding-right: 4px;
        max-width: 210px;
        text-overflow: ellipsis;
      }
      .kd-demo-style-select option {
        background: #080F1C;
        color: #F4F8FC;
      }
      .kd-demo-viewport-group {
        display: inline-flex;
        align-items: center;
        background: rgba(16, 28, 45, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 999px;
        padding: 2px;
        gap: 2px;
      }
      .kd-demo-vp-btn {
        border: none;
        background: transparent;
        color: #94A3B8;
        padding: 5px 8px;
        border-radius: 999px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        font-weight: 600;
        transition: all 0.2s ease;
      }
      .kd-demo-vp-btn:hover {
        color: #FFFFFF;
      }
      .kd-demo-vp-btn.is-active {
        background: rgba(39, 199, 212, 0.22);
        color: #65E0DD;
      }
      .kd-demo-vp-btn svg {
        width: 13px;
        height: 13px;
      }
      /* Popover de Paleta & Ficha Técnica */
      .kd-demo-palette-popover {
        position: absolute;
        bottom: calc(100% + 12px);
        left: 50%;
        transform: translateX(-50%) translateY(8px);
        width: min(420px, calc(100vw - 32px));
        background: rgba(10, 18, 32, 0.96);
        backdrop-filter: blur(24px);
        border: 1px solid rgba(39, 199, 212, 0.4);
        border-radius: 16px;
        padding: 16px 18px;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.85);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        white-space: normal;
      }
      .kd-demo-palette-popover.is-open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateX(-50%) translateY(0);
      }
      .kd-demo-swatches {
        display: flex;
        gap: 8px;
        margin: 10px 0 12px;
        flex-wrap: wrap;
      }
      .kd-demo-swatch {
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 4px 8px 4px 5px;
        border-radius: 999px;
        font-size: 11px;
        font-family: ui-monospace, monospace;
        color: #E2E8F0;
      }
      .kd-demo-swatch-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
      /* Botón flotante restaurar cuando está minimizado */
      .kd-demo-restore-pill {
        position: fixed;
        bottom: 16px;
        right: 16px;
        background: rgba(8, 15, 28, 0.92);
        border: 1px solid rgba(39, 199, 212, 0.45);
        color: #65E0DD;
        padding: 8px 14px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65);
      }
      /* Simulador de Dispositivo (Tablet / Móvil) */
      .kd-viewport-simulator-overlay {
        position: fixed;
        inset: 0;
        background: #050911;
        z-index: 2147483630;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 20px 16px 86px;
        overflow: hidden;
      }
      .kd-viewport-simulator-overlay.is-active {
        display: flex;
      }
      .kd-viewport-frame-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .kd-viewport-iframe {
        background: #fff;
        border: 8px solid #1E293B;
        border-radius: 28px;
        box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(39, 199, 212, 0.3);
        height: 100%;
        max-height: 860px;
        transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @media (max-width: 900px) {
        .kd-demo-viewport-group,
        .kd-demo-hide-sm {
          display: none !important;
        }
        .kd-demo-dock {
          padding: 6px 10px;
          gap: 6px;
        }
        .kd-demo-style-select {
          max-width: 135px;
        }
      }
    `;
    document.head.appendChild(css);

    // Crear contenedor de la barra
    const barRoot = document.createElement('div');
    barRoot.className = 'kd-demo-bar-root';
    barRoot.setAttribute('role', 'region');
    barRoot.setAttribute('aria-label', 'Barra de navegación del catálogo de demostraciones KuyénDev');

    const optionsHtml = styles.map((s) => `
      <option value="${resolveDemoHref(s)}" ${s.id === currentStyle.id ? 'selected' : ''}>
        #${s.number} · ${s.name}
      </option>
    `).join('');

    const swatchesHtml = (currentStyle.palette || []).map(c => `
      <span class="kd-demo-swatch">
        <span class="kd-demo-swatch-dot" style="background:${c}"></span>
        ${c}
      </span>
    `).join('');

    barRoot.innerHTML = `
      <div class="kd-demo-palette-popover" id="kdDemoPalettePopover">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#65E0DD;">
            Estilo #${currentStyle.number} · ${currentStyle.categoryLabel || ''}
          </span>
          <span style="font-size:11px;color:#94A3B8;">${currentRubro.shortName}</span>
        </div>
        <div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:4px;">${currentStyle.name}</div>
        <p style="font-size:12px;color:#A9BACB;line-height:1.45;margin:0 0 8px 0;">${currentStyle.description}</p>
        <div style="font-size:11px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:0.05em;">Paleta de Colores:</div>
        <div class="kd-demo-swatches">${swatchesHtml}</div>
        <div style="font-size:11px;color:#A9BACB;margin-bottom:10px;">
          <strong style="color:#65E0DD;">Tipografías:</strong> ${currentStyle.fonts || 'Personalizadas'}
        </div>
        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="kd-demo-btn kd-demo-btn-cta" style="width:100%;justify-content:center;padding:9px 14px;">
          Cotizar mi Sitio Web con este Estilo
        </a>
      </div>

      <div class="kd-demo-dock">
        <a href="../../index.html#portafolio-rubros" class="kd-demo-btn" title="Volver al catálogo de 20 estilos">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          <span>Catálogo</span>
        </a>

        <div class="kd-demo-badge-info">
          <span class="kd-demo-style-num">${currentStyle.number}/${total}</span>
          <select class="kd-demo-style-select" id="kdDemoStyleSelect" aria-label="Cambiar de estilo de diseño">
            ${optionsHtml}
          </select>
        </div>

        <a href="${resolveDemoHref(prevStyle)}" class="kd-demo-btn" title="Estilo anterior: ${prevStyle.name}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <a href="${resolveDemoHref(nextStyle)}" class="kd-demo-btn" title="Siguiente estilo: ${nextStyle.name}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
        </a>

        <div class="kd-demo-viewport-group" role="group" aria-label="Vista de dispositivo">
          <button type="button" class="kd-demo-vp-btn is-active" data-vp="desktop" title="Vista Escritorio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            <span class="kd-demo-hide-sm">PC</span>
          </button>
          <button type="button" class="kd-demo-vp-btn" data-vp="tablet" title="Vista Tablet (768px)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </button>
          <button type="button" class="kd-demo-vp-btn" data-vp="mobile" title="Vista Celular (390px)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            <span class="kd-demo-hide-sm">Móvil</span>
          </button>
        </div>

        <button type="button" class="kd-demo-btn" id="kdDemoPaletteBtn" title="Ver paleta de colores y tipografías">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
          <span class="kd-demo-hide-sm">Paleta</span>
        </button>

        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="kd-demo-btn kd-demo-btn-cta">
          <span>Cotizar</span>
        </a>

        <button type="button" class="kd-demo-btn" id="kdDemoMinimizeBtn" title="Ocultar barra para ver sin distracciones">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </div>

      <button type="button" class="kd-demo-restore-pill" id="kdDemoRestoreBtn" title="Mostrar barra del catálogo KuyénDev">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="18 15 12 9 6 15"/></svg>
        <span>#${currentStyle.number} ${currentStyle.name} · Catálogo</span>
      </button>
    `;

    document.body.appendChild(barRoot);

    // Simulador de viewport (Tablet / Móvil)
    let simOverlay = null;
    let simIframe = null;
    const ensureSimulator = () => {
      if (simOverlay) return;
      simOverlay = document.createElement('div');
      simOverlay.className = 'kd-viewport-simulator-overlay';
      simOverlay.innerHTML = `
        <div class="kd-viewport-frame-wrap">
          <iframe class="kd-viewport-iframe" title="Vista previa responsive"></iframe>
        </div>
      `;
      document.body.appendChild(simOverlay);
      simIframe = simOverlay.querySelector('iframe');
      const url = new URL(window.location.href);
      url.searchParams.set('preview', '1');
      simIframe.src = url.toString();
    };

    const vpBtns = barRoot.querySelectorAll('.kd-demo-vp-btn');
    vpBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-vp');
        vpBtns.forEach(b => b.classList.toggle('is-active', b === btn));
        if (mode === 'desktop') {
          if (simOverlay) simOverlay.classList.remove('is-active');
          document.body.style.overflow = '';
        } else {
          ensureSimulator();
          simOverlay.classList.add('is-active');
          simIframe.style.width = mode === 'mobile' ? '390px' : '768px';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Selector rápido de estilos
    const selectEl = document.getElementById('kdDemoStyleSelect');
    if (selectEl) {
      selectEl.addEventListener('change', (e) => {
        window.location.href = e.target.value;
      });
    }

    // Popover de paleta
    const paletteBtn = document.getElementById('kdDemoPaletteBtn');
    const palettePopover = document.getElementById('kdDemoPalettePopover');
    if (paletteBtn && palettePopover) {
      paletteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        palettePopover.classList.toggle('is-open');
        paletteBtn.classList.toggle('is-active', palettePopover.classList.contains('is-open'));
      });
      document.addEventListener('click', (e) => {
        if (!palettePopover.contains(e.target) && e.target !== paletteBtn) {
          palettePopover.classList.remove('is-open');
          paletteBtn.classList.remove('is-active');
        }
      });
    }

    // Minimizar / Restaurar barra
    const minBtn = document.getElementById('kdDemoMinimizeBtn');
    const restoreBtn = document.getElementById('kdDemoRestoreBtn');
    if (minBtn && restoreBtn) {
      minBtn.addEventListener('click', () => barRoot.classList.add('is-minimized'));
      restoreBtn.addEventListener('click', () => barRoot.classList.remove('is-minimized'));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDemoBar);
  } else {
    initDemoBar();
  }
})();

