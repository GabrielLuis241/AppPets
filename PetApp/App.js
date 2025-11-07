import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  // Verifica se já existe sessão salva
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await AsyncStorage.getItem('@currentUser');
        setLogged(!!data);
      } catch (e) {
        console.log('Erro ao carregar sessão', e);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Enquanto verifica: tela de loading
  if (loading) {
    return React.createElement(
      View,
      {
        style: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff'
        }
      },
      React.createElement(ActivityIndicator, { size: 'large' })
    );
  }

  return React.createElement(
    NavigationContainer,
    null,
    React.createElement(
      Stack.Navigator,
      { initialRouteName: logged ? 'Home' : 'Login' },

      // Rotas de autenticação
      React.createElement(Stack.Screen, {
        name: 'Login',
        component: LoginScreen,
        options: { headerShown: false }
      }),
      React.createElement(Stack.Screen, {
        name: 'Register',
        component: RegisterScreen,
        options: { headerShown: false }
      }),

      // App autenticado
      React.createElement(Stack.Screen, {
        name: 'Home',
        component: HomeScreen,
        options: { title: 'Meus Pets' }
      }),
      React.createElement(Stack.Screen, {
        name: 'Details',
        component: DetailsScreen,
        options: { title: 'Detalhes do Pet' }
      }),

      // TELA DE PERFIL
      React.createElement(Stack.Screen, {
        name: 'Profile',
        component: ProfileScreen,
        options: { title: 'Meu Perfil' }
      })
    )
  );
}
