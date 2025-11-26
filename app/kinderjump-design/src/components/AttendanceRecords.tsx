import { useState, useMemo } from 'react';
import { AttendanceRecord, Student } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Calendar, CheckCircle, XCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AttendanceRecordsProps {
  records: AttendanceRecord[];
  students: Student[];
  onBack: () => void;
}

export function AttendanceRecords({ records, students, onBack }: AttendanceRecordsProps) {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());

  // Generate months and years options
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 3 }, (_, i) => currentYear - i);
  }, []);

  // Filter records by selected month and year, and only weekdays
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const date = new Date(record.date);
      const dayOfWeek = date.getDay();
      
      // Filter out weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek === 0 || dayOfWeek === 6) return false;
      
      return (
        date.getMonth() === parseInt(selectedMonth) &&
        date.getFullYear() === parseInt(selectedYear)
      );
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [records, selectedMonth, selectedYear]);

  // Group records by date
  const recordsByDate = useMemo(() => {
    const grouped: Record<string, AttendanceRecord[]> = {};
    
    filteredRecords.forEach(record => {
      const dateKey = new Date(record.date).toLocaleDateString('es-CL');
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(record);
    });

    return grouped;
  }, [filteredRecords]);

  return (
    <div className="py-6 space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
      >
        <ArrowLeft className="size-4 mr-2" />
        Volver
      </Button>

      <Card className="p-6 bg-white">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="size-5 text-purple-600" />
          <h2 className="text-purple-700">Registros de Asistencia</h2>
        </div>

        {/* Month and Year selectors */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Mes</label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Año</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Records display */}
        {Object.keys(recordsByDate).length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="size-12 mx-auto mb-3 opacity-30" />
            <p>No hay registros para este mes</p>
            <p className="text-sm mt-1">Solo se muestran días de lunes a viernes</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(recordsByDate).map(([date, dayRecords]) => {
              const recordDate = new Date(dayRecords[0].date);
              const dayName = recordDate.toLocaleDateString('es-CL', { weekday: 'long' });
              
              return (
                <div key={date} className="border-l-4 border-purple-500 pl-4">
                  <div className="mb-3">
                    <p className="text-gray-900 capitalize">{dayName}</p>
                    <p className="text-sm text-gray-600">{date}</p>
                  </div>

                  <div className="space-y-2">
                    {dayRecords.map((record) => (
                      <div
                        key={record.id}
                        className={`p-3 rounded-lg border ${
                          record.status === 'presente'
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {record.status === 'presente' ? (
                            <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{record.studentName}</p>
                            <p className="text-xs text-gray-600 capitalize mt-1">
                              {record.status}
                            </p>
                            {record.observacion && (
                              <p className="text-xs text-gray-700 mt-2 bg-white/50 p-2 rounded">
                                {record.observacion}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
