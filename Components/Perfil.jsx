import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Perfil = ({ navigation, route }) => {
    const email = route.params?.email || 'E-mail não fornecido';
  
    const handleLogoff = () => {
      navigation.replace('Login');
    };
  
    return (
      <View style={styles.container}>
        <Text>Email: {email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogoff}>
          <Text style={styles.buttonText}>Logoff</Text>
        </TouchableOpacity>
      </View>
    );
  };

// Estilos para a tela de perfil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Perfil;
