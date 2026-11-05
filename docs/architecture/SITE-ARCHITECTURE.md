# KUYÉNDEV NEXT · ARQUITECTURA DE INFORMACIÓN Y NAVEGACIÓN

> **Documento:** SITE-ARCHITECTURE.md  
> **Proyecto:** KuyénDev Next  
> **Estructura:** Arquitectura Multipágina Modular y Escalable  
> **Enfoque SEO:** URLs Canónicas Limpias, Breadcrumbs Semánticos y Silos de Contenido  

---

## 1. Mapa Global del Sitio Web

El ecosistema web de KuyénDev Next se organiza en **10 páginas principales**, garantizando que cada intención de búsqueda y cada necesidad comercial posea una URL dedicada, sin páginas vacías ni enlaces rotos:

```text
kuyendev.cl/
│
├── index.html                           [01. HOMEPAGE DUAL]
│   └── Presentación institucional, visión general de las 2 líneas,
│       casos destacados, diferenciación y derivación comercial.
│
├── pages/
│   ├── desarrollo-web.html              [02. DESARROLLO WEB · SERVICIO ESTRELLA]
│   │   └── Landing pages, sitios corporativos, portafolios,
│   │       proceso de 5 etapas, stack tecnológico frontend y calidad técnica.
│   │
│   ├── planes-web.html                  [03. PLANES MENSUALES WEB]
│   │   └── 3 niveles comerciales (Esencial, Profesional, Avanzado),
│   │       tabla comparativa detallada, alcances, límites y FAQs comerciales.
│   │
│   ├── servicios-informaticos.html      [04. SERVICIOS INFORMÁTICOS · B2C]
│   │   └── Catálogo para particulares: Formateo, Windows LTSC, Linux,
│   │       Office, Optimización sin borrar, asistente interactivo y checklist.
│   │
│   ├── empresas.html                    [05. EMPRESAS E INSTITUCIONES · B2B]
│   │   └── Estandarización de flotas, despliegue LTSC, Deep Freeze para colegios,
│   │       bloqueo perimetral +18 y acuerdos de soporte coordinado.
│   │
│   ├── proyectos.html                   [06. PORTAFOLIO & CASOS REALES]
│   │   └── Vitrina del caso institucional Colegio Bertoldo Hofmann Kahler
│   │       + Demostraciones conceptuales de desarrollo web de alta fidelidad.
│   │
│   ├── nosotros.html                    [07. SOBRE KUYÉNDEV]
│   │   └── Filosofía contra la obsolescencia, historia de Franco Luna,
│   │       significado cultural de Kuyén (Luna) y metodología de trabajo.
│   │
│   ├── publicaciones.html               [08. PUBLICACIONES & RECURSOS]
│   │   └── Hub de divulgación técnica, guías prácticas y novedades con
│   │       filtrado dinámico por categorías y menú de ordenación accesible.
│   │
│   ├── contacto.html                    [09. CONTACTO & COTIZACIÓN]
│   │   └── Formulario inteligente de cotización para proyectos web y
│   │       computadores, generador de enlace a WhatsApp y canales directos.
│   │
│   ├── terminos.html                    [10. TÉRMINOS & POLÍTICAS]
│   │   └── Marco contractual íntegro de 25 cláusulas legales sobre garantías,
│   │       bodegaje, abandono legal, exclusión de hardware y privacidad.
│   │
│   ├── noticias.html                    [REDIRECCIÓN DE COMPATIBILIDAD]
│   │   └── Redirección automática inmediata hacia publicaciones.html.
│   │
│   └── content/
│       └── bertoldo_hofmann.html        [CASO DE ESTUDIO DETALLADO]
│           └── Artículo monográfico del Colegio Bertoldo Hofmann con fotos reales.
```

---

## 2. Embudos de Conversión (User Journeys)

### Flujo 1: Emprendedor / Empresa que Necesita una Página Web
1. **Entrada:** Llega a `index.html` mediante búsqueda local (*"desarrollo web Osorno"*) o recomendación.
2. **Impacto:** Ve el Hero dual con énfasis en Desarrollo Web y la promesa de continuidad tecnológica sin complicaciones.
3. **Exploración:** Hace clic en el CTA principal hacia `pages/desarrollo-web.html` para entender qué tipo de sitio necesita (Landing, Corporativo, Portafolio).
4. **Evaluación de Planes:** Visita `pages/planes-web.html` para comparar los 3 niveles de mantenimiento mensual.
5. **Conversión:** Rellena el formulario interactivo en `pages/contacto.html` o hace clic en *"Consultar este plan por WhatsApp"*, enviando un mensaje preformateado con sus requerimientos.

### Flujo 2: Usuario Particular con Computador Lento
1. **Entrada:** Llega a `index.html` o directamente a `pages/servicios-informaticos.html`.
2. **Diagnóstico Guiado:** Utiliza el Asistente Interactivo de 3 pasos o la Checklist Pre-Formateo para comprender si necesita formateo u optimización.
3. **Confianza:** Lee la garantía formal de 30 días y el lema de no forzar gastos innecesarios de hardware.
4. **Conversión:** Abre WhatsApp con el mensaje específico de orientación generado por el asistente.

### Flujo 3: Director de Colegio o Encargado de TI de Empresa
1. **Entrada:** Ingresa a `pages/empresas.html`.
2. **Validación de Capacidad:** Lee la solución de congelamiento de disco Deep Freeze y navega al caso real documentado del Colegio Bertoldo Hofmann (`pages/content/bertoldo_hofmann.html`) con fotografías y métricas.
3. **Conversión:** Solicita cotización corporativa formal por correo electrónico o WhatsApp.

---

## 3. Estrategia de Enlaces y Navegación Global

- **Navegación Desktop:**
  - Logotipo -> Inicio (`index.html`)
  - Desarrollo Web -> `pages/desarrollo-web.html`
  - Planes Web -> `pages/planes-web.html`
  - Servicios Informáticos -> `pages/servicios-informaticos.html`
  - Empresas -> `pages/empresas.html`
  - Proyectos -> `pages/proyectos.html`
  - Nosotros -> `pages/nosotros.html`
  - Botón CTA Destacado -> Cotizar Web / WhatsApp (`pages/contacto.html`)
- **Navegación Móvil (Drawer Accesible):**
  - Mismos destinos organizados con espaciado táctil amplio (>48px) y agrupadores de sección visuales.
- **Footer Corporativo Global:**
  - 4 Columnas: (1) Marca y lema; (2) Desarrollo Web y Planes; (3) Servicios Informáticos y Empresas; (4) Contacto, Términos Legales e Instagram.
