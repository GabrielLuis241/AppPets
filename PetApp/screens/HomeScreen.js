import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function HomeScreen(props) {
  const { navigation } = props;

  const [pets, setPets] = useState([]);

  // Carrega os pets do armazenamento local
  const loadPets = async () => {
    try {
      const stored = await AsyncStorage.getItem('@pets');
      if (stored) {
        setPets(JSON.parse(stored));
      } else {
        setPets([]); // caso ainda não exista nada
      }
    } catch (error) {
      console.log('Erro ao carregar pets:', error);
    }
  };

  // Recarrega toda vez que a tela ganhar foco (voltar do cadastro, por exemplo)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadPets);
    return unsubscribe;
  }, [navigation]);

  // Renderização de cada card
  const renderCard = (pet) => {
    return React.createElement(
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
  };

  return React.createElement(
    View,
    { style: styles.container },

    // Título
    React.createElement(Text, { style: styles.headerTitle }, 'Meus Pets'),

    // Botão de adicionar
    React.createElement(
      TouchableOpacity,
      {
        style: styles.button,
        onPress: () => navigation.navigate('AddPet')
      },
      React.createElement(Text, { style: styles.buttonText }, 'Adicionar Pet')
    ),

    // Lista
    React.createElement(
      ScrollView,
      { style: { marginTop: 20 } },

      pets.length === 0
        ? React.createElement(
            Text,
            { style: styles.emptyText },
            'Nenhum pet cadastrado ainda.'
          )
        : pets.map((p) => renderCard(p))
    )
  );
}
