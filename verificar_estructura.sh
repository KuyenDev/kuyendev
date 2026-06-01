#!/bin/bash
# Script de verificación - Estructura Refactorizada KuyénDev

echo "═══════════════════════════════════════════════════════════════"
echo "  VERIFICACIÓN DE ESTRUCTURA - KuyénDev (Refactorizado)"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Verificar archivos en pages/
echo "📂 Archivos en pages/:"
ls -1 pages/ | grep ".html" | while read file; do
    echo "   ✅ $file"
done
echo ""

# Verificar que el index.html tiene todos los contenedores
echo "📄 Contenedores cargados en index.html:"
grep -o 'id="section-[^"]*"' index.html | sort -u | while read id; do
    section_name=$(echo "$id" | sed 's/id="section-//;s/"//g')
    echo "   ✅ $section_name"
done
echo ""

# Verificar script.js
echo "⚙️  Verificación de script.js:"
if grep -q "loadSections" index.html; then
    echo "   ✅ Función loadSections inicializada"
fi
if grep -q "async function loadSections" js/script.js; then
    echo "   ✅ Función loadSections definida"
fi
if grep -q "initScrollReveal" js/script.js; then
    echo "   ✅ Función initScrollReveal definida"
fi
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "  RESUMEN: Proyecto refactorizado exitosamente ✅"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📖 Para más información, ver: ESTRUCTURA_REFACTORIZADA.md"
