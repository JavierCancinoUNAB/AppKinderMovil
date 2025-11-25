# KinderJump Mobile App

Esta es una aplicación móvil de React Native con Expo para KinderJump, un sistema de gestión de asistencia para jardines de infancia.

## Stack Técnico

- **Framework**: React Native con Expo (Managed Workflow)
- **Lenguaje**: TypeScript
- **Navegación**: React Navigation
- **Autenticación**: Firebase Authentication (Google)
- **Backend**: REST API (simulada)
- **Almacenamiento Local**: AsyncStorage

## Primeros Pasos

### 1. Instalar Dependencias

```bash
npm install
# o
yarn
```

### 2. Configurar Variables de Entorno

Crea un archivo `app.config.ts` o `app.config.js` en la raíz de tu proyecto y agrega las siguientes claves a la sección `extra`:

```javascript
export default {
  expo: {
    // ... otras configuraciones de expo
    extra: {
      API_BASE_URL: 'TU_URL_DE_BACKEND',
      FIREBASE_API_KEY: 'TU_FIREBASE_API_KEY',
      FIREBASE_AUTH_DOMAIN: 'TU_FIREBASE_AUTH_DOMAIN',
      FIREBASE_PROJECT_ID: 'TU_FIREBASE_PROJECT_ID',
      FIREBASE_STORAGE_BUCKET: 'TU_FIREBASE_STORAGE_BUCKET',
      FIREBASE_MESSAGING_SENDER_ID: 'TU_FIREBASE_MESSAGING_SENDER_ID',
      FIREBASE_APP_ID: 'TU_FIREBASE_APP_ID',
    },
  },
};
```

### 3. Ejecutar en Desarrollo

```bash
npx expo start
```

## Compilar con Expo EAS

Para compilar un APK para Android, puedes usar Expo Application Services (EAS). Asegúrate de tener `eas-cli` instalado (`npm install -g eas-cli`) y de haber iniciado sesión (`eas login`).

Luego, ejecuta:

```bash
eas build -p android --profile preview
```

Esto creará una compilación de desarrollo/vista previa. Para una compilación de producción, puedes configurar un perfil de `producción` en `eas.json`.
