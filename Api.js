import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://fiap-6a182-default-rtdb.firebaseio.com',
});

export const login = async (email, password) => {
  // Implement your login API call using email and password
  // Example (replace with your actual API request):
  const response = await apiClient.post('/users/login', { email, password });
  const userData = response.data;
  await AsyncStorage.setItem('userData', JSON.stringify(userData)); // Store user data
  return userData;
};

export const getProfileData = async () => {
  const userData = await AsyncStorage.getItem('userData');
  return JSON.parse(userData);
};

// Add other API functions (forgot password, register, logout)