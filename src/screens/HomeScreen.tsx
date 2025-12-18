// src/screens/HomeScreen.tsx
import React from 'react';
import styles from './HomeScreen.style';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ImageBackground 
} from 'react-native';

// Hook for navigation between screens.
import { useNavigation } from '@react-navigation/native';

// Type definition for stack navigation method. 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Function route and parameter for stack, App.tsx -> AppNavigator(types.ts)
import { RootStackParamList } from '../navigation/types';
import { trackList } from '../data/tracks';

// Type-safe navigation prop for the Home screen.
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  // Select a random track here and then navigate to the Now Playing screen.
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
