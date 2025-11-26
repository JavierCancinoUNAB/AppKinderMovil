/**
 * Script para verificar si los Client IDs actuales existen en Google Cloud
 * y generar los comandos/pasos exactos para crear los que faltan
 */

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║  VERIFICACIÓN DE OAUTH CLIENT IDS EN GOOGLE CLOUD     ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

const currentClientIds = {
  android: '219841203502-a74rh2qc7r2nncshnq48igtl6ht2gn62.apps.googleusercontent.com',
  ios: '219841203502-mbigl1f1oge0aui58tvdhu2nk5805j6d.apps.googleusercontent.com',
  web: '219841203502-bt6otecob2nv2j9m80r9jjoab1o0vqqa.apps.googleusercontent.com'
};

console.log('📋 Client IDs actuales en app.config.ts:\n');
console.log('Android:', currentClientIds.android);
console.log('iOS:    ', currentClientIds.ios);
console.log('Web:    ', currentClientIds.web);

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║              PASOS PARA VERIFICAR/CREAR                ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

console.log('1️⃣  Ve a Google Cloud Console:');
console.log('   https://console.cloud.google.com/apis/credentials?project=kinderjump-77a97\n');

console.log('2️⃣  Verifica si estos Client IDs YA EXISTEN en la lista:\n');
console.log('   🔍 Busca en la página "Credentials" bajo "OAuth 2.0 Client IDs"');
console.log('   🔍 Deberías ver 3 clients (Web, Android, iOS) si ya fueron creados\n');

console.log('3️⃣  SI NO EXISTEN, créalos con estos parámetros:\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📱 A) WEB CLIENT (OBLIGATORIO para Expo)\n');
console.log('   + CREATE CREDENTIALS → OAuth client ID');
console.log('   Application type: Web application');
console.log('   Name: KinderJump Web Client');
console.log('   Authorized redirect URIs (agrega TODOS):');
console.log('     • https://auth.expo.io/@aorus/kinderjump');
console.log('     • https://auth.expo.io/@your-expo-username/kinderjump');
console.log('     • exp://localhost:8081');
console.log('     • http://localhost:19006\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📱 B) ANDROID CLIENT\n');
console.log('   + CREATE CREDENTIALS → OAuth client ID');
console.log('   Application type: Android');
console.log('   Name: KinderJump Android');
console.log('   Package name: com.aorus.kinderjump');
console.log('   SHA-1 certificate fingerprint (para DEBUG):');
console.log('     E5:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📱 C) iOS CLIENT (Opcional para futuro)\n');
console.log('   + CREATE CREDENTIALS → OAuth client ID');
console.log('   Application type: iOS');
console.log('   Name: KinderJump iOS');
console.log('   Bundle ID: com.aorus.kinderjump\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

console.log('\n4️⃣  ALTERNATIVA MÁS RÁPIDA: Usar Firebase Console\n');
console.log('   Ve a: https://console.firebase.google.com/project/kinderjump-77a97/authentication/providers');
console.log('   • Habilita "Google" como sign-in method');
console.log('   • Firebase creará automáticamente los OAuth clients');
console.log('   • Descarga el nuevo google-services.json');
console.log('   • Extrae los Client IDs del JSON\n');

console.log('5️⃣  Después de crear/verificar los Client IDs:\n');
console.log('   • Si los Client IDs que aparecen en Google Cloud SON DIFERENTES');
console.log('     a los que tienes en app.config.ts, necesitas actualizar app.config.ts');
console.log('   • Si son IGUALES pero aún da error, verifica que:');
console.log('     ✓ Google Sign-In esté habilitado en Firebase Authentication');
console.log('     ✓ El SHA-1 fingerprint esté registrado (para Android)');
console.log('     ✓ Los redirect URIs estén configurados (para Web)\n');

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║                  SIGUIENTE PASO                        ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

console.log('👉 Abre Google Cloud Console y revisa si los Client IDs existen.');
console.log('👉 Si NO existen, créalos siguiendo los pasos de arriba.');
console.log('👉 Si SÍ existen pero son diferentes, cópialos y dime cuáles son.');
console.log('👉 Si son iguales, entonces el problema puede ser otra cosa.\n');

console.log('═══════════════════════════════════════════════════════════\n');
