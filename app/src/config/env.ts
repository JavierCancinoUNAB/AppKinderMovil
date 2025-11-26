import Constants from 'expo-constants';

export const ENV = {
  API_BASE_URL: Constants.expoConfig?.extra?.API_BASE_URL,
  
  // Claves de Firebase
  FIREBASE_API_KEY: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: Constants.expoConfig?.extra?.FIREBASE_APP_ID,

  // Claves de Cliente de Google
  FIREBASE_ANDROID_CLIENT_ID: Constants.expoConfig?.extra?.FIREBASE_ANDROID_CLIENT_ID,
  FIREBASE_IOS_CLIENT_ID: Constants.expoConfig?.extra?.FIREBASE_IOS_CLIENT_ID,
  // --- CORRECCIÓN: Se añade el Web Client ID ---
  FIREBASE_WEB_CLIENT_ID: Constants.expoConfig?.extra?.FIREBASE_WEB_CLIENT_ID,
};
