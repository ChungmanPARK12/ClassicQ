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
