import React from 'react';
import { Image, Text, Button, StyleSheet, View } from 'react-native';

const Inicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/expi.png')} style={styles.image} />
      <Text style={styles.text}>Olá, Sou o Expi posso ajudar na eficiência da sua IA?</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Cadastro" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: 150, 
    height: 300, 
    marginBottom: 20
  },
  text: {
    fontSize: 16, 
    textAlign: 'center',
    marginBottom: 20
  }
});

export default Inicial;
