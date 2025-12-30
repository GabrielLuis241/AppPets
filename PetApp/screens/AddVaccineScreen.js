import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';
import { scheduleVaccineNotification } from '../utils/notifications';

export default function AddVaccineScreen({ navigation, route }) {
  const pet = route?.params?.pet;
  const vaccineToEdit = route?.params?.vaccine || null;

  const [nome, setNome] = useState('');
  const [dataAplicacao, setDataAplicacao] = useState('');
  const [proximaDose, setProximaDose] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    if (vaccineToEdit) {
      setNome(vaccineToEdit.nome);
      setDataAplicacao(vaccineToEdit.dataAplicacao);
      setProximaDose(vaccineToEdit.proximaDose || '');
      setObservacoes(vaccineToEdit.observacoes || '');
    }
  }, []);

  async function handleSave() {
    if (!nome || !dataAplicacao) {
      Alert.alert('Erro', 'Nome e data são obrigatórios.');
      return;
    }

    const raw = await AsyncStorage.getItem('@vaccines');
    const list = raw ? JSON.parse(raw) : [];

    let updated;

    if (vaccineToEdit) {
      updated = list.map(v =>
        v.id === vaccineToEdit.id
          ? {
              ...v,
              nome,
              dataAplicacao,
              proximaDose: proximaDose || null,
              observacoes
            }
          : v
      );
    } else {
      updated = [
        ...list,
        {
          id: Date.now().toString(),
          petId: pet.id,
          nome,
          dataAplicacao,
          proximaDose: proximaDose || null,
          observacoes,
          createdAt: new Date().toISOString()
        }
      ];
    }

    await AsyncStorage.setItem('@vaccines', JSON.stringify(updated));

    // 🔹 Agendar notificação para próxima dose
    const savedVaccine = vaccineToEdit
      ? { ...vaccineToEdit, nome, proximaDose }
      : { nome, proximaDose };
    await scheduleVaccineNotification(savedVaccine, pet);

    Alert.alert(
      'Sucesso',
      'Vacina salva com sucesso!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>
        {vaccineToEdit ? 'Editar Vacina' : 'Adicionar Vacina'}
      </Text>

      <Text style={styles.text}>Nome da Vacina</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.text}>Data da Aplicação</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={dataAplicacao}
        onChangeText={setDataAplicacao}
      />

      <Text style={styles.text}>Próxima Dose</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD (opcional)"
        value={proximaDose}
        onChangeText={setProximaDose}
      />

      <Text style={styles.text}>Observações</Text>
      <TextInput
        style={{ ...styles.input, height: 80 }}
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
