// src/navigation/types.ts
import type { ImageSourcePropType } from 'react-native';

//AppNavigator
export type RootStackParamList = {
    LoadingScreen: undefined;
    Home: undefined;
    NowPlaying: {
      title: string;
      composer: string;
    };
    List: undefined;
    Favourite: undefined;
  };

// data/tacks.ts
export type Track = {
    id: string;
    title: string;
    composer: string;
    image: ImageSourcePropType; 
};
  