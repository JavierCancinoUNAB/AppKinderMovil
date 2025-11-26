import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider } from '../auth/AuthContext';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import StudentAttendanceScreen from '../screens/StudentAttendanceScreen';
import QuickAttendanceScreen from '../screens/QuickAttendanceScreen';
import AttendanceHistoryScreen from '../screens/AttendanceHistoryScreen';
import StudentListScreen from '../screens/StudentListScreen';

const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="StudentList" component={StudentListScreen} />
    <Stack.Screen name="StudentAttendance" component={StudentAttendanceScreen} />
    <Stack.Screen name="QuickAttendance" component={QuickAttendanceScreen} />
    <Stack.Screen name="AttendanceHistory" component={AttendanceHistoryScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

function RootNavigator() {
  const authContext = useContext(AuthContext);
  
  console.log('🔵 RootNavigator - token:', authContext?.token ? 'existe' : 'null');

  if (!authContext) {
    console.log('⚠️ AuthContext undefined');
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {authContext.token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const AppNavigator = () => (
  <AuthProvider>
    <RootNavigator />
  </AuthProvider>
);

export default AppNavigator;
