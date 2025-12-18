// screens/context/FavouriteContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Track } from '../../navigation/types';

type FavouriteContextType = {
  favourites: Track[];
  addToFavourites: (track: Track) => void;
  removeFromFavourites: (track: Track) => void;
  reorderFavourites: (newOrder: Track[]) => void; 
};

// Create a context for managing favourite tracks. 
const FavouriteContext = createContext<FavouriteContextType>({
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  reorderFavourites: () => {},
});

// Custom hook to access the FaouriteContext
export const useFavourite = () => useContext(FavouriteContext);

// Provider component that owns favourite state and persistence logic.
export const FavouriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<Track[]>([]);
  const STORAGE_KEY = '@classicq_favourites';

  // Load favourites from persistent storage on app start.
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

  // Persist the current favourites list to AsyncStorage.
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
