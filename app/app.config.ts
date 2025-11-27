export default {
  "expo": {
    "name": "KinderJump",
    "slug": "kinderjump",
    "version": "1.0.0",
    "orientation": "portrait",

    // Esquema para deep links
    "scheme": "com.aorus.kinderjump",

    "splash": {
      "backgroundColor": "#a29bfe"
    },

    "plugins": [
      "@react-native-google-signin/google-signin",
      [
        "expo-build-properties",
        {
          "android": {
            "usesCleartextTraffic": true
          }
        }
      ]
    ],

    "android": {
      // 👇 Debe coincidir con applicationId / package de Firebase
      "package": "com.aorus.kinderjump",
      // Ruta al google-services.json dentro de la carpeta app
      "googleServicesFile": "./google-services.json"
    },

    "ios": {
      // Si algún día agregas iOS, este será el bundleId
      "bundleIdentifier": "com.aorus.kinderjump"
    },

    "extra": {
      "eas": {
        "projectId": "80fcd718-b8ce-4589-aacb-9b4d7cd0f5d7"
      },

      // 🔗 Backend
      "API_BASE_URL": "http://192.168.100.18:3000",

      // 🔥 Firebase (coinciden con tu proyecto kinderjump-77a97)
      "FIREBASE_API_KEY": "AIzaSyC2Ga3Y0ft5B0gG7w5pWc8iFCKQoTqZLLc",
      "FIREBASE_AUTH_DOMAIN": "kinderjump-77a97.firebaseapp.com",
      "FIREBASE_PROJECT_ID": "kinderjump-77a97",
      "FIREBASE_STORAGE_BUCKET": "kinderjump-77a97.firebasestorage.app",
      "FIREBASE_MESSAGING_SENDER_ID": "219841203502",
      "FIREBASE_APP_ID": "1:219841203502:android:b8e30f994f91ae8dcd3ebf",

      // 👇 IDs CORRECTOS sacados de google-services.json

      // client_type 3 → Web
      "FIREBASE_WEB_CLIENT_ID":
        "219841203502-m1p4cbnl3u0l8rjv70b5cpthd08j4c4q.apps.googleusercontent.com",

      // client_type 1 → Android
      "FIREBASE_ANDROID_CLIENT_ID":
        "219841203502-1t81on9oa339cq8flg8oqirespc9c8jl.apps.googleusercontent.com",

      // (Opcional) Mantengo estas claves viejas mapeadas por si algún archivo las usa:
      "GOOGLE_WEB_CLIENT_ID":
        "219841203502-m1p4cbnl3u0l8rjv70b5cpthd08j4c4q.apps.googleusercontent.com",
      "GOOGLE_ANDROID_CLIENT_ID":
        "219841203502-1t81on9oa339cq8flg8oqirespc9c8jl.apps.googleusercontent.com"
    }
  }
};
