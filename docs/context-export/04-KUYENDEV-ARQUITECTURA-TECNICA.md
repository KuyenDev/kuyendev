# KUYÉNDEV · ARQUITECTURA TÉCNICA, STACK Y ESTRUCTURA DEL CÓDIGO

> **Documento:** 04-KUYENDEV-ARQUITECTURA-TECNICA.md  
> **Proyecto:** KuyénDev (Plataforma y Servicios Informáticos)  
> **Titular / Fundador:** Franco Luna  
> **Ubicación:** Osorno, Región de Los Lagos, Chile  
> **Fuentes de Respaldo:** `index.html`, `css/styles.css`, `js/script.js`, `sitemap.xml`, `robots.txt`, `verificar_estructura.sh`, `ESTRUCTURA_REFACTORIZADA.md`.

---

## 1. Stack Tecnológico y Filosofía de Ingeniería

La plataforma web de KuyénDev está construida bajo el principio de **cero dependencias externas pesadas (Zero-Dependency Vanilla Architecture)**. En una época saturada de empaquetadores complejos y sobrecarga de frameworks, la web de KuyénDev implementa tecnologías nativas del estándar web para asegurar tiempos de carga casi instantáneos (< 500 ms), mínima huella de memoria, máxima compatibilidad en navegadores y óptima indexación para motores de búsqueda:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        STACK TECNOLÓGICO KUYÉNDEV                      │
├───────────────────┬────────────────────────────────────────────────────┤
│ Capa Semántica    │ HTML5 Nativo Semántico + WAI-ARIA WCAG 2.1 AA      │
│ Capa de Estilos   │ Vanilla CSS3 Moderno (Custom Properties + Grid)    │
│ Capa Lógica / UI  │ Vanilla JavaScript (ES6+) Nativo (Sin librerías)   │
│ Tipografía        │ Google Fonts (Inter: 400, 500, 600, 700, 800)      │
│ Soporte Remoto    │ RustDesk (Software cliente de soporte seguro)      │
│ Alojamiento       │ GitHub Pages (Entrega estática vía CDN global)    │
│ Dominio / DNS     │ CNAME personalizado vinculado a kuyendev.cl        │
│ Datos Estructurados│ JSON-LD Schema.org (LocalBusiness, FAQPage, etc.) │
└───────────────────┴────────────────────────────────────────────────────┘
```

### Justificación de Elección Técnica:
- **Ausencia de Frameworks (React, Vue, Angular):** No se requieren estados globales complejos de servidor ni hidratación de componentes. El uso de HTML5 puro elimina el procesamiento innecesario de JavaScript en el hilo principal del cliente.
- **Vanilla CSS3 vs. Tailwind:** Permite un control milimétrico sobre los tokens de diseño (variables CSS), encapsulación de selectores y rendimiento de renderizado sin generar miles de clases utilitarias sobrantes.
- **JavaScript ES6+ Nativo:** Utiliza las APIs web nativas más eficientes de los navegadores modernos: `IntersectionObserver` para revelado al scroll, `requestAnimationFrame` para animaciones suaves a 60 FPS, y `sessionStorage` para persistencia de estado local.

---

## 2. Estructura de Directorios del Repositorio

A continuación se presenta el mapa de archivos verificado mediante `find` y el script de integridad `verificar_estructura.sh`:

```text
kuyendev/
├── CNAME                                  # Dominio personalizado apuntando a kuyendev.cl
├── ESTRUCTURA_REFACTORIZADA.md            # Documentación técnica interna de la versión v3.0
├── readme.md                              # Documentación general del repositorio y contacto
├── robots.txt                             # Directivas para rastreadores y enlace al Sitemap
├── sitemap.xml                            # Mapa del sitio XML con las 5 rutas canónicas indexables
├── verificar_estructura.sh                # Script Bash para test de integridad de enlaces y anclas
├── index.html                             # Landing page principal (88.8 KB)
├── css/
│   └── styles.css                         # Hoja de estilos global consolidada (3.013 líneas, 66.7 KB)
├── js/
│   └── script.js                          # Lógica e interacciones UI nativas (788 líneas, 35.9 KB)
├── pages/
│   ├── empresas.html                      # Página B2B para pymes, oficinas y colegios (39.7 KB)
│   ├── publicaciones.html                 # Hub de casos de estudio y guías técnicas (16.7 KB)
│   ├── noticias.html                      # Redirección automática de compatibilidad hacia publicaciones.html
│   ├── terminos.html                      # Términos, condiciones y marco legal (25 cláusulas, 24.3 KB)
│   └── content/
│       ├── bertoldo_hofmann.html          # Caso de estudio: Colegio Bertoldo Hofmann Kahler
│       └── BertoldoHofmannKahler/         # Recursos fotográficos reales del caso institucional
│           ├── BHKcolegio.png             # Fachada del colegio en Purranque (3.13 MB)
│           ├── BHKportada.png             # Foto de portada del laboratorio (1.91 MB)
│           ├── BHKportada.webp            # Versión web optimizada de portada (156 KB)
│           └── BHKscreenshot.png          # Captura de pantalla de sistema optimizado (1.61 MB)
├── images/
│   ├── hero-kuyendev.webp                 # Banner principal del Hero (81 KB)
│   ├── nosotros-kuyendev.webp             # Imagen de estación de trabajo con badge del fundador (122 KB)
│   ├── kuyendev-og.jpg                    # Imagen oficial para Open Graph y Twitter Cards (125 KB)
│   ├── logo-kuyendev-horizontal.png       # Logotipo horizontal oficial (735 KB)
│   ├── logo-kuyendev-horizontal.webp      # Logotipo horizontal optimizado (442 KB)
│   ├── logo-kuyendev-isotipo.png          # Isotipo emblema "K" (1.00 MB)
│   ├── logo-kuyendev-isotipo.webp         # Isotipo optimizado (538 KB)
│   ├── LogoSinFondo.png                   # Variante transparente del logotipo (1.34 MB)
│   ├── LogoSinFondo (recortado).png       # Variante recortada (714 KB)
│   ├── Logo KuyénDev para la Web (recortado).png (126 KB)
│   ├── SSE.png                            # Activo de captura de pantalla (1.73 MB)
│   ├── 3.0/                               # Activos de arte conceptual nocturno v3.0
│   │   ├── Espacio de trabajo nocturno en azul y ámbar.png
│   │   ├── Estación de trabajo tecnológica nocturna.png
│   │   ├── Logotipo K futurista con pulso neón.png
│   │   └── Logotipo tecnológico KUYÉNDEV con emblema K.png
│   ├── instagram/                         # Infografías técnicas publicadas en Instagram
│   │   ├── Formateo u optimizacion.png
│   │   ├── Office fallos.png
│   │   ├── Phishing.png
│   │   ├── Tu computador pide ayuda.png
│   │   └── Tu computador podria tener malware.png
│   └── real-media/                        # Directorio para activos audiovisuales reales futuros
│       ├── README.md                      # Pautas técnicas de incorporación multimedia
│       ├── fundador/                      # (Preparado para fotos de Franco Luna)
│       ├── workspace/                     # (Preparado para fotos del banco de trabajo)
│       ├── trabajos/                      # (Preparado para fotos de intervenciones reales)
│       └── videos/                        # (Preparado para clips de arranque y diagnóstico)
└── icons/                                 # Favicones e iconos vectoriales
    ├── favicon.ico                        # Favicon multirresolución
    ├── favicon-16x16.png                  # Favicon 16px
    ├── favicon-32x32.png                  # Favicon 32px
    ├── apple-touch-icon.png               # Icono para iOS (180px)
    ├── icon-192.png                       # Icono PWA Android (192px)
    ├── icon-512.png                       # Icono PWA Splash (512px)
    ├── KuyenDev_logo_cuadrado_transparente.ico
    └── LogoSinFondo (recortado).svg       # Isotipo vectorial en SVG (11.1 KB)
```

---

## 3. Hoja de Estilos y Sistema de Diseño (`css/styles.css`)

El archivo `css/styles.css` consta de 3.013 líneas y constituye el núcleo visual de todo el ecosistema web. Sus secciones arquitectónicas se distribuyen de la siguiente manera:

1. **Tokens Globales (`:root` L7–60):** Variables CSS para colores (`--bg-base: #070a12`, `--accent-primary: #2563eb`), tipografía, radios de curvatura (`--radius-sm: 10px` a `--radius-full: 9999px`), sombras de profundidad (`--shadow-card`) y curvas de aceleración cúbica (`cubic-bezier`).
2. **Reset y Tipografía Base (L65–120):** `box-sizing: border-box`, `scroll-behavior: smooth`, antialiasing para WebKit y Gecko, y supresión de desbordamientos horizontales.
3. **Mecanismo de Protección Casual de Contenido (L121–152):** Regla global `user-select: none` para textos corporativos e imágenes (`draggable: none`), con excepciones forzadas (`user-select: text !important`) en números de teléfono, correos, enlaces de contacto y bloques interactivos.
4. **Layout y Contenedores (L200–350):** Clases `.container` (máx. 1200px) y `.container-narrow` (máx. 800px) con padding fluido para adaptación móvil.
5. **Navegación Sticky con Glassmorphism (`.nav-glass` L360–500):** Transición suave al scroll mediante la clase `.scrolled`, fondo traslúcido con desenfoque de 16px y menú móvil tipo *drawer* desplegable.
6. **Hero Section y Consola Técnica (L520–750):** Grid asimétrico a 2 columnas con tipografía fluida `clamp()` y tarjeta de consola `.tech-console-card` con micro-bordes y estados visuales (`.status-dot-emerald`).
7. **Catálogo de Servicios y Tarjetas Interactivas (L760–1100):** Tarjetas con borde sutil, badges de categoría, listas de características con checks SVG y paneles desplegables de progressive disclosure (`.service-details-panel`).
8. **Asistente Interactivo y Checklist (L1110–1450):** Estilos para el sistema de pasos del asistente, botones de opciones con feedback visual y checklist interactiva de 4 puntos con barra de progreso.
9. **Módulo de Publicaciones y Dropdown Personalizado (L2200–2600):** Pestañas de filtrado (`.filter-tab`), grid de artículos y menú custom de ordenación accesible (`.sort-dropdown-menu`).
10. **Breakpoints y Media Queries Responsive (L2650–3013):**
    - `@media (max-width: 1024px)`: Ajuste de grids de 3 a 2 columnas y reducción de espaciados.
    - `@media (max-width: 768px)`: Colapso de navegación a menú hamburguesa, stacks verticales en el Hero y tarjetas de servicios a 1 columna.
    - `@media (max-width: 480px)`: Adaptación ergonómica de botones a ancho completo (100% width) y tamaños táctiles mínimos de 44px (WCAG).

---

## 4. Lógica Frontend y Controladores UI (`js/script.js`)

El archivo `js/script.js` está envuelto en un escuchador `DOMContentLoaded` bajo modo estricto (`'use strict'`), organizando 12 módulos funcionales independientes:

| Módulo Lógico | Líneas de Código | Funcionalidad y APIs Utilizadas |
|---|---|---|
| **1. Detección de Capacidades** | L10–13 | Evalúa `prefers-reduced-motion` y `(hover: hover) and (pointer: fine)` para no forzar animaciones en usuarios sensibles o dispositivos táctiles. |
| **2. Protección de Imágenes** | L15–23 | Recorre todos los elementos `<img>` para desactivar el arrastre (`dragstart`) y el menú contextual secundario sobre imágenes protegidas. |
| **3. Barra de Progreso de Scroll** | L26–44 | Mapea el ratio `scrollTop / scrollHeight` y actualiza la propiedad CSS `transform: scaleX(...)` dentro de un ciclo `window.requestAnimationFrame`. |
| **4. Revelado Suave de Scroll** | L47–66 | Utiliza `IntersectionObserver` con un `rootMargin: '0px 0px -40px 0px'` para asignar la clase `.is-visible` a elementos `.reveal-fade`, desconectando el observador una vez mostrados. |
| **5. Spotlight y Micro-Parallax** | L69–106 | En desktop con ratón fino, calcula las coordenadas relativas del cursor sobre tarjetas asignando `--mouse-x` y `--mouse-y`. En el Hero aplica un micro-desplazamiento suave (máx. 6px). |
| **6. Menú Móvil Hamburguesa** | L109–152 | Gestiona el botón `#hamburgerBtn` y el panel `#mobileMenu`, alternando atributos `aria-expanded` y `aria-hidden`. Soporta cierre inmediato con la tecla `Escape`. |
| **7. Navbar Sticky Dinámica** | L155–175 | Detecta cuando el scroll supera los `35px` para añadir la clase `.scrolled` que oscurece el fondo de la barra de navegación. |
| **8. Progressive Disclosure** | L189–204 | Controla los botones `.btn-service-details` que alternan el atributo `hidden` y `aria-expanded` en los detalles de servicios. |
| **9. Checklist Pre-Formateo** | L207–276 | Gestiona la lista interactiva de 4 puntos. Guarda el estado de selección en `sessionStorage` (`kuyendev_checklist_state_3_0`) y actualiza dinámicamente el badge de progreso ("X de 4 verificados"). Soporta teclado (Space/Enter). |
| **10. Acordeón FAQ** | L279–307 | Gestiona las preguntas frecuentes con comportamiento de acordeón exclusivo (al abrir una pregunta, se cierran automáticamente las demás). |
| **11. Asistente Interactivo** | L310–587 | Máquina de estados de 3 pasos (1: Situación del equipo, 2: Detalle específico, 3: Recomendación orientativa con enlace dinámico a WhatsApp preconfigurado con el texto de consulta exacto). |
| **12. Filtros y Ordenación** | L590–787 | Controlador del Hub de Publicaciones: gestiona filtrado por categorías mediante tabs accesibles (flechas de teclado ARIA), ordenación por fecha (reciente/antigua) y menú dropdown personalizado con navegación por teclado. |

---

## 5. SEO, Datos Estructurados y Accesibilidad

### 5.1. Metadatos y Configuración de Indexación
- **Indexabilidad:** Archivo `robots.txt` permite rastreo universal (`User-agent: * / Allow: /`) y apunta directamente al sitemap (`https://kuyendev.cl/sitemap.xml`).
- **Sitemap XML:** Incluye las 5 URLs canónicas del proyecto:
  1. `https://kuyendev.cl/` (Prioridad 1.0)
  2. `https://kuyendev.cl/pages/empresas.html` (Prioridad 0.9)
  3. `https://kuyendev.cl/pages/publicaciones.html` (Prioridad 0.8)
  4. `https://kuyendev.cl/pages/content/bertoldo_hofmann.html` (Prioridad 0.8)
  5. `https://kuyendev.cl/pages/terminos.html` (Prioridad 0.5)
- **Open Graph y Twitter Cards:** Configurados exhaustivamente en todas las páginas con `og:image:width="1200"` y `og:image:height="630"`, apuntando a `https://kuyendev.cl/images/kuyendev-og.jpg`.
- **Etiquetas Canónicas:** Cada página contiene `<link rel="canonical">` apuntando a su URL absoluta oficial en el dominio `kuyendev.cl`.

### 5.2. Datos Estructurados JSON-LD (Schema.org)
El proyecto implementa grafos estructurados enriquecidos en su código HTML:
- **`index.html`:** Contiene `@graph` con:
  - `LocalBusiness`: Con nombre comercial *"KuyénDev"*, titular legal *"Franco Luna"*, teléfono `+56922231780`, correo `fa.lunangulo@kuyendev.cl`, geolocalización en Osorno / Chile y rango de precios `"$$"`.
  - `FAQPage`: Incluye las 6 preguntas y respuestas frecuentes en formato estructurado para ser indexadas como *Rich Snippets* en Google.
- **`pages/empresas.html`:** Incluye `BreadcrumbList` y esquema tipo `Service` orientado a soporte informático corporativo en Osorno y Los Lagos.
- **`pages/publicaciones.html`:** Incluye esquema `CollectionPage` y `BreadcrumbList`.

### 5.3. Accesibilidad WAI-ARIA (WCAG 2.1 AA)
- **Roles y Atributos:** Implementación de `role="tablist"`, `role="tab"`, `role="listbox"`, `role="option"`, `role="checkbox"`, `aria-selected`, `aria-expanded`, `aria-controls` y `aria-hidden`.
- **Navegación por Teclado:** Todas las interacciones críticas (menú móvil, acordeones FAQ, tabs de publicaciones, dropdown de ordenación y checklist) son completamente operables mediante teclado (`Tab`, `Enter`, `Space`, `ArrowUp`, `ArrowDown`, `Escape`).
- **Foco Visible:** Estilo global `:focus-visible` con contorno de `2px` en color azul eléctrico y desplazamiento de `3px` (`outline-offset: 3px`).
- **Respeto a Preferencias del Usuario:** Respeto a `prefers-reduced-motion`, desactivando transiciones automáticas para usuarios con sensibilidad vestibular.

---

## 6. Verificación de Integridad Automatizada

El proyecto incluye un script Bash de validación continua (`verificar_estructura.sh`) que comprueba 4 pilares críticos:
1. **Archivos Core y SEO:** Verifica la existencia de `index.html`, `styles.css`, `script.js`, `sitemap.xml`, `robots.txt`, `CNAME` y favicon.
2. **Páginas Secundarias:** Valida la existencia de `empresas.html`, `publicaciones.html`, `noticias.html`, `terminos.html` y `bertoldo_hofmann.html`.
3. **Integridad de Enlaces de Activos:** Comprueba mediante `grep` que cada página HTML enlace correctamente las rutas relativas correspondientes a `styles.css` y `script.js`.
4. **Validación de Anclas Internas:** Comprueba que en `index.html` existan físicamente todos los IDs vinculados en los menús de navegación (`#servicios`, `#asistente`, `#checklist-previa`, `#garantia`, `#proceso`, `#nosotros`, `#faq`, `#contacto`).

*Resultado de ejecución auditado:* **100% superado sin advertencias.**
