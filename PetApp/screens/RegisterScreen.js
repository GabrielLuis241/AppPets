import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      setErro('Preencha todos os campos!');
      return;
    }

    try {
      const users = await AsyncStorage.getItem('@users');
      const list = users ? JSON.parse(users) : [];

      const emailExists = list.some((u) => u.email === email);

      if (emailExists) {
        setErro('E-mail já cadastrado!');
        return;
      }

      // ✅ PADRONIZAÇÃO CORRETA
      const newUser = {
        id: Date.now().toString(),
        name: nome.trim(),          // 🔥 AQUI ESTÁ O FIX
        email: email.trim(),
        senha,
        createdAt: new Date().toISOString()
      };

      const updatedList = [...list, newUser];
      await AsyncStorage.setItem('@users', JSON.stringify(updatedList));

      navigation.replace('Login');

    } catch (e) {
      console.log('Erro ao cadastrar:', e);
      setErro('Erro ao criar conta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Criar Conta</Text>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
