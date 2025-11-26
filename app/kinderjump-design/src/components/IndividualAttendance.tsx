import { useState } from 'react';
import { Student, AttendanceRecord } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

interface IndividualAttendanceProps {
  student: Student;
  onSubmit: (record: AttendanceRecord) => void;
  onCancel: () => void;
}

export function IndividualAttendance({ student, onSubmit, onCancel }: IndividualAttendanceProps) {
  const [status, setStatus] = useState<'presente' | 'ausente' | null>(null);
  const [observacion, setObservacion] = useState('');

  const handleContinue = () => {
    if (!status) {
      alert('Por favor selecciona Presente o Ausente');
      return;
    }

    if (!observacion.trim()) {
      alert('Por favor ingresa una observación');
      return;
    }

    const record: AttendanceRecord = {
      id: Date.now().toString(),
      studentId: student.id,
      studentName: student.nombreApellido,
      date: new Date().toISOString(),
      status,
      observacion: observacion.trim(),
    };

    onSubmit(record);
  };

  return (
    <div className="py-6 space-y-6">
      <Button
        variant="ghost"
        onClick={onCancel}
        className="mb-4"
      >
        <ArrowLeft className="size-4 mr-2" />
        Volver
      </Button>

      <Card className="p-6 bg-white">
        <h2 className="text-purple-700 mb-4">Registrar Asistencia</h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Estudiante</p>
            <p className="text-gray-900">{student.nombreApellido}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Edad</p>
            <p className="text-gray-900">{student.edad} años</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha</p>
            <p className="text-gray-900">{new Date().toLocaleDateString('es-CL', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Estado de Asistencia</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={status === 'presente' ? 'default' : 'outline'}
              className={`h-auto py-4 ${
                status === 'presente' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'border-green-500 text-green-600 hover:bg-green-50'
              }`}
              onClick={() => setStatus('presente')}
            >
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="size-6" />
                <span>Presente</span>
              </div>
            </Button>

            <Button
              type="button"
              variant={status === 'ausente' ? 'default' : 'outline'}
              className={`h-auto py-4 ${
                status === 'ausente' 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'border-red-500 text-red-600 hover:bg-red-50'
              }`}
              onClick={() => setStatus('ausente')}
            >
              <div className="flex flex-col items-center gap-2">
                <XCircle className="size-6" />
                <span>Ausente</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <Label htmlFor="observacion">Observación</Label>
          <Textarea
            id="observacion"
            placeholder="Ingresa una observación sobre la asistencia del estudiante..."
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <Button
          onClick={handleContinue}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
        >
          Continuar
        </Button>
      </Card>
    </div>
  );
}
