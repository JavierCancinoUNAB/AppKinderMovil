require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos en memoria (simulación)
let students = [
  {
    id: '1',
    name: 'María García',
    age: 4,
    grade: 'Pre-Kinder',
    photoUrl: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Juan Pérez',
    age: 5,
    grade: 'Kinder',
    photoUrl: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    age: 4,
    grade: 'Pre-Kinder',
    photoUrl: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    name: 'Pedro López',
    age: 5,
    grade: 'Kinder',
    photoUrl: 'https://i.pravatar.cc/150?img=4'
  }
];

let attendanceRecords = [];

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// ===== ENDPOINTS DE AUTENTICACIÓN =====

// POST /api/auth/firebase - Verificar token de Firebase y emitir JWT
app.post('/api/auth/firebase', async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({ error: 'Token de Firebase requerido' });
    }

    // Por ahora, solo generamos JWT sin verificar Firebase
    // Para producción: descomentar código de verificación con Firebase Admin
    
    const payload = {
      uid: 'demo-user',
      email: 'admin@kinderjump.com'
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: payload
    });
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({ error: 'Error en autenticación' });
  }
});

// ===== ENDPOINTS DE ESTUDIANTES =====

// GET /api/students - Obtener todos los estudiantes
app.get('/api/students', authenticateToken, (req, res) => {
  res.json(students);
});

// GET /api/students/:id - Obtener estudiante por ID
app.get('/api/students/:id', authenticateToken, (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }
  res.json(student);
});

// POST /api/students - Crear nuevo estudiante
app.post('/api/students', authenticateToken, (req, res) => {
  const { name, age, grade, photoUrl } = req.body;

  if (!name || !age || !grade) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const newStudent = {
    id: (students.length + 1).toString(),
    name,
    age: parseInt(age),
    grade,
    photoUrl: photoUrl || `https://i.pravatar.cc/150?img=${students.length + 1}`
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /api/students/:id - Actualizar estudiante
app.put('/api/students/:id', authenticateToken, (req, res) => {
  const index = students.findIndex(s => s.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }

  const { name, age, grade, photoUrl } = req.body;
  
  students[index] = {
    ...students[index],
    name: name || students[index].name,
    age: age ? parseInt(age) : students[index].age,
    grade: grade || students[index].grade,
    photoUrl: photoUrl || students[index].photoUrl
  };

  res.json(students[index]);
});

// DELETE /api/students/:id - Eliminar estudiante
app.delete('/api/students/:id', authenticateToken, (req, res) => {
  const index = students.findIndex(s => s.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }

  students.splice(index, 1);
  res.status(204).send();
});

// ===== ENDPOINTS DE ASISTENCIA =====

// POST /api/attendance - Registrar asistencia
app.post('/api/attendance', authenticateToken, (req, res) => {
  const { studentId, status, date, notes } = req.body;

  if (!studentId || !status) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const student = students.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }

  const record = {
    id: (attendanceRecords.length + 1).toString(),
    studentId,
    studentName: student.name,
    status,
    date: date || new Date().toISOString(),
    notes: notes || '',
    recordedBy: req.user.email
  };

  attendanceRecords.push(record);
  res.status(201).json(record);
});

// POST /api/attendance/bulk - Registrar asistencia múltiple
app.post('/api/attendance/bulk', authenticateToken, (req, res) => {
  const { records } = req.body;

  if (!records || !Array.isArray(records)) {
    return res.status(400).json({ error: 'Se requiere un array de registros' });
  }

  const newRecords = records.map((record, index) => {
    const student = students.find(s => s.id === record.studentId);
    
    return {
      id: (attendanceRecords.length + index + 1).toString(),
      studentId: record.studentId,
      studentName: student?.name || 'Desconocido',
      status: record.status,
      date: record.date || new Date().toISOString(),
      notes: record.notes || '',
      recordedBy: req.user.email
    };
  });

  attendanceRecords.push(...newRecords);
  res.status(201).json(newRecords);
});

// GET /api/attendance/history - Obtener historial de asistencia
app.get('/api/attendance/history', authenticateToken, (req, res) => {
  const { startDate, endDate, studentId } = req.query;

  let filtered = [...attendanceRecords];

  // Filtrar por estudiante
  if (studentId) {
    filtered = filtered.filter(r => r.studentId === studentId);
  }

  // Filtrar por rango de fechas
  if (startDate) {
    filtered = filtered.filter(r => new Date(r.date) >= new Date(startDate));
  }
  if (endDate) {
    filtered = filtered.filter(r => new Date(r.date) <= new Date(endDate));
  }

  // Ordenar por fecha descendente
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  res.json(filtered);
});

// GET /api/attendance/today - Obtener asistencia de hoy
app.get('/api/attendance/today', authenticateToken, (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  
  const todayRecords = attendanceRecords.filter(r => 
    r.date.startsWith(today)
  );

  res.json(todayRecords);
});

// ===== PÁGINA DE INICIO =====
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>KinderJump Backend API</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .container {
          background: rgba(255, 255, 255, 0.1);
          padding: 30px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }
        h1 { margin-top: 0; }
        .status { 
          background: #4caf50; 
          padding: 10px 20px; 
          border-radius: 5px; 
          display: inline-block;
          margin: 10px 0;
        }
        .endpoint {
          background: rgba(0, 0, 0, 0.2);
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          border-left: 4px solid #ffd700;
        }
        code {
          background: rgba(0, 0, 0, 0.3);
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        .method {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 3px;
          font-weight: bold;
          margin-right: 10px;
        }
        .get { background: #61affe; }
        .post { background: #49cc90; }
        .put { background: #fca130; }
        .delete { background: #f93e3e; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎓 KinderJump Backend API</h1>
        <div class="status">✅ Servidor funcionando correctamente</div>
        
        <h2>📋 Endpoints Disponibles:</h2>
        
        <div class="endpoint">
          <span class="method get">GET</span>
          <code>/health</code><br>
          <small>Verificar estado del servidor</small>
        </div>
        
        <div class="endpoint">
          <span class="method post">POST</span>
          <code>/api/auth/firebase</code><br>
          <small>Autenticación con Firebase (obtener JWT)</small>
        </div>
        
        <div class="endpoint">
          <span class="method get">GET</span>
          <code>/api/students</code><br>
          <small>Obtener lista de estudiantes (requiere autenticación)</small>
        </div>
        
        <div class="endpoint">
          <span class="method post">POST</span>
          <code>/api/students</code><br>
          <small>Crear nuevo estudiante (requiere autenticación)</small>
        </div>
        
        <div class="endpoint">
          <span class="method put">PUT</span>
          <code>/api/students/:id</code><br>
          <small>Actualizar estudiante (requiere autenticación)</small>
        </div>
        
        <div class="endpoint">
          <span class="method delete">DELETE</span>
          <code>/api/students/:id</code><br>
          <small>Eliminar estudiante (requiere autenticación)</small>
        </div>
        
        <div class="endpoint">
          <span class="method post">POST</span>
          <code>/api/attendance</code><br>
          <small>Registrar asistencia (requiere autenticación)</small>
        </div>
        
        <div class="endpoint">
          <span class="method get">GET</span>
          <code>/api/attendance/history</code><br>
          <small>Obtener historial de asistencia (requiere autenticación)</small>
        </div>
        
        <div class="endpoint">
          <span class="method get">GET</span>
          <code>/api/attendance/today</code><br>
          <small>Obtener asistencia del día actual (requiere autenticación)</small>
        </div>
        
        <h2>📊 Estadísticas:</h2>
        <p>📚 Estudiantes registrados: ${students.length}</p>
        <p>📝 Registros de asistencia: ${attendanceRecords.length}</p>
        
        <h2>🔗 Links Útiles:</h2>
        <p>
          <a href="/health" style="color: #ffd700;">🔍 Verificar Health Check</a>
        </p>
      </div>
    </body>
    </html>
  `);
});

// ===== HEALTH CHECK =====
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'KinderJump Backend funcionando correctamente' });
});

// Iniciar servidor
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor KinderJump corriendo en http://192.168.100.18:${PORT}`);
  console.log(`📚 Estudiantes iniciales: ${students.length}`);
  console.log(`📝 Registros de asistencia: ${attendanceRecords.length}`);
});

server.on('error', (error) => {
  console.error('❌ Error al iniciar servidor:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Puerto ${PORT} ya está en uso`);
  }
});
