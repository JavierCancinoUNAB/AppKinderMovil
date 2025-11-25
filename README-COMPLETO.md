# KinderJump - Sistema de Asistencia 👶

Sistema completo de gestión de asistencia para jardines infantiles con backend Node.js y frontend React Native (Expo).

## 🎯 Características Implementadas

### ✅ Autenticación
- **Email/Password**: Login funcional con Firebase Auth + JWT del backend
- **Google Sign-In**: Configurado (requiere APK para funcionar)
- Token JWT emitido por el backend después de verificar Firebase Auth

### ✅ Gestión de Estudiantes
- **Ver lista completa** de estudiantes
- **Agregar** nuevos estudiantes
- **Editar** información de estudiantes
- **Eliminar** estudiantes
- API REST completa (GET, POST, PUT, DELETE)

### ✅ Registro de Asistencia
- **Asistencia Rápida**: Tomar asistencia de todos los estudiantes a la vez
- **Asistencia Individual**: Registrar asistencia por estudiante
- **Historial**: Ver todos los registros de asistencia con diseño mejorado

### ✅ Backend Node.js + Express
- API REST con endpoints para estudiantes y asistencia
- Base de datos en memoria (listo para migrar a MongoDB/PostgreSQL)
- Autenticación JWT
- 4 estudiantes de ejemplo precargados

## 🚀 Instrucciones de Uso

### 1. Iniciar el Backend

```powershell
# En una terminal
cd backend
npm start
```

El backend quedará corriendo en `http://192.168.100.18:3000`

### 2. Iniciar la App React Native

```powershell
# En otra terminal
cd app
npx expo start
```

Escanea el QR con Expo Go en tu Genymotion o dispositivo real.

### 3. Login

Usa estas credenciales de prueba:
- **Email**: `admin@kinderjump.com`
- **Password**: `password123`

## 📱 Navegación de la App

Después del login verás el **Dashboard** con 3 botones:

1. **⚡ Asistencia Rápida** → Tomar asistencia de todos los estudiantes
2. **📄 Ver Registros** → Historial de asistencia
3. **👥 Ver Estudiantes** → Gestionar lista de estudiantes (agregar, editar, eliminar)

## 🔧 Arquitectura Técnica

### Frontend (React Native + Expo SDK 54)
- `src/screens/`: Pantallas de la app
  - `LoginScreen.tsx`: Login con Email/Password y Google Sign-In
  - `DashboardScreen.tsx`: Pantalla principal con accesos rápidos
  - `StudentListScreen.tsx`: CRUD de estudiantes
  - `QuickAttendanceScreen.tsx`: Asistencia rápida
  - `AttendanceHistoryScreen.tsx`: Historial con diseño mejorado

- `src/api/`: Cliente HTTP
  - `client.ts`: Cliente fetch con manejo de tokens JWT
  - `students.ts`: Endpoints de estudiantes
  - `attendance.ts`: Endpoints de asistencia

- `src/auth/`: Autenticación
  - `AuthContext.tsx`: Context con login/logout y obtención de JWT
  - `firebase.ts`: Configuración de Firebase

### Backend (Node.js + Express)
- `server.js`: Servidor principal con todos los endpoints
- Endpoints disponibles:
  - `POST /api/auth/firebase` - Obtener JWT con token de Firebase
  - `GET /api/students` - Listar estudiantes
  - `POST /api/students` - Crear estudiante
  - `PUT /api/students/:id` - Actualizar estudiante
  - `DELETE /api/students/:id` - Eliminar estudiante
  - `POST /api/attendance` - Registrar asistencia individual
  - `POST /api/attendance/bulk` - Registrar asistencia múltiple
  - `GET /api/attendance/history` - Obtener historial (con filtros opcionales)
  - `GET /api/attendance/today` - Obtener asistencia de hoy

## 🎨 Diseño

- **Gradiente principal**: Morado (#9333ea) a Rosa (#ec4899)
- **Botones**: Verde (#10b981), Azul (#3b82f6), Morado (#9333ea)
- **Componentes**: LinearGradient, FlatList, Modal
- **Tipografía**: System default con pesos bold/semibold

## 📝 Próximos Pasos

### Para usar Google Sign-In:
1. Generar APK con EAS Build:
   ```bash
   npx eas build --platform android --profile preview
   ```
2. Instalar el APK en dispositivo real o Genymotion
3. Google Sign-In funcionará correctamente (ya está configurado en Firebase)

### Mejoras futuras:
- [ ] Migrar backend a base de datos real (MongoDB/PostgreSQL)
- [ ] Agregar filtros de fecha en historial
- [ ] Exportar reportes de asistencia a PDF/Excel
- [ ] Notificaciones push para padres
- [ ] Dashboard con gráficos y estadísticas
- [ ] Agregar Facebook/GitHub login (como en el taller)

## 🛠️ Tecnologías Usadas

**Frontend:**
- Expo SDK 54
- React Native 0.81.5
- React 19.1.0
- Firebase 11.10.0
- expo-linear-gradient 15.0.7
- TypeScript

**Backend:**
- Node.js
- Express 4.18.2
- Firebase Admin 11.11.0
- jsonwebtoken 9.0.2
- cors 2.8.5

## 🔐 Seguridad

- Todos los endpoints (excepto `/api/auth/firebase`) requieren JWT válido
- Token JWT con expiración de 7 días
- Headers CORS configurados para desarrollo
- Para producción: agregar HTTPS, rate limiting, validación de inputs

## 🐛 Solución de Problemas

### Backend no responde
```bash
# Verificar que esté corriendo
curl http://192.168.100.18:3000/health

# Debería responder: {"status":"OK","message":"..."}
```

### App muestra error de autenticación
- Verifica que el backend esté corriendo
- Verifica que la IP sea `192.168.100.18:3000` en `app/app.config.ts`
- Revisa los logs del servidor backend

### Google Sign-In no funciona
- Es normal en Expo Go, necesitas generar APK
- Email/Password funciona perfectamente sin APK

---

**Desarrollado con ❤️ para KinderJump**
