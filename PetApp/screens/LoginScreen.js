import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function LoginScreen(props) {
  const { navigation } = props;

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    try {
      const users = await AsyncStorage.getItem('@users');
      const list = users ? JSON.parse(users) : [];

      const found = list.find(
        (u) => u.email === email && u.senha === senha
      );

      if (!found) {
        setErro('Usuário ou senha inválidos!');
        return;
      }

      await AsyncStorage.setItem('@currentUser', JSON.stringify(found));
      navigation.replace('Home');

    } catch (e) {
      console.log('Erro ao logar:', e);
    }
  };

  return React.createElement(
    View,
    { style: styles.container },

    React.createElement(Text, { style: styles.headerTitle }, 'Login'),

    erro
      ? React.createElement(Text, { style: styles.errorText }, erro)
      : null,

    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'E-mail',
      value: email,
      onChangeText: setEmail
    }),

    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'Senha',
      secureTextEntry: true,
      value: senha,
      onChangeText: setSenha
    }),

    React.createElement(
      TouchableOpacity,
      { style: styles.button, onPress: handleLogin },
      React.createElement(Text, { style: styles.buttonText }, 'Entrar')
    ),

    React.createElement(
      TouchableOpacity,
      {
        style: styles.linkButton,
        onPress: () => navigation.navigate('Register')
      },
      React.createElement(Text, { style: styles.linkText }, 'Criar uma conta →')
    )
  );
}
