import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';
import { User } from '../App';
import { Baby } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User, rememberMe: boolean) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Login form
  const [loginRut, setLoginRut] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [regNombreApellido, setRegNombreApellido] = useState('');
  const [regRut, setRegRut] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regTelefono, setRegTelefono] = useState('');

  // Initialize default user on component mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if demo user exists
    const demoUserExists = users.some((u: User) => u.rut === '12345678-9');
    
    if (!demoUserExists) {
      const defaultUser: User = {
        rut: '12345678-9',
        nombreApellido: 'Profesora María González',
        telefono: '+56 9 1234 5678',
        password: '123456',
      };
      users.push(defaultUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save user to localStorage (mock database)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser: User = {
      rut: regRut,
      nombreApellido: regNombreApellido,
      telefono: regTelefono,
      password: regPassword,
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Reset form and switch to login
    setRegNombreApellido('');
    setRegRut('');
    setRegPassword('');
    setRegTelefono('');
    setIsRegistering(false);
    
    alert('Cuenta creada exitosamente. Por favor inicia sesión.');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get users from localStorage
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Trim whitespace from input
    const trimmedRut = loginRut.trim();
    const trimmedPassword = loginPassword.trim();
    
    const user = users.find(u => u.rut === trimmedRut && u.password === trimmedPassword);
    
    if (user) {
      onLogin(user, rememberMe);
    } else {
      alert('RUT o contraseña incorrectos. Verifica que estés usando: RUT: 12345678-9 y Contraseña: 123456');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-white/90 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full mb-4">
            <Baby className="size-12 text-white" />
          </div>
          <h1 className="text-center text-purple-600">KinderJump</h1>
          <p className="text-center text-gray-600 mt-2">
            {isRegistering ? 'Crear cuenta nueva' : 'Bienvenido de vuelta'}
          </p>
        </div>

        {/* Demo credentials info */}
        {!isRegistering && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800 mb-1">Credenciales de prueba:</p>
            <p className="text-xs text-blue-700">RUT: <span className="font-mono">12345678-9</span></p>
            <p className="text-xs text-blue-700">Contraseña: <span className="font-mono">123456</span></p>
          </div>
        )}

        {isRegistering ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="nombreApellido">Nombre y Apellido</Label>
              <Input
                id="nombreApellido"
                type="text"
                value={regNombreApellido}
                onChange={(e) => setRegNombreApellido(e.target.value)}
                required
                placeholder="Ej: María González"
              />
            </div>

            <div>
              <Label htmlFor="rut">RUT</Label>
              <Input
                id="rut"
                type="text"
                value={regRut}
                onChange={(e) => setRegRut(e.target.value)}
                required
                placeholder="Ej: 12.345.678-9"
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                type="tel"
                value={regTelefono}
                onChange={(e) => setRegTelefono(e.target.value)}
                required
                placeholder="Ej: +56 9 1234 5678"
              />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Aceptar
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setIsRegistering(false)}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="loginRut">RUT</Label>
              <Input
                id="loginRut"
                type="text"
                value={loginRut}
                onChange={(e) => setLoginRut(e.target.value)}
                required
                placeholder="Ej: 12.345.678-9"
              />
            </div>

            <div>
              <Label htmlFor="loginPassword">Contraseña</Label>
              <Input
                id="loginPassword"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm cursor-pointer">
                Recordarme
              </Label>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Iniciar Sesión
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setIsRegistering(true)}
            >
              ¿No tienes cuenta? Regístrate
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}