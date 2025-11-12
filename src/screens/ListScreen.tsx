import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { trackList } from '../data/tracks';
import { useFavourite } from '../screens/context/FavouriteContext';
import { Track } from '../navigation/types';
// debug
import { debugValidateTracks } from '../utils/debugTracks';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { useImagesReady } from '../hooks/useImagesReady';

export default function ListScreen() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Call the method from FavouriteContext
  const { favourites, addToFavourites, removeFromFavourites } = useFavourite();

  /// Debugging ///
  useEffect(() => {
    debugValidateTracks(trackList, 10); // runs only in __DEV__
  }, []);

  // --- Splash-style overlay control via useImagesReady ---
  const sources = useMemo(() => trackList.map(t => t.image), []);
  const { ready, markLoaded } = useImagesReady(sources);

  // Click icon, add to Favourites, one more click to remove
  const toggleFavourite = (track: Track) => {
    const isFav = favourites.some(t => t.id === track.id);
    isFav ? removeFromFavourites(track) : addToFavourites(track);
  };

  // Blink animation control
  const startBlinking = () => {
    fadeAnim.setValue(1);
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.3, duration: 500, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    );
    animationRef.current.start();
  };

  const stopBlinking = () => {
    animationRef.current?.stop();
    fadeAnim.setValue(1);
  };

  // Control play and pause, play next after timeout 3000
  const handleTrackPress = (index: number) => {
    if (index === playingIndex) {
      setIsPaused(prev => !prev);
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    stopBlinking();
    setIsPaused(false);
    setPlayingIndex(index);
  };

  // autoplay + blink controller
  useEffect(() => {
    if (playingIndex === null || isPaused) {
      stopBlinking();
      return;
    }
    startBlinking();

    timeoutRef.current = setTimeout(() => {
      const nextIndex = playingIndex + 1;
      if (nextIndex < trackList.length) {
        setPlayingIndex(nextIndex);
        setIsPaused(false);
      } else {
        setPlayingIndex(null);
      }
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [playingIndex, isPaused]);

  // cleanup
  useEffect(() => {
    return () => {
      stopBlinking();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Displays the items the track list
  const renderItem = ({ item, index }: { item: Track; index: number }) => {
    const isPlaying = index === playingIndex && !isPaused;
    const TextComponent = isPlaying ? Animated.Text : Text;
    const backgroundStyle = index % 2 === 1 ? styles.itemDark : styles.itemLight;

    return (
      <TouchableOpacity onPress={() => handleTrackPress(index)} style={styles.itemWrapper}>
        <View style={[styles.item, backgroundStyle]}>
          {/* Artwork(image) + play/pause overlay icon */}
          <View style={styles.imageBox}>
            <Image
              source={item.image}
              style={styles.trackImage}
              onLoadEnd={() => markLoaded(index)}
              fadeDuration={150}
            />
            <View style={styles.iconOverlay}>
              <Ionicons
                name={playingIndex === index ? (isPaused ? 'play' : 'pause') : 'play'}
                size={18}
                color="#fff"
              />
            </View>
          </View>

          {/* Title / Composer */}
          <View style={styles.textBox}>
            <TextComponent style={[styles.trackTitle, isPlaying && { opacity: fadeAnim }]}>
              {item.title}
            </TextComponent>
            <Text style={styles.trackComposer}>{item.composer}</Text>
          </View>

          {/* Heart (favourite) — stop click from bubbling to row */}
          <View style={styles.actionsBox}>
            <TouchableOpacity
              onPress={(e) => {
                // prevent triggering row onPress (play/pause)
                // @ts-ignore RN PressEvent has stopPropagation at runtime
                e.stopPropagation?.();
                toggleFavourite(item);
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={favourites.some(t => t.id === item.id) ? 'heart' : 'heart-outline'}
                size={30}
                color={favourites.some(t => t.id === item.id) ? '#ff4d4d' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#0d1b0d', '#1e3a1e', '#3b5b2e']} style={styles.background}>
      <View style={styles.container}>
        {!ready && <LoadingOverlay subtitle="Loading library…" />}
        <FlatList
          data={trackList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  background: { flex: 1 },
  itemWrapper: { marginBottom: -2 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 4,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  itemLight: { backgroundColor: '#3e2723' },
  itemDark: { backgroundColor: 'rgba(0,0,0,0.35)' },

  trackTitle: { fontSize: 15, fontWeight: '600', color: '#fff' },
  trackComposer: { fontSize: 14, color: '#ddd', marginTop: 4 },

  trackImage: { width: 90, height: 90, borderRadius: 0 },
  imageBox: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: -20,
    position: 'relative',
  },

  iconOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -9 }, { translateY: -9 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },

  textBox: { flex: 1, justifyContent: 'center' },

  actionsBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});
