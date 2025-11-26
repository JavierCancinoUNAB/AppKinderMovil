import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../auth/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { Student } from '../types/Student';

type RootStackParamList = {
  StudentAttendance: { student: Student };
  QuickAttendance: undefined;
  AttendanceHistory: undefined;
  StudentList: undefined;
};

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'StudentAttendance'
>;

interface Props {
  navigation: DashboardScreenNavigationProp;
}

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock students data (reemplazar con API cuando esté lista)
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Martínez, Sofía',
        age: 4,
        dob: '2020-03-15',
        description: 'Niña muy activa y creativa. Le encanta dibujar y jugar con bloques.',
      },
      {
        id: '2',
        name: 'González, Lucas',
        age: 5,
        dob: '2019-07-22',
        description: 'Niño sociable y curioso. Muestra interés por los números y los animales.',
      },
      {
        id: '3',
        name: 'Fernández, Valentina',
        age: 3,
        dob: '2021-01-10',
        description: 'Niña tranquila y observadora. Le gusta escuchar cuentos.',
      },
      {
        id: '4',
        name: 'Rodríguez, Mateo',
        age: 4,
        dob: '2020-09-05',
        description: 'Niño energético con gran coordinación motora. Le encanta el deporte.',
      },
      {
        id: '5',
        name: 'López, Emma',
        age: 5,
        dob: '2019-11-28',
        description: 'Niña muy comunicativa. Disfruta cantando y bailando.',
      },
    ];
    setStudents(mockStudents);
  }, []);

  const renderStudent = ({ item }: { item: Student }) => (
    <TouchableOpacity 
      style={styles.studentCard} 
      onPress={() => navigation.navigate('StudentAttendance', { student: item })}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarIcon}>👤</Text>
      </View>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentDetail}>Edad: {item.age} años</Text>
        <Text style={styles.studentDetail}>Fecha de nacimiento: {new Date(item.dob).toLocaleDateString('es-CL')}</Text>
        <Text style={styles.studentDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#9333ea', '#ec4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Hola, {authContext?.user?.name || 'Profesor'}</Text>
          <TouchableOpacity onPress={authContext?.logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>🚪</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Título flotante */}
        <View style={styles.titleContainer}>
          <View style={styles.titleHeader}>
            <Text style={styles.iconBaby}>👶</Text>
            <Text style={styles.titleText}>KinderJump</Text>
          </View>
          <Text style={styles.subtitle}>Gestión de Asistencia</Text>
        </View>

        {/* Accesos Rápidos */}
        <View style={styles.quickAccessContainer}>
          <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
          
          <TouchableOpacity 
            style={[styles.quickButton, styles.quickButtonGreen]}
            onPress={() => navigation.navigate('QuickAttendance')}
          >
            <Text style={styles.quickButtonIcon}>⚡</Text>
            <View style={styles.quickButtonContent}>
              <Text style={styles.quickButtonTitle}>Tomar Asistencia Rápida</Text>
              <Text style={styles.quickButtonSubtitle}>Registrar todos los estudiantes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickButton, styles.quickButtonBlue]}
            onPress={() => navigation.navigate('AttendanceHistory')}
          >
            <Text style={styles.quickButtonIcon}>📄</Text>
            <View style={styles.quickButtonContent}>
              <Text style={styles.quickButtonTitle}>Ver Registros de Asistencia</Text>
              <Text style={styles.quickButtonSubtitle}>Historial mensual</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickButton, styles.quickButtonPurple]}
            onPress={() => navigation.navigate('StudentList')}
          >
            <Text style={styles.quickButtonIcon}>👥</Text>
            <View style={styles.quickButtonContent}>
              <Text style={styles.quickButtonTitle}>Ver Estudiantes</Text>
              <Text style={styles.quickButtonSubtitle}>Gestionar lista completa</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Lista de Estudiantes */}
        <View style={styles.studentsContainer}>
          <Text style={styles.sectionTitle}>Los Estudiantes</Text>
          {students.map((student) => (
            <View key={student.id}>
              {renderStudent({ item: student })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  logoutButton: {
    padding: 4,
  },
  logoutText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  iconBaby: {
    fontSize: 40,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  quickAccessContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7c3aed',
    marginBottom: 12,
  },
  quickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickButtonGreen: {
    backgroundColor: '#10b981',
  },
  quickButtonBlue: {
    backgroundColor: '#3b82f6',
  },
  quickButtonPurple: {
    backgroundColor: '#9333ea',
  },
  quickButtonIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  quickButtonContent: {
    flex: 1,
  },
  quickButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  quickButtonSubtitle: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
  },
  studentsContainer: {
    marginBottom: 24,
  },
  studentCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9333ea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ede9fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarIcon: {
    fontSize: 24,
    color: '#9333ea',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  studentDetail: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 2,
  },
  studentDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default DashboardScreen;

