import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState(null);

  // 🔹 Carrega usuário e pets do usuário logado
  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@currentUser');
        const petsData = await AsyncStorage.getItem('@pets');

        const parsedUser = userData ? JSON.parse(userData) : null;
        const parsedPets = petsData ? JSON.parse(petsData) : [];

        setUser(parsedUser);

        if (parsedUser) {
          const userPets = parsedPets.filter(
            (p) => p.userEmail === parsedUser.email
          );
          setPets(userPets);
        } else {
          setPets([]);
        }
      } catch (e) {
        console.log('Erro ao carregar dados', e);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  // 🔹 Header: apenas Perfil
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

  // 🔹 Card do pet
  const renderCard = (pet) =>
    React.createElement(
      TouchableOpacity,
      {
        key: pet.id,
        style: {
          backgroundColor: '#fff',
          padding: 12,
          borderRadius: 12,
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 3
        },
        onPress: () => navigation.navigate('Details', { pet })
      },

      // 📸 Foto do pet
      pet.imageUri
        ? React.createElement(Image, {
            source: { uri: pet.imageUri },
            style: {
              width: 70,
              height: 70,
              borderRadius: 8,
              marginRight: 12
            }
          })
        : React.createElement(
            View,
            {
              style: {
                width: 70,
                height: 70,
                borderRadius: 8,
                marginRight: 12,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center'
              }
            },
            React.createElement(
              Text,
              { style: { color: '#555' } },
              'Sem foto'
            )
          ),

      // 🐾 Infos
      React.createElement(
        View,
        null,
        React.createElement(Text, { style: styles.petName }, pet.name),
        React.createElement(
          Text,
          { style: styles.petMeta },
          `${pet.species} • ${pet.age || '-'}`
        )
      )
    );

  return React.createElement(
    View,
    { style: { flex: 1 } },

    // 📜 Lista
    React.createElement(
      ScrollView,
      { style: styles.container },
      React.createElement(Text, { style: styles.headerTitle }, 'Meus Pets'),
      pets.length
        ? pets.map(renderCard)
        : React.createElement(
            View,
            { style: { alignItems: 'center', marginTop: 40 } },
            React.createElement(
              Text,
              { style: { color: '#666' } },
              'Nenhum pet cadastrado ainda.'
            )
          )
    ),

    // ➕ BOTÃO FLUTUANTE (FAB)
    React.createElement(
      TouchableOpacity,
      {
        onPress: () => navigation.navigate('AddPet'),
        style: {
          position: 'absolute',
          right: 20,
          bottom: 30,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#28A745',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 6
        }
      },
      React.createElement(
        Text,
        {
          style: {
            color: '#fff',
            fontSize: 28,
            fontWeight: 'bold'
          }
        },
        '+'
      )
    )
  );
}
