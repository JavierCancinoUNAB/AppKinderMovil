# 🔥 SOLUCIÓN DEFINITIVA - Error 400 Google Sign-In

## 📋 Problema Identificado

El SHA-1 de tus builds de EAS **NO está registrado** en Firebase.

### SHA-1 Actual de EAS (Development, Preview, Production)
```
21:E9:1C:BF:C6:CC:9F:3E:69:DA:D8:53:E6:EA:47:B4:83:88:EB:F7
```

### SHA-1 Registrados en Firebase (INCORRECTOS)
- `36:41:17:d0:1f:66:b3:8e:57:65:8d:93:8f:bf:31:dc:16:70:48:57` ❌
- `a1:89:2e:b7:30:40:50:8f:9f:38:55:ab:98:5f:e8:5d:1e:7a:2e:8d` ❌

**Ninguno coincide** → Por eso sale ERROR 400

---

## ✅ SOLUCIÓN PASO A PASO

### Paso 1: Agregar SHA-1 en Firebase Console

1. Ve a: https://console.firebase.google.com/project/kinderjump-77a97/settings/general
2. Scroll down a "Your apps" → Android App (com.aorus.kinderjump)
3. Click en "Add fingerprint"
4. Pega este SHA-1 (sin los dos puntos):
   ```
   21E91CBFC6CC9F3E69DAD853E6EA47B48388EBF7
   ```
5. Click "Save"

### Paso 2: Descargar nuevo google-services.json

1. En la misma página de Firebase
2. Click en el botón "Download google-services.json"
3. Guarda el archivo

### Paso 3: Reemplazar google-services.json en el proyecto

1. Copia el archivo descargado
2. Reemplaza: `C:\Users\Aorus\Documents\KiderJump10\app\google-services.json`

### Paso 4: Obtener el nuevo Android Client ID

1. Abre el nuevo `google-services.json`
2. Busca el objeto `oauth_client` que tenga:
   - `"client_type": 1`
   - `"certificate_hash": "21e91cbfc6cc9f3e69dad853e6ea47b48388ebf7"`
3. Copia el `client_id` de ese objeto

### Paso 5: Actualizar LoginScreen.tsx

Reemplaza el `androidClientId` en el código con el nuevo Client ID que obtuviste.

---

## 📱 Verificación

Después de estos pasos, ejecuta:

```bash
cd app
npx expo start --clear
```

Y prueba Google Sign-In. Debería funcionar perfectamente.

---

## 🔍 Comando para verificar SHA-1 actual

Para confirmar el SHA-1 de tus builds:

```bash
cd app
npx eas credentials
```

Selecciona: `Keystore: Manage everything needed to build your project`

---

## 📞 Contacto

Si después de estos pasos sigue el error, verifica:
1. ✅ SHA-1 agregado correctamente en Firebase (sin dos puntos)
2. ✅ google-services.json descargado y reemplazado
3. ✅ Android Client ID actualizado en LoginScreen.tsx
4. ✅ Expo caché limpiado (`--clear`)
5. ✅ App reinstalada (desinstala y reinstala)
