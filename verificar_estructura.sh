#!/bin/bash
# Script de Verificación de Integridad — KuyénDev Next v4.1
# Validación de Rutas, Noticias, Servicios Web y Enlaces

echo "═══════════════════════════════════════════════════════════════"
echo "  VERIFICACIÓN DE INTEGRIDAD WEB — KuyénDev Next"
echo "  Estudio Tecnológico: Desarrollo Web, Servicios & Noticias"
echo "═══════════════════════════════════════════════════════════════"
echo ""

ERRORS=0

# 1. Verificar archivos esenciales
echo "📁 1. Archivos Core & Configuración:"
for file in "index.html" "css/styles.css" "js/config/plans.js" "js/script.js" "sitemap.xml" "robots.txt" "CNAME" "icons/favicon.ico"; do
  if [ -f "$file" ]; then
    echo "   ✅ $file presente"
  else
    echo "   ❌ ERROR: Falta $file"
    ERRORS=$((ERRORS + 1))
  fi
done
echo ""

# 2. Verificar páginas de la plataforma y contenido
echo "📄 2. Páginas de la Plataforma y Contenido:"
for page in "index.html" \
            "404.html" \
            "pages/desarrollo-web.html" \
            "pages/planes-web.html" \
            "pages/servicios-informaticos.html" \
            "pages/empresas.html" \
            "pages/noticias.html" \
            "pages/nosotros.html" \
            "pages/contacto.html" \
            "pages/terminos.html" \
            "pages/publicaciones.html" \
            "pages/proyectos.html" \
            "pages/content/bertoldo_hofmann.html" \
            "pages/content/lanzamiento-desarrollo-web-planes-mensuales.html"; do
  if [ -f "$page" ]; then
    echo "   ✅ $page presente"
  else
    echo "   ❌ ERROR: Falta $page"
    ERRORS=$((ERRORS + 1))
  fi
done
echo ""

# 3. Verificar referencias a CSS y JS en páginas activas
echo "🔗 3. Enlaces a CSS y JS en páginas activas:"
for html in "index.html" \
            "404.html" \
            "pages/desarrollo-web.html" \
            "pages/planes-web.html" \
            "pages/servicios-informaticos.html" \
            "pages/empresas.html" \
            "pages/noticias.html" \
            "pages/nosotros.html" \
            "pages/contacto.html" \
            "pages/terminos.html" \
            "pages/content/bertoldo_hofmann.html" \
            "pages/content/lanzamiento-desarrollo-web-planes-mensuales.html"; do
  if grep -q "styles.css" "$html" && grep -q "script.js" "$html"; then
    echo "   ✅ $html enlaza styles.css y script.js"
  else
    echo "   ⚠️ ALERTA: Verificar enlaces en $html"
    ERRORS=$((ERRORS + 1))
  fi
done
echo ""

# 4. Verificar ID de anclas en index.html
echo "⚓ 4. Secciones Ancla en index.html:"
for anchor in "servicios" "planes" "proceso" "faq" "contacto"; do
  if grep -q "id=\"$anchor\"" index.html; then
    echo "   ✅ Sección #$anchor existe"
  else
    echo "   ❌ Falta sección #$anchor"
    ERRORS=$((ERRORS + 1))
  fi
done
echo ""

# 5. Verificar que no exista contenido ficticio no autorizado
echo "🛡️ 5. Control de Contenido No Autorizado:"
for forbidden in "Atelier Patagonia" "Clínica Austral" "Protocolo para Oficinas y Estudios"; do
  MATCHES=$(grep -rn "$forbidden" index.html pages/*.html pages/content/*.html 2>/dev/null || true)
  if [ -z "$MATCHES" ]; then
    echo "   ✅ Cero menciones de '$forbidden'"
  else
    echo "   ❌ ERROR: Se encontraron menciones no autorizadas de '$forbidden':"
    echo "$MATCHES"
    ERRORS=$((ERRORS + 1))
  fi
done
echo ""

# 6. Resumen Final
echo "═══════════════════════════════════════════════════════════════"
if [ $ERRORS -eq 0 ]; then
  echo "  RESULTADO: 100% de los componentes y páginas validados exitosamente ✅"
else
  echo "  RESULTADO: Se detectaron $ERRORS advertencias/errores ⚠️"
fi
echo "═══════════════════════════════════════════════════════════════"

exit $ERRORS
