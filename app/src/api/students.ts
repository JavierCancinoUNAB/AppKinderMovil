import apiClient from './client';
import { Student } from '../types/Student';

export const getStudents = (): Promise<Student[]> => {
  return apiClient.get('/api/students');
};

export const getStudentById = (id: string): Promise<Student> => {
  return apiClient.get(`/api/students/${id}`);
};

export const createStudent = (student: Omit<Student, 'id'>): Promise<Student> => {
  return apiClient.post('/api/students', student);
};

export const updateStudent = (id: string, student: Partial<Student>): Promise<Student> => {
  return apiClient.put(`/api/students/${id}`, student);
};

export const deleteStudent = (id: string): Promise<void> => {
  return apiClient.delete(`/api/students/${id}`);
};
