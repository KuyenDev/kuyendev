# Arquitectura y Estructura del Proyecto — KuyénDev v3.0

## Descripción General
KuyénDev es la plataforma web oficial de servicios de soporte informático en Osorno, Chile, liderada por Franco Luna.
El sitio está optimizado con tecnologías web estándar (HTML5, CSS3 Vanilla y JavaScript ES6+), priorizando rendimiento, accesibilidad, compatibilidad móvil y tiempos de carga instantáneos sin dependencias externas pesadas.

---

## Estructura de Directorios

```
kuyendev/
├── index.html                      # Página principal (Landing, catálogo, servicios, garantía, FAQ, contacto)
├── css/
│   └── styles.css                  # Sistema de diseño completo (tokens, componentes, layout, responsive)
├── js/
│   └── script.js                   # Lógica UI (IntersectionObserver, menú móvil ARIA, FAQ acordeón, scroll)
├── pages/
│   ├── noticias.html               # Hub de Casos de Éxito
│   ├── terminos.html               # Términos, condiciones, limitaciones y políticas de garantía (25 cláusulas)
│   └── content/
│       ├── BertoldoHofmannKahler/  # Activos fotográficos del caso de estudio
│       └── bertoldo_hofmann.html   # Caso de estudio: Colegio Bertoldo Hofmann Kahler (Purranque)
├── images/                         # Logotipos y recursos gráficos
│   └── instagram/                  # Infografías técnicas
├── icons/                          # Favicon e isotipos vectoriales (SVG / ICO)
└── CNAME                           # Configuración de dominio personalizado (kuyendev.cl)
```

---

## Principios Técnicos y de Diseño
1. **Design System:** Paleta profunda basada en Zinc (`#09090b`), acentos en Índigo (`#6366f1`) y Cyan (`#06b6d4`), con detalles de garantía en Emerald (`#10b981`).
2. **Tipografía:** *Inter* con escala tipográfica fluida (`clamp()`) y jerarquía editorial clara.
3. **Accesibilidad:** Soporte para navegación por teclado, focus-visible, ARIA en elementos desplegables y respeto a `prefers-reduced-motion`.
4. **Responsive:** Adaptabilidad rigurosa desde 320px hasta pantallas ultra-anchas (1920px).
5. **Hosting:** GitHub Pages con entrega estática de alta velocidad.
