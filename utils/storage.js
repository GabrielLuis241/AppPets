// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'PetAppData_v1';

// formato inicial padrão
const initialData = {
  users: [],   // { id, name, email, password, createdAt }
  pets: [],    // { id, userId, name, species, breed, age, notes }
  session: { currentUserId: null }
};

async function getAppData() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('getAppData error', e);
    return initialData;
  }
}

async function saveAppData(data) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('saveAppData error', e);
    return false;
  }
}

// Users
async function registerUser({ name, email, password }) {
  const data = await getAppData();
  // valida se email já existe
  const exists = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error('Email já cadastrado.');
  }
  const id = Date.now().toString();
  const newUser = { id, name, email, password, createdAt: new Date().toISOString() };
  data.users.push(newUser);
  // criar sessão automática
  data.session.currentUserId = id;
  await saveAppData(data);
  return newUser;
}

async function loginUser({ email, password }) {
  const data = await getAppData();
  const user = data.users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) {
    throw new Error('Usuário ou senha inválidos.');
  }
  data.session.currentUserId = user.id;
  await saveAppData(data);
  return user;
}

async function logout() {
  const data = await getAppData();
  data.session.currentUserId = null;
  await saveAppData(data);
  return true;
}

async function getCurrentUser() {
  const data = await getAppData();
  if (!data.session || !data.session.currentUserId) return null;
  const user = data.users.find(u => u.id === data.session.currentUserId) || null;
  return user;
}

// exporta
export {
  getAppData,
  saveAppData,
  registerUser,
  loginUser,
  logout,
  getCurrentUser
};
