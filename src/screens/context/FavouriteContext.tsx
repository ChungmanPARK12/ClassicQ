// screens/context/FavouriteContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Defines the shape of a single track object.
// It about the rule by TrypeScript that every track must have a title, composer and image.
type Track = { title: string; composer: string; image: any };

// Defines the shape of the context data.
// Declaration the three functions below.
type FavouriteContextType = {
  favourites: Track[];
  addToFavourites: (track: Track) => void;
  removeFromFavourites: (track: Track) => void;
  reorderFavourites: (newOrder: Track[]) => void; // ✅ new
};

// Defines the actually create the context.
// This is container created by React, pass the data and fuctions down to components.
// Once you wrap your app with <FavouriteProvider>, context filled with real data and functions. 
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

  // Load favourites from persistent storage(AsyncStorage) once on mount.
  // If data exist, initialize state with it. 
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
  
  // Persit the given list of favourites to AsyncStorage
  // Called internally whenever favourites are updated
  const persist = async (list: Track[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Failed to save favourites:', err);
    }
  };

  // Duplicate prevention inside the context itself in the future for controling heart button in the multiple screen.
  const addToFavourites = (track: Track) => {
  const exists = favourites.some(
    t => t.title === track.title && t.composer === track.composer
  );
  if (exists) return;   // silently skip if already in list.

  const updated = [...favourites, track];
  setFavourites(updated);
  persist(updated);
};

  const removeFromFavourites = (track: Track) => {
    const updated = favourites.filter(t => t.title !== track.title);
    setFavourites(updated);
    persist(updated);
  };

  // Reorder the list after drag
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
