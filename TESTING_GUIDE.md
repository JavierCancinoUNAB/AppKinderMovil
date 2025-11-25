# 🧪 Guía de Prueba de Google Auth

## ✅ Cambios Realizados

### 1. Configuración Corregida
- ✅ Renombrado `google-services (1).json` → `google-services.json`
- ✅ Actualizado Client IDs con el project_number correcto (219841203502)
- ✅ Todas las validaciones de configuración pasan correctamente

### 2. Herramientas de Diagnóstico Creadas

#### a) Script de Test de Configuración (`test-google-config.js`)
```bash
node test-google-config.js
```
Este script verifica:
- Variables de entorno
- Formato de Client IDs
- Project Number correcto
- Coherencia del proyecto

**Resultado:** ✅ TODOS LOS TESTS PASARON

#### b) Utilidad de Diagnóstico en la App
- Archivo: `src/utils/googleAuthDiagnostic.ts`
- Se ejecuta automáticamente al abrir la pantalla de login
- Imprime información detallada en la consola

#### c) Pantalla de Test Interactiva
- Archivo: `src/screens/GoogleAuthTestScreen.tsx`
- Accesible desde el botón "🧪 Modo Test" en la pantalla de login

## 🚀 Cómo Probar

### Opción 1: Desde la App (RECOMENDADO)

1. **Abre la app en tu dispositivo/emulador**
   - Escanea el código QR con Expo Go
   - O presiona `a` en la terminal para Android

2. **En la pantalla de Login**
   - Verás la consola con información de diagnóstico
   - Presiona el botón **"🧪 Modo Test"** (abajo del botón principal)

3. **En la Pantalla de Test**
   - Presiona **"🔍 Diagnosticar"** para ver la configuración completa
   - Presiona **"🚀 Probar Login"** para intentar iniciar sesión con Google
   - Observa los logs detallados en tiempo real

4. **Revisa los Logs**
   - Si ves "✅ Respuesta exitosa de Google!" → Todo funciona
   - Si ves errores, los logs mostrarán exactamente qué falló

### Opción 2: Desde la Pantalla de Login Normal

1. Presiona el botón **"Ingresar con Google"**
2. Revisa la consola de Metro Bundler (terminal)
3. Busca los logs que comienzan con 🚀, 🔑, ✅ o ❌

## 🔍 Qué Buscar en los Logs

### Logs Exitosos (✅)
```
✅ Respuesta exitosa de Google!
✅ ID Token recibido: eyJhbGciOiJSUzI1Ni...
```

### Errores Comunes (❌)

#### Error: "invalid_client"
```
❌ Error: invalid_client
```
**Solución:** Los Client IDs no están registrados en Firebase Console
→ Necesitas configurar OAuth en Firebase Console

#### Error: "access_denied" 
```
❌ Error: access_denied
```
**Solución:** El usuario canceló o Google bloqueó la solicitud
→ Verifica que Google Sign-In esté habilitado en Firebase

#### Error: "Request no disponible"
```
❌ Request no está disponible
```
**Solución:** Los Client IDs no están configurados correctamente
→ Revisa `app.config.ts`

## 📊 Estado Actual de la Configuración

### ✅ Configuración Básica (COMPLETA)
- ✅ FIREBASE_API_KEY: Configurado
- ✅ FIREBASE_AUTH_DOMAIN: Configurado
- ✅ FIREBASE_PROJECT_ID: kinderjump-77a97
- ✅ FIREBASE_ANDROID_CLIENT_ID: 219841203502-xxx...
- ✅ FIREBASE_IOS_CLIENT_ID: 219841203502-xxx...
- ✅ FIREBASE_WEB_CLIENT_ID: 219841203502-xxx...
- ✅ Project Number: 219841203502 (Correcto)
- ✅ Formato de Client IDs: Correcto

### ⚠️ Posibles Problemas en Firebase Console

El archivo `google-services.json` actual tiene `oauth_client: []` (vacío).
Esto indica que **puede que no hayas habilitado Google Sign-In en Firebase Console**.

## 🔧 Si el Login Falla

### Pasos para Verificar/Corregir en Firebase Console:

1. **Ir a Firebase Console**
   ```
   https://console.firebase.google.com/
   ```

2. **Seleccionar el proyecto**
   - Proyecto: `kinderjump-77a97`
   - Project Number: `219841203502`

3. **Habilitar Google Sign-In**
   - Ve a **Authentication** → **Sign-in method**
   - Busca **Google** en la lista de proveedores
   - Si está deshabilitado, haz clic en **Habilitar**
   - Guarda los cambios

4. **Descargar nuevo google-services.json** (Opcional)
   - Ve a **Project Settings** (⚙️)
   - Ve a la pestaña **Your apps**
   - Selecciona tu app Android
   - Descarga el nuevo `google-services.json`
   - Reemplázalo en: `app/google-services.json`

5. **Verificar SHA Fingerprints** (Para producción)
   ```powershell
   cd c:\Users\Aorus\Documents\KiderJump10
   .\gradlew signingReport
   ```
   - Copia los valores SHA-1 y SHA-256
   - Agrégalos en Firebase Console → Project Settings → Your apps → SHA certificate fingerprints

## 📱 Monitoreo en Tiempo Real

Mientras pruebas, mantén abierta la terminal donde corre Expo:
```
npm start
```

Los logs aparecerán en tiempo real mostrando:
- Configuración cargada
- Intentos de login
- Respuestas de Google
- Errores detallados

## 🎯 Próximos Pasos

1. **Prueba primero con la pantalla de test** (🧪 Modo Test)
2. **Si funciona:** Usa el login normal
3. **Si falla:** Revisa los logs y sigue las instrucciones de solución
4. **Si persiste:** Comparte los logs exactos para ayudarte mejor

---

## 📞 Información de Depuración

Si necesitas ayuda adicional, comparte:
- Los logs completos de la pantalla de test
- Capturas de pantalla del error
- Mensajes de la consola de Metro Bundler

¡Buena suerte con las pruebas! 🚀
