## Full App Flow 

---

### 1. Splash Screen

<p align="center">
  <img src="https://github.com/user-attachments/assets/824f7faa-edd9-4ef7-b772-a74bf22f5db9" width="280"/>
</p>

- Displays the **ClassicQ logo**  while the app initializes

---

**Source:** `App.tsx`

- Keeps the splash screen visible until the **Home screen** is ready
- Uses a **preload** method on the first visit; subsequent visits replace background-image loading from Home screen with a fixed 2-second branding delay.

---

### 2. Home Screen

<p align="center">
  <img src="https://github.com/user-attachments/assets/ffcadcd6-3f30-482d-993e-65ff30ecbf25" width="280"/>
</p>

- Displays the main entry screen of ClassicQ

---

**Source:** `src/screens/HomeScreen.tsx`

- Provides access to **Random Play**, **Music List**, and **Favourite screens**
- Uses `handlePlayRandom()` to pre-select a random track state before navigating to the **Random Play screen**.

---

### 3. Loading Status Screen 

<table align="center" cellspacing="0" cellpadding="12">
  <tr>
    <td align="center" width="50%" 
        style="border: 1px solid #dcdcdc; border-radius: 24px;">
      <img
        src="https://github.com/user-attachments/assets/6f72ef01-e4d6-438f-8d29-766babb6e516"
        width="280"
        style="border-radius: 18px;"
      />
    </td>
    <td align="center" width="50%" 
        style="border: 1px solid #dcdcdc; border-radius: 24px;">
      <img
        src="https://github.com/user-attachments/assets/7f14166b-55eb-46e0-8cd8-be1ba38ae62e"
        width="280"
        style="border-radius: 18px;"
      />
    </td>
  </tr>
</table>

- Displays a calm **loading state** while the **Random Play screen** prepares required visual assets.

---

**Source:** `src/components/ClassicQSplash.tsx`

- Applies a **subtle blinking animation** to the logo and message as the loading status

---


### 4. Random Play Screen

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/184fc6c4-3dc6-4e31-a496-06183bb79c00"
    width="280"
  />
</p>

- Displays the random music playback screen, showing the **pre-selected** track from `HomeScreen` and playback state

---

**Source:** `src/screens/PlayingScreen.tsx`

- The **Random Play screen** renders `<ClassicQSplash />` until `isReady` becomes `true`.
- `isReady` is set after the background and vinyl record images are preloaded via `Asset.loadAsync()`.
- Uses a **preload** method on the first visit; subsequent visits skip the **loading state** and navigate directly.

**Implementation note**
- Playback behavior is driven by explicit **screen state**, not real audio
- UI animations and indicators react to derived state changes

**Demo highlights (shown in the video):**
- **Random track selection**, applied before navigation
- **Playback-driven visuals**, with a blinking indicator applied to the title and composer, and vinyl record rotation.
- **Volume-based interaction**, affecting blinking speed
- **Control button interaction**, enabling previous and next track navigation

---

**Demo video:**  
- [Watch Random Play demo](https://chungmanpark12.github.io/classicq-media/random-play.html)

---

### 5. List Screen

<table align="center" cellspacing="0" cellpadding="12">
  <tr>
    <td align="center" width="50%" 
        style="border: 1px solid #dcdcdc; border-radius: 24px;">
      <img
        src="https://github.com/user-attachments/assets/83edc421-152c-4582-ac2b-6e1f6ce74dce"
        width="280"
        style="border-radius: 18px;"
      />
    </td>
    <td align="center" width="50%" 
        style="border: 1px solid #dcdcdc; border-radius: 24px;">
      <img
        src="https://github.com/user-attachments/assets/b44c5ec4-60d3-4caa-8044-f96d37d87200"
        width="280"
        style="border-radius: 18px;"
      />
    </td>
  </tr>
</table>

- Displays a scrollable list of 100 classical tracks
- Demonstrates state-driven playback behavior using blinking visual indicators

---

**Source:** `src/screens/ListScreen.tsx`

**Demo highlights (shown in the video):**
- **Per-track image loading handling**, showing a placeholder until the track image is fully loaded
- **Play/pause overlay behavior**, displayed only after the track image is ready
- **Playback-driven visuals**, with a blinking indicator applied to the title
- **Automatic track progression**, advancing to the next item after a 3-second interval
- **Favourite toggle interaction**, allowing tracks to be **added to or removed** from favourites via the heart icon.

---

**Demo video:**  
- [Watch List Screen demo](https://chungmanpark12.github.io/classicq-media/listscreen.html)

---

### 5. Favourite Screen

<table align="center" cellspacing="0" cellpadding="12">
  <tr>
    <td align="center" width="50%" 
        style="border: 1px solid #dcdcdc; border-radius: 24px;">
      <img
        src="https://github.com/user-attachments/assets/437c86f0-95fa-48d6-8d8e-597f4c85cc99"
        width="280"
        style="border-radius: 18px;"
      />
    </td>
    <td align="center" width="50%" 
        style="border: 1px solid #dcdcdc; border-radius: 24px;">
      <img
        src="https://github.com/user-attachments/assets/ce68930c-25e6-45fe-8038-460fc1a3a5ad"
        width="280"
        style="border-radius: 18px;"
      />
    </td>
  </tr>
</table>

- Displays the user's saved favourites list from `ListScreen` of classical tracks
- Applies the same play/pause logic as `ListScreen`

---

**Source:** `src/screens/FavouriteScreen.tsx`

**Demo highlights (shown in the video):**
- **Per-track image loading handling**, showing a loading indicator until the track image is fully loaded
- **Drag-and-drop list reordering**, long-press the **reorder icon** to reorder items
- **Remove favourites instantly**, tap the **heart button** to remove an item

---

**Demo video:**  
- [Watch Favourite Screen demo](https://chungmanpark12.github.io/classicq-media/favouritescreen.html)

---





