import React, { useState } from 'react';
import { NativeBaseProvider, extendTheme, Box, VStack, Input, Button, Text } from 'native-base';

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
      let isAuthenticated = false;
      for (let key in users) {
        if (users[key].email === email && users[key].password === password) {
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

  // Configuração do tema, adaptada para corresponder às cores da imagem
  const customTheme = extendTheme({
    colors: {
      primary: {
        700: '#5061fc', // Azul escuro
      },
      coolGray: {
        50: '#F8FAFC', // Cinza claro de fundo
        700: '#334155', // Cinza escuro para texto
      },
      blueGray: {
        900: '#1e293b', // Quase preto para fundo de input
      },
    },
    components: {
      Input: {
        baseStyle: {},
        defaultProps: {
          size: 'lg', // Tamanho grande
          variant: 'filled', // Input preenchido
          _focus: { borderColor: 'primary.700' },
        },
      },
      Button: {
        defaultProps: {
          colorScheme: 'primary', // Esquema de cores primário
          size: 'lg',
        },
      },
    },
  });

  return (
    <NativeBaseProvider theme={customTheme}>
      <Box flex={1} bg="coolGray.50" alignItems="center" justifyContent="center" p="5">
        <VStack space={5} w="90%" maxW="300px">
          <Text fontSize="lg" color="coolGray.700" bold mb="5">Login</Text>
          <Input
            placeholder="Email ou número de telefone"
            onChangeText={setEmail}
            value={email}
            bg="blueGray.900"
            placeholderTextColor="coolGray.300"
          />
          <Input
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
            type="password"
            bg="blueGray.900"
            placeholderTextColor="coolGray.300"
          />
          <Button onPress={handleLogin} mt="5">Log In</Button>
          <Button variant="ghost" onPress={() => navigation.navigate('Register')}>Sign Up</Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default LoginScreen;
