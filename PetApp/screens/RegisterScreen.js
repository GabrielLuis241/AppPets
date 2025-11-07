// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import styles from '../styles/globalStyles';
import { registerUser } from '../utils/storage';

export default function RegisterScreen(props) {
  const { navigation } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Erro', 'Preencha nome, email e senha.');
      return;
    }
    try {
      const user = await registerUser({ name: name.trim(), email: email.trim(), password });
      // sucesso — navega para Home
      Alert.alert('Sucesso', `Bem-vindo, ${user.name}!`);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      });
    } catch (e) {
      Alert.alert('Erro', e.message || 'Erro ao cadastrar.');
    }
  }

  return React.createElement(
    ScrollView,
    { style: styles.container, contentContainerStyle: { padding: 16 } },
    React.createElement(Text, { style: styles.headerTitle }, 'Criar Conta'),
    React.createElement(Text, { style: styles.detailsText }, 'Nome'),
    React.createElement(TextInput, {
      style: styles.input,
      value: name,
      onChangeText: setName,
      placeholder: 'Seu nome'
    }),
    React.createElement(Text, { style: styles.detailsText }, 'Email'),
    React.createElement(TextInput, {
      style: styles.input,
      value: email,
      onChangeText: setEmail,
      placeholder: 'seu@email.com',
      keyboardType: 'email-address',
      autoCapitalize: 'none'
    }),
    React.createElement(Text, { style: styles.detailsText }, 'Senha'),
    React.createElement(TextInput, {
      style: styles.input,
      value: password,
      onChangeText: setPassword,
      placeholder: 'Senha',
      secureTextEntry: true
    }),
    React.createElement(View, { style: { marginTop: 12 } },
      React.createElement(Button, { title: 'Cadastrar', onPress: handleRegister })
    ),
    React.createElement(View, { style: { marginTop: 12 } },
      React.createElement(Button, {
        title: 'Já tenho conta (Entrar)',
        onPress: () => navigation.navigate('Login')
      })
    )
  );
}
