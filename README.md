# ClassicQ Music App – Portfolio v1

![Image](https://github.com/user-attachments/assets/ea6ba522-58e8-4d9d-8354-5ce60532dd69)

A self-initiated React Native + Expo mobile app project, developed with full ownership of architecture and code decisions, in collaboration with AI for design and implementation improvements.

## Project Overview

This project showcases how I design and structure the core navigation and startup experience of a mobile app.
It covers the full onboarding-to-playback flow, from initial app launch, through the intro flow, and into the main service experience.

- Clean and predictable navigation structure
- Clear separation between app initialization and navigation flow
- A solid UI and navigation foundation for a music-focused mobile app

## Features

- **Controlled splash screen** with explicit app initialization logic
- **Track list and playback flow** with predictable playback state transitions
- **Random playback logic** across the full music library
- **Favorites screen** for saving and managing user-selected tracks

## Full App Flow

An overview of the application flow from launch to the main service screens:

- [Full App Flow Documentation](fullappflow/full-app-flow.md)

## Installation

- **IDE**  
  Use any preferred editor. **Visual Studio** Code is recommended for JavaScript/TypeScript development.  
  https://code.visualstudio.com/

- **Node.js**  
  Required for React Native and Expo development tools.  
  https://nodejs.org

- **Clone the Repository**:
   ```bash
   git clone https://github.com/ChungmanPARK12/ClassicQ.git
   cd classicQ
   ```

- **Install Dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## Getting Started

This project uses the Expo workflow.  
Once dependencies are installed, you can start the development server and run the app on a mobile device.

### Start the Development Server
```bash
npx expo start 
```

**Note(WSL):** If the app does not open on a physical device due to network of IP configuration issues, use:
```bash
npx expo start -tunnel 
```

### Run the App
Use **Expo Go** on your Android or iOS device to run the app.

Scan the **QR code** shown in the terminal, and Expo Go will automatically open and load the project.

### Troubleshooting

If the app behaves unexpectedly or changes are not reflected, try clearing the cache:

```bash
npx expo start -c
```
Then restart the app using `npx expo start --tunnel`

## Debugging

### Track Data Validation

**Source:**  
- `src/utils/debugTracks.ts`  
- `src/data/tracks.ts`  
- `src/data/trackId.ts`

To prevent silent data issues during development, a lightweight track validation utility runs in **__DEV__** mode.

It checks for:
- Missing required fields (`id`, `title`, `composer`)
- Duplicate track IDs
- Deterministic ID generation (`id === trackIdOf(title, composer)`)

When validation passes, the console logs confirm:
- **ListScreen**: initial track list is valid (`TRACKS OK`)
- **FavouriteScreen**: favourites list remains valid after updates (`TRACKS OK`)

Track IDs are generated from normalized metadata, with automatic collision handling to ensure stability during development.

- Detailed debugging notes and iteration history are documented in `CHANGELOG.md`.

## Expo Workflow & Environment

### Expo Go
**Expo Go** is used to preview and test the UI/UX directly on a real mobile device.

### npx expo
`npx expo` runs the Expo CLI without a global installation.  
It is used to start the development server, manage the Metro bundler, and generate the **QR code** for Expo Go.

### Environment Versions
The project was developed and tested with the following environment:

- **Node.js**: v20.x
- **Expo CLI**: via `npx expo`
- **React Native**: 0.81.x (Expo-managed)
- **Expo SDK**: SDK 54
- **Tested on**:
  - iOS (Expo Go)
  - Android (Expo Go)

Exact SDK and dependency versions are defined in `package.json` and `app.json`.

## Next Steps (Portfolio v2)

- Update the **Expo Go** app on test devices before starting Portfolio v2 development **(Clear)**
- Test the app on an **Android** physical device **(Tested – minor Android styling adjustment required)**
- Unify **per-track image loading** in the Favourite screen with the **ListScreen** placeholder strategy **(Clear)**
- Improve **track reordering** in the Favourite screen by preventing **unnecessary image reloads** during drag **(Clear)**
- Add subtle **haptic feedback** when starting drag-and-drop reordering **(Clear)**

## License

This project is licensed under the MIT License.