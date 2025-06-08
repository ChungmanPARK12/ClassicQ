import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts, Lora_700Bold } from '@expo-google-fonts/lora';

export default function App() {
  const [fontsLoaded] = useFonts({ Lora_700Bold });
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => setIsAppReady(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !isAppReady) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar hidden />
        <Text style={styles.title}>🎼 ClassiQ</Text>
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
    backgroundColor: '#A36C4D', //  #A36C4D, 	#BC8A6B
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Lora_700Bold',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: 60,
  },
});
