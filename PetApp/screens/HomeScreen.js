import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  const [pets, setPets] = useState([]);

  // 🔹 Carrega pets ao entrar na tela
  useEffect(() => {
    const loadPets = async () => {
      try {
        const storedPets = await AsyncStorage.getItem('@pets');
        if (storedPets) setPets(JSON.parse(storedPets));
      } catch (e) {
        console.log('Erro ao carregar pets', e);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadPets);
    return unsubscribe;
  }, [navigation]);

  // 🔹 Botão no topo (Perfil)
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        React.createElement(
          TouchableOpacity,
          {
            onPress: () => navigation.navigate('Profile'),
            style: { marginRight: 12 }
          },
          React.createElement(
            Text,
            {
              style: {
                color: '#007AFF',
                fontWeight: 'bold',
                fontSize: 16
              }
            },
            'Perfil'
          )
        )
    });
  }, [navigation]);

  // 🔹 Renderiza cada card de pet
  const renderCard = (pet) =>
    React.createElement(
      TouchableOpacity,
      {
        key: pet.id,
        style: styles.card,
        onPress: () => navigation.navigate('Details', { pet })
      },
      React.createElement(Text, { style: styles.petName }, pet.name),
      React.createElement(Text, { style: styles.petMeta }, `${pet.species} • ${pet.age}`),
      React.createElement(Text, { style: styles.petMeta }, pet.description)
    );

  // 🔹 Estrutura visual
  return React.createElement(
    ScrollView,
    { style: styles.container },
    React.createElement(Text, { style: styles.headerTitle }, 'Meus Pets'),
    pets.length
      ? pets.map((p) => renderCard(p))
      : React.createElement(
          View,
          { style: { alignItems: 'center', marginTop: 40 } },
          React.createElement(
            Text,
            { style: { color: '#666' } },
            'Nenhum pet cadastrado ainda.'
          )
        )
  );
}
