/**
 * TEST DE CONFIGURACIÓN DE GOOGLE AUTH
 * 
 * Este script verifica que toda la configuración esté correcta
 * antes de intentar iniciar sesión con Google.
 * 
 * Ejecutar con:
 * node test-google-config.js
 */

const path = require('path');

// Cargar el archivo de configuración
let appConfig;
try {
  appConfig = require(path.join(__dirname, 'app.config.ts'));
} catch (e) {
  // Si no se puede cargar el .ts, intentar con .js o directamente el objeto
  try {
    const configModule = require(path.join(__dirname, 'app.config'));
    appConfig = configModule;
  } catch (e2) {
    console.log('❌ No se pudo cargar app.config.ts');
    console.log('Intentando leer directamente...\n');
    
    // Configuración hardcodeada para testing
    appConfig = {
      default: {
        expo: {
          extra: {
            FIREBASE_API_KEY: "AIzaSyB1mjajAfA3Bw8_Dnt_UvqNbfw40moJ-yQ",
            FIREBASE_AUTH_DOMAIN: "kinderjump-77a97.firebaseapp.com",
            FIREBASE_PROJECT_ID: "kinderjump-77a97",
            FIREBASE_STORAGE_BUCKET: "kinderjump-77a97.firebasestorage.app",
            FIREBASE_MESSAGING_SENDER_ID: "219841203502",
            FIREBASE_APP_ID: "1:219841203502:web:526754b380bc0f73cd3ebf",
            FIREBASE_ANDROID_CLIENT_ID: "219841203502-a74rh2qc7r2nncshnq48igtl6ht2gn62.apps.googleusercontent.com",
            FIREBASE_IOS_CLIENT_ID: "219841203502-mbigl1f1oge0aui58tvdhu2nk5805j6d.apps.googleusercontent.com",
            FIREBASE_WEB_CLIENT_ID: "219841203502-bt6otecob2nv2j9m80r9jjoab1o0vqqa.apps.googleusercontent.com"
          }
        }
      }
    };
  }
}

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║       TEST DE CONFIGURACIÓN DE GOOGLE AUTH            ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

const config = appConfig.default.expo.extra;

// Test 1: Verificar que las variables existen
console.log('📋 Test 1: Variables de entorno\n');
const requiredVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_ANDROID_CLIENT_ID',
  'FIREBASE_WEB_CLIENT_ID'
];

let allPresent = true;
requiredVars.forEach(varName => {
  const exists = !!config[varName];
  const icon = exists ? '✅' : '❌';
  console.log(`${icon} ${varName}: ${exists ? 'Configurado' : 'FALTANTE'}`);
  if (!exists) allPresent = false;
});

// Test 2: Verificar formato de Client IDs
console.log('\n📋 Test 2: Formato de Client IDs\n');

const clientIds = {
  'Android': config.FIREBASE_ANDROID_CLIENT_ID,
  'iOS': config.FIREBASE_IOS_CLIENT_ID,
  'Web': config.FIREBASE_WEB_CLIENT_ID
};

let allFormatsCorrect = true;
Object.entries(clientIds).forEach(([platform, clientId]) => {
  if (clientId) {
    const correctFormat = clientId.includes('apps.googleusercontent.com');
    const icon = correctFormat ? '✅' : '❌';
    console.log(`${icon} ${platform} Client ID:`);
    console.log(`   ${clientId}`);
    console.log(`   Formato: ${correctFormat ? 'Correcto' : 'INCORRECTO'}`);
    if (!correctFormat) allFormatsCorrect = false;
  }
});

// Test 3: Verificar que los Client IDs usen el project_number correcto
console.log('\n📋 Test 3: Project Number (219841203502)\n');

const expectedProjectNumber = '219841203502';
let correctProjectNumber = true;

Object.entries(clientIds).forEach(([platform, clientId]) => {
  if (clientId) {
    const startsWithCorrectNumber = clientId.startsWith(expectedProjectNumber);
    const icon = startsWithCorrectNumber ? '✅' : '❌';
    const actualNumber = clientId.split('-')[0];
    console.log(`${icon} ${platform}: ${actualNumber} ${startsWithCorrectNumber ? '(Correcto)' : '(INCORRECTO)'}`);
    if (!startsWithCorrectNumber) correctProjectNumber = false;
  }
});

// Test 4: Verificar configuración de Firebase
console.log('\n📋 Test 4: Configuración de Firebase\n');

const firebaseConfig = {
  'Project ID': config.FIREBASE_PROJECT_ID,
  'Auth Domain': config.FIREBASE_AUTH_DOMAIN,
  'Storage Bucket': config.FIREBASE_STORAGE_BUCKET,
  'API Key': config.FIREBASE_API_KEY ? config.FIREBASE_API_KEY.substring(0, 20) + '...' : 'FALTANTE'
};

Object.entries(firebaseConfig).forEach(([key, value]) => {
  const exists = !!value && value !== 'FALTANTE';
  const icon = exists ? '✅' : '❌';
  console.log(`${icon} ${key}: ${value}`);
});

// Test 5: Verificar coherencia del proyecto
console.log('\n📋 Test 5: Coherencia del Proyecto\n');

const expectedProjectId = 'kinderjump-77a97';
const projectIdMatches = config.FIREBASE_PROJECT_ID === expectedProjectId;
const authDomainMatches = config.FIREBASE_AUTH_DOMAIN === `${expectedProjectId}.firebaseapp.com`;

console.log(`${projectIdMatches ? '✅' : '❌'} Project ID: ${config.FIREBASE_PROJECT_ID}`);
console.log(`   Esperado: ${expectedProjectId}`);
console.log(`${authDomainMatches ? '✅' : '❌'} Auth Domain: ${config.FIREBASE_AUTH_DOMAIN}`);
console.log(`   Esperado: ${expectedProjectId}.firebaseapp.com`);

// Resumen final
console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║                    RESUMEN                             ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

const allTestsPassed = allPresent && allFormatsCorrect && correctProjectNumber && projectIdMatches && authDomainMatches;

if (allTestsPassed) {
  console.log('✅ ¡TODOS LOS TESTS PASARON!');
  console.log('✅ La configuración parece correcta.');
  console.log('✅ Puedes intentar iniciar sesión con Google.\n');
} else {
  console.log('❌ ALGUNOS TESTS FALLARON');
  console.log('\n🔧 Problemas detectados:\n');
  
  if (!allPresent) {
    console.log('   • Faltan variables de configuración requeridas');
  }
  if (!allFormatsCorrect) {
    console.log('   • Algunos Client IDs tienen formato incorrecto');
  }
  if (!correctProjectNumber) {
    console.log('   • Los Client IDs no usan el project_number correcto (219841203502)');
    console.log('   • Verifica que hayas creado los OAuth clients en el proyecto correcto');
  }
  if (!projectIdMatches || !authDomainMatches) {
    console.log('   • El Project ID o Auth Domain no coinciden con el esperado');
  }
  
  console.log('\n📖 Próximos pasos:\n');
  console.log('   1. Ve a https://console.firebase.google.com/');
  console.log('   2. Verifica que estés en el proyecto "kinderjump-77a97"');
  console.log('   3. Habilita Google Sign-In en Authentication > Sign-in method');
  console.log('   4. Descarga un nuevo google-services.json desde Project Settings');
  console.log('   5. Verifica los OAuth Client IDs en Google Cloud Console\n');
}

console.log('═══════════════════════════════════════════════════════════\n');
