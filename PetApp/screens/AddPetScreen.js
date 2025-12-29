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

export default function AddPetScreen({ navigation, route }) {
  // 🔹 Se veio pet pela rota → edição
  const petToEdit = route?.params?.pet || null;

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // 🔹 Carrega usuário logado
  useEffect(() => {
    async function loadUser() {
      const raw = await AsyncStorage.getItem('@currentUser');
      if (raw) setCurrentUser(JSON.parse(raw));
    }
    loadUser();
  }, []);

  // 🔹 Preenche campos se for edição
  useEffect(() => {
    if (petToEdit) {
      setName(petToEdit.name || '');
      setSpecies(petToEdit.species || '');
      setBreed(petToEdit.breed || '');
      setAge(petToEdit.age || '');
      setNotes(petToEdit.notes || '');
      setImageUri(petToEdit.imageUri || null);
    }
  }, [petToEdit]);

  // 🔹 Escolher imagem (CORRIGIDO)
  async function pickImage() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permissão necessária',
          'Permita acesso à galeria para escolher uma foto.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // ✅ CORRETO (Expo atual)
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Erro ao escolher imagem:', error);
      Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    }
  }

  // 🔹 Salvar ou atualizar pet
  async function handleSave() {
    if (!name.trim() || !species.trim()) {
      Alert.alert('Erro', 'Nome e espécie são obrigatórios.');
      return;
    }

    if (!currentUser) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    try {
      const raw = await AsyncStorage.getItem('@pets');
      const pets = raw ? JSON.parse(raw) : [];

      let updatedPets;

      if (petToEdit) {
        // ✏️ ATUALIZAR
        updatedPets = pets.map((p) =>
          p.id === petToEdit.id
            ? {
                ...p,
                name,
                species,
                breed,
                age,
                notes,
                imageUri
              }
            : p
        );
      } else {
        // ➕ CADASTRAR
        updatedPets = [
          ...pets,
          {
            id: Date.now().toString(),
            name,
            species,
            breed,
            age,
            notes,
            imageUri,
            createdAt: new Date().toISOString(),
            userEmail: currentUser.email
          }
        ];
      }

      await AsyncStorage.setItem('@pets', JSON.stringify(updatedPets));

      Alert.alert(
        'Sucesso 🎉',
        petToEdit
          ? 'Pet atualizado com sucesso!'
          : 'Pet cadastrado com sucesso!',
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );
    } catch (e) {
      console.log('Erro ao salvar pet:', e);
      Alert.alert('Erro', 'Não foi possível salvar o pet.');
    }
  }

  return React.createElement(
    ScrollView,
    { style: styles.container, contentContainerStyle: { paddingBottom: 30 } },

    React.createElement(
      Text,
      { style: styles.headerTitle },
      petToEdit ? 'Editar Pet' : 'Cadastrar Pet'
    ),

    React.createElement(
      View,
      { style: styles.formContainer },

      // 📸 Preview da imagem
      imageUri &&
        React.createElement(Image, {
          source: { uri: imageUri },
          style: {
            width: 150,
            height: 150,
            borderRadius: 10,
            alignSelf: 'center',
            marginBottom: 16
          }
        }),

      // 📷 Botão escolher foto
      React.createElement(
        TouchableOpacity,
        {
          onPress: pickImage,
          style: {
            backgroundColor: '#007AFF',
            padding: 10,
            borderRadius: 8,
            marginBottom: 20,
            alignSelf: 'center'
          }
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
        value: name,
        onChangeText: setName
      }),

      React.createElement(Text, { style: styles.text }, 'Espécie'),
      React.createElement(TextInput, {
        style: styles.input,
        value: species,
        onChangeText: setSpecies
      }),

      React.createElement(Text, { style: styles.text }, 'Raça'),
      React.createElement(TextInput, {
        style: styles.input,
        value: breed,
        onChangeText: setBreed
      }),

      React.createElement(Text, { style: styles.text }, 'Idade'),
      React.createElement(TextInput, {
        style: styles.input,
        value: age,
        onChangeText: setAge
      }),

      React.createElement(Text, { style: styles.text }, 'Observações'),
      React.createElement(TextInput, {
        style: { ...styles.input, height: 100 },
        value: notes,
        onChangeText: setNotes,
        multiline: true
      }),

      React.createElement(
        TouchableOpacity,
        { style: styles.button, onPress: handleSave },
        React.createElement(
          Text,
          { style: styles.buttonText },
          petToEdit ? 'Atualizar Pet' : 'Salvar Pet'
        )
      ),

      React.createElement(
        TouchableOpacity,
        {
          style: styles.buttonSecondary,
          onPress: () => navigation.goBack()
        },
        React.createElement(
          Text,
          { style: styles.buttonSecondaryText },
          'Cancelar'
        )
      )
    )
  );
}
