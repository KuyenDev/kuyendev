# KUYÉNDEV · REGISTRO DE FUENTES, EVIDENCIAS, DISCREPANCIAS Y LIMITACIONES

> **Documento:** 09-KUYENDEV-FUENTES-Y-EVIDENCIAS.md  
> **Proyecto:** KuyénDev (Plataforma y Servicios Informáticos)  
> **Titular / Fundador:** Franco Luna  
> **Ubicación:** Osorno, Región de Los Lagos, Chile  
> **Auditoría Técnica:** Octubre de 2026

---

## 1. Tabla Maestra de Afirmaciones y Evidencias

A continuación se registra cada una de las afirmaciones principales documentadas a lo largo de la investigación, asociando su archivo fuente, la evidencia física observable en el repositorio y el nivel de confianza correspondiente:

- **Nivel de Confianza Alta:** Respaldada directamente por una fuente explícita y verificada en el código o metadatos.
- **Nivel de Confianza Media:** Respaldada por varios indicios consistentes y deducciones lógicas cruzadas.
- **Nivel de Confianza Baja:** Interpretación razonable pero no confirmada explícitamente por el propietario.

| Afirmación Principal | Fuente o Archivo | Evidencia Física en el Código | Nivel de Confianza | Observaciones |
|---|---|---|:---:|---|
| El fundador y único responsable técnico documentado es Franco Luna. | `index.html`, `readme.md`, `pages/terminos.html`, Git log | `meta name="author" content="Franco Luna · KuyénDev"`, Schema.org `"legalName": "Franco Luna"`, commits firmados por `fa.lunangulo@outlook.com`. | **Alta** | Verificado en múltiples archivos independientes. |
| La base de operaciones física está en Osorno, Región de Los Lagos, Chile. | `index.html`, `pages/empresas.html`, `sitemap.xml`, Schema.org | Schema.org `"addressLocality": "Osorno"`, `"addressRegion": "Región de Los Lagos"`, textos del Hero y Footer en todas las páginas. | **Alta** | Constatado en metadatos geográficos y llamadas a WhatsApp con prefijo chileno `+56 9`. |
| El nombre "KuyénDev" vincula la palabra mapudungun "Kuyén" (Luna) con el apellido del fundador. | Lingüística mapuche vs. Identidad del fundador | El apellido del fundador es Luna. En mapudungun (sur de Chile), *kuyén* = Luna. | **Media** | Asociación cultural inequívoca y consistente en la zona de Osorno, aunque no está explicada textualmente en la web. |
| El lema corporativo es "Recuperar y optimizar antes de reemplazar. Tu equipo posee más potencial del que crees." | `readme.md` L36, `index.html` L1283-1284 | Texto exacto entrecomillado atribuido a Franco Luna en la sección *Nosotros* y en la descripción general del README. | **Alta** | Declaración explícita central del proyecto. |
| Se ofrece 1 mes (30 días corridos) de garantía técnica para formateos y 15 días para optimizaciones. | `index.html` L98, L394, `pages/terminos.html` L239-245 | Cláusula 6 de Términos: "30 días corridos para formateo... 15 días corridos para optimizaciones". | **Alta** | Regla contractual y publicitaria formal. |
| Existe una exclusión total de responsabilidad por reparación física de hardware. | `pages/terminos.html` L146-157 | Cláusula 1: "KuyénDev se dedica exclusivamente al soporte, optimización, configuración e instalación de software. No realiza reparaciones físicas de hardware...". | **Alta** | Cláusula legal explícita. |
| El respaldo previo de información personal es obligación del cliente. | `pages/terminos.html` L160-169 | Cláusula 2: "Es obligación única, exclusiva y previa del cliente realizar un respaldo completo de su información...". | **Alta** | Delimitación legal formal. |
| El bodegaje contempla 14 días gratis y luego una multa de $2.000 CLP diarios. | `pages/terminos.html` L173-190 | Cláusula 3: "plazo de gracia de 14 días corridos... Desde el día 15 se aplicará una multa de $2.000 CLP diarios". | **Alta** | Tarifa económica explícita. |
| A los 60 días sin retiro, el equipo cae en presunción legal de abandono. | `pages/terminos.html` L193-207 | Cláusula 4: "Transcurridos 60 días corridos... será considerado legalmente abandonado". | **Alta** | Marco de disposición del bien. |
| KuyénDev intervino 30 equipos en el Colegio Bertoldo Hofmann Kahler en Purranque en junio de 2026. | `pages/content/bertoldo_hofmann.html`, `pages/publicaciones.html`, fotos reales | Documento de caso de estudio detallando 23 equipos de alumnos con Deep Freeze y 7 de profesores con Office 2024, respaldado con fotos (`BHKcolegio.png`, `BHKportada.png`). | **Alta** | Caso institucional con evidencia visual y técnica exhaustiva. |
| Se utiliza software de escritorio remoto RustDesk para asistencia a distancia. | `index.html` L114, L1363, `pages/empresas.html` L480 | Menciones directas a RustDesk en la consola técnica, sección de garantía, FAQs y soluciones B2B. | **Alta** | Protocolo técnico verificado. |
| La web no utiliza frameworks JavaScript ni CSS externos pesados. | `index.html`, `css/styles.css`, `js/script.js` | Inspección de etiquetas `<head>` y `<script>`: solo enlaza `styles.css` local, fuente Google Inter y `script.js` nativo. No hay dependencias de npm ni CDNs externas. | **Alta** | Verificación técnica de código 100% libre de frameworks. |
| La paleta cromática en producción v3.0 está basada en Azul Marino (#070a12), Azul Eléctrico (#2563eb), Cyan (#06b6d4) y Emerald (#10b981). | `css/styles.css` L7-36 | Definiciones `:root` en el archivo CSS activo: `--bg-base: #070a12`, `--accent-primary: #2563eb`, etc. | **Alta** | Tokens CSS reales en producción. |
| Las subcarpetas en `images/real-media/` están actualmente vacías y preparadas para fotos futuras. | `images/real-media/` y su `README.md` | Comprobación física con `list_dir`: `fundador/`, `workspace/`, `trabajos/` y `videos/` vacías; `README.md` estipula directrices técnicas estrictas de captura. | **Alta** | Constatación física del sistema de archivos. |
| La sección de publicaciones solo cuenta con 1 artículo publicado y las demás categorías tienen empty states. | `pages/publicaciones.html` L256-310 | Grid con 1 artículo (`data-category="casos-reales"`) y bloque `#pubEmptyState` oculto por defecto para cuando las categorías "Guías" o "Novedades" no devuelven resultados. | **Alta** | Comprobación directa del DOM y código HTML. |
| El sitio se aloja en GitHub Pages con dominio propio kuyendev.cl. | `CNAME`, `readme.md` L23, `git remote` | Archivo `CNAME` con contenido `kuyendev.cl`, remoto Git apuntando a `https://github.com/KuyenDev/kuyendev.git`. | **Alta** | Infraestructura verificada. |
| La visión a largo plazo es ser el líder regional en soporte B2B para colegios y pymes de Los Lagos. | Inferencia estratégica cruzada | Basada en la creación de `pages/empresas.html`, el caso Purranque y la estructura para flotas masivas. | **Baja** | Interpretación estratégica razonable, requiere validación del propietario. |

---

## 2. Registro de Contradicciones y Discrepancias Técnicas

| Discrepancia Detectada | Origen de la Discrepancia | Estado en el Código Real | Resolución y Dictamen Técnico |
|---|---|---|---|
| **Versión Declarada: v2.0.0 vs v3.0 vs v2.3** | En `readme.md` figura un badge con `"Versión-2.0.0"`. En `ESTRUCTURA_REFACTORIZADA.md` y `css/styles.css` se titula `"v3.0"`. En el log de Git los últimos commits de octubre de 2026 se titulan `"Update: 2.3 version"`. | El proyecto opera bajo la arquitectura v3.0 terminada el 5 de octubre de 2026 (commit `90172e9`). | El archivo `readme.md` no fue actualizado con el nuevo badge de versión tras el refactor de octubre de 2026. La versión canónica real del código es **KuyénDev 3.0**. |
| **Paleta Cromática: Zinc/Índigo vs. Azul Marino/Azul Eléctrico** | `readme.md` L44 y `ESTRUCTURA_REFACTORIZADA.md` L33 describían: *"Variables CSS (tokens) con modo oscuro nativo, paleta Zinc + Indigo"*. | `css/styles.css` L8–36 define `--bg-base: #070a12` (Azul marino ultra profundo), `--accent-primary: #2563eb` (Azul eléctrico) y `--accent-emerald: #10b981`. | La documentación preliminar de refactorización conservó el texto de la versión preliminar 2.0; durante el ajuste final a v3.0 se refinaron los tokens hacia Azul Marino y Eléctrico para mejorar el contraste WCAG AA. |
| **Mapa de Archivos en README desactualizado** | El árbol de directorios de `readme.md` L70–86 lista `noticias.html` como *"Hub de Casos de Éxito"* y no menciona `pages/empresas.html` ni `pages/publicaciones.html`. | `pages/noticias.html` es ahora una redirección automática, y las páginas activas son `empresas.html` y `publicaciones.html`. | `readme.md` refleja la estructura histórica de junio de 2026 y no fue sincronizado tras el despliegue de la división B2B y el Hub de Publicaciones en octubre de 2026. |

---

## 3. Limitaciones de la Auditoría y Fuentes No Inspeccionadas

En cumplimiento con la regla de veracidad número 27 ("Enumera las fuentes que no pudiste inspeccionar") y número 28 ("No afirmes que realizaste pruebas de ejecución si no las realizaste"):

1. **Pruebas de Navegador Integrado en Tiempo Real (Playwright):**  
   - Se intentó iniciar el subagente de navegación web (`browser_subagent`) para interactuar con la página local en `http://localhost:8080/`.
   - **Limitación encontrada:** La herramienta falló al inicializar el contexto de Playwright porque el gestor intentó descargar su binario de driver (`playwright-1.57.0-linux.zip`) desde servidores externos de AzureEdge, lo cual generó un error `404 Not Found` debido a que el entorno de ejecución está estrictamente aislado y sin conexión a internet externa.
   - **Medida adoptada:** La validación se realizó mediante inspección estática exhaustiva de los archivos de código fuente, comprobación de listeners JavaScript en `js/script.js`, validación cruzada con el script Bash `verificar_estructura.sh`, y verificación de estilos en `css/styles.css`.
2. **Servicios y Servidores de Terceros no Accesibles:**
   - No se tuvo acceso a la configuración del panel DNS del registrador de dominios de `kuyendev.cl` (solo se verificó el registro local en el archivo `CNAME`).
   - No se inspeccionaron los servidores o cuentas de RustDesk (solo se verificó su mención y configuración en el frontend).
   - No se inspeccionaron buzones de correo electrónico (`fa.lunangulo@kuyendev.cl` ni `fa.lunangulo@outlook.com`).
3. **Privacidad y Datos Sensibles:**
   - No se accedió a archivos `.env`, claves privadas, contraseñas ni tokens de acceso (en concordancia estricta con la regla de confidencialidad).
4. **Clientes y Terceros:**
   - No se realizaron llamadas ni contactos con terceros ni con las autoridades del Colegio Bertoldo Hofmann Kahler; la información sobre dicho caso se basa exclusivamente en la documentación y fotografías presentes en el repositorio.
