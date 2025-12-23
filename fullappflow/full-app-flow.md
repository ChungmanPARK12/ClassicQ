## Full App Flow 

---

### 1. Splash Screen

<p align="center">
  <img src="https://github.com/user-attachments/assets/824f7faa-edd9-4ef7-b772-a74bf22f5db9" width="280"/>
</p>

- Displays the **ClassicQ logo**  while the app initializes.

---

**Source:** `App.tsx`

- Keeps the splash screen visible until the **Home screen** is ready.  
- A short **preload** delay is applied on the first visit only and skipped on subsequent launches.

---

### 2. Home Screen

<p align="center">
  <img src="https://github.com/user-attachments/assets/ffcadcd6-3f30-482d-993e-65ff30ecbf25" width="280"/>
</p>

- Displays the main entry screen of ClassicQ.

---

**Source:** `src/screens/HomeScreen.tsx`

- Provides access to **Random Play**, **Music List**, and **Favourite screens**.  
- Uses `handlePlayRandom()` to pre-select a random track state before navigating to the **Random Play screen**.

---

### 3. Loading Status Screen (ClassicQSplash)

<table align="center">
  <tr>
    <td align="center" width="50%">
      <img
        src="https://github.com/user-attachments/assets/6f72ef01-e4d6-438f-8d29-766babb6e516"
        width="280"
        style="border-radius: 24px; border: 1px solid #e5e5e5;"
      />
    </td>
    <td align="center" width="50%">
      <img
        src="https://github.com/user-attachments/assets/7f14166b-55eb-46e0-8cd8-be1ba38ae62e"
        width="280"
        style="border-radius: 24px; border: 1px solid #e5e5e5;"
      />
    </td>
  </tr>
</table>

- Displays a calm **loading state** while the **Random Play screen** prepares required visual assets.

---

**Source:** `src/components/ClassicQSplash.tsx`, `src/screens/PlayingScreen.tsx`

- Applies a **subtle blinking animation** to the logo and message as the loading status.

---


### 4. Random Play Screen

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/184fc6c4-3dc6-4e31-a496-06183bb79c00"
    width="280"
  />
</p>

- Displays the random music playback screen, showing the currently selected track and playback state.

---

**Source:** `src/screens/PlayingScreen.tsx`

- The **Random Play screen** renders `<ClassicQSplash />` until `isReady` becomes `true`.
- `isReady` is set after the background and vinyl images are preloaded via `Asset.loadAsync()`.

**Implementation note**
- Playback behavior is driven by explicit **screen state**, not real audio.
- UI animations and indicators react to derived state changes.

**Demo highlights (shown in the video):**
- **Random track selection**, applied before navigation.
- **Playback-driven visuals**, blinking indicator and vinyl record rotation.
- **Volume-based interaction**, affecting blinking speed.
- **Control button interaction**, allowing users to move to the next track in the list.

---

**Demo video:**  
- [Watch Random Play demo](https://chungmanpark12.github.io/classicq-media/random-play.html)

---




