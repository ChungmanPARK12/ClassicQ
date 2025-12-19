import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import styles from './PlayingScreen.style';

// Type-safe route params (RootStack)
import { RouteProp } from '@react-navigation/native';

// Type definition for RootStack routes and parameters.
import { RootStackParamList } from '../navigation/types';
import { trackList } from '../data/tracks';
import { Ionicons } from '@expo/vector-icons';

// Slide bar for the volume control.
import Slider from '@react-native-community/slider';

// Preload two images in Asset.
import { Asset } from 'expo-asset';

// Loading status
import ClassicQSplash from '../components/ClassicQSplash';

type PlayingScreenRouteProp = RouteProp<RootStackParamList, 'NowPlaying'>;

type Props = {
  route: PlayingScreenRouteProp;
};

export default function PlayingScreen({ route }: Props) {
  const initialTrack = {
    title: route.params.title,
    composer: route.params.composer
  };

  const [currentTrack, setCurrentTrack] = useState(initialTrack);
  const [previousTrack, setPreviousTrack] = useState<typeof currentTrack | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const spinAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const spinLoop = useRef<Animated.CompositeAnimation | null>(null);
  const blinkLoop = useRef<Animated.CompositeAnimation | null>(null);

  const [volume, setVolume] = useState(1.0);

  // Image pre-load (background2 + record)
  useEffect(() => {
    let mounted = true;

    const preload = async () => {
      try {
        const bg = require('../../assets/background2.jpg');
        const record = require('../../assets/vinyl-record.png');

        await Asset.loadAsync([bg, record]);

        if (mounted) setIsReady(true);
      } catch (e) {

        if (mounted) setIsReady(true);
      }
    };

    preload();
    return () => {
      mounted = false;
    };
  }, []);

  const increaseVolume = async () => {
    const newVolume = Math.min(volume + 0.1, 1.0);
    setVolume(newVolume);
  };

  const decreaseVolume = async () => {
    const newVolume = Math.max(volume - 0.1, 0.0);
    setVolume(newVolume);
  };

  // Spins the record with a full 360° rotation
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

  // Updates the blinking animation speed based on the current volume level
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
    if (isPlaying) updateBlinkAnimation();
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

  if (!isReady) {
    return <ClassicQSplash />;
  }

  return (
    <ImageBackground
      source={require('../../assets/background2.jpg')}
      style={styles.container}
      resizeMode="cover"
    >


      <View style={styles.playerBox}>
        <View style={styles.infoBox}>
          <View style={styles.textArea}>
            <Animated.Text style={[styles.label, { opacity: isPlaying ? blinkAnim : 1 }]}>
              Now Playing:
            </Animated.Text>

            <Animated.Text
              style={[styles.track, { opacity: isPlaying ? blinkAnim : 1 }]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {currentTrack.title}
            </Animated.Text>

            <Animated.Text
              style={[styles.composer, { opacity: isPlaying ? blinkAnim : 1 }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              by {currentTrack.composer}
            </Animated.Text>
          </View>

          <View style={styles.recordWrapper}>
            <Animated.Image
              source={require('../../assets/vinyl-record.png')}
              style={[
                styles.recordImage,
                {
                  transform: [
                    { translateX: 40 },
                    { rotate: isPlaying ? spin : '0deg' },
                  ],
                },
              ]}
            />

          </View>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handlePlayPrevious} style={styles.controlButton}>
          <Ionicons name="play-skip-back" size={36} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleTogglePlay}
          style={[
            styles.controlButton,
            !isPlaying ? { transform: [{ translateX: 3 }] } : null,
          ]}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={44} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayNext} style={styles.controlButton}>
          <Ionicons name="play-skip-forward" size={36} color="white" />
        </TouchableOpacity>
      </View>

      {/*Volume control bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        <TouchableOpacity onPress={decreaseVolume} style={{ marginRight: 16 }}>
          <Ionicons name="volume-low" size={28} color="white" />
        </TouchableOpacity>

        <Slider
          style={{ width: 200 }}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={async (val) => {
            setVolume(val)
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
  );
}
