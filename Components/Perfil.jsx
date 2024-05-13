import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, VStack, Text, Input, Image, IconButton, Icon, Button, useToast } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';


const moonIcon = require('../assets/moon.png');
const sunIcon = require('../assets/sun.png');
const avatarIcon = require('../assets/avatar.png');


const Perfil = ({ navigation, route }) => {
    const { theme, toggleTheme } = useTheme();
    const userEmail = route.params?.email;
    const [userData, setUserData] = useState(null);
    const [visibleDocument, setVisibleDocument] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://fiap-6a182-default-rtdb.firebaseio.com/users.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error('Falha ao buscar usuários');

                const users = await response.json();
                console.log("Users fetched: ", users);

                // Procurar pelo usuário baseado no email diretamente no objeto, sem buscar por chaves
                for (let key in users) {
                    if (users[key].email === userEmail) {
                        console.log("User data set: ", users[key]); // Log para verificar os dados encontrados
                        setUserData(users[key]);
                        break;
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
                toast.show({
                    description: 'Erro de Conexão: ' + error.message,
                    status: "error"
                });
            }
        };

        fetchData();
    }, [userEmail]);

    const handleLogoff = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Inicial' }],
        });
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
                <VStack space={4} alignItems="center">
                    <Text fontSize="xl" bold color={theme === 'dark' ? 'white' : 'black'}>
                        Perfil do Usuário
                    </Text>
                    <Text fontSize="md" color={theme === 'dark' ? 'light.300' : 'dark.600'}>
                        Email: {userData ? userData.email : 'Carregando...'}
                    </Text>
                    <Text fontSize="md" color={theme === 'dark' ? 'light.300' : 'dark.600'}>
                        Nome da Empresa: {userData ? userData.companyName : 'Carregando...'}
                    </Text>
                    <Text fontSize="md" color={theme === 'dark' ? 'light.300' : 'dark.600'}>
                        CNPJ/CPF: {visibleDocument ? (userData ? userData.cnpjOrCpf : 'Carregando...') : '**********'}
                    </Text>
                    <IconButton
                        icon={<Icon as={MaterialIcons} name={visibleDocument ? 'visibility' : 'visibility-off'} />}
                        onPress={() => setVisibleDocument(!visibleDocument)}
                    />
                    <Text
                            fontSize="sm"
                            mt="2"
                            color="coolGray.600"
                            onPress={() => navigation.navigate('EsqueciSenha')}>
                            Alterar Senha
                        </Text>
                    <Button mt="5" colorScheme="red" onPress={handleLogoff}>
                        Logoff
                    </Button>
                </VStack>
            </Box>
        </ NativeBaseProvider>
    );
};

export default Perfil;