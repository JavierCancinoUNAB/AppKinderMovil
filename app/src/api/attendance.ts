import apiClient from './client';
import { AttendanceRecord } from '../types/AttendanceRecord';

interface AttendancePayload {
  studentId: string;
  date: string;
  status: 'present' | 'absent';
  notes?: string;
}

interface QuickAttendancePayload {
  date: string;
  records: AttendancePayload[];
}

export const createAttendanceRecord = (payload: AttendancePayload): Promise<AttendanceRecord> => {
  return apiClient.post('/api/attendance', payload);
};

export const createQuickAttendance = (payload: QuickAttendancePayload): Promise<any> => {
  return apiClient.post('/api/attendance/bulk', payload);
};

export const getAttendanceHistory = (params?: { 
  startDate?: string; 
  endDate?: string; 
  studentId?: string;
}): Promise<AttendanceRecord[]> => {
  const query = new URLSearchParams(params as any).toString();
  return apiClient.get(`/api/attendance/history${query ? `?${query}` : ''}`);
};

export const getTodayAttendance = (): Promise<AttendanceRecord[]> => {
  return apiClient.get('/api/attendance/today');
};
