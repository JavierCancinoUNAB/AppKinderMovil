#!/bin/bash

# Script para verificar configuración de Google Sign-In

echo "🔍 VERIFICACIÓN DE GOOGLE SIGN-IN"
echo "=================================="
echo ""

# Verificar si existe google-services.json
if [ -f "google-services.json" ]; then
    echo "✅ google-services.json encontrado"
    
    # Extraer SHA-1 fingerprints
    echo ""
    echo "📋 SHA-1 Fingerprints en google-services.json:"
    grep -o '"certificate_hash": "[^"]*"' google-services.json | sed 's/"certificate_hash": "\([^"]*\)"/  - \1/'
    
    # Extraer Android Client IDs
    echo ""
    echo "🔑 Android Client IDs (client_type: 1):"
    grep -B 5 '"client_type": 1' google-services.json | grep '"client_id"' | sed 's/.*"client_id": "\([^"]*\)".*/  - \1/'
    
    # Extraer Web Client ID
    echo ""
    echo "🌐 Web Client ID (client_type: 3):"
    grep -B 2 '"client_type": 3' google-services.json | grep '"client_id"' | sed 's/.*"client_id": "\([^"]*\)".*/  - \1/'
    
else
    echo "❌ google-services.json NO encontrado"
    exit 1
fi

echo ""
echo "🎯 SHA-1 Requerido de EAS:"
echo "  21E91CBFC6CC9F3E69DAD853E6EA47B48388EBF7"
echo ""
echo "⚠️  Verifica que este SHA-1 esté en la lista de arriba"
