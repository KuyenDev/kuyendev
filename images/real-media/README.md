# Guía de Incorporación de Recursos Multimedia Reales · KuyénDev 3.0

Este directorio ha sido preparado para recibir y organizar los materiales audiovisuales reales futuros de **KuyénDev** (fotografías del fundador, espacio de trabajo, intervenciones técnicas y videos demostrativos).

---

## 1. Estructura de Carpetas

```text
images/real-media/
├── fundador/     -> Fotografías personales de Franco Luna (sobre nosotros, autor, perfil).
├── workspace/    -> Fotografías del área de trabajo, mesa técnica, herramientas y monitores.
├── trabajos/     -> Fotografías reales de computadores, laptops e intervenciones durante servicios.
├── videos/       -> Clips cortos demostrativos de inicio de sistema, diagnósticos o software.
└── README.md     -> Esta guía técnica de especificaciones y recomendaciones.
```

---

## 2. Pautas para Fotografías

### A. Fotografías del Fundador (`/fundador/`)
- **Propósito:** Humanizar la marca en la sección *Sobre Nosotros* y notas de prensa/casos reales, transmitiendo cercanía, seriedad y atención personalizada.
- **Enfoque recomendado:** Franco trabajando en el escritorio, revisando una pantalla o interactuando con un equipo en un ambiente ordenado con iluminación limpia (luz natural o tonos azul/neutro tecnológicos).
- **Resolución y Dimensiones:**
  - **Horizontal (Banner/Editorial):** `1200 x 800 px` (proporción 3:2) o `1600 x 900 px` (16:9).
  - **Vertical o Cuadrada (Avatar/Tarjeta):** `800 x 800 px` (1:1).
- **Formatos:** `.webp` (calidad 82–85%) o `.avif` de alta fidelidad.
- **Peso objetivo:** Menos de `120 KB` por imagen tras compresión.
- **Nombres estandarizados:**
  - `franco-luna-kuyendev-trabajando.webp`
  - `franco-luna-perfil-profesional.webp`

### B. Fotografías del Espacio de Trabajo (`/workspace/`)
- **Propósito:** Mostrar el entorno técnico real de trabajo (banco de pruebas, monitores con software de diagnóstico, orden y equipamiento).
- **Enfoque recomendado:** Tomas angulares limpias, sin desorden, con iluminación ambiental azulada o ámbar tenue acorde a la paleta KuyénDev 3.0.
- **Resolución:** `1200 x 800 px` (3:2) o `1920 x 1080 px` (16:9).
- **Formato:** `.webp` o `.avif`.
- **Peso objetivo:** Menos de `150 KB`.
- **Nombres recomendados:**
  - `estacion-trabajo-kuyendev-osorno.webp`
  - `banco-pruebas-software-kuyendev.webp`

### C. Fotografías de Servicios / Equipos Reales (`/trabajos/`)
- **Propósito:** Evidencia documental de trabajos completados (PCs de escritorio, laptops, laboratorios de instituciones).
- **Enfoque recomendado:** Tomas en ángulo del equipo terminado (con la pantalla mostrando el escritorio limpio o el Administrador de tareas con consumo de RAM bajo). Evitar fotos borrosas, reflejos excesivos o datos privados de clientes en pantalla.
- **Dimensiones:** `1000 x 667 px` (3:2) o `1200 x 800 px`.
- **Formato:** `.webp` (calidad 80–84%).
- **Peso objetivo:** Menos de `100 KB` por imagen.
- **Nombres recomendados:**
  - `formateo-laptop-hp-osorno.webp`
  - `optimizacion-pc-desktop.webp`
  - `instalacion-windows-ltsc.webp`

---

## 3. Pautas para Clips de Video Futuros (`/videos/`)

- **Propósito:** Demostrar fluidez real (por ejemplo, arranque en frío en pocos segundos tras optimización, o demostraciones de software liviano).
- **Duración máxima:** `10 a 20 segundos`. Los clips cortos tienen mayor tasa de visualización y no saturan el ancho de banda.
- **Resolución:** `1280 x 720 px` (720p) o `1920 x 1080 px` (1080p).
- **Formatos requeridos:**
  - **Primario:** `.webm` (códec VP9 o AV1) para navegadores modernos con máxima compresión.
  - **Fallback:** `.mp4` (códec H.264, perfil baseline/main).
- **Peso objetivo:** Menos de `2.5 MB` por clip.
- **Pautas de reproducción web:**
  - `muted` y `playsinline` por defecto (sin audio no solicitado).
  - **Poster:** Generar siempre una imagen estática de portada (`poster.webp`) para carga instantánea previa a la reproducción.
  - **Captions:** Si el video contiene narración o voz en español, incluir un archivo `.vtt` con subtítulos accesibles.
- **Nombres recomendados:**
  - `demo-arranque-optimizado.mp4`
  - `demo-arranque-optimizado.webm`
  - `demo-arranque-poster.webp`
  - `demo-arranque-subtitulos.vtt`

---

## 4. Herramientas Gratuitas Recomendadas para Procesamiento

1. **Squoosh.app:** Herramienta oficial de Google para compresión y conversión visual a `.webp` y `.avif`.
2. **HandBrake / FFmpeg:** Para comprimir video a 720p/1080p con tasa constante de bits (CRF 24–28) y exportar en MP4/WebM.
3. **TinyPNG / OptiPNG:** Para compresión sin pérdida de elementos complementarios.

---

## 5. Regla Absoluta de Integración Web

> **IMPORTANTE:** Ningún archivo de esta carpeta debe enlazarse en el código HTML público hasta que el recurso real haya sido añadido y validado. Queda estrictamente prohibido utilizar placeholders, avatares generados por IA simulando una persona real, o cajas vacías que den la impresión de un sitio incompleto.
