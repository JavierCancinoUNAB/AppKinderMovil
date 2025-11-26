# Configuración de Google Sign-In para KinderJump

## 🔧 Client IDs Configurados

### Web Client ID
```
219841203502-ia52mqp6av3q5lenakqmtmo4e0o4nkv3.apps.googleusercontent.com
```

### Android Client ID
```
219841203502-urdme8i3glgodkmpcc0gsqtbkjirimjc.apps.googleusercontent.com
```

### iOS Client ID
```
219841203502-urdme8i3glgodkmpcc0gsqtbkjirimjc.apps.googleusercontent.com
```

## 📋 Pasos para Configurar en Firebase Console

1. **Ir a Firebase Console**: https://console.firebase.google.com
2. **Seleccionar proyecto**: `kinderjump-77a97`
3. **Authentication → Sign-in method**
4. **Habilitar Google como proveedor**

## 🔑 SHA-1 Fingerprints Requeridos

### Para Desarrollo (Debug)
```bash
cd android
./gradlew signingReport
```

Busca el SHA-1 en la sección `Variant: debug`

### Para Producción (Release)
Necesitas el SHA-1 de tu keystore de firma.

## 📱 Verificar Configuración en Google Cloud Console

1. **Ir a**: https://console.cloud.google.com
2. **Seleccionar proyecto**: `kinderjump-77a97`
3. **APIs & Services → Credentials**
4. **Verificar que los Client IDs estén activos**

### OAuth Consent Screen
- **Tipo de aplicación**: Pública
- **Usuarios de prueba**: Agregar emails que usarás para probar
- **Ámbitos**: email, profile, openid

## 🐛 Solución de Problemas

### Error 400: Usuario Bloqueado
**Causa**: Client ID incorrecto o no configurado en Firebase
**Solución**: 
- Verifica que los Client IDs en `LoginScreen.tsx` coincidan con Firebase
- Asegúrate que el SHA-1 esté registrado en Firebase

### Error: DEVELOPER_ERROR
**Causa**: SHA-1 fingerprint no registrado
**Solución**:
1. Obtén tu SHA-1: `cd android && ./gradlew signingReport`
2. Agrega el SHA-1 en Firebase Console → Project Settings → Android App
3. Descarga el nuevo `google-services.json`
4. Reemplaza el archivo en `app/google-services.json`

### Error: Network Request Failed
**Causa**: Sin conexión a Internet o firewall bloqueando
**Solución**:
- Verifica conexión WiFi/datos
- Desactiva VPN temporalmente
- Verifica que el backend esté corriendo

## 🧪 Testing

### Probar en Expo Go
```bash
npm start
# Escanea QR en Expo Go
# Prueba login con Google
```

### Probar en APK
```bash
npx eas build --platform android --profile preview
# Descarga e instala APK
# Prueba login con Google
```

## ✅ Checklist de Configuración

- [ ] Firebase Authentication habilitado para Google
- [ ] Web Client ID configurado en `LoginScreen.tsx`
- [ ] Android Client ID configurado en `LoginScreen.tsx`
- [ ] SHA-1 fingerprint agregado en Firebase Console
- [ ] `google-services.json` actualizado en el proyecto
- [ ] OAuth Consent Screen configurado
- [ ] Usuarios de prueba agregados (si es necesario)
- [ ] Backend corriendo en `http://192.168.100.18:3000`

## 📝 Notas Importantes

1. **Expo Go vs Standalone APK**: 
   - Expo Go: Usa Web Client ID
   - APK: Usa Android Client ID (requiere SHA-1)

2. **Usuarios de Prueba**:
   - Si la app está en modo "Testing", solo usuarios agregados explícitamente pueden iniciar sesión
   - Para testing público, publicar la app en "Production"

3. **Renovación de Tokens**:
   - Los tokens de Firebase expiran cada hora
   - El backend genera JWT que también tiene expiración
   - Implementar refresh token si es necesario

## 🔗 Enlaces Útiles

- **Firebase Console**: https://console.firebase.google.com
- **Google Cloud Console**: https://console.cloud.google.com
- **Expo Auth Session Docs**: https://docs.expo.dev/versions/latest/sdk/auth-session/
- **Firebase Auth Docs**: https://firebase.google.com/docs/auth
