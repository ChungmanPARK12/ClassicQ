// screens/context/FavouriteContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Track } from '../../navigation/types';              // ✅ import shared Track (has id)
import { trackIdOf } from '../../data/trackId';                   // ✅ for migration

type FavouriteContextType = {
  favourites: Track[];
  addToFavourites: (track: Track) => void;
  removeFromFavourites: (track: Track) => void;                   // keep same call-site API
  reorderFavourites: (newOrder: Track[]) => void;
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
  const STORAGE_KEY = '@classicq_favourites';                     // keep same key; we’ll migrate in-place

  // Load & migrate once on mount
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (!json) return;

        const saved: any[] = JSON.parse(json);

        // ✅ Migration: ensure each item has a stable id
        const migrated: Track[] = saved.map((it) => {
          if (it.id) return it as Track;
          const id = trackIdOf(it.title, it.composer);
          return { id, title: it.title, composer: it.composer, image: it.image } as Track;
        });

        // de-dup by id (just in case)
        const uniq = Array.from(new Map(migrated.map(t => [t.id, t])).values());

        setFavourites(uniq);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(uniq));
      } catch (err) {
        console.error('Failed to load favourites:', err);
      }
    };
    loadFavourites();
  }, []);

  // Persist on change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favourites)).catch(() => {});
  }, [favourites]);

  const addToFavourites = (track: Track) => {
    setFavourites((prev) => (prev.some(t => t.id === track.id) ? prev : [...prev, track]));
  };

  const removeFromFavourites = (track: Track) => {
    setFavourites((prev) => prev.filter(t => t.id !== track.id));
  };

  const reorderFavourites = (newOrder: Track[]) => {
    // trust provided order by id
    const byId = new Map(newOrder.map(t => [t.id, t]));
    setFavourites((prev) => prev.filter(t => byId.has(t.id)).map(t => byId.get(t.id)!));
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, reorderFavourites }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
