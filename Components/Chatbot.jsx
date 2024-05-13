import React, { useState, useRef, useEffect } from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { extendTheme, Image, NativeBaseProvider, Box, Text, Input, Button, IconButton, Icon, VStack, HStack, Avatar, Spinner } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const moonIcon = require('../assets/moon.png');
const sunIcon = require('../assets/sun.png');

const Stack = createNativeStackNavigator();




const getTheme = (mode) => extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: mode,
  },
  colors: {
    primary: {
      500: "#5061fc",
      700: "#3346f0",
    },
    emerald: {
      500: "#34d399",
    },
    blueGray: {
      900: "#1e293b",
      700: "#334155",
      50: "#f8fafc",
    }
  }
});

const Chatbot = ({navigation, route}) => {
  const [themeMode, setThemeMode] = useState('dark');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const userEmail = route.params?.email;

  const client = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
      Authorization: `Bearer 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`,
      'Content-Type': 'application/json',
    },
  });
//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
  useEffect(() => {
    messageEndRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const handleTypeEffect = (response) => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < response.length) {
        setMessages(currentMessages => {
          const newMessages = [...currentMessages];
          const lastMessage = newMessages.pop();
          lastMessage.content = response.substring(0, index + 1);
          newMessages.push(lastMessage);
          return newMessages;
        });
        index++;
      } else {
        clearInterval(intervalId);
        setLoading(false);
      }
    }, 1);
  };

  const handleSubmit = async () => {
    const promptText = inputText.trim();
    if (promptText) {
      setLoading(true);
      const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptText }],
      };

      try {
        const result = await client.post("/chat/completions", data);
        const response = result.data.choices[0].message.content;
        setMessages(messages => [...messages, { role: "user", content: promptText }, { role: "ai", content: "" }]);
        setInputText("");
        setTimeout(() => handleTypeEffect(response), 1000);
      } catch (error) {
        console.error(error.response ? error.response.data : error);
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.nativeEvent.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <NativeBaseProvider theme={getTheme(themeMode)}>
      <Box flex={1} bg={themeMode === 'dark' ? "blueGray.900" : "blueGray.50"} p="4">
        <HStack justifyContent="flex-end" mb={4}>
           <IconButton
            icon={<Image source={themeMode === 'dark' ? sunIcon : moonIcon} style={{ width: 24, height: 24 }} alt="Theme Toggle" />}
            onPress={toggleTheme}
            key={themeMode}
          />
        <IconButton
                icon={<Icon as={MaterialIcons} name="account-circle" size="xl" />}
                onPress={() => navigation.navigate('Perfil', { email: userEmail })}
                _icon={{
                    color: themeMode === 'dark' ? 'blueGray.50' : 'blueGray.900',  // Altere esta linha
                    size: "lg"
                }}
            />

          
        </HStack>
        <ScrollView
          ref={messageEndRef}
          flex={1}
          contentContainerStyle={{ flexGrow: 1 }}
          _contentContainerStyle={{
            px: "3",
            mb: "4",
          }}
        >
          <VStack space={7}>
            {messages.map((message, index) => (
              <HStack key={index} space={4} justifyContent={message.role === "user" ? "flex-end" : "flex-start"}>
                <Avatar size="40px" source={{ uri: message.role === "user" ? "https://cdn-icons-png.flaticon.com/128/7915/7915522.png" : "https://bruno1098.github.io/ApiGpt/src/logo.png" }} />
                <Box
                  bg={message.role === "user" ? "primary.500" : "emerald.500"}
                  p="4"
                  rounded="lg"
                  shadow={5}
                  style={{
                    maxWidth: '83%',
                    alignSelf: message.role === "user" ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Text
                    color="warmGray.50"
                    style={{
                      flexShrink: 1,
                      padding: 5,
                      textAlign: 'left',
                    }}
                  >
                    {message.content}
                  </Text>
                </Box>
              </HStack>
            ))}
            {loading && (
              <HStack justifyContent="center">
                <Spinner color={themeMode === 'dark' ? "blueGray.50" : "blueGray.900"} size={"lg"} />
              </HStack>
            )}
          </VStack>
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <HStack space={2} alignItems="center">
            <Input
              flex={1}
              InputLeftElement={<Icon as={<MaterialIcons name="message" />} size={5} ml="2" color="muted.400" />}
              placeholder="Digite sua mensagem..."
              bg={themeMode === 'dark' ? "blueGray.700" : "#dfdcdf"}
              borderWidth={0}
              onChangeText={setInputText}
              color={themeMode === 'dark' ? "white" : "blueGray.700a"}
              fontSize={15}
              value={inputText}
              placeholderTextColor="muted.400"
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              onKeyDown={handleKeyDown}
            />
            <Button onPress={handleSubmit} startIcon={<Icon as={MaterialIcons} name="send" size="sm" />} />
          </HStack>
        </KeyboardAvoidingView>
      </Box>
    </NativeBaseProvider>
  );
};

export default Chatbot;
