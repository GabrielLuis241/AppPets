import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function ProfileScreen({ navigation, route }) {
  const [user, setUser] = useState(null);
  const [metrics, setMetrics] = useState(null);

  // 🔹 função vinda do App.js (tema)
  const toggleTheme = route?.params?.toggleTheme;

  useEffect(() => {
    async function loadData() {
      const currentUser = await AsyncStorage.getItem('@currentUser');
      const petsData = await AsyncStorage.getItem('@pets');

      const parsedUser = currentUser ? JSON.parse(currentUser) : null;
      const pets = petsData ? JSON.parse(petsData) : [];

      setUser(parsedUser);

      const userPets = pets.filter(p => p.userEmail === parsedUser?.email);
      generateMetrics(userPets);
    }

    loadData();
  }, []);

  function generateMetrics(userPets) {
    if (!userPets.length) {
      setMetrics({
        totalPets: 0,
        speciesMostCommon: '-',
        lastPet: '-',
        averageAge: '-'
      });
      return;
    }

    const totalPets = userPets.length;

    const speciesCount = {};
    userPets.forEach(p => {
      speciesCount[p.species] = (speciesCount[p.species] || 0) + 1;
    });

    const speciesMostCommon = Object.keys(speciesCount).reduce((a, b) =>
      speciesCount[a] > speciesCount[b] ? a : b
    );

    const lastPet = userPets[userPets.length - 1].name;

    const ages = userPets
      .map(p => parseInt(p.age))
      .filter(n => !isNaN(n));

    const averageAge =
      ages.length > 0
        ? `${(ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1)} anos`
        : '-';

    setMetrics({
      totalPets,
      speciesMostCommon,
      lastPet,
      averageAge
    });
  }

  async function handleLogout() {
    await AsyncStorage.removeItem('@currentUser');
    navigation.replace('Login');
  }

  async function handleDeleteAccount() {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta e todos os pets?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const usersData = await AsyncStorage.getItem('@users');
            const petsData = await AsyncStorage.getItem('@pets');

            const users = usersData ? JSON.parse(usersData) : [];
            const pets = petsData ? JSON.parse(petsData) : [];

            const updatedUsers = users.filter(u => u.email !== user.email);
            const updatedPets = pets.filter(p => p.userEmail !== user.email);

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
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Meu Perfil</Text>

      <View style={styles.profileCard}>
        <Text style={styles.profileLabel}>Nome</Text>
        <Text style={styles.profileValue}>{user.name}</Text>

        <Text style={styles.profileLabel}>Email</Text>
        <Text style={styles.profileValue}>{user.email}</Text>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.profileSectionTitle}>Métricas</Text>
        <Text>Total de pets: {metrics.totalPets}</Text>
        <Text>Espécie mais comum: {metrics.speciesMostCommon}</Text>
        <Text>Último pet: {metrics.lastPet}</Text>
        <Text>Idade média: {metrics.averageAge}</Text>
      </View>

      {/* ✅ NOVO BOTÃO — TEMA */}
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={toggleTheme}
      >
        <Text style={styles.buttonSecondaryText}>
          Alternar Tema
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Excluir Conta</Text>
      </TouchableOpacity>
    </View>
  );
}
