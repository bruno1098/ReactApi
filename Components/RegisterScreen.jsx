import React, { useState } from 'react';
import {  NativeBaseProvider, Box, VStack, Input, Button, Image, Center, Select, CheckIcon, useToast } from 'native-base';
import { useTheme } from './ThemeContext';

const RegisterScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [cnpjOrCpf, setCnpjOrCpf] = useState('');
  const [documentType, setDocumentType] = useState('CPF');
  const [registerStatus, setRegisterStatus] = useState('default');
  const toast = useToast();

  const validateEmail = (email) => {
    return email.match(/\S+@\S+\.\S+/);
  };

  const isEmpty = (value) => {
    return value.trim() === '';
  };

  const formatDocument = (doc) => {
    const cleaned = doc.replace(/\D/g, ''); // Remove non-numeric characters
    if (documentType === 'CPF') {
      if (cleaned.length > 11) return cnpjOrCpf; // Prevent further input if length is exceeded
      return cleaned
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else { // CNPJ case
      if (cleaned.length > 14) return cnpjOrCpf; // Prevent further input if length is exceeded
      return cleaned
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
  };

  const handleDocumentChange = (doc) => {
    setCnpjOrCpf(formatDocument(doc));
  };

  const handleRegister = async () => {
    if (isEmpty(companyName) || isEmpty(email) || isEmpty(password) || isEmpty(cnpjOrCpf)) {
      setRegisterStatus('error');
      toast.show({ description: "Todos os campos devem ser preenchidos!" });
      setTimeout(() => setRegisterStatus('default'), 2000);
      return;
    }

    if (!validateEmail(email)) {
      setRegisterStatus('error');
      toast.show({ description: "Email inválido!" });
      setTimeout(() => setRegisterStatus('default'), 2000);
      return;
    }

    try {
      const response = await fetch('https://fiap-6a182-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, cnpjOrCpf, email, password }),
      });

      if (!response.ok) throw new Error('Falha no cadastro.');

      setRegisterStatus('success');
      toast.show({ description: "Cadastro realizado com sucesso!" });
      setTimeout(() => {
        setRegisterStatus('default');
        navigation.replace('Login');
      }, 2000);
    } catch (error) {
      console.error("Erro ao tentar registrar:", error);
      setRegisterStatus('error');
      toast.show({ description: "Erro de conexão: " + error.message });
      setTimeout(() => setRegisterStatus('default'), 2000);
    }
  };
  return (
    <NativeBaseProvider>
      <Box flex={1} bg={theme === 'dark' ? '#333' : '#fff'} p="5" alignItems="center" justifyContent="center">
        <Box w="80%" maxW="300px" bg={theme === 'dark' ? 'blueGray.700' : 'gray.400'}
             p="4" borderRadius="lg" shadow="3">
          <Center mb="4">
            <Image source={require('../assets/avatar.png')} alt="User Icon" size="xl" style={{ width: 56, height: 56, marginBottom: 16 }} />
          </Center>
          <VStack space={4}>
            <Input
              placeholder="Nome da Empresa"
              onChangeText={setCompanyName}
              variant="filled"
              bg={theme === 'dark' ? 'blueGray.600' : 'coolGray.100'}
              borderColor="transparent"
              placeholderTextColor={theme === 'dark' ? 'blueGray.300' : 'coolGray.500'}
              _focus={{ borderColor: 'transparent' }}
              color={theme === 'dark' ? 'white' : 'black'}
            />
            <Select
              selectedValue={documentType}
              minWidth="200"
              accessibilityLabel="Escolha CPF ou CNPJ"
              placeholder="Escolha CPF ou CNPJ"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setDocumentType(itemValue)}
            >
              <Select.Item label="CPF" value="CPF" />
              <Select.Item label="CNPJ" value="CNPJ" />
            </Select>
            <Input
              placeholder={documentType === 'CPF' ? "CPF (xxx.xxx.xxx-xx)" : "CNPJ (xx.xxx.xxx/xxxx-xx)"}
              value={cnpjOrCpf}
              onChangeText={handleDocumentChange}
              variant="filled"
              bg={theme === 'dark' ? 'blueGray.600' : 'coolGray.100'}
              borderColor="transparent"
              placeholderTextColor={theme === 'dark' ? 'blueGray.300' : 'coolGray.500'}
              _focus={{ borderColor: 'transparent' }}
              color={theme === 'dark' ? 'white' : 'black'}
            />
            <Input
              placeholder="Email"
              onChangeText={setEmail}
              variant="filled"
              bg={theme === 'dark' ? 'blueGray.600' : 'coolGray.100'}
              borderColor="transparent"
              placeholderTextColor={theme === 'dark' ? 'blueGray.300' : 'coolGray.500'}
              _focus={{ borderColor: 'transparent' }}
              color={theme === 'dark' ? 'white' : 'black'}
            />
            <Input
              placeholder="Senha"
              type="password"
              onChangeText={setPassword}
              variant="filled"
              bg={theme === 'dark' ? 'blueGray.600' : 'coolGray.100'}
              borderColor="transparent"
              placeholderTextColor={theme === 'dark' ? 'blueGray.300' : 'coolGray.500'}
              _focus={{ borderColor: 'transparent' }}
              color={theme === 'dark' ? 'white' : 'black'}
            />
            <Button onPress={handleRegister} bg={registerStatus === 'success' ? 'green.500' : registerStatus === 'error' ? 'red' : 'black'}
                    _pressed={{ bg: registerStatus === 'success' ? 'green.500' : registerStatus === 'error' ? 'rose.500' : "gray.700" }}>
              {registerStatus === 'success' ? '✔' : registerStatus === 'error' ? '✘' : 'Registrar'}
            </Button>
          </VStack>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default RegisterScreen;
