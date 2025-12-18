// src/screens/ListScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import styles from './ListScreen.style';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { trackList } from '../data/tracks';
import { useFavourite } from '../screens/context/FavouriteContext';
import { Track } from '../navigation/types';
// debug
import { debugValidateTracks } from '../utils/debugTracks';


export default function ListScreen() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // per-image loading status
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  // FavouriteContext
  const { favourites, addToFavourites, removeFromFavourites } = useFavourite();

  // Debugging
  useEffect(() => {
    debugValidateTracks(trackList, 10); // runs only in __DEV__
  }, []);

  // toggle favourite
  const toggleFavourite = (track: Track) => {
    const isFav = favourites.some(t => t.id === track.id);
    isFav ? removeFromFavourites(track) : addToFavourites(track);
  };

  // blink animation
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

  // render item
  const renderItem = ({ item, index }: { item: Track; index: number }) => {
    const isPlaying = index === playingIndex && !isPaused;
    const TextComponent = isPlaying ? Animated.Text : Text;
    const backgroundStyle = index % 2 === 1 ? styles.itemDark : styles.itemLight;
    const isLoading = !!loadingMap[item.id];

    return (
      <TouchableOpacity onPress={() => handleTrackPress(index)} style={styles.itemWrapper}>
        <View style={[styles.item, backgroundStyle]}>
          {/* Artwork container - fixed width column */}
          <View style={styles.artContainer}>
            {/* Real Image (centered in fixed column) */}
            <Image
              source={item.image}
              style={styles.artImage}
              resizeMode="cover"
              onLoadStart={() => setLoadingMap(prev => ({ ...prev, [item.id]: true }))}
              onLoadEnd={() => setLoadingMap(prev => ({ ...prev, [item.id]: false }))}
            />

            {/* Placeholder - exactly same size/position as artImage */}
            {isLoading && (
              <Animated.View style={[styles.artImage, styles.placeholderBox]}>
                <Text style={styles.placeholderText}>🎼 ClassiQ</Text>
              </Animated.View>
            )}

            {/* Play/Pause icon overlay - always centered over ART_BOX */}
            {/* <View style={styles.playIconOverlay}>
              <Ionicons
                name={playingIndex === index ? (isPaused ? 'play' : 'pause') : 'play'}
                size={18}
                color="#fff"
              />
            </View> */}
          </View>

          {/* Text */}
          <View style={styles.textBox}>
            <TextComponent style={[styles.trackTitle, isPlaying && { opacity: fadeAnim }]}>
              {item.title}
            </TextComponent>
            <Text style={styles.trackComposer}>{item.composer}</Text>
          </View>

          {/* Heart */}
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


