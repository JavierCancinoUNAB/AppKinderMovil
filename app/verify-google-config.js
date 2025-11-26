#!/usr/bin/env node

/**
 * Script para verificar la configuración de Google Sign-In
 * Ejecutar: node verify-google-config.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de Google Sign-In...\n');

// 1. Verificar google-services.json
const googleServicesPath = path.join(__dirname, 'google-services.json');
if (!fs.existsSync(googleServicesPath)) {
  console.error('❌ ERROR: google-services.json no encontrado');
  process.exit(1);
}

const googleServices = JSON.parse(fs.readFileSync(googleServicesPath, 'utf8'));
console.log('✅ google-services.json encontrado');
console.log(`   Project ID: ${googleServices.project_info.project_id}`);
console.log(`   Package: ${googleServices.client[0].client_info.android_client_info.package_name}\n`);

// 2. Extraer Client IDs
const oauthClients = googleServices.client[0].oauth_client;
const webClient = oauthClients.find(c => c.client_type === 3);
const androidClients = oauthClients.filter(c => c.client_type === 1);

console.log('📱 Client IDs encontrados:\n');

if (webClient) {
  console.log('✅ Web Client ID:');
  console.log(`   ${webClient.client_id}\n`);
}

androidClients.forEach((client, index) => {
  console.log(`✅ Android Client ID #${index + 1}:`);
  console.log(`   ${client.client_id}`);
  if (client.android_info?.certificate_hash) {
    console.log(`   SHA-1: ${client.android_info.certificate_hash}`);
  }
  console.log('');
});

// 3. Verificar LoginScreen.tsx
const loginScreenPath = path.join(__dirname, 'src', 'screens', 'LoginScreen.tsx');
if (!fs.existsSync(loginScreenPath)) {
  console.error('❌ ERROR: LoginScreen.tsx no encontrado');
  process.exit(1);
}

const loginScreenContent = fs.readFileSync(loginScreenPath, 'utf8');

// Buscar Client IDs en el código
const clientIdMatch = loginScreenContent.match(/clientId:\s*['"]([^'"]+)['"]/);
const androidClientIdMatch = loginScreenContent.match(/androidClientId:\s*['"]([^'"]+)['"]/);

console.log('🔧 Client IDs configurados en LoginScreen.tsx:\n');

if (clientIdMatch) {
  const configuredWebId = clientIdMatch[1];
  console.log('Web Client ID:');
  console.log(`   ${configuredWebId}`);
  
  if (webClient && configuredWebId === webClient.client_id) {
    console.log('   ✅ COINCIDE con google-services.json\n');
  } else {
    console.log('   ⚠️  NO COINCIDE con google-services.json');
    console.log(`   Esperado: ${webClient?.client_id}\n`);
  }
}

if (androidClientIdMatch) {
  const configuredAndroidId = androidClientIdMatch[1];
  console.log('Android Client ID:');
  console.log(`   ${configuredAndroidId}`);
  
  const matchingAndroid = androidClients.find(c => c.client_id === configuredAndroidId);
  if (matchingAndroid) {
    console.log('   ✅ COINCIDE con google-services.json');
    if (matchingAndroid.android_info?.certificate_hash) {
      console.log(`   SHA-1: ${matchingAndroid.android_info.certificate_hash}\n`);
    }
  } else {
    console.log('   ⚠️  NO COINCIDE con google-services.json\n');
  }
}

// 4. Verificar Firebase config
const firebaseConfigPath = path.join(__dirname, 'src', 'auth', 'firebase.ts');
if (fs.existsSync(firebaseConfigPath)) {
  const firebaseConfig = fs.readFileSync(firebaseConfigPath, 'utf8');
  const projectIdMatch = firebaseConfig.match(/projectId:\s*["']([^"']+)["']/);
  
  if (projectIdMatch && projectIdMatch[1] === googleServices.project_info.project_id) {
    console.log('✅ Firebase config coincide con google-services.json\n');
  } else {
    console.log('⚠️  Firebase config NO coincide con google-services.json\n');
  }
}

// 5. Resumen
console.log('📋 RESUMEN:\n');
console.log('Para que Google Sign-In funcione:');
console.log('1. ✅ google-services.json debe estar en la raíz de app/');
console.log('2. ✅ Los Client IDs en LoginScreen.tsx deben coincidir');
console.log('3. ⚠️  El SHA-1 debe estar registrado en Firebase Console');
console.log('4. ⚠️  Google Authentication debe estar habilitado en Firebase\n');

console.log('🔗 Enlaces útiles:');
console.log('   Firebase Console: https://console.firebase.google.com/project/kinderjump-77a97');
console.log('   Authentication: https://console.firebase.google.com/project/kinderjump-77a97/authentication/providers');
console.log('   Project Settings: https://console.firebase.google.com/project/kinderjump-77a97/settings/general\n');

console.log('💡 Próximos pasos:');
console.log('1. Ejecuta: npx expo start');
console.log('2. Escanea el QR en Expo Go');
console.log('3. Prueba "Continuar con Google"\n');
