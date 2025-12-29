import React, { useEffect, useState, createContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddPetScreen from './screens/AddPetScreen';

export const ThemeContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);
  const [theme, setTheme] = useState('light');

  // Carrega sessão + tema
  useEffect(() => {
    async function init() {
      const user = await AsyncStorage.getItem('@currentUser');
      const savedTheme = await AsyncStorage.getItem('@theme');

      setLogged(!!user);
      if (savedTheme) setTheme(savedTheme);

      setLoading(false);
    }
    init();
  }, []);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    AsyncStorage.setItem('@theme', newTheme);
  }

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName={logged ? 'Home' : 'Login'}>

          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown:false }} />

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AddPet" component={AddPetScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
