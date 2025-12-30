import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddPetScreen from './screens/AddPetScreen';
import VaccinationListScreen from './screens/VaccinationListScreen';
import AddVaccineScreen from './screens/AddVaccineScreen';

import { getCurrentUser } from './utils/storage';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

const Stack = createNativeStackNavigator();

function AppNavigator({ logged }) {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName={logged ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddPet" component={AddPetScreen} />
        <Stack.Screen name="VaccinationList" component={VaccinationListScreen} />
        <Stack.Screen name="AddVaccine" component={AddVaccineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function init() {
      const user = await getCurrentUser();
      setLogged(!!user);
      setLoading(false);
    }
    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <AppNavigator logged={logged} />
    </ThemeProvider>
  );
}
