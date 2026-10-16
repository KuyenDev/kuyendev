# KUYÉNDEV NEXT · SISTEMA DE DISEÑO (DESIGN SYSTEM v4.0)

> **Documento:** DESIGN-SYSTEM.md  
> **Proyecto:** KuyénDev Next  
> **Estilo Visual:** *Precision Atelier* (Fusión de Modern Systems y Precision Tech)  
> **Nivel de Accesibilidad:** WCAG 2.2 AA (Ratios de contraste comprobados > 5.5:1)  

---

## 1. Fundamentos del Sistema de Diseño

El nuevo sistema de diseño de KuyénDev Next nace para proyectar sofisticación técnica, claridad editorial y agilidad digital. Se aleja deliberadamente de los gradientes genéricos morado-azul saturados y de las cajas opacas pesadas, apostando por superficies semitranslúcidas de obsidiana, bordes de 1 píxel con gradientes direccionales, tipografía display geométrica y acentos de color con significado operativo.

---

## 2. Tokens de Color (Design Tokens)

```css
:root {
  /* Fondos y Superficies Base (Obsidian Atmosphere) */
  --kd-bg-base: #080c14;             /* Obsidiana espacial profunda */
  --kd-bg-surface: #0e1422;          /* Carbón azulado para tarjetas */
  --kd-bg-surface-elevated: #151d30; /* Superficie elevada para toolbars y modales */
  --kd-bg-surface-hover: #1b253d;    /* Estado hover de componentes */
  --kd-bg-card: rgba(14, 20, 34, 0.75); /* Tarjetas con backdrop-filter */

  /* Tipografía y Contraste */
  --kd-text-primary: #f8fafc;        /* Slate 50 (Contraste 15.2:1 sobre fondo base) */
  --kd-text-secondary: #cbd5e1;      /* Slate 300 (Contraste 10.4:1) */
  --kd-text-muted: #94a3b8;          /* Slate 400 (Contraste 6.1:1 - Cumple WCAG AA) */
  --kd-text-dim: #64748b;            /* Slate 500 para metadatos auxiliares */

  /* Acentos Cromáticos Tecnológicos */
  --kd-indigo: #4f46e5;              /* Índigo eléctrico principal */
  --kd-indigo-hover: #4338ca;
  --kd-indigo-light: #6366f1;
  --kd-indigo-glow: rgba(79, 70, 229, 0.22);

  --kd-cyan: #06b6d4;                /* Cyan Glaciar para métricas y código */
  --kd-cyan-light: #38bdf8;
  --kd-cyan-glow: rgba(6, 182, 212, 0.20);

  --kd-emerald: #10b981;             /* Esmeralda de Garantía y Estados Verificados */
  --kd-emerald-light: #34d399;
  --kd-emerald-glow: rgba(16, 185, 129, 0.18);

  --kd-amber: #f59e0b;               /* Ámbar de advertencia y destacados */
  --kd-whatsapp: #25d366;            /* Verde oficial WhatsApp Business */
  --kd-whatsapp-hover: #20ba59;

  /* Bordes de Precisión de 1px */
  --kd-border-subtle: rgba(255, 255, 255, 0.08);
  --kd-border-medium: rgba(255, 255, 255, 0.14);
  --kd-border-strong: rgba(255, 255, 255, 0.22);
  --kd-border-focus: rgba(79, 70, 229, 0.55);

  /* Sombras y Elevaciones */
  --kd-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.40);
  --kd-shadow-md: 0 8px 24px rgba(0, 0, 0, 0.50);
  --kd-shadow-lg: 0 20px 48px -8px rgba(0, 0, 0, 0.65);
  --kd-shadow-glow: 0 0 32px -4px var(--kd-indigo-glow);

  /* Curvaturas de Esquina (Border Radii) */
  --kd-radius-sm: 8px;
  --kd-radius-md: 12px;
  --kd-radius-lg: 18px;
  --kd-radius-xl: 24px;
  --kd-radius-full: 9999px;

  /* Transiciones Fluidas */
  --kd-ease-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --kd-ease-normal: 250ms cubic-bezier(0.16, 1, 0.3, 1);
  --kd-ease-smooth: 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. Tipografía y Escala Editorial

La arquitectura tipográfica combina una fuente display geométrica de gran presencia con una fuente de cuerpo optimizada para legibilidad en pantalla:

```css
/* Fuentes Oficiales */
--kd-font-display: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
--kd-font-body: 'Inter', system-ui, -apple-system, sans-serif;
--kd-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

### Escala Tipográfica Fluida con `clamp()`:
- **Display Hero (H1 Principal):** `clamp(2.25rem, 5vw, 3.85rem)` · Peso 800 · Tracking `-0.035em` · Interlineado `1.1`.
- **Encabezados de Sección (H2):** `clamp(1.75rem, 3.5vw, 2.5rem)` · Peso 700 · Tracking `-0.025em` · Interlineado `1.2`.
- **Títulos de Módulo y Tarjetas (H3):** `clamp(1.25rem, 2vw, 1.5rem)` · Peso 600 · Tracking `-0.015em`.
- **Subtítulos y Cárdenas (H4):** `1.125rem` (18px) · Peso 600.
- **Párrafo de Cuerpo Principal:** `1rem` (16px) · Peso 400 · Interlineado `1.7` · Tracking `-0.011em`.
- **Texto Auxiliar y Metadatos:** `0.875rem` (14px) · Peso 500 · Interlineado `1.5`.
- **Micro-etiquetas y Badges:** `0.75rem` (12px) · Peso 600 · Tracking `0.04em` · Mayúsculas controladas.

---

## 4. Catálogo de Componentes de Interfaz

### 4.1. Botones (`.btn-kd`)
- `.btn-kd-primary`: Botón de acción principal con fondo índigo (`#4f46e5`), texto blanco, borde sutil y halo de elevación.
- `.btn-kd-secondary`: Botón de acción secundaria con fondo carbón translúcido (`rgba(21, 29, 48, 0.7)`), borde medio y hover iluminado.
- `.btn-kd-whatsapp`: Botón de contacto directo con icono y fondo verde WhatsApp (`#25d366`).
- `.btn-kd-ghost`: Botón minimalista de texto con flecha interactiva orientada a la lectura de artículos y casos de estudio.

### 4.2. Badges de Estado y Categoría (`.badge-kd`)
- `.badge-kd-web`: Indicador de desarrollo web (Índigo + Cyan).
- `.badge-kd-tech`: Indicador de soporte de sistemas (Cyan + Azul).
- `.badge-kd-verified`: Estado verificado de garantía o caso institucional (Emerald con pulso de luz).
- `.badge-kd-b2b`: Solución para empresas e instituciones (Ámbar / Púrpura sutil).

### 4.3. Tarjetas Interactivas (`.card-kd`)
- Tarjetas con fondo translúcido (`backdrop-filter: blur(12px)`), borde de 1px en `rgba(255, 255, 255, 0.08)`, elevación suave en hover (`translateY(-4px)`), y cálculo dinámico de spotlight direccional (`--mouse-x`, `--mouse-y`) en dispositivos de puntero fino.

### 4.4. Comparador de Planes (`.pricing-table-kd`)
- Estructura modular adaptable: en escritorio, tabla comparativa de doble entrada con columnas destacadas para el plan recomendado; en móvil, tarjetas verticales expandibles con acordeones de características detalladas.

### 4.5. Navegación Principal Sticky (`.nav-next`)
- Barra superior flotante con efecto cristal (`backdrop-filter: blur(16px)`), logotipo vectorial horizontal, enlaces con indicador activo (`border-bottom` fluido), selector de línea comercial rápido y menú lateral para móviles con cierre por tecla `Escape`.
