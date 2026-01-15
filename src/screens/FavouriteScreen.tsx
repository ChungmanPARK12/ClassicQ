// screens/FavouriteScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './FavouriteScreen.style';

// Handles advanced gestures (drag, long-press, swipe).
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Provides a drag-and-drop FlatList for reordering items.
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

// Renders a three-color linear gradient background.
import { LinearGradient } from 'expo-linear-gradient';

// Play and pause icon on the image
import { Ionicons } from '@expo/vector-icons';
import { useFavourite } from '../screens/context/FavouriteContext';
import { debugValidateTracks } from '../utils/debugTracks';
import { Track } from '../navigation/types';
import * as Haptics from 'expo-haptics';

export default function FavouriteScreen() {
  const { favourites, removeFromFavourites, reorderFavourites } = useFavourite();

  // Debug output all the list in Favourite
  useEffect(() => {
    debugValidateTracks(favourites, Math.min(10, favourites.length));
  }, [favourites]);

  // ✅ Use id-based maps to keep image loading state stable across reorders
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Blink title + auto-next after 3000ms
  useEffect(() => {
    if (playingIndex === null || isPaused) {
      stopBlinking();
      return;
    }
    startBlinking();

    timeoutRef.current = setTimeout(() => {
      const nextIndex = playingIndex + 1;
      if (nextIndex < favourites.length) {
        setPlayingIndex(nextIndex);
        setIsPaused(false);
      } else {
        setPlayingIndex(null);
      }
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [playingIndex, isPaused, favourites.length]);

  useEffect(() => {
    return () => {
      stopBlinking();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<Track>) => {
    const index = getIndex?.() ?? 0;

    const isPlaying = index === playingIndex && !isPaused;
    const TextComponent = isPlaying ? Animated.Text : Text;

    // Change background color when dragging, otherwise alternate by row.
    const bgStyle = isActive
      ? styles.itemActive
      : index % 2 === 1
        ? styles.itemDark
        : styles.itemLight;

    // Stable key for this track
    const itemKey = item.id;

    // Loading state is now tied to item.id, not index
    const isLoading = loadingMap[itemKey];
    const isLoaded = loadedMap[itemKey];

    return (
      <TouchableOpacity
        onPress={() => handleTrackPress(index)}
        activeOpacity={0.9}
        style={styles.itemWrapper}
      >
        <View style={[styles.item, bgStyle]}>
          <View style={styles.imageBox}>
            {isLoading && (
              <ActivityIndicator size="small" color="#fff" style={styles.imageLoader} />
            )}

            <Image
              source={item.image}
              style={styles.trackImage}
              onLoadStart={() => {
                // If already loaded once, don't show spinner again on reorder re-renders
                if (isLoaded) return;
                setLoadingMap(prev => ({ ...prev, [itemKey]: true }));
              }}
              onLoadEnd={() => {
                setLoadingMap(prev => ({ ...prev, [itemKey]: false }));
                setLoadedMap(prev => ({ ...prev, [itemKey]: true }));
              }}
            />

            <View style={styles.iconOverlay}>
              <Ionicons
                name={index === playingIndex ? (isPaused ? 'play' : 'pause') : 'play'}
                size={18}
                color="#fff"
              />
            </View>
          </View>

          <View style={styles.textBox}>
            <TextComponent style={[styles.trackTitle, isPlaying && { opacity: fadeAnim }]}>
              {item.title}
            </TextComponent>
            <Text style={styles.trackComposer}>{item.composer}</Text>
          </View>

          {/* Click heart icon to remove the item */}
          <View style={styles.actionsBox}>
            <TouchableOpacity
              onPress={() => removeFromFavourites(item)}
              style={styles.heartBtn}
              accessibilityLabel="Remove from favourites"
            >
              <Ionicons name="heart" size={30} color="#ff4d4d" />
            </TouchableOpacity>

            {/* Drag handle */}
            <TouchableOpacity
              onLongPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                drag();
              }}
              disabled={isActive}
              style={styles.dragHandle}
              accessibilityLabel="Reorder item"
            >
              <Ionicons name="reorder-three-outline" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Keep playback to same track after reorder (by id)
  const onDragEnd = ({ data }: { data: Track[] }) => {
    const prevPlayingId =
      playingIndex !== null && favourites[playingIndex] ? favourites[playingIndex].id : null;

    reorderFavourites(data);

    if (prevPlayingId) {
      const newIndex = data.findIndex(t => t.id === prevPlayingId);
      setPlayingIndex(newIndex >= 0 ? newIndex : null);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient colors={['#0d1b0d', '#1e3a1e', '#3b5b2e']} style={styles.background}>
        <View style={styles.container}>
          <DraggableFlatList
            data={favourites}
            // ✅ Use stable id (no index) so rows don't remount on reorder
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onDragEnd={onDragEnd}
            ListEmptyComponent={<Text style={styles.empty}>No favourites yet.</Text>}
          />
        </View>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}
