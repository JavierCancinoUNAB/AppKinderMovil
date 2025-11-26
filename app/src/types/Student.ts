export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string; // Pre-Kinder, Kinder, etc.
  photoUrl?: string;
  dob?: string; // Date of birth in YYYY-MM-DD format (opcional)
  description?: string; // Opcional
}
