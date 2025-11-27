import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFavourite } from '../screens/context/FavouriteContext';
import type { Track } from '../navigation/types';
import { debugValidateTracks } from '../utils/debugTracks';

export default function FavouriteScreen() {
  const { favourites, removeFromFavourites, reorderFavourites } = useFavourite();

  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debugging
  useEffect(() => {
    if (!__DEV__) return;
    if (!favourites || favourites.length === 0) return;
    debugValidateTracks(favourites, Math.min(10, favourites.length));
  }, [favourites]);

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
    animationRef.current = null;
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

  // Blink + Next Track
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

  // ------------------------
  // Render Item
  // ------------------------
  const renderItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<Track>) => {
    const index = getIndex?.();
    if (index === undefined) return null;

    const isPlaying = index === playingIndex && !isPaused;
    const TextComponent = isPlaying ? Animated.Text : Text;

    const bgStyle =
      isActive
        ? styles.itemActive
        : index % 2 === 1
        ? styles.itemDark
        : styles.itemLight;

    const isLoading = !!loadingMap[item.id];

    return (
      <TouchableOpacity
        onPress={() => handleTrackPress(index)}
        activeOpacity={0.9}
        style={styles.itemWrapper}
      >
        <View style={[styles.item, bgStyle]}>
          {/* Artwork */}
          <View style={styles.artContainer}>
            <Image
              source={item.image}
              style={styles.artImage}
              resizeMode="cover"
              onLoadStart={() =>
                setLoadingMap(prev => ({ ...prev, [item.id]: true }))
              }
              onLoadEnd={() =>
                setLoadingMap(prev => ({ ...prev, [item.id]: false }))
              }
            />

            {/* Placeholder */}
            {isLoading && (
              <Animated.View style={[styles.artImage, styles.placeholderBox]}>
                <Text style={styles.placeholderText}>ClassiQ</Text>
              </Animated.View>
            )}

            {/* Overlay Icon */}
            <View style={styles.playIconOverlay}>
              <Ionicons
                name={
                  index === playingIndex
                    ? isPaused
                      ? 'play'
                      : 'pause'
                    : 'play'
                }
                size={14}
                color="#fff"
              />
            </View>
          </View>

          {/* Text */}
          <View style={styles.textBox}>
            <TextComponent style={[styles.trackTitle, isPlaying && { opacity: fadeAnim }]}>
              {item.title}
            </TextComponent>
            <Text style={styles.trackComposer}>{item.composer}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actionsBox}>
            <TouchableOpacity
              onPress={() => removeFromFavourites(item)}
              style={styles.heartBtn}
              accessibilityLabel="Remove from favourites"
            >
              <Ionicons name="heart" size={30} color="#ff4d4d" />
            </TouchableOpacity>

            <TouchableOpacity
              onLongPress={drag}
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

  // Reorder keep playing track
  const onDragEnd = ({ data }: { data: Track[] }) => {
    const prevPlayingId =
      playingIndex !== null && favourites[playingIndex]
        ? favourites[playingIndex].id
        : null;

    reorderFavourites(data);

    if (prevPlayingId) {
      const newIndex = data.findIndex(t => t.id === prevPlayingId);
      setPlayingIndex(newIndex >= 0 ? newIndex : null);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#0d1b0d', '#1e3a1e', '#3b5b2e']}
        style={styles.background}
      >
        <View style={styles.container}>
          <DraggableFlatList
            data={favourites}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            onDragEnd={onDragEnd}
            ListEmptyComponent={<Text style={styles.empty}>No favourites yet.</Text>}
          />
        </View>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

/* ----------------------------------------- */
/* STYLES */
/* ----------------------------------------- */

const ART_BOX = 80;
const IMAGE_SIZE = 85;
const PLAY_BADGE = 20;

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, paddingTop: 0 },

  itemWrapper: { marginBottom: 0 },

  item: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 4,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
  },

  itemLight: { backgroundColor: '#3e2723' },
  itemDark: { backgroundColor: 'rgba(0,0,0,0.35)' },
  itemActive: { backgroundColor: '#274627' },

  artContainer: {
    width: ART_BOX,
    height: ART_BOX,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: -20,
    position: 'relative',
  },

  artImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
  },

  placeholderBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    backgroundColor: '#5C3A2E',
  },

  placeholderText: {
    fontFamily: 'Lora_700Bold',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },

  playIconOverlay: {
    position: 'absolute',
    left: (ART_BOX - PLAY_BADGE) / 2,
    top: (ART_BOX - PLAY_BADGE) / 2,
    width: PLAY_BADGE,
    height: PLAY_BADGE,
    borderRadius: PLAY_BADGE / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBox: { flex: 1, justifyContent: 'center' },
  trackTitle: { fontSize: 15, fontWeight: '600', color: '#fff' },
  trackComposer: { fontSize: 14, color: '#ddd', marginTop: 4 },

  actionsBox: { flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
  heartBtn: { paddingHorizontal: 20, paddingVertical: 8 },
  dragHandle: { paddingHorizontal: 0, paddingVertical: 8, marginRight: -10 },

  empty: {
    marginTop: 40,
    textAlign: 'center',
    color: '#ccc',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
