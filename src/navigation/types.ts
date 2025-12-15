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
    id: string;
    title: string;
    composer: string;
    image: ImageSourcePropType; 
};
  