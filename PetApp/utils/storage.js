// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@users';
const PETS_KEY = '@pets';
const CURRENT_USER_KEY = '@currentUser';
const THEME_KEY = '@theme';
const VACCINES_KEY = '@vaccines';

/* =========================
   USUÁRIO
========================= */
export async function getCurrentUser() {
  const user = await AsyncStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

export async function getUsers() {
  const users = await AsyncStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

/* =========================
   PETS
========================= */
export async function getPets() {
  const pets = await AsyncStorage.getItem(PETS_KEY);
  return pets ? JSON.parse(pets) : [];
}

export async function savePet(pet) {
  const pets = await getPets();
  await AsyncStorage.setItem(PETS_KEY, JSON.stringify([...pets, pet]));
}

export async function updatePet(updatedPet) {
  const pets = await getPets();
  const updated = pets.map(p =>
    p.id === updatedPet.id ? updatedPet : p
  );
  await AsyncStorage.setItem(PETS_KEY, JSON.stringify(updated));
}

export async function deletePet(petId) {
  const pets = await getPets();
  const updated = pets.filter(p => p.id !== petId);
  await AsyncStorage.setItem(PETS_KEY, JSON.stringify(updated));
}

/* =========================
   VACINAS (EP04 – Parte 1)
========================= */
export async function getVaccines() {
  const vaccines = await AsyncStorage.getItem(VACCINES_KEY);
  return vaccines ? JSON.parse(vaccines) : [];
}

export async function getVaccinesByPet(petId) {
  const vaccines = await getVaccines();
  return vaccines.filter(v => v.petId === petId);
}

export async function addVaccine(vaccine) {
  const vaccines = await getVaccines();
  await AsyncStorage.setItem(
    VACCINES_KEY,
    JSON.stringify([...vaccines, vaccine])
  );
}

/* =========================
   TEMA
========================= */
export async function saveTheme(theme) {
  await AsyncStorage.setItem(THEME_KEY, theme);
}

export async function getTheme() {
  const theme = await AsyncStorage.getItem(THEME_KEY);
  return theme || 'light';
}
