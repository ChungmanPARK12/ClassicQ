# PlayingScreen Documentation

This document explains the structure, logic, and main functionalities of the **PlayingScreen** component.

---

## Overview

- **File Path:** `screens/PlayingScreen.tsx`
- **Purpose:** Displays the currently selected track with playback controls (play, pause, slider, animation, etc.).
- **Connected Data:** Uses data from `trackList` and navigation parameters (from `types.ts`).
- **Core Dependencies:**
  - `expo-av` → for audio playback
  - `@react-navigation/native` → for navigation between screens
  - `@react-native-community/slider` → for time control
  - `expo-linear-gradient` → for background styling
  - `Ionicons` → for icons

---

## Main Component

### `PlayingScreen`

- **Type:** Functional component using React Hooks (`useRef`, `useState`, `useEffect`)
- **Props:**
  ```ts
  type PlayingScreenRouteProp = RouteProp<RootStackParamList, 'NowPlaying'>;
  type Props = { route: PlayingScreenRouteProp };
  ```
- **Connected Data** Uses `route.params.track` passed from `Homescreen`.

- This screen shared loading/status screen `ClassicQSplash` and prelod method.

## Major Functions & Logic

### `loadTrack`
- Loads and prepares the selected track for playback. 

### Logic
- Unloads any previously playing sound instance.
- Creates a new sound instance using `Audio.Sound.createAsync`.
- Starts playback automatically once loaded. 

```ts
const loadTrack = async () => {
  if (soundRef.current) {
    await soundRef.current.unloadAsync();
  }
  const { sound } = await Audio.Sound.createAsync(route.params.track.audio);
  soundRef.current = sound;
  await sound.playAsync();
};

```
### `handlePlayPause`
- Toggles between play and pause states. 

### Logic
- If a sound is currently playing -> `pauseAsync()`.
- If paused -> `playAsync()`.

```ts
const handlePlayPause = async () => {
  if (!soundRef.current) return;
  const status = await soundRef.current.getStatusAsync();
  if (status.isPlaying) {
    await soundRef.current.pauseAsync();
    setIsPlaying(false);
  } else {
    await soundRef.current.playAsync();
    setIsPlaying(true);
  }
};

```

## Responsibility
- Handling all audio playback logic (load play, pause, seek, unload).
- Displaying track metadata (title, composer, and artwork).


