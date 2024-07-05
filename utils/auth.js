// utils/auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token from AsyncStorage:', error);
    return null;
  }
};
