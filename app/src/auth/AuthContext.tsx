import React, { createContext, useState, ReactNode } from 'react';
import { setAuthToken } from '../api/client';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (idToken: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (firebaseToken: string) => {
    console.log('🟢 LOGIN EJECUTADO - Obteniendo JWT del backend');
    
    try {
      // Llamar al backend para obtener JWT
      const response = await fetch('http://192.168.100.18:3000/api/auth/firebase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firebaseToken }),
      });

      if (!response.ok) {
        throw new Error('Error al autenticar con el backend');
      }

      const data = await response.json();
      
      // Guardar token en el cliente API
      setAuthToken(data.token);
      setToken(data.token);
      
      const userData = {
        id: data.user.uid,
        email: data.user.email,
        name: 'Administrador',
        role: 'admin'
      };
      
      setUser(userData);
      console.log('✅ JWT obtenido del backend');
    } catch (error) {
      console.error('❌ Error al obtener JWT:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('🟢 LOGOUT EJECUTADO');
    setAuthToken('');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
