/**
 * KUYÉNDEV NEXT · CONFIGURACIÓN CENTRALIZADA DE PLANES WEB
 * Este archivo centraliza la estructura, características, opciones de precios
 * y mensajes preconfigurados para WhatsApp de los planes mensuales de desarrollo web.
 * Permite actualizar ofertas comerciales en un solo lugar sin modificar el marcado HTML.
 */

window.KUYENDEV_PLANS_CONFIG = {
  currency: 'CLP',
  currencySymbol: '$',
  supportPhone: '56922231780',
  formattedPhone: '+56 9 2223 1780',
  disclaimer: 'Precios en pesos chilenos. Valores sujetos a confirmación técnica previa según el alcance del proyecto.',
  plans: [
    {
      id: 'esencial',
      name: 'Plan Esencial',
      badge: 'Emprendedores & Profesionales',
      tagline: 'Presencia digital clara, rápida y profesional para captar clientes por WhatsApp.',
      price: null, // Asignar número cuando el propietario defina el valor (ej: 25000)
      priceDisplay: 'Consultar tarifa',
      period: 'mensual',
      highlighted: false,
      ctaText: 'Consultar Plan Esencial',
      waMessage: 'Hola Franco, quisiera consultar por el Plan Esencial de desarrollo web para mi negocio o profesión.',
      scopeTitle: '¿Qué incluye este plan?',
      features: [
        { text: 'Landing page o sitio compacto (1 a 3 secciones)', strong: true },
        { text: 'Diseño responsive de alta gama (móviles y escritorio)', strong: false },
        { text: 'Integración directa con WhatsApp con mensaje predeterminado', strong: true },
        { text: 'Formulario de contacto básico con validación', strong: false },
        { text: 'Optimización SEO local inicial para Google', strong: false },
        { text: 'Alojamiento web y certificado SSL seguro incluidos', strong: true },
        { text: '1 ronda mensual de actualización de textos o imágenes', strong: true },
        { text: 'Copias de seguridad mensuales de respaldo', strong: false }
      ],
      idealFor: 'Emprendimientos que inician, profesionales de la salud, abogados, consultores y servicios locales.'
    },
    {
      id: 'profesional',
      name: 'Plan Profesional',
      badge: 'Más Solicitado · Recomendado',
      tagline: 'Sitio corporativo multipágina para empresas y pymes que buscan máxima autoridad y ventas.',
      price: null, // Asignar número cuando esté definido (ej: 45000)
      priceDisplay: 'Consultar tarifa',
      period: 'mensual',
      highlighted: true,
      ctaText: 'Cotizar Plan Profesional',
      waMessage: 'Hola Franco, me interesa cotizar el Plan Profesional para la página web de mi empresa o negocio.',
      scopeTitle: 'Todo lo del Plan Esencial, más:',
      features: [
        { text: 'Sitio corporativo multipágina completo (4 a 6 páginas)', strong: true },
        { text: 'Diseño a medida con identidad visual y arquitectura de marca', strong: true },
        { text: 'Formulario de cotización detallado según tu rubro', strong: false },
        { text: 'SEO técnico avanzado con Schema.org y Open Graph', strong: true },
        { text: 'Integración con analítica web y Google Search Console', strong: false },
        { text: 'Alojamiento de alta velocidad con CDN y certificado SSL', strong: false },
        { text: 'Hasta 3 rondas mensuales de cambios y nuevas secciones', strong: true },
        { text: 'Copias de seguridad semanales automáticas', strong: false },
        { text: 'Soporte prioritario directo con Franco Luna vía WhatsApp', strong: true }
      ],
      idealFor: 'Pymes comerciales, oficinas de servicios, constructoras, estudios profesionales y empresas consolidadas.'
    },
    {
      id: 'avanzado',
      name: 'Plan Avanzado',
      badge: 'Solución a Medida',
      tagline: 'Para organizaciones con requerimientos digitales específicos, catálogos o integraciones.',
      price: null,
      priceDisplay: 'Presupuesto a medida',
      period: 'mensual',
      highlighted: false,
      ctaText: 'Evaluar Proyecto a Medida',
      waMessage: 'Hola Franco, quisiera agendar una evaluación para un proyecto web a medida con requerimientos específicos.',
      scopeTitle: 'Todo lo del Plan Profesional, más:',
      features: [
        { text: 'Arquitectura digital personalizada sin límite estricto de páginas', strong: true },
        { text: 'Catálogo de servicios/productos o módulos de contenido dinámico', strong: true },
        { text: 'Integraciones con software externo, pasarelas o APIs', strong: false },
        { text: 'Estrategia de posicionamiento SEO semántico multisección', strong: true },
        { text: 'Alojamiento dedicado y optimización de rendimiento continuo', strong: false },
        { text: 'Gestión mensual activa de publicaciones y contenidos', strong: true },
        { text: 'Monitoreo proactivo de disponibilidad 24/7', strong: false },
        { text: 'Tiempo de respuesta de soporte técnico preferencial en el día', strong: true }
      ],
      idealFor: 'Empresas medianas, instituciones educativas, catálogos comerciales y proyectos con flujos personalizados.'
    }
  ]
};
