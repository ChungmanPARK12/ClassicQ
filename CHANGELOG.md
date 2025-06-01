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
