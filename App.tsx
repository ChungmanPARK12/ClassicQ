import React, { useEffect, useState } from 'react';
import { View, Image, StatusBar, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppReady(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isAppReady) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar hidden />
        <Image
          source={require('./assets/background2.jpg')}
          style={styles.splashImage}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>🎼 ClassiQ</Text>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  title: {
    fontFamily: 'Lora_700Bold',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#1e1e1e',
  },
});
