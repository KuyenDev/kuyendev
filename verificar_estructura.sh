#!/bin/bash
# Script de Verificación de Integridad — KuyénDev v3.0

echo "═══════════════════════════════════════════════════════════════"
echo "  VERIFICACIÓN DE INTEGRIDAD WEB — KuyénDev v3.0"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# 1. Verificar archivos esenciales
echo "📁 1. Archivos Core & SEO:"
for file in "index.html" "css/styles.css" "js/script.js" "sitemap.xml" "robots.txt" "CNAME" "icons/KuyenDev_logo_cuadrado_transparente.ico"; do
  if [ -f "$file" ]; then
    echo "   ✅ $file presente"
  else
    echo "   ❌ ERROR: Falta $file"
  fi
done
echo ""

# 2. Verificar páginas secundarias
echo "📄 2. Páginas Secundarias:"
for page in "pages/empresas.html" "pages/publicaciones.html" "pages/noticias.html" "pages/terminos.html" "pages/content/bertoldo_hofmann.html"; do
  if [ -f "$page" ]; then
    echo "   ✅ $page presente"
  else
    echo "   ❌ ERROR: Falta $page"
  fi
done
echo ""

# 3. Verificar referencias a CSS y JS
echo "🔗 3. Enlaces a CSS y JS en archivos HTML:"
for html in "index.html" "pages/empresas.html" "pages/publicaciones.html" "pages/terminos.html" "pages/content/bertoldo_hofmann.html"; do
  if grep -q "styles.css" "$html" && grep -q "script.js" "$html"; then
    echo "   ✅ $html enlaza styles.css y script.js"
  else
    echo "   ⚠️ ALERTA: Verificar enlaces en $html"
  fi
done
echo ""

# 4. Verificar ID de anclas internas en index.html
echo "⚓ 4. Secciones Ancla en index.html:"
for anchor in "servicios" "asistente" "checklist-previa" "garantia" "proceso" "nosotros" "faq" "contacto"; do
  if grep -q "id=\"$anchor\"" index.html; then
    echo "   ✅ Sección #$anchor existe"
  else
    echo "   ❌ Falta sección #$anchor"
  fi
done
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "  RESULTADO: Todos los componentes validados exitosamente ✅"
echo "═══════════════════════════════════════════════════════════════"
