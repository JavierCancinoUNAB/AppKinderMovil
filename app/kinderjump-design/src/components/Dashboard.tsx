import { useState, useEffect } from 'react';
import { User, Student, AttendanceRecord } from '../App';
import { StudentsList } from './StudentsList';
import { IndividualAttendance } from './IndividualAttendance';
import { QuickAttendance } from './QuickAttendance';
import { AttendanceRecords } from './AttendanceRecords';
import { FloatingTitle } from './FloatingTitle';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export type ViewType = 'home' | 'individual' | 'quick' | 'records';

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Initialize mock students
    const mockStudents: Student[] = [
      {
        id: '1',
        nombreApellido: 'Martínez, Sofía',
        edad: 4,
        fechaNacimiento: '2020-03-15',
        descripcion: 'Niña muy activa y creativa. Le encanta dibujar y jugar con bloques.',
      },
      {
        id: '2',
        nombreApellido: 'González, Lucas',
        edad: 5,
        fechaNacimiento: '2019-07-22',
        descripcion: 'Niño sociable y curioso. Muestra interés por los números y los animales.',
      },
      {
        id: '3',
        nombreApellido: 'Fernández, Valentina',
        edad: 3,
        fechaNacimiento: '2021-01-10',
        descripcion: 'Niña tranquila y observadora. Le gusta escuchar cuentos.',
      },
      {
        id: '4',
        nombreApellido: 'Rodríguez, Mateo',
        edad: 4,
        fechaNacimiento: '2020-09-05',
        descripcion: 'Niño energético con gran coordinación motora. Le encanta el deporte.',
      },
      {
        id: '5',
        nombreApellido: 'López, Emma',
        edad: 5,
        fechaNacimiento: '2019-11-28',
        descripcion: 'Niña muy comunicativa. Disfruta cantando y bailando.',
      },
    ];

    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      setStudents(mockStudents);
      localStorage.setItem('students', JSON.stringify(mockStudents));
    }

    // Load attendance records
    const savedRecords = localStorage.getItem('attendanceRecords');
    if (savedRecords) {
      setAttendanceRecords(JSON.parse(savedRecords));
    }
  }, []);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setCurrentView('individual');
  };

  const handleAttendanceSubmit = (record: AttendanceRecord) => {
    const newRecords = [...attendanceRecords, record];
    setAttendanceRecords(newRecords);
    localStorage.setItem('attendanceRecords', JSON.stringify(newRecords));
    setCurrentView('home');
    setSelectedStudent(null);
  };

  const handleQuickAttendanceSubmit = (records: AttendanceRecord[]) => {
    const newRecords = [...attendanceRecords, ...records];
    setAttendanceRecords(newRecords);
    localStorage.setItem('attendanceRecords', JSON.stringify(newRecords));
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Hola, {user.nombreApellido}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-white hover:bg-white/20"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4">
        {currentView === 'home' && (
          <>
            <FloatingTitle />
            <StudentsList students={students} onStudentClick={handleStudentClick} onQuickAttendance={() => setCurrentView('quick')} onViewRecords={() => setCurrentView('records')} />
          </>
        )}

        {currentView === 'individual' && selectedStudent && (
          <IndividualAttendance
            student={selectedStudent}
            onSubmit={handleAttendanceSubmit}
            onCancel={() => {
              setCurrentView('home');
              setSelectedStudent(null);
            }}
          />
        )}

        {currentView === 'quick' && (
          <QuickAttendance
            students={students}
            onSubmit={handleQuickAttendanceSubmit}
            onCancel={() => setCurrentView('home')}
          />
        )}

        {currentView === 'records' && (
          <AttendanceRecords
            records={attendanceRecords}
            students={students}
            onBack={() => setCurrentView('home')}
          />
        )}
      </div>
    </div>
  );
}
