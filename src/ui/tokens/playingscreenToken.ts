import { Platform } from 'react-native';

export const PlayingT = Platform.select({
  ios: {
    playerBoxMarginTop: -60,
    playerBoxMinHeight: 650,
    playerBoxPaddingTop: 40,
    playerBoxPaddingBottom: 60,

    infoBoxHeight: 450,
    infoBoxMarginTop: -20,

    textAreaMarginTop: 30,

    recordBottom: 10,

    controlsMarginTop: -150,
    controlsWidth: '70%',
  },

  android: {
    
    playerBoxMarginTop: -120,
    playerBoxMinHeight: 650,
    playerBoxPaddingTop: 34,
    playerBoxPaddingBottom: 50,

    infoBoxHeight: 420,
    infoBoxMarginTop: -10,

    textAreaMarginTop: 24,

    recordBottom: 6,

    controlsMarginTop: -150,
    controlsWidth: '78%',
  },
})!;
