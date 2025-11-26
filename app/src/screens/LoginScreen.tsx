import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TextInput, Platform } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { FIREBASE_AUTH } from '../auth/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '219841203502-78ou81sltjs53qqebib042jptfdsmg55.apps.googleusercontent.com', // Web Client ID (type 3)
    androidClientId: '219841203502-l8nuk3rbdm6smo5arh0cronfh5ot9pn8.apps.googleusercontent.com', // Android Client ID - SHA-1: 21e91cbfc6cc9f3e69dad853e6ea47b48388ebf7 (EAS builds)
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('✅ Respuesta exitosa de Google OAuth');
      handleGoogleSignInSuccess(id_token);
    } else if (response?.type === 'error') {
      console.error('❌ Error en OAuth:', response.error);
      Alert.alert(
        'Error de Autenticación',
        `No se pudo conectar con Google: ${response.error?.message || 'Error desconocido'}`
      );
    } else if (response?.type === 'cancel') {
      console.log('⚠️ Usuario canceló el inicio de sesión');
    }
  }, [response]);

  const handleGoogleSignInSuccess = async (idToken: string) => {
    try {
      setIsGoogleLoading(true);
      console.log('✅ Token de Google obtenido');
      console.log('🔑 ID Token:', idToken.substring(0, 50) + '...');
      
      // Create Firebase credential
      const credential = GoogleAuthProvider.credential(idToken);
      
      // Sign in with Firebase
      console.log('🔄 Autenticando con Firebase...');
      const userCredential = await signInWithCredential(FIREBASE_AUTH, credential);
      const firebaseToken = await userCredential.user.getIdToken();
      
      console.log('✅ Usuario Firebase:', userCredential.user.email);
      console.log('✅ Token Firebase obtenido, obteniendo JWT del backend');
      
      if (authContext) {
        await authContext.login(firebaseToken);
      }
      
      setIsGoogleLoading(false);
    } catch (error: any) {
      console.error('❌ Error completo en Google Sign-In:', JSON.stringify(error, null, 2));
      console.error('❌ Error code:', error.code);
      console.error('❌ Error message:', error.message);
      setIsGoogleLoading(false);
      
      let errorMsg = 'No se pudo completar el inicio de sesión con Google';
      
      if (error.code === 'auth/popup-blocked') {
        errorMsg = 'La ventana emergente fue bloqueada. Por favor, permite ventanas emergentes para esta aplicación.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMsg = 'Inicio de sesión cancelado.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMsg = 'Error de conexión. Verifica tu conexión a Internet.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMsg = 'Credenciales de Google inválidas. Por favor, intenta nuevamente.';
      } else if (error.message) {
        errorMsg = `Error: ${error.message}`;
      }
      
      Alert.alert('Error de Autenticación', errorMsg);
    }
  };

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  const handleLogin = async () => {
    console.log('🔵 INICIANDO LOGIN');
    
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);
      console.log('🔵 Autenticando con:', email);
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log('✅ Token Firebase obtenido, obteniendo JWT del backend');
      
      if (authContext) {
        await authContext.login(idToken);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.error('❌ Error completo:', error.code, error.message);
      setIsLoading(false);
      
      let errorMsg = 'Error de autenticación';
      if (error.code === 'auth/user-not-found') {
        errorMsg = 'Usuario no encontrado. Verifica el email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMsg = 'Contraseña incorrecta.';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Email inválido.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMsg = 'Credenciales inválidas. Verifica email y contraseña.';
      }
      
      Alert.alert('Error', errorMsg);
    }
  };

  return (
    <LinearGradient
      colors={['#9333ea', '#ec4899']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.icon}>👶</Text>
        <Text style={styles.title}>KinderJump</Text>
        <Text style={styles.subtitle}>Gestión de Asistencia</Text>
      </View>
      
      {isLoading || isGoogleLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>
            {isGoogleLoading ? 'Iniciando con Google...' : 'Autenticando...'}
          </Text>
        </View>
      ) : (
        <View style={styles.formContainer}>
          {/* Botón de Google Sign-In */}
          <TouchableOpacity 
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            <Text style={styles.googleIcon}>🔐</Text>
            <Text style={styles.googleButtonText}>Continuar con Google</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          
          <Text style={styles.demoText}>
            Demo: admin@kinderjump.com / password123
          </Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  icon: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.9,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.3,
  },
  dividerText: {
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 14,
    opacity: 0.7,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#9333ea',
    fontWeight: 'bold',
  },
  demoText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    opacity: 0.8,
  },
});

export default LoginScreen;
