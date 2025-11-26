import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getStudents } from '../api/students';
import { createQuickAttendance } from '../api/attendance';
import { Student } from '../types/Student';

type AttendanceStatus = { [key: string]: 'present' | 'absent' };

const QuickAttendanceScreen = ({ navigation }: any) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceStatus>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      setStudents(data);
      // Initialize all as present
      const initialAttendance: AttendanceStatus = {};
      data.forEach(s => initialAttendance[s.id] = 'present');
      setAttendance(initialAttendance);
    };
    fetchStudents();
  }, []);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const records = Object.entries(attendance).map(([studentId, status]) => ({
      studentId,
      status,
      date: new Date().toISOString().split('T')[0],
      observation: ''
    }));

    try {
      await createQuickAttendance({ 
        date: new Date().toISOString().split('T')[0],
        records 
      });
      Alert.alert('Éxito', 'Asistencia registrada');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la asistencia');
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Student }) => (
    <View style={styles.studentRow}>
      <Text style={styles.studentName}>{item.name}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.statusButton, attendance[item.id] === 'present' && styles.presentButton]} 
          onPress={() => handleStatusChange(item.id, 'present')}>
          <Text style={styles.statusButtonText}>P</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.statusButton, attendance[item.id] === 'absent' && styles.absentButton]} 
          onPress={() => handleStatusChange(item.id, 'absent')}>
          <Text style={styles.statusButtonText}>A</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asistencia Rápida</Text>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
        <Text style={styles.saveButtonText}>{isLoading ? 'Guardando...' : 'Guardar todo'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f0f0f7' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#a29bfe' },
  studentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderRadius: 10, marginVertical: 5 },
  studentName: { fontSize: 16 },
  buttonsContainer: { flexDirection: 'row' },
  statusButton: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, marginHorizontal: 5, backgroundColor: '#dfe6e9' },
  presentButton: { backgroundColor: '#55efc4' },
  absentButton: { backgroundColor: '#ff7675' },
  statusButtonText: { color: '#fff', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#a29bfe', padding: 20, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default QuickAttendanceScreen;
