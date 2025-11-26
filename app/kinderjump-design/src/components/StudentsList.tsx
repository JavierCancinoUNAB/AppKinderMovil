import { Student } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { UserCircle, Zap, FileText } from 'lucide-react';

interface StudentsListProps {
  students: Student[];
  onStudentClick: (student: Student) => void;
  onQuickAttendance: () => void;
  onViewRecords: () => void;
}

export function StudentsList({ students, onStudentClick, onQuickAttendance, onViewRecords }: StudentsListProps) {
  return (
    <div className="space-y-6">
      {/* Quick Access Buttons */}
      <div className="space-y-3">
        <h2 className="text-purple-700">Accesos Rápidos</h2>
        
        <Button
          onClick={onQuickAttendance}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white h-auto py-4"
        >
          <div className="flex items-center gap-3">
            <Zap className="size-5" />
            <div className="text-left">
              <div>Tomar Asistencia Rápida</div>
              <div className="text-xs opacity-90">Registrar todos los estudiantes</div>
            </div>
          </div>
        </Button>

        <Button
          onClick={onViewRecords}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white h-auto py-4"
        >
          <div className="flex items-center gap-3">
            <FileText className="size-5" />
            <div className="text-left">
              <div>Ver Registros de Asistencia</div>
              <div className="text-xs opacity-90">Historial mensual</div>
            </div>
          </div>
        </Button>
      </div>

      {/* Students List */}
      <div>
        <h2 className="text-purple-700 mb-4">Los Estudiantes</h2>
        <div className="space-y-3">
          {students.map((student) => (
            <Card
              key={student.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white border-l-4 border-purple-500"
              onClick={() => onStudentClick(student)}
            >
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <UserCircle className="size-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900">{student.nombreApellido}</h3>
                  <div className="text-sm text-gray-600 mt-1 space-y-1">
                    <p>Edad: {student.edad} años</p>
                    <p>Fecha de nacimiento: {new Date(student.fechaNacimiento).toLocaleDateString('es-CL')}</p>
                    <p className="text-xs text-gray-500 mt-2">{student.descripcion}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
