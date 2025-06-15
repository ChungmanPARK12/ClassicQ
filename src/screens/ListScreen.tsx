import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { trackList } from '../data/tracks';
import { LinearGradient } from 'expo-linear-gradient';

export default function ListScreen() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Blink animation control
  const startBlinking = () => {
    fadeAnim.setValue(1); // reset first
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

  // When user clicks a music
  const handleTrackPress = (index: number) => {
    // clear timeout if exists
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    stopBlinking(); // stop previous
    setPlayingIndex(index); // this will trigger useEffect
  };

  // Autoplay and blinking control
  useEffect(() => {
    if (playingIndex === null) {
      stopBlinking();
      return;
    }

    startBlinking();

    // setup next track
    timeoutRef.current = setTimeout(() => {
      const nextIndex = playingIndex + 1;
      if (nextIndex < trackList.length) {
        setPlayingIndex(nextIndex); // triggers this effect again
      } else {
        setPlayingIndex(null); // end
      }
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [playingIndex]);

  // clean up on unmount
  useEffect(() => {
    return () => {
      stopBlinking();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const renderItem = ({ item, index }: any) => {
  const isPlaying = index === playingIndex;
  const TextComponent = isPlaying ? Animated.Text : Text;

  // Alternate background style
  const backgroundStyle = index % 2 === 1 ? styles.itemDark : styles.itemLight;

  return (
    <TouchableOpacity onPress={() => handleTrackPress(index)} style={styles.itemWrapper}>
      <View style={[styles.item, backgroundStyle]}>
        <TextComponent style={[styles.trackTitle, isPlaying && { opacity: fadeAnim }]}>
          {item.title}
        </TextComponent>
        <Text style={styles.trackComposer}>{item.composer}</Text>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center',
  },
  itemWrapper: {
  marginBottom: -2,
   // optional
},

    item: {
    backgroundColor: 'rgba(255,255,255,0.15)', // translucent frame
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  background: {
  flex: 1,
},

  itemLight: {
  backgroundColor: 	'#3e2723',
},

itemDark: {
  backgroundColor: 'rgba(0,0,0,0.35)', // darker for odd rows
},
  trackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  trackComposer: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 4,
  },
});
