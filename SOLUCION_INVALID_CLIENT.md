# 🔧 SOLUCIÓN: Error 401 invalid_client

## ❌ Problema Identificado

```
Error 401: invalid_client
The OAuth client was not found
```

**Causa:** Los Client IDs en `app.config.ts` NO existen en Google Cloud Console. Fueron creados con IDs inventados o de otro proyecto.

## ✅ SOLUCIÓN: Crear los OAuth Client IDs Correctos

### Paso 1: Ir a Google Cloud Console

1. Ve a: https://console.cloud.google.com/
2. **IMPORTANTE:** Selecciona el proyecto correcto
   - Project ID: `kinderjump-77a97`
   - Project Number: `219841203502`

### Paso 2: Habilitar Google Sign-In API

1. En el menú lateral, ve a **APIs & Services** → **Enabled APIs & Services**
2. Haz clic en **+ ENABLE APIS AND SERVICES**
3. Busca **"Google+ API"** o **"Google Identity"**
4. Haz clic en **Enable**

### Paso 3: Crear OAuth Consent Screen (si no existe)

1. Ve a **APIs & Services** → **OAuth consent screen**
2. Si no está configurado:
   - Selecciona **External** (para pruebas)
   - Llena la información básica:
     - App name: `KinderJump`
     - User support email: tu email
     - Developer contact: tu email
   - Guarda y continúa
3. En **Scopes**, no agregues nada especial por ahora
4. En **Test users**, agrega tu email de Google
5. Guarda

### Paso 4: Crear OAuth Client IDs

#### A) Web Client ID (REQUERIDO para Expo)

1. Ve a **APIs & Services** → **Credentials**
2. Haz clic en **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Selecciona **Application type: Web application**
4. Nombre: `KinderJump Web Client`
5. **Authorized redirect URIs:** Agrega estas URLs:
   ```
   https://auth.expo.io/@aorus/kinderjump
   ```
   
   Si usas desarrollo local, también agrega:
   ```
   http://localhost:8081
   http://localhost:19006
   ```

6. Haz clic en **CREATE**
7. **COPIA el Client ID** que aparece (formato: `219841203502-xxxxx.apps.googleusercontent.com`)

#### B) Android Client ID (para app Android)

1. Nuevamente **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Selecciona **Application type: Android**
3. Nombre: `KinderJump Android`
4. Package name: `com.aorus.kinderjump`
5. **SHA-1 certificate fingerprint:**
   
   **Para desarrollo (Debug):**
   ```powershell
   # En Windows PowerShell, ejecuta:
   cd c:\Users\Aorus\Documents\KiderJump10
   .\gradlew signingReport
   ```
   
   Busca en la salida algo como:
   ```
   Variant: debug
   Config: debug
   SHA1: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD
   ```
   
   **O usa el SHA-1 por defecto de Expo/Debug:**
   ```
   SHA-1: E5:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
   ```

6. Ingresa el SHA-1 y haz clic en **CREATE**
7. **COPIA el Client ID Android**

#### C) iOS Client ID (opcional, para futuro)

1. **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Selecciona **Application type: iOS**
3. Nombre: `KinderJump iOS`
4. Bundle ID: `com.aorus.kinderjump`
5. Haz clic en **CREATE**
6. **COPIA el Client ID iOS**

### Paso 5: Actualizar app.config.ts con los NUEVOS Client IDs

Copia los Client IDs que obtuviste y actualiza el archivo:

```typescript
// En app.config.ts, líneas 32-34
"FIREBASE_ANDROID_CLIENT_ID": "TU_NUEVO_ANDROID_CLIENT_ID_AQUI",
"FIREBASE_IOS_CLIENT_ID": "TU_NUEVO_IOS_CLIENT_ID_AQUI",
"FIREBASE_WEB_CLIENT_ID": "TU_NUEVO_WEB_CLIENT_ID_AQUI"
```

### Paso 6: Reiniciar la App

```powershell
# Detén el servidor actual (Ctrl+C)
# Luego:
cd app
npx expo start --clear
```

## 🎯 ATAJO: Usar Firebase Console (Método Alternativo)

Si prefieres usar Firebase Console en lugar de Google Cloud Console:

1. Ve a: https://console.firebase.google.com/
2. Selecciona proyecto `kinderjump-77a97`
3. Ve a **Authentication** → **Sign-in method**
4. Habilita **Google**
5. Firebase **creará automáticamente** los OAuth clients
6. Descarga el nuevo `google-services.json` desde **Project Settings**
7. Los Client IDs estarán dentro del archivo JSON

## 📝 Alternativa RÁPIDA: Usar Client IDs de Google Services JSON

Si Firebase creó el archivo `google-services.json` con OAuth clients, puedes extraerlos de ahí:

```javascript
// Los Client IDs están en google-services.json bajo:
{
  "client": [{
    "oauth_client": [
      {
        "client_id": "ESTE_ES_EL_WEB_CLIENT_ID",
        "client_type": 3
      },
      {
        "client_id": "ESTE_ES_EL_ANDROID_CLIENT_ID",
        "client_type": 1  
      }
    ]
  }]
}
```

## ⚠️ IMPORTANTE

- Los Client IDs **DEBEN** empezar con `219841203502-` (tu project number)
- Si no empiezan con ese número, estás usando el proyecto incorrecto
- El **Web Client ID es OBLIGATORIO** para que Expo funcione

## 🧪 Verificar

Después de actualizar los Client IDs:

```powershell
cd app
node test-google-config.js
```

Debe mostrar que los Client IDs están configurados correctamente.

## 📞 ¿Necesitas los SHA-1?

Ejecuta esto para obtener el SHA-1 de debug:

```powershell
cd c:\Users\Aorus\Documents\KiderJump10
.\gradlew signingReport
```

O usa el SHA-1 por defecto de Android Debug:
```
E5:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
```

---

**¿Quieres que te ayude a obtener los SHA-1 fingerprints o prefieres ir directo a crear los OAuth clients en Google Cloud Console?**
