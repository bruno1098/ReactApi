import React, { useState } from 'react';
import { NativeBaseProvider, Box, VStack, Input, Button, IconButton, Image, Center, Text, useToast } from 'native-base';
import { useTheme } from './ThemeContext';
import { MaterialIcons } from '@expo/vector-icons'; // Usando Material Icons


const moonIcon = require('../assets/moon.png');
const sunIcon = require('../assets/sun.png');
const avatarIcon = require('../assets/avatar.png');

const ScreenLogin = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('default');
    const toast = useToast();

    const handleLogin = async () => {
        setLoginStatus('default');
        try {
            const response = await fetch(`https://experienceia-default-rtdb.firebaseio.com/Usuarios.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Falha ao buscar usuários');

            const users = await response.json();
            let isAuthenticated = false;
            for (let key in users) {
                if (users[key].email === email && users[key].password === password) {
                    isAuthenticated = true;
                    break;
                }
            }

            if (isAuthenticated) {
                setLoginStatus('success');
                toast.show({ description: "Login successful!" });
                setTimeout(() => {
                    setLoginStatus('default');
                    navigation.replace('Chatbot', { email: email });
                }, 2000);
            } else {
                setLoginStatus('error');
                toast.show({ description: "Email ou senha incorretos!" });
                setTimeout(() => {
                    setLoginStatus('default');
                }, 2000);
            }
        } catch (error) {
            console.error("Erro ao tentar login:", error);
            setLoginStatus('error');
            toast.show({ description: 'Erro de Conexão: ' + error.message });
            setTimeout(() => {
                setLoginStatus('default');
            }, 2000);
        }
    };

    return (
        <NativeBaseProvider>
            <Box flex={1} bg={theme === 'dark' ? '#333' : '#fff'} p="5" alignItems="center" justifyContent="center">
                <IconButton
                    icon={<Image source={theme === 'dark' ? sunIcon : moonIcon} alt="Theme Toggle Icon" style={{ width: 24, height: 24 }} />}
                    onPress={toggleTheme}
                    key={theme}
                    position="absolute"
                    top="4"
                    right="3"
                    zIndex="1"
                />
                <IconButton
                    icon={<MaterialIcons name="arrow-back" size={24} color={theme === 'dark' ? 'white' : 'black'} />}
                    onPress={() => navigation.goBack()}
                    position="absolute"
                    top="4"
                    left="3"
                    zIndex="1"
                />
                <Box w="80%" maxW="300px" bg={theme === 'dark' ? 'blueGray.700' : 'gray.400'}
                    p="4" borderRadius="lg" shadow="3">
                    <Center mb="4">
                        <Image source={avatarIcon} alt="User Icon" size="xl" style={{ width: 56, height: 56, marginBottom: 16 }} />
                    </Center>
                    <VStack space={4}>
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
                            placeholder="Password"
                            type="password"
                            onChangeText={setPassword}
                            variant="filled"
                            bg={theme === 'dark' ? 'blueGray.600' : 'coolGray.100'}
                            borderColor="transparent"
                            placeholderTextColor={theme === 'dark' ? 'blueGray.300' : 'coolGray.500'}
                            _focus={{ borderColor: 'transparent' }}
                            color={theme === 'dark' ? 'white' : 'black'}
                        />
                        <Button onPress={handleLogin}
                            bg={loginStatus === 'success' ? 'green.500' : loginStatus === 'error' ? 'red.500' : 'black'}
                            _pressed={{
                                bg: loginStatus === 'success' ? 'green.600' : loginStatus === 'error' ? 'red.600' : "coolGray.900"
                            }}>
                            {loginStatus === 'success' ? '✔' : loginStatus === 'error' ? '✘' : 'Log In'}
                        </Button>
                        <Text
                            fontSize="sm"
                            mt="2"
                            color="coolGray.600"
                            onPress={() => navigation.navigate('EsqueciSenha')}>
                            Esqueci minha senha
                        </Text>
                        <Button variant="ghost" onPress={() => navigation.navigate('Register')}>Sign Up</Button>
                    </VStack>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

export default ScreenLogin;
