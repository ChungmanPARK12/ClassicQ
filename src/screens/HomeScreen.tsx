// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import styles from './HomeScreen.style';
import { trackList } from '../data/tracks';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handlePlayRandom = () => {
    const randomIndex = Math.floor(Math.random() * trackList.length);
    const selectedTrack = trackList[randomIndex];

    navigation.navigate('NowPlaying', {
      title: selectedTrack.title,
      composer: selectedTrack.composer,
    });
  };

  const handleOpenList = () => {
    navigation.navigate('List');
  };

  const handleOpenFavourite = () => {
    navigation.navigate('Favourite');
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Home UI should render immediately.
          App-level splash (App.tsx) handles global loading. */}
      <View style={styles.header}>
        <Text style={styles.title}>🎼 ClassicQ</Text>
      </View>

      <View style={styles.body}>
        <TouchableOpacity style={styles.button} onPress={handlePlayRandom}>
          <Text style={styles.buttonText}>Play Random Music</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleOpenList}>
          <Text style={styles.buttonText}>        Music List        </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleOpenFavourite}>
          <Text style={styles.buttonText}>         Favourite         </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
