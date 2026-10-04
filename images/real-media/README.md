# Guía de Incorporación de Recursos Multimedia Reales · KuyénDev

Este directorio ha sido preparado para recibir y organizar los materiales audiovisuales reales futuros de **KuyénDev** (fotografías del fundador, espacio de trabajo, intervenciones técnicas y videos cortos).

---

## 1. Estructura de Carpetas

```text
images/real-media/
├── fundador/     -> Fotografías personales de Franco Luna y su área de trabajo principal.
├── trabajos/     -> Fotografías reales de computadores, laptops e intervenciones durante servicios.
├── videos/       -> Clips cortos demostrativos de inicio de sistema, diagnósticos o software.
└── README.md     -> Esta guía técnica de especificaciones y recomendaciones.
```

---

## 2. Recomendaciones para Fotografías

### A. Fotografías del Fundador / Espacio de Trabajo (`/fundador/`)
- **Propósito:** Humanizar la marca en la sección *Sobre Nosotros* y en artículos de prensa/casos de estudio.
- **Enfoque recomendado:** Franco trabajando en el escritorio, revisando una pantalla o interactuando con un equipo en un ambiente limpio y con iluminación natural o luz tecnológica sobria (azules, ámbar o neutros).
- **Dimensiones recomendadas:**
  - **Horizontal (Banner/Sobre Nosotros):** `1200 x 800 px` (proporción 3:2) o `1600 x 900 px` (16:9).
  - **Vertical o Cuadrada (Avatar/Tarjeta de autor):** `800 x 800 px` (1:1).
- **Formato:** `.webp` (calidad 82–85%) o `.jpg` optimizado.
- **Peso objetivo:** Menos de `120 KB` por imagen tras compresión.
- **Nombres recomendados:**
  - `franco-luna-kuyendev-trabajando.webp`
  - `estacion-trabajo-kuyendev.webp`

### B. Fotografías de Servicios / Equipos Reales (`/trabajos/`)
- **Propósito:** Mostrar evidencia gráfica del trabajo (laptops y PCs intervenidos, laboratorios o instituciones).
- **Enfoque recomendado:** Tomas en ángulo de los equipos finalizados (con la pantalla mostrando el escritorio limpio o el gestor de tareas con bajo consumo de RAM). Evitar fotos borrosas, reflejos excesivos en la pantalla o fondos desordenados.
- **Dimensiones recomendadas:** `1000 x 667 px` (3:2) o `1200 x 800 px`.
- **Formato:** `.webp` (calidad 80–84%).
- **Peso objetivo:** Menos de `100 KB` por imagen.
- **Nombres recomendados:**
  - `formateo-laptop-hp-osorno.webp`
  - `optimizacion-pc-desktop.webp`
  - `instalacion-windows-ltsc.webp`

---

## 3. Recomendaciones para Videos Futuros (`/videos/`)

- **Propósito:** Mostrar fluidez de arranque (por ejemplo, arranque en menos de 10 segundos tras optimización) o demostraciones puntuales de software.
- **Duración recomendada:** Máximo `10 a 20 segundos`. Los clips cortos tienen un impacto mucho más alto y no penalizan la velocidad del sitio.
- **Resolución:** `1280 x 720 px` (720p) o `1920 x 1080 px` (1080p).
- **Formatos recomendados:**
  - Primario: `.webm` (códec VP9 / AV1) para máxima compresión y compatibilidad moderna.
  - Secundario (Fallback): `.mp4` (H.264).
- **Peso objetivo:** Menos de `2.5 MB` por clip.
- **Pautas de reproducción web:**
  - **Sin audio automático:** `muted` y `playsinline` por defecto.
  - **Poster:** Generar siempre una imagen estática de portada (`poster.webp`) para que cargue instantáneamente antes de la reproducción.
  - **Subtítulos/Captions:** Si el video contiene voz o explicaciones, incluir un archivo `.vtt` para accesibilidad.
- **Nombres recomendados:**
  - `demo-arranque-optimizado.mp4`
  - `demo-arranque-optimizado.webm`
  - `demo-arranque-poster.webp`

---

## 4. Herramientas Gratuitas Recomendadas para Procesamiento

1. **Squoosh.app:** Herramienta web de Google para convertir imágenes a `.webp` ajustando la compresión visualmente.
2. **HandBrake / ffmpeg:** Para comprimir videos a 720p/1080p con bitrate constante y exportar en MP4/WebM ligero.
3. **TinyPNG / OptiPNG:** Para compresión sin pérdida previa.

---

## 5. Regla de Integración Web

> **IMPORTANTE:** Ningún archivo de esta carpeta debe enlazarse en el código HTML público hasta que el recurso real haya sido añadido y validado. No se deben utilizar placeholders ni marcos vacíos que puedan dar la impresión de un sitio incompleto.
