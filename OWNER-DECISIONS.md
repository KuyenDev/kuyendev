# KuyénDev Next · Decisiones Pendientes del Propietario (Franco Luna)
**Documento de Control Comercial & Estratégico**  
**Fecha:** 16 de Octubre de 2026  
**Objetivo:** Definir las políticas comerciales, tarifas y condiciones antes de publicar en producción.  

---

## 1. Introducción

El rediseño integral de la plataforma web de **KuyénDev** ha sido completado con éxito en el entorno de desarrollo bajo la rama aislada `redesign/kuyendev-next`.

La arquitectura visual, el sistema de navegación multipágina, el código frontend, la adaptabilidad responsive y el marco legal han sido construidos cumpliendo con el principio fundamental: **no inventar precios ficticios, certificaciones no verificadas ni condiciones contractuales no autorizadas.**

Por esta razón, la web está actualmente configurada de forma segura para presentar la opción **«Consultar tarifa» / «Cotizar plan»** con integración directa a WhatsApp. 

Antes de realizar el paso a producción (`main`), el propietario debe revisar y decidir sobre los siguientes 7 puntos comerciales:

---

## 2. Puntos de Decisión Comercial

### Decisión 1: Tarifas de los Planes Mensuales Web
Actualmente en `js/config/plans.js` los precios están definidos como `null` con etiqueta `priceDisplay: "Consultar tarifa"`.
- **Pregunta:** ¿Deseas publicar valores numéricos en Pesos Chilenos (CLP) desde el lanzamiento, o prefieres mantener temporalmente el botón de cotización directa por WhatsApp para evaluar cada proyecto de forma personalizada?
- **Opciones:**
  - **Opción A (Recomendada inicialmente):** Mantener "Consultar tarifa / Cotizar Plan" durante las primeras semanas para calibrar el mercado y negociar según la complejidad de cada cliente.
  - **Opción B:** Publicar tarifas fijas de referencia (ejemplo orientativo de mercado en Los Lagos: Plan Esencial $29.900 CLP/mes, Plan Profesional $49.900 CLP/mes, Plan Avanzado Cotización personalizada).
- **Cómo modificarlo:** Basta con abrir el archivo [js/config/plans.js](file:///home/kuyen/Proyectos/Webs/kuyendev/js/config/plans.js) y asignar el número deseado en el atributo `price` de cada plan.

---

### Decisión 2: Costo de Setup Inicial vs. Modelo Puro de Suscripción
- **Pregunta:** ¿Cobrarás un costo inicial por el diseño y construcción de la página web más la mensualidad de mantenimiento, o cobrarás únicamente la suscripción mensual amortizando el desarrollo?
- **Opciones:**
  - **Opción A (Desarrollo + Mantenimiento):** Cobro único inicial por la construcción del sitio (ej: $150.000 a $300.000 CLP) + mensualidad reducida de hosting y soporte continuo (ej: $15.000 a $25.000 CLP/mes).
  - **Opción B (Suscripción pura tipo SaaS):** Costo inicial $0 o muy bajo, pero con compromiso de permanencia mínima de 12 meses para amortizar las horas de desarrollo.
- **Acción requerida:** Confirmar la modalidad para actualizar la sección de precios y las preguntas frecuentes de `pages/planes-web.html`.

---

### Decisión 3: Plazo de Permanencia Mínima en Planes Web
- **Pregunta:** Si un cliente contrata una página web bajo plan mensual, ¿existirá un período mínimo de permanencia o podrá cancelar en cualquier momento?
- **Recomendación técnica:** Si no se cobra costo de diseño inicial, es indispensable exigir una permanencia mínima de **6 a 12 meses** para no trabajar a pérdida. Si el cliente ya pagó el costo de desarrollo por adelantado, la mantención mensual puede cancelarse mes a mes sin problema.
- **Estado actual en la web:** Marcado en la tabla comparativa como *"Sujeto a acuerdo comercial formal"* para no obligarte legalmente a ninguna opción hasta que lo decidas.

---

### Decisión 4: Dominio .CL (Inclusión o Gestión por el Cliente)
- **Pregunta:** ¿El costo anual del dominio .CL (aproximadamente $10.950 CLP en NIC Chile) estará incluido en el plan, o el cliente debe comprarlo directamente?
- **Recomendación de transparencia:** Recomendamos enfáticamente que el cliente registre el dominio a su propio nombre en [nic.cl](https://www.nic.cl) y te otorgue contacto técnico. Esto le da 100% de tranquilidad sobre su propiedad intelectual y te libera de responsabilidades sobre la renovación legal de su marca.
- **Estado actual en la web:** Indicado como *"El cliente es dueño del dominio en NIC Chile y nosotros configuramos los DNS sin costo adicional"*.

---

### Decisión 5: Tarifas de Servicios Informáticos para Particulares
- **Pregunta:** En `pages/servicios-informaticos.html`, los servicios de formateo, Windows LTSC y optimización cuentan con botón *"Consultar por WhatsApp"*. ¿Prefieres mantenerlo así o publicar una tabla de precios referenciales de taller?
- **Opciones:**
  - **Opción A:** Mantener consulta previa (permite evaluar el estado físico del equipo antes de comprometer un precio, especialmente si el disco duro está dañado).
  - **Opción B:** Publicar precios base (ej: Formateo limpio $20.000 - $25.000 CLP; Optimización sin formatear $15.000 CLP; Asistencia remota $15.000 CLP).

---

### Decisión 6: Fotografías Reales de Taller y Perfil
- Actualmente se crearon las carpetas organizadas en `images/real-media/`:
  - `images/real-media/fundador/`
  - `images/real-media/workspace/`
  - `images/real-media/trabajos/`
- En cuanto dispongas de una fotografía profesional tuya en Osorno o de tu estación de trabajo con monitores, podrás añadirlas a estas carpetas para sustituir los recursos conceptuales de la página Nosotros.

---

### Decisión 7: Autorización de Publicación en Producción
- El código se encuentra probado, validado al 100% y listo para ser desplegado.
- **Pasos para publicar cuando estés listo:**
  1. Revisar visualmente las páginas navegando localmente en el entorno de desarrollo.
  2. Ajustar los valores en `js/config/plans.js` si deseas fijar precios numéricos.
  3. Ejecutar la fusión de la rama `redesign/kuyendev-next` a la rama `main`:
     ```bash
     git checkout main
     git merge redesign/kuyendev-next
     git push origin main
     ```
  4. Los cambios se publicarán automáticamente en tu servidor web / GitHub Pages en `https://kuyendev.cl/`.
