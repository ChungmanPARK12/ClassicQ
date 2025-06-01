// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PlayingScreen from '../screens/PlayingScreen';

import { RootStackParamList } from './types'; // ✅ Import type

const Stack = createNativeStackNavigator<RootStackParamList>(); // ✅ Apply type here

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NowPlaying" component={PlayingScreen} />
      
    </Stack.Navigator>
  );
}
