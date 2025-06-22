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

#### Changed
- Applied `trackImage` style to images inside `renderItem`.
- Set `flexDirection: 'row'` for item layout.
- Adjusted image styling to properly fit within each row frame.



