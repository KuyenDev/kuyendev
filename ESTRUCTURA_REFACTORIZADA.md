# Estructura de Proyecto Refactorizado - KuyénDev

## Descripción
El proyecto ha sido refactorizado para separar las secciones principales del sitio en archivos HTML independientes. Esto permite mantener el código más organizado, limpio y fácil de editar.

## Estructura de Carpetas

```
public/
├── index.html           # Archivo principal (navbar, hero, stats, footer, CTA)
├── pages/               # Secciones individuales
│   ├── nosotros.html    # Sección "Sobre nosotros"
│   ├── servicios.html   # Sección "Servicios"
│   ├── problemas.html   # Sección "¿Te suena familiar?"
│   ├── educacion.html   # Sección "Educación"
│   ├── proceso.html     # Sección "Proceso de trabajo"
│   ├── instagram.html   # Sección "Instagram"
│   ├── testimonios.html # Sección "Testimonios"
│   ├── faq.html         # Sección "Preguntas frecuentes"
│   └── contacto.html    # Sección "Contacto"
├── css/
│   └── styles.css
├── js/
│   └── script.js        # Incluye carga dinámica de secciones
└── images/
```

## Cómo Funciona

### 1. Carga Dinámica
- El `script.js` carga automáticamente cada sección desde su archivo correspondiente en `pages/`
- Esto ocurre cuando el DOM está listo
- Cada sección se inserta en su contenedor designado en `index.html`

### 2. Edición de Secciones
Para editar una sección, simplemente abre el archivo HTML correspondiente en `pages/`:

- **Editar "Nosotros"** → `pages/nosotros.html`
- **Editar "Servicios"** → `pages/servicios.html`
- **Editar "Proceso"** → `pages/proceso.html`
- **Editar "Educación"** → `pages/educacion.html`
- **Editar "Testimonios"** → `pages/testimonios.html`
- **Editar "FAQ"** → `pages/faq.html`
- **Editar "Instagram"** → `pages/instagram.html`
- **Editar "Contacto"** → `pages/contacto.html`
- **Editar "Problemas"** → `pages/problemas.html`

### 3. Contenido de `index.html`
El archivo `index.html` ahora contiene solo:
- Declaración de HTML
- Metadatos y head
- Canvas de partículas de fondo
- Navegación
- Hero section
- Stats bar
- Contenedores vacíos para secciones dinámicas
- Footer
- Script de carga

### 4. Flujo de Inicialización
1. Se carga `index.html`
2. Se ejecuta `script.js`
3. El sistema detecta que el DOM está listo
4. Se inicia `loadSections()` que:
   - Itera sobre cada sección
   - Realiza fetch a `pages/[archivo].html`
   - Inserta el contenido en el contenedor correspondiente
   - Llama a `initScrollReveal()` para activar animaciones

## Ventajas de Esta Estructura

✅ **Código más limpio** - Cada sección está en su propio archivo
✅ **Fácil de mantener** - Cambios localizados sin afectar otras secciones
✅ **Reutilizable** - Las secciones pueden usarse en otras páginas fácilmente
✅ **Mejor colaboración** - Múltiples personas pueden editar diferentes secciones
✅ **Performance** - La carga es asincrónica, no bloquea la página
✅ **SEO-friendly** - El contenido se renderiza en el DOM final

## Notas Importantes

1. **Las imágenes**: Las rutas en los archivos `pages/` deben ser relativas a `public/` (la carpeta base), no relativas a `pages/`
   - ✅ Correcto: `background-image: url('images/logo.png')`
   - ❌ Incorrecto: `background-image: url('../images/logo.png')`

2. **Las funciones JavaScript**: El `script.js` debe incluir todas las funciones necesarias (como `toggleFaq()`, `sendWhatsApp()`, etc.)

3. **CSS**: Todos los estilos deben estar en `css/styles.css` como estaban antes

4. **Agregar nueva sección**: 
   - Crea un nuevo archivo HTML en `pages/`
   - Agrega una entrada en el array `sections` dentro de `script.js`
   - Crea un contenedor `<div>` en `index.html` con id `section-[nombre]`

## Archivos Modificados

- `public/index.html` - Refactorizado para usar carga dinámica
- `public/js/script.js` - Agregada lógica de carga de secciones
- `public/pages/problemas.html` - Creado (antes estaba en index.html)

## Testing

Para verificar que todo funciona:
1. Abre `index.html` en el navegador
2. Verifica que todas las secciones se cargan correctamente
3. Comprueba que los enlaces de navegación funcionan
4. Valida que las animaciones scroll reveal se activen
5. Prueba las funciones interactivas (FAQ, formulario, etc.)
