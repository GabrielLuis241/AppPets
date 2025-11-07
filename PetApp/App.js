import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Telas principais
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddPetScreen from './screens/AddPetScreen';
import EditPetScreen from './screens/EditPetScreen';

// Telas de autenticação
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userLogged, setUserLogged] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se o usuário está logado
  useEffect(() => {
    async function checkLogin() {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUserLogged(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Erro ao recuperar usuário:', error);
      }
      setLoading(false);
    }

    checkLogin();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        
        {/* Usuário NÃO logado → Telas de Login/Cadastro */}
        {!userLogged ? (
          <>
            <Stack.Screen
              name="Login"
              options={{ title: "Entrar" }}
            >
              {(props) => <LoginScreen {...props} setUserLogged={setUserLogged} />}
            </Stack.Screen>

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Criar conta" }}
            />
          </>
        ) : (
          <>
            {/* Telas PRINCIPAIS após login */}
            <Stack.Screen
              name="Home"
              options={{ title: 'Meus Pets' }}
            >
              {(props) => <HomeScreen {...props} setUserLogged={setUserLogged} />}
            </Stack.Screen>

            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{ title: 'Detalhes do Pet' }}
            />

            <Stack.Screen
              name="AddPet"
              component={AddPetScreen}
              options={{ title: 'Cadastrar Pet' }}
            />

            <Stack.Screen
              name="EditPet"
              component={EditPetScreen}
              options={{ title: 'Editar Pet' }}
            />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
