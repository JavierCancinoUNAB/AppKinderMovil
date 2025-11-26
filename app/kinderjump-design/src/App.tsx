import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';

export interface User {
  rut: string;
  nombreApellido: string;
  telefono: string;
  password: string;
}

export interface Student {
  id: string;
  nombreApellido: string;
  edad: number;
  fechaNacimiento: string;
  descripcion: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'presente' | 'ausente';
  observacion: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check if user should be remembered
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      setCurrentUser(JSON.parse(rememberedUser));
    }
  }, []);

  const handleLogin = (user: User, remember: boolean) => {
    setCurrentUser(user);
    setRememberMe(remember);
    
    if (remember) {
      localStorage.setItem('rememberedUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('rememberedUser');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (!rememberMe) {
      localStorage.removeItem('rememberedUser');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {!currentUser ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}
