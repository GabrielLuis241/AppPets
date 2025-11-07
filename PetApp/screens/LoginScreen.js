// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import styles from '../styles/globalStyles';
import { loginUser } from '../utils/storage';

export default function LoginScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert('Erro', 'Informe email e senha.');
      return;
    }
    try {
      const user = await loginUser({ email: email.trim(), password });
      Alert.alert('Bem-vindo', `Olá ${user.name}`);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      });
    } catch (e) {
      Alert.alert('Erro', e.message || 'Falha no login.');
    }
  }

  return React.createElement(
    ScrollView,
    { style: styles.container, contentContainerStyle: { padding: 16 } },
    React.createElement(Text, { style: styles.headerTitle }, 'Entrar'),
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
      React.createElement(Button, { title: 'Entrar', onPress: handleLogin })
    ),
    React.createElement(View, { style: { marginTop: 12 } },
      React.createElement(Button, {
        title: 'Criar conta',
        onPress: () => navigation.navigate('Register')
      })
    )
  );
}
