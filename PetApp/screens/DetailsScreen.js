import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function DetailsScreen({ navigation, route }) {
  const pet = route?.params?.pet;

  if (!pet) {
    return React.createElement(Text, null, 'Pet não encontrado.');
  }

  // 🗑️ Excluir pet
  async function handleDelete() {
    Alert.alert(
      'Excluir Pet',
      'Tem certeza que deseja excluir este pet?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const raw = await AsyncStorage.getItem('@pets');
            const pets = raw ? JSON.parse(raw) : [];

            const updated = pets.filter((p) => p.id !== pet.id);
            await AsyncStorage.setItem('@pets', JSON.stringify(updated));

            navigation.navigate('Home');
          }
        }
      ]
    );
  }

  return React.createElement(
    ScrollView,
    { style: styles.container },

    // 📸 Foto grande
    pet.imageUri &&
      React.createElement(Image, {
        source: { uri: pet.imageUri },
        style: {
          width: '100%',
          height: 260,
          borderRadius: 12,
          marginBottom: 16
        }
      }),

    React.createElement(Text, { style: styles.detailsTitle }, pet.name),
    React.createElement(Text, { style: styles.detailsText }, `Espécie: ${pet.species}`),
    React.createElement(Text, { style: styles.detailsText }, `Raça: ${pet.breed || '-'}`),
    React.createElement(Text, { style: styles.detailsText }, `Idade: ${pet.age || '-'}`),
    React.createElement(
      Text,
      { style: styles.detailsText },
      `Observações: ${pet.notes || '-'}`
    ),

    // ✏️ Editar
    React.createElement(
      TouchableOpacity,
      {
        style: styles.button,
        onPress: () => navigation.navigate('AddPet', { pet })
      },
      React.createElement(Text, { style: styles.buttonText }, 'Editar')
    ),

    // 🗑️ Excluir
    React.createElement(
      TouchableOpacity,
      { style: styles.buttonSecondary, onPress: handleDelete },
      React.createElement(Text, { style: styles.buttonSecondaryText }, 'Excluir Pet')
    )
  );
}
