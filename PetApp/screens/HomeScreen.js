import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        React.createElement(
          View,
          { style: { flexDirection: 'row' } },

          React.createElement(
            TouchableOpacity,
            {
              onPress: () => navigation.navigate('AddPet'),
              style: { marginRight: 16 }
            },
            React.createElement(
              Text,
              {
                style: {
                  color: '#28A745',
                  fontWeight: 'bold',
                  fontSize: 16
                }
              },
              '+ Add'
            )
          ),

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
        )
    });
  }, [navigation]);

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

      // ✅ IMAGEM DO PET
      pet.imageUri
        ? React.createElement(Image, {
            source: { uri: pet.imageUri },
            style: {
              width: 70,
              height: 70,
              borderRadius: 8,
              marginRight: 12,
              backgroundColor: '#ddd'
            },
          })
        : React.createElement(View, {
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
          React.createElement(Text, { style: { color: '#555' } }, 'Sem foto')
        ),

      // ✅ TEXTOS DO PET
      React.createElement(
        View,
        null,
        React.createElement(Text, { style: styles.petName }, pet.name),
        React.createElement(Text, { style: styles.petMeta }, `${pet.species} • ${pet.age}`)
      )
    );

  return React.createElement(
    ScrollView,
    { style: styles.container },
    React.createElement(Text, { style: styles.headerTitle }, 'Meus Pets'),
    pets.length
      ? pets.map((p) => renderCard(p))
      : React.createElement(
          View,
          { style: { alignItems: 'center', marginTop: 40 } },
          React.createElement(Text, { style: { color: '#666' } }, 'Nenhum pet cadastrado ainda.')
        )
  );
}
