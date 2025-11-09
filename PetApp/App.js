import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddPetScreen from './screens/AddPetScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  // Verifica se existe usuário logado
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await AsyncStorage.getItem('@currentUser');
        setLogged(!!data);
      } catch (e) {
        console.log('Erro ao carregar sessão:', e);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Loading enquanto verifica login
  if (loading) {
    return React.createElement(
      View,
      {
        style: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        },
      },
      React.createElement(ActivityIndicator, { size: 'large' })
    );
  }

  // Navegação principal
  return React.createElement(
    NavigationContainer,
    null,
    React.createElement(
      Stack.Navigator,
      { initialRouteName: logged ? 'Home' : 'Login' },

      // LOGIN
      React.createElement(Stack.Screen, {
        name: 'Login',
        component: LoginScreen,
        options: { headerShown: false },
      }),

      React.createElement(Stack.Screen, {
        name: 'Register',
        component: RegisterScreen,
        options: { headerShown: false },
      }),

      // HOME
      React.createElement(Stack.Screen, {
        name: 'Home',
        component: HomeScreen,
        options: { title: 'Meus Pets' },
      }),

      // DETALHES DO PET
      React.createElement(Stack.Screen, {
        name: 'Details',
        component: DetailsScreen,
        options: { title: 'Detalhes do Pet' },
      }),

      // PERFIL DO USUÁRIO
      React.createElement(Stack.Screen, {
        name: 'Profile',
        component: ProfileScreen,
        options: { title: 'Meu Perfil' },
      }),

      // ✅ ADICIONAR PET
      React.createElement(Stack.Screen, {
        name: 'AddPet',
        component: AddPetScreen,
        options: { title: 'Cadastrar Pet' },
      })
    )
  );
}
