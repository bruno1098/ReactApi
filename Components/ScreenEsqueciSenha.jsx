import React, { useState } from 'react';
import { NativeBaseProvider, Box, VStack, Input, Button, Center, Text, IconButton, useToast } from 'native-base';
import { useTheme } from './ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

const ScreenEsqueciSenha = ({ navigation }) => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateStatus, setUpdateStatus] = useState('default');
    const toast = useToast();

    const updatePassword = async () => {
        setUpdateStatus('loading');
        try {
            const response = await fetch(`https://experienceia-default-rtdb.firebaseio.com/Usuarios.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Falha ao buscar usuários');

            const users = await response.json();
            let userKey = null;
            for (let key in users) {
                if (users[key].email === email) {
                    userKey = key;
                    break;
                }
            }

            if (userKey) {
                const updateResponse = await fetch(`https://fiap-6a182-default-rtdb.firebaseio.com/users/${userKey}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password: newPassword })
                });

                if (updateResponse.ok) {
                    setUpdateStatus('success');
                    toast.show({
                        description: "Senha atualizada com sucesso!",
                        status: "success"
                    });
                    setTimeout(() => {
                        navigation.replace('Login');
                    }, 2000);
                } else {
                    throw new Error('Falha ao atualizar a senha');
                }
            } else {
                setUpdateStatus('error');
                toast.show({
                    description: "Email não encontrado.",
                    status: "error"
                });
            }
        } catch (error) {
            console.error("Erro ao tentar redefinir a senha:", error);
            setUpdateStatus('error');
            toast.show({
                description: 'Erro de Conexão: ' + error.message,
                status: "error"
            });
        }
    };

    return (
        <NativeBaseProvider>
            <Box flex={1} bg={theme === 'dark' ? '#333' : '#fff'} p="5" alignItems="center" justifyContent="center">
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
                    <Center>
                        <Text fontSize="xl" p="4" color={theme === 'dark' ? 'white' : 'black'}>
                            Redefinição de Senha
                        </Text>
                    </Center>
                    <VStack space={4}>
                        <Input
                            placeholder="Digite seu email"
                            onChangeText={setEmail}
                            variant="filled"
                            bg={theme === 'dark' ? 'blueGray.600' : 'coolGray.100'}
                            borderColor="transparent"
                            placeholderTextColor={theme === 'dark' ? 'blueGray.300' : 'coolGray.500'}
                            _focus={{ borderColor: 'transparent' }}
                            color={theme === 'dark' ? 'white' : 'black'}
                        />
                        <Input
                            placeholder="Digite sua nova senha"
                            type="password"
                            onChangeText={setNewPassword}
                            variant="filled"
                            bg={theme === 'dark' ? 'blueGray.600' : 'coolGray.100'}
                            borderColor="transparent"
                            placeholderTextColor={theme === 'dark' ? 'blueGray.300' : 'coolGray.500'}
                            _focus={{ borderColor: 'transparent' }}
                            color={theme === 'dark' ? 'white' : 'black'}
                        />
                        <Button onPress={updatePassword}
                                bg={updateStatus === 'success' ? 'green.500' : updateStatus === 'error' ? 'red.500' : 'blue.500'}
                                _pressed={{
                                    bg: updateStatus === 'success' ? 'green.600' : updateStatus === 'error' ? 'red.600' : "blue.600"
                                }}>
                            {updateStatus === 'loading' ? 'Atualizando...' : 'Atualizar Senha'}
                        </Button>
                    </VStack>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

export default ScreenEsqueciSenha;
