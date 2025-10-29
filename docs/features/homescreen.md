# HomeScreen Documentation

This document explains the structure, logic, and main functionalities of the **HomeScreen** component.

---

## Overview

- **File Path:** `screens/HomeScreen.tsx`
- **Purpose:** Serves as the landing page of the **ClassiQ** app.  
  It introduces the user to the app, displays random track options, and allows navigation to the **NowPlaying** screen.
- **Connected Data:** Utilizes `trackList` for music data and navigation types from `types.ts`.
- **Core Dependencies:**
  - `@react-navigation/native` → for navigation between screens
  - `expo-linear-gradient` → for styled background
  - `Ionicons` → for icons and UI elements
  - Local image assets → for background and logo display

---

## Main Component

### `HomeScreen`

- **Type:** Functional component using React Hooks (`useState`, `useEffect`)
- **Props:**
  ```ts
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<NavigationProp>();


## Major Functions & Logic

### `handlePlayRandom`
- Random selection happens before navigation. 
- `playingScreen` should only focus on playback, not track selection. 

```ts
const handlePlayRandom = () => {
  const randomIndex = Math.floor(Math.random() * trackList.length);
  const randomTrack = trackList[randomIndex];
  navigation.navigate('NowPlaying', { track: randomTrack });
};

```
## Responsibility
- Selects a random track from `trackList`.
- Passes it as a navigation parameter to `playingScreen`.

