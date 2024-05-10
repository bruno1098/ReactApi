import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('https://fiap-6a182-default-rtdb.firebaseio.com/users.json', { // Endpoint correto para adicionar usuários
        method: 'POST', // Usar POST para adicionar sem substituir
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) { // Checando se a resposta é bem-sucedida
        Alert.alert("Cadastro Realizado", "Você foi cadastrado com sucesso!");
        navigation.replace('Login'); // Redirecionar para login após cadastro
      } else {
        const errorData = await response.json();
        Alert.alert("Cadastro Falhou", errorData.error || "Não foi possível cadastrar.");
      }
    } catch (error) {
      Alert.alert("Erro de Conexão", "Não foi possível conectar à API.");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <Button
        title="Registrar"
        onPress={handleRegister}
      />
    </View>
  );
};

export default RegisterScreen;
