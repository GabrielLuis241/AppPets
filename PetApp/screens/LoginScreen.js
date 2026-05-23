import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleUserLogin() {
    try {
      const usersRaw = await AsyncStorage.getItem('@users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      const found = users.find(
        (u) => u.email === email && u.senha === senha
      );

      if (!found) {
        setErro('Usuário ou senha inválidos!');
        return;
      }

      await AsyncStorage.setItem('@currentUser', JSON.stringify(found));
      navigation.replace('Home');
    } catch (e) {
      console.log('Erro ao logar usuário:', e);
    }
  }

  async function handleVetLogin() {
    try {
      const vetsRaw = await AsyncStorage.getItem('@vets');
      const vets = vetsRaw ? JSON.parse(vetsRaw) : [];

      const found = vets.find(
        (v) => v.email === email && v.senha === senha
      );

      if (!found) {
        setErro('Veterinário ou senha inválidos!');
        return;
      }

      await AsyncStorage.setItem('@currentUser', JSON.stringify(found));
      navigation.replace('Vets');
    } catch (e) {
      console.log('Erro ao logar veterinário:', e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Login</Text>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* 🔹 LOGIN USUÁRIO */}
      <TouchableOpacity style={styles.button} onPress={handleUserLogin}>
        <Text style={styles.buttonText}>Entrar como Tutor</Text>
      </TouchableOpacity>

      {/* 🔹 LOGIN VETERINÁRIO */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#6f42c1' }]}
        onPress={handleVetLogin}
      >
        <Text style={styles.buttonText}>Entrar como Veterinário</Text>
      </TouchableOpacity>

      {/* 🔹 CADASTRO USUÁRIO */}
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.linkText}>Criar conta de Tutor →</Text>
      </TouchableOpacity>

      {/* 🔹 CADASTRO VETERINÁRIO */}
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('AddVet')}
      >
        <Text style={[styles.linkText, { color: '#6f42c1' }]}>
          Cadastrar Clínica / Veterinário →
        </Text>
      </TouchableOpacity>
    </View>
  );
}
