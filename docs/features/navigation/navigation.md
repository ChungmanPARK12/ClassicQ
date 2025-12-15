# Navigation Module Documentation

This document explains the structure and logic of the **navigation** module in the project.

---

## Files Overview

### 1. `AppNavigator.tsx`
- **Purpose**: Defines the app’s navigation structure using React Navigation.
- **Integration Flow**:
  - The first entry point is `index.ts`, which runs the app and loads `App.tsx`.
  - `App.tsx` wraps the root navigator with `NavigationContainer`.
  - Inside `App.tsx`, `AppNavigator` is imported and renders the stack of screens.
  - From here, navigation flows into specific screens (e.g., `HomeScreen`, `ListScreen`, etc.).
- **Contents**:
  - Imports `createNativeStackNavigator` (or other navigators depending on your setup).
  - Declares the **root navigator** with all screens of the app.
  - Sets up **stack/screen options** (headers, titles, transitions, etc.).
- **Key Functions/Components**:
  - `AppNavigator`: Root component returning the navigator setup.
  - Each screen is registered via:
    ```tsx
    <Stack.Screen name="ScreenName" component={ScreenComponent} />
    ```
    The `name` is type-checked against definitions in `types.ts`.


---

### 2. `types.ts`
- **Purpose**: Provides strong typing for navigation across the app using TypeScript.
- **Contents**:
  - Declares the `RootStackParamList` interface.
  - Maps each route name to its expected parameters.
- **Example**:
  ```ts
  export type RootStackParamList = {
    Home: undefined;
    List: undefined;
    Favourite: { trackId: number }; // Example with params
    NowPlaying: { trackTitle: string };
  };


