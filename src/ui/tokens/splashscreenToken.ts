import { Platform } from 'react-native';

export const SplashT = Platform.select({
  ios: {
    titleFontSize: 36,
    titleMarginBottom: 12,
  },
  android: {
    titleFontSize: 32,
    titleMarginBottom: 10,
  },
})!;
