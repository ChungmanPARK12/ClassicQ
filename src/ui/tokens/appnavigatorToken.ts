import { Platform } from 'react-native';

export const NavT = Platform.select({
  ios: {
    headerTitleFontSize: 20,
  },
  android: {
    headerTitleFontSize: 25,
  },
})!;
