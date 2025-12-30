// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getCurrentUser() {
  const user = await AsyncStorage.getItem('@currentUser');
  return user ? JSON.parse(user) : null;
}

export async function getUsers() {
  const users = await AsyncStorage.getItem('@users');
  return users ? JSON.parse(users) : [];
}

export async function getPets() {
  const pets = await AsyncStorage.getItem('@pets');
  return pets ? JSON.parse(pets) : [];
}

export async function saveTheme(theme) {
  await AsyncStorage.setItem('@theme', theme);
}

export async function getTheme() {
  const theme = await AsyncStorage.getItem('@theme');
  return theme || 'light';
}
