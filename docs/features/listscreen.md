# ListScreen Documentation

This document explains the structure, logic, and main functionalities of the **ListScreen** component.

---

## Overview

- **File Path:** `screens/ListScreen.tsx`
- **Purpose:** Renders a scrollable list of tracks, supports inline “preview-style” play/pause behavior with auto-advance every 3 seconds, blinking animation on the active item, image loading indicators, and favourites toggling.
- **Connected Data:** 
  - `trackList` (title, composer, image, audio path metadata)
  - `FavouriteContext` via `useFavourite()` (favourites state + mutators)
  - `Track` type from `navigation/types`
- **Core Dependencies:**
  - `react-native` (`FlatList`, `TouchableOpacity`, `Animated`, `Image`, `ActivityIndicator`, etc.)
  - `expo-linear-gradient` (background styling)
  - `@expo/vector-icons/Ionicons` (icons for play/pause/heart)
  - `react` hooks (`useState`, `useEffect`, `useRef`)

---

## Debugging
- import `debugValidateTracks()` utility.
- Ensures each track has a valid id, title, and composer.
```ts
  useEffect(() => {
  debugValidateTracks(trackList, 10); 
}, []);
``` 

## Main Component

### `ListScreen`

- **Type:** Functional component using React Hooks (`useState`, `useEffect`).
- **Props:**
  ```ts
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'List'>;
  const navigation = useNavigation<NavigationProp>();
  ```
- **Connected Data** Imports and maps through `trackList` to render each track entry in the UI.

## Major Functions & Logic

### `handleTrackPress(index:number)`
- Controls preview play/pause on item tap and switches active item.

### Logic
- If tapping the same index -> toggle `isPaused`.
- Otherwise clear any pending timeout, stop blinking, set new `playingIndex`, and reset `isPaused=false`.
- Set timeout for 3 seconds to move to next index as playing music action. 

```ts
const handleTrackPress = (index: number) => {
  if (index === playingIndex) {
    setIsPaused(prev => !prev);
    return;
  }
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  stopBlinking();
  setIsPaused(false);
  setPlayingIndex(index);
};

```
### `FlatList` setup
- Efficiently renders all tracks with smooth scrolling. 

### Logic
- Uses `keyExtractor` for stable rendering.
- Uses `renderItem={renderTrackItem}`.

```ts
<FlatList
  data={trackList}
  keyExtractor={(item) => item.title}
  renderItem={renderTrackItem}
/>

```
## Responsibility
- Displaying all tracks available in the app in an organized list view. 
- Allowing users to select a specific track to play. 
- Managint inline play/pause, blinking animation for the active item, and 3-second auto-advance across the list. 
- Handling image loading state with a per-item spinner. 

