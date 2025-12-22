## Full App Flow 

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
- Uses `handlePlayRandom()` to resolve a random track state before navigating to the **Random Play screen**.

---

### 2. Random Play Screen

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/184fc6c4-3dc6-4e31-a496-06183bb79c00"
    width="280"
  />
</p>

- Displays the random music playback screen, showing the currently selected track and playback state.

---

**Source:** `src/screens/PlayingScreen.tsx`

**Implementation note**
- Playback behavior is driven by explicit **screen state**, not real audio.
- UI animations and indicators react to derived state changes.

**Demo highlights (shown in the video):**
- **Random track selection** applied before navigation.
- **Playback-driven visuals** (blinking indicator and vinyl record rotation).
- **Volume-based interaction**, affecting blinking speed.
- **Control button interaction**, allowing users to move to the next track in the list.

---

**Demo video:**  
- [Watch Random Play demo](https://chungmanpark12.github.io/classicq-media/random-play.html)

---




