// src/screens/PlayingScreen.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import styles from './PlayingScreen.style';
import { trackList } from '../data/tracks'; // ✅ use shared track list
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';


type PlayingScreenRouteProp = RouteProp<RootStackParamList, 'NowPlaying'>;

type Props = {
  route: PlayingScreenRouteProp;
};

export default function PlayingScreen({ route }: Props) {
  const initialTrack = { title: route.params.title, composer: route.params.composer };
  const [currentTrack, setCurrentTrack] = useState(initialTrack);
  const [previousTrack, setPreviousTrack] = useState<typeof currentTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Playint music label, title and composer
  const spinAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const spinLoop = useRef<Animated.CompositeAnimation | null>(null);
  const blinkLoop = useRef<Animated.CompositeAnimation | null>(null);

  //Sound control
  const [volume, setVolume] = useState(1.0);
  const soundRef = useRef<Audio.Sound | null>(null);

  const increaseVolume = async () => {
    const newVolume = Math.min(volume + 0.1, 1.0); // max 1.0
    setVolume(newVolume);
    await soundRef.current?.setStatusAsync({ volume: newVolume });
  };

  const decreaseVolume = async () => {
    const newVolume = Math.max(volume - 0.1, 0.0); // min 0.0
    setVolume(newVolume);
    await soundRef.current?.setStatusAsync({ volume: newVolume });
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const startAnimation = () => {
    spinAnim.setValue(0);
    spinLoop.current = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinLoop.current.start();

    blinkLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blinkLoop.current.start();
  };

  const stopAnimation = () => {
    spinLoop.current?.stop();
    blinkLoop.current?.stop();
    spinAnim.setValue(0);
  };

  const handleTogglePlay = () => {
    if (!isPlaying) {
      startAnimation();
    } else {
      stopAnimation();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePlayNext = () => {
    const otherTracks = trackList.filter(t => t.title !== currentTrack.title);
    const random = otherTracks[Math.floor(Math.random() * otherTracks.length)];

    setPreviousTrack(currentTrack);
    setCurrentTrack(random);
    stopAnimation();
    setIsPlaying(false);
  };

  const handlePlayPrevious = () => {
    if (previousTrack) {
      setCurrentTrack(previousTrack);
      stopAnimation();
      setIsPlaying(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background1.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Animated.Image
        source={require('../../assets/vinyl-record.png')}
        style={[
          styles.record,
          isPlaying ? { transform: [{ rotate: spin }] } : {},
        ]}
      />

      <View style={styles.playerBox}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Now Playing:</Text>
          <Text style={styles.track}>{currentTrack.title}</Text>
          <Text style={styles.composer}>by {currentTrack.composer}</Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handlePlayPrevious} style={styles.controlButton}>
          <Ionicons name="play-skip-back" size={36} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleTogglePlay}
          style={[styles.controlButton, { transform: [{ translateY: 0 }, { translateX: 3 }] }]}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={44} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayNext} style={styles.controlButton}>
          <Ionicons name="play-skip-forward" size={36} color="white" />
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
      }}>

        {/* 🔉 Volume Down Button */}
        <TouchableOpacity
          onPress={decreaseVolume}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="volume-low" size={28} color="white" />
        </TouchableOpacity>

        {/* 🎚️ Volume Slider */}
        <Slider
          style={{ width: 200 }}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={async (val) => {
            setVolume(val);
            await soundRef.current?.setStatusAsync({ volume: val });
          }}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="#888"
          thumbTintColor="#fff"
        />

        {/* 🔊 Volume Up Button */}
        <TouchableOpacity
          onPress={increaseVolume}
          style={{ marginLeft: 16 }}
        >
          <Ionicons name="volume-high" size={28} color="white" />
        </TouchableOpacity>

      </View>


    </ImageBackground>
  );
}
