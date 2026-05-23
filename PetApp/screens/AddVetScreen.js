import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { addVet } from '../utils/storage';
import styles from '../styles/globalStyles';

export default function AddVetScreen({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  async function handleSave() {
    await addVet({ name, type, specialty, location, phone });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Cadastrar Veterinário</Text>

      <TextInput style={styles.input} placeholder="Nome" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Tipo" onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Especialidade" onChangeText={setSpecialty} />
      <TextInput style={styles.input} placeholder="Localização" onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Telefone" onChangeText={setPhone} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
