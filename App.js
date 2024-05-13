import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chatbot from './Components/Chatbot';
import LoginScreen from './Components/LoginScreen';
import RegisterScreen from './Components/RegisterScreen';
import Perfil from './Components/Perfil';
import Inicial from './Components/Inicial';
import { ThemeProvider } from './Components/ThemeContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicial"
           screenOptions={{
            headerShown: false}}
        >
          <Stack.Screen name="Inicial" component={Inicial}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Chatbot" component={Chatbot} />
          <Stack.Screen name="Perfil" component={Perfil} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </ThemeProvider>
  );
};

export default App;
