# FavouriteContext Documentation

This document explains the structure, logic, and main functionalities of the **FavouriteContext** used across the **ClassiQ** app.

---

## Overview

- **File Path:** `screens/context/FavouriteContext.tsx`
- **Purpose:** Provides a centralized context for managing the user’s list of favourite tracks.  
  It supports `adding`, `removing`, `reordering`, and `persisting` favourites using AsyncStorage.
- **Connected Data:**
  - Used in `ListScreen` and `FavouriteScreen` to manage and display favourite tracks.
  - Persists data in `AsyncStorage` under the key `@classicq_favourites`.
- **Core Dependencies:**
  - `React` → for context creation and hooks (`createContext`, `useContext`, `useState`, `useEffect`)
  - `@react-native-async-storage/async-storage` → for local persistent storage

---

## Main Component

### `FavouriteProvider`

- **Type:** React Context Provider Component  
- **Purpose:** Wraps around the app (or navigation container) to make favourites data available throughout the component tree.
- **State & Constants:**
  | Name | Type | Description |
  |------|------|-------------|
  | `favourites` | `Track[]` | List of all saved favourite tracks |
  | `STORAGE_KEY` | `string` | Key used for persisting data in AsyncStorage (`@classicq_favourites`) |

- **Track Type Definition:**
  ```ts
  type Track = { title: string; composer: string; image: any };
  ```

## What `STORAGE_KEY` IS(Saving, Loading, Updating data)
- `STORAGE_KEY` is simply a string constant ientifier as the key stroing and retrieving data in AsyncStorage.
- `AsyncStorage` like a small key-value database built into every React Native app, like a localStorage, memory saved data without a database but limits, small to medium-sized data(6-10MB).

### Major Functions & Logic

## `loadFavourites`
- Loads favourites from AsyncStorage when the provider mounts.

# Logic
- Attempts to read data from AsyncStorage.
- Parses JSON if it exists.
- Initializes state with the stored list.

```ts
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

```

## `psrsist`
- Saves the given list of favourites back to AsyncStorage.

# Logic
- Called internally whenever the list is updated by add/remove/reorder.

```ts
const persist = async (list: Track[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save favourites:', err);
  }
};

```

## Responsibility
- Managing the global favourites list across multiple screens(ListScree, FavouriteScreen)
- Persisting data to local storage via AsyncStorage, ensuring data survives app restarts.
- Maintaining data consistency between UI components and persistent stroage.
