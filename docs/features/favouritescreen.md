# FavouriteScreen Documentation

This document explains the structure, logic, and main functionalities of the **FavouriteScreen** component.

---

## Overview

- **File Path:** `screens/FavouriteScreen.tsx`
- **Purpose:** Displays and manages the user’s list of favourite tracks with inline preview-style play/pause, **drag-and-drop reordering**, blink animation on the active row, and resilient image loading indicators.
- **Connected Data:**
  - `useFavourite()` context → provides `favourites`, `removeFromFavourites`, `reorderFavourites`.
  - Local `Track` shape used here: `{ title: string; composer: string; image: any }`.
- **Core Dependencies:**
  - `react-native` (`Animated`, `Image`, `ActivityIndicator`, `TouchableOpacity`, etc.)
  - `react-native-gesture-handler` (`GestureHandlerRootView`)
  - `react-native-draggable-flatlist` (`DraggableFlatList`, `RenderItemParams`)
  - `expo-linear-gradient` (background)
  - `@expo/vector-icons/Ionicons` (icons)
  - React hooks (`useState`, `useEffect`, `useRef`)

---

## Debugging
- import `debugValidateTracks()` utility.
- Ensures each track has a valid id, title, and composer within `favourite.length`.
```ts
  useEffect(() => {
  if (!__DEV__) return;
  if (!favourites || favourites.length === 0) return; // nothing selected yet
  debugValidateTracks(favourites, Math.min(10, favourites.length));
}, [favourites]);
```
## Main Component

### `FavouriteScreen`

- **Type:** Functional component using React Hooks (`useState`, `useEffect`, `useRef`).
- **State & Refs (key items):**
  - `loadingMap: { [index: number]: boolean }` — per-item image loading spinner state.
  - `playingIndex: number | null` — active (previewing) item index.
  - `isPaused: boolean` — paused state for the active row.
  - `fadeAnim: Animated.Value` — opacity value for blink animation.
  - `animationRef: Animated.CompositeAnimation | null` — running animation instance.
  - `timeoutRef: NodeJS.Timeout | null` — 3-second auto-advance timer.

### Major Functions & Logic

## `handleTrackPress(index:number)`
- Controls preview play/pause on item tap and switches active item.

# Logic
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

## Auto-Advance and Cleanup - `useEffect`
- Auto-advance the prevew every 3000ms, manage blink start/stop, and handle unmount cleanup.

# Logic(Common in ListScreen)
- When `playingIndex != null` and `!isPaused`: start blinking and schedule `setTimeout` to advance to next favourite.
- If at the end of the list -> clear `playingIndex` to stop.
- Cleanup: clear timeout on dependency changes and on unmount, stop blinking on unmount.

```ts
useEffect(() => {
  if (playingIndex === null || isPaused) { stopBlinking(); return; }
  startBlinking();

  timeoutRef.current = setTimeout(() => {
    const nextIndex = playingIndex + 1;
    if (nextIndex < favourites.length) {
      setPlayingIndex(nextIndex);
      setIsPaused(false);
    } else {
      setPlayingIndex(null);
    }
  }, 3000);

  return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
}, [playingIndex, isPaused, favourites.length]);

useEffect(() => {
  return () => {
    stopBlinking();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
}, []);

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

