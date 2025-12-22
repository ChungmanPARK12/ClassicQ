Full App Flow 

---

### 1. Splash Screen

<p align="center">
  <img src="https://github.com/user-attachments/assets/824f7faa-edd9-4ef7-b772-a74bf22f5db9" width="280"/>
</p>

- Displays the ClassicQ brand while the app initializes.

---

**Source:** `App.tsx`

- Keeps the splash screen visible until the Home screen is ready.  
- A short **preload** delay is applied on the first visit only and skipped on subsequent launches.

---

### 2. Home Screen

<p align="center">
  <img src="https://github.com/user-attachments/assets/ffcadcd6-3f30-482d-993e-65ff30ecbf25" width="280"/>
</p>

- Displays the main entry screen of ClassicQ.

---

**Source:** `src/screens/HomeScreen.tsx`

- Provides access to **Random Music playback**, **Music List**, and **Favourite screen**.  
- Uses `handlePlayRandom()` to enable immediate random playback from the full music list, navigating directly to the **Random Play screen**.
- The **random track** is selected before navigation to ensure the **Ramdom Play screen** receives a fully resolved track state.

---

### 2. Random Play Screen

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/184fc6c4-3dc6-4e31-a496-06183bb79c00"
    width="280"
  />
</p>

- Displays the random playback screen, showing the currently selected track and playback state.

---

**Source:** `src/screens/PlayingScreen.tsx`

- Receives a pre-selected **random track** before navigation and renders it immediately.
- Uses a **preload** phase to wait until background and vinyl assets are ready before displaying the UI.
- Applies subtle **animation** and **blinking** effects to indicate active playback state.

---

 **Demo video:**  
- [Watch Random Play demo](https://chungmanpark12.github.io/classicq-media/random-play.html)

---



