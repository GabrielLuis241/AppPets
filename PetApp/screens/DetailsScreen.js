import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styles from '../styles/globalStyles';

export default function DetailsScreen(props) {
  const pet = props.route?.params?.pet;

  if (!pet) {
    return React.createElement(
      ScrollView,
      { style: styles.container },
      React.createElement(Text, null, 'Pet não encontrado.')
    );
  }

  return React.createElement(
    ScrollView,
    { contentContainerStyle: styles.detailsContainer },

    // ✅ IMAGEM GRANDE DO PET
    pet.imageUri &&
      React.createElement(Image, {
        source: { uri: pet.imageUri },
        style: {
          width: '100%',
          height: 260,
          borderRadius: 12,
          marginBottom: 20
        }
      }),

    React.createElement(Text, { style: styles.detailsTitle }, pet.name),
    React.createElement(Text, { style: styles.detailsText }, `Espécie: ${pet.species}`),
    React.createElement(Text, { style: styles.detailsText }, `Idade: ${pet.age}`),
    React.createElement(Text, { style: styles.detailsText }, `Observações: ${pet.notes || 'Nenhuma'}`)
  );
}
