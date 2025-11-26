/**
 * Diagnóstico de Configuración de Google Auth
 * Este archivo ayuda a verificar que todo esté configurado correctamente
 */

import { ENV } from '../config/env';
import Constants from 'expo-constants';

export interface GoogleAuthConfig {
  androidClientId?: string;
  iosClientId?: string;
  webClientId?: string;
}

export const runGoogleAuthDiagnostic = () => {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    platform: Constants.platform,
    appOwnership: Constants.appOwnership,
    config: {
      androidClientId: ENV.FIREBASE_ANDROID_CLIENT_ID,
      iosClientId: ENV.FIREBASE_IOS_CLIENT_ID,
      webClientId: ENV.FIREBASE_WEB_CLIENT_ID,
      apiKey: ENV.FIREBASE_API_KEY,
      authDomain: ENV.FIREBASE_AUTH_DOMAIN,
      projectId: ENV.FIREBASE_PROJECT_ID,
    },
    validations: {
      androidClientIdExists: !!ENV.FIREBASE_ANDROID_CLIENT_ID,
      iosClientIdExists: !!ENV.FIREBASE_IOS_CLIENT_ID,
      webClientIdExists: !!ENV.FIREBASE_WEB_CLIENT_ID,
      androidClientIdFormat: ENV.FIREBASE_ANDROID_CLIENT_ID?.includes('apps.googleusercontent.com') || false,
      iosClientIdFormat: ENV.FIREBASE_IOS_CLIENT_ID?.includes('apps.googleusercontent.com') || false,
      webClientIdFormat: ENV.FIREBASE_WEB_CLIENT_ID?.includes('apps.googleusercontent.com') || false,
      correctProjectNumber: ENV.FIREBASE_ANDROID_CLIENT_ID?.startsWith('219841203502') || false,
    },
    warnings: [] as string[],
    errors: [] as string[],
  };

  // Validaciones
  if (!diagnostics.validations.androidClientIdExists) {
    diagnostics.errors.push('❌ Android Client ID no está configurado');
  }
  if (!diagnostics.validations.iosClientIdExists) {
    diagnostics.warnings.push('⚠️ iOS Client ID no está configurado');
  }
  if (!diagnostics.validations.webClientIdExists) {
    diagnostics.errors.push('❌ Web Client ID no está configurado (requerido para Expo)');
  }
  if (!diagnostics.validations.correctProjectNumber) {
    diagnostics.errors.push('❌ El Client ID no coincide con el project_number esperado (219841203502)');
  }
  if (!ENV.FIREBASE_API_KEY) {
    diagnostics.errors.push('❌ Firebase API Key no está configurado');
  }
  if (!ENV.FIREBASE_PROJECT_ID) {
    diagnostics.errors.push('❌ Firebase Project ID no está configurado');
  }

  // Verificar formato de Client IDs
  if (diagnostics.validations.androidClientIdExists && !diagnostics.validations.androidClientIdFormat) {
    diagnostics.errors.push('❌ Android Client ID tiene formato incorrecto');
  }
  if (diagnostics.validations.webClientIdExists && !diagnostics.validations.webClientIdFormat) {
    diagnostics.errors.push('❌ Web Client ID tiene formato incorrecto');
  }

  return diagnostics;
};

export const printDiagnostics = () => {
  const diagnostics = runGoogleAuthDiagnostic();
  
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('🔍 DIAGNÓSTICO DE GOOGLE AUTH');
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('📱 Plataforma:', diagnostics.platform);
  console.log('🏗️  Ownership:', diagnostics.appOwnership);
  console.log('⏰ Timestamp:', diagnostics.timestamp);
  
  console.log('\n📋 CONFIGURACIÓN:');
  console.log('───────────────────────────────────────────────────────');
  console.log('Android Client ID:', diagnostics.config.androidClientId?.substring(0, 20) + '...');
  console.log('iOS Client ID:    ', diagnostics.config.iosClientId?.substring(0, 20) + '...');
  console.log('Web Client ID:    ', diagnostics.config.webClientId?.substring(0, 20) + '...');
  console.log('Project ID:       ', diagnostics.config.projectId);
  console.log('Auth Domain:      ', diagnostics.config.authDomain);
  
  console.log('\n✅ VALIDACIONES:');
  console.log('───────────────────────────────────────────────────────');
  Object.entries(diagnostics.validations).forEach(([key, value]) => {
    const icon = value ? '✅' : '❌';
    console.log(`${icon} ${key}: ${value}`);
  });
  
  if (diagnostics.errors.length > 0) {
    console.log('\n❌ ERRORES CRÍTICOS:');
    console.log('───────────────────────────────────────────────────────');
    diagnostics.errors.forEach(error => console.log(error));
  }
  
  if (diagnostics.warnings.length > 0) {
    console.log('\n⚠️  ADVERTENCIAS:');
    console.log('───────────────────────────────────────────────────────');
    diagnostics.warnings.forEach(warning => console.log(warning));
  }
  
  console.log('\n═══════════════════════════════════════════════════════');
  
  if (diagnostics.errors.length === 0 && diagnostics.warnings.length === 0) {
    console.log('✅ ¡Configuración correcta! Puedes proceder con el login.');
  } else if (diagnostics.errors.length === 0) {
    console.log('✅ Configuración válida con advertencias menores.');
  } else {
    console.log('❌ Hay errores que deben ser corregidos antes de continuar.');
  }
  console.log('═══════════════════════════════════════════════════════\n');
  
  return diagnostics;
};
