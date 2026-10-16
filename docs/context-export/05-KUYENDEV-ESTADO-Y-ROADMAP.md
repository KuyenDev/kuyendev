# KUYÉNDEV · DIAGNÓSTICO DE ESTADO ACTUAL, DISCREPANCIAS Y ROADMAP

> **Documento:** 05-KUYENDEV-ESTADO-Y-ROADMAP.md  
> **Proyecto:** KuyénDev (Plataforma y Servicios Informáticos)  
> **Titular / Fundador:** Franco Luna  
> **Ubicación:** Osorno, Región de Los Lagos, Chile  
> **Fuentes de Respaldo:** `readme.md`, `ESTRUCTURA_REFACTORIZADA.md`, `images/real-media/README.md`, `pages/publicaciones.html`, `pages/noticias.html`, historial de Git.

---

## 1. Diagnóstico del Estado Actual del Proyecto

A partir de la auditoría minuciosa del código fuente, los activos y la cronología de commits, el estado de madurez de KuyénDev se clasifica en tres niveles:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ESTADO OPERATIVO KUYÉNDEV                       │
├─────────────────────────┬──────────────────────────────────────────────┤
│ 100% Terminado          │ Landing B2C, Página B2B Empresas, Términos   │
│ y Comprobado            │ Legales (25 cláusulas), Caso Bertoldo Hofmann│
│                         │ Script de Integridad, SEO y Datos JSON-LD    │
├─────────────────────────┼──────────────────────────────────────────────┤
│ Parcialmente Terminado  │ Hub de Publicaciones (1 caso real publicado; │
│                         │ pestañas "Guías" y "Novedades" con empty state│
├─────────────────────────┼──────────────────────────────────────────────┤
│ Pendiente / En Progreso │ Incorporación de activos multimedia reales   │
│                         │ (fotos de Franco Luna y taller en real-media)│
└─────────────────────────┴──────────────────────────────────────────────┘
```

---

## 2. Inventario Detallado de Componentes

### 2.1. Componentes Terminados y Operativos
1. **Página Principal (`index.html`):** Totalmente estructurada y funcional. Integra el Hero con consola simulada, barra de confianza de 1 mes de garantía, catálogo de 6 servicios B2C con progressive disclosure, banner de diferenciación conceptual, asistente interactivo de 3 pasos, checklist interactiva de pre-formateo con guardado en sesión, acordeón FAQ con Schema.org y llamadas directas a WhatsApp.
2. **Página de Empresas e Instituciones (`pages/empresas.html`):** Propuesta B2B completa. Cataloga 6 soluciones para oficinas, pymes y colegios, destaca el caso institucional Bertoldo Hofmann, incluye breadcrumb accesible y metadatos SEO específicos.
3. **Marco Legal y Términos de Servicio (`pages/terminos.html`):** Conjunto riguroso de 25 cláusulas legales que delimitan la exclusión de responsabilidad por hardware físico, obligación de respaldo previo por parte del cliente, plazos de bodegaje (14 días gratis, $2.000 CLP/día desde el día 15), abandono legal a los 60 días, y alcance de garantías (30 días formateo, 15 días optimizaciones).
4. **Caso de Estudio Institucional (`pages/content/bertoldo_hofmann.html`):** Artículo de envergadura técnica real. Documenta la optimización de 30 computadores en Purranque, con 4 archivos fotográficos reales asociados (`BHKcolegio.png`, `BHKportada.png`, `BHKportada.webp`, `BHKscreenshot.png`).
5. **Redirección de Compatibilidad (`pages/noticias.html`):** Archivo ligero que redirige de inmediato (mediante etiqueta `<meta http-equiv="refresh">` y script `window.location.replace`) hacia la nueva ruta canónica `publicaciones.html`, evitando enlaces rotos para visitantes anteriores.
6. **Script de Verificación (`verificar_estructura.sh`):** Script ejecutable en Bash que audita la presencia de archivos críticos, rutas relativas y anclas internas HTML, con tasa de éxito del 100%.

### 2.2. Componentes Parcialmente Desarrollados
1. **Hub de Publicaciones (`pages/publicaciones.html`):**
   - La arquitectura de interfaz, los filtros interactivos por categoría (WAI-ARIA tabs) y el menú custom de ordenación por fecha funcionan al 100%.
   - **Contenido real actual:** Cuenta únicamente con 1 publicación activa: el caso de estudio del Colegio Bertoldo Hofmann Kahler.
   - Las pestañas *"Guías"* y *"Novedades"* están programadas con un estado vacío (*empty state*) bien diseñado que muestra el mensaje: *"Próximamente nuevas publicaciones. Estamos preparando nuevas guías y novedades con criterio técnico honesto y aplicable..."*.

### 2.3. Componentes Pendientes o en Fase de Transición
1. **Activos Multimedia Reales (`images/real-media/`):**
   - Las subcarpetas `fundador/`, `workspace/`, `trabajos/` y `videos/` se encuentran actualmente vacías.
   - La web utiliza actualmente imágenes de apoyo conceptuales y renderizadas en alta calidad en formato WebP:
     - `images/hero-kuyendev.webp`: Estación de trabajo nocturna con iluminación tecnológica azul y ámbar.
     - `images/nosotros-kuyendev.webp`: Estación de trabajo con el badge identitario de Franco Luna.
   - El archivo `images/real-media/README.md` establece la directriz de sustituir estas imágenes por fotografías reales de Franco Luna y su banco de trabajo técnico cuando sean procesadas y aprobadas.

---

## 3. Registro de Discrepancias y Contradicciones Internas Documentadas

En apego a la regla de veracidad número 5 ("Si existen contradicciones entre distintas fuentes, documéntalas"), se registran formalmente las siguientes discrepancias encontradas entre la documentación histórica y el código en producción:

| Elemento / Parámetro | Versión en Documentación Antigua | Versión Real en Código Actual | Ubicación y Evidencia | Análisis Crítico |
|---|---|---|---|---|
| **Número de Versión del Proyecto** | **v2.0.0** (declarada en el badge de `readme.md`) | **v3.0** (en comentarios de `styles.css`, `script.js` y `ESTRUCTURA_REFACTORIZADA.md`) / **v2.3** (en los commits de Git de octubre 2026) | `readme.md` L16 vs `ESTRUCTURA_REFACTORIZADA.md` L1 vs `git log` commit `90172e9` | El archivo `readme.md` no actualizó su badge tras las revisiones de octubre de 2026. La versión real del código es v3.0 (etiquetada como commit 2.3 en Git). |
| **Paleta de Colores Corporativa** | **Zinc (`#09090b`) + Índigo (`#6366f1`)** | **Azul Marino (`#070a12`) + Azul Eléctrico (`#2563eb`) + Cyan (`#06b6d4`) + Emerald (`#10b981`)** | `readme.md` L44 y `ESTRUCTURA_REFACTORIZADA.md` L33 vs `css/styles.css` L8–36 | La documentación textual inicial describía una paleta Zinc/Índigo; el archivo CSS de producción migró a Azul Marino y Azul Eléctrico. |
| **Estructura de Páginas en README** | Cita `pages/noticias.html` como *"Hub de Casos de Éxito"* y omite `empresas.html` y `publicaciones.html`. | Existen físicamente `pages/empresas.html` y `pages/publicaciones.html`, mientras que `noticias.html` es una simple redirección. | `readme.md` L70–86 vs `pages/` | `readme.md` conserva el árbol de directorios de junio de 2026 y no refleja las páginas agregadas en octubre de 2026. |

---

## 4. Visión de Crecimiento y Roadmap Documentado

El proyecto cuenta con un plan de trabajo explícito documentado en el archivo `images/real-media/README.md` y en las notas de refactorización de octubre de 2026:

### Fase 1: Incorporación de Multimedia Real (Documentada en `images/real-media/README.md`)
- **Fotografías del Fundador (`/fundador/`):**
  - Incorporar retratos reales de Franco Luna trabajando en el banco de servicio técnico.
  - Dimensiones especificadas: `1200×800px` (3:2 horizontal) y `800×800px` (avatar cuadrado).
  - Formato estandarizado: `.webp` o `.avif` con peso objetivo menor a 120 KB tras compresión con Squoosh.
  - Nombres reservados: `franco-luna-kuyendev-trabajando.webp` y `franco-luna-perfil-profesional.webp`.
- **Fotografías del Espacio de Trabajo (`/workspace/`):**
  - Capturas limpias de la mesa técnica de pruebas, monitores con software de diagnóstico e instrumental de trabajo en Osorno (`estacion-trabajo-kuyendev-osorno.webp`).
- **Fotografías de Trabajos Reales (`/trabajos/`):**
  - Registro fotográfico documental de computadores intervenidos (pantallas mostrando el Administrador de Tareas con consumo bajo de RAM o escritorios limpios tras formateo).
- **Clips de Video Demostrativos (`/videos/`):**
  - Clips cortos de 10 a 20 segundos demostrando velocidad de arranque en frío y respuesta ágil post-optimización.
  - Formato primario WebM (VP9/AV1) y fallback MP4 (H.264), peso inferior a 2.5 MB por clip, con portadas estáticas (`poster.webp`) y subtítulos (`.vtt`).
- **Regla Ética Estricta:** El `README.md` de multimedia prohíbe expresamente el uso de avatares generados por IA que simulen personas reales en testimonios o secciones públicas.

### Fase 2: Expansión de Contenidos Técnicos en el Hub
- Redacción de guías prácticas bajo la pestaña *"Guías"* de `pages/publicaciones.html`:
  - Criterios para elegir entre Windows 10, Windows 11 o Windows LTSC según el procesador.
  - Guía de transición segura de Windows a distribuciones Linux para estudiantes y oficinas.
  - Consejos de ciberseguridad preventiva contra phishing y software malicioso en pymes.
- Nuevos casos de estudio bajo la pestaña *"Casos Reales"* a medida que se completen nuevas intervenciones masivas en la zona sur de Chile.

---

## 5. Ecosistema Digital y Canales Oficiales

Todos los canales de comunicación de KuyénDev son directos, sin intermediarios comerciales ni números 800 automatizados:

| Canal | Dirección / Enlace Oficial | Finalidad / Uso | Estado |
|---|---|---|---|
| **Sitio Web Canónico** | [https://kuyendev.cl](https://kuyendev.cl) | Plataforma oficial, catálogo y asistente interactivo. | En producción (GitHub Pages) |
| **WhatsApp Business** | [+56 9 2223 1780](https://wa.me/56922231780) | Canal primario de atención, diagnósticos y cotizaciones. | Activo y operativo |
| **Correo Institucional** | [fa.lunangulo@kuyendev.cl](mailto:fa.lunangulo@kuyendev.cl) | Consultas formales, cotizaciones de empresas y asuntos legales. | Configurado y activo |
| **Instagram** | [@kuyendev](https://instagram.com/kuyendev) | Divulgación técnica, infografías y presencia de marca. | Activo |
| **Repositorio GitHub** | [https://github.com/KuyenDev/kuyendev](https://github.com/KuyenDev/kuyendev) | Control de versiones, código fuente y despliegue continuo. | Activo (Rama `main`) |
| **Soporte Remoto** | Conexión cliente-servidor vía **RustDesk** | Asistencia técnica en tiempo real para software y drivers. | Integrado en protocolo |

---

## 6. Fortalezas Comprobadas vs. Áreas de Oportunidad

### Fortalezas Comprobadas por Evidencia:
1. **Velocidad de Carga Extraordinaria:** Al no cargar librerías pesadas (React, jQuery, Bootstrap), el sitio ofrece un tiempo de interacción casi inmediato en dispositivos móviles y conexiones 4G/5G lentas.
2. **Propuesta Ética Coherente:** El discurso contra la obsolescencia programada no es un eslogan vacío; se materializa en servicios específicos como Windows LTSC, Linux ligero y optimización sin formateo.
3. **Validación Institucional Real:** El caso del Colegio Bertoldo Hofmann Kahler demuestra capacidad para asumir contratos con flotas de 30 equipos y soluciones avanzadas como Deep Freeze.
4. **Protección Legal Completa:** Las 25 cláusulas de términos y políticas en `pages/terminos.html` resuelven formalmente disputas habituales en servicios informáticos (bodegaje, abandono, fallas de hardware ocultas, privacidad).

### Áreas de Oportunidad y Mejora:
1. **Sustitución de Banners Conceptuales:** La web lucirá aún más potente cuando se incorporen las fotografías reales de Franco Luna y su mesa técnica de trabajo, siguiendo la pauta de `images/real-media/README.md`.
2. **Actualización del README:** Sincronizar el archivo `readme.md` de la raíz para reflejar la versión v3.0, la paleta cromática real y las rutas `pages/empresas.html` y `pages/publicaciones.html`.
3. **Publicación de Artículos en el Hub:** Completar al menos una guía práctica en las secciones *"Guías"* y *"Novedades"* de `pages/publicaciones.html` para eliminar los estados vacíos actuales.
