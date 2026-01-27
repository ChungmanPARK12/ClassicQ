import { Platform } from 'react-native';

export const HomeT = Platform.select({
  ios: {
    titleFontSize: 32,
    titleMarginBottom: 40,

    buttonPaddingVertical: 14,
    buttonPaddingHorizontal: 28,
    //buttonWidth: '70%' as const,
    buttonTextSize: 16,
    buttonMarginTop: 20,
  },

  android: {
    titleFontSize: 37,          // ↓
    titleMarginBottom: 32,      // ↓

    buttonPaddingVertical: 12,  // ↓
    buttonPaddingHorizontal: 26,
    buttonWidth: '75%' as const,         // ↑
    buttonTextSize: 20,         // ↓
    buttonMarginTop: 18,
  },
})!;
