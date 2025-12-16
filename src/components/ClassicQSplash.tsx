import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

const ClassicQSplash = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();
    return () => blink.stop();
  }, [opacity]);

    return (
    <View style={styles.container}>
        <Animated.View style={[styles.content, { opacity }]}>
        <Text style={styles.title}>🎼 ClassicQ</Text>
        <Text style={styles.loading}>Setting the mood...</Text>
        </Animated.View>
    </View>
    );
};

export default ClassicQSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#A36C4D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    marginTop: -110,
  },

  title: {
    fontFamily: 'Lora_700Bold',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e1e1e',
    letterSpacing: 1.2,
  },

  loading: {
    marginTop: 10,
    fontSize: 24,
    color: '#2f2f2f',
    opacity: 0.8,
  },
});

