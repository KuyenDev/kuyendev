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
  disclaimer: 'Valores evaluados en privado según el alcance y requerimientos específicos de cada cliente. Cotización directa sin compromiso.',
  plans: [
    {
      id: 'esencial',
      name: 'Plan Esencial',
      badge: 'Emprendedores & Profesionales',
      tagline: 'Presencia digital clara, rápida y profesional para captar clientes por WhatsApp.',
      price: null, // Sin precios públicos; cotización personalizada en privado
      priceDisplay: 'Presupuesto en privado',
      period: 'mensual',
      highlighted: false,
      ctaText: 'Cotizar en Privado',
      waMessage: 'Hola Franco, quisiera cotizar en privado el Plan Esencial de desarrollo web para mi negocio o profesión.',
      scopeTitle: '¿Qué incluye este plan?',
      features: [
        { text: 'Landing page o sitio compacto (1 a 3 secciones)', strong: true },
        { text: '100% Código a mano (cero WordPress ni constructores lentos)', strong: true },
        { text: 'Dominio propio y alojamiento seguro incluidos', strong: true },
        { text: 'Certificado de seguridad SSL HTTPS activo', strong: false },
        { text: 'Integración directa con WhatsApp para ventas y consultas', strong: true },
        { text: 'Optimización de carga instantánea (< 1s) para móviles', strong: false },
        { text: '1 ronda mensual de actualización de textos o fotos', strong: true },
        { text: 'Copias de seguridad mensuales de respaldo', strong: false }
      ],
      idealFor: 'Emprendimientos que inician, profesionales de la salud, abogados, consultores y servicios locales.'
    },
    {
      id: 'profesional',
      name: 'Plan Profesional',
      badge: 'Más Solicitado · Recomendado',
      tagline: 'Sitio corporativo multipágina para empresas y pymes que buscan máxima autoridad y ventas.',
      price: null, // Sin precios públicos; cotización personalizada en privado
      priceDisplay: 'Presupuesto en privado',
      period: 'mensual',
      highlighted: true,
      ctaText: 'Cotizar en Privado',
      waMessage: 'Hola Franco, me interesa cotizar en privado el Plan Profesional para la página web de mi empresa o negocio.',
      scopeTitle: 'Todo lo del Plan Esencial, más:',
      features: [
        { text: 'Sitio corporativo multipágina completo (4 a 6 páginas)', strong: true },
        { text: '100% Código a medida con identidad visual de tu marca', strong: true },
        { text: 'Dominio propio y gestión técnica integral incluida', strong: true },
        { text: 'Cero WordPress ni plugins pesados que ralenticen la web', strong: true },
        { text: 'SEO técnico avanzado con Schema.org y Open Graph', strong: false },
        { text: 'Formulario de cotización detallado según tu rubro', strong: false },
        { text: 'Hasta 3 rondas mensuales de cambios y nuevas secciones', strong: true },
        { text: 'Copias de seguridad periódicas y monitoreo continuo', strong: false },
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
      priceDisplay: 'Presupuesto en privado',
      period: 'mensual',
      highlighted: false,
      ctaText: 'Cotizar en Privado',
      waMessage: 'Hola Franco, quisiera cotizar en privado un proyecto web Plan Avanzado a la medida de mi empresa.',
      scopeTitle: 'Todo lo del Plan Profesional, más:',
      features: [
        { text: 'Arquitectura en código nativo sin límite estricto de páginas', strong: true },
        { text: 'Catálogo de servicios/productos o módulos de contenido a medida', strong: true },
        { text: 'Dominio propio, alojamiento seguro y gestión técnica total', strong: true },
        { text: 'Estrategia de posicionamiento SEO multisección', strong: false },
        { text: 'Gestión mensual activa de publicaciones y novedades', strong: true },
        { text: 'Monitoreo preventivo y copias de seguridad continuas', strong: false },
        { text: 'Soporte técnico preferencial directo en el día', strong: true }
      ],
      idealFor: 'Empresas medianas, instituciones educativas, catálogos comerciales y proyectos con flujos personalizados.'
    }
  ]
};
