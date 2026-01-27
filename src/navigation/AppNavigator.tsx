// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PlayingScreen from '../screens/PlayingScreen';
import ListScreen from '../screens/ListScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import { RootStackParamList } from './types';

import { NavT as T } from '../ui/tokens/appnavigatorToken';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: T.headerTitleFontSize,
        },
      }}>
        
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="NowPlaying"
        component={PlayingScreen}
        options={{
          title: 'Random Play',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{
          title: '100 Music List',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          title: 'Favourite List',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
}
