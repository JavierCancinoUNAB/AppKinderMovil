# 🚨 SOLUCIÓN INMEDIATA: Error 401 invalid_client

## El Problema
Los Client IDs que tienes configurados **NO EXISTEN** en Google Cloud Console.
Fueron generados/inventados pero nunca creados en Google.

## ✅ SOLUCIÓN RÁPIDA (5 minutos)

### Opción 1: Usar Firebase Console (MÁS FÁCIL) ⭐

#### Paso 1: Habilitar Google Sign-In en Firebase

1. Ve a: **https://console.firebase.google.com/**
2. Selecciona: **kinderjump-77a97**
3. Ve a: **Authentication** → **Sign-in method**
4. Busca **Google** y haz clic en él
5. **Habilita** el toggle
6. Haz clic en **Save**

✅ Firebase creará AUTOMÁTICAMENTE los OAuth Client IDs necesarios

#### Paso 2: Descargar el NUEVO google-services.json

1. Ve a: **Project Settings** (ícono ⚙️ arriba)
2. Selecciona: **Your apps** → Android app (o agrega una si no existe)
   - Package name: `com.aorus.kinderjump`
3. Descarga: **google-services.json**
4. Reemplaza el archivo en: `c:\Users\Aorus\Documents\KiderJump10\app\google-services.json`

#### Paso 3: Extraer los NUEVOS Client IDs

Abre el archivo `google-services.json` descargado y busca esta sección:

```json
{
  "client": [{
    "oauth_client": [
      {
        "client_id": "XXXXXXX-YYYYYYY.apps.googleusercontent.com",
        "client_type": 3  // ← Este es el WEB CLIENT ID
      },
      {
        "client_id": "XXXXXXX-ZZZZZZZ.apps.googleusercontent.com", 
        "client_type": 1  // ← Este es el ANDROID CLIENT ID
      }
    ]
  }]
}
```

**Client Types:**
- `client_type: 3` = **Web Client ID** (OBLIGATORIO para Expo)
- `client_type: 1` = **Android Client ID**
- `client_type: 2` = **iOS Client ID**

#### Paso 4: Actualizar app.config.ts

Reemplaza los Client IDs actuales con los REALES que obtuviste:

```typescript
"FIREBASE_ANDROID_CLIENT_ID": "EL_CLIENT_TYPE_1_AQUI",
"FIREBASE_IOS_CLIENT_ID": "219841203502-mbigl1f1oge0aui58tvdhu2nk5805j6d.apps.googleusercontent.com",
"FIREBASE_WEB_CLIENT_ID": "EL_CLIENT_TYPE_3_AQUI"
```

#### Paso 5: Reiniciar Expo

```powershell
# Presiona Ctrl+C en la terminal de Expo
cd app
npx expo start --clear
```

#### Paso 6: Probar de nuevo

Abre la app y presiona el botón de login. ¡Debería funcionar!

---

### Opción 2: Crear manualmente en Google Cloud Console

Si prefieres crear los OAuth clients manualmente:

#### Paso 1: Ir a Google Cloud Console

1. Ve a: **https://console.cloud.google.com/**
2. Verifica que el proyecto sea: **kinderjump-77a97** (Project Number: 219841203502)

#### Paso 2: Ir a Credentials

1. Menú lateral: **APIs & Services** → **Credentials**

#### Paso 3: Crear Web Client ID (OBLIGATORIO)

1. Haz clic: **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Application type: **Web application**
3. Name: `KinderJump Web Client`
4. **Authorized redirect URIs** (agrega TODAS estas):
   ```
   https://auth.expo.io/@aorus/kinderjump
   https://auth.expo.io/@your-username/kinderjump
   exp://localhost:8081
   http://localhost:19006
   ```
5. Click **CREATE**
6. **COPIA el Client ID completo**

#### Paso 4: Crear Android Client ID

1. **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Application type: **Android**
3. Name: `KinderJump Android`
4. Package name: `com.aorus.kinderjump`
5. **SHA-1 certificate fingerprint:**

   **Para desarrollo/testing usa este SHA-1 por defecto:**
   ```
   E5:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
   ```
   
   O si tienes keytool:
   ```powershell
   keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
   ```

6. Click **CREATE**
7. **COPIA el Client ID Android**

#### Paso 5: Actualizar app.config.ts

```typescript
"FIREBASE_ANDROID_CLIENT_ID": "TU_NUEVO_ANDROID_CLIENT_ID",
"FIREBASE_WEB_CLIENT_ID": "TU_NUEVO_WEB_CLIENT_ID"
```

---

## 🎯 VERIFICACIÓN RÁPIDA

Después de actualizar los Client IDs, verifica:

```powershell
cd app
node test-google-config.js
```

Debe mostrar: ✅ TODOS LOS TESTS PASARON

---

## 📝 RESUMEN DE LO QUE NECESITAS

Para que funcione, DEBES tener:

1. ✅ **Web Client ID** creado en Google Cloud Console
2. ✅ **Android Client ID** creado en Google Cloud Console
3. ✅ Google Sign-In **habilitado** en Firebase Authentication
4. ✅ Los nuevos Client IDs **actualizados** en `app.config.ts`

---

## ⚡ MÉTODO MÁS RÁPIDO (30 segundos)

Si solo quieres probar AHORA:

1. Ve a Firebase Console → Authentication → Sign-in method
2. Habilita Google
3. Firebase crea los Client IDs automáticamente
4. Descarga google-services.json
5. Extrae los Client IDs del JSON
6. Actualiza app.config.ts
7. Reinicia Expo

**¿Cuál método prefieres que usemos? Te puedo guiar paso a paso.**
