import React, { useState, useRef, useCallback } from 'react';
import { Animated, Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext'; 
import { useFocusEffect } from '@react-navigation/native';

const moonIcon = require('../assets/moon.png');
const sunIcon = require('../assets/sun.png');

const Inicial = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const [buttonPressed, setButtonPressed] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const resetButton = () => {
    animation.setValue(0);
    setButtonPressed(false);
  };

  useFocusEffect(
    useCallback(() => {
      resetButton();
      return () => {};
    }, [])
  );

  const handlePress = () => {
    setButtonPressed(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start(() => {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 50); 
    });
  };

  const buttonWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 120] 
  });

  const buttonHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 120]
  });

  const buttonColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme === 'dark' ? '#555' : '#ddd', 'green'] 
  });

  const borderRadius = buttonHeight.interpolate({
    inputRange: [0, 120],
    outputRange: [20, 60] 
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0] 
  });

  const checkMarkSize = buttonHeight.interpolate({
    inputRange: [40, 120],
    outputRange: [0, 40] 
  });

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleIcon}>
        <Image source={theme === 'dark' ? sunIcon : moonIcon} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
      <Image source={require('../assets/expi.png')} style={styles.image} />
      <Text style={[styles.text, { color: theme === 'dark' ? '#fff' : '#000' }]}>
        Olá, Sou o Expi posso ajudar na eficiência da sua IA?
      </Text>
      <Animated.View style={[styles.button, { width: buttonWidth, height: buttonHeight, borderRadius, backgroundColor: buttonColor }]}>
        <TouchableOpacity onPress={handlePress} style={styles.buttonInner}>
          <Animated.Text style={[styles.buttonText, { opacity }]}>
            {'Começar'}
          </Animated.Text>
          {buttonPressed && (
            <Animated.Text style={{ fontSize: checkMarkSize, color: 'white', position: 'absolute' }}>
              ✔
            </Animated.Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  themeToggleIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Ensuring text is white for visibility
    fontSize: 16,
  },
});

export default Inicial;
