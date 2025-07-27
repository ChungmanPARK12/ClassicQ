import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  ActivityIndicator,
} from 'react-native';
import { trackList } from '../data/tracks';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFavourite } from '../screens/context/FavouriteContext'; // ✅ Import context

export default function ListScreen() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loadingMap, setLoadingMap] = useState<{ [index: number]: boolean }>({});

  const { favourites, addToFavourites, removeFromFavourites } = useFavourite(); // ✅ Destructure context methods

  const toggleFavourite = (track: { title: string; composer: string }) => {
    const isFav = favourites.some(t => t.title === track.title);
    isFav ? removeFromFavourites(track) : addToFavourites(track);
  };

  const startBlinking = () => {
    fadeAnim.setValue(1);
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
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

  const renderItem = ({ item, index }: any) => {
    const isPlaying = index === playingIndex && !isPaused;
    const TextComponent = isPlaying ? Animated.Text : Text;
    const backgroundStyle = index % 2 === 1 ? styles.itemDark : styles.itemLight;
    const isLoading = loadingMap[index];
    const isFav = favourites.some(t => t.title === item.title); // ✅ Is this track a favorite?

    return (
      <TouchableOpacity onPress={() => handleTrackPress(index)} style={styles.itemWrapper}>
        <View style={[styles.item, backgroundStyle]}>
          <View style={styles.imageBox}>
            {isLoading && (
              <ActivityIndicator size="small" color="#fff" style={styles.imageLoader} />
            )}
            <Image
              source={item.image}
              style={styles.trackImage}
              onLoadStart={() => setLoadingMap(prev => ({ ...prev, [index]: true }))}
              onLoadEnd={() => setLoadingMap(prev => ({ ...prev, [index]: false }))}
            />
            <View style={styles.iconOverlay}>
              <Ionicons
                name={
                  playingIndex === index
                    ? isPaused
                      ? 'play'
                      : 'pause'
                    : 'play'
                }
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

          <View style={styles.actionsBox}>
            <TouchableOpacity onPress={() => toggleFavourite(item)}>
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={28}
                color={isFav ? '#ff4d4d' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#0d1b0d', '#1e3a1e', '#3b5b2e']}
      style={styles.background}
    >
      <View style={styles.container}>
        <FlatList
          data={trackList}
          keyExtractor={(item, index) => `${item.title}-${index}`}
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
  background: {
    flex: 1,
  },
  itemWrapper: {
    marginBottom: -2,
  },
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
  itemLight: {
    backgroundColor: '#3e2723',
  },
  itemDark: {
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  trackTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  trackComposer: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 4,
  },
  trackImage: {
    width: 90,
    height: 90,
    borderRadius: 0,
  },
  imageBox: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: -20,
    position: 'relative',
  },
  imageLoader: {
    position: 'absolute',
    zIndex: 1,
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
  textBox: {
    flex: 1,
    justifyContent: 'center',
  },
  actionsBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});
