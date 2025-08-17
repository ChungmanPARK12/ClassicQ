// src/navigation/types.ts
import type { ImageSourcePropType } from 'react-native';

export type RootStackParamList = {
    LoadingScreen: undefined;
    Home: undefined;
    NowPlaying: {
      title: string;
      composer: string;
      //image: ImageSourcePropType;
    };
    List: undefined;
    Favourite: undefined;
  };
  export type Track = {
  title: string;
  composer: string;
  image: ImageSourcePropType; // optional if some items don't have images yet
  // id?: string; // uncomment if you want a stable id key
};
  