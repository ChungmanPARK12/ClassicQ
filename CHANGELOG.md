# Changelog

All notable changes to this project will be documented in this file.

---

## [2025-05-24] - [2025-05-25] - Initial Release

### Added
- Initial project setup for the Classical Music App using React Native.
- Set up navigation with `AppNavigator.tsx` and route definitions.
- Created screens:
  - `HomeScreen.tsx`
  - `PlayingScreen.tsx`
- Implemented styling with separate `.style.ts` files for screen components.
- Added assets:
  - `background.jpg`
  - `background.png`
  - `vinyl-record.png`
- Integrated music data from `trackList` in `assets/playlist`.

---

### Feature: Music Playback UI & Interaction

#### Added
- **Play Button**:
  - Implemented using `useState` to toggle between play/pause.
  - Used `TouchableOpacity` and conditionally rendered icon changes.
- **Blinking Track & Composer Name**:
  - Achieved with `Animated.loop()` and `Animated.sequence()` for fade in/out.
  - Controlled with `useEffect` on track change.
- **Track Information Display**:
  - Dynamically rendered current track and composer using index-based access from `trackList`.
- **Backward / Forward Buttons**:
  - Navigation logic using `useState` for `currentTrackIndex`.
  - Handled edge cases to loop through the playlist correctly.

#### Learned
- React Native component interaction using `useState`, `useEffect`, and `Animated`.
- Dynamic UI rendering based on data state.
- Playback navigation logic including safe indexing and circular looping.
- UI feedback through animation and button press interaction.

---

## [2025-05-24] – [2025-05-25] – Initial Release

### Loading Screen

#### Added
- Implemented a manual loading screen using `useEffect` in `App.tsx` with a 2-second delay before navigating to the `Home` screen.
- Replaced native splash configuration with a custom splash view, rendering a background image and centered `🎼 ClassiQ` text.
- Reorganized the `loadResources` function for clarity and consistency.
- Reduced splash image size from 1.52 MB to 52 KB, optimizing performance in line with the Grab project (which uses a 32 KB image).


#### Learned
- When defining new screens, ensure they are added to `types.ts` under `RootStackParamList` to avoid navigation and typing errors.
- Manual splash rendering using `<Image>` improves control but introduces a slight delay due to image load timing.
- Native splash configuration in `app.json` is no longer needed when manually managing the splash screen in `App.tsx`.


## [2025-06-07] – [2025-06-08]

### Playing Screen

#### Added
- Implemented a simplified splash screen using only the container (without a background image) to reduce loading delay.
- Introduced a stable method for font importing.
- Added a loading indicator that waits for both the background and record image to finish loading before rendering the screen.
- Implemented conditional logic in `handlePlayNext` and `handlePlayPrevious` to maintain the current play state (playing/paused) across track changes.
- Introduced dynamic blinking speed based on the formula `blinkDuration = 1000 - volume * 700`, adjusting animation speed based on the current volume level.

#### Changed
- Added `recordLoaded` state alongside `bgLoaded` and updated rendering conditions to wait for both assets.
- Refactored the player box from `<View>` to `<Animated.View>` and applied `blinkAnim` opacity transitions when playing.
- Adjusted blink animation speed to reflect changes in volume level.
- Refined the `updateBlinkAnimation` method for dynamic responsiveness.

#### Learned
- How to reliably import and use custom fonts in React Native.
- How `useState` can be used to manage multiple local UI states effectively.
- That animation properties (like blinking) can be dynamically controlled using mathematical formulas tied to user input (e.g., volume level).

## [2025-06-14] – [2025-06-15]

### Playing Screen

#### Added
- Implemented the Music List screen where users can tap a track to start playback.
- Added a blinking animation to indicate the currently playing track.
- Enabled automatic playback of the next track every 3 seconds (test logic).
- Added container styling for the list and each item, including a frame-like design using CSS.
- Enhanced `renderItem` logic to style even and odd items differently based on index.
- Installed and integrated `expo-linear-gradient` with a 3-color dynamic background for modern styling.

#### Changed
- Fixed a bug where the blinking animation did not trigger or proceed to the next track when starting from the first item.
- Improved blinking behavior and automatic transition between tracks.
- Refactored list rendering logic using the formula `index % 2` to differentiate between even and odd items.
- Replaced static background color with a modern gradient using `LinearGradient`.

#### Learned
- Gained hands-on experience with `Animated.loop`, `useRef`, and managing timed playback transitions using `setTimeout`.
- Learned how to implement dynamic color styling and apply index-based conditional logic for alternating item designs.

## [2025-06-21] – [2025-06-22]

### List Screen

#### Added
- Added image support for each music item in the list.
- State, `LoadingMap, setloadMap`
- Spinner, `renderItem, isLoading &&`
- import `IonIcons`, expo vector-icons
- Overlay play/pause icon, `isPlaying ? pause : play`

#### Changed
- Applied `trackImage` style to images inside `renderItem`.
- Set `flexDirection: 'row'` for item layout.
- Adjusted image styling to properly fit within each row frame.
- Loading image for each images in the list
- Play and puase icons on each imagesnp

## [2025-07-19] – [2025-07-20]

### Favourite Screen
- Created `FavouriteScreen` to show user’s favorite music.
- Added `FavouriteContext` to store and share favorite tracks.
- Used `LinearGradient` background for visual consistency.
- Matched layout with `ListScreen` (image, title, composer, no heart icon).

### ListScreen
- Added heart button to add/remove music from favorites.
- Imported and used `toggleFavourite`, `addToFavourites`, and `removeFromFavourites` from context.
- Synced favorite tracks with `FavouriteScreen`.

## [2025-07-26] – [2025-07-27]

### Favourite Screen
- index % 2 === 0 ? styles.itemDark : styles.itemLight to Light and Dark to change the color pattern
- Added all the blinking, animation and timeout function, play and pause music same structure with `ListScreen`.

### Learned
- Image size shoul be less than 10kb, to set balance image quality.

## [2025-08-04] – [2025-08-05]

### Favoutire Screen

### Problem
- The issue for storing the favourite list, restart app, reset the favourite list

### Changed
- Added `AsyncStorage`, variety of user stroing the favourite list for each device.
- `npm install @react-native-async-storage/async-storage`

## [2025-08-09] – [2025-08-10]

### Favourite Screen
- Added drag-reorder feature using `react-native-draggable-flatlist`.

### Favourite Context
- `reorderFavourites` updates both state and storage the tracks.

### ListScreen
- Bug fix, error on track `toggleFavourie` that argument compser and title, missing image property.
- Added in src/navigation.type.ts `Track` objects, title, composer and image
- import `Track` in data/track.ts and ListScreen

### Problem
- Bug fix, item index handling `getIndex` to avoid undefined index error, functional provide drag that always returns the current index.
- import `GestrueHandlerRootView`, `npm i gesture handler` to fix some error for opening and compatability the app

## [2025-08-16] – [2025-08-17]

### ListScreen
- ALl the image reduced the size to under 10KB.

### Favourite Screen
- Removed the marginBottm: -2 to 0 in `itermWrapper` to get rid of the issue for the border line on the last item

### Codereview(HomeScreen)
- `handleopen` Navigation screen using `NavigationProps` to `NavigationParamList` in AppNavigator.
- Loading Screen Implementation, `bgLoaded`, `LinearGradient` and `ActivityIndicator` with styling, color...

## [2025-08-23] – [2025-08-24]

### Codereview(PlayingScreen)
- React hooks `useState, useRef, useEffect`
- The record spin using `Anumaged.loop()`.
- Set dynamic blink speed based on volume. 
- Applied `LiearGradient` for loading screen.

### Tracks
- Updated the trackList to 100.

### HomeScreen
- Removed the space in the `Text` to make the button size in manual
- Fixed `textAlign` center in buttonText and `width` in button.

## [2025-08-30] – [2025-08-31]

### Codereview(ListScreen)
- Added detailed inline documentation explaining logic for state, functions, effects and UI component.
### Learned
- Importance of clearing timers(setTimeout) when pausing or ummounting to prevent unexpected behavior.
- Performance benefits of memorized rows and FlatList tuning for large datasets.
- The blinking animation, row press handling, and image loader state.

## [2025-09-06] – [2025-09-07]

### Codereview(FavouriteScreen)
- Improved Animation, `stopBlinking`, reset to null to prevent memory leaks.
- Alternating itemLight / itemDark styles for even/odd rows, plus itemActive highlight while dragging. 

## [2025-09-12] – [2025-09-14]

### Codereview(FavouriteContext)

## Potential Issues
- Duplicate entries: `addToFavourites` always pushes a tack, even if it already exists, duplicates possible, better to enforce inside context, this could happend if expand the another kind of list screen(Fixed giving `storageKey in useEffect`). 
- Identity by title only: Recommend using a unique id track to be safer, example: incorrectly possible to remove the same title(Symphony No.1, 3, 5)(good to skip)
- AsyncStorage erros not surfaced?(good to skip)

## [2025-09-25] – [2025-09-29]

### CodeReview(FavouriteContext)
- `favoutireContextType` is rules/declaration in TypeScript.
- `const favouriteContext` is a container/channel creating an container(empty), by default, when you wrap the app in `favouriteProvider`, this container gets filled with the real state and functions, pass data and functions down through components without props. 

### CodeReview(FavouriteScreen)

## Potential issues
- Index fallback(`getIndex?.();`)
- if `getIndex()` fails, everything falls back to 0, could cause multiple items sharing index 0.
- Fixed to check for `undefined` and return `null` render if missing. 

## [2025-10-16] – [2025-10-20] - Documentation
- Documentation `homescreen, playscreen, navigation` clear.

## [2025-10-22] – [2025-10-28] - End documentation
- Documentation `favouriteScreen`.
- Common method Auto play, timeout and pause between ListScreen and FavouriteScreen `listLength` is parameter and `favouriteLength` is user's saved which is fluctuating length.
- Documentation `favouriteContext`.
- `STORAGE_KEY` handle local data persistence, identifier as the key storing and retrieving data in `AsyncStorage`.
- `AsyncStorage` can remember saved data without a database but limits, only local device and small to medium-sized data. 
# ListScreen, image box loading status 
- Change spinner `ActivitiIndicator` to View, Text, Color rendering structure. 

## [2025-11-01] – [2025-11-2] - Before the First Portfolio Update
- Debugging to check 100 list with simple print LOG, `length.trackList`.
# Future plan
- Debugging to check 100 list(clear). 
- Assigning stable unique IDs to all tracks for consistent rendering and state management. 
- Replace default ActivityIndicator, basic spiiner with ClassicQ splash-style loading screen(brown background + main title).

## [2025-11-03] – [2025-11-08] - Assigning stable IDs
- Added `id:string` in types. 
- Created a new `trackId.ts`, the ID generator.
- Put the track list to `RAW_TRACKS` and wrapped them and import the generator from `trackId`.
## [2025-11-04] - Updated
# ListScreen
- Replaced all title-based checks with `id`: `favourites.some(t => t.id === item.id)`.
- Changed `loadMap` key type to `Record<string, boolean>` and mapped by `item.id`.
- Updated `keyExtractor` → `keyExtractor={(item) => item.id}` for stable rendering.
# FavouriteScreen
- Removed local `Track` type and improted shared one with `id`.
- Updaetd all image loading, playback, and reorder login to key by `item.id`.
- Updated `keyExtractor` → `keyExtractor={(item) => item.id}` for stable rendering.
# FavouriteContext
- Updated add/remove/reorder methods to work by `id`.
- Added `trackIdOf()` import for Id generator logic.
## [2025-11-06] - Mini test and debugging(Successful)
- Added `debugTracks` under src/utils as a method.
# Function debugValidateTracks(tracks: Track[])
- Duplicate ID detection
- Missing field (id/title/composer) detection
- Cross-check for ID consistency
- Optional console table preview
# Logs detailed summary
`[Tracks] total=100 uniqueIds=100 dup=0 missingRows=0 mismatches=0`
# Debug hooks in both major screens
- `ListScreen`, validates the master `trackList`.
- `FavouriteScreen`, validates the `favourite.length` which is added list.
# Documentation
- Method of identify in `trackId.ts` and import identifiers in `track.ts`.

## [2025-11-10] – [2025-11-15] - Change image loading status in ListScreen and FavoutrieScreen. 
- Components `LoadingOverlay.tsx`, splash and blinking text.
- hooks, `useImageReady.ts`, handle image loading map.
- theme `colors`, provides the color background and text.
## [2025-11-13] - Change to per-image loading status. 
# Succesfull per-image loading status in the image box but some bugs to fix. 
- As reduce the image size, shrink the line together
- Need to adjust object.image size. 
## [2025-11-14] - Sucess full implement per-image loading status and solid layout.
- Added `artContainer` as a container for solid layout, everything can adjust within column.
- `placeholderbox` contains loadig-screen same size with the actual image.
- Loading status, `isLoading` method in `placeholderbox`.
# Consider to remove or re-locate the Playicon. 

## [2025-11-17] – [2025-11-22] - Change image loading status in FavoutrieScreen same method in ListScreen.
# Some bug for dragging and reorder the list in FavouriteScreen.
- 
 





   




       











