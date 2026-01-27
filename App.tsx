// App.tsx
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Lora_700Bold } from '@expo-google-fonts/lora';
import { Asset } from 'expo-asset';

import AppNavigator from './src/navigation/AppNavigator';
import { FavouriteProvider } from './src/screens/context/FavouriteContext';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SplashT as T } from './src/ui/tokens/splashscreenToken';

const MIN_SPLASH_MS = 2000;

const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export default function App() {
  const [fontsLoaded] = useFonts({ Lora_700Bold });
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const prepareApp = async () => {
      const start = Date.now();

      try {
        // Preload HomeScreen background image
        await Asset.fromModule(require('./assets/background.jpg')).downloadAsync();
      } catch (error) {
        console.warn('App preload failed:', error);
      }

      // Ensure splash stays visible for at least MIN_SPLASH_MS
      const elapsed = Date.now() - start;
      if (elapsed < MIN_SPLASH_MS) {
        await sleep(MIN_SPLASH_MS - elapsed);
      }

      if (mounted) setIsAppReady(true);        
    };

    if (fontsLoaded) {
      prepareApp();
    }

    return () => {
      mounted = false;
    };
  }, [fontsLoaded]);

  if (!fontsLoaded || !isAppReady) {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <StatusBar hidden />
        <Text style={styles.title}>🎼 ClassicQ</Text>
      </SafeAreaView>
    );
  }

  return (
    <FavouriteProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FavouriteProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#A36C4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Lora_700Bold',
    fontSize: T.titleFontSize,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: T.titleMarginBottom,
  },

});
