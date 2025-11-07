import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function ProfileScreen(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [metrics, setMetrics] = useState(null);

  // ================================
  // Carrega usuário logado + pets
  // ================================
  useEffect(() => {
    async function loadData() {
      const currentUser = await AsyncStorage.getItem('@currentUser');
      const petsData = await AsyncStorage.getItem('@pets');

      const parsedUser = currentUser ? JSON.parse(currentUser) : null;
      const parsedPets = petsData ? JSON.parse(petsData) : [];

      setUser(parsedUser);

      // filtros: pega só pets do usuário
      const userPets = parsedPets.filter(p => p.userEmail === parsedUser?.email);
      setPets(userPets);

      generateMetrics(userPets);
    }

    loadData();
  }, []);

  // ================================
  // Gera métricas do usuário
  // ================================
  function generateMetrics(userPets) {
    if (!userPets || userPets.length === 0) {
      setMetrics({
        totalPets: 0,
        speciesMostCommon: '-',
        lastPet: '-',
        averageAge: '-'
      });
      return;
    }

    // total
    const totalPets = userPets.length;

    // espécie mais comum
    const speciesCount = {};
    userPets.forEach(p => {
      speciesCount[p.species] = (speciesCount[p.species] || 0) + 1;
    });

    const speciesMostCommon = Object.keys(speciesCount).reduce((a, b) =>
      speciesCount[a] > speciesCount[b] ? a : b
    );

    // último pet cadastrado
    const lastPet = userPets[userPets.length - 1]?.name;

    // média de idade (se idade for número)
    const validAges = userPets
      .map(p => parseInt(p.age))
      .filter(n => !isNaN(n));

    const averageAge =
      validAges.length > 0
        ? `${(validAges.reduce((a, b) => a + b, 0) / validAges.length).toFixed(1)} anos`
        : '-';

    setMetrics({
      totalPets,
      speciesMostCommon,
      lastPet,
      averageAge
    });
  }

  // ================================
  // Logout
  // ================================
  async function handleLogout() {
    await AsyncStorage.removeItem('@currentUser');
    navigation.replace('Login');
  }

  // ================================
  // Excluir Conta
  // ================================
  async function handleDeleteAccount() {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta? Isso removerá também todos os seus pets.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const usersData = await AsyncStorage.getItem('@users');
            const petsData = await AsyncStorage.getItem('@pets');

            const users = usersData ? JSON.parse(usersData) : [];
            const petsList = petsData ? JSON.parse(petsData) : [];

            // remove usuário
            const updatedUsers = users.filter(u => u.email !== user.email);

            // remove pets do usuário
            const updatedPets = petsList.filter(p => p.userEmail !== user.email);

            await AsyncStorage.setItem('@users', JSON.stringify(updatedUsers));
            await AsyncStorage.setItem('@pets', JSON.stringify(updatedPets));
            await AsyncStorage.removeItem('@currentUser');

            navigation.replace('Login');
          }
        }
      ]
    );
  }

  if (!user || !metrics) {
    return React.createElement(
      View,
      { style: styles.container },
      React.createElement(Text, { style: styles.headerTitle }, 'Carregando...')
    );
  }

  // ================================
  // RENDERIZAÇÃO FINAL
  // ================================
  return React.createElement(
    View,
    { style: styles.container },

    // Título
    React.createElement(
      Text,
      { style: styles.headerTitle },
      'Meu Perfil'
    ),

    // Card de informações do usuário
    React.createElement(
      View,
      { style: styles.profileCard },
      React.createElement(Text, { style: styles.profileLabel }, 'Nome'),
      React.createElement(Text, { style: styles.profileValue }, user.name),

      React.createElement(Text, { style: styles.profileLabel }, 'Email'),
      React.createElement(Text, { style: styles.profileValue }, user.email),

      React.createElement(Text, { style: styles.profileLabel }, 'Conta criada em'),
      React.createElement(Text, { style: styles.profileValue }, user.createdAt || '-')
    ),

    // Card de métricas
    React.createElement(
      View,
      { style: styles.profileCard },
      React.createElement(Text, { style: styles.profileSectionTitle }, 'Métricas dos Pets'),

      React.createElement(Text, { style: styles.profileMetric },
        `Total de pets: ${metrics.totalPets}`
      ),
      React.createElement(Text, { style: styles.profileMetric },
        `Espécie mais comum: ${metrics.speciesMostCommon}`
      ),
      React.createElement(Text, { style: styles.profileMetric },
        `Último pet cadastrado: ${metrics.lastPet}`
      ),
      React.createElement(Text, { style: styles.profileMetric },
        `Idade média: ${metrics.averageAge}`
      )
    ),

    // Botões
    React.createElement(
      View,
      { style: styles.profileActions },
      React.createElement(
        TouchableOpacity,
        { style: styles.logoutButton, onPress: handleLogout },
        React.createElement(Text, { style: styles.logoutText }, 'Sair')
      ),
      React.createElement(
        TouchableOpacity,
        { style: styles.deleteButton, onPress: handleDeleteAccount },
        React.createElement(Text, { style: styles.deleteText }, 'Excluir Conta')
      )
    )
  );
}
