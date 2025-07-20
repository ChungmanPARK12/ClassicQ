// context/FavouriteContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Track = {
  title: string;
  composer: string;
};

type FavouriteContextType = {
  favourites: Track[];
  addToFavourites: (track: Track) => void;
  removeFromFavourites: (track: Track) => void;
};

const FavouriteContext = createContext<FavouriteContextType | undefined>(undefined);

export function FavouriteProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<Track[]>([]);

  const addToFavourites = (track: Track) => {
    setFavourites(prev => [...prev, track]);
  };

  const removeFromFavourites = (track: Track) => {
    setFavourites(prev => prev.filter(t => t.title !== track.title));
  };

  return (
    <FavouriteContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
      {children}
    </FavouriteContext.Provider>
  );
}

export function useFavourite() {
  const context = useContext(FavouriteContext);
  if (!context) throw new Error('useFavourite must be used within FavouriteProvider');
  return context;
}
