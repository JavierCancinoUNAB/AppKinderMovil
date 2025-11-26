import { useState } from 'react';
import { Student, AttendanceRecord } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, CheckCircle, XCircle, Save } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';

interface QuickAttendanceProps {
  students: Student[];
  onSubmit: (records: AttendanceRecord[]) => void;
  onCancel: () => void;
}

interface StudentAttendance {
  studentId: string;
  status: 'presente' | 'ausente' | null;
  observacion: string;
}

export function QuickAttendance({ students, onSubmit, onCancel }: QuickAttendanceProps) {
  const sortedStudents = [...students].sort((a, b) => 
    a.nombreApellido.localeCompare(b.nombreApellido)
  );

  const [attendances, setAttendances] = useState<Record<string, StudentAttendance>>(
    sortedStudents.reduce((acc, student) => ({
      ...acc,
      [student.id]: { studentId: student.id, status: null, observacion: '' }
    }), {})
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);
  const [tempObservacion, setTempObservacion] = useState('');

  const handleStatusClick = (studentId: string, status: 'presente' | 'ausente') => {
    setCurrentStudentId(studentId);
    setTempObservacion(attendances[studentId]?.observacion || '');
    setDialogOpen(true);
    
    setAttendances(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status
      }
    }));
  };

  const handleObservacionSave = () => {
    if (!currentStudentId) return;

    if (!tempObservacion.trim()) {
      alert('Por favor ingresa una observación');
      return;
    }

    setAttendances(prev => ({
      ...prev,
      [currentStudentId]: {
        ...prev[currentStudentId],
        observacion: tempObservacion.trim()
      }
    }));

    setDialogOpen(false);
    setCurrentStudentId(null);
    setTempObservacion('');
  };

  const handleFinish = () => {
    const records: AttendanceRecord[] = [];
    const incompleteStudents: string[] = [];

    Object.entries(attendances).forEach(([studentId, attendance]) => {
      const student = students.find(s => s.id === studentId);
      if (!student) return;

      if (attendance.status && attendance.observacion) {
        records.push({
          id: `${Date.now()}-${studentId}`,
          studentId,
          studentName: student.nombreApellido,
          date: new Date().toISOString(),
          status: attendance.status,
          observacion: attendance.observacion,
        });
      } else if (attendance.status && !attendance.observacion) {
        incompleteStudents.push(student.nombreApellido);
      }
    });

    if (incompleteStudents.length > 0) {
      alert(`Faltan observaciones para: ${incompleteStudents.join(', ')}`);
      return;
    }

    if (records.length === 0) {
      alert('No hay registros de asistencia para guardar');
      return;
    }

    onSubmit(records);
  };

  const currentStudent = currentStudentId 
    ? students.find(s => s.id === currentStudentId)
    : null;

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onCancel}
        >
          <ArrowLeft className="size-4 mr-2" />
          Volver
        </Button>
        
        <Button
          onClick={handleFinish}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Save className="size-4 mr-2" />
          Terminar
        </Button>
      </div>

      <Card className="p-6 bg-white">
        <h2 className="text-purple-700 mb-4">Asistencia Rápida</h2>
        <p className="text-sm text-gray-600 mb-6">
          Fecha: {new Date().toLocaleDateString('es-CL', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-[1fr,auto] gap-2 pb-2 border-b-2 border-purple-200">
            <div className="text-sm text-gray-700">Estudiante</div>
            <div className="text-sm text-gray-700 text-center" style={{ width: '120px' }}>Asistencia</div>
          </div>

          {/* Students rows */}
          {sortedStudents.map((student) => {
            const attendance = attendances[student.id];
            const hasObservacion = attendance?.observacion?.trim().length > 0;

            return (
              <div
                key={student.id}
                className={`grid grid-cols-[1fr,auto] gap-2 items-center py-3 border-b border-gray-100 ${
                  attendance?.status && hasObservacion ? 'bg-green-50' : ''
                }`}
              >
                <div>
                  <p className="text-sm text-gray-900">{student.nombreApellido}</p>
                  {attendance?.observacion && (
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {attendance.observacion}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col gap-1" style={{ width: '120px' }}>
                  <Button
                    size="sm"
                    variant={attendance?.status === 'presente' ? 'default' : 'outline'}
                    className={`h-8 text-xs ${
                      attendance?.status === 'presente'
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'border-green-500 text-green-600 hover:bg-green-50'
                    }`}
                    onClick={() => handleStatusClick(student.id, 'presente')}
                  >
                    <CheckCircle className="size-3 mr-1" />
                    Presente
                  </Button>
                  
                  <Button
                    size="sm"
                    variant={attendance?.status === 'ausente' ? 'default' : 'outline'}
                    className={`h-8 text-xs ${
                      attendance?.status === 'ausente'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'border-red-500 text-red-600 hover:bg-red-50'
                    }`}
                    onClick={() => handleStatusClick(student.id, 'ausente')}
                  >
                    <XCircle className="size-3 mr-1" />
                    Ausente
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Observacion Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Observación</DialogTitle>
          </DialogHeader>
          
          {currentStudent && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Estudiante</p>
                <p className="text-gray-900">{currentStudent.nombreApellido}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <p className="text-gray-900 capitalize">
                  {attendances[currentStudent.id]?.status || '-'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quickObservacion">Observación</Label>
                <Input
                  id="quickObservacion"
                  value={tempObservacion}
                  onChange={(e) => setTempObservacion(e.target.value)}
                  placeholder="Escribe una observación..."
                  autoFocus
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                setCurrentStudentId(null);
                setTempObservacion('');
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleObservacionSave}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
