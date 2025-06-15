import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import styles from './PlayingScreen.style';
import { trackList } from '../data/tracks';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';


type PlayingScreenRouteProp = RouteProp<RootStackParamList, 'NowPlaying'>;

type Props = {
  route: PlayingScreenRouteProp;
};

export default function PlayingScreen({ route }: Props) {
  const initialTrack = { title: route.params.title, composer: route.params.composer };
  const [currentTrack, setCurrentTrack] = useState(initialTrack);
  const [previousTrack, setPreviousTrack] = useState<typeof currentTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [recordLoaded, setRecordLoaded] = useState(false);

  const spinAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const spinLoop = useRef<Animated.CompositeAnimation | null>(null);
  const blinkLoop = useRef<Animated.CompositeAnimation | null>(null);

  const [volume, setVolume] = useState(1.0);
  const soundRef = useRef<Audio.Sound | null>(null);

  const increaseVolume = async () => {
    const newVolume = Math.min(volume + 0.1, 1.0);
    setVolume(newVolume);
    await soundRef.current?.setStatusAsync({ volume: newVolume });
  };

  const decreaseVolume = async () => {
    const newVolume = Math.max(volume - 0.1, 0.0);
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
  };

  const stopAnimation = () => {
    spinLoop.current?.stop();
    blinkLoop.current?.stop();
    spinAnim.setValue(0);
  };

  const updateBlinkAnimation = () => {
    blinkLoop.current?.stop();
    const blinkDuration = 1000 - volume * 700;

    blinkLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.3,
          duration: blinkDuration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: blinkDuration / 2,
          useNativeDriver: true,
        }),
      ])
    );
    blinkLoop.current.start();
  };

  useEffect(() => {
    if (isPlaying) {
      updateBlinkAnimation();
    }
  }, [volume]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      startAnimation();
      updateBlinkAnimation();
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

    if (isPlaying) {
      stopAnimation();
      startAnimation();
      updateBlinkAnimation();
    }
  };

  const handlePlayPrevious = () => {
    if (previousTrack) {
      setCurrentTrack(previousTrack);

      if (isPlaying) {
        stopAnimation();
        startAnimation();
        updateBlinkAnimation();
      }
    }
  };

  return (
    <>
      {!(bgLoaded && recordLoaded) && (
  <LinearGradient
colors={['#2c1e1a', '#4b2e24', '#6f4e37']} // warm brown gradient

    style={styles.loader}
  >
    <ActivityIndicator size="large" color="#ffffff" />
  </LinearGradient>
)}

      <ImageBackground
        source={require('../../assets/background2.jpg')}
        style={styles.container}
        resizeMode="cover"
        onLoadEnd={() => setBgLoaded(true)}
      >
        <Animated.Image
          source={require('../../assets/vinyl-record.png')}
          onLoadEnd={() => setRecordLoaded(true)}
          style={[
            styles.record,
            isPlaying ? { transform: [{ rotate: spin }] } : {},
          ]}
        />

        <View style={styles.playerBox}>
          <View style={styles.infoBox}>
            <Animated.Text style={[styles.label, { opacity: isPlaying ? blinkAnim : 1 }]}>
              Now Playing:
            </Animated.Text>
            <Animated.Text style={[styles.track, { opacity: isPlaying ? blinkAnim : 1 }]}>
              {currentTrack.title}
            </Animated.Text>
            <Animated.Text style={[styles.composer, { opacity: isPlaying ? blinkAnim : 1 }]}>
              by {currentTrack.composer}
            </Animated.Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={handlePlayPrevious} style={styles.controlButton}>
            <Ionicons name="play-skip-back" size={36} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTogglePlay}
            style={[styles.controlButton, { transform: [{ translateX: 3 }] }]}
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
          marginTop: 30
        }}>
          <TouchableOpacity onPress={decreaseVolume} style={{ marginRight: 16 }}>
            <Ionicons name="volume-low" size={28} color="white" />
          </TouchableOpacity>

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

          <TouchableOpacity onPress={increaseVolume} style={{ marginLeft: 16 }}>
            <Ionicons name="volume-high" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}
