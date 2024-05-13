import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';  // Garanta que o caminho para ThemeContext esteja correto

const moonIcon = require('../assets/moon.png');
const sunIcon = require('../assets/sun.png');

const Perfil = ({ navigation, route }) => {
    const { theme, toggleTheme } = useTheme();
    const email = route.params?.email || 'E-mail não fornecido';

    const handleLogoff = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Inicial' }],
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleIcon}>
                <Image source={theme === 'dark' ? sunIcon : moonIcon} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Email: {email}</Text>
            
            <TouchableOpacity style={[styles.button, { backgroundColor: theme === 'dark' ? '#666' : '#007bff' }]} onPress={handleLogoff}>
                <Text style={styles.buttonText}>Logoff</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    themeToggleIcon: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
});

export default Perfil;
