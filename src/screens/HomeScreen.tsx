import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import styles from './HomeScreen.style';
import { trackList } from '../data/tracks';
import { LinearGradient } from 'expo-linear-gradient';

// Define a type-safe navigation prop for the HomeScreen
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [bgLoaded, setBgLoaded] = useState(false);

   /*
    Navigates to the NowPlaying screen with a randomly selected track.
    This simulates a shuffle/play-random feature.
   */
  const handlePlayRandom = () => {
    const randomIndex = Math.floor(Math.random() * trackList.length);
    const selectedTrack = trackList[randomIndex];

    navigation.navigate('NowPlaying', {
      title: selectedTrack.title,
      composer: selectedTrack.composer,
    });
  };

  // Navigates to the full music list screen. 
  const handleOpenList = () => {
    navigation.navigate('List');
  };

  // Navigates to the Favourite screen to show saved tracks.
  const handleOpenFavourite = () => {
    navigation.navigate('Favourite');
  };

  return (
    <>
      {/* Splash-style loading screen while the background image is being fetched */}
      {!bgLoaded && (
        <LinearGradient
          colors={['#5c3c2d', '#7e514f', '#a1887f']}
          style={styles.loader}
        >
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      )}

      {/* Main UI, background image */}
      <ImageBackground
        source={require('../../assets/background.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
        onLoadEnd={() => setBgLoaded(true)}
      >
        {bgLoaded && (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>🎼 ClassiQ</Text>
            </View>

            <View style={styles.body}>
              <TouchableOpacity style={styles.button} onPress={handlePlayRandom}>
                <Text style={styles.buttonText}>Play Random Music</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleOpenList}>
                <Text style={styles.buttonText}>Music List</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleOpenFavourite}>
                <Text style={styles.buttonText}>Favourite</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ImageBackground>
    </>
  );
}
