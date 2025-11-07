import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/globalStyles';

export default function RegisterScreen(props) {
  const { navigation } = props;

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

      const newUser = {
        id: Date.now().toString(),
        nome,
        email,
        senha,
        createdAt: new Date().toISOString()
      };

      const updatedList = [...list, newUser];

      await AsyncStorage.setItem('@users', JSON.stringify(updatedList));
      navigation.replace('Login');

    } catch (e) {
      console.log('Erro ao cadastrar:', e);
    }
  };

  return React.createElement(
    View,
    { style: styles.container },

    React.createElement(Text, { style: styles.headerTitle }, 'Criar Conta'),

    erro
      ? React.createElement(Text, { style: styles.errorText }, erro)
      : null,

    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'Nome',
      value: nome,
      onChangeText: setNome
    }),

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
      { style: styles.button, onPress: handleRegister },
      React.createElement(Text, { style: styles.buttonText }, 'Cadastrar')
    )
  );
}
