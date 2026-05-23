import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 🔹 Telas principais
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddPetScreen from './screens/AddPetScreen';

// 🔹 EP04 — Vacinação
import VaccinationListScreen from './screens/VaccinationListScreen';
import AddVaccineScreen from './screens/AddVaccineScreen';

// 🔹 EP04 — Veterinários e Clínicas
import VetsScreen from './screens/VetsScreen';
import AddVetScreen from './screens/AddVetScreen';

// 🔹 Storage e Tema
import { getCurrentUser } from './utils/storage';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

const Stack = createNativeStackNavigator();

function AppNavigator({ logged }) {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName={logged ? 'Home' : 'Login'}>

        {/* 🔐 Auth */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        {/* 🐾 App */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddPet" component={AddPetScreen} />

        {/* 💉 EP04 — Carteira de Vacinação */}
        <Stack.Screen
          name="VaccinationList"
          component={VaccinationListScreen}
          options={{ title: 'Carteira de Vacinação' }}
        />
        <Stack.Screen
          name="AddVaccine"
          component={AddVaccineScreen}
          options={{ title: 'Adicionar Vacina' }}
        />

        {/* 🏥 EP04 — Veterinários e Clínicas */}
        <Stack.Screen
          name="Vets"
          component={VetsScreen}
          options={{ title: 'Veterinários e Clínicas' }}
        />
        <Stack.Screen
          name="AddVet"
          component={AddVetScreen}
          options={{ title: 'Cadastrar Veterinário / Clínica' }}
        />

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
