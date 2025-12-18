// src/screens/ListScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import styles from './ListScreen.style';

// Renders a three-color linear gradient background.
import { LinearGradient } from 'expo-linear-gradient';

// Play and pause icon on the image.
import { Ionicons } from '@expo/vector-icons';
import { trackList } from '../data/tracks';
import { useFavourite } from '../screens/context/FavouriteContext';
import { Track } from '../navigation/types';
// debug.
import { debugValidateTracks } from '../utils/debugTracks';


export default function ListScreen() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // per-image loading status.
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const { favourites, addToFavourites, removeFromFavourites } = useFavourite();

  // Debug output 100 list in ListScreen.
  useEffect(() => {
    debugValidateTracks(trackList, 10); // runs only in __DEV__
  }, []);

  // Add and remove the favourite state for the selected track.
  const toggleFavourite = (track: Track) => {
    const isFav = favourites.some(t => t.id === track.id);
    isFav ? removeFromFavourites(track) : addToFavourites(track);
  };

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

  // play/pause + auto next
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

  useEffect(() => {
    return () => {
      stopBlinking();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const renderItem = ({ item, index }: { item: Track; index: number }) => {
    const isPlaying = index === playingIndex && !isPaused;
    const TextComponent = isPlaying ? Animated.Text : Text;

    // Alternate background color by row index.
    const backgroundStyle = index % 2 === 1 ? styles.itemDark : styles.itemLight;
    const isLoading = !!loadingMap[item.id];

    return (
      <TouchableOpacity onPress={() => handleTrackPress(index)} style={styles.itemWrapper}>
        <View style={[styles.item, backgroundStyle]}>
          <View style={styles.artContainer}>
            <Image
              source={item.image}
              style={styles.artImage}
              resizeMode="cover"
              onLoadStart={() => setLoadingMap(prev => ({ ...prev, [item.id]: true }))}
              onLoadEnd={() => setLoadingMap(prev => ({ ...prev, [item.id]: false }))}
            />

            {/* Placeholder - exactly same size/position as artImage */}
            {isLoading && (
              // Placeholder container (Animated for future blinking/shimmer effects).
              <Animated.View style={[styles.artImage, styles.placeholderBox]}>
                <Text style={styles.placeholderText}>🎼 ClassiQ</Text>
              </Animated.View>
            )}

            {/* Play/Pause icon overlay - show only after artwork is loaded */}
            {!isLoading && (
              <View style={styles.playIconOverlay}>
                <Ionicons
                  name={playingIndex === index ? (isPaused ? 'play' : 'pause') : 'play'}
                  size={18}
                  color="#fff"
                />
              </View>
            )}
          </View>

          <View style={styles.textBox}>
            <TextComponent style={[styles.trackTitle, isPlaying && { opacity: fadeAnim }]}>
              {item.title}
            </TextComponent>
            <Text style={styles.trackComposer}>{item.composer}</Text>
          </View>

          {/* Heart button add to favourite and cancel */}
          <View style={styles.actionsBox}>
            <TouchableOpacity
              onPress={(e) => {
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
        <FlatList
          data={trackList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </LinearGradient>
  );
}


