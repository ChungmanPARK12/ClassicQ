// src/components/LoadingOverlay.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title?: string;
  subtitle?: string;
};

export const LoadingOverlay: React.FC<Props> = ({ title = 'ClassiQ', subtitle }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.04, duration: 700, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.0, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text style={styles.title}>🎼 ClassiQ</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.splashBg,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  title: {
    fontFamily: 'Lora_700Bold',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 60,
    letterSpacing: 0.5,
    color: colors.textOnSplash,
  },
  subtitle: {
    marginTop: 15,
    fontSize: 20,
    color: colors.textOnSplash,
    opacity: 0.8,
    textAlign: 'center',
  },
});
