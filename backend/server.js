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

// ===== HEALTH CHECK =====
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'KinderJump Backend funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor KinderJump corriendo en http://192.168.100.18:${PORT}`);
  console.log(`📚 Estudiantes iniciales: ${students.length}`);
  console.log(`📝 Registros de asistencia: ${attendanceRecords.length}`);
});
