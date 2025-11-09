// screens/AddPetScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/globalStyles';

export default function AddPetScreen(props) {
  const { navigation } = props;

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const raw = await AsyncStorage.getItem('@currentUser');
        if (raw) setCurrentUser(JSON.parse(raw));
      } catch (e) {
        console.log('Erro ao carregar user no AddPet:', e);
      }
    }
    loadUser();
  }, []);

  // ✅ Escolher foto
  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão negada', 'Habilite o acesso às imagens.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 0.7
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert('Erro', 'Informe o nome do pet.');
      return;
    }
    if (!species.trim()) {
      Alert.alert('Erro', 'Informe a espécie do pet.');
      return;
    }
    if (!currentUser) {
      Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
      return;
    }

    try {
      const raw = await AsyncStorage.getItem('@pets');
      const list = raw ? JSON.parse(raw) : [];

      const newPet = {
        id: Date.now().toString(),
        name: name.trim(),
        species: species.trim(),
        breed: breed.trim(),
        age: age.trim(),
        notes: notes.trim(),
        imageUri: imageUri || null, // ✅ foto salva
        createdAt: new Date().toISOString(),
        userEmail: currentUser.email
      };

      const updated = [...list, newPet];
      await AsyncStorage.setItem('@pets', JSON.stringify(updated));

      Alert.alert('Sucesso', 'Pet cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } catch (e) {
      console.log('Erro ao salvar pet:', e);
      Alert.alert('Erro', 'Não foi possível salvar o pet. Tente novamente.');
    }
  }

  return React.createElement(
    ScrollView,
    { style: styles.container, contentContainerStyle: { paddingBottom: 30 } },

    React.createElement(Text, { style: styles.headerTitle }, 'Cadastrar Pet'),

    React.createElement(View, { style: styles.formContainer },

      // ✅ Se tiver imagem, mostrar
      imageUri
        ? React.createElement(Image, {
            source: { uri: imageUri },
            style: {
              width: 150,
              height: 150,
              borderRadius: 10,
              alignSelf: 'center',
              marginBottom: 20
            }
          })
        : null,

      // ✅ Botão de selecionar foto
      React.createElement(
        TouchableOpacity,
        {
          style: {
            backgroundColor: '#007AFF',
            padding: 10,
            borderRadius: 8,
            marginBottom: 20,
            alignSelf: 'center'
          },
          onPress: pickImage
        },
        React.createElement(
          Text,
          { style: { color: '#fff', fontWeight: 'bold' } },
          imageUri ? 'Trocar Foto' : 'Escolher Foto'
        )
      ),

      React.createElement(Text, { style: styles.text }, 'Nome'),
      React.createElement(TextInput, {
        style: styles.input,
        placeholder: 'Nome do pet',
        value: name,
        onChangeText: setName
      }),

      React.createElement(Text, { style: styles.text }, 'Espécie'),
      React.createElement(TextInput, {
        style: styles.input,
        placeholder: 'Ex: Cachorro, Gato',
        value: species,
        onChangeText: setSpecies
      }),

      React.createElement(Text, { style: styles.text }, 'Raça'),
      React.createElement(TextInput, {
        style: styles.input,
        placeholder: 'Raça (opcional)',
        value: breed,
        onChangeText: setBreed
      }),

      React.createElement(Text, { style: styles.text }, 'Idade'),
      React.createElement(TextInput, {
        style: styles.input,
        placeholder: 'Ex: 2 ou 2 anos',
        value: age,
        onChangeText: setAge
      }),

      React.createElement(Text, { style: styles.text }, 'Observações'),
      React.createElement(TextInput, {
        style: { ...styles.input, height: 100 },
        placeholder: 'Notas, vacinas, alergias...',
        value: notes,
        onChangeText: setNotes,
        multiline: true
      }),

      React.createElement(
        TouchableOpacity,
        { style: styles.button, onPress: handleSave },
        React.createElement(Text, { style: styles.buttonText }, 'Salvar Pet')
      ),

      React.createElement(
        TouchableOpacity,
        { style: styles.buttonSecondary, onPress: () => navigation.goBack() },
        React.createElement(Text, { style: styles.buttonSecondaryText }, 'Cancelar')
      )
    )
  );
}
