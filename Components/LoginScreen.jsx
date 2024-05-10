import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://fiap-6a182-default-rtdb.firebaseio.com/users.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const users = await response.json();
      console.log("Users fetched:", users);  // Adicione este log para ver a estrutura dos dados retornados

      let isAuthenticated = false;
      for (let key in users) {
        if (users[key].password === password) {
          isAuthenticated = true;
          break;
        }
      }

      if (isAuthenticated) {
        navigation.replace('Chatbot', { email: email, password: password });
      } else {
        Alert.alert("Login falhou", "Email ou senha incorretos!");
      }
    } catch (error) {
      console.error("Erro ao tentar login:", error);
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
        title="Login"
        onPress={handleLogin}
      />
      <Button
        title="Cadastre-se"
        onPress={() => navigation.navigate('Register')}
        color="orange"
      />
    </View>
  );
};

export default LoginScreen;
