import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { ENV } from '../config/env';

WebBrowser.maybeCompleteAuthSession();

const GoogleAuthTestScreen = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setLogs(prev => [...prev, `[${timestamp}] ${icon} ${message}`]);
  };

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: ENV.FIREBASE_ANDROID_CLIENT_ID,
    iosClientId: ENV.FIREBASE_IOS_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      addLog('✅ Respuesta exitosa de Google!', 'success');
      addLog(`ID Token recibido: ${response.params.id_token?.substring(0, 20)}...`, 'info');
      setIsLoading(false);
    } else if (response?.type === 'error') {
      addLog(`❌ Error: ${response.error?.message || 'Error desconocido'}`, 'error');
      addLog(`Código: ${response.error?.code || 'Sin código'}`, 'error');
      addLog(`Params: ${JSON.stringify(response.params || {})}`, 'info');
      setIsLoading(false);
    } else if (response?.type === 'cancel') {
      addLog('⚠️ Inicio de sesión cancelado por el usuario', 'info');
      setIsLoading(false);
    } else if (response?.type === 'dismiss') {
      addLog('⚠️ Modal de login cerrado', 'info');
      setIsLoading(false);
    }
  }, [response]);

  const testGoogleAuth = async () => {
    setLogs([]);
    addLog('🚀 Iniciando test de Google Auth...', 'info');
    
    // Verificar configuración
    addLog('📋 Verificando configuración...', 'info');
    addLog(`Android Client ID: ${ENV.FIREBASE_ANDROID_CLIENT_ID ? '✅ Configurado' : '❌ Faltante'}`, 'info');
    addLog(`iOS Client ID: ${ENV.FIREBASE_IOS_CLIENT_ID ? '✅ Configurado' : '❌ Faltante'}`, 'info');
    addLog(`Web Client ID: ${ENV.FIREBASE_WEB_CLIENT_ID ? '✅ Configurado' : '❌ Faltante'}`, 'info');
    
    if (!request) {
      addLog('❌ Request no está disponible. Verifica la configuración.', 'error');
      return;
    }
    
    addLog('✅ Request creado exitosamente', 'success');
    addLog(`Request URL: ${request.url?.substring(0, 50)}...`, 'info');
    
    try {
      setIsLoading(true);
      addLog('🔐 Abriendo modal de Google...', 'info');
      await promptAsync();
    } catch (error: any) {
      addLog(`❌ Error al abrir modal: ${error.message}`, 'error');
      setIsLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const runDiagnostics = () => {
    setLogs([]);
    addLog('🔍 DIAGNÓSTICO DE CONFIGURACIÓN', 'info');
    addLog('═══════════════════════════════════════', 'info');
    
    const config = {
      'Android Client ID': ENV.FIREBASE_ANDROID_CLIENT_ID,
      'iOS Client ID': ENV.FIREBASE_IOS_CLIENT_ID,
      'Web Client ID': ENV.FIREBASE_WEB_CLIENT_ID,
      'API Key': ENV.FIREBASE_API_KEY,
      'Auth Domain': ENV.FIREBASE_AUTH_DOMAIN,
      'Project ID': ENV.FIREBASE_PROJECT_ID,
    };
    
    Object.entries(config).forEach(([key, value]) => {
      if (value) {
        const displayValue = value.length > 40 ? value.substring(0, 40) + '...' : value;
        addLog(`✅ ${key}: ${displayValue}`, 'success');
      } else {
        addLog(`❌ ${key}: NO CONFIGURADO`, 'error');
      }
    });
    
    addLog('═══════════════════════════════════════', 'info');
    
    // Validaciones adicionales
    if (ENV.FIREBASE_ANDROID_CLIENT_ID?.startsWith('219841203502')) {
      addLog('✅ Project Number correcto en Android Client ID', 'success');
    } else {
      addLog('❌ Project Number incorrecto en Android Client ID', 'error');
    }
    
    if (ENV.FIREBASE_WEB_CLIENT_ID?.startsWith('219841203502')) {
      addLog('✅ Project Number correcto en Web Client ID', 'success');
    } else {
      addLog('❌ Project Number incorrecto en Web Client ID', 'error');
    }
    
    addLog(`✅ Request disponible: ${!!request}`, request ? 'success' : 'error');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 Google Auth Test</Text>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={testGoogleAuth}
          disabled={isLoading || !request}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>🚀 Probar Login</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={runDiagnostics}
        >
          <Text style={styles.buttonText}>🔍 Diagnosticar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.clearButton]} 
          onPress={clearLogs}
        >
          <Text style={styles.buttonText}>🗑️ Limpiar</Text>
        </TouchableOpacity>
      </View>
      
      {!request && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ Request no disponible. Verifica que los Client IDs estén configurados correctamente.
          </Text>
        </View>
      )}
      
      <View style={styles.logContainer}>
        <Text style={styles.logTitle}>📋 Logs de Prueba:</Text>
        <ScrollView style={styles.logScroll}>
          {logs.length === 0 ? (
            <Text style={styles.logEmpty}>
              Presiona "Probar Login" o "Diagnosticar" para ver los logs
            </Text>
          ) : (
            logs.map((log, index) => (
              <Text key={index} style={styles.logText}>
                {log}
              </Text>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4285f4',
  },
  secondaryButton: {
    backgroundColor: '#34a853',
  },
  clearButton: {
    backgroundColor: '#ea4335',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  warningText: {
    color: '#856404',
    fontSize: 14,
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  logScroll: {
    flex: 1,
  },
  logText: {
    fontFamily: 'monospace',
    fontSize: 12,
    marginBottom: 8,
    color: '#333',
  },
  logEmpty: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default GoogleAuthTestScreen;
