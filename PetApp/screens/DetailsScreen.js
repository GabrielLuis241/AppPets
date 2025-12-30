import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import styles from '../styles/globalStyles';
import { deletePet } from '../utils/storage';

export default function DetailsScreen({ navigation, route }) {
  const pet = route?.params?.pet;

  if (!pet) {
    return <Text>Pet não encontrado.</Text>;
  }

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
            await deletePet(pet.id);
            navigation.navigate('Home');
          }
        }
      ]
    );
  }

  return (
    <ScrollView style={styles.container}>
      {pet.imageUri && (
        <Image
          source={{ uri: pet.imageUri }}
          style={{ width: '100%', height: 260, borderRadius: 12 }}
        />
      )}

      <Text style={styles.detailsTitle}>{pet.name}</Text>
      <Text style={styles.detailsText}>Espécie: {pet.species}</Text>
      <Text style={styles.detailsText}>Raça: {pet.breed || '-'}</Text>
      <Text style={styles.detailsText}>Idade: {pet.age || '-'}</Text>
      <Text style={styles.detailsText}>
        Observações: {pet.notes || '-'}
      </Text>

      {/* 🔹 Botão para ver vacinas */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('VaccinationList', { pet })
        }
      >
        <Text style={styles.buttonText}>Ver Vacinas</Text>
      </TouchableOpacity>

      {/* 🔹 Botão para adicionar vacina direto */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 10 }]}
        onPress={() =>
          navigation.navigate('AddVaccine', { pet })
        }
      >
        <Text style={styles.buttonText}>Adicionar Vacina</Text>
      </TouchableOpacity>

      {/* 🔹 Botão para editar pet */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => navigation.navigate('AddPet', { pet })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      {/* 🔹 Botão para excluir pet */}
      <TouchableOpacity
        style={[styles.buttonSecondary, { marginTop: 10 }]}
        onPress={handleDelete}
      >
        <Text style={styles.buttonSecondaryText}>Excluir Pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
