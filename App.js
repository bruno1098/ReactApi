import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenChatbot from './Components/ScreenChatbot';
import ScreenLogin from './Components/ScreenLogin';
import ScreenInicial from './Components/ScreenInicial';
import ScreenRegistro from './Components/ScreenRegistro';
import ScreenPerfil from './Components/ScreenPerfil';
import ScreenEsqueciSenha from './Components/ScreenEsqueciSenha';
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
          <Stack.Screen name="Inicial" component={ScreenInicial}/>
          <Stack.Screen name="Login" component={ScreenLogin} />
          <Stack.Screen name="Register" component={ScreenRegistro} />
          <Stack.Screen name="Chatbot" component={ScreenChatbot} />
          <Stack.Screen name="Perfil" component={ScreenPerfil} />
          <Stack.Screen name="EsqueciSenha" component={ScreenEsqueciSenha} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </ThemeProvider>
  );
};

export default App;
