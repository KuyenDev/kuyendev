# KUYÉNDEV NEXT · CONFIGURACIÓN Y MODELO COMERCIAL DE PLANES WEB

> **Documento:** WEB-PLANS-CONFIG.md  
> **Proyecto:** KuyénDev Next  
> **Línea Comercial:** Planes Mensuales de Desarrollo y Mantenimiento Web  
> **Archivo de Código Fuente Centralizado:** `js/config/plans.js`  
> **Moneda Objetivo:** Pesos Chilenos (CLP)  

---

## 1. Filosofía Comercial de los Planes Mensuales

El modelo de suscripción mensual de KuyénDev Next resuelve el dolor más agudo de las pymes: **el abandono post-entrega**. La mayoría de las agencias entregan un sitio y cobran cifras desmedidas por cualquier ajuste menor posterior.

KuyénDev propone una relación de continuidad técnica: el cliente abona una cuota mensual que incluye **diseño, publicación, hosting gestionado, soporte técnico, copias de seguridad y una cuota fija de modificaciones mensuales** para que su página esté siempre al día y generando ventas.

---

## 2. Los Tres Niveles Comerciales

### 2.1. Plan Esencial
- **Público Objetivo:** Emprendedores que inician su negocio, profesionales independientes (médicos, abogados, consultores) y servicios locales que necesitan una presencia digital impecable para generar confianza y recibir consultas directas por WhatsApp.
- **Formato de Sitio:** Landing page o sitio compacto (1 a 3 secciones principales integradas).
- **Características Base:**
  - Diseño visual personalizado y adaptado a la identidad del cliente (no plantillas genéricas).
  - 100% Responsive (móvil, tablet y escritorio).
  - Botón flotante y enlaces directos a WhatsApp Business con mensaje predefinido.
  - Formulario de contacto básico con validación.
  - SEO técnico inicial (meta tags, Open Graph, indexación en Google).
  - Alojamiento y certificado SSL (HTTPS) gestionado.
  - **Mantenimiento Mensual:** Hasta 1 ronda mensual de modificaciones menores (cambio de textos, actualización de fotos o precios de servicios).
  - Copias de seguridad periódicas y monitoreo de funcionamiento.
- **Precio Web Actual:** Preparado para valor en CLP. Mientras el propietario no confirme el monto exacto, se despliega el botón *"Consultar Plan Esencial"* con enlace directo a WhatsApp.

---

### 2.2. Plan Profesional (Recomendado)
- **Público Objetivo:** Negocios consolidados, pymes, empresas de servicios, oficinas contables y estudios que requieren un sitio multipágina completo que transmita máxima autoridad corporativa y atraiga clientes de forma sostenida.
- **Formato de Sitio:** Sitio corporativo multipágina (4 a 6 páginas: Inicio, Servicios, Nosotros, Casos/Galería, Contacto, Políticas).
- **Características Base:**
  - Arquitectura y diseño visual a medida de alta gama.
  - Formulario de cotización avanzado con campos específicos del rubro.
  - Optimización SEO on-page avanzada y Schema.org estructurado para posicionamiento local en Google.
  - Rendimiento optimizado (Core Web Vitals verdes).
  - Integración con analítica web y Google Search Console.
  - Alojamiento de alta velocidad con CDN global y SSL permanente.
  - **Mantenimiento Mensual:** Hasta 2 a 3 rondas mensuales de cambios y adiciones de contenido.
  - Copias de seguridad automáticas y soporte técnico prioritario vía WhatsApp directo con Franco Luna.
- **Precio Web Actual:** Etiquetado como *"Recomendado"* / *"Más Solicitado"*, con botón *"Cotizar Plan Profesional"*.

---

### 2.3. Plan Avanzado
- **Público Objetivo:** Empresas medianas, colegios, instituciones o marcas que requieren una arquitectura digital personalizada, catálogos extensos de productos/servicios o integraciones de software específicas.
- **Formato de Sitio:** Arquitectura a medida sin límite estricto de páginas base, según evaluación de alcance.
- **Características Base:**
  - Desarrollo de funcionalidades especiales o integraciones con sistemas externos (CRM, bases de datos o pasarelas de consulta).
  - Catálogo digital estructurado de servicios o productos.
  - Estrategia de SEO técnico semántico exhaustiva.
  - **Mantenimiento Continuo:** Gestión recurrente de contenido, monitoreo de disponibilidad 24/7 y auditorías trimestrales de velocidad.
  - Tiempo de respuesta de soporte técnico garantizado.
- **Precio Web Actual:** Botón *"Solicitar Evaluación a Medida"*.

---

## 3. Matriz Comparativa de Características para la Web

| Dimensión / Característica | Plan Esencial | Plan Profesional (Recomendado) | Plan Avanzado |
|---|:---:|:---:|:---:|
| **Tipo de Sitio** | Landing Page / Sitio Compacto | Sitio Corporativo Multipágina | Arquitectura a Medida |
| **Páginas / Secciones** | 1 a 3 secciones | 4 a 6 páginas | Personalizado según proyecto |
| **Diseño Visual** | A medida para la marca | A medida de alta gama | Premium con motion design |
| **Optimización Móvil (Responsive)** | Sí (100% adaptado) | Sí (100% adaptado) | Sí (100% adaptado) |
| **Integración con WhatsApp** | Mensaje predefinido | Mensaje predefinido por servicio | Mensaje contextual avanzado |
| **Formularios de Contacto** | Formulario estándar | Formulario de cotización detallado | Formularios multi-etapa a medida |
| **Optimización SEO** | SEO local y metadatos base | SEO avanzado + Schema.org | SEO integral semántico |
| **Alojamiento & Certificado SSL** | Incluido y gestionado | Incluido de alta velocidad | Incluido con CDN dedicado |
| **Gestión de Dominio (.cl / .com)** | Configuración técnica | Gestión y configuración técnica | Gestión y configuración técnica |
| **Modificaciones Mensuales** | 1 ronda mensual de cambios | 2 a 3 rondas mensuales | Gestión continua acordada |
| **Copias de Seguridad (Backups)** | Mensuales | Semanales automáticas | Frecuentes / Continuas |
| **Canal de Soporte** | WhatsApp y Correo | WhatsApp prioritario directo | WhatsApp prioritario + Asistencia remota |
| **Tiempo de Respuesta Soporte** | Hasta 48 hrs hábiles | Hasta 24 hrs hábiles | Prioritario en el día |
| **Propiedad del Sitio Web** | 100% del cliente tras contrato | 100% del cliente tras contrato | 100% del cliente tras contrato |

---

## 4. Estructura de Datos Centralizada (`js/config/plans.js`)

Para que el propietario (Franco Luna) pueda modificar precios, textos, características o plazos en cualquier momento **sin editar código HTML**, toda la información se centraliza en el objeto global `window.KUYENDEV_PLANS_CONFIG`:

```javascript
/**
 * Configuración Centralizada de Planes Web KuyénDev Next
 * Modifica los valores de este archivo para actualizar automáticamente
 * todas las tarjetas y tablas comparativas de la web.
 */
window.KUYENDEV_PLANS_CONFIG = {
  currency: 'CLP',
  currencySymbol: '$',
  disclaimer: 'Precios en pesos chilenos. Facturación disponible. Valores sujetos a confirmación técnica según requerimientos.',
  plans: [
    {
      id: 'esencial',
      name: 'Plan Esencial',
      tagline: 'Ideal para emprendimientos y profesionales independientes.',
      badge: 'Presencia Rápida',
      price: null, // Asignar número (ej. 25000) cuando esté confirmado
      setupFee: null, // Costo de desarrollo inicial si aplica
      priceDisplay: 'Consultar tarifa',
      period: 'mensual',
      highlighted: false,
      ctaText: 'Consultar Plan Esencial',
      ctaType: 'whatsapp',
      waMessage: 'Hola Franco, quisiera consultar por el Plan Esencial de desarrollo web para mi proyecto.',
      features: [
        'Landing page o sitio compacto (1-3 secciones)',
        'Diseño visual limpio y 100% responsive',
        'Botón directo a WhatsApp con mensaje preconfigurado',
        'Formulario de contacto con validación',
        'SEO técnico inicial para aparecer en Google',
        'Alojamiento web y certificado SSL incluidos',
        '1 ronda mensual de cambios de texto o fotos',
        'Copias de seguridad mensuales'
      ]
    },
    {
      id: 'profesional',
      name: 'Plan Profesional',
      tagline: 'La solución completa para empresas y pymes en crecimiento.',
      badge: 'Más Solicitado',
      price: null, // Asignar número cuando esté confirmado
      setupFee: null,
      priceDisplay: 'Consultar tarifa',
      period: 'mensual',
      highlighted: true,
      ctaText: 'Cotizar Plan Profesional',
      ctaType: 'whatsapp',
      waMessage: 'Hola Franco, me interesa cotizar el Plan Profesional para la página web de mi empresa.',
      features: [
        'Sitio corporativo multipágina (hasta 5-6 páginas)',
        'Diseño a medida con identidad visual de alta gama',
        'Formulario de cotización detallado para tu rubro',
        'Optimización SEO avanzada con datos Schema.org',
        'Integración con Google Search Console y analítica',
        'Alojamiento de alta velocidad con CDN y SSL',
        'Hasta 3 rondas mensuales de actualizaciones',
        'Copias de seguridad semanales automáticas',
        'Soporte prioritario directo con Franco Luna'
      ]
    },
    {
      id: 'avanzado',
      name: 'Plan Avanzado',
      tagline: 'Para organizaciones con requerimientos digitales a medida.',
      badge: 'Solución Corporativa',
      price: null,
      setupFee: null,
      priceDisplay: 'A medida',
      period: 'mensual',
      highlighted: false,
      ctaText: 'Evaluar Proyecto a Medida',
      ctaType: 'whatsapp',
      waMessage: 'Hola Franco, quisiera agendar una evaluación para un proyecto web a medida con necesidades especiales.',
      features: [
        'Arquitectura digital a medida sin límite estricto',
        'Catálogo de servicios/productos o funcionalidades especiales',
        'Integraciones con sistemas externos o APIs',
        'SEO semántico exhaustivo para múltiples servicios',
        'Monitoreo proactivo de disponibilidad y rendimiento',
        'Alojamiento optimizado para alto tráfico',
        'Gestión continua de contenidos acordada',
        'Soporte dedicado con tiempo de respuesta prioritario'
      ]
    }
  ]
};
```

---

## 5. Preguntas Frecuentes Comerciales sobre Planes

1. **¿La página web es de mi propiedad?**  
   *Sí. La propiedad intelectual del contenido, textos, imágenes de marca y diseño final pertenece al cliente. Si en algún momento decides migrar a otro proveedor tras cumplir los plazos acordados, se te entregan los archivos fuente del proyecto.*
2. **¿Qué incluye el mantenimiento mensual?**  
   *El mantenimiento asegura que tu web no quede abandonada: incluye alojamiento de alta velocidad, renovación de certificado de seguridad SSL, monitoreo de que el sitio esté siempre en línea, copias de seguridad de resguardo y una cuota mensual de modificaciones para actualizar textos, fotos, teléfonos o servicios.*
3. **¿Qué se considera un cambio o modificación mensual?**  
   *Cambios de textos, corrección de números de contacto, adición de nuevas fotografías a una galería, actualización de precios en un menú o publicación de avisos temporales. No incluye rediseñar el sitio completo desde cero ni programar módulos de software no contratados originalmente.*
4. **¿El dominio (.cl o .com) está incluido?**  
   *Podemos asesorarte y gestionar la compra de tu dominio oficial en NIC Chile (.cl) a tu nombre, o bien conectar un dominio que ya tengas comprado sin costo adicional.*
5. **¿Qué ocurre si necesito una tienda online con carrito de compras?**  
   *Las tiendas de comercio electrónico con pasarelas de pago automáticas (Webpay, Mercado Pago) y control de stock requieren una infraestructura especial que se evalúa y cotiza como un proyecto a medida en el Plan Avanzado.*
