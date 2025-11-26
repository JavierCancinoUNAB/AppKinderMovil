import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createAttendanceRecord } from '../api/attendance';
import { Student } from '../types/Student';

type RootStackParamList = {
  StudentAttendance: { student: Student };
};

type StudentAttendanceScreenRouteProp = RouteProp<RootStackParamList, 'StudentAttendance'>;

interface Props {
  route: StudentAttendanceScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'StudentAttendance'>;
}

const StudentAttendanceScreen: React.FC<Props> = ({ route, navigation }) => {
  const { student } = route.params;
  const [status, setStatus] = useState<'present' | 'absent'>('present');
  const [observation, setObservation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await createAttendanceRecord({
        studentId: student.id,
        date: new Date().toISOString().split('T')[0],
        status,
        observation,
      });
      Alert.alert('Éxito', 'Asistencia registrada correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar la asistencia');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{student.name}</Text>
        <Text>{student.age} años - {student.dob}</Text>
        <Text>{student.description}</Text>
      </View>
      <View style={styles.statusContainer}>
        <TouchableOpacity 
          style={[styles.statusButton, status === 'present' && styles.presentButton]} 
          onPress={() => setStatus('present')}>
          <Text style={styles.statusButtonText}>Presente</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.statusButton, status === 'absent' && styles.absentButton]} 
          onPress={() => setStatus('absent')}>
          <Text style={styles.statusButtonText}>Ausente</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Observación"
        value={observation}
        onChangeText={setObservation}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
        <Text style={styles.saveButtonText}>{isLoading ? 'Guardando...' : 'Guardar asistencia'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f7',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statusButton: {
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
  },
  presentButton: {
    backgroundColor: '#55efc4',
  },
  absentButton: {
    backgroundColor: '#ff7675',
  },
  statusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#a29bfe',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default StudentAttendanceScreen;
