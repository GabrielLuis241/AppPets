import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return React.createElement(
    NavigationContainer,
    null,
    React.createElement(
      Stack.Navigator,
      { initialRouteName: 'Home' },
      React.createElement(Stack.Screen, {
        name: 'Home',
        component: HomeScreen,
        options: { title: 'Meus Pets' }
      }),
      React.createElement(Stack.Screen, {
        name: 'Details',
        component: DetailsScreen,
        options: { title: 'Detalhes do Pet' }
      })
    )
  );
}
