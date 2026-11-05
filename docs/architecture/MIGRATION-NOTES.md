# KuyénDev Next · Notas de Migración y Preservación Documental
**Versión:** 4.0 (Rediseño Integral & Plataforma Multipágina)  
**Rama de Trabajo:** `redesign/kuyendev-next`  
**Fecha de Generación:** 16 de Octubre de 2026  
**Autor:** Equipo de Ingeniería & Estrategia Digital KuyénDev  

---

## 1. Resumen Ejecutivo de la Migración

La transformación de **KuyénDev** a **KuyénDev Next v4.0** representa un salto cualitativo absoluto:
- **De:** Un sitio web enfocado prioritariamente en soporte técnico de computadores y formateo para particulares en Osorno.
- **A:** Un **estudio tecnológico contemporáneo** de alto estándar que posiciona **dos líneas comerciales equivalentes y sinérgicas**:
  1. **Desarrollo Web Profesional & Planes de Gestión Mensual:** Sitios corporativos, landing pages, portafolios y catálogos digitales con suscripción de mantenimiento continuo, velocidad instantánea y SEO técnico nativo.
  2. **Servicios Informáticos & Soluciones para Empresas:** Formateo estandarizado, Windows LTSC, migración a GNU/Linux, optimización sin formateo y laboratorios educativos seguros con Deep Freeze.

La reconstrucción se realizó con **cero dependencias externas pesadas**, utilizando HTML5 semántico prerenderizado, diseño con tokens CSS modernos (*Precision Atelier*) y JavaScript modular vanilla.

---

## 2. Inventario de Contenido y Datos Preservados

En cumplimiento estricto con la directriz de **no inventar datos, clientes, testimonios ni certificaciones ficticias**, se preservaron íntegramente todos los activos históricos comprobables:

| Elemento Preservado | Ubicación en la Nueva Web | Estado de Verificación |
| :--- | :--- | :--- |
| **Identidad del Fundador** | `pages/nosotros.html`, `index.html`, Footer | Franco Luna, responsable técnico y desarrollador en Osorno, Chile. |
| **Significado de Kuyén** | `pages/nosotros.html` | Origen *mapudungun* ("Luna"), honrando el apellido materno y la identidad del sur. |
| **Filosofía Anti-Obsolescencia** | Todas las páginas y footers | Lema fundacional: *"Recuperar y optimizar antes de reemplazar."* |
| **Caso Colegio Bertoldo Hofmann Kahler** | `pages/content/bertoldo_hofmann.html`, `pages/proyectos.html`, `pages/empresas.html` | 30 equipos en Purranque (23 laboratorio + 7 docentes), Deep Freeze, Windows LTSC, 0 caídas post-servicio. Se preservaron las 3 fotografías reales. |
| **25 Cláusulas Contractuales** | `pages/terminos.html` | Preservación del 100% del texto legal original (exclusión de hardware, 14 días bodegaje, 60 días abandono, 30 días garantía, etc.) con índice interactivo. |
| **Canales de Contacto** | Header, Footer, `pages/contacto.html` | WhatsApp `+56 9 2223 1780`, Correo `fa.lunangulo@outlook.com`, Instagram `@kuyendev`. |
| **Geolocalización Real** | Metadatos Schema.org y textos | Osorno, Puyehue, Purranque, Río Negro, Región de Los Lagos y asistencia remota para todo Chile. |

---

## 3. Matriz de Rutas y Redirecciones

Para garantizar compatibilidad total con enlaces compartidos en redes sociales, tarjetas de presentación o indexados previamente por Google, se estableció la siguiente arquitectura de rutas:

| Ruta Histórica | Estado en v4.0 | Destino / Comportamiento |
| :--- | :--- | :--- |
| `/` (`index.html`) | **Reconstruido** | Homepage dual-track con hero de alto impacto, preview card de UI, showcase web, comparador de planes y caso real. |
| `/pages/empresas.html` | **Reconstruido** | Página B2B con estandarización de flotas, Windows LTSC, Deep Freeze para colegios y cotizador a WhatsApp. |
| `/pages/publicaciones.html` | **Reconstruido** | Hub de conocimiento con filtros por categoría, caso Bertoldo Hofmann y 3 guías técnicas extensas. |
| `/pages/noticias.html` | **Preservado** | Redirección automática HTTP (meta-refresh + JS `replace`) hacia `publicaciones.html`. Evita errores 404. |
| `/pages/content/bertoldo_hofmann.html` | **Reconstruido** | Reporte detallado del caso real con galería de imágenes en alta resolución, estadísticas y lecciones técnicas. |
| `/pages/terminos.html` | **Reconstruido** | Layout ergonómico de 2 columnas con tabla de contenidos sticky lateral navegable a las 25 cláusulas. |
| `/pages/desarrollo-web.html` | **NUEVA** | Página comercial estrella de desarrollo web, 6 tipos de sitios, 5 etapas de trabajo y desglose de alcance. |
| `/pages/planes-web.html` | **NUEVA** | Página de planes mensuales con matriz comparativa responsive (Plan Esencial, Profesional, Avanzado) y 13 FAQs. |
| `/pages/servicios-informaticos.html`| **NUEVA** | Página de servicios para computadores personales, asistente diagnóstico interactivo y checklist de pre-formateo. |
| `/pages/proyectos.html` | **NUEVA** | Portafolio integrado con filtros dinámicos (Todos, Sistemas, Web), caso Bertoldo y demos conceptuales de estudio. |
| `/pages/nosotros.html` | **NUEVA** | Historia del estudio, significado de Kuyén, perfil de Franco Luna y los 4 principios de ética de trabajo. |
| `/pages/contacto.html` | **NUEVA** | Formulario inteligente con cálculo de presupuesto y generador automático de mensajes a WhatsApp y correo. |

---

## 4. Anclas Internas de Retrocompatibilidad

En `index.html` y páginas secundarias se habilitaron explícitamente los identificadores de ancla utilizados previamente en campañas de marketing y folletos:
- `#servicios`: Navega a la sección de servicios duales.
- `#planes`: Navega a la sección de planes de suscripción mensual web.
- `#proceso`: Navega a la explicación de las 4 etapas de desarrollo y atención.
- `#faq`: Navega al acordeón de preguntas frecuentes.
- `#contacto`: Navega a la llamada de acción final y enlace al formulario de cotización.
- `pages/servicios-informaticos.html#asistente`: Navega al selector interactivo de diagnóstico.
- `pages/servicios-informaticos.html#checklist-previa`: Navega a la lista interactiva de respaldo.
- `pages/servicios-informaticos.html#garantia`: Navega al detalle de los 30 días de cobertura.

---

## 5. Mejoras Técnicas de Infraestructura

1. **Rendimiento Frontend:**
   - Hoja de estilos centralizada `css/styles.css` con variables CSS nativas (`:root`), eliminando estilos en línea dispersos y clases utilitarias redundantes.
   - Tipografía oficial optimizada mediante Google Fonts CDN (`Plus Jakarta Sans` para display/títulos + `Inter` para cuerpo de lectura) con `font-display: swap`.
   - Soporte nativo para formatos WebP con fallback a PNG mediante etiquetas semánticas `<picture>`.
2. **Centralización de Datos Comerciales:**
   - Se creó `js/config/plans.js`, aislando la configuración de los planes mensuales web (precios, características, números de teléfono y textos predeterminados de WhatsApp). Esto permite a Franco Luna actualizar tarifas en un solo archivo sin tener que editar el código HTML de múltiples páginas.
3. **SEO & Datos Estructurados:**
   - Cada página cuenta con títulos únicos, metadescripciones persuasivas, canonicals absolutos, etiquetas Open Graph y Twitter Cards.
   - Marcado Schema.org enriquecido (`LocalBusiness`, `Service`, `Product`, `CollectionPage`, `Article`, `BreadcrumbList`).
   - `sitemap.xml` actualizado con las 11 rutas activas y frecuencias de rastreo calibradas.
   - `robots.txt` limpio con referencia al sitemap.

---

## 6. Integridad de Git y Despliegue

- **Rama Aislada:** Todo el trabajo del rediseño se encuentra aislado en la rama Git local `redesign/kuyendev-next`.
- **Protección de Producción:** La rama `main` original permanece inalterada y protegida. No se ha realizado push ni merge a producción sin la revisión y aprobación expresa del propietario.
