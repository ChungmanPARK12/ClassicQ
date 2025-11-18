// src/components/ArtPlaceholder.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

type Props = { width?: number; height?: number };

export const ArtPlaceholder: React.FC<Props> = ({ width = 90, height = 90 }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.06, duration: 700, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.0, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);

  return (
    <View style={[styles.box, { width, height }]}>
      <Animated.Text style={[styles.title, { transform: [{ scale }] }]}>ClassiQ</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#996646', // splash brown
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0B0B0B', // splash title color
    letterSpacing: 0.3,
  },
});
