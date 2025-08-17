// screens/context/FavouriteContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Track = { title: string; composer: string; image: any };

type FavouriteContextType = {
  favourites: Track[];
  addToFavourites: (track: Track) => void;
  removeFromFavourites: (track: Track) => void;
  reorderFavourites: (newOrder: Track[]) => void; // ✅ new
};

const FavouriteContext = createContext<FavouriteContextType>({
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  reorderFavourites: () => {},
});

export const useFavourite = () => useContext(FavouriteContext);

export const FavouriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<Track[]>([]);
  const STORAGE_KEY = '@classicq_favourites';

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setFavourites(JSON.parse(json));
      } catch (err) {
        console.error('Failed to load favourites:', err);
      }
    };
    loadFavourites();
  }, []);

  const persist = async (list: Track[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Failed to save favourites:', err);
    }
  };

  const addToFavourites = (track: Track) => {
    const updated = [...favourites, track];
    setFavourites(updated);
    persist(updated);
  };

  const removeFromFavourites = (track: Track) => {
    const updated = favourites.filter(t => t.title !== track.title);
    setFavourites(updated);
    persist(updated);
  };

  const reorderFavourites = (newOrder: Track[]) => {
    setFavourites(newOrder);
    persist(newOrder);
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, reorderFavourites }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
