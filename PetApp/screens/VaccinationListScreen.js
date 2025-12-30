import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';
import { scheduleVaccineNotification } from '../utils/notifications';

export default function VaccinationListScreen({ navigation, route }) {
  const pet = route?.params?.pet;
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    async function loadVaccines() {
      const raw = await AsyncStorage.getItem('@vaccines');
      const list = raw ? JSON.parse(raw) : [];
      const petVaccines = list.filter(v => v.petId === pet.id);
      setVaccines(petVaccines);
    }
    loadVaccines();
  }, [route]);

  function getVaccineStatus(vaccine) {
    const today = new Date();
    if (!vaccine.proximaDose) return 'Aplicada';
    const next = new Date(vaccine.proximaDose);
    if (next < today) return 'Atrasada';
    return 'Pendente';
  }

  async function handleDeleteVaccine(id) {
    Alert.alert(
      'Excluir Vacina',
      'Deseja realmente excluir esta vacina?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const raw = await AsyncStorage.getItem('@vaccines');
            const list = raw ? JSON.parse(raw) : [];
            const updated = list.filter(v => v.id !== id);
            await AsyncStorage.setItem('@vaccines', JSON.stringify(updated));
            setVaccines(updated.filter(v => v.id !== id));
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{pet.name} - Vacinas</Text>
      {vaccines.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Nenhuma vacina registrada.</Text>
      ) : (
        <FlatList
          data={vaccines}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const status = getVaccineStatus(item);
            const color = status === 'Atrasada' ? 'red' : status === 'Pendente' ? 'orange' : 'green';

            return (
              <View
                style={{
                  padding: 10,
                  marginVertical: 5,
                  backgroundColor: '#eee',
                  borderRadius: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View>
                  <Text style={{ color }}>{item.nome} - {status}</Text>
                  <Text>Data: {item.dataAplicacao}</Text>
                  {item.proximaDose && <Text>Próxima: {item.proximaDose}</Text>}
                </View>
                <TouchableOpacity onPress={() => handleDeleteVaccine(item.id)}>
                  <Text style={{ color: 'red' }}>Excluir</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => navigation.navigate('AddVaccine', { pet })}
      >
        <Text style={styles.buttonText}>Adicionar Vacina</Text>
      </TouchableOpacity>
    </View>
  );
}
